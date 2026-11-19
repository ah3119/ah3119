// Produit bannière, avatar et miniature type à partir du logo calculé.
const fs=require('fs');const {mark,guilloche,C}=require('./logo.js');
const css=fs.readFileSync(__dirname+'/common.css','utf8');
const wave=(w,h,y0,amp,n,k)=>{let s='';for(let j=0;j<n;j++){let p='';for(let x=0;x<=w;x+=8){const y=y0+Math.sin(x/(k)+j*0.35)*amp*Math.cos(x/(k*3.1)+j*0.12)+j*3;p+=(x?'L':'M')+x+','+y.toFixed(1)}s+=`<path d="${p}" fill="none" stroke="#f2ecdc" stroke-opacity="${0.05+0.05*(j%3)}" stroke-width="1.2"/>`}return s};
const page=(w,h,body)=>`<!doctype html><html><head><meta charset="utf-8"><style>${css}html,body{width:${w}px;height:${h}px}</style></head><body>${body}</body></html>`;
const markInline=(px,o)=>mark(800,o).replace('width="800" height="800"',`width="${px}" height="${px}"`);
// Bannière 2560x1440 — zone sûre 1546x423 centrée
fs.writeFileSync(__dirname+'/banner.html',page(2560,1440,`
<svg width="2560" height="1440" style="position:absolute">${wave(2560,1440,560,60,26,140)}${wave(2560,1440,880,50,18,190)}</svg>
<div class="grain"></div>
<div style="position:absolute;left:507px;top:508px;width:1546px;height:423px;display:flex;align-items:center;gap:56px">
  <div style="flex:none;border-radius:50%;overflow:hidden;width:300px;height:300px;box-shadow:0 0 0 6px #0b241a,0 0 0 8px #b8913a">${markInline(300)}</div>
  <div>
    <div class="mono" style="font-size:26px;color:#c23a2b">N° 001 — Série bulles · krachs · arnaques</div>
    <div class="display" style="font-size:128px;font-weight:800;line-height:1;margin:14px 0 18px;letter-spacing:-1px">L'Histoire de l'Argent</div>
    <div class="display" style="font-size:46px;font-style:italic;color:#e3d6b4">L'argent a une mémoire. Nous la racontons.</div>
    <div class="mono" style="font-size:22px;color:#b8913a;margin-top:22px">Nouvel épisode chaque samedi</div>
  </div>
</div>`));
// Avatar 800x800
fs.writeFileSync(__dirname+'/avatar.html',page(800,800,markInline(800)));
// Miniature type EP01 1280x720
fs.writeFileSync(__dirname+'/thumb-ep01.html',page(1280,720,`
<svg width="1280" height="720" style="position:absolute">${wave(1280,720,480,40,22,90)}</svg><div class="grain"></div>
<div style="position:absolute;left:60px;top:54px" class="mono"><span style="font-size:24px;color:#b8913a">Paris · 1720</span></div>
<div class="display" style="position:absolute;left:56px;top:96px;font-size:118px;font-weight:800;line-height:.95">John<br>Law</div>
<div class="impact" style="position:absolute;right:70px;top:70px;font-size:330px;line-height:1;color:#f2ecdc">×20</div>
<div style="position:absolute;right:120px;top:420px;transform:rotate(-8deg);border:10px solid #c23a2b;color:#c23a2b;padding:6px 30px;font-size:120px;letter-spacing:6px;mix-blend-mode:normal" class="impact">RUINÉ</div>
<div style="position:absolute;left:60px;bottom:52px;width:150px;height:150px;border-radius:50%;overflow:hidden">${markInline(150)}</div>`));
console.log('built');
