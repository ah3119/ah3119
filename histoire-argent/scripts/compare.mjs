// Duel à l'aveugle : attribue A/B au hasard, extrait 8 images aux mêmes instants, construit une planche.
// npm run compare -- chemin/video1.mp4 chemin/video2.mp4
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {ROOT} from './lib.mjs';

const win = process.platform === 'win32';
const tool = (name, args) => {
  let r = spawnSync(name, args, {encoding: 'utf8', shell: win});
  if (r.status !== 0) r = spawnSync('npx', ['remotion', name, ...args], {cwd: ROOT, encoding: 'utf8', shell: win});
  if (r.status !== 0) throw new Error(`${name} a échoué : ${r.stderr?.slice(-400)}`);
  return r.stdout;
};
const duration = (f) => parseFloat(tool('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', f]));

const [v1, v2] = process.argv.slice(2).map((p) => path.resolve(p));
if (!v1 || !v2 || !fs.existsSync(v1) || !fs.existsSync(v2)) { console.error('Usage : npm run compare -- video1.mp4 video2.mp4'); process.exit(1); }
const swap = crypto.randomInt(2) === 1;
const [A, B] = swap ? [v2, v1] : [v1, v2];
const out = path.join(ROOT, 'output', 'duel'); fs.mkdirSync(out, {recursive: true});
const tag = path.basename(v1, '.mp4');
fs.copyFileSync(A, path.join(out, `${tag}-A.mp4`)); fs.copyFileSync(B, path.join(out, `${tag}-B.mp4`));
fs.appendFileSync(path.join(out, 'cle.txt'), `${tag} · A = ${A}\n${tag} · B = ${B}\n\n`);

const dA = duration(A), dB = duration(B), d = Math.min(dA, dB);
const tmp = fs.mkdtempSync(path.join(out, 'tmp-'));
const rows = [];
for (const [label, file] of [['A', A], ['B', B]]) {
  const frames = [];
  for (let i = 0; i < 8; i++) {
    const t = (d * (i + 0.5)) / 8; const img = path.join(tmp, `${label}${i}.png`);
    tool('ffmpeg', ['-v', 'error', '-y', '-ss', t.toFixed(2), '-i', file, '-frames:v', '1', '-vf', 'scale=-2:480', img]);
    frames.push(img);
  }
  const row = path.join(tmp, `${label}.png`);
  tool('ffmpeg', ['-v', 'error', '-y', ...frames.flatMap((f) => ['-i', f]), '-filter_complex', `hstack=inputs=${frames.length}`, row]);
  rows.push(row);
}
// Même largeur pour les deux rangées, puis A au-dessus de B.
const sheet = path.join(out, `${tag}-planche.png`);
tool('ffmpeg', ['-v', 'error', '-y', '-i', rows[0], '-i', rows[1], '-filter_complex',
  '[0][1]scale2ref=w=iw:h=ow/mdar[a][b];[a][b]vstack', sheet]);
fs.rmSync(tmp, {recursive: true, force: true});
console.log(`✓ ${path.relative(ROOT, sheet)} : rangée du haut = A, rangée du bas = B (durées ${dA.toFixed(1)} s / ${dB.toFixed(1)} s)`);
console.log('  Note A et B dans la grille, puis seulement ouvre output/duel/cle.txt.');
