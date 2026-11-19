export type Visual =
  | {type: 'title'; title: string; subtitle: string}
  | {type: 'card'; kicker?: string; lines: string[]; sober?: boolean}
  | {type: 'quote'; quote: string; author: string}
  | {type: 'timeline'; events: {year: string; label: string}[]; focus?: number}
  | {type: 'counter'; from: number; to: number; unit: string; fromLabel: string; toLabel: string}
  | {type: 'curve'; unit: string; points: {t: string; v: number}[]; upTo: number; startAt?: number; note?: string}
  | {type: 'flow'; nodes: string[]; loop?: boolean; caption?: string}
  | {type: 'lesson'; lines: string[]; next: string}
  | {type: 'press'; kicker?: string; title: string}
  | {type: 'crowd'; kicker?: string; title: string; ticker: string}
  | {type: 'ticker'; values: number[]; unit: string; label: string}
  | {type: 'doc'; kicker: string; lines: string[]; seal?: string; redLine?: number}
  | {type: 'machine'; nodes: string[]; center: string}
  | {type: 'gold'; title: string; drain?: boolean}
  | {type: 'burn'; title: string; kicker?: string}
  | {type: 'outro'; lines: string[]; cta: string};
export type Sfx = {name: string; at?: number; volume?: number; dur?: number};
export type Scene = {id: string; text: string; sources: string[]; visual: Visual; stamp?: string; audio?: boolean; audioSec?: number; sfx?: Sfx[]};
export type Episode = {id: string; serial: string; format: 'long' | 'short'; status: string; title: string;
  thumbnail?: {place: string; name: string; big: string; stamp: string}; wordsPerSecond?: number; audioDir?: string; transitionSfx?: string; bed?: {name: string; volume: number}; scenes: Scene[]};
