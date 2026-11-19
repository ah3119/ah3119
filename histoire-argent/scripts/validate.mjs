import {EPISODES, loadEpisode, validate} from './lib.mjs';
let failed = false;
for (const fmt of Object.keys(EPISODES)) {
  const ep = loadEpisode(fmt);
  const {errors, warnings, seconds} = validate(ep);
  console.log(`${ep.id} · ${ep.scenes.length} scènes · ~${Math.round(seconds)} s · ${ep.status}`);
  errors.forEach((e) => console.log('  ✗ ' + e));
  warnings.forEach((w) => console.log('  ! ' + w));
  if (errors.length) failed = true;
}
process.exit(failed ? 1 : 0);
