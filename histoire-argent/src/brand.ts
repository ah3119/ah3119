import theme from '../config/theme.json';
import sources from '../content/research/sources.json';

export const C = {
  bg: theme.colors.inkDeep, ink: theme.colors.ink, paper: theme.colors.paper,
  red: theme.colors.red, gold: theme.colors.gold, dim: theme.colors.dim,
};
export const F = theme.fonts;
export const FPS = theme.fps;
export const THEME = theme;
export const SOURCES = sources as Record<string, {short: string; full: string; url: string}>;
