import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';
import '@fontsource/archivo-black/400.css';
import '@fontsource/inter-tight/400.css';
import '@fontsource/inter-tight/800.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/800.css';

const faces = ['400 32px "Archivo Black"', '400 32px "Inter Tight"', '800 32px "Inter Tight"',
  '500 32px "JetBrains Mono"', '800 32px "JetBrains Mono"'];
export const useBrandFonts = () => {
  const [handle] = useState(() => delayRender('polices de la charte'));
  useEffect(() => {
    Promise.all(faces.map((face) => document.fonts.load(face, 'Édit · 500 livres')))
      .then((loaded) => {
        if (loaded.some((variants) => !variants.length)) throw new Error('Police de la charte indisponible');
        continueRender(handle);
      }).catch(cancelRender);
  }, [handle]);
};
