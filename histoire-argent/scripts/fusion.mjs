import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {audioFile, loadEpisode, sceneSec, theme, validate} from './lib.mjs';
import {remotion} from './run.mjs';

const mode = process.argv[2];
const out = 'output/short-fusion';
mkdirSync(out, {recursive: true});

if (mode === 'assets') {
  remotion(['still', 'src/index.ts', 'ep01-fusion-thumbnail', `${out}/miniature-john-law.png`]);
  process.exit(0);
}
if (mode !== 'preview' && mode !== 'review') throw new Error('Mode attendu : preview, review ou assets');

const fmt = 'shortFusion';
const episode = loadEpisode(fmt);
if (mode === 'preview') {
  for (const scene of episode.scenes) {
    delete scene.audio;
    delete scene.audioSec;
  }
} else {
  const missing = episode.scenes.filter(scene => !scene.audio || !scene.audioSec || !existsSync(audioFile(fmt,scene)));
  if (missing.length) throw new Error(`Importer les prises et exécuter npm run sync : ${missing.map(s=>s.id).join(', ')}`);
}
const {errors} = validate(episode);
if (errors.length) throw new Error(errors.join('\n'));
const fps = theme.fps;
const totalFrames = episode.scenes.reduce((frames, scene) => frames + Math.round(sceneSec(scene, episode.wordsPerSecond)*fps), 0);
const stem = mode === 'preview' ? 'FR-N001-short-fusion-sans-voix' : 'FR-N001-short-fusion-voix-relecture';
const src = `${out}/${stem}-remotion.mp4`;
const target = `${out}/${stem}.mp4`;
remotion(['render', 'src/index.ts', 'ep01-short-fusion', src,
  `--props=${JSON.stringify({episode,subtitles:true})}`, '--x264-preset=veryfast']);
const ff = spawnSync('ffmpeg', ['-nostdin','-v','error','-y','-i',src,'-map','0:v:0','-map','0:a:0',
  '-vf','scale=in_range=auto:out_range=tv,format=yuv420p','-color_range','tv',
  '-c:v','libx264','-crf','17','-preset','veryfast','-af',`atrim=end=${totalFrames/fps}`,
  '-c:a','aac','-b:a','192k','-movflags','+faststart',target], {stdio:'inherit'});
if (ff.status !== 0) throw new Error('FFmpeg n’a pas terminé le fichier final.');

let start=0;
let index=1;
const timecode=frame=>{
  const ms=Math.round(frame*1000/fps);
  const pad=(n,w=2)=>String(n).padStart(w,'0');
  return `${pad(Math.floor(ms/3600000))}:${pad(Math.floor(ms/60000)%60)}:${pad(Math.floor(ms/1000)%60)},${pad(ms%1000,3)}`;
};
const srt=episode.scenes.flatMap(scene=>{
  const frames=Math.round(sceneSec(scene,episode.wordsPerSecond)*fps);
  const subtitleFrames=scene.audioSec?Math.round(scene.audioSec*fps)+6:frames;
  const words=scene.text.split(/\s+/);
  const groups=Math.max(1,Math.round(words.length/5));
  const period=(subtitleFrames-10)/groups;
  const cues=Array.from({length:groups},(_,j)=>{
    const entry=words.slice(Math.round(j*words.length/groups),Math.round((j+1)*words.length/groups)).join(' ');
    const from=start+Math.ceil(j*period);
    const to=start+(j+1<groups?Math.ceil((j+1)*period):frames);
    return `${index++}\n${timecode(from)} --> ${timecode(to)}\n${entry}\n`;
  });
  start+=frames;
  return cues;
});
writeFileSync(`${out}/${stem}.srt`,srt.join('\n'));
console.log(`${target} · ${start/fps} s`);
