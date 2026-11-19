import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, F, SOURCES} from './brand';

export const useScale = () => {
  const {width, height} = useVideoConfig();
  return {s: Math.min(width, height) / 1080, vertical: height > width, width, height};
};
export const fadeIn = (f: number, start = 0, len = 14) =>
  interpolate(f, [start, start + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const rise = (f: number, start = 0, dist = 24) => (1 - fadeIn(f, start, 18)) * dist;

// Ondes guillochées de fond : texture « billet », très discrète.
const Waves: React.FC<{w: number; h: number}> = ({w, h}) => {
  const f = useCurrentFrame();
  const paths = useMemo(() => {
    const out: string[] = [];
    for (let j = 0; j < 18; j++) {
      let p = '';
      for (let x = 0; x <= w; x += 12) {
        const y = h * 0.72 + Math.sin(x / 150 + j * 0.35) * 46 * Math.cos(x / 470 + j * 0.12) + j * 3;
        p += (x ? 'L' : 'M') + x + ',' + y.toFixed(1);
      }
      out.push(p);
    }
    return out;
  }, [w, h]);
  return (
    <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
      <g transform={`translate(${-(f * 0.4) % 60},0)`}>
        {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={C.paper} strokeOpacity={0.035 + 0.025 * (i % 3)} strokeWidth={1.2} />)}
      </g>
    </svg>
  );
};

export const Frame: React.FC<{children: React.ReactNode; serial: string; sources: string[]; align?: 'center' | 'start'}> =
  ({children, serial, sources, align = 'center'}) => {
  const {s, width, height, vertical} = useScale();
  const f = useCurrentFrame();
  const label = sources.map((k) => SOURCES[k]?.short).filter(Boolean).join(' · ');
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, ${C.ink} 0%, ${C.bg} 78%)`, color: C.paper, fontFamily: F.body}}>
      <Waves w={width} h={height} />
      <div style={{position: 'absolute', top: 56 * s, left: 64 * s, fontFamily: F.mono, fontSize: 22 * s, letterSpacing: 4 * s, color: C.dim, textTransform: 'uppercase'}}>
        N° {serial} · L'Histoire de l'Argent
      </div>
      <AbsoluteFill style={{justifyContent: align === 'center' ? 'center' : 'flex-start', alignItems: 'center',
        padding: `${(vertical ? 220 : 150) * s}px ${(vertical ? 70 : 140) * s}px`}}>
        {children}
      </AbsoluteFill>
      {label && (
        <div style={{position: 'absolute', left: 64 * s, right: 64 * s, bottom: (vertical ? 120 : 50) * s, fontFamily: F.body,
          fontSize: 21 * s, color: C.dim, opacity: fadeIn(f, 10), textAlign: vertical ? 'center' : 'left'}}>
          Source : {label}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Signature n°3 : le tampon rouge, une seule fois par épisode.
export const Stamp: React.FC<{text: string; delay: number}> = ({text, delay}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s, vertical} = useScale();
  if (f < delay) return null;
  const k = spring({frame: f - delay, fps, config: {damping: 9, stiffness: 220}});
  return (
    <div style={{position: 'absolute', right: (vertical ? 90 : 130) * s, top: (vertical ? 250 : 150) * s,
      transform: `rotate(-8deg) scale(${1.7 - 0.7 * k})`, opacity: Math.min(1, k * 2.5),
      border: `${11 * s}px solid ${C.red}`, color: C.red, fontFamily: F.impact, fontSize: 130 * s, lineHeight: 1.05,
      letterSpacing: 6 * s, padding: `${18 * s}px ${30 * s}px ${4 * s}px`}}>{text}</div>
  );
};

// Sous-titres (Shorts) : la narration découpée en groupes de mots, au rythme de la scène.
export const Subtitles: React.FC<{text: string; frames: number}> = ({text, frames}) => {
  // frames = durée de la voix (ou de la scène sans voix)
  const f = useCurrentFrame(); const {s} = useScale();
  const words = text.split(/\s+/);
  // Groupes de taille égale (≈5 mots) : jamais de mot orphelin en fin de phrase.
  const n = Math.max(1, Math.round(words.length / 5));
  const chunks: string[] = [];
  for (let i = 0; i < n; i++) chunks.push(words.slice(Math.round((i * words.length) / n), Math.round(((i + 1) * words.length) / n)).join(' '));
  const per = (frames - 10) / chunks.length;
  const idx = Math.min(chunks.length - 1, Math.max(0, Math.floor(f / per)));
  return (
    <div style={{position: 'absolute', left: 60 * s, right: 60 * s, bottom: 260 * s, textAlign: 'center'}}>
      <span style={{background: C.paper, color: C.bg, fontFamily: F.body, fontWeight: 600, fontSize: 50 * s,
        lineHeight: 1.35, padding: `${6 * s}px ${18 * s}px`, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{chunks[idx]}</span>
    </div>
  );
};
