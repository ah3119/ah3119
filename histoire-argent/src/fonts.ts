import {useEffect, useState} from 'react';
import {continueRender, delayRender} from 'remotion';
import {F} from './brand';
// Charge les polices Google de la charte et bloque le rendu tant qu'elles ne sont pas prêtes.
export const useBrandFonts = () => {
  const [handle] = useState(() => delayRender('polices de la charte'));
  useEffect(() => {
    const id = 'brand-fonts';
    const done = () => document.fonts.ready.then(() => continueRender(handle));
    if (document.getElementById(id)) { done(); return; }
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet'; l.href = F.googleCss;
    l.onload = done; l.onerror = () => continueRender(handle);
    document.head.appendChild(l);
  }, [handle]);
};
