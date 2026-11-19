# Brief à coller dans ChatGPT

**Mode d'emploi**
- Joins à ChatGPT les 7 fichiers du dossier `entrees/`, puis colle tout le bloc ci-dessous.
- Utilise le modèle le plus puissant disponible, avec l'analyse de code activée.
- Ne lui donne **ni le code de Claude ni les vidéos de Claude** : la comparaison doit porter sur ce que chacun produit à partir des mêmes entrées.

---

```
Tu es développeur senior Remotion et directeur artistique motion design.
Tu dois livrer un projet Remotion complet, prêt à tourner sur un PC Windows, qui produit les deux
vidéos d'un épisode de la chaîne YouTube « L'Histoire de l'Argent ». Tu ne poses aucune question :
tu prends les décisions et tu les justifies brièvement.

## Fichiers joints (ce sont les seules entrées, ne les modifie pas)
- ep01-john-law.json : la vidéo longue, 20 scènes (narration, type de visuel, données, sources, tampon).
- ep01-short.json : le Short 9:16, 7 scènes.
- sources.json : les références ; chaque scène cite des identifiants de ce fichier.
- fact-check.md : statut de chaque affirmation (✅ / ⚠️ / ❌).
- theme.json : couleurs, polices, formats, vitesse de narration (2,5 mots/s + 0,8 s par scène).
- Charte_Histoire-de-l-Argent.pdf : la charte graphique officielle, à respecter strictement.
- reference-miniature.png : la miniature de référence.

## Charte (résumé ; le PDF fait foi)
- Concept : chaque épisode est un billet de banque. Fond encre verte, texte papier, motif guilloché
  généré par code, numéro de série « N° 001 », un seul tampon rouge par épisode, au moment de la bascule.
- Couleurs : #0B241A, #123829, #F2ECDC, #C23A2B, #B8913A. Proportions 70/20/8/2.
  Le rouge sert uniquement aux pertes, fraudes et chutes.
- Polices Google Fonts : Bodoni Moda (titres), Anton (chiffres), IBM Plex Mono (numéros, dates),
  IBM Plex Sans (texte). Le rendu ne doit jamais retomber sur une police système.
- Logo : rosace guillochée calculée (épitrochoïdes, comme les billets) et monogramme « HA », A en rouge.
- Signatures animées : la rosace se trace à l'ouverture, les chiffres défilent comme un compteur
  mécanique, le tampon tombe en s'écrasant (160 % → 100 %, rotation −8°).
- Source affichée à l'écran pendant chaque scène qui cite un chiffre.
- Interdits : banque d'images, vidéo ou image générée par IA, émoji, esthétique « argent facile ».

## Livrable : un ZIP contenant un projet qui fonctionne avec exactement ces commandes
npm install
npm run check            # TypeScript + validation des JSON (sources existantes, 1 seul tampon, durées)
npm test                 # tests automatisés
npm run render:preview   # → output/ep01-preview-short.mp4  (Short 1080×1920, muet, sous-titré)
npm run render:preview-long  # → output/ep01-preview-long.mp4 (1920×1080, muet)
npm run assets           # → public/brand/avatar.png (800×800), banner.png (2560×1440),
                         #   thumb-ep01.png (1280×720)

Contraintes techniques :
- Remotion 4, React 18, TypeScript. Le projet lit les JSON joints : aucune narration recopiée en dur.
- Durée de chaque scène = 2,5 mots/s + 0,8 s (minimum 3,5 s), d'après theme.json.
  Si un fichier public/audio/<format>/<id>.mp3 existe, la scène prend la durée de l'audio.
- Le Short affiche des sous-titres incrustés, synchronisés avec la narration.
- Un fichier README explique l'installation sous Windows et chaque commande.

## Ce qui sera jugé (rendu final sur le même PC que le projet concurrent)
1. Le projet s'installe et rend du premier coup, sans correction manuelle.
2. Qualité du motion design : rythme, lisibilité sur téléphone, transitions, variété des scènes.
3. Fidélité à la charte (couleurs, polices réellement chargées, rosace, tampon unique).
4. Rigueur : sources visibles, aucune affirmation ❌ réintroduite.
5. Qualité du code : lisible, sans duplication, facile à étendre pour l'épisode 2.

Livre le ZIP en une seule fois, avec la liste des fichiers et ce que tu n'as pas pu tester.
```
