# Démarrage

## 1. Prérequis (une seule fois)
- Node.js 22 ou plus récent, et Git.
- Facultatif : FFmpeg (`ffprobe`). Sinon, la synchronisation utilise celui fourni par Remotion.

## 2. Récupérer le projet
```powershell
git clone https://github.com/ah3119/ah3119.git
cd ah3119
git checkout claude/ma-chaine-claude-code-rzcf54
cd histoire-argent
npm install
```

## 3. Vérifier, puis voir
```powershell
npm run check            # TypeScript + règles éditoriales
npm test                 # 17 tests
npm run dev              # studio Remotion dans le navigateur
npm run render:preview   # output/ep01-preview-short.mp4 (muet)
npm run assets           # avatar, bannière, miniature dans public/brand/
```
Dans un conteneur Linux sans Chrome, définir d'abord `REMOTION_BROWSER=/chemin/vers/chromium`.

## 4. Voix (payant : seulement après accord)
1. Avoir au moins l'offre ElevenLabs **Starter** (c'est le cas depuis le 19/11 : le clone `Sakina-Kids-FR-IVC` fonctionne).
2. Copier `.env.example` en `.env`, puis y coller la clé API. Le fichier `.env` n'est jamais commité.
3. `npm run voice:check` : vérifie l'offre et la voix, sans rien dépenser.
4. `npm run voice:one` : génère la scène 1 seulement. Écouter le résultat.
5. `npm run voice:all -- --yes`, puis `npm run voice:short-all -- --yes`.
6. `npm run sync` : mesure les durées des MP3, cale chaque scène sur sa voix et cale les sous-titres au mot près.
7. Voix générées avant le 21/11, ou enregistrées soi-même : `npm run align` (gratuit, en local avec whisper.cpp), puis `npm run sync`. Le premier lancement télécharge whisper.cpp et le modèle (466 Mo) dans `whisper.cpp/`, ce qui prend quelques minutes. Sous Linux et macOS, il faut Git, make et un compilateur C. Sous Windows, le binaire est téléchargé.

Plan B : enregistrer sa voix soi-même et déposer `s01.mp3` … `s20.mp3` dans `public/audio/long/`, puis `sh01.mp3` … `sh07.mp3` dans `public/audio/short/`. Lancer ensuite `npm run sync`.

## 5. Version narrée pour relecture
`npm run render:pilot` produit `output/ep01-pilote-long.mp4` et `output/ep01-pilote-short.mp4`. Il exige toutes les voix, mais pas l'approbation du script.

## 6. Rendu final
Dans les deux JSON, passer `"status"` à `"APPROVED_FOR_PUBLICATION"`. Ne le faire qu'après avoir relu le script. Lancer ensuite `npm run render:both`. Ce rendu refuse de partir si une piste audio manque ou si le script n'est pas approuvé.
