// Minutage mot à mot des prises DÉJÀ enregistrées (voix générées avant with-timestamps, ou voix enregistrée soi-même).
//   npm run align                        → GRATUIT, local : whisper.cpp + recalage sur le texte du script
//   npm run align -- shortFusion         → un seul épisode
//   npm run align -- --cloud             → liste ce que ferait ElevenLabs forced-alignment (aucune dépense)
//   npm run align -- --cloud --yes       → ElevenLabs forced-alignment (payant, à la durée audio)
// Options locales : WHISPER_MODEL (défaut small ; base est nettement moins précis), WHISPER_LANG (défaut fr),
// WHISPER_SHIFT (défaut 0.2 s). --force refait toutes les prises. Ensuite : npm run sync.
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT, EPISODES, loadEpisode, audioFile, timingFile} from './lib.mjs';
import {alignScript} from './align-words.mjs';

const args = process.argv.slice(2);
const cloud = args.includes('--cloud'), yes = args.includes('--yes'), force = args.includes('--force');
const keys = args.filter((a) => EPISODES[a]);
const todo = [];
for (const fmt of keys.length ? keys : Object.keys(EPISODES)) for (const s of loadEpisode(fmt).scenes) {
  const f = audioFile(fmt, s), t = timingFile(fmt, s);
  const stale = fs.existsSync(t) && JSON.parse(fs.readFileSync(t, 'utf8')).text !== s.text;
  if (fs.existsSync(f) && (force || !fs.existsSync(t) || stale)) todo.push({fmt, s, f, t});
}
if (!todo.length) { console.log('Toutes les prises présentes ont leur minutage.'); process.exit(0); }
console.log(`${todo.length} prise(s) à aligner : ${todo.map((x) => `${x.fmt}/${x.s.id}`).join(', ')}`);
const save = (t, s, source, ws) => fs.writeFileSync(t, JSON.stringify({source, text: s.text, words: ws}) + '\n');

async function local() {
  const {installWhisperCpp, downloadWhisperModel, transcribe} = await import('@remotion/install-whisper-cpp');
  const VERSION = '1.5.5', DIR = path.join(ROOT, 'whisper.cpp'), model = process.env.WHISPER_MODEL || 'small';
  const SHIFT = Number(process.env.WHISPER_SHIFT ?? 0.2);
  await installWhisperCpp({to: DIR, version: VERSION, printOutput: false});          // une seule fois (~1 min)
  await downloadWhisperModel({model, folder: DIR, printOutput: false});              // une seule fois (small : 466 Mo)
  const win = process.platform === 'win32';
  const ff = (a) => {
    let r = spawnSync('ffmpeg', a, {encoding: 'utf8', shell: win});
    if (r.status !== 0) r = spawnSync('npx', ['remotion', 'ffmpeg', ...a], {cwd: ROOT, encoding: 'utf8', shell: win});
    if (r.status !== 0) throw new Error(r.stderr?.slice(-400));
  };
  const wav = path.join(DIR, 'tmp-align.wav');
  for (const {fmt, s, f, t} of todo) {
    ff(['-hide_banner', '-y', '-i', f, '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wav]); // whisper.cpp exige du WAV 16 kHz
    const out = await transcribe({inputPath: wav, whisperPath: DIR, whisperCppVersion: VERSION, model, modelFolder: DIR,
      tokenLevelTimestamps: true, language: process.env.WHISPER_LANG || 'fr', printOutput: false});
    // Jetons → mots entendus (un jeton commençant par une espace ouvre un mot). Début = repère DTW du premier jeton,
    // avancé de SHIFT : le repère DTW de whisper.cpp arrive ~0,2 s après l'attaque du mot (mesuré le 21/11/2026 sur
    // 107 mots à temps connus : erreur moyenne 0,17 s → 0,09 s avec la correction, modèle small).
    const heard = [];
    for (const item of out.transcription) for (const tk of item.tokens) {
      if (/^\s*\[/.test(tk.text) || !tk.text.trim()) continue;
      const at = tk.t_dtw > -1 ? Math.max(0, tk.t_dtw / 100 - SHIFT) : tk.offsets.from / 1000;
      if (/^\s/.test(tk.text) || !heard.length) heard.push({text: tk.text.trim(), start: at, last: tk.offsets.to / 1000});
      else { const w = heard.at(-1); w.text += tk.text; w.last = Math.max(w.last, tk.offsets.to / 1000); }
    }
    // Fin d'un mot = début du suivant (sans dépasser 0,6 s de tenue) ; dernier mot : fin du segment.
    heard.forEach((w, i) => { const next = heard[i + 1]?.start; w.end = next !== undefined ? Math.min(next, w.start + 0.6) : Math.max(w.last, w.start + 0.2); w.end = Math.max(w.end, w.start + 0.05); delete w.last; });
    const ws = alignScript(s.text, heard, heard.at(-1)?.end).map((w) => ({...w, start: +w.start.toFixed(3), end: +w.end.toFixed(3)}));
    save(t, s, `whisper.cpp ${VERSION} ${model}`, ws);
    console.log(`✓ ${fmt}/${s.id} : ${ws.length} mots · entendu « ${heard.map((w) => w.text).join(' ').slice(0, 70)}… »`);
  }
  fs.rmSync(wav, {force: true});
}

async function elevenlabs() {
  if (!yes) { console.log('Appel payant : relancer avec « npm run align -- --cloud --yes » après accord.'); return; }
  const envPath = path.join(ROOT, '.env');
  if (fs.existsSync(envPath)) for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  const KEY = process.env.ELEVENLABS_API_KEY;
  if (!KEY) throw new Error('ELEVENLABS_API_KEY manquante dans .env');
  for (const {fmt, s, f, t} of todo) {
    const form = new FormData();
    form.append('file', new Blob([fs.readFileSync(f)], {type: 'audio/mpeg'}), path.basename(f));
    form.append('text', s.text);
    const r = await fetch('https://api.elevenlabs.io/v1/forced-alignment', {method: 'POST', headers: {'xi-api-key': KEY}, body: form});
    if (!r.ok) throw new Error(`${fmt}/${s.id} → ${r.status} ${await r.text()}`);
    const {words} = await r.json();
    const ws = words.filter((w) => w.text.trim()).map((w) => ({text: w.text.trim(), start: w.start, end: w.end}));
    save(t, s, 'forced-alignment', ws);
    console.log(`✓ ${fmt}/${s.id} : ${ws.length} mots`);
  }
}

try { await (cloud ? elevenlabs() : local()); } catch (e) { console.error('✗ ' + e.message); process.exit(1); }
