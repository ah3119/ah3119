// Construit branding/CHARTE.html (page autonome) à partir des .md et des SVG/PNG.
// Prérequis : npm i marked@12.0.2 (ou NODE_PATH vers un node_modules qui le contient)
const fs = require('fs'), path = require('path');
const { marked } = require('marked');
const R = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const img = p => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, p)).toString('base64');
const md = p => marked.parse(R(p), { gfm: true })
  .replace(/<table>/g, '<div class="tw"><table>').replace(/<\/table>/g, '</table></div>');
const svg = p => R(p).replace(/ width="\d+" height="\d+"/, '');
let html = R('branding/charte.src.html')
  .replace('{{WORDMARK}}', svg('branding/logo-wordmark-dark.svg'))
  .replace('{{WORDMARK_LIGHT}}', svg('branding/logo-wordmark-light.svg'))
  .replace('{{MARK}}', svg('branding/logo-mark.svg').replace(/clipPath id="c"/, 'clipPath id="cm"').replace('url(#c)', 'url(#cm)'))
  .replace('{{BANNER}}', img('banner.png')).replace('{{THUMB}}', img('thumb-template.png'))
  .replace('{{PLAN}}', md('PLAN_CHAINE.md'))
  .replace('{{S01}}', md('content/shorts/S01-monteur.md'))
  .replace('{{S02}}', md('content/shorts/S02-service-client.md'))
  .replace('{{S03}}', md('content/shorts/S03-miniature.md'))
  .replace('{{L01}}', md('content/long/L01-monteur.md'));
fs.writeFileSync(path.join(__dirname, 'CHARTE.html'), html);
console.log('CHARTE.html', (html.length/1024).toFixed(0), 'Ko');
