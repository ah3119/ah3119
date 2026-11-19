import {THEME, FPS} from './brand';
import {Scene, Episode} from './types';
// Même règle que scripts/lib.mjs : durée réelle de l'audio si synchronisé, sinon estimation.
const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
export const sceneSec = (s: Scene) => {
  const {wordsPerSecond, padSec, minSceneSec, minByVisual} = THEME.speech;
  const min = (minByVisual as Record<string, number>)[s.visual.type] ?? minSceneSec;
  return Math.max(min, s.audioSec ? s.audioSec + 0.6 : Math.max(minSceneSec, words(s.text) / wordsPerSecond + padSec));
};
export const sceneFrames = (s: Scene) => Math.round(sceneSec(s) * FPS);
export const episodeFrames = (e: Episode) => e.scenes.reduce((a, s) => a + sceneFrames(s), 0);
