# IA vs Humains

Chaîne YouTube, TikTok et Instagram : on confie la même tâche réelle à un humain et à une IA, puis on montre le résultat brut.
Accroche : « Tu penses être à l'abri ? » · Signature : **Même mission. Même brief. Un verdict.**

| Quoi | Où |
|---|---|
| Plan de chaîne, règles du duel, feuille de route | `PLAN_CHAINE.md` |
| Charte graphique (page autonome) | `branding/CHARTE.html` |
| Logos vectoriels (texte vectorisé, sans police requise) | `branding/logo-mark.svg`, `logo-wordmark-dark.svg`, `logo-wordmark-light.svg` |
| Avatar 800×800, bannière 2560×1440, modèle de miniature 1280×720 | `branding/avatar.png`, `banner.png`, `thumb-template.png` |
| Shorts pilotes | `content/shorts/S01-monteur.md`, `S02-service-client.md`, `S03-miniature.md` |
| Épisode long | `content/long/L01-monteur.md` |

## Régénérer
- PNG : `node branding/render.cjs` (Playwright, depuis `branding/assets.html`)
- Charte : `npm i marked@12.0.2` puis `node branding/build-charte.cjs`

## Règle d'or
Les `[…]` dans les scripts se remplissent **après** le test réel. Aucun résultat n'est écrit d'avance.
