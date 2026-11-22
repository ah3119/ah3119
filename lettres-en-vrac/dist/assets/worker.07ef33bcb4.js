/* Moteur de recherche de mots — tourne dans un Web Worker pour ne jamais bloquer la page.
   Charge dico.txt une seule fois, puis répond aux requêtes envoyées par app.js. */
'use strict';

const DICO_URL = self.location.search.slice(1) || 'dico.txt';
let W = [];        // formes affichées (avec accents)
let N = [];        // formes normalisées (a-z, sans accents)
let B, LEN, MASK;  // bloc de fréquence, longueur, masque binaire des lettres
let KEYS = null;   // Map clé triée → indices (construite à la demande pour les anagrammes)
let ready = null;

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/[^a-z]/g, '');
}
function maskOf(s) {
  let m = 0;
  for (let i = 0; i < s.length; i++) m |= 1 << (s.charCodeAt(i) - 97);
  return m;
}
function countsOf(s) {
  const c = new Uint8Array(26);
  for (let i = 0; i < s.length; i++) c[s.charCodeAt(i) - 97]++;
  return c;
}
function sortKey(s) { return s.split('').sort().join(''); }

async function load() {
  const res = await fetch(DICO_URL);
  if (!res.ok) throw new Error('Dictionnaire introuvable (' + res.status + ')');
  const lines = (await res.text()).split('\n');
  const n = lines.length;
  B = new Uint8Array(n); LEN = new Uint8Array(n); MASK = new Int32Array(n);
  let bucket = 4, k = 0;
  for (const line of lines) {
    if (!line) continue;
    if (line[0] === '#') { bucket = +line.slice(1); continue; }
    const norm = normalize(line);
    W.push(line); N.push(norm);
    B[k] = bucket; LEN[k] = norm.length; MASK[k] = maskOf(norm); k++;
  }
  return k;
}

function buildKeys() {
  if (KEYS) return KEYS;
  KEYS = new Map();
  for (let i = 0; i < N.length; i++) {
    const key = sortKey(N[i]);
    const arr = KEYS.get(key);
    if (arr) arr.push(i); else KEYS.set(key, [i]);
  }
  return KEYS;
}

const byFreq = (a, b) => B[a] - B[b] || (W[a] < W[b] ? -1 : 1);

function pack(indices, limit) {
  indices.sort(byFreq);
  return indices.slice(0, limit).map(i => [W[i], B[i]]);
}

/* Groupe des indices par longueur (décroissante) */
function groupByLength(indices) {
  const groups = new Map();
  for (const i of indices) {
    const l = LEN[i];
    if (!groups.has(l)) groups.set(l, []);
    groups.get(l).push(i);
  }
  return [...groups.keys()].sort((a, b) => b - a).map(l => {
    const arr = groups.get(l);
    return { len: l, total: arr.length, words: pack(arr, 400) };
  });
}

function filtersOk(i, f) {
  const w = N[i];
  if (f.start && !w.startsWith(f.start)) return false;
  if (f.end && !w.endsWith(f.end)) return false;
  if (f.contains && !w.includes(f.contains)) return false;
  if (f.min && LEN[i] < f.min) return false;
  if (f.max && LEN[i] > f.max) return false;
  return true;
}

/* Tous les mots formables avec (une partie de) ces lettres, jokers « ? » compris */
function subAnagrams(q) {
  const raw = String(q.letters || '').toLowerCase();
  const jokers = Math.min((raw.match(/[?*_.]/g) || []).length, 3);
  const letters = normalize(raw).slice(0, 20);
  const total = letters.length + jokers;
  if (total < 2) return { groups: [], count: 0 };
  const have = countsOf(letters);
  const inMask = maskOf(letters);
  const f = cleanFilters(q);
  const found = [];
  const need = new Uint8Array(26);
  for (let i = 0; i < N.length; i++) {
    const l = LEN[i];
    if (l > total || l < 2) continue;
    if (!jokers && (MASK[i] & ~inMask)) continue;
    need.fill(0);
    const w = N[i];
    let missing = 0;
    for (let j = 0; j < l; j++) {
      const c = w.charCodeAt(j) - 97;
      if (++need[c] > have[c] && ++missing > jokers) break;
    }
    if (missing > jokers) continue;
    if (!filtersOk(i, f)) continue;
    found.push(i);
  }
  return { groups: groupByLength(found), count: found.length };
}

/* Anagrammes exactes (toutes les lettres) + anagrammes en deux mots */
function anagrams(q) {
  const letters = normalize(q.letters || '').slice(0, 24);
  if (letters.length < 2) return { exact: [], pairs: [], count: 0 };
  const keys = buildKeys();
  const key = sortKey(letters);
  const exact = (keys.get(key) || []).slice();
  const result = { exact: pack(exact, 200), pairs: [], pairsTotal: 0 };

  if (q.pairs && letters.length >= 4) {
    const have = countsOf(letters);
    const inMask = maskOf(letters);
    const maxBucket = q.rare ? 4 : 2;
    const seen = new Set();
    const pairs = [];
    const doneNorm = new Set();
    for (let i = 0; i < N.length; i++) {
      const l = LEN[i];
      if (l < 2 || l > letters.length - 2 || B[i] > maxBucket) continue;
      if (MASK[i] & ~inMask) continue;
      if (doneNorm.has(N[i])) continue;
      const c = countsOf(N[i]);
      let ok = true;
      for (let k = 0; k < 26; k++) if (c[k] > have[k]) { ok = false; break; }
      if (!ok) continue;
      doneNorm.add(N[i]);
      let rest = '';
      for (let k = 0; k < 26; k++) rest += String.fromCharCode(97 + k).repeat(have[k] - c[k]);
      const partners = keys.get(rest);
      if (!partners) continue;
      for (const j of partners) {
        if (B[j] > maxBucket) continue;
        const id = N[i] < N[j] ? N[i] + ' ' + N[j] : N[j] + ' ' + N[i];
        if (seen.has(id)) continue;
        seen.add(id);
        pairs.push([i, j]);
      }
    }
    pairs.sort((a, b) => (Math.max(B[a[0]], B[a[1]]) - Math.max(B[b[0]], B[b[1]]))
      || (B[a[0]] + B[a[1]] - B[b[0]] - B[b[1]]));
    result.pairsTotal = pairs.length;
    result.pairs = pairs.slice(0, 300).map(([i, j]) => [W[i], W[j], Math.max(B[i], B[j])]);
  }
  result.count = result.exact.length + result.pairs.length;
  return result;
}

/* Recherche par motif : « s?l?il », « *tion », lettres à inclure / exclure */
function pattern(q) {
  const raw = String(q.pattern || '').toLowerCase().trim();
  const p = raw.replace(/[._\-]/g, '?').split('').map(ch => (ch === '?' || ch === '*') ? ch : normalize(ch)).join('');
  if (!p.replace(/[?*]/g, '').length && !/\?/.test(p)) return { groups: [], count: 0 };
  const hasStar = p.includes('*');
  const re = new RegExp('^' + p.replace(/\*/g, '.*').replace(/\?/g, '[a-z]') + '$');
  const len = hasStar ? 0 : p.length;
  const inc = normalize(q.include || '');
  const exc = maskOf(normalize(q.exclude || '').split('').filter(c => !inc.includes(c)).join(''));
  const incCounts = countsOf(inc);
  const found = [];
  for (let i = 0; i < N.length; i++) {
    if (len && LEN[i] !== len) continue;
    if (exc && (MASK[i] & exc)) continue;
    if (!re.test(N[i])) continue;
    if (inc) {
      const c = countsOf(N[i]);
      let ok = true;
      for (let k = 0; k < 26; k++) if (c[k] < incCounts[k]) { ok = false; break; }
      if (!ok) continue;
    }
    found.push(i);
    if (found.length > 20000) break;
  }
  return { groups: groupByLength(found), count: found.length };
}

function cleanFilters(q) {
  return {
    start: normalize(q.start || ''),
    end: normalize(q.end || ''),
    contains: normalize(q.contains || ''),
    min: Math.max(0, parseInt(q.min, 10) || 0),
    max: Math.max(0, parseInt(q.max, 10) || 0),
  };
}

/* Mots qui commencent / finissent par / contiennent */
function affixes(q) {
  const f = cleanFilters(q);
  if (!f.start && !f.end && !f.contains) return { groups: [], count: 0 };
  const found = [];
  for (let i = 0; i < N.length; i++) if (filtersOk(i, f)) found.push(i);
  return { groups: groupByLength(found), count: found.length };
}

const HANDLERS = { subAnagrams, anagrams, pattern, affixes };

self.onmessage = async (e) => {
  const { id, type, query } = e.data;
  try {
    if (!ready) ready = load();
    const size = await ready;
    if (type === 'warmup') return self.postMessage({ id, type, size });
    const t0 = performance.now();
    const result = HANDLERS[type](query || {});
    result.ms = Math.round(performance.now() - t0);
    self.postMessage({ id, type, result, size });
  } catch (err) {
    self.postMessage({ id, type, error: String(err && err.message || err) });
  }
};
