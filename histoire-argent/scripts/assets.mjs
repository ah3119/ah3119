// Avatar, bannière et miniature, rendus par Remotion avec les vraies polices de la charte.
import fs from 'node:fs';
import {remotion} from './run.mjs';
fs.mkdirSync('public/brand', {recursive: true});
for (const [id, out] of [['brand-avatar', 'avatar.png'], ['brand-banner', 'banner.png'], ['ep01-thumbnail', 'thumb-ep01.png']])
  remotion(['still', 'src/index.ts', id, `public/brand/${out}`]);
console.log('✓ public/brand/avatar.png, banner.png, thumb-ep01.png');
