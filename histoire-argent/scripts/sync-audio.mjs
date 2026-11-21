// Mesure chaque MP3 (ffprobe, sinon celui fourni par Remotion) et écrit audioSec dans les JSON.
// Si la prise a son minutage (<id>.words.json, voir voice.mjs et align.mjs), écrit aussi les sous-titres minutés (captions).
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {ROOT, EPISODES, loadEpisode, audioFile, timingFile, captionPages, totalSec} from './lib.mjs';
import path from 'node:path';

const probe = (file) => {
  const args = ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file];
  let r = spawnSync('ffprobe', args, {encoding: 'utf8', shell: process.platform === 'win32'});
  if (r.status !== 0) r = spawnSync('npx', ['remotion', 'ffprobe', ...args], {cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32'});
  const sec = parseFloat(r.stdout);
  if (!Number.isFinite(sec)) throw new Error(`durée illisible : ${file}`);
  return sec;
};
for (const [fmt, rel] of Object.entries(EPISODES)) {
  const ep = loadEpisode(fmt); let n = 0, timed = 0, stale = 0;
  for (const s of ep.scenes) {
    const f = audioFile(fmt, s), t = timingFile(fmt, s);
    delete s.captions;
    if (fs.existsSync(f)) {
      s.audio = true; s.audioSec = Math.round(probe(f) * 100) / 100; n++;
      if (fs.existsSync(t)) {
        const tm = JSON.parse(fs.readFileSync(t, 'utf8'));
        if (tm.text === s.text) { s.captions = captionPages(tm.words); timed++; } else stale++;
      }
    } else { delete s.audio; delete s.audioSec; }
  }
  fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(ep, null, 1) + '\n');
  console.log(`${ep.id} : ${n}/${ep.scenes.length} pistes · ${timed} minutées${stale ? ` · ${stale} minutage(s) périmé(s) : texte modifié, relancer npm run align` : ''} · durée ~${Math.round(totalSec(ep))} s`);
}
