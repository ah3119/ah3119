# Comparer Claude et ChatGPT sur le rendu final

## Règles pour un duel équitable
1. **Mêmes entrées** : les 7 fichiers de `entrees/`, envoyés aux deux. Aucun des deux ne voit le code de l'autre.
2. **Même machine et mêmes commandes** : tu fais tourner les deux projets sur ton PC, pas sur leurs serveurs.
3. **Une seule correction autorisée par concurrent** : si un projet plante, tu colles l'erreur à son auteur une seule fois. Note-le dans la grille.
4. **Jugement à l'aveugle** : un script renomme les vidéos A et B au hasard avant que tu les regardes (étape 3).

## Étape 1 · Installer et rendre les deux projets
Dans deux dossiers séparés, par exemple `C:\duel\claude` et `C:\duel\chatgpt` :
```powershell
npm install
npm run check
npm test
npm run render:preview
npm run render:preview-long
npm run assets
```
Pour Claude : `git clone https://github.com/ah3119/ah3119.git`, branche `claude/ma-chaine-claude-code-rzcf54`, dossier `histoire-argent`.
Pour ChatGPT : décompresse son ZIP.

Pour chaque commande, note : ✅ du premier coup / 🔧 après une correction / ❌ échec.

## Étape 2 · Planches de comparaison automatiques
Depuis le projet de Claude (l'outil est neutre : il ne fait qu'extraire des images aux mêmes instants des deux vidéos) :
```powershell
npm run compare -- C:\duel\claude\output\ep01-preview-short.mp4 C:\duel\chatgpt\output\ep01-preview-short.mp4
npm run compare -- C:\duel\claude\output\ep01-preview-long.mp4 C:\duel\chatgpt\output\ep01-preview-long.mp4
```
Le script attribue A et B au hasard. Il crée dans `output/duel/` une planche par vidéo, avec 8 images de A et 8 images de B aux mêmes instants, côte à côte, ainsi que `A.mp4` et `B.mp4`. La correspondance A/B est cachée dans `output/duel/cle.txt` : ne l'ouvre qu'après avoir noté.

## Étape 3 · Noter à l'aveugle (de 1 à 5)
Regarde d'abord les MP4 en entier **sur ton téléphone**, puis les planches.

| # | Critère | Ce qu'on regarde | Poids | A | B |
|---|---|---|---|---|---|
| 1 | Effet « wow » dès 3 secondes | Le début du Short arrête-t-il le pouce ? | ×3 | | |
| 2 | Lisibilité sur téléphone | Textes, chiffres et sources lisibles sans zoom | ×3 | | |
| 3 | Rythme et variété | Les scènes se répètent-elles ? Y a-t-il des temps morts ? | ×2 | | |
| 4 | Fidélité à la charte | Vraies polices (Bodoni, Anton), rosace guillochée, palette, un seul tampon | ×2 | | |
| 5 | Signatures animées | Rosace qui se trace, compteur, tampon qui s'écrase | ×2 | | |
| 6 | Rigueur | Sources visibles aux bons moments, aucun ❌ réintroduit | ×2 | | |
| 7 | Visuels de marque | Avatar lisible à petite taille, bannière, miniature | ×1 | | |
| 8 | Défauts | Chevauchements, textes coupés, bugs visibles (5 = aucun) | ×2 | | |
| | **Total pondéré (sur 85)** | | | | |

Ensuite seulement, ouvre `cle.txt` et ajoute la partie technique, qui se juge sans aveugle :

| # | Critère | Claude | ChatGPT |
|---|---|---|---|
| 9 | Installation et rendus du premier coup (5 = tout ✅, 1 = échec) | | |
| 10 | Tests réels : `npm test` contrôle-t-il vraiment les règles (sources, tampon, durées) ? | | |
| 11 | Facilité pour l'épisode 2 : ajouter une scène = modifier seulement le JSON ? | | |

## Règle de décision
- **Éliminatoire** : un projet qui ne rend pas après une correction perd, quel que soit son score.
- Sinon, le **total pondéré à l'aveugle** décide. Les critères 9 à 11 départagent un écart de moins de 5 points.
- Pas de projet hybride au cas par cas. Si le perdant a un élément nettement meilleur (une scène, une animation), on le **porte** dans le projet gagnant, et un seul élément à la fois.

## Pièges à surveiller
- ⚠️ Un projet qui « marche » chez son auteur mais pas sur ton PC : seul ton PC compte.
- ⚠️ Des polices de remplacement (DejaVu, Arial) à la place de Bodoni et Anton : c'est le défaut le plus fréquent, il casse la charte.
- ⚠️ Une narration recopiée en dur dans le code au lieu d'être lue dans le JSON : ça marche pour l'épisode 1, mais ça coûte cher à partir de l'épisode 2.
- ⚠️ Des affirmations ❌ revenues dans les textes à l'écran (bossu, « millionnaire », 2,8 milliards).
