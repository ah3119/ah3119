// Fonctions partagées : chargement, estimation des durées, validation éditoriale.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
export const theme = readJson('config/theme.json');
export const sources = readJson('content/research/sources.json');
export const EPISODES = {long: 'content/episodes/ep01-john-law.json', short: 'content/episodes/ep01-short.json'};
export const loadEpisode = (fmt) => readJson(EPISODES[fmt]);
export const audioDir = (fmt) => path.join(ROOT, 'public', 'audio', fmt);
export const audioFile = (fmt, scene) => path.join(audioDir(fmt), `${scene.id}.mp3`);

export const words = (t) => t.trim().split(/\s+/).filter(Boolean).length;
export const estimateSec = (scene) => {
  const {wordsPerSecond, padSec, minSceneSec} = theme.speech;
  return Math.max(minSceneSec, words(scene.text) / wordsPerSecond + padSec);
};
export const sceneSec = (scene) => scene.audioSec ? scene.audioSec + 0.6 : estimateSec(scene);
export const totalSec = (ep) => ep.scenes.reduce((a, s) => a + sceneSec(s), 0);

// Affirmations retirées faute de source primaire : elles ne doivent pas revenir.
export const BANNED = [/bossu/i, /millionnaire/i, /2[,.]8\s*milliards/i];
export const VISUALS = ['title', 'card', 'quote', 'timeline', 'counter', 'curve', 'flow', 'lesson'];
export const STATUSES = ['DRAFT', 'REVIEWED', 'APPROVED_FOR_PUBLICATION'];

export function validate(ep) {
  const errors = [], warnings = [];
  const fmt = ep.format, limits = theme.formats[fmt];
  if (!STATUSES.includes(ep.status)) errors.push(`statut inconnu : ${ep.status}`);
  const ids = new Set();
  let stamps = 0;
  ep.scenes.forEach((s, i) => {
    const where = `${ep.id}/${s.id ?? i}`;
    if (!s.id) errors.push(`${where} : id manquant`);
    if (ids.has(s.id)) errors.push(`${where} : id en double`);
    ids.add(s.id);
    if (!s.text?.trim()) errors.push(`${where} : narration vide`);
    if (!VISUALS.includes(s.visual?.type)) errors.push(`${where} : visuel inconnu (${s.visual?.type})`);
    for (const src of s.sources ?? []) if (!sources[src]) errors.push(`${where} : source inconnue « ${src} »`);
    if (/\d{3,}/.test(s.text) && !(s.sources ?? []).length) errors.push(`${where} : chiffre sans source`);
    for (const re of BANNED) if (re.test(s.text) || re.test(JSON.stringify(s.visual))) errors.push(`${where} : affirmation retirée (${re})`);
    if (s.stamp) stamps++;
  });
  if (stamps !== 1) errors.push(`${ep.id} : la charte impose exactement 1 tampon, trouvé ${stamps}`);
  const t = totalSec(ep);
  if (limits.maxSec && t > limits.maxSec) errors.push(`${ep.id} : ${t.toFixed(0)} s > ${limits.maxSec} s`);
  if (limits.minSec && t < limits.minSec) errors.push(`${ep.id} : ${t.toFixed(0)} s < ${limits.minSec} s`);
  if (ep.status !== 'APPROVED_FOR_PUBLICATION') warnings.push(`${ep.id} : statut ${ep.status}, rendu final bloqué`);
  return {errors, warnings, seconds: t};
}
