import React, {useId, useMemo} from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, F} from '../brand';
import {Rosette} from '../Rosette';
import {fadeIn, useScale} from '../kit';

// Générateur pseudo-aléatoire déterministe : même image à chaque rendu.
const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/ | /g, ' ');

// Un billet de banque stylisé (charte : encre, papier, rosace, numéro).
export const Bill: React.FC<{w: number; value?: string; burn?: number; serial?: string}> = ({w, value = '100', burn = 0, serial = 'N° 1719'}) => {
  const h = w * 0.5;
  const uid = useId().replace(/:/g, '');
  return (
    <svg width={w} height={h} viewBox="0 0 200 100" style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={`g${uid}`} x1="0" x2="1">
          <stop offset={Math.max(0, burn - 0.15)} stopColor="#000" stopOpacity={0} />
          <stop offset={burn} stopColor={C.red} stopOpacity={0.9} />
          <stop offset={Math.min(1, burn + 0.05)} stopColor={C.gold} stopOpacity={0.9} />
          <stop offset={Math.min(1, burn + 0.08)} stopColor={C.paper} stopOpacity={0} />
        </linearGradient>
        <clipPath id={`c${uid}`}><rect x={burn * 200} y={0} width={200} height={100} /></clipPath>
      </defs>
      <g clipPath={burn > 0 ? `url(#c${uid})` : undefined}>
        <rect x={1} y={1} width={198} height={98} rx={3} fill={C.paper} stroke={C.ink} strokeWidth={2} />
        <rect x={7} y={7} width={186} height={86} rx={2} fill="none" stroke={C.ink} strokeWidth={0.8} />
        {[...Array(9)].map((_, i) => (
          <path key={i} d={`M10 ${30 + i * 5} Q 60 ${20 + i * 5} 100 ${30 + i * 5} T 190 ${30 + i * 5}`} fill="none" stroke={C.ink} strokeOpacity={0.18} strokeWidth={0.6} />
        ))}
        <foreignObject x={14} y={22} width={56} height={56}><Rosette size={56} bg={C.paper} fg={C.ink} monogram={false} /></foreignObject>
        <text x={135} y={52} textAnchor="middle" fontFamily={F.impact} fontSize={34} fill={C.ink}>{value}</text>
        <text x={135} y={68} textAnchor="middle" fontFamily={F.display} fontStyle="italic" fontSize={12} fill={C.ink}>livres tournois</text>
        <text x={135} y={86} textAnchor="middle" fontFamily={F.mono} fontSize={8} letterSpacing={1.5} fill={C.red}>{serial}</text>
        <text x={100} y={17} textAnchor="middle" fontFamily={F.mono} fontSize={7} letterSpacing={2} fill={C.ink}>BANQUE ROYALE</text>
      </g>
      {burn > 0 && <rect x={0} y={0} width={200} height={100} fill={`url(#g${uid})`} />}
    </svg>
  );
};

// Léger travelling avant sur toute la scène, comme une caméra.
export const Push: React.FC<{children: React.ReactNode; amount?: number}> = ({children, amount = 0.07}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig();
  const k = interpolate(f, [0, durationInFrames], [1, 1 + amount]);
  return <AbsoluteFill style={{transform: `scale(${k})`}}>{children}</AbsoluteFill>;
};

const Caption: React.FC<{kicker?: string; title: string; top?: number; color?: string}> = ({kicker, title, top = 0.12, color = C.paper}) => {
  const f = useCurrentFrame(); const {s, height} = useScale();
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: height * top, textAlign: 'center', padding: `0 ${60 * s}px`, zIndex: 5, textShadow: `0 ${4 * s}px ${24 * s}px ${C.bg}`}}>
      {kicker && <div style={{fontFamily: F.mono, fontSize: 30 * s, letterSpacing: 7 * s, color: C.gold, textTransform: 'uppercase', opacity: fadeIn(f)}}>{kicker}</div>}
      <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 96 * s, lineHeight: 1.02, color, marginTop: 12 * s,
        transform: `scale(${0.92 + 0.08 * spring({frame: f - 2, fps: 30, config: {damping: 12}})})`, opacity: fadeIn(f, 2, 8)}}>{title}</div>
    </div>
  );
};

// ── Presse à billets : la plaque frappe, les billets s'envolent.
export const Press: React.FC<{kicker?: string; title: string}> = ({kicker, title}) => {
  const f = useCurrentFrame(); const {s, width, height} = useScale();
  const period = 14; const phase = (f % period) / period;
  const plate = phase < 0.25 ? interpolate(phase, [0, 0.25], [0, 1], {easing: Easing.in(Easing.quad)}) : interpolate(phase, [0.25, 1], [1, 0]);
  const cx = width / 2, base = height * 0.62;
  const bills = useMemo(() => { const r = rng(7); return [...Array(14)].map(() => ({vx: (r() - 0.5) * 34, vy: -14 - r() * 16, rot: (r() - 0.5) * 30, delay: 0})); }, []);
  return (
    <AbsoluteFill>
      <Push>
        {/* bâti de la presse */}
        <div style={{position: 'absolute', left: cx - 300 * s, top: base - 520 * s, width: 600 * s, height: 40 * s, background: C.ink, border: `${4 * s}px solid ${C.paper}`}} />
        <div style={{position: 'absolute', left: cx - 300 * s, top: base - 520 * s, width: 40 * s, height: 560 * s, background: C.ink, border: `${4 * s}px solid ${C.paper}`}} />
        <div style={{position: 'absolute', left: cx + 260 * s, top: base - 520 * s, width: 40 * s, height: 560 * s, background: C.ink, border: `${4 * s}px solid ${C.paper}`}} />
        <div style={{position: 'absolute', left: cx - 14 * s, top: base - 480 * s, width: 28 * s, height: (170 + plate * 200) * s, background: C.paper}} />
        <div style={{position: 'absolute', left: cx - 220 * s, top: base - (310 - plate * 200) * s, width: 440 * s, height: 60 * s, background: C.gold, border: `${4 * s}px solid ${C.paper}`}} />
        <div style={{position: 'absolute', left: cx - 260 * s, top: base + 40 * s, width: 520 * s, height: 30 * s, background: C.paper}} />
        <div style={{position: 'absolute', left: cx - 190 * s, top: base - 150 * s}}><Bill w={380 * s} value="100" /></div>
        {/* éclair au moment de l'impact */}
        <div style={{position: 'absolute', left: 0, right: 0, top: base - 200 * s, height: 300 * s, background: `radial-gradient(circle, ${C.paper}55 0%, transparent 60%)`, opacity: plate > 0.95 ? 1 : 0}} />
        {/* billets éjectés à chaque coup */}
        {[...Array(Math.min(8, Math.floor(f / period) + 1))].map((_, k) => bills.slice(k * 2, k * 2 + 2).map((b, i) => {
          const t = (f - k * period) / 30; if (t < 0) return null;
          const x = cx - 120 * s + b.vx * t * 30 * s, y = base - 160 * s + (b.vy * t + 30 * t * t) * 30 * s;
          return <div key={`${k}-${i}`} style={{position: 'absolute', left: x, top: y, transform: `rotate(${b.rot * t * 3}deg)`}}><Bill w={240 * s} value="100" /></div>;
        }))}
      </Push>
      <Caption kicker={kicker} title={title} />
    </AbsoluteFill>
  );
};

// ── Foule de la rue Quincampoix : trois plans de silhouettes, enseigne, bandeau de cours.
export const Crowd: React.FC<{kicker?: string; title: string; ticker: string}> = ({kicker, title, ticker}) => {
  const f = useCurrentFrame(); const {s, width, height} = useScale();
  const people = useMemo(() => {
    const r = rng(42); const out: {x: number; layer: number; h: number; hat: boolean; ph: number}[] = [];
    for (let layer = 0; layer < 3; layer++) for (let i = 0; i < 9 + layer * 3; i++) out.push({x: r(), layer, h: 0.8 + r() * 0.35, hat: r() > 0.45, ph: r() * 6});
    return out;
  }, []);
  const ground = height * 0.86;
  return (
    <AbsoluteFill>
      <Push amount={0.05}>
        {/* façades */}
        <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
          {[...Array(6)].map((_, i) => {
            const w = width / 5, x = i * w - w * 0.3, top = height * (0.3 + (i % 3) * 0.04);
            return (
              <g key={i}>
                <rect x={x} y={top} width={w - 6 * s} height={ground - top} fill={C.ink} stroke={C.paper} strokeOpacity={0.25} strokeWidth={2 * s} />
                {[...Array(4)].map((__, j) => [...Array(2)].map((___, k) => (
                  <rect key={`${j}-${k}`} x={x + w * 0.18 + k * w * 0.36} y={top + 40 * s + j * 110 * s} width={w * 0.22} height={70 * s}
                    fill={C.gold} opacity={(i + j + k) % 3 === 0 ? 0.55 : 0.12} />
                )))}
              </g>
            );
          })}
        </svg>
        {/* enseigne */}
        <div style={{position: 'absolute', left: width * 0.5 - 300 * s, top: height * 0.3, width: 600 * s, padding: `${14 * s}px 0`, textAlign: 'center',
          background: C.paper, color: C.bg, fontFamily: F.mono, fontSize: 34 * s, letterSpacing: 6 * s, transform: `rotate(${Math.sin(f / 18) * 1.5}deg)`}}>RUE QUINCAMPOIX</div>
        {/* silhouettes */}
        <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
          {people.map((p, i) => {
            const scale = (0.85 + p.layer * 0.4) * s * p.h;
            const x = ((p.x * width * 1.2 + (p.layer + 1) * f * 0.6) % (width * 1.2)) - width * 0.1;
            const bob = Math.abs(Math.sin(f / 5 + p.ph)) * 10 * scale;
            const y = ground + p.layer * 60 * s - bob;
            const col = p.layer === 2 ? '#05140d' : p.layer === 1 ? '#0e2c20' : '#1d4a37';
            return (
              <g key={i} transform={`translate(${x},${y}) scale(${scale})`}>
                <path d="M-70 0 C -70 -150 -40 -190 0 -190 C 40 -190 70 -150 70 0 Z" fill={col} />
                <circle cx={0} cy={-235} r={42} fill={col} />
                {p.hat ? <path d="M-70 -262 L 0 -300 L 70 -262 L 0 -248 Z" fill={col} /> : <path d="M-46 -250 Q 0 -300 46 -250 L 52 -205 L -52 -205 Z" fill={col} />}
                {p.layer === 2 && i % 4 === 0 && <rect x={-30} y={-330 - bob} width={60} height={34} fill={C.paper} transform={`rotate(${Math.sin(f / 6 + i) * 20} 0 -313)`} />}
              </g>
            );
          })}
        </svg>
      </Push>
      {/* bandeau défilant */}
      <div style={{position: 'absolute', left: 0, right: 0, top: height * 0.2, height: 70 * s, background: C.red, overflow: 'hidden', zIndex: 4}}>
        <div style={{whiteSpace: 'nowrap', fontFamily: F.impact, fontSize: 48 * s, lineHeight: `${70 * s}px`, color: C.paper, transform: `translateX(${-f * 9 * s}px)`}}>
          {(ticker + '   ●   ').repeat(8)}
        </div>
      </div>
      <Caption kicker={kicker} title={title} top={0.08} />
    </AbsoluteFill>
  );
};

// ── Compteur nerveux : paliers successifs, chaque palier frappe.
export const Ticker: React.FC<{values: number[]; unit: string; label: string}> = ({values, unit, label}) => {
  const f = useCurrentFrame(); const {fps, durationInFrames} = useVideoConfig(); const {s, width, height} = useScale();
  const step = Math.max(10, Math.floor((durationInFrames - 10) / values.length));
  const idx = Math.min(values.length - 1, Math.floor(f / step));
  const local = f - idx * step;
  const punch = spring({frame: local, fps, config: {damping: 8, stiffness: 260}});
  const prev = idx ? values[idx - 1] : 0;
  const v = prev + (values[idx] - prev) * Math.min(1, local / 6);
  const pct = values[idx] / values[values.length - 1];
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      {/* pile de billets qui monte */}
      <div style={{position: 'absolute', bottom: height * 0.18, left: width / 2 - 200 * s, width: 400 * s, height: height * 0.36 * pct,
        background: `repeating-linear-gradient(0deg, ${C.paper} 0 ${10 * s}px, ${C.ink} ${10 * s}px ${13 * s}px)`, opacity: 0.25}} />
      <div style={{fontFamily: F.mono, fontSize: 34 * s, letterSpacing: 7 * s, color: C.gold, textTransform: 'uppercase', marginBottom: 20 * s}}>{label}</div>
      <div style={{fontFamily: F.impact, fontSize: 330 * s, lineHeight: 1, color: C.paper, fontVariantNumeric: 'tabular-nums', transform: `scale(${1.25 - 0.25 * punch})`}}>{fmt(v)}</div>
      <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 70 * s}}>{unit}</div>
      <div style={{position: 'absolute', inset: 0, background: C.paper, opacity: Math.max(0, 0.25 - local * 0.05)}} />
    </AbsoluteFill>
  );
};

// ── Pièce à conviction : un document qui glisse à l'écran, scellé de cire.
export const Doc: React.FC<{kicker: string; lines: string[]; seal?: string; redLine?: number}> = ({kicker, lines, seal, redLine}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s, width, height} = useScale();
  const k = spring({frame: f, fps, config: {damping: 15, stiffness: 90}});
  const sealK = spring({frame: f - 22, fps, config: {damping: 7, stiffness: 240}});
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <Push amount={0.05}>
        <div style={{position: 'absolute', left: width / 2 - 410 * s, top: height / 2 - 560 * s, width: 820 * s, height: 1080 * s, background: C.paper, color: C.bg,
          transform: `translateY(${(1 - k) * height}px) rotate(${-3 + (1 - k) * 10}deg)`, boxShadow: `0 ${30 * s}px ${80 * s}px #0008`, padding: `${80 * s}px ${70 * s}px`, boxSizing: 'border-box'}}>
          <div style={{fontFamily: F.mono, fontSize: 26 * s, letterSpacing: 6 * s, color: C.ink, textTransform: 'uppercase', borderBottom: `${2 * s}px solid ${C.ink}`, paddingBottom: 18 * s}}>{kicker}</div>
          {lines.map((l, i) => (
            <div key={i} style={{fontFamily: F.display, fontWeight: i === redLine ? 800 : 500, fontStyle: i === redLine ? 'normal' : 'italic', fontSize: (i === redLine ? 84 : 52) * s,
              lineHeight: 1.15, marginTop: 34 * s, color: i === redLine ? C.red : C.bg, opacity: fadeIn(f, 10 + i * 8)}}>{l}</div>
          ))}
          {[...Array(5)].map((_, i) => <div key={i} style={{height: 3 * s, background: C.ink, opacity: 0.15, marginTop: 34 * s, width: `${90 - i * 9}%`}} />)}
          {seal && (
            <div style={{position: 'absolute', right: 60 * s, bottom: 60 * s, width: 190 * s, height: 190 * s, borderRadius: '50%', background: C.red, color: C.paper,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.display, fontWeight: 800, fontSize: 40 * s, textAlign: 'center',
              transform: `scale(${f < 22 ? 0 : 1.6 - 0.6 * sealK}) rotate(-12deg)`, boxShadow: `inset 0 0 0 ${10 * s}px #0003`}}>{seal}</div>
          )}
        </div>
      </Push>
    </AbsoluteFill>
  );
};

// ── La machine : trois étapes sur un cercle, les billets tournent de plus en plus vite.
export const Machine: React.FC<{nodes: string[]; center: string}> = ({nodes, center}) => {
  const f = useCurrentFrame(); const {s, width, height} = useScale();
  const R = 340 * s, cx = width / 2, cy = height * 0.5;
  const speed = interpolate(f, [0, 90], [0.02, 0.09], {extrapolateRight: 'clamp'});
  const angle0 = f * speed * (1 + f / 200);
  return (
    <AbsoluteFill>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.gold} strokeWidth={4 * s} strokeDasharray={`${18 * s} ${14 * s}`} strokeDashoffset={-f * 4} />
      </svg>
      {[...Array(10)].map((_, i) => {
        const a = angle0 + (i / 10) * Math.PI * 2;
        return <div key={i} style={{position: 'absolute', left: cx + Math.cos(a) * R - 70 * s, top: cy + Math.sin(a) * R - 35 * s, transform: `rotate(${(a * 180) / Math.PI + 90}deg)`}}><Bill w={140 * s} /></div>;
      })}
      {nodes.map((n, i) => {
        const a = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2;
        const o = fadeIn(f, i * 10);
        return (
          <div key={i} style={{position: 'absolute', left: cx + Math.cos(a) * R * 1.02, top: cy + Math.sin(a) * R * 1.02, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * o})`, opacity: o,
            background: C.bg, border: `${4 * s}px solid ${C.paper}`, padding: `${18 * s}px ${30 * s}px`, fontFamily: F.display, fontWeight: 800, fontSize: 56 * s, whiteSpace: 'nowrap'}}>{n}</div>
        );
      })}
      <div style={{position: 'absolute', left: cx, top: cy, transform: 'translate(-50%,-50%)', textAlign: 'center', fontFamily: F.display, fontStyle: 'italic', fontSize: 52 * s, maxWidth: 420 * s, opacity: fadeIn(f, 30)}}>{center}</div>
    </AbsoluteFill>
  );
};

// ── Le guichet : on rend les billets, la pile d'or fond.
export const GoldDrain: React.FC<{title: string; drain?: boolean}> = ({title, drain}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig(); const {s, width, height} = useScale();
  const total = 16;
  const left = drain ? Math.max(0, Math.round(total - interpolate(f, [8, durationInFrames * 0.8], [0, total], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}))) : total;
  const cx = width / 2, base = height * 0.7;
  return (
    <AbsoluteFill>
      <Push amount={0.06}>
        <div style={{position: 'absolute', left: cx - 380 * s, top: base - 700 * s, width: 760 * s, height: 760 * s, border: `${6 * s}px solid ${C.paper}`, borderBottom: 'none', borderRadius: `${380 * s}px ${380 * s}px 0 0`}} />
        <div style={{position: 'absolute', left: cx - 450 * s, top: base, width: 900 * s, height: 40 * s, background: C.paper}} />
        {[...Array(left)].map((_, i) => (
          <div key={i} style={{position: 'absolute', left: cx - 110 * s, top: base - (i + 1) * 30 * s, width: 220 * s, height: 34 * s, borderRadius: '50%', background: C.gold, border: `${3 * s}px solid #7a5d1f`}} />
        ))}
        {drain && [...Array(total - left)].map((_, i) => {
          const t = Math.min(1, (f - 8 - i * ((durationInFrames * 0.8 - 8) / total)) / 20);
          if (t <= 0 || t >= 1) return null;
          return <div key={`fly${i}`} style={{position: 'absolute', left: cx - 60 * s + (i % 2 ? 1 : -1) * t * 500 * s, top: base - total * 30 * s - t * 300 * s + t * t * 600 * s,
            width: 120 * s, height: 120 * s, borderRadius: '50%', background: C.gold, border: `${3 * s}px solid #7a5d1f`, opacity: 1 - t}} />;
        })}
        {[...Array(drain ? 6 : 2)].map((_, i) => (
          <div key={`b${i}`} style={{position: 'absolute', left: cx + (i % 2 ? 120 : -460) * s, top: base - 120 * s - i * 26 * s, transform: `rotate(${(i % 3) * 6 - 6}deg)`}}><Bill w={340 * s} /></div>
        ))}
      </Push>
      <Caption title={title} top={0.1} />
    </AbsoluteFill>
  );
};

// ── Les billets brûlent et tombent.
export const Burn: React.FC<{title: string; kicker?: string}> = ({title, kicker}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig(); const {s, width, height} = useScale();
  const bills = useMemo(() => { const r = rng(99); return [...Array(12)].map(() => ({x: r(), d: r() * 25, rot: (r() - 0.5) * 60, sp: 0.6 + r() * 0.6})); }, []);
  const embers = useMemo(() => { const r = rng(5); return [...Array(40)].map(() => ({x: r(), ph: r() * 100, sp: 2 + r() * 4})); }, []);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 100%, ${C.red}55 0%, transparent 55%)`}} />
      {bills.map((b, i) => {
        const t = Math.max(0, f - b.d);
        const y = -300 * s + t * 14 * s * b.sp;
        const burn = interpolate(t, [0, durationInFrames * 0.9], [0, 0.95], {extrapolateRight: 'clamp'});
        return <div key={i} style={{position: 'absolute', left: b.x * (width - 300 * s), top: y, transform: `rotate(${b.rot + t * 0.8}deg)`}}><Bill w={300 * s} burn={burn} /></div>;
      })}
      {embers.map((e, i) => {
        const y = height - ((f * e.sp + e.ph * 10) % (height * 0.9));
        return <div key={`e${i}`} style={{position: 'absolute', left: e.x * width, top: y, width: 8 * s, height: 8 * s, borderRadius: '50%', background: i % 3 ? C.gold : C.red, opacity: 0.8}} />;
      })}
      <Caption kicker={kicker} title={title} top={0.1} color={C.paper} />
      <div style={{position: 'absolute', inset: 0, background: '#000', opacity: interpolate(f, [durationInFrames - 8, durationInFrames], [0, 0.6], {extrapolateLeft: 'clamp'})}} />
    </AbsoluteFill>
  );
};

// ── Fin : la leçon + appel à s'abonner.
export const Outro: React.FC<{lines: string[]; cta: string}> = ({lines, cta}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const {s} = useScale();
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: `0 ${70 * s}px`, textAlign: 'center', gap: 40 * s}}>
      {lines.map((l, i) => (
        <div key={i} style={{fontFamily: F.display, fontWeight: i ? 500 : 800, fontStyle: i ? 'italic' : 'normal', fontSize: 84 * s, lineHeight: 1.1, color: i ? C.gold : C.paper, opacity: fadeIn(f, i * 18)}}>{l}</div>
      ))}
      <div style={{marginTop: 30 * s, transform: `scale(${spring({frame: f - 40, fps, config: {damping: 11}})})`}}><Rosette size={220 * s} progress={interpolate(f, [40, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} /></div>
      <div style={{fontFamily: F.mono, fontSize: 34 * s, letterSpacing: 6 * s, color: C.red, textTransform: 'uppercase', opacity: fadeIn(f, 55)}}>{cta}</div>
    </AbsoluteFill>
  );
};
