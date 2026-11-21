import test from 'node:test';
import assert from 'node:assert/strict';
import {wordsFromAlignment, captionPages, captionsMatch, validate, loadEpisode} from '../scripts/lib.mjs';

const align = (text, step = 0.1) => {
  const characters = [...text];
  return {characters, character_start_times_seconds: characters.map((_, i) => i * step), character_end_times_seconds: characters.map((_, i) => (i + 1) * step)};
};
const timed = (text) => wordsFromAlignment(align(text));

test('alignement ElevenLabs : caractères → mots avec début et fin', () => {
  assert.deepEqual(timed('Un  rêve.').map((w) => [w.text, +w.start.toFixed(2), +w.end.toFixed(2)]), [['Un', 0, 0.2], ['rêve.', 0.4, 0.9]]);
});
test('pages : 5 mots maximum, temps croissants', () => {
  const pages = captionPages(timed('un deux trois quatre cinq six sept huit neuf dix onze douze'));
  assert.ok(pages.every((p) => p.words.length <= 6 && p.start <= p.end));
  pages.slice(1).forEach((p, i) => assert.ok(p.start >= pages[i].end));
});
test('pages : coupure après la ponctuation, jamais de mot seul en fin', () => {
  const pages = captionPages(timed('La bulle éclate. Tout le monde vend, vite.'));
  assert.deepEqual(pages.map((p) => p.words.map((w) => w.t).join(' ')), ['La bulle éclate.', 'Tout le monde vend, vite.']);
  const last = captionPages(timed('un deux trois quatre cinq six'));
  assert.ok(last.every((p) => p.words.length > 1));
});
test('le validateur signale un minutage périmé', () => {
  const ep = structuredClone(loadEpisode('shortFusion'));
  const s = ep.scenes[0];
  s.captions = captionPages(timed(s.text));
  assert.ok(captionsMatch(s));
  assert.ok(!validate(ep).warnings.some((w) => w.includes('périmés')));
  s.text += ' Ajout.';
  assert.ok(validate(ep).warnings.some((w) => w.includes('périmés')));
});

import {alignScript} from '../scripts/align-words.mjs';
const heard = (spec) => spec.split(' ').map((t, i) => ({text: t, start: i * 0.5, end: i * 0.5 + 0.4}));
test('whisper local : le texte du script garde les temps des mots entendus', () => {
  const out = alignScript('Quelques mois plus tard, elle approche les dix mille.', heard('quelques mois plus tard elle apporte les 10 000'));
  assert.deepEqual(out.map((w) => w.text), ['Quelques', 'mois', 'plus', 'tard,', 'elle', 'approche', 'les', 'dix', 'mille.']);
  assert.deepEqual(out.slice(0, 5).map((w) => w.start), [0, 0.5, 1, 1.5, 2]);
  for (let i = 1; i < out.length; i++) assert.ok(out[i].start >= out[i - 1].start && out[i].end >= out[i].start, `ordre ${i}`);
});
test('whisper local : un petit mot mal placé ne sert pas de repère', () => {
  // « de » entendu tout au bout ne doit pas aspirer le début de la phrase.
  const out = alignScript('Le cours est soutenu. Davantage de billets circulent.', heard('récousez-vous maintenant maman de'));
  assert.ok(out[0].start < 0.5, String(out[0].start));
});
