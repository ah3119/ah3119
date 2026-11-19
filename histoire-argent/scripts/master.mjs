// Mastering audio : normalise la voix à -14 LUFS (niveau d'usage YouTube/TikTok), crête à -1 dBTP.
// La vidéo est copiée sans réencodage. Usage : node scripts/master.mjs output/fichier.mp4 [...]
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {ROOT} from './lib.mjs';
const win = process.platform === 'win32';
const ff = (args) => {
  let r = spawnSync('ffmpeg', args, {encoding: 'utf8', shell: win});
  if (r.status !== 0) r = spawnSync('npx', ['remotion', 'ffmpeg', ...args], {cwd: ROOT, encoding: 'utf8', shell: win});
  if (r.status !== 0) throw new Error(r.stderr?.slice(-400));
  return r.stderr;
};
for (const file of process.argv.slice(2)) {
  if (!fs.existsSync(file)) { console.error('absent : ' + file); process.exit(1); }
  // Passe 1 : mesure. Passe 2 : correction linéaire avec les valeurs mesurées.
  const log = ff(['-hide_banner', '-i', file, '-af', 'loudnorm=I=-14:TP=-1:LRA=11:print_format=json', '-vn', '-f', 'null', '-']);
  const m = JSON.parse(log.slice(log.lastIndexOf('{'), log.lastIndexOf('}') + 1));
  const out = file.replace(/\.mp4$/, '-master.mp4');
  ff(['-hide_banner', '-y', '-i', file, '-c:v', 'copy', '-af',
    `loudnorm=I=-14:TP=-1:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`,
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', out]);
  console.log(`✓ ${out} (${m.input_i} → -14 LUFS)`);
}
