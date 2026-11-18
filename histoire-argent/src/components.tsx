import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {T} from './theme';

const useScale = () => {
  const {width, height} = useVideoConfig();
  return {s: Math.min(width, height) / 1080, vertical: height > width};
};
const fadeIn = (f: number, start = 0, len = 15) =>
  interpolate(f, [start, start + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Frame: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {s} = useScale();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, #2a2218 0%, ${T.bg} 70%)`,
      justifyContent: 'center', alignItems: 'center', padding: 90 * s, color: T.paper, fontFamily: T.serif}}>
      {children}
    </AbsoluteFill>
  );
};

export const Title: React.FC<{kicker: string; title: string; sub: string}> = ({kicker, title, sub}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s} = useScale();
  const pop = spring({frame: f, fps, config: {damping: 14}});
  return (
    <Frame>
      <div style={{textAlign: 'center'}}>
        <div style={{fontFamily: T.sans, letterSpacing: 6 * s, fontSize: 30 * s, color: T.gold, opacity: fadeIn(f)}}>{kicker.toUpperCase()}</div>
        <div style={{fontSize: 190 * s, transform: `scale(${pop})`, margin: `${20 * s}px 0`}}>{title}</div>
        <div style={{fontSize: 54 * s, fontStyle: 'italic', opacity: fadeIn(f, 20)}}>{sub}</div>
      </div>
    </Frame>
  );
};

export const Card: React.FC<{lines: string[]; source?: string}> = ({lines, source}) => {
  const f = useCurrentFrame(); const {s} = useScale();
  return (
    <Frame>
      <div style={{textAlign: 'center'}}>
        {lines.map((l, i) => (
          <div key={i} style={{fontSize: 72 * s, lineHeight: 1.3, opacity: fadeIn(f, i * 25),
            transform: `translateY(${(1 - fadeIn(f, i * 25)) * 30 * s}px)`, color: i === lines.length - 1 ? T.gold : T.paper}}>{l}</div>
        ))}
        {source && <div style={{fontFamily: T.sans, fontSize: 22 * s, color: T.dim, marginTop: 40 * s}}>{source}</div>}
      </div>
    </Frame>
  );
};

export const Timeline: React.FC<{events: {year: string; label: string}[]}> = ({events}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig(); const {s, vertical} = useScale();
  const step = (durationInFrames - 30) / events.length;
  const progress = interpolate(f, [0, durationInFrames - 30], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <Frame>
      <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: vertical ? 'column' : 'row', justifyContent: 'space-between'}}>
        <div style={{position: 'absolute', background: T.gold, ...(vertical
          ? {left: 18 * s, top: 0, width: 4 * s, height: `${progress * 100}%`}
          : {top: 18 * s, left: 0, height: 4 * s, width: `${progress * 100}%`})}} />
        {events.map((e, i) => {
          const o = fadeIn(f, i * step);
          return (
            <div key={i} style={{opacity: o, flex: 1, display: 'flex', flexDirection: vertical ? 'row' : 'column', gap: 20 * s, padding: 10 * s}}>
              <div style={{width: 40 * s, height: 40 * s, borderRadius: '50%', background: T.gold, flexShrink: 0}} />
              <div>
                <div style={{fontSize: 56 * s, color: T.gold}}>{e.year}</div>
                <div style={{fontFamily: T.sans, fontSize: 28 * s, maxWidth: 260 * s * (vertical ? 3 : 1)}}>{e.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

export const Curve: React.FC<{points: {t: string; v: number}[]; unit: string; source: string}> = ({points, unit, source}) => {
  const f = useCurrentFrame(); const {width, height, durationInFrames} = useVideoConfig(); const {s} = useScale();
  const W = width - 260 * s, H = height * 0.5;
  const max = Math.max(...points.map((p) => p.v));
  const xy = points.map((p, i) => [(i / (points.length - 1)) * W, H - (p.v / max) * H] as const);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');
  const draw = interpolate(f, [10, durationInFrames * 0.8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const idx = Math.min(points.length - 1, Math.floor(draw * (points.length - 1) + 0.0001));
  const crashing = idx > points.findIndex((p) => p.v === max);
  return (
    <Frame>
      <div style={{fontSize: 140 * s, color: crashing ? T.red : T.gold, fontFamily: T.sans, fontWeight: 700}}>
        {points[idx].v.toLocaleString('fr-FR')} <span style={{fontSize: 50 * s}}>{unit}</span>
      </div>
      <div style={{fontFamily: T.sans, fontSize: 32 * s, color: T.dim, marginBottom: 30 * s}}>{points[idx].t}</div>
      <svg width={W} height={H + 10} style={{overflow: 'visible'}}>
        <path d={d} fill="none" stroke={crashing ? T.red : T.gold} strokeWidth={8 * s} pathLength={1}
          strokeDasharray={1} strokeDashoffset={1 - draw} strokeLinejoin="round" />
      </svg>
      <div style={{fontFamily: T.sans, fontSize: 20 * s, color: T.dim, marginTop: 40 * s}}>{source}</div>
    </Frame>
  );
};
