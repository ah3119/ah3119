import React from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, F} from '../brand';
import {Visual} from '../types';
import {Rosette} from '../Rosette';
import {fadeIn, rise, useScale} from '../kit';

type V<T extends Visual['type']> = Extract<Visual, {type: T}>;
const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/ | /g, ' ');

// Signature n°1 : la rosace se trace, le numéro s'imprime.
export const Title: React.FC<V<'title'> & {serial: string}> = ({title, subtitle, serial}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s} = useScale();
  const draw = interpolate(f, [0, 0.9 * fps], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  return (
    <div style={{display: 'grid', justifyItems: 'center', gap: 26 * s, textAlign: 'center'}}>
      <Rosette size={260 * s} progress={draw} />
      <div style={{fontFamily: F.mono, color: C.red, fontSize: 30 * s, letterSpacing: 8 * s, opacity: fadeIn(f, 12)}}>N° {serial}</div>
      <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 150 * s, lineHeight: 1, opacity: fadeIn(f, 14), transform: `translateY(${rise(f, 14)}px)`}}>{title}</div>
      <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 50 * s, opacity: fadeIn(f, 26), maxWidth: 1400 * s}}>{subtitle}</div>
    </div>
  );
};

export const Card: React.FC<V<'card'>> = ({kicker, lines, sober}) => {
  const f = useCurrentFrame(); const {s} = useScale();
  return (
    <div style={{display: 'grid', gap: 22 * s, textAlign: 'center', maxWidth: 1500 * s}}>
      {kicker && <div style={{fontFamily: F.mono, fontSize: 28 * s, letterSpacing: 6 * s, color: C.gold, textTransform: 'uppercase', opacity: fadeIn(f)}}>{kicker}</div>}
      {lines.map((l, i) => (
        <div key={i} style={{fontFamily: F.display, fontWeight: i === 0 ? 800 : 500, fontStyle: i > 0 && !sober ? 'italic' : 'normal',
          fontSize: (i === 0 ? 88 : 66) * s, lineHeight: 1.15, opacity: fadeIn(f, 10 + i * 22), transform: `translateY(${rise(f, 10 + i * 22)}px)`}}>{l}</div>
      ))}
    </div>
  );
};

export const Quote: React.FC<V<'quote'>> = ({quote, author}) => {
  const f = useCurrentFrame(); const {s} = useScale();
  return (
    <div style={{display: 'grid', gap: 30 * s, maxWidth: 1450 * s, textAlign: 'center'}}>
      <div style={{fontFamily: F.display, fontSize: 200 * s, lineHeight: 0.6, color: C.gold, opacity: fadeIn(f)}}>«</div>
      <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 72 * s, lineHeight: 1.2, opacity: fadeIn(f, 8), transform: `translateY(${rise(f, 8)}px)`}}>{quote}</div>
      <div style={{fontFamily: F.mono, fontSize: 26 * s, letterSpacing: 5 * s, color: C.dim, textTransform: 'uppercase', opacity: fadeIn(f, 40)}}>— {author}</div>
    </div>
  );
};

export const Timeline: React.FC<V<'timeline'>> = ({events, focus = 0}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig(); const {s, vertical} = useScale();
  const step = Math.min(24, (durationInFrames * 0.5) / events.length);
  const prog = interpolate(f, [0, step * events.length], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: (vertical ? 50 : 20) * s}}>
      <div style={{position: 'absolute', background: C.gold, ...(vertical
        ? {left: 19 * s, top: 20 * s, width: 3 * s, height: `calc(${prog * 100}% - ${40 * s}px)`}
        : {top: 20 * s, left: 20 * s, height: 3 * s, width: `calc(${prog * 100}% - ${40 * s}px)`})}} />
      {events.map((e, i) => {
        const on = i === focus; const o = fadeIn(f, i * step);
        const pulse = on ? spring({frame: f - events.length * step, fps: 30, config: {damping: 12}}) : 0;
        return (
          <div key={i} style={{flex: 1, minWidth: 0, opacity: o * (on ? 1 : 0.55), display: 'flex', flexDirection: vertical ? 'row' : 'column', gap: 22 * s}}>
            <div style={{width: 42 * s, height: 42 * s, borderRadius: '50%', flexShrink: 0, background: on ? C.red : C.bg,
              border: `${3 * s}px solid ${on ? C.red : C.gold}`, transform: `scale(${1 + pulse * 0.25})`}} />
            <div>
              <div style={{fontFamily: F.display, fontWeight: 800, fontSize: (on ? 70 : 54) * s, lineHeight: 1}}>{e.year}</div>
              <div style={{fontFamily: F.body, fontSize: 30 * s, marginTop: 8 * s, color: on ? C.paper : C.dim}}>{e.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Signature n°2 : le numéroteur, chiffres mécaniques.
export const Counter: React.FC<V<'counter'>> = ({from, to, unit, fromLabel, toLabel}) => {
  const f = useCurrentFrame(); const {fps, durationInFrames} = useVideoConfig(); const {s} = useScale();
  const end = Math.min(durationInFrames * 0.55, 3.2 * fps);
  const k = interpolate(f, [12, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const v = from + (to - from) * k;
  const down = to < from;
  return (
    <div style={{display: 'grid', justifyItems: 'center', gap: 18 * s, textAlign: 'center'}}>
      <div style={{fontFamily: F.mono, fontSize: 30 * s, letterSpacing: 6 * s, color: C.gold, textTransform: 'uppercase'}}>{k < 1 ? fromLabel : toLabel}</div>
      <div style={{fontFamily: F.impact, fontSize: 300 * s, lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: down && k > 0.5 ? C.red : C.paper}}>{fmt(v)}</div>
      <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 60 * s}}>{unit}</div>
      {!down && k >= 1 && from > 0 && (
        <div style={{fontFamily: F.impact, fontSize: 110 * s, color: C.paper, opacity: fadeIn(f, end + 4),
          transform: `scale(${spring({frame: f - end - 4, fps, config: {damping: 10}})})`}}>×{Math.round(to / from)}</div>
      )}
    </div>
  );
};

export const Curve: React.FC<V<'curve'>> = ({points, unit, upTo, startAt = 0, note}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig(); const {s, width, height, vertical} = useScale();
  const W = width - (vertical ? 140 : 300) * s, H = height * (vertical ? 0.3 : 0.42);
  const max = Math.max(...points.map((p) => p.v));
  const peak = points.findIndex((p) => p.v === max);
  const xy = points.map((p, i) => [(i / (points.length - 1)) * W, H - (p.v / max) * H] as const);
  const progAt = (fr: number) => interpolate(fr, [8, durationInFrames * 0.7], [startAt, upTo], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const prog = progAt(f);
  const i0 = Math.floor(prog), frac = prog - i0;
  const head = i0 >= points.length - 1 ? xy[points.length - 1] : [xy[i0][0] + (xy[i0 + 1][0] - xy[i0][0]) * frac, xy[i0][1] + (xy[i0 + 1][1] - xy[i0][1]) * frac];
  const val = i0 >= points.length - 1 ? points[points.length - 1].v : points[i0].v + (points[i0 + 1].v - points[i0].v) * frac;
  const label = points[Math.min(points.length - 1, Math.round(prog))].t;
  const crashing = prog > peak + 0.05;
  const up = xy.slice(0, Math.min(i0, peak) + 1).map(([x, y]) => `${x},${y}`).concat(prog <= peak ? [`${head[0]},${head[1]}`] : []);
  const down = crashing ? xy.slice(peak, i0 + 1).map(([x, y]) => `${x},${y}`).concat([`${head[0]},${head[1]}`]) : [];
  return (
    <div style={{display: 'grid', justifyItems: 'center', gap: 10 * s}}>
      <div style={{fontFamily: F.impact, fontSize: 170 * s, lineHeight: 1, color: crashing ? C.red : C.paper, fontVariantNumeric: 'tabular-nums'}}>
        {fmt(val)} <span style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 54 * s}}>{unit}</span>
      </div>
      <div style={{fontFamily: F.mono, fontSize: 28 * s, letterSpacing: 5 * s, color: C.gold, textTransform: 'uppercase', marginBottom: 24 * s}}>{label}</div>
      <svg width={W} height={H + 20 * s} style={{overflow: 'visible'}}>
        <line x1={0} y1={H} x2={W} y2={H} stroke={C.paper} strokeOpacity={0.2} strokeWidth={2 * s} />
        <polyline points={up.join(' ')} fill="none" stroke={C.paper} strokeWidth={8 * s} strokeLinejoin="round" strokeLinecap="round" />
        {crashing && <polyline points={down.join(' ')} fill="none" stroke={C.red} strokeWidth={8 * s} strokeLinejoin="round" strokeLinecap="round" />}
        <circle cx={head[0]} cy={head[1]} r={14 * s} fill={crashing ? C.red : C.paper} />
      </svg>
      {note && <div style={{fontFamily: F.body, fontSize: 22 * s, color: C.dim, marginTop: 14 * s}}>{note}</div>}
    </div>
  );
};

export const Flow: React.FC<V<'flow'>> = ({nodes, loop, caption}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s, vertical} = useScale();
  const step = 0.7 * fps;
  return (
    <div style={{display: 'grid', justifyItems: 'center', gap: 50 * s}}>
      <div style={{display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'center', gap: 26 * s}}>
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{fontFamily: F.impact, fontSize: 70 * s, color: C.gold, opacity: fadeIn(f, i * step - 6), transform: vertical ? 'rotate(90deg)' : 'none'}}>→</div>}
            <div style={{border: `${3 * s}px solid ${C.paper}`, padding: `${26 * s}px ${40 * s}px`, fontFamily: F.display, fontWeight: 800,
              fontSize: 58 * s, background: C.ink, opacity: fadeIn(f, i * step), transform: `scale(${0.85 + 0.15 * spring({frame: f - i * step, fps, config: {damping: 14}})})`}}>{n}</div>
          </React.Fragment>
        ))}
      </div>
      {loop && (
        <div style={{fontFamily: F.mono, fontSize: 28 * s, letterSpacing: 4 * s, color: C.gold, opacity: fadeIn(f, nodes.length * step + 4)}}>
          ↺ ET ON RECOMMENCE, PLUS GRAND
        </div>
      )}
      {caption && <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 56 * s, textAlign: 'center', opacity: fadeIn(f, nodes.length * step + 20)}}>{caption}</div>}
    </div>
  );
};

export const Lesson: React.FC<V<'lesson'> & {outro: string}> = ({lines, next, outro}) => {
  const f = useCurrentFrame(); const {fps, durationInFrames} = useVideoConfig(); const {s} = useScale();
  const outroAt = durationInFrames - 4.2 * fps;
  return (
    <div style={{display: 'grid', justifyItems: 'center', gap: 34 * s, textAlign: 'center', maxWidth: 1500 * s}}>
      {lines.map((l, i) => (
        <div key={i} style={{fontFamily: F.display, fontWeight: i ? 500 : 800, fontStyle: i ? 'italic' : 'normal', fontSize: 74 * s, lineHeight: 1.15,
          color: i ? C.gold : C.paper, opacity: fadeIn(f, i * 30)}}>{l}</div>
      ))}
      <div style={{display: 'flex', alignItems: 'center', gap: 28 * s, marginTop: 30 * s, opacity: fadeIn(f, outroAt)}}>
        <Rosette size={120 * s} progress={interpolate(f, [outroAt, outroAt + fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
        <div style={{textAlign: 'left'}}>
          <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 52 * s}}>{outro}</div>
          <div style={{fontFamily: F.mono, fontSize: 24 * s, letterSpacing: 4 * s, color: C.red, textTransform: 'uppercase', marginTop: 8 * s}}>{next}</div>
        </div>
      </div>
    </div>
  );
};

// Moment du tampon : à la bascule de la courbe, sinon aux deux tiers de la scène.
export const stampDelay = (v: Visual, frames: number) => {
  if (v.type !== 'curve') return Math.round(frames * 0.6);
  const max = Math.max(...v.points.map((p) => p.v));
  const peak = v.points.findIndex((p) => p.v === max);
  for (let fr = 0; fr < frames; fr++) {
    const p = interpolate(fr, [8, frames * 0.7], [v.startAt ?? 0, v.upTo], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
    if (p > peak + 0.05) return fr + 6;
  }
  return Math.round(frames * 0.6);
};
