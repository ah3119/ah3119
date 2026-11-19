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
  assert.deepEqual(Object.values(theme.colors).slice(0, 5), ['#0B0B0C', '#161617', '#F2F0EA', '#E5322D', '#FFD400']);
});
test('fusion : dix plans, repères sourcés, tampon et impact synchronisés', () => {
  const ep = loadEpisode('shortFusion');
  const {seconds} = validate(ep);
  assert.equal(ep.scenes.length, 10);
  assert.ok(seconds >= 40 && seconds <= 50, String(seconds));
  const prices = ep.scenes.filter(s => s.visual.type === 'action-price');
  assert.deepEqual(prices.map(s => s.visual.value), ['500', '10 000']);
  assert.ok(prices[1].visual.approximate && prices.every(s => s.sources.includes('velde2003')));
  assert.ok(ep.scenes.every(s => !['curve', 'ticker'].includes(s.visual.type)));
  const hit = ep.scenes.find(s => s.stamp);
  assert.equal(hit.id, 'f08');
  assert.equal(hit.sfx.find(s => s.name === 'tampon').at, hit.stampAt);
  assert.equal(ep.scenes.flatMap(s => s.sfx ?? []).filter(s => s.name === 'tampon').length, 1);
});
