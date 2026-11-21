# Outils vidéo pour Claude Code : verdict pour Fortunes & Ruines

Évaluation du carrousel « 9 dépôts GitHub qui transforment Claude en monteur vidéo » (@datamarvia, 11/11/2026), faite le 21/11/2026.
Critère : est-ce que l'outil améliore **notre** pipeline (vidéos 100 % codées en Remotion, voix ElevenLabs, pas de tournage, pas de visage) ?

| # | Dépôt | Ce qu'il fait vraiment | Verdict | Pourquoi |
|---|---|---|---|---|
| 1 | kurbaitaev/ghost-editor (MIT) | Monte des prises face caméra en Reels, Mac Apple Silicon | ❌ | On ne filme personne. Les personnes sont des silhouettes (charte). |
| 2 | kajisho5/ffmpeg-skill (MIT) | 42 outils FFmpeg pilotés par l'agent | ⚪ pas maintenant | `scripts/master.mjs` fait déjà le -14 LUFS. À reconsidérer pour la vérification automatique des exports. |
| 3 | AgriciDaniel/claude-shorts (MIT) | Découpe une vidéo longue filmée en Shorts (faster-whisper + Remotion) | ❌ | Nos Shorts sont écrits pour le format vertical dès le JSON. On ne découpe pas une vidéo filmée. |
| 4 | barrettbp/motionclone (pas de licence) | Copie l'animation d'une vidéo de référence (Codex, Windows) | ❌ | Fork à 0 étoile, l'original est indisponible et il n'y a pas de licence. Copier l'animation d'un autre créateur pose aussi un problème de propriété intellectuelle. |
| 5 | iart-ai/motion-skills (MIT) | 56 compétences (prompts) qui servent de vitrine à iart.ai | ⚪ réserve | `data-animation-skills` et `map-animation-skills` peuvent inspirer les cartes et graphiques. On ne les installe pas en bloc. |
| 6 | yt-dlp/yt-dlp (Unlicense) | Télécharge des vidéos YouTube et d'autres sites | ❌ dans le pipeline | Réutiliser des vidéos téléchargées sur YouTube expose à des réclamations Content ID. Usage toléré : analyser ses propres vidéos, ou récupérer des archives du domaine public avec la preuve de leur statut. |
| 7 | openai/whisper (MIT) | Transcription audio vers texte | ✅ besoin réel, autre outil | Le besoin est bien là : caler les sous-titres sur la voix. Mais on connaît déjà le texte. ElevenLabs donne donc le minutage exact sans transcription, avec le même compte et sans Python ni PyTorch. **Intégré, voir plus bas.** |
| 8 | zhuyansen/awesome-claude-video-skills (CC0) | Annuaire de 537 dépôts | ✅ en lecture | Simple liste. Elle a révélé le manque principal : les **compétences officielles Remotion**, absentes du carrousel. |
| 9 | heygen-com/hyperframes (Apache 2.0) | Moteur de rendu HTML vers MP4, concurrent de Remotion | ❌ | Il faudrait réécrire tout le projet. Le test de l'annuaire mesure 23,5 min de rendu pour une vidéo de 15 s. Seul intérêt : la licence Apache, à garder en tête si la licence Remotion devient payante pour nous. |

## Intégré dans le projet
**Sous-titres minutés mot à mot (Shorts).** Avant, les sous-titres étaient répartis à vitesse constante sur la durée de la voix, donc souvent décalés. Maintenant :
- `voice.mjs` appelle `text-to-speech/{voix}/with-timestamps` et enregistre `public/audio/<fmt>/<id>.words.json` à côté de chaque MP3.
- `npm run align` minute les prises **déjà enregistrées** via l'API ElevenLabs `forced-alignment` (audio + texte connu). Sans `--yes`, la commande liste seulement les prises. Avec `--yes`, l'appel est payant : il est facturé comme le Speech-to-Text, à la durée audio.
- `npm run sync` écrit les pages de sous-titres (`captions`) dans le JSON de l'épisode : 5 mots maximum, coupure après la ponctuation, jamais de mot seul.
- Au rendu, chaque page apparaît quand la voix la prononce et le mot en cours est surligné en jaune (charte : le jaune sert à montrer).
- `npm run check` signale un minutage périmé si le texte a changé après l'enregistrement de la voix.

## À installer sur ton poste (non versionné)
**Compétences officielles Remotion** (`remotion-dev/skills`). Elles couvrent les sous-titres, les cartes, l'audio, les transitions et le rendu, et sont maintenues par Remotion.
```
npx skills add remotion-dev/skills
```
⚠️ Elles visent Remotion 4.0.545, alors que le projet est en 4.0.300 : certaines API citées peuvent manquer. Le dépôt n'a pas de fichier de licence, il n'est donc pas copié ici.
