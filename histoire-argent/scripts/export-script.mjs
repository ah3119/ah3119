// Génère les scripts lisibles (pour relecture humaine) à partir des JSON, seule source de vérité.
import fs from 'node:fs';
import {EPISODES, loadEpisode, sources, validate} from './lib.mjs';
const out = {long: 'content/episodes/script-pilote.md', short: 'content/episodes/script-short.md'};
for (const fmt of Object.keys(EPISODES)) {
  const ep = loadEpisode(fmt); const {seconds} = validate(ep);
  let md = `# N° ${ep.serial} · ${ep.title}\n\n> Fichier généré depuis \`${EPISODES[fmt]}\` : ne pas modifier ici.\n> Statut : **${ep.status}** · ${ep.scenes.length} scènes · ~${Math.round(seconds)} s\n\n`;
  if (ep.titleOptions) md += `**Titres possibles** : ${ep.titleOptions.map((t) => `« ${t} »`).join(' · ')}\n\n`;
  if (ep.description) md += `**Description** : ${ep.description}\n\n`;
  const used = new Set();
  for (const s of ep.scenes) {
    s.sources.forEach((k) => used.add(k));
    md += `## ${s.id} · ${s.visual.type}${s.stamp ? ` · tampon « ${s.stamp} »` : ''}\n${s.text}\n${s.sources.length ? `\n_Sources : ${s.sources.join(', ')}_\n` : ''}\n`;
  }
  md += `## Sources\n` + [...used].map((k) => `- **${k}** : ${sources[k].full} ${sources[k].url}`).join('\n') + '\n';
  const file = out[fmt] ?? `content/episodes/script-${fmt}.md`;
  fs.writeFileSync(file, md);
  console.log('✓ ' + file);
}
