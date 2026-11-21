// Recale le texte connu d'une scène sur les mots entendus par Whisper (transcription parfois fautive).
// Alignement global mot à mot (Needleman-Wunsch) ; les mots du script sans correspondance
// (nombres écrits en chiffres, mots mal entendus) sont interpolés entre les voisins recalés.
const bare = (t) => t.toLowerCase().normalize('NFD').replace(/[^\p{L}\p{N}]/gu, '');
function sim(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const d = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return 1 - d[a.length][b.length] / Math.max(a.length, b.length);
}
// Deux mots « se correspondent » : identiques pour les mots courts (le, de, à…), proches sinon.
const close = (a, b) => { const x = bare(a), y = bare(b); const s = sim(x, y); return Math.min(x.length, y.length) <= 3 ? (x === y ? 1 : 0) : s >= 0.6 ? s : 0; };
// heard : [{text, start, end}] (Whisper) → script : texte de la scène → [{text, start, end}] avec les mots du script.
export function alignScript(text, heard, totalSec) {
  const S = text.trim().split(/\s+/), H = heard.filter((w) => bare(w.text));
  const n = S.length, m = H.length, GAP = -0.6;
  const sc = Array.from({length: n + 1}, () => new Float64Array(m + 1));
  const bt = Array.from({length: n + 1}, () => new Uint8Array(m + 1)); // 1 diag, 2 haut (mot du script seul), 3 gauche (mot entendu seul)
  for (let i = 1; i <= n; i++) { sc[i][0] = i * GAP; bt[i][0] = 2; }
  for (let j = 1; j <= m; j++) { sc[0][j] = j * GAP; bt[0][j] = 3; }
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
    const s = close(S[i - 1], H[j - 1].text);
    const opts = [[sc[i - 1][j - 1] + (s ? 2 * s : -1), 1], [sc[i - 1][j] + GAP, 2], [sc[i][j - 1] + GAP, 3]];
    const best = opts.reduce((a, b) => (b[0] > a[0] ? b : a));
    sc[i][j] = best[0]; bt[i][j] = best[1];
  }
  const out = S.map((t) => ({text: t, start: null, end: null}));
  for (let i = n, j = m; i > 0 || j > 0;) {
    const b = bt[i][j];
    if (b === 1) { if (close(S[i - 1], H[j - 1].text)) Object.assign(out[i - 1], {start: H[j - 1].start, end: H[j - 1].end}); i--; j--; }
    else if (b === 2) i--; else j--;
  }
  // Garde-fou : un repère très loin de sa place attendue (débit à peu près régulier dans une scène) est un faux ami.
  const end = totalSec ?? H.at(-1)?.end ?? n * 0.4, t0 = H[0]?.start ?? 0;
  const chars = S.map((w) => w.length + 1), all = chars.reduce((a, b) => a + b, 0);
  let acc = 0;
  out.forEach((w, i) => {
    const expected = t0 + ((end - t0) * acc) / all; acc += chars[i];
    if (w.start !== null && Math.abs(w.start - expected) > 0.35 * (end - t0) + 0.3) { w.start = null; w.end = null; }
  });
  // Interpolation des trous, au prorata du nombre de lettres.
  for (let i = 0; i < n;) {
    if (out[i].start !== null) { i++; continue; }
    let k = i; while (k < n && out[k].start === null) k++;
    const from = i ? out[i - 1].end : Math.min(H[0]?.start ?? 0, k < n ? out[k].start : end), to = Math.max(from, k < n ? out[k].start : end);
    const len = out.slice(i, k).reduce((a, w) => a + w.text.length, 0);
    let t = from;
    for (let x = i; x < k; x++) { const d = ((to - from) * out[x].text.length) / len; out[x].start = t; out[x].end = t + d; t += d; }
    i = k;
  }
  return out;
}
