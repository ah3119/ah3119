# CLAUDE.md — Fortunes & Ruines

Tu travailles sur la chaîne Fortunes & Ruines (histoire financière racontée comme des dossiers d'enquête), animée en Remotion. Ces règles priment sur tes choix par défaut.

## Règles éditoriales (non négociables)
- **Chaque chiffre a une source** déclarée dans `content/research/sources.json` et référencée par la scène (`sources`). `npm run check` bloque un chiffre sans source.
- **Affirmations retirées** : l'anecdote du bossu-bureau, l'origine du mot « millionnaire » et la dette de 2,8 milliards. On ne les réintroduit qu'avec une source primaire, et après avoir mis à jour `BANNED` dans `scripts/lib.mjs`.
- **Cours de l'action** : Velde relève 500 livres le 10 mai 1719 et situe le sommet de sa série au début de 1720, près de 10 000 livres. Utiliser « presque ×20 » pour ces deux repères. La Fed de New York cite un sommet différent. Toute valeur affichée doit être identifiable dans la source et les interpolations éventuelles restent sans valeur numérique.
- **Halal** : on raconte et on explique. Aucune promotion de l'intérêt, du trading, de la crypto ou du jeu, ni d'esthétique « argent facile ».
- **Contexte colonial et esclavagiste** mentionné quand il fait partie de l'histoire (scène s09 du pilote).
- Pas d'accusation de fraude intentionnelle sans preuve.

## Charte v3 « Dossier d'enquête » (voir `branding/CHARTE.html`)
- Nom : **Fortunes & Ruines**. Accroche : « Comment on gagne tout. Comment on perd tout. »
- Concept : chaque épisode est un dossier d'enquête numéroté, avec ses pièces, son ruban et son verdict.
- Couleurs : noir #0B0B0C (70 %), papier #F2F0EA (18 %), jaune #FFD400 (8 %, pour montrer), rouge #E5322D (4 %, pour juger). **Jamais de vert « gain ».**
- Polices : Archivo Black (titres, chiffres), JetBrains Mono (repères, dates), Inter Tight (texte, sous-titres).
- Logo : pastille jaune « F&R », esperluette rouge, ombre rouge décalée (`src/Logo.tsx`).
- Signatures : ruban jaune et noir, documents scellés, compteur qui frappe, **un seul tampon rouge par épisode** (vérifié par les tests).
- Pas de faux visages : les personnes sont des silhouettes anonymes sur toise.
- Toutes les valeurs viennent de `config/theme.json`. Ne jamais coder une couleur en dur ailleurs.
- Catalogue des épisodes : `content/BACKLOG.md`.

## Architecture
- `content/episodes/*.json` est la **seule source de vérité**. Les `script-*.md` sont générés (`npm run script`) : ne pas les modifier à la main.
- Visuels disponibles : `title`, `card`, `quote`, `timeline`, `counter`, `curve`, `flow`, `lesson` (`src/scenes/index.tsx`) et les scènes illustrées `press`, `crowd`, `ticker`, `doc`, `machine`, `gold`, `burn`, `outro` (`src/scenes/illustrated.tsx`). Préférer les scènes illustrées : un plan de texte seul est l'exception. Pour en ajouter un : le déclarer dans `src/types.ts`, dans `VISUALS` (`scripts/lib.mjs`) et dans le `switch` de `src/Episode.tsx`.
- Durée d'une scène : celle de l'audio s'il est synchronisé (`audioSec`), sinon 2,5 mots/s + 0,8 s.
- Sous-titres des Shorts : minutés mot à mot quand la prise a son `<id>.words.json`, produit par `voice.mjs` ou `npm run align` (voir `OUTILS_VIDEO.md`). `npm run sync` les écrit dans `captions`. Ne jamais éditer `captions` à la main.
- Short John Law fusionné : `content/episodes/ep01-short-fusion.json`. L'aperçu lit `previewSec`, les prises réelles ont priorité après synchronisation. Lancer `npm run render:fusion` ou `npm run render:fusion-voice` pour un export de relecture.

## Garde-fous
- Ne jamais lancer `voice:all` ou `voice:short-all` (payants) sans accord explicite. `voice:check` ne coûte rien. Même règle pour `voice.mjs ep <clé> --yes` et `align -- --cloud --yes`. `npm run align` (whisper.cpp local) est gratuit.
- Outils vidéo externes : voir le verdict dans `OUTILS_VIDEO.md` avant d'en ajouter un.
- Ne jamais commiter `.env`, des MP3 ou des MP4.
- Ne passer un statut à `APPROVED_FOR_PUBLICATION` qu'après validation humaine du script.
- Aucune publication sur YouTube, TikTok ou Instagram depuis ce projet.
- Avant de terminer : `npm run check && npm test`, puis vérifier une image du rendu.

## Licence
⚠️ Remotion est gratuit pour les particuliers et les très petites structures. Vérifier remotion.dev/license avant toute exploitation commerciale.
