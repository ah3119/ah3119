/* Hifzly — personal Quran memorization planner (sabaq · sabqi · manzil).
   100 % in the browser: no account, no server. Plan in the URL, progress in localStorage. */
(function () {
  'use strict';
  const I = JSON.parse(document.getElementById('i18n').textContent);
  const LANG = document.documentElement.lang;
  const LOC = LANG === 'ar' ? 'ar-u-nu-latn' : LANG;
  const SITE = document.documentElement.dataset.site || 'Hifzly';
  const T = (k, v) => { let s = I[k] != null ? I[k] : k; if (v) for (const a in v) s = s.split('{' + a + '}').join(v[a]); return s; };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const nf = new Intl.NumberFormat(LOC);
  const fmtDate = (d, o) => new Intl.DateTimeFormat(LOC, Object.assign({ timeZone: 'UTC' }, o || { weekday: 'short', day: 'numeric', month: 'short' })).format(d);
  const fmtLong = (d) => fmtDate(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const app = $('#planner');
  if (!app) return;
  const PREVIEW = app.dataset.preview === '1'; // embedded preview: no downloads, print or share sheet

  /* ---------------- Quran structure ---------------- */
  let Q = null;
  const LINES = 15;
  let surahStartG = [], juzStartG = [], pageStartG = [];
  async function loadQuran() {
    const inline = document.getElementById('quran-data');
    if (inline) Q = JSON.parse(inline.textContent);
    else { const r = await fetch(app.dataset.quran); Q = await r.json(); }
    let g = 0;
    surahStartG = [0];
    Q.surahs.forEach((s, i) => { surahStartG[i + 1] = g; g += s.n; });
    surahStartG.push(g); // sentinel at 115
    const gOf = (s, a) => surahStartG[s] + a - 1;
    pageStartG = Q.pages.map((p) => gOf(p[0], p[1]));
    juzStartG = Q.juz.map((j) => gOf(j[1], j[2]));
    Q.juzPage = Q.juz.map((j) => j[0]);
    Q.gOf = gOf;
  }
  const TOTAL_AYAHS = () => surahStartG[115];
  const surahName = (s) => { const x = Q.surahs[s - 1]; return (LANG === 'ar' || LANG === 'ur') ? x.ar : (LANG === 'tr' ? (x.tr || x.tr_en) : x.tr_en); };
  function surahOfG(g) { let lo = 1, hi = 114; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (surahStartG[m] <= g) lo = m; else hi = m - 1; } return lo; }
  function juzOfPage(p) { let j = 1; for (let k = 0; k < 30; k++) if (Q.juzPage[k] <= p) j = k + 1; return j; }
  function juzOfG(g) { let j = 1; for (let k = 0; k < 30; k++) if (juzStartG[k] <= g) j = k + 1; return j; }
  const juzLastPage = (j) => (j < 30 ? Q.juzPage[j] - 1 : 604);

  /* ---------------- Plan parameters ---------------- */
  const today = () => { const n = new Date(); return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()); };
  const iso = (ms) => new Date(ms).toISOString().slice(0, 10);
  const parseISO = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; };
  const DEFAULT = { scope: 'surah', from: 30, to: 30, sfrom: 114, sto: 78, unit: 'ayah', order: 'end', amount: 3, mode: 'amount', target: '', days: 'nnnnrnn', sabqi: 7, manzil: 20, known: [], start: '' };
  let P = Object.assign({}, DEFAULT);

  function clampInt(v, a, b, d) { v = parseInt(v, 10); return Number.isFinite(v) ? Math.min(b, Math.max(a, v)) : d; }
  function sanitize(o) {
    const p = Object.assign({}, DEFAULT, o || {});
    p.scope = ['all', 'juz', 'surah'].includes(p.scope) ? p.scope : DEFAULT.scope;
    p.from = clampInt(p.from, 1, 30, 30); p.to = clampInt(p.to, 1, 30, 30);
    p.sfrom = clampInt(p.sfrom, 1, 114, 114); p.sto = clampInt(p.sto, 1, 114, 78);
    p.unit = p.unit === 'line' ? 'line' : 'ayah';
    p.order = p.order === 'start' ? 'start' : 'end';
    p.amount = clampInt(p.amount, 1, 60, 3);
    p.mode = p.mode === 'date' ? 'date' : 'amount';
    p.target = parseISO(p.target) ? p.target : '';
    p.days = /^[nro]{7}$/.test(p.days) && p.days.includes('n') ? p.days : DEFAULT.days;
    p.sabqi = clampInt(p.sabqi, 0, 30, 7);
    p.manzil = clampInt(p.manzil, 0, 600, p.unit === 'line' ? 5 : 20);
    p.known = Array.isArray(p.known) ? [...new Set(p.known.map(Number).filter((j) => j >= 1 && j <= 30))] : [];
    p.start = parseISO(p.start) ? p.start : iso(today());
    return p;
  }

  /* ---------------- Units & schedule ---------------- */
  function buildUnits(p) {
    const knownJ = new Set(p.known);
    let groups = [];
    if (p.unit === 'line') {
      let a, b;
      if (p.scope === 'all') { a = 1; b = 604; }
      else if (p.scope === 'juz') { const x = Math.min(p.from, p.to), y = Math.max(p.from, p.to); a = Q.juzPage[x - 1]; b = juzLastPage(y); }
      else { const x = Math.min(p.sfrom, p.sto), y = Math.max(p.sfrom, p.sto); a = Q.surahs[x - 1].p1; b = Q.surahs[y - 1].p2; }
      const byJuz = new Map();
      for (let pg = a; pg <= b; pg++) { const j = juzOfPage(pg); if (!byJuz.has(j)) byJuz.set(j, []); byJuz.get(j).push(pg); }
      groups = [...byJuz.entries()].sort((u, v) => u[0] - v[0]).map(([j, pages]) => ({ j, units: pages.flatMap((pg) => Array.from({ length: LINES }, (_, l) => (pg - 1) * LINES + l)) }));
      if (p.order === 'end') groups.reverse();
      const known = new Set(), seq = [];
      groups.forEach((gr) => gr.units.forEach((u) => { if (knownJ.has(gr.j)) known.add(u); else seq.push(u); }));
      // also juz marked as known but outside scope count as revision material
      knownJ.forEach((j) => { for (let pg = Q.juzPage[j - 1]; pg <= juzLastPage(j); pg++) for (let l = 0; l < LINES; l++) known.add((pg - 1) * LINES + l); });
      return { kind: 'line', N: 604 * LINES, seq, known };
    }
    let g1, g2;
    if (p.scope === 'all') { g1 = 0; g2 = TOTAL_AYAHS() - 1; }
    else if (p.scope === 'juz') { const x = Math.min(p.from, p.to), y = Math.max(p.from, p.to); g1 = juzStartG[x - 1]; g2 = y < 30 ? juzStartG[y] - 1 : TOTAL_AYAHS() - 1; }
    else { const x = Math.min(p.sfrom, p.sto), y = Math.max(p.sfrom, p.sto); g1 = surahStartG[x]; g2 = surahStartG[y + 1] - 1; }
    const bySurah = new Map();
    for (let g = g1; g <= g2; g++) { const s = surahOfG(g); if (!bySurah.has(s)) bySurah.set(s, []); bySurah.get(s).push(g); }
    groups = [...bySurah.entries()].sort((u, v) => u[0] - v[0]);
    if (p.order === 'end') groups.reverse();
    const known = new Set(), seq = [];
    groups.forEach(([, gs]) => gs.forEach((g) => (knownJ.has(juzOfG(g)) ? known.add(g) : seq.push(g))));
    knownJ.forEach((j) => { const e = j < 30 ? juzStartG[j] : TOTAL_AYAHS(); for (let g = juzStartG[j - 1]; g < e; g++) known.add(g); });
    return { kind: 'ayah', N: TOTAL_AYAHS(), seq, known };
  }

  function countStudyDays(p, fromMs, toMs) {
    let n = 0;
    for (let d = fromMs; d <= toMs; d += 864e5) if (p.days[isoWd(d) - 1] === 'n') n++;
    return n;
  }
  const isoWd = (ms) => { const w = new Date(ms).getUTCDay(); return w === 0 ? 7 : w; };

  function makePlan(p) {
    const U = buildUnits(p);
    const start = parseISO(p.start);
    let amount = p.amount;
    let warn = '';
    if (p.mode === 'date' && parseISO(p.target)) {
      const n = countStudyDays(p, start, parseISO(p.target));
      amount = n > 0 ? Math.max(1, Math.ceil(U.seq.length / n)) : U.seq.length;
      if (n <= 0) warn = T('warn_date');
    }
    const unitAmount = amount;
    const pool = new Uint8Array(U.N);
    let poolSize = 0;
    U.known.forEach((u) => { if (!pool[u]) { pool[u] = 1; poolSize++; } });
    const manzilK = p.unit === 'line' ? p.manzil * LINES : p.manzil;
    let mp = 0;
    const recent = [];
    const days = [];
    // milestones: remaining units per juz (line) or surah (ayah)
    const remain = new Map();
    const keyOf = (u) => (U.kind === 'line' ? juzOfPage(Math.floor(u / LINES) + 1) : surahOfG(u));
    U.seq.forEach((u) => remain.set(keyOf(u), (remain.get(keyOf(u)) || 0) + 1));
    const milestones = [];
    let i = 0, d = start, guard = 0;
    while (i < U.seq.length && guard++ < 8000) {
      const st = p.days[isoWd(d) - 1];
      if (st === 'o') { d += 864e5; continue; }
      const day = { date: d, type: st, sabaq: [], sabqi: recent.flat(), manzil: [] };
      if (st === 'n') {
        let chunk = U.seq.slice(i, i + unitAmount);
        if (U.kind === 'ayah') { const s0 = surahOfG(chunk[0]); const cut = chunk.findIndex((g) => surahOfG(g) !== s0); if (cut > 0) chunk = chunk.slice(0, cut); }
        i += chunk.length;
        day.sabaq = chunk;
        chunk.forEach((u) => { const k = keyOf(u); const r = remain.get(k) - 1; remain.set(k, r); if (r === 0) milestones.push({ key: k, date: d }); });
      }
      if (manzilK > 0 && poolSize > 0) {
        const take = Math.min(manzilK, poolSize);
        const out = [];
        let scanned = 0;
        while (out.length < take && scanned < U.N * 2) { if (pool[mp]) out.push(mp); mp = (mp + 1) % U.N; scanned++; }
        day.manzil = out;
      }
      if (st === 'n') {
        recent.push(day.sabaq);
        while (recent.length > p.sabqi) { recent.shift().forEach((u) => { if (!pool[u]) { pool[u] = 1; poolSize++; } }); }
      }
      days.push(day);
      d += 864e5;
    }
    const studyDays = days.filter((x) => x.type === 'n').length;
    return { U, days, milestones, amount: unitAmount, studyDays, end: days.length ? days[days.length - 1].date : start, start, warn, total: U.seq.length };
  }

  /* ---------------- Describing ranges ---------------- */
  function runs(units) {
    const s = [...units].sort((a, b) => a - b);
    const out = [];
    for (const u of s) { const last = out[out.length - 1]; if (last && u === last[1] + 1) last[1] = u; else out.push([u, u]); }
    return out;
  }
  function describe(units, kind, max) {
    if (!units.length) return null;
    const rs = runs(units);
    const parts = [];
    let link = null;
    if (kind === 'line') {
      for (const [a, b] of rs) {
        const p1 = Math.floor(a / LINES) + 1, l1 = (a % LINES) + 1, p2 = Math.floor(b / LINES) + 1, l2 = (b % LINES) + 1;
        let txt;
        if (l1 === 1 && l2 === LINES) txt = p1 === p2 ? T('page_n', { p: p1 }) : T('pages_n', { a: p1, b: p2 });
        else if (p1 === p2) txt = T('page_lines', { p: p1, a: l1, b: l2 });
        else txt = T('page_line_range', { p1, l1, p2, l2 });
        const jIdx = Q.juzPage.indexOf(p1);
        const fullJuz = l1 === 1 && l2 === LINES && jIdx >= 0 && juzLastPage(jIdx + 1) === p2;
        const s = Q.pages[p1 - 1][0];
        parts.push(fullJuz ? `${T('juz_n', { j: jIdx + 1 })} (${txt})` : `${surahName(s)} · ${txt}`);
        if (!link) link = `https://quran.com/page/${p1}`;
      }
    } else {
      const segs = [];
      for (const [a, b] of rs) {
        let g = a;
        while (g <= b) {
          const s = surahOfG(g), e = Math.min(b, surahStartG[s + 1] - 1);
          segs.push([s, g - surahStartG[s] + 1, e - surahStartG[s] + 1]);
          g = e + 1;
        }
      }
      const label = ([s, a1, a2]) => (a1 === 1 && a2 === Q.surahs[s - 1].n) ? surahName(s) : `${surahName(s)} ${s}:${a1}${a2 > a1 ? '–' + a2 : ''}`;
      if (segs.length > (max || 3)) parts.push(T('surah_span', { a: label(segs[0]), b: label(segs[segs.length - 1]), n: segs.length }));
      else segs.forEach((x) => parts.push(label(x)));
      const f = segs[0];
      link = `https://quran.com/${f[0]}/${f[1]}-${f[2]}`;
    }
    return { text: parts.length > (max || 3) ? parts.slice(0, max || 3).join(' · ') + ' …' : parts.join(' · '), link };
  }
  // Plural forms: optional "<key>_many" string for n > 10 (Arabic: 3–10 آيات, 11+ آية)
  const PL = (key, n) => T(n > 10 && I[key + '_many'] ? key + '_many' : key, { n: nf.format(n) });
  function amountLabel(n, kind) { return kind === 'line' ? (n === 1 ? T('n_line', { n: 1 }) : PL('n_lines', n)) : (n === 1 ? T('n_ayah', { n: 1 }) : PL('n_ayahs', n)); }

  /* ---------------- Form ---------------- */
  const form = $('form.hz-form', app);
  const F = (n) => form.elements.namedItem(n);
  function fillSelects() {
    const juzOpts = Array.from({ length: 30 }, (_, k) => `<option value="${k + 1}">${esc(T('juz_n', { j: k + 1 }))}</option>`).join('');
    const surahOpts = Q.surahs.map((s, k) => `<option value="${k + 1}">${k + 1}. ${esc(surahName(k + 1))}</option>`).join('');
    $$('select[data-list="juz"]', form).forEach((s) => (s.innerHTML = juzOpts));
    $$('select[data-list="surah"]', form).forEach((s) => (s.innerHTML = surahOpts));
    $('.hz-known', form).innerHTML = Array.from({ length: 30 }, (_, k) => `<label><input type="checkbox" name="known" value="${k + 1}"><span>${k + 1}</span></label>`).join('');
    const wdNames = [1, 2, 3, 4, 5, 6, 7].map((d) => fmtDate(Date.UTC(2024, 0, d), { weekday: 'short' }));
    $('.hz-days', form).innerHTML = wdNames.map((n, k) => `<label class="hz-dayctl"><span>${esc(n)}</span><select data-day="${k}"><option value="n">${esc(T('day_new'))}</option><option value="r">${esc(T('day_review'))}</option><option value="o">${esc(T('day_off'))}</option></select></label>`).join('');
  }
  function writeForm(p) {
    F('scope').value = p.scope; F('from').value = p.from; F('to').value = p.to; F('sfrom').value = p.sfrom; F('sto').value = p.sto;
    F('unit').value = p.unit; F('order').value = p.order; F('amount').value = p.amount; F('mode').value = p.mode; F('tdate').value = p.target;
    F('sabqi').value = p.sabqi; F('manzil').value = p.manzil; F('start').value = p.start;
    $$('select[data-day]', form).forEach((s) => (s.value = p.days[+s.dataset.day]));
    $$('input[name="known"]', form).forEach((c) => (c.checked = p.known.includes(+c.value)));
    syncVisibility();
  }
  function readForm() {
    return sanitize({
      scope: F('scope').value, from: F('from').value, to: F('to').value, sfrom: F('sfrom').value, sto: F('sto').value,
      unit: F('unit').value, order: F('order').value, amount: F('amount').value, mode: F('mode').value, target: F('tdate').value,
      sabqi: F('sabqi').value, manzil: F('manzil').value, start: F('start').value,
      days: $$('select[data-day]', form).sort((a, b) => a.dataset.day - b.dataset.day).map((s) => s.value).join(''),
      known: $$('input[name="known"]:checked', form).map((c) => +c.value),
    });
  }
  function syncVisibility() {
    $$('[data-show]', form).forEach((el) => {
      const [field, vals] = el.dataset.show.split('=');
      el.hidden = !vals.split('|').includes(F(field).value);
    });
    $('.hz-unit-label', form).textContent = F('unit').value === 'line' ? T('unit_lines') : T('unit_ayahs');
    $('.hz-manzil-label', form).textContent = F('unit').value === 'line' ? T('manzil_pages') : T('manzil_ayahs');
  }

  /* ---------------- Rendering ---------------- */
  let plan = null, sig = '', done = new Set(), shown = 28;
  const els = { summary: $('.hz-summary', app), today: $('.hz-today', app), list: $('.hz-list', app), miles: $('.hz-miles', app), progress: $('.hz-progress', app) };

  function render() {
    plan = makePlan(P);
    sig = JSON.stringify([P.scope, P.from, P.to, P.sfrom, P.sto, P.unit, P.order, P.start]);
    try { done = new Set(JSON.parse(store.get('hifzly.done.' + sig) || '[]')); } catch (e) { done = new Set(); }
    shown = 28;
    const k = plan.U.kind;
    const weeks = Math.max(1, Math.round((plan.end - plan.start) / (7 * 864e5)));
    const totalLabel = k === 'line' ? PL('n_pages', Math.round(plan.total / LINES * 10) / 10) : amountLabel(plan.total, k);
    if (!plan.total) {
      els.summary.innerHTML = `<p class="hz-warn">${esc(T('nothing_left'))}</p>`;
      els.today.innerHTML = ''; els.list.innerHTML = ''; els.miles.innerHTML = ''; els.progress.innerHTML = '';
      return;
    }
    els.summary.innerHTML = `
      <ul class="hz-tiles">
        <li><b>${esc(fmtDate(plan.end, { day: 'numeric', month: 'short', year: 'numeric' }))}</b><span>${esc(T('tile_end'))}</span></li>
        <li><b>${esc(amountLabel(plan.amount, k))}</b><span>${esc(T('tile_daily'))}</span></li>
        <li><b>${esc(nf.format(plan.studyDays))}</b><span>${esc(T('tile_days'))}</span></li>
        <li><b>${esc(totalLabel)}</b><span>${esc(T('tile_total'))}</span></li>
      </ul>
      <p>${esc(T('summary', { total: totalLabel, end: fmtLong(plan.end), weeks: nf.format(weeks) }))}</p>
      ${plan.warn ? `<p class="hz-warn">${esc(plan.warn)}</p>` : ''}
      ${(k === 'line' && plan.amount > 30) || (k === 'ayah' && plan.amount > 20) ? `<p class="hz-warn">${esc(T('warn_heavy'))}</p>` : ''}`;
    renderToday(); renderList(); renderMiles(); renderProgress();
  }

  function dayBlock(day, compact) {
    const k = plan.U.kind;
    const row = (cls, label, units, max) => {
      const d = describe(units, k, max);
      if (!d) return '';
      return `<div class="hz-part ${cls}"><span class="hz-tag">${esc(label)}</span><span class="hz-txt">${esc(d.text)}</span>${compact ? '' : `<a class="hz-read" href="${d.link}" target="_blank" rel="noopener">${esc(T('read_listen'))}</a>`}</div>`;
    };
    let h = '';
    if (day.type === 'n') h += row('p-sabaq', T('sabaq'), day.sabaq, 2);
    h += row('p-sabqi', T('sabqi'), day.sabqi, 2);
    h += row('p-manzil', T('manzil'), day.manzil, 2);
    if (!h) h = `<div class="hz-part"><span class="hz-txt hz-muted">${esc(T('review_free'))}</span></div>`;
    return h;
  }

  function renderToday() {
    const t = today();
    const day = plan.days.find((d) => d.date >= t);
    if (!day) { els.today.innerHTML = `<p>${esc(T('plan_finished'))}</p>`; return; }
    const label = fmtLong(day.date);
    const key = iso(day.date);
    els.today.innerHTML = `<div class="hz-today-head"><h3>${esc(label)}${day.type === 'r' ? ` <small>· ${esc(T('day_review'))}</small>` : ''}</h3>
      <label class="hz-check"><input type="checkbox" data-done="${key}"${done.has(key) ? ' checked' : ''}> ${esc(T('mark_done'))}</label></div>${dayBlock(day)}`;
  }

  function renderList() {
    const t = today();
    const rows = plan.days.slice(0, shown).map((day) => {
      const key = iso(day.date);
      return `<li class="hz-day${day.date === t ? ' is-today' : ''}${done.has(key) ? ' is-done' : ''}${day.type === 'r' ? ' is-review' : ''}">
        <label class="hz-date"><input type="checkbox" data-done="${key}"${done.has(key) ? ' checked' : ''} aria-label="${esc(T('mark_done'))}"><span>${esc(fmtDate(day.date))}</span></label>
        <div class="hz-parts">${dayBlock(day, true)}</div></li>`;
    }).join('');
    const more = plan.days.length > shown ? `<button type="button" class="hz-btn" data-act="more">${esc(T('show_more', { n: nf.format(plan.days.length - shown) }))}</button>` : '';
    els.list.innerHTML = `<ol class="hz-days-list">${rows}</ol>${more}`;
  }

  function milestoneLabel(m) { return plan.U.kind === 'line' ? T('juz_n', { j: m.key }) : surahName(m.key); }
  function renderMiles() {
    const list = plan.milestones;
    const shownM = list.length > 40 ? list.filter((m, i) => i % Math.ceil(list.length / 40) === 0 || i === list.length - 1) : list;
    els.miles.innerHTML = `<ol class="hz-miles-list">${shownM.map((m) => {
      const reached = done.has(iso(m.date)) || m.date < today();
      return `<li class="${reached ? 'is-reached' : ''}"><span class="hz-dot"></span><b>${esc(milestoneLabel(m))}</b><time>${esc(fmtDate(m.date, { day: 'numeric', month: 'short', year: 'numeric' }))}</time><button type="button" class="hz-link" data-card="${esc(milestoneLabel(m))}">${esc(T('share_card'))}</button></li>`;
    }).join('')}</ol>`;
  }

  function renderProgress() {
    const total = plan.days.length;
    const n = plan.days.filter((d) => done.has(iso(d.date))).length;
    const pct = total ? Math.round((n / total) * 100) : 0;
    els.progress.innerHTML = `<div class="hz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>
      <p>${esc(T('progress', { n: nf.format(n), total: nf.format(total), pct: nf.format(pct) }))}</p>`;
  }

  /* ---------------- Share card (canvas) ---------------- */
  async function shareCard(title, btn, head) {
    const c = document.createElement('canvas');
    c.width = 1080; c.height = 1350;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 1080, 1350);
    g.addColorStop(0, '#0b4f40'); g.addColorStop(1, '#063329');
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1350);
    // geometric 8-point stars
    x.strokeStyle = 'rgba(214,178,94,.18)'; x.lineWidth = 2;
    for (let yy = 90; yy < 1350; yy += 180) for (let xx = (yy / 180) % 2 ? 0 : 90; xx < 1170; xx += 180) {
      for (let r = 0; r < 2; r++) { x.save(); x.translate(xx, yy); x.rotate(r * Math.PI / 4); x.strokeRect(-34, -34, 68, 68); x.restore(); }
    }
    x.textAlign = 'center'; x.direction = (LANG === 'ar' || LANG === 'ur') ? 'rtl' : 'ltr';
    x.fillStyle = '#d6b25e'; x.font = '700 96px "Noto Naskh Arabic", "Amiri", "Geeza Pro", serif';
    x.fillText('الحمد لله', 540, 330);
    x.fillStyle = '#ffffff'; x.font = '700 64px system-ui, -apple-system, "Segoe UI", sans-serif';
    wrapText(x, head || T('card_done'), 540, 520, 900, 76);
    x.fillStyle = '#d6b25e'; x.font = '800 92px system-ui, -apple-system, "Segoe UI", sans-serif';
    wrapText(x, title, 540, 680, 940, 104);
    x.fillStyle = 'rgba(255,255,255,.85)'; x.font = '500 40px system-ui, -apple-system, "Segoe UI", sans-serif';
    wrapText(x, T('card_sub'), 540, 960, 900, 52);
    x.fillStyle = '#ffffff'; x.font = '700 44px system-ui, -apple-system, "Segoe UI", sans-serif';
    x.fillText(SITE, 540, 1230);
    x.fillStyle = 'rgba(255,255,255,.7)'; x.font = '400 32px system-ui, -apple-system, "Segoe UI", sans-serif';
    x.fillText(T('card_footer'), 540, 1280);
    const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
    if (PREVIEW) { showCard(blob); return; }
    const file = new File([blob], 'hifz-milestone.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], text: T('card_share_text', { m: title, site: SITE }) }); return; } catch (e) { /* cancelled */ }
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'hifz-milestone.png';
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    if (btn) flash(btn, T('downloaded'));
  }
  function showCard(blob) {
    const ov = document.createElement('div');
    ov.className = 'hz-overlay';
    ov.innerHTML = `<figure><img alt="" src="${URL.createObjectURL(blob)}"><figcaption>${esc(T('card_save_hint'))}</figcaption><button type="button" class="hz-btn primary">${esc(T('close'))}</button></figure>`;
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target.tagName === 'BUTTON') ov.parentNode.removeChild(ov); });
    document.body.appendChild(ov);
    $('button', ov).focus();
  }
  function wrapText(x, text, cx, y, maxW, lh) {
    const words = String(text).split(' '); let line = '', yy = y;
    for (const w of words) { const t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { x.fillText(line, cx, yy); line = w; yy += lh; } else line = t; }
    if (line) x.fillText(line, cx, yy);
  }
  function flash(btn, txt) { const t = btn.textContent; btn.textContent = txt; setTimeout(() => (btn.textContent = t), 1600); }

  /* ---------------- Exports ---------------- */
  function downloadICS() {
    const k = plan.U.kind;
    const escI = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const d8 = (ms) => iso(ms).replace(/-/g, '');
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hifzly//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:' + escI(T('cal_name'))];
    plan.days.forEach((day, n) => {
      const parts = [];
      if (day.type === 'n') { const s = describe(day.sabaq, k, 2); if (s) parts.push(T('sabaq') + ': ' + s.text); }
      const r = describe(day.sabqi, k, 2); if (r) parts.push(T('sabqi') + ': ' + r.text);
      const m = describe(day.manzil, k, 2); if (m) parts.push(T('manzil') + ': ' + m.text);
      const summary = day.type === 'n' ? T('sabaq') + ' — ' + (describe(day.sabaq, k, 1) || { text: '' }).text : T('day_review');
      lines.push('BEGIN:VEVENT', `UID:${d8(day.date)}-${n}@hifzly`, 'DTSTAMP:' + stamp, 'DTSTART;VALUE=DATE:' + d8(day.date), 'DTEND;VALUE=DATE:' + d8(day.date + 864e5),
        'SUMMARY:' + escI(summary), 'DESCRIPTION:' + escI(parts.join('\n')), 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
    a.download = 'hifz-plan.ics'; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function printPlan() {
    const k = plan.U.kind;
    const area = $('#hz-print');
    const cell = (u, max) => { const d = describe(u, k, max); return d ? esc(d.text) : ''; };
    area.innerHTML = `<h1>${esc(T('print_title'))}</h1><p>${esc(T('summary', { total: k === 'line' ? PL('n_pages', Math.round(plan.total / LINES * 10) / 10) : amountLabel(plan.total, k), end: fmtLong(plan.end), weeks: Math.round((plan.end - plan.start) / (7 * 864e5)) }))}</p>
      <table><thead><tr><th>✓</th><th>${esc(T('col_date'))}</th><th>${esc(T('sabaq'))}</th><th>${esc(T('sabqi'))}</th><th>${esc(T('manzil'))}</th></tr></thead><tbody>
      ${plan.days.map((d) => `<tr><td>☐</td><td>${esc(fmtDate(d.date))}</td><td>${d.type === 'n' ? cell(d.sabaq, 2) : '—'}</td><td>${cell(d.sabqi, 2)}</td><td>${cell(d.manzil, 2)}</td></tr>`).join('')}
      </tbody></table><p>${esc(SITE)} · ${esc(location.origin + location.pathname)}</p>`;
    window.print();
  }
  function copy(text, btn) {
    const ok = () => flash(btn, T('copied'));
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fb); else fb();
    function fb() { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { /* noop */ } ta.remove(); }
  }

  function resolveRel(p) {
    const rel = /^\+(\d+)([dy])$/.exec((p && p.target) || '');
    if (rel) { const t = new Date(today()); if (rel[2] === 'y') t.setUTCFullYear(t.getUTCFullYear() + +rel[1]); else t.setUTCDate(t.getUTCDate() + +rel[1]); p.target = iso(t.getTime()); }
    return p;
  }

  /* ---------------- Events ---------------- */
  let tmr;
  function update() {
    P = readForm();
    try { history.replaceState(null, '', location.pathname + location.search + '#p=' + encodeURIComponent(JSON.stringify(P))); } catch (e) { /* sandboxed frame */ }
    if (!app.dataset.preset) store.set('hifzly.plan', JSON.stringify(P));
    render();
  }
  form.addEventListener('change', (e) => {
    if (e.target.name === 'unit') {
      F('amount').value = e.target.value === 'line' ? 7 : 3;
      F('manzil').value = e.target.value === 'line' ? 5 : 20;
    }
    if (e.target.name === 'scope' && e.target.value !== 'surah' && F('unit').value === 'ayah' && e.target.value === 'all') F('unit').value = 'line';
    syncVisibility(); clearTimeout(tmr); tmr = setTimeout(update, 60);
  });
  form.addEventListener('input', (e) => { if (e.target.type === 'number') { clearTimeout(tmr); tmr = setTimeout(update, 350); } });
  form.addEventListener('submit', (e) => { e.preventDefault(); update(); $('.hz-results', app).scrollIntoView({ behavior: 'smooth' }); });

  app.addEventListener('click', (e) => {
    const pre = e.target.closest('[data-preset]');
    if (pre) {
      const p = resolveRel(JSON.parse(pre.dataset.preset));
      P = sanitize(Object.assign({}, DEFAULT, p, { start: iso(today()) }));
      writeForm(P); update();
      $('.hz-results', app).scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const act = e.target.closest('[data-act]');
    if (act) {
      if (act.dataset.act === 'more') { shown += 56; renderList(); }
      if (act.dataset.act === 'ics') downloadICS();
      if (act.dataset.act === 'print') printPlan();
      if (act.dataset.act === 'link') copy(location.href, act);
      if (act.dataset.act === 'progress-card') {
        const n = plan.days.filter((d) => done.has(iso(d.date))).length;
        if (n === 0) shareCard(T('card_start_title'), act, T('card_start'));
        else shareCard(T('card_progress', { n: nf.format(n), pct: nf.format(Math.round(n / plan.days.length * 100)) }), act);
      }
      return;
    }
    const card = e.target.closest('[data-card]');
    if (card) shareCard(card.dataset.card, card);
  });
  app.addEventListener('change', (e) => {
    const cb = e.target.closest('[data-done]');
    if (!cb) return;
    const key = cb.dataset.done;
    if (cb.checked) done.add(key); else done.delete(key);
    store.set('hifzly.done.' + sig, JSON.stringify([...done]));
    $$(`[data-done="${key}"]`, app).forEach((x) => (x.checked = cb.checked));
    const li = cb.closest('.hz-day'); if (li) li.classList.toggle('is-done', cb.checked);
    renderProgress(); renderMiles();
  });

  /* ---------------- Boot ---------------- */
  loadQuran().then(() => {
    if (PREVIEW) $$('[data-act="ics"], [data-act="print"], [data-act="link"]', app).forEach((b) => (b.hidden = true));
    fillSelects();
    let init = null;
    const m = location.hash.match(/p=([^&]+)/);
    if (m) { try { init = JSON.parse(decodeURIComponent(m[1])); } catch (e) { init = null; } }
    if (!init && app.dataset.preset) { try { init = resolveRel(JSON.parse(app.dataset.preset)); } catch (e) { init = null; } }
    if (!init) { try { init = JSON.parse(store.get('hifzly.plan') || 'null'); } catch (e) { init = null; } }
    P = sanitize(init);
    writeForm(P);
    render();
    app.classList.remove('is-loading');
  }).catch((err) => { els.summary.textContent = 'Error: ' + err.message; });
})();
