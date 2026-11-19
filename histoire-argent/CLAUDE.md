# CLAUDE.md — L'Histoire de l'Argent

Tu travailles sur une chaîne vidéo d'histoire financière, animée en Remotion. Ces règles priment sur tes choix par défaut.

## Règles éditoriales (non négociables)
- **Chaque chiffre a une source** déclarée dans `content/research/sources.json` et référencée par la scène (`sources`). `npm run check` bloque un chiffre sans source.
- **Affirmations retirées** : l'anecdote du bossu-bureau, l'origine du mot « millionnaire » et la dette de 2,8 milliards. On ne les réintroduit qu'avec une source primaire, et après avoir mis à jour `BANNED` dans `scripts/lib.mjs`.
- **Cours de l'action** : 500 livres (janvier 1719), environ 10 000 livres (fin 1719), selon Velde et Moen. La Fed de New York cite 15 000. Ne jamais présenter 10 000 comme le record incontesté. Le « ×20 » est une borne basse.
- **Halal** : on raconte et on explique. Aucune promotion de l'intérêt, du trading, de la crypto ou du jeu, ni d'esthétique « argent facile ».
- **Contexte colonial et esclavagiste** mentionné quand il fait partie de l'histoire (scène s09 du pilote).
- Pas d'accusation de fraude intentionnelle sans preuve.

## Charte (voir `branding/CHARTE.html`)
- Concept : chaque épisode est un billet de banque. Couleurs : encre 70 %, papier 20 %, rouge 8 %, or 2 %. Le rouge sert uniquement aux pertes, fraudes et chutes.
- Polices : Bodoni Moda (titres), Anton (chiffres), IBM Plex Mono (numéros, dates), IBM Plex Sans (texte).
- Signatures : la rosace qui se trace (titre), le numéroteur (scène `counter`), **un seul tampon rouge par épisode** (vérifié par les tests).
- Toutes les valeurs viennent de `config/theme.json`. Ne jamais coder une couleur en dur ailleurs.

## Architecture
- `content/episodes/*.json` est la **seule source de vérité**. Les `script-*.md` sont générés (`npm run script`) : ne pas les modifier à la main.
- Visuels disponibles : `title`, `card`, `quote`, `timeline`, `counter`, `curve`, `flow`, `lesson` (`src/scenes/index.tsx`). Pour en ajouter un : le déclarer dans `src/types.ts`, dans `VISUALS` (`scripts/lib.mjs`) et dans le `switch` de `src/Episode.tsx`.
- Durée d'une scène : celle de l'audio s'il est synchronisé (`audioSec`), sinon 2,5 mots/s + 0,8 s.

## Garde-fous
- Ne jamais lancer `voice:all` ou `voice:short-all` (payants) sans accord explicite. `voice:check` ne coûte rien.
- Ne jamais commiter `.env`, des MP3 ou des MP4.
- Ne passer un statut à `APPROVED_FOR_PUBLICATION` qu'après validation humaine du script.
- Aucune publication sur YouTube, TikTok ou Instagram depuis ce projet.
- Avant de terminer : `npm run check && npm test`, puis vérifier une image du rendu.

## Licence
⚠️ Remotion est gratuit pour les particuliers et les très petites structures. Vérifier remotion.dev/license avant toute exploitation commerciale.
