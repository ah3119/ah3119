# L'Histoire de l'Argent

- Plan de chaîne : `PLAN_CHAINE.md`
- Épisode 1 : `ep01-john-law/script.md`
- Scènes : `src/scenes.ts` (les durées se recalent sur l'audio)

```
npm install
npx remotion studio src/index.ts      # aperçu
npm run render:long && npm run render:short
```
Dans un conteneur sans Chrome : ajouter `--browser-executable=/opt/pw-browsers/chromium`.
Voix : déposer `public/ep01.mp3`, puis passer `audio: 'ep01.mp3'` dans `src/Root.tsx`.
