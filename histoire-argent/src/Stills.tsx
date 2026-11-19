import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F, THEME} from './brand';
import {useBrandFonts} from './fonts';
import {LogoBadge, Wordmark} from './Logo';
import {Episode} from './types';

const Grid: React.FC<{step: number}> = ({step}) => (
  <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff0b 1px, transparent 1px), linear-gradient(90deg, #ffffff0b 1px, transparent 1px)', backgroundSize: `${step}px ${step}px`}} />
);
// Ruban « scène de crime ».
export const Tape: React.FC<{text: string; height: number; style?: React.CSSProperties}> = ({text, height, style}) => (
  <div style={{position: 'absolute', left: -60, right: -60, height, display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `repeating-linear-gradient(45deg, ${C.gold} 0 ${height * 0.7}px, ${C.bg} ${height * 0.7}px ${height * 1.4}px)`, ...style}}>
    <span style={{background: C.gold, color: C.bg, fontFamily: F.mono, fontWeight: 800, fontSize: height * 0.46, letterSpacing: height * 0.06, padding: `0 ${height * 0.35}px`, textTransform: 'uppercase'}}>{text}</span>
  </div>
);
// Portrait anonyme sur toise : code visuel des dossiers d'enquête, sans visage inventé.
export const Mugshot: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 420 460" preserveAspectRatio="xMidYMax slice" style={{display: 'block', background: '#1a1a1a'}}>
    <g stroke="#ffffff22" strokeWidth={2}>{[...Array(11)].map((_, i) => <line key={i} x1={0} y1={20 + i * 40} x2={420} y2={20 + i * 40} />)}</g>
    <g fill="#ffffff55" fontFamily="JetBrains Mono" fontSize={14}>{[...Array(5)].map((_, i) => <text key={i} x={6} y={56 + i * 80}>{190 - i * 20}</text>)}</g>
    <path d="M50 460 C50 330 110 285 210 285 C310 285 370 330 370 460Z" fill="#5c5c5c" />
    <ellipse cx={210} cy={185} rx={82} ry={98} fill="#6e6e6e" />
    <text x={210} y={215} textAnchor="middle" fontFamily="Archivo Black" fontSize={110} fill="#4a4a4a">?</text>
  </svg>
);
const Stamp: React.FC<{text: string; size: number}> = ({text, size}) => (
  <div style={{display: 'inline-block', border: `${size * 0.09}px solid ${C.red}`, color: C.red, fontFamily: F.display, fontSize: size, lineHeight: 1.05,
    padding: `${size * 0.08}px ${size * 0.28}px`, transform: 'rotate(-8deg)', letterSpacing: size * 0.04, textTransform: 'uppercase'}}>{text}</div>
);

export const Avatar: React.FC = () => { useBrandFonts(); return <AbsoluteFill style={{background: C.bg, alignItems: 'center', justifyContent: 'center'}}><LogoBadge size={640} /></AbsoluteFill>; };

export const Banner: React.FC = () => {
  useBrandFonts();
  return (
    <AbsoluteFill style={{background: C.bg, color: C.paper}}>
      <Grid step={90} />
      <Tape text="Dossiers de l'argent · bulles · arnaques · empires" height={70} style={{top: 440, transform: 'rotate(-1.5deg)'}} />
      <Tape text="Nouveau dossier chaque samedi" height={60} style={{top: 960, transform: 'rotate(1.2deg)'}} />
      <div style={{position: 'absolute', left: 507, top: 540, width: 1546, height: 380, display: 'flex', alignItems: 'center', gap: 60}}>
        <LogoBadge size={300} />
        <div>
          <Wordmark size={120} />
          <div style={{fontFamily: F.body, fontWeight: 800, fontSize: 52, marginTop: 24}}>{THEME.tagline}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Thumbnail: React.FC<{episode: Episode}> = ({episode}) => {
  useBrandFonts();
  const t = episode.thumbnail as {place: string; name: string; big: string; stamp: string; sub?: string};
  return (
    <AbsoluteFill style={{background: C.bg, color: C.paper}}>
      <Grid step={80} />
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 540, overflow: 'hidden'}}><Mugshot w={540} h={720} /></div>
      <div style={{position: 'absolute', left: 36, top: 36, fontFamily: F.mono, fontWeight: 800, fontSize: 30, background: C.gold, color: C.bg, padding: '4px 14px'}}>{t.name.replace('\n', ' ').toUpperCase()}</div>
      <div style={{position: 'absolute', left: 590, top: 50, fontFamily: F.mono, fontWeight: 800, fontSize: 32, color: C.gold, letterSpacing: 3, textTransform: 'uppercase'}}>{t.place}</div>
      <div style={{position: 'absolute', left: 580, top: 90, fontFamily: F.display, fontSize: 220, lineHeight: 1}}>{t.big}</div>
      {t.sub && <div style={{position: 'absolute', left: 590, top: 320, fontFamily: F.display, fontSize: 76, textTransform: 'uppercase'}}>{t.sub.split(' ')[0]} <span style={{color: C.red}}>{t.sub.split(' ').slice(1).join(' ')}</span></div>}
      <div style={{position: 'absolute', left: 640, top: 445}}><Stamp text={t.stamp} size={100} /></div>
      <Tape text={`Fortunes & Ruines · N°${episode.serial}`} height={56} style={{bottom: 0}} />
    </AbsoluteFill>
  );
};
