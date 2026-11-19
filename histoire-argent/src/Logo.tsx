import React from 'react';
import {interpolate} from 'remotion';
import {C, F} from './brand';
// Logo Fortunes & Ruines : pastille jaune « F&R », l'esperluette en rouge. progress anime l'apparition.
export const LogoBadge: React.FC<{size: number; progress?: number}> = ({size, progress = 1}) => {
  const k = interpolate(progress, [0, 1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{width: size, height: size, background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center',
      transform: `scale(${0.6 + 0.4 * k}) rotate(${(1 - k) * -10}deg)`, opacity: k, boxShadow: `${size * 0.04}px ${size * 0.04}px 0 ${C.red}`}}>
      <span style={{fontFamily: F.display, fontSize: size * 0.42, color: C.bg, letterSpacing: -size * 0.01, lineHeight: 1}}>F<span style={{color: C.red}}>&amp;</span>R</span>
    </div>
  );
};
export const Wordmark: React.FC<{size: number}> = ({size}) => (
  <span style={{fontFamily: F.display, fontSize: size, color: C.paper, textTransform: 'uppercase', letterSpacing: size * 0.02, lineHeight: 1}}>
    Fortunes <span style={{color: C.red}}>&amp;</span> Ruines
  </span>
);
