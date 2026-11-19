import test from 'node:test';
import assert from 'node:assert/strict';
import {EPISODES, loadEpisode, validate, sources, theme} from '../scripts/lib.mjs';

for (const fmt of Object.keys(EPISODES)) {
  test(`${fmt} : aucune erreur de validation`, () => {
    assert.deepEqual(validate(loadEpisode(fmt)).errors, []);
  });
}
test('long : 20 scènes, 7 à 10 min', () => {
  const ep = loadEpisode('long'); const {seconds} = validate(ep);
  assert.equal(ep.scenes.length, 20);
  assert.ok(seconds >= 420 && seconds <= 600, `${seconds}`);
});
test('short : 60 s maximum', () => assert.ok(validate(loadEpisode('short')).seconds <= 60));
test('chaque source a une URL et une référence complète', () => {
  for (const [k, s] of Object.entries(sources)) assert.ok(s.url && s.full && s.short, k);
});
test('le validateur rejette les affirmations retirées', () => {
  const ep = structuredClone(loadEpisode('short'));
  ep.scenes[0].text = 'Un bossu louait son dos.';
  assert.ok(validate(ep).errors.some((e) => e.includes('affirmation retirée')));
});
test('le validateur impose un seul tampon', () => {
  const ep = structuredClone(loadEpisode('short'));
  ep.scenes[0].stamp = 'FAUX';
  assert.ok(validate(ep).errors.some((e) => e.includes('1 tampon')));
});
test('palette de la charte', () => {
  assert.deepEqual(Object.values(theme.colors).slice(0, 5), ['#0B241A', '#123829', '#F2ECDC', '#C23A2B', '#B8913A']);
});
