// Fonctions partagées : chargement, estimation des durées, validation éditoriale.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
export const theme = readJson('config/theme.json');
export const sources = readJson('content/research/sources.json');
export const EPISODES = {long: 'content/episodes/ep01-john-law.json', short: 'content/episodes/ep01-short.json', shortV2: 'content/episodes/ep01-short-v2.json', shortFusion: 'content/episodes/ep01-short-fusion.json'};
export const loadEpisode = (fmt) => readJson(EPISODES[fmt]);
export const audioDir = (fmt) => path.join(ROOT, 'public', 'audio', fmt);
export const audioFile = (fmt, scene) => path.join(audioDir(fmt), `${scene.id}.mp3`); // fmt = clé d'EPISODES

export const words = (t) => t.trim().split(/\s+/).filter(Boolean).length;
export const estimateSec = (scene, wps) => {
  const {wordsPerSecond, padSec, minSceneSec} = theme.speech;
  return Math.max(minSceneSec, words(scene.text) / (wps ?? wordsPerSecond) + padSec);
};
// Durée : voix (ou estimation) + respiration, jamais sous le minimum lisible du visuel.
export const sceneSec = (scene, wps) => {
  const min = theme.speech.minByVisual?.[scene.visual?.type] ?? theme.speech.minSceneSec;
  return Math.max(min, scene.audioSec ? scene.audioSec + (wps ? 0.25 : 0.6) : scene.previewSec ?? estimateSec(scene, wps));
};
export const totalSec = (ep) => ep.scenes.reduce((a, s) => a + sceneSec(s, ep.wordsPerSecond), 0);

// Affirmations retirées faute de source primaire : elles ne doivent pas revenir.
export const BANNED = [/bossu/i, /millionnaire/i, /2[,.]8\s*milliards/i];
export const VISUALS = ['title', 'card', 'quote', 'timeline', 'counter', 'curve', 'flow', 'lesson', 'press', 'crowd', 'ticker', 'doc', 'machine', 'gold', 'burn', 'outro', 'action-price', 'transaction'];
export const STATUSES = ['DRAFT', 'REVIEWED', 'APPROVED_FOR_PUBLICATION'];

export function validate(ep) {
  const errors = [], warnings = [];
  const fmt = ep.format, limits = theme.formats[fmt];
  for (const s of ep.scenes) for (const x of s.sfx ?? []) if (!fs.existsSync(path.join(ROOT, 'public', 'sfx', `${x.name}.mp3`))) errors.push(`${ep.id}/${s.id} : bruitage absent « ${x.name} »`);
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
    if (s.previewSec !== undefined && (!Number.isFinite(s.previewSec) || s.previewSec <= 0)) errors.push(`${where} : durée de montage invalide`);
    if (s.stampAt !== undefined && (!s.stamp || !Number.isFinite(s.stampAt) || s.stampAt < 0 || s.stampAt >= sceneSec(s, ep.wordsPerSecond))) errors.push(`${where} : timecode de tampon invalide`);
    for (const src of s.sources ?? []) if (!sources[src]) errors.push(`${where} : source inconnue « ${src} »`);
    if ((/\d{3,}/.test(s.text) || s.visual?.type === 'action-price') && !(s.sources ?? []).length) errors.push(`${where} : chiffre sans source`);
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
