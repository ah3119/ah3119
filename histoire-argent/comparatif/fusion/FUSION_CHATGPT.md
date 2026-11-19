# Fortunes & Ruines · Comparer puis fusionner Claude et ChatGPT

**Objectif** : obtenir la meilleure version du Short N°001 (et de la charte) en prenant le meilleur de chaque IA, puis en fusionnant le tout dans **un seul projet** : le dépôt GitHub existant (`ah3119/ah3119`, branche `claude/ma-chaine-claude-code-rzcf54`, dossier `histoire-argent`).

## Mode d'emploi (3 messages à ChatGPT, dans la même conversation)

| Étape | Tu colles | Tu joins | ChatGPT rend |
|---|---|---|---|
| 1 | le bloc **MESSAGE 1** | les 2 fichiers de `1-brief-neutre/` | sa propre version : charte, script, storyboard |
| 2 | le bloc **MESSAGE 2** | les fichiers de `2-version-claude/` (PDF, PNG, JSON, MD et la vidéo MP4 si possible) | la comparaison point par point |
| 3 | le bloc **MESSAGE 3** | rien | la **spécification de fusion** au format imposé |

Ensuite, colle la réponse de l'étape 3 dans Claude Code. Claude applique la fusion dans le projet, lance les tests et rend la vidéo.

**Règle importante** : n'envoie pas l'étape 2 avant d'avoir la réponse complète de l'étape 1. Si ChatGPT voit d'abord la version de Claude, il la copie et la comparaison ne vaut plus rien.

---

## MESSAGE 1 · Brief neutre (à coller avec les 2 fichiers joints)

```
Tu es à la fois directeur artistique motion design et scénariste de documentaires courts pour YouTube Shorts et TikTok.
Tu ne poses pas de questions : tu tranches et tu justifies en une phrase.

## La chaîne
- Nom : « Fortunes & Ruines ». Accroche : « Comment on gagne tout. Comment on perd tout. »
- Sujet : l'histoire financière racontée. Bulles, krachs, arnaques célèbres, fortunes légendaires, faillites.
- Public : francophone, 18-45 ans, sur téléphone. Doublage anglais prévu plus tard.
- Narration : la voix réelle du créateur clonée sur ElevenLabs, au débit rapide (environ 3 mots par seconde). Il n'apparaît pas à l'écran.
- Production : 100 % animée en code (Remotion/React, SVG). Interdits : banque d'images, vidéo ou image générée par IA,
  faux visages de personnages historiques. Le style doit être reproductible par du code : formes, typographie, objets dessinés.
- Ligne halal : on raconte et on explique. Aucune promotion de l'intérêt, du trading, de la crypto ou du jeu,
  et aucune esthétique « argent facile » (Lamborghini, liasses, graphiques verts de gains).
- Rigueur : chaque chiffre est sourcé à l'écran. Les fichiers joints donnent les sources (sources.json)
  et le statut de chaque fait (fact-check.md : ✅ utilisable, ⚠️ prudence, ❌ interdit).

## L'épisode N°001
John Law et le Système de 1720. L'action de la Compagnie du Mississippi passe d'environ 500 livres (janvier 1719)
à environ 10 000 (fin 1719), puis s'effondre en 1720. Law, Écossais condamné à mort à Londres en 1694,
devient contrôleur général des finances en janvier 1720.

## Ce que je veux
1. CHARTE : palette (5 couleurs HEX avec rôle et proportions), 3 polices Google Fonts avec leur rôle,
   logo (description précise et reproductible en code), 3 signatures visuelles ou animées récurrentes.
   Elle doit être très reconnaissable dans un fil, lisible sur téléphone et crédible pour de la finance.
2. SCRIPT DU SHORT : 40 à 50 secondes, 10 à 12 scènes de 3 à 5 secondes, un hook dans les 2 premières secondes,
   une seule « chute » visuelle forte, une leçon finale et un appel à s'abonner. Pour chaque scène :
   id, narration exacte, sources (identifiants de sources.json), description du visuel animé, bruitage éventuel.
3. STORYBOARD : pour 4 scènes clés (hook, révélation, chute, fin), décris précisément l'image et l'animation
   (positions, mouvements, couleurs, durées), assez pour qu'un développeur la code sans interprétation.
4. MINIATURE de l'épisode long : formule et description précise.
5. Ce que tu refuses de faire et pourquoi (pièges du sujet).

Réponds en français, de façon structurée, sans liste d'options : une décision par rubrique.
```

---

## MESSAGE 2 · Version de Claude (à coller avec les fichiers de `2-version-claude/`)

```
Voici maintenant la version produite par Claude pour la même chaîne. Fichiers joints :
- Charte_Fortunes-et-Ruines_v3.pdf : la charte (concept « dossier d'enquête »).
- avatar.png, banner.png, thumb-ep01.png : le logo F&R, la bannière et la miniature du N°001.
- planche-short.png : 11 images extraites du Short, dans l'ordre.
- FR-N001-short-v3-sans-voix.mp4 (si tu peux le lire) : le Short rendu, avec bruitages et sous-titres, sans voix.
- ep01-short-v2.json : le script et les scènes du Short (narration, visuel, sources, bruitages).
- theme.json : couleurs, polices, durées.
- BACKLOG.md : le catalogue de 60 épisodes prévus.

En résumé, la version de Claude repose sur :
- un concept « dossier d'enquête » : fond noir quadrillé, jaune #FFD400 (ruban de scène de crime, repères),
  rouge #E5322D (verdicts, chutes), papier #F2F0EA ; Archivo Black, JetBrains Mono et Inter Tight ;
  une pastille jaune « F&R » dont l'esperluette est rouge ;
- des scènes illustrées : presse à billets, foule rue Quincampoix, compteur qui frappe, sentence de 1694
  et nomination de 1720 scellées à la cire, machine billets → actions → dette, guichet qui se vide de son or,
  courbe du krach avec tampon, billets qui brûlent avec ruban « DOSSIER CLASSÉ », conclusion avec logo ;
- un seul tampon rouge par épisode, des sources affichées sous chaque chiffre, des silhouettes anonymes à la place des visages.

Compare TA version et CELLE DE CLAUDE avec cette grille, en notant chacune de 1 à 5 et en désignant un gagnant par ligne :
1. Reconnaissance en une seconde dans un fil (miniature et premières images)
2. Lisibilité sur téléphone
3. Force du hook (2 premières secondes)
4. Rythme et variété des scènes
5. Clarté de l'histoire en moins de 50 secondes
6. Crédibilité « finance » et respect de la ligne halal
7. Rigueur (sources, aucun fait ❌)
8. Faisabilité en code (Remotion/SVG, sans images IA)
9. Tenue sur 60 épisodes (la charte se décline-t-elle sans lasser ?)
10. Logo et miniature

Sois honnête : si Claude est meilleur sur un point, dis-le. Si toi tu l'es, explique concrètement pourquoi.
Termine par les 5 éléments de TA version qui amélioreraient le plus celle de Claude, classés par impact.
```

---

## MESSAGE 3 · Spécification de fusion (à coller tel quel)

```
Maintenant, produis la SPÉCIFICATION DE FUSION. Principe : la version de Claude est la base technique,
parce que c'est un projet Remotion qui fonctionne, avec tests et pipeline de voix. On y intègre uniquement
tes éléments qui ont gagné dans la comparaison. Pas de mélange au cas par cas qui casserait la cohérence :
si tu proposes un changement de couleur ou de police, il s'applique partout.

Réponds UNIQUEMENT avec ce format, une entrée par changement, classées par impact :

### CHANGEMENT n — [titre court]
- Type : CHARTE | SCRIPT | SCENE_EXISTANTE | NOUVELLE_SCENE | MINIATURE | LOGO | SON
- Cible : [fichier ou scène de Claude concernée, ex. « theme.json : colors.gold », « ep01-short-v2.json : scène v03 »,
  « nouvelle scène après v08 »]
- Avant : [ce qui existe chez Claude, cité exactement]
- Après : [la nouvelle valeur exacte : HEX, texte de narration mot pour mot, ou description précise
  de l'animation : éléments, positions, mouvements, durées, couleurs]
- Pourquoi : [une phrase, en lien avec la grille]
- Sources : [identifiants de sources.json si un fait est ajouté ou modifié, sinon « — »]

Contraintes :
- 12 changements maximum : seuls ceux qui comptent.
- Toute narration modifiée doit rester dans les faits ✅ ou ⚠️ du fact-check, jamais ❌.
- Le Short doit rester entre 40 et 50 secondes à environ 3 mots par seconde. Donne la nouvelle durée estimée.
- Un seul tampon rouge dans tout le Short.
- Rien qui exige des images générées par IA ou des visages.
- Si tu penses que la version de Claude doit rester telle quelle sur un point, ne crée pas de changement pour ce point.
```

---

## Ce que Claude fera avec la réponse du message 3
1. Appliquer chaque changement dans `config/theme.json`, `content/episodes/ep01-short-v2.json` et `src/`.
2. Refuser, en le signalant, tout changement qui contredit le fact-check ou la ligne halal.
3. Lancer `npm run check` et `npm test`, rendre le Short, extraire une planche d'images et te montrer avant/après.
4. Garder l'historique Git : on peut revenir à la version d'avant la fusion à tout moment.
