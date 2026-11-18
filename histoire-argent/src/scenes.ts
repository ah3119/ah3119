// Une scène = un bloc du script. Durées en secondes : à recaler sur l'audio ElevenLabs.
export type Scene =
  | {kind: 'title'; sec: number; kicker: string; title: string; sub: string}
  | {kind: 'card'; sec: number; lines: string[]; source?: string}
  | {kind: 'timeline'; sec: number; events: {year: string; label: string}[]}
  | {kind: 'curve'; sec: number; points: {t: string; v: number}[]; unit: string; source: string};

export const JOHN_LAW: Scene[] = [
  {kind: 'title', sec: 6, kicker: "L'histoire de l'argent · Épisode 1", title: 'John Law', sub: "L'Écossais qui a ruiné la France"},
  {kind: 'card', sec: 7, lines: ['Paris, 1719.', 'Rue Quincampoix.', 'Des valets deviennent millionnaires.']},
  {kind: 'timeline', sec: 14, events: [
    {year: '1671', label: 'Naissance à Édimbourg'},
    {year: '1694', label: 'Duel, condamné à mort, évasion'},
    {year: '1716', label: 'Banque générale'},
    {year: '1717', label: "Compagnie d'Occident"},
    {year: '1718', label: 'Banque royale'},
    {year: '1720', label: 'Contrôleur général… puis la chute'},
  ]},
  {kind: 'card', sec: 8, lines: ['Billets → actions → dette remboursée', "Tout tient… tant que personne ne demande de l'or."]},
  {kind: 'curve', sec: 10, unit: 'livres', source: 'Velde (2003), Fed de Chicago WP 2003-31 · valeurs indicatives, à vérifier', points: [
    {t: 'mai 1719', v: 500}, {t: 'août', v: 3000}, {t: 'oct.', v: 6000}, {t: 'déc. 1719', v: 10000},
    {t: 'mars 1720', v: 9000}, {t: 'juin', v: 6000}, {t: 'déc. 1720', v: 2000},
  ]},
  {kind: 'card', sec: 7, lines: ['Un actif qui monte parce que tout le monde achète', 'finit par baisser parce que tout le monde vend.']},
];

// Short 1 (9:16) : hook + courbe + morale, < 60 s
export const JOHN_LAW_SHORT1: Scene[] = [JOHN_LAW[1], JOHN_LAW[4], JOHN_LAW[5]];

export const totalFrames = (s: Scene[], fps: number) => s.reduce((a, x) => a + Math.round(x.sec * fps), 0);
