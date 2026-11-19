// Narration ElevenLabs. La clé API vit uniquement dans .env (jamais dans le dépôt ni dans un chat).
//   npm run voice:check       → compte, offre, voix : aucune dépense
//   npm run voice:one         → génère s01 seulement (payant, petit)
//   npm run voice:all -- --yes / voice:short-all -- --yes → toute la narration (payant)
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, readJson, loadEpisode, audioFile, audioDir} from './lib.mjs';

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
  const r = await fetch(`${API}/text-to-speech/${voice.voiceId}?output_format=${V.outputFormat}`, {
    method: 'POST', headers: {'xi-api-key': KEY, 'Content-Type': 'application/json'}, body: JSON.stringify(body)});
  if (!r.ok) throw new Error(`${s.id} → ${r.status} ${await r.text()}`);
  fs.mkdirSync(audioDir(fmt), {recursive: true});
  fs.writeFileSync(audioFile(fmt, s), Buffer.from(await r.arrayBuffer()));
  console.log(`✓ public/audio/${fmt}/${s.id}.mp3`);
}

try {
  if (mode === 'check') await check();
  else if (mode === 'one') { const ep = loadEpisode('long'); await tts('long', ep.scenes, 0); }
  else if (mode === 'all' || mode === 'short-all') {
    if (!rest.includes('--yes')) { console.error('Génération payante : relancer avec « -- --yes » après accord.'); process.exit(1); }
    const fmt = mode === 'all' ? 'long' : 'short'; const ep = loadEpisode(fmt);
    const chars = ep.scenes.reduce((a, s) => a + s.text.length, 0);
    console.log(`${ep.scenes.length} scènes · ${chars} caractères`);
    for (let i = 0; i < ep.scenes.length; i++) if (!fs.existsSync(audioFile(fmt, ep.scenes[i]))) await tts(fmt, ep.scenes, i);
  } else { console.error('Modes : check | one | all | short-all'); process.exit(1); }
} catch (e) { console.error('✗ ' + e.message); process.exit(1); }
