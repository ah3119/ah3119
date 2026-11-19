// Lance la CLI Remotion de façon portable (Windows, macOS, Linux).
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import path from 'node:path';
import {ROOT} from './lib.mjs';
export function remotion(args) {
  const localBrowser = ['C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
  const browser = process.env.REMOTION_BROWSER || localBrowser;
  const extra = browser ? [`--browser-executable=${browser}`] : [];
  const tmp = path.join(ROOT, 'output', '.remotion-tmp');
  mkdirSync(tmp, {recursive: true});
  const cli = path.join(ROOT, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');
  const r = spawnSync(process.execPath, [cli, ...args, ...extra, '--log=error'],
    {cwd: ROOT, stdio: 'inherit', env: {...process.env, TMP: tmp, TEMP: tmp, TMPDIR: tmp}});
  if (r.status !== 0) process.exit(r.status ?? 1);
}
