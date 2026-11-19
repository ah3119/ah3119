// Lance la CLI Remotion de façon portable (Windows, macOS, Linux).
import {spawnSync} from 'node:child_process';
import {ROOT} from './lib.mjs';
export function remotion(args) {
  const extra = process.env.REMOTION_BROWSER ? [`--browser-executable=${process.env.REMOTION_BROWSER}`] : [];
  const r = spawnSync('npx', ['remotion', ...args, ...extra, '--log=error'], {cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32'});
  if (r.status !== 0) process.exit(r.status ?? 1);
}
