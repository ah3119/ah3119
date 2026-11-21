import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, F, SOURCES} from './brand';
import type {CaptionPage} from './types';

export const useScale = () => {
  const {width, height} = useVideoConfig();
  return {s: Math.min(width, height) / 1080, vertical: height > width, width, height};
};
export const fadeIn = (f: number, start = 0, len = 14) =>
  interpolate(f, [start, start + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const rise = (f: number, start = 0, dist = 24) => (1 - fadeIn(f, start, 18)) * dist;

export const Frame: React.FC<{children: React.ReactNode; serial: string; sources: string[]; align?: 'center' | 'start'}> =
  ({children, serial, sources, align = 'center'}) => {
  const {s, width, height, vertical} = useScale();
  const f = useCurrentFrame();
  const label = sources.map((k) => SOURCES[k]?.short).filter(Boolean).join(' · ');
  return (
    <AbsoluteFill style={{background: C.bg, color: C.paper, fontFamily: F.body}}>
      <div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(#ffffff0b 1px, transparent 1px), linear-gradient(90deg, #ffffff0b 1px, transparent 1px)`, backgroundSize: `${90 * s}px ${90 * s}px`, backgroundPosition: `0 ${-(f * 0.5) % (90 * s)}px`}} />
      <div style={{position: 'absolute', top: 56 * s, left: 64 * s, fontFamily: F.mono, fontWeight: 800, fontSize: 24 * s, letterSpacing: 4 * s, color: C.gold, textTransform: 'uppercase', zIndex: 6}}>
        Dossier N°{serial} · Fortunes &amp; Ruines
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
export const Stamp: React.FC<{text: string; delay: number; low?: boolean; centered?: boolean}> = ({text, delay, low, centered}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s, vertical} = useScale();
  if (f < delay) return null;
  const k = spring({frame: f - delay, fps, config: {damping: 9, stiffness: 220}});
  return (
    <div style={{position: 'absolute', ...(centered ? {left: '50%'} : {right: (vertical ? 90 : 130) * s}),
      top: (low ? (vertical ? 1180 : 620) : (vertical ? 250 : 150)) * s,
      transform: `${centered ? 'translateX(-50%) ' : ''}rotate(-8deg) scale(${centered ? 1.45 - .45 * k : 1.7 - .7 * k})`,
      opacity: Math.min(1, k * 2.5), border: `${11 * s}px solid ${C.red}`, color: C.red, fontFamily: F.impact,
      fontSize: (centered ? 104 : 130) * s, lineHeight: 1.05,
      letterSpacing: 6 * s, padding: `${18 * s}px ${30 * s}px ${4 * s}px`}}>{text}</div>
  );
};

// Sous-titres (Shorts). Avec minutage (captions, écrit par « npm run sync ») : chaque page apparaît quand la voix
// la prononce et le mot dit est surligné en jaune (« montrer »). Sans minutage : groupes de mots au rythme de la scène.
export const Subtitles: React.FC<{text: string; frames: number; captions?: CaptionPage[]}> = ({text, frames, captions}) => {
  // frames = durée de la voix (ou de la scène sans voix)
  const f = useCurrentFrame(); const {s} = useScale(); const {fps} = useVideoConfig();
  const box = (children: React.ReactNode) => (
    <div style={{position: 'absolute', left: 60 * s, right: 60 * s, bottom: 260 * s, textAlign: 'center'}}>
      <span style={{background: C.paper, color: C.bg, fontFamily: F.body, fontWeight: 800, fontSize: 52 * s,
        lineHeight: 1.35, padding: `${6 * s}px ${18 * s}px`, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{children}</span>
    </div>
  );
  if (captions?.length) {
    const t = f / fps;
    // Page courante : la dernière commencée (elle reste affichée pendant les silences).
    const page = [...captions].reverse().find((p) => p.start <= t) ?? captions[0];
    return box(page.words.map((w, i) => {
      const on = w.s <= t && t < (page.words[i + 1]?.s ?? w.e + 0.15);
      return <React.Fragment key={i}>{i > 0 && ' '}<span style={{background: on ? C.gold : 'transparent', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{w.t}</span></React.Fragment>;
    }));
  }
  const words = text.split(/\s+/);
  // Groupes de taille égale (≈5 mots) : jamais de mot orphelin en fin de phrase.
  const n = Math.max(1, Math.round(words.length / 5));
  const chunks: string[] = [];
  for (let i = 0; i < n; i++) chunks.push(words.slice(Math.round((i * words.length) / n), Math.round(((i + 1) * words.length) / n)).join(' '));
  const per = (frames - 10) / chunks.length;
  const idx = Math.min(chunks.length - 1, Math.max(0, Math.floor(f / per)));
  return box(chunks[idx]);
};
