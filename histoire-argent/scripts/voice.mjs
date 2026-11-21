// Narration ElevenLabs. La clé API vit uniquement dans .env (jamais dans le dépôt ni dans un chat).
//   npm run voice:check       → compte, offre, voix : aucune dépense
//   npm run voice:one         → génère s01 seulement (payant, petit)
//   npm run voice:all -- --yes / voice:short-all -- --yes → toute la narration (payant)
//   node scripts/voice.mjs ep shortFusion --yes          → n'importe quel épisode de EPISODES (payant)
// Chaque prise arrive avec son minutage mot à mot (endpoint with-timestamps, facturé en caractères comme la synthèse simple : à confirmer sur le relevé) :
// public/audio/<fmt>/<id>.words.json, lu par « npm run sync » pour caler les sous-titres.
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, readJson, loadEpisode, audioFile, audioDir, timingFile, wordsFromAlignment, EPISODES} from './lib.mjs';

const envPath = path.join(ROOT, '.env');
if (fs.existsSync(envPath)) for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const KEY = process.env.ELEVENLABS_API_KEY;
const V = readJson('config/voices.json');
const voice = process.env.VOICE === 'pro' ? V.narratorPro : V.narrator;
const API = 'https://api.elevenlabs.io/v1';
const [mode, ...rest] = process.argv.slice(2);
if (!KEY) { console.error('ELEVENLABS_API_KEY manquante : copier .env.example en .env et y mettre la clé.'); process.exit(1); }
const get = async (u) => { const r = await fetch(API + u, {headers: {'xi-api-key': KEY}}); if (!r.ok) throw new Error(`${u} → ${r.status} ${await r.text()}`); return r.json(); };

async function check() {
  const sub = await get('/user/subscription');
  console.log(`Offre : ${sub.tier} (${sub.status}) · crédits ${sub.character_count}/${sub.character_limit}`);
  console.log(`Clone instantané autorisé : ${sub.can_use_instant_voice_cloning ? 'oui' : 'NON'}`);
  console.log(`Clone professionnel autorisé : ${sub.can_use_professional_voice_cloning ? 'oui' : 'NON'}`);
  const v = await get(`/voices/${voice.voiceId}`);
  console.log(`Voix : ${v.name} (${v.category}) · ${voice.voiceId}`);
  return sub;
}

async function tts(fmt, scenes, i) {
  const s = scenes[i];
  const body = {text: s.text, model_id: V.model, voice_settings: V.settings,
    previous_text: scenes[i - 1]?.text, next_text: scenes[i + 1]?.text};
  const r = await fetch(`${API}/text-to-speech/${voice.voiceId}/with-timestamps?output_format=${V.outputFormat}`, {
    method: 'POST', headers: {'xi-api-key': KEY, 'Content-Type': 'application/json'}, body: JSON.stringify(body)});
  if (!r.ok) throw new Error(`${s.id} → ${r.status} ${await r.text()}`);
  const {audio_base64, alignment} = await r.json();
  fs.mkdirSync(audioDir(fmt), {recursive: true});
  fs.writeFileSync(audioFile(fmt, s), Buffer.from(audio_base64, 'base64'));
  if (alignment) fs.writeFileSync(timingFile(fmt, s), JSON.stringify({source: 'tts', text: s.text, words: wordsFromAlignment(alignment)}) + '\n');
  console.log(`✓ public/audio/${fmt}/${s.id}.mp3${alignment ? ' + minutage' : ''}`);
}

try {
  if (mode === 'check') await check();
  else if (mode === 'one') { const ep = loadEpisode('long'); await tts('long', ep.scenes, 0); }
  else if (mode === 'all' || mode === 'short-all' || mode === 'ep') {
    if (!rest.includes('--yes')) { console.error('Génération payante : relancer avec « -- --yes » après accord.'); process.exit(1); }
    const fmt = mode === 'all' ? 'long' : mode === 'short-all' ? 'short' : rest[0];
    if (!EPISODES[fmt]) { console.error(`Épisode inconnu : ${fmt} (${Object.keys(EPISODES).join(', ')})`); process.exit(1); }
    const ep = loadEpisode(fmt);
    const chars = ep.scenes.reduce((a, s) => a + s.text.length, 0);
    console.log(`${ep.scenes.length} scènes · ${chars} caractères`);
    for (let i = 0; i < ep.scenes.length; i++) if (!fs.existsSync(audioFile(fmt, ep.scenes[i]))) await tts(fmt, ep.scenes, i);
  } else { console.error('Modes : check | one | all | short-all | ep <clé>'); process.exit(1); }
} catch (e) { console.error('✗ ' + e.message); process.exit(1); }
