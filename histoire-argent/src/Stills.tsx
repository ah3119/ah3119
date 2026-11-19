import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, F, THEME} from './brand';
import {useBrandFonts} from './fonts';
import {Rosette} from './Rosette';
import {Episode} from './types';

const Waves: React.FC<{w: number; h: number; y: number; n: number}> = ({w, h, y, n}) => {
  const paths: string[] = [];
  for (let j = 0; j < n; j++) {
    let p = '';
    for (let x = 0; x <= w; x += 10) p += (x ? 'L' : 'M') + x + ',' + (y + Math.sin(x / 150 + j * 0.35) * 55 * Math.cos(x / 470 + j * 0.12) + j * 3).toFixed(1);
    paths.push(p);
  }
  return <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>{paths.map((d, i) => <path key={i} d={d} fill="none" stroke={C.paper} strokeOpacity={0.05 + 0.05 * (i % 3)} strokeWidth={1.2} />)}</svg>;
};

export const Avatar: React.FC = () => { useBrandFonts(); return <AbsoluteFill style={{background: C.ink}}><Rosette size={800} /></AbsoluteFill>; };

export const Banner: React.FC = () => {
  useBrandFonts();
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, ${C.ink} 0%, ${C.bg} 70%)`, color: C.paper}}>
      <Waves w={2560} h={1440} y={560} n={26} /><Waves w={2560} h={1440} y={880} n={18} />
      <div style={{position: 'absolute', left: 507, top: 508, width: 1546, height: 423, display: 'flex', alignItems: 'center', gap: 56}}>
        <div style={{flex: 'none', borderRadius: '50%', boxShadow: `0 0 0 6px ${C.bg}, 0 0 0 8px ${C.gold}`}}><Rosette size={300} /></div>
        <div>
          <div style={{fontFamily: F.mono, fontSize: 26, letterSpacing: 5, color: C.red, textTransform: 'uppercase'}}>N° 001 — Bulles · krachs · arnaques</div>
          <div style={{fontFamily: F.display, fontWeight: 800, fontSize: 124, lineHeight: 1, margin: '14px 0 18px'}}>{THEME.name}</div>
          <div style={{fontFamily: F.display, fontStyle: 'italic', fontSize: 46, color: '#E3D6B4'}}>{THEME.taglineLong}</div>
          <div style={{fontFamily: F.mono, fontSize: 22, letterSpacing: 5, color: C.gold, marginTop: 22, textTransform: 'uppercase'}}>Nouvel épisode chaque samedi</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Miniature : nom · démesure · verdict.
export const Thumbnail: React.FC<{episode: Episode}> = ({episode}) => {
  useBrandFonts();
  const t = episode.thumbnail!;
  return (
    <AbsoluteFill style={{background: `radial-gradient(circle at 70% 40%, ${C.ink} 0%, ${C.bg} 75%)`, color: C.paper}}>
      <Waves w={1280} h={720} y={480} n={22} />
      <div style={{position: 'absolute', left: 60, top: 50, fontFamily: F.mono, fontSize: 26, letterSpacing: 5, color: C.gold, textTransform: 'uppercase'}}>{t.place}</div>
      <div style={{position: 'absolute', left: 56, top: 96, fontFamily: F.display, fontWeight: 800, fontSize: 124, lineHeight: 0.95, whiteSpace: 'pre-line'}}>{t.name}</div>
      <div style={{position: 'absolute', right: 70, top: 60, fontFamily: F.impact, fontSize: 340, lineHeight: 1}}>{t.big}</div>
      <div style={{position: 'absolute', right: 110, top: 430, transform: 'rotate(-8deg)', border: `10px solid ${C.red}`, color: C.red,
        fontFamily: F.impact, fontSize: 124, letterSpacing: 6, padding: '22px 30px 4px', lineHeight: 1.05}}>{t.stamp}</div>
      <div style={{position: 'absolute', left: 60, bottom: 50}}><Rosette size={150} /></div>
      <div style={{position: 'absolute', left: 230, bottom: 64, fontFamily: F.mono, fontSize: 30, letterSpacing: 6, color: C.red}}>N° {episode.serial}</div>
    </AbsoluteFill>
  );
};
