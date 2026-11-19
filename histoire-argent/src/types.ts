export type Visual =
  | {type: 'title'; title: string; subtitle: string}
  | {type: 'card'; kicker?: string; lines: string[]; sober?: boolean}
  | {type: 'quote'; quote: string; author: string}
  | {type: 'timeline'; events: {year: string; label: string}[]; focus?: number}
  | {type: 'counter'; from: number; to: number; unit: string; fromLabel: string; toLabel: string}
  | {type: 'curve'; unit: string; points: {t: string; v: number}[]; upTo: number; note?: string}
  | {type: 'flow'; nodes: string[]; loop?: boolean; caption?: string}
  | {type: 'lesson'; lines: string[]; next: string};
export type Scene = {id: string; text: string; sources: string[]; visual: Visual; stamp?: string; audio?: boolean; audioSec?: number};
export type Episode = {id: string; serial: string; format: 'long' | 'short'; status: string; title: string;
  thumbnail?: {place: string; name: string; big: string; stamp: string}; scenes: Scene[]};
