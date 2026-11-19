// Fiche de publication : titre, description, chapitres (calculés sur les durées réelles), sources, légendes.
import fs from 'node:fs';
import {loadEpisode, sceneSec, sources, theme} from './lib.mjs';
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const L = loadEpisode('long'), S = loadEpisode('short');
let t = 0; const chapters = [];
for (const sc of L.scenes) { if (sc.chapter) chapters.push(`${fmt(t)} ${sc.chapter}`); t += sceneSec(sc); }
const used = [...new Set(L.scenes.flatMap((s) => s.sources))];
const srcList = used.map((k) => `• ${sources[k].full} ${sources[k].url}`).join('\n');
const descLong = `${L.description}

${theme.tagline}

Chapitres
${chapters.join('\n')}

Sources
${srcList}

Cette vidéo raconte l'histoire. Ce n'est pas un conseil financier.
Narration : voix du créateur, clonée avec ElevenLabs (contenu modifié ou synthétique déclaré).
#histoire #économie #JohnLaw`;
const md = `# Fiche de publication · N° ${L.serial}

> Générée par \`npm run publication\` à partir des JSON. Statut des scripts : **${L.status}** (long), **${S.status}** (Short).

## YouTube · vidéo longue (${fmt(t)})
**Titre retenu** : ${L.title}
**Variantes à tester** : ${L.titleOptions.slice(1).map((x) => `« ${x} »`).join(' · ')}
**Miniature** : \`public/brand/thumb-ep01.png\`
**Mots-clés** : ${L.tags.join(', ')}
**Réglages** : catégorie Éducation · langue française · « Contenu modifié ou synthétique » = OUI · playlist « Bulles & krachs »

**Description** (à copier) :
\`\`\`
${descLong}
\`\`\`

**Commentaire épinglé** : Qui, aujourd'hui, ressemble le plus à John Law ?

## YouTube Shorts · TikTok · Reels (${fmt(S.scenes.reduce((a, s) => a + sceneSec(s), 0))})
**Titre** : ${S.title}
**Légende** (à copier) :
\`\`\`
En 1719, une action passe de 500 à près de 10 000 livres. Un an plus tard, le papier ne vaut presque plus rien.
L'histoire complète : sur la chaîne.
Sources : Velde (2003), Moen, Fed de New York (2014).
#histoire #économie #JohnLaw #finance #apprendresurtiktok
\`\`\`
**Réglages** : TikTok, label « Contenu généré par l'IA » activé · Instagram, label IA activé · YouTube, lier le Short à la vidéo longue (« Vidéo associée »).
`;
fs.writeFileSync('content/episodes/publication-ep01.md', md);
console.log('✓ content/episodes/publication-ep01.md');
console.log(chapters.join('\n'));
