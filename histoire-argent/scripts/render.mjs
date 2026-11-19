// npm run render:preview  → Short muet, sans contrôle (prototype)
// npm run render:pilot    → versions narrées pour relecture (voix requise, approbation non requise)
// npm run render:both     → vidéo longue + Short finals : exigent l'approbation et 100 % des pistes audio
import fs from 'node:fs';
import {EPISODES, loadEpisode, validate, audioFile} from './lib.mjs';
import {remotion} from './run.mjs';

const mode = process.argv[2] ?? 'preview';
fs.mkdirSync('output', {recursive: true});

if (mode === 'preview') {
  remotion(['render', 'src/index.ts', 'ep01-short', 'output/ep01-preview-short.mp4']);
  console.log('✓ output/ep01-preview-short.mp4 (prototype muet, non publiable)');
} else if (mode === 'preview-long') {
  remotion(['render', 'src/index.ts', 'ep01-long', 'output/ep01-preview-long.mp4']);
  console.log('✓ output/ep01-preview-long.mp4 (prototype muet, non publiable)');
} else if (mode === 'pilot') {
  // Version narrée complète pour relecture : exige toutes les voix, pas l'approbation. Non publiable.
  const missing = [];
  for (const fmt of Object.keys(EPISODES)) for (const sc of loadEpisode(fmt).scenes)
    if (!fs.existsSync(audioFile(fmt, sc)) || !sc.audioSec) missing.push(`${fmt}/${sc.id}`);
  if (missing.length) { console.error('Voix manquantes : ' + missing.join(', ')); process.exit(1); }
  remotion(['render', 'src/index.ts', 'ep01-short', 'output/ep01-pilote-short.mp4']);
  remotion(['render', 'src/index.ts', 'ep01-long', 'output/ep01-pilote-long.mp4']);
  console.log('✓ output/ep01-pilote-long.mp4 et output/ep01-pilote-short.mp4 (narrés, à valider avant publication)');
} else if (mode === 'both') {
  const problems = [];
  for (const fmt of Object.keys(EPISODES)) {
    const ep = loadEpisode(fmt);
    const {errors} = validate(ep);
    problems.push(...errors);
    if (ep.status !== 'APPROVED_FOR_PUBLICATION') problems.push(`${ep.id} : statut ${ep.status} (validation humaine du script requise)`);
    for (const s of ep.scenes) if (!fs.existsSync(audioFile(fmt, s)) || !s.audioSec) problems.push(`${ep.id}/${s.id} : audio absent ou non synchronisé`);
  }
  if (problems.length) { console.error('Rendu final bloqué :\n  ' + problems.slice(0, 30).join('\n  ')); process.exit(1); }
  remotion(['render', 'src/index.ts', 'ep01-long', 'output/ep01-long.mp4']);
  remotion(['render', 'src/index.ts', 'ep01-short', 'output/ep01-short.mp4']);
  console.log('✓ output/ep01-long.mp4 et output/ep01-short.mp4');
} else { console.error('Mode inconnu : ' + mode); process.exit(1); }
