import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';
import {C, F} from '../brand';
import {fadeIn} from '../kit';
import {Rosette} from '../Rosette';
import {Tape} from '../Stills';
import {Crowd, Press} from './illustrated';
import {useBrandFonts} from '../fonts';

const label: React.CSSProperties = {fontFamily: F.mono, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 4};
const advance = (f: number) => interpolate(f, [0, 14], [0, 1],
  {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const Certificate: React.FC<{kind: string; value?: string; width: number}> = ({kind, value, width}) => (
  <svg width={width} height={width * .63} viewBox="0 0 500 315" aria-hidden>
    <rect width="500" height="315" rx="5" fill={C.paper} />
    {[12, 21].map(inset => <rect key={inset} x={inset} y={inset} width={500 - 2 * inset}
      height={315 - 2 * inset} fill="none" stroke={C.ink} opacity={inset === 12 ? .8 : .3}/>)}
    {Array.from({length: 12}, (_, i) => <path key={i}
      d={`M22 ${210+i*5} C155 ${300-i*10} 278 ${130+i*12} 478 ${204+i*5}`}
      stroke={C.ink} strokeWidth="1" opacity=".24" fill="none"/>)}
    <foreignObject x="35" y="89" width="132" height="132">
      <Rosette size={132} bg={C.paper} fg={C.ink} monogram={false}/>
    </foreignObject>
    <text x="42" y="60" fontFamily={F.mono} fontWeight="800" fontSize="22" letterSpacing="2" fill={C.ink}>{kind}</text>
    <text x="185" y="160" fontFamily={F.display} fontSize={value ? 49 : 25} fill={C.ink}>{value ?? (kind === 'DETTE' ? 'TRÉSOR' : 'COMPAGNIE')}</text>
    <text x="186" y="195" fontFamily={F.mono} fontSize="15" letterSpacing="2" fill={C.ink}>{value ? 'LIVRES TOURNOIS' : kind === 'DETTE' ? 'ROYAL' : 'DU MISSISSIPPI'}</text>
    <text x="42" y="284" fontFamily={F.mono} fontWeight="800" fontSize="13" letterSpacing="2" fill={C.ink}>RECONSTITUTION</text>
  </svg>
);

export const ActionPrice: React.FC<{date: string; value: string; approximate?: boolean; press?: boolean; crowd?: boolean}> =
({date, value, approximate, press, crowd}) => {
  const f = useCurrentFrame();
  const hit = spring({frame: f - 2, fps: 30, config: {damping: 8, stiffness: 240}});
  return <AbsoluteFill>
    {press && <div style={{position: 'absolute', inset: 0, transform: 'translateY(180px) scale(.9)'}}>
      <Press title=""/>
    </div>}
    {crowd && <div style={{position: 'absolute', inset: 0, opacity: .8, transform: 'translateY(300px)'}}>
      <Crowd title="" ticker="ACTION DU MISSISSIPPI  ▲  RUE QUINCAMPOIX"/>
    </div>}
    <div style={{position: 'absolute', top: 210, left: 0, right: 0, textAlign: 'center', zIndex: 5}}>
      <div style={{...label, fontSize: 32, color: C.gold}}>{date}</div>
      <div style={{fontFamily: F.display, fontSize: approximate ? 230 : 300, lineHeight: 1, whiteSpace: 'nowrap', color: C.paper,
        textShadow: `0 10px 40px ${C.bg}`, marginTop: 10, transform: `scale(${1.35 - .35 * hit})`}}>{value}</div>
      <div style={{...label, fontSize: 31, color: C.paper, marginTop: 11}}>{approximate ? 'Près de ce prix · en livres' : 'Livres · une action'}</div>
    </div>
    {!crowd && <div style={{position: 'absolute', left: press ? 330 : 171, top: press ? 1180 : 752, zIndex: 4, transform: `translateY(${(1-advance(f))*115}px) rotate(-7deg)`}}>
      <Certificate kind="Titre d’action" width={press ? 470 : 665}/>
    </div>}
  </AbsoluteFill>;
};

export const Transaction: React.FC<{kicker: string; from: string; to: string; document: string}> = ({kicker, from, to, document}) => {
  const f = useCurrentFrame();
  const p = fadeIn(f, 14, 20);
  const cell: React.CSSProperties = {display:'grid',placeItems:'center',textAlign:'center',
    fontFamily:F.display,fontSize:61,padding:'26px 28px',minHeight:135,boxSizing:'border-box'};
  return <AbsoluteFill>
    <div style={{position:'absolute',top:265,left:90,right:144}}>
      <div style={{...label,color:C.gold,fontSize:35,marginBottom:58,textAlign:'center'}}>{kicker}</div>
      <div style={{...cell,background:C.paper,color:C.bg,opacity:fadeIn(f,0,12)}}>{from}</div>
      <svg width="100%" height="155" viewBox="0 0 840 155" aria-hidden>
        <path d="M420 16V130M395 106L420 132L445 106" stroke={C.gold} strokeWidth="6"
          pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} fill="none"/>
      </svg>
      <div style={{...cell,border:`3px solid ${C.gold}`,color:C.paper,opacity:p}}>{to}</div>
      <div style={{display:'flex',justifyContent:'center',marginTop:62,opacity:fadeIn(f,24,16),transform:`rotate(-5deg)`}}>
        <Certificate kind={document} width={440}/>
      </div>
    </div>
  </AbsoluteFill>;
};

export const FusionThumbnail: React.FC<{title:string;kicker:string;value:string;place:string;serial:string}> =
({title,kicker,value,place,serial}) => {
  useBrandFonts();
  return <AbsoluteFill style={{background:C.bg,color:C.paper,overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,backgroundImage:
    `linear-gradient(${C.ink} 1px, transparent 1px), linear-gradient(90deg,${C.ink} 1px,transparent 1px)`,
    backgroundSize:'72px 72px'}}/>
  <div style={{position:'absolute',left:56,top:49,...label,fontSize:25,color:C.gold}}>{place}</div>
  <div style={{position:'absolute',left:54,top:111,fontFamily:F.display,fontSize:90,lineHeight:1}}>
    {title.split(' ').map((word,i) => <div key={i}>{word}</div>)}
  </div>
  <div style={{position:'absolute',left:90,top:348,transform:'rotate(-9deg)'}}>
    <Certificate kind="Titre d’action" width={490}/>
  </div>
  <div style={{position:'absolute',left:648,top:119,...label,fontSize:48,color:C.gold}}>{kicker}</div>
  <div style={{position:'absolute',left:631,top:194,fontFamily:F.display,fontSize:251,lineHeight:1}}>{value}</div>
  <Tape text={`Fortunes & Ruines · N°${serial}`} height={55} style={{bottom:0}}/>
  </AbsoluteFill>;
};
