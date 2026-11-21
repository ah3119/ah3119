// Minutage mot à mot des prises DÉJÀ enregistrées (voix générées avant le passage à with-timestamps,
// ou voix enregistrée soi-même) via l'API ElevenLabs forced-alignment : audio + texte connu → temps de chaque mot.
//   npm run align                 → liste les prises sans minutage : aucune dépense
//   npm run align -- --yes        → aligne ces prises (payant : facturé comme le Speech-to-Text, à la durée audio)
//   npm run align -- shortFusion --yes → un seul épisode
// Ensuite : npm run sync (écrit les sous-titres minutés dans le JSON de l'épisode).
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, EPISODES, loadEpisode, audioFile, timingFile} from './lib.mjs';

const args = process.argv.slice(2);
const yes = args.includes('--yes');
const keys = args.filter((a) => EPISODES[a]);
const todo = [];
for (const fmt of keys.length ? keys : Object.keys(EPISODES)) for (const s of loadEpisode(fmt).scenes) {
  const f = audioFile(fmt, s), t = timingFile(fmt, s);
  const stale = fs.existsSync(t) && JSON.parse(fs.readFileSync(t, 'utf8')).text !== s.text;
  if (fs.existsSync(f) && (!fs.existsSync(t) || stale)) todo.push({fmt, s, f, t});
}
if (!todo.length) { console.log('Toutes les prises présentes ont leur minutage.'); process.exit(0); }
console.log(`${todo.length} prise(s) à aligner : ${todo.map((x) => `${x.fmt}/${x.s.id}`).join(', ')}`);
if (!yes) { console.log('Appel payant : relancer avec « npm run align -- --yes » après accord.'); process.exit(0); }

const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('ELEVENLABS_API_KEY manquante dans .env'); process.exit(1); }
try {
  for (const {fmt, s, f, t} of todo) {
    const form = new FormData();
    form.append('file', new Blob([fs.readFileSync(f)], {type: 'audio/mpeg'}), path.basename(f));
    form.append('text', s.text);
    const r = await fetch('https://api.elevenlabs.io/v1/forced-alignment', {method: 'POST', headers: {'xi-api-key': KEY}, body: form});
    if (!r.ok) throw new Error(`${fmt}/${s.id} → ${r.status} ${await r.text()}`);
    const {words} = await r.json();
    const ws = words.filter((w) => w.text.trim()).map((w) => ({text: w.text.trim(), start: w.start, end: w.end}));
    fs.writeFileSync(t, JSON.stringify({source: 'forced-alignment', text: s.text, words: ws}) + '\n');
    console.log(`✓ ${fmt}/${s.id} : ${ws.length} mots`);
  }
} catch (e) { console.error('✗ ' + e.message); process.exit(1); }
