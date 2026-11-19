import React, {useMemo} from 'react';
import {C, F} from './brand';
// Rosace guillochée : épitrochoïdes calculées, comme les motifs anti-contrefaçon des billets.
const guilloche = (cx: number, cy: number, R: number, r: number, d: number, steps = 1600) => {
  let p = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = cx + (R + r) * Math.cos(t) - d * Math.cos(((R + r) / r) * t);
    const y = cy + (R + r) * Math.sin(t) - d * Math.sin(((R + r) / r) * t);
    p += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
  }
  return p;
};
const LAYERS: [number, number, number, number, number][] = [[62, 6.2, 18, 0.9, 0.95], [70, 7, 14, 0.75, 0.75], [52, 4, 22, 0.6, 0.55]];

export const Rosette: React.FC<{size: number; progress?: number; bg?: string; fg?: string; monogram?: boolean}> =
  ({size, progress = 1, bg = C.ink, fg = C.paper, monogram = true}) => {
  const paths = useMemo(() => LAYERS.map(([R, r, d]) => guilloche(100, 100, R, r, d)), []);
  const ring = Math.min(1, progress * 1.4);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{display: 'block'}}>
      <circle cx={100} cy={100} r={99} fill={bg} />
      <circle cx={100} cy={100} r={92} fill="none" stroke={fg} strokeWidth={2.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} />
      <circle cx={100} cy={100} r={86} fill="none" stroke={fg} strokeWidth={0.8} opacity={ring} />
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={fg} strokeWidth={LAYERS[i][3]} strokeOpacity={LAYERS[i][4]}
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - Math.max(0, Math.min(1, progress * 1.3 - i * 0.12))} />
      ))}
      <circle cx={100} cy={100} r={53} fill={bg} stroke={fg} strokeWidth={1.5} opacity={ring} />
      {monogram && (
        <text x={100} y={117} textAnchor="middle" fontFamily={F.display} fontWeight={800} fontSize={54}
          fill={fg} opacity={Math.max(0, progress * 2 - 1)} style={{fontVariationSettings: "'opsz' 6"}}>
          H<tspan fill={C.red}>A</tspan>
        </text>
      )}
    </svg>
  );
};
