// Génère le logo officiel : rosace guillochée (courbes d'épitrochoïde, comme les billets) + monogramme.
const fs = require('fs');
const C = {ink: '#123829', paper: '#f2ecdc', red: '#c23a2b', gold: '#b8913a'};
function guilloche(cx, cy, R, r, d, turns, steps = 2400) {
  let p = '';
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * turns;
    const x = cx + (R + r) * Math.cos(t) - d * Math.cos(((R + r) / r) * t);
    const y = cy + (R + r) * Math.sin(t) - d * Math.sin(((R + r) / r) * t);
    p += (i ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
  }
  return p;
}
function rosette(cx, cy, scale, color) {
  const layers = [
    [62, 6.2, 18, 1], [70, 7, 14, 1], [52, 4, 22, 1],
  ];
  return layers.map(([R, r, d], i) =>
    `<path d="${guilloche(cx, cy, R * scale, r * scale, d * scale, 1)}" fill="none" stroke="${color}" stroke-width="${(0.9 - i * 0.15) * scale}" stroke-opacity="${0.95 - i * 0.2}"/>`).join('');
}
function mark(size, {bg = C.ink, fg = C.paper, accent = C.red} = {}) {
  const c = size / 2, s = size / 200;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <circle cx="${c}" cy="${c}" r="${92 * s}" fill="none" stroke="${fg}" stroke-width="${2.5 * s}"/>
  <circle cx="${c}" cy="${c}" r="${86 * s}" fill="none" stroke="${fg}" stroke-width="${0.8 * s}"/>
  ${rosette(c, c, s, fg)}
  <circle cx="${c}" cy="${c}" r="${53 * s}" fill="${bg}" stroke="${fg}" stroke-width="${1.5 * s}"/>
  <text x="${c}" y="${c + 17 * s}" text-anchor="middle" font-family="'Bodoni Moda', Didot, 'Bodoni 72', serif" style="font-variation-settings:'opsz' 6" font-weight="800" font-size="${54 * s}" fill="${fg}">H<tspan fill="${accent}">A</tspan></text>
</svg>`;
}
fs.writeFileSync(__dirname + '/logo-mark.svg', mark(800));
fs.writeFileSync(__dirname + '/logo-mark-paper.svg', mark(800, {bg: C.paper, fg: C.ink}));
module.exports = {mark, rosette, guilloche, C};
console.log('ok');
