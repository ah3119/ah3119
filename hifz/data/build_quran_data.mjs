// Génère src/data/quran.json : structure du mushaf de Médine (Hafs, 604 pages).
// Sources : quran-meta 7.0.0 (MIT) et quran-json 3.1.2 (noms des sourates, CC BY-SA 4.0).
// Usage : node build_quran_data.mjs <chemin quran-meta/dist/hafs.js> <chemin quran-json/dist/chapters> <sortie>
import fs from 'node:fs';
const [, , hafsPath, chaptersDir, out] = process.argv;
const q = await import(hafsPath);
const LANGS = ['en', 'fr', 'id', 'tr', 'ur'];

const pages = [];
for (let p = 1; p <= 604; p++) {
  const meta = q.getPageMeta(p);
  const [s1, a1] = q.findSurahAyahByAyahId(meta.firstAyahId);
  const [s2, a2] = q.findSurahAyahByAyahId(meta.lastAyahId);
  pages.push([s1, a1, s2, a2]);
}
const juz = [];
for (let j = 1; j <= 30; j++) {
  const m = q.getJuzMeta(j);
  const [js, ja] = q.findSurahAyahByAyahId(m.firstAyahId);
  juz.push([q.findPageByAyahId(m.firstAyahId), js, ja]); // [page, surah, ayah] — 4 juz start mid-page
}
const surahs = [];
for (let s = 1; s <= 114; s++) {
  const n = q.getAyahCountInSurah(s);
  const first = q.findAyahIdBySurah(s, 1), last = q.findAyahIdBySurah(s, n);
  const ch = JSON.parse(fs.readFileSync(`${chaptersDir}/${s}.json`, 'utf8'));
  const names = { ar: ch.name, tr_en: ch.transliteration };
  for (const l of LANGS) {
    try { names[l] = JSON.parse(fs.readFileSync(`${chaptersDir}/${l}/${s}.json`, 'utf8')).translation; } catch (e) { /* langue absente */ }
  }
  surahs.push({ n, p1: q.findPageByAyahId(first), p2: q.findPageByAyahId(last), type: ch.type, ...names });
}
fs.writeFileSync(out, JSON.stringify({ source: 'quran-meta 7.0.0 (MIT), quran-json 3.1.2 (CC BY-SA 4.0)', pages, juz, surahs }));
console.log('pages', pages.length, 'juz', juz.length, 'surahs', surahs.length);
