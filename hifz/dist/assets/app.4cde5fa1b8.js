/* Quran Steps — carnet de mémorisation du Coran pour les familles.
   Le plan suit ce que l'enfant a réellement récité (versets acquis), pas le calendrier.
   Les dates ne sont que des projections recalculées chaque jour.
   Tout reste dans le navigateur : pas de compte, pas de serveur. */
(function () {
  'use strict';
  const I = JSON.parse(document.getElementById('i18n').textContent);
  const LANG = document.documentElement.lang || 'fr';
  const LOC = LANG === 'ar' ? 'ar-u-nu-latn' : LANG;
  const SITE = document.documentElement.dataset.site || 'Quran Steps';
  const T = (k, v) => { let s = I[k] != null ? I[k] : k; if (v) for (const a in v) s = s.split('{' + a + '}').join(v[a]); return s; };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nf = new Intl.NumberFormat(LOC);
  const DAY = 864e5;

  const app = $('#hz');
  if (!app) return;
  const PREVIEW = app.dataset.preview === '1';       // aperçu intégré : pas de téléchargement ni d'impression
  const LISTEN = (() => { try { return JSON.parse(app.dataset.listen || '{}'); } catch (e) { return {}; } })();
  const LS_KEY = 'sakinahifz.v1';
  const MAX_AMOUNT = 20;

  /* ---------------- Dates (jours civils en UTC pour éviter les surprises d'heure d'été) ---------------- */
  const todayMs = () => { const n = new Date(); return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()); };
  const iso = (ms) => new Date(ms).toISOString().slice(0, 10);
  const parseISO = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; };
  const wd = (ms) => { const w = new Date(ms).getUTCDay(); return w === 0 ? 6 : w - 1; }; // 0 = lundi
  const fmt = (ms, o) => new Intl.DateTimeFormat(LOC, Object.assign({ timeZone: 'UTC' }, o)).format(ms);
  const fDay = (ms) => fmt(ms, { weekday: 'long', day: 'numeric', month: 'long' });
  const fShort = (ms) => fmt(ms, { weekday: 'short', day: 'numeric', month: 'short' });
  const fDate = (ms) => fmt(ms, { day: 'numeric', month: 'long', year: 'numeric' });

  /* ---------------- Coran (mushaf de Médine, numérotation Hafs) ---------------- */
  let Q = null, SS = [];
  async function loadQuran() {
    const inline = document.getElementById('quran-data');
    Q = inline ? JSON.parse(inline.textContent) : await (await fetch(app.dataset.quran)).json();
    let g = 0; SS = [0];
    Q.surahs.forEach((s, i) => { SS[i + 1] = g; g += s.n; });
    SS.push(g);
  }
  const gOf = (s, a) => SS[s] + a - 1;
  function surahOf(g) { let lo = 1, hi = 114; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (SS[m] <= g) lo = m; else hi = m - 1; } return lo; }
  const sName = (s) => { const x = Q.surahs[s - 1]; return (LANG === 'ar' || LANG === 'ur') ? x.ar : x.tr_en; };
  const ayahsOf = (s) => Array.from({ length: Q.surahs[s - 1].n }, (_, i) => SS[s] + i);

  /* ---------------- Stockage ---------------- */
  function load() { try { const x = JSON.parse(localStorage.getItem(LS_KEY) || 'null'); return x && Array.isArray(x.children) ? x : null; } catch (e) { return null; } }
  let S = load() || { children: [], cur: null };
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) { /* navigation privée */ } }
  const child = () => S.children.find((c) => c.id === S.cur) || null;
  const newId = () => 'c' + Math.random().toString(36).slice(2, 8);

  const DEFAULT_SETUP = { surahs: range(114, 78), known: [], order: 'end', mode: 'amount', amount: 3, target: '', days: 'nnnnnoo', recent: 5, old: 10, time: '18:30', start: '' };
  function range(a, b) { const out = []; const st = a <= b ? 1 : -1; for (let x = a; st > 0 ? x <= b : x >= b; x += st) out.push(x); return out; }

  /* ---------------- Moteur ---------------- */
  // Ordre d'apprentissage : sourates choisies dans l'ordre demandé, versets croissants dans chaque sourate.
  function plan(c) {
    const known = new Set(c.setup.known);
    const order = c.setup.surahs.slice();
    const seq = [];
    order.forEach((s) => { if (!known.has(s)) ayahsOf(s).forEach((g) => seq.push(g)); });
    const knownAyahs = [];
    known.forEach((s) => ayahsOf(s).forEach((g) => knownAyahs.push(g)));
    return { seq, knownAyahs };
  }
  // Prochain passage : versets non acquis consécutifs, sans changer de sourate.
  function nextChunk(seq, learned, amount) {
    const start = seq.findIndex((g) => !learned.has(g));
    if (start < 0) return [];
    const s = surahOf(seq[start]);
    const out = [];
    for (let i = start; i < seq.length && out.length < amount; i++) {
      const g = seq[i];
      if (surahOf(g) !== s) break;
      if (learned.has(g)) break;
      out.push(g);
    }
    return out;
  }
  // Révision ancienne : sourates entières, dans l'ordre du mushaf, curseur tournant.
  function takeOld(poolArr, mp, size) {
    // poolArr : versets révisables triés dans l'ordre du mushaf ; mp : premier verset à réviser
    if (!poolArr.length || size <= 0) return { ayahs: [], next: mp };
    let lo = 0, hi = poolArr.length;
    while (lo < hi) { const m = (lo + hi) >> 1; if (poolArr[m] < mp) lo = m + 1; else hi = m; }
    let i = lo >= poolArr.length ? 0 : lo;
    const out = [];
    for (let k = 0; k < poolArr.length; k++) {
      const g = poolArr[i];
      out.push(g);
      i = (i + 1) % poolArr.length;
      const endOfSurah = g === SS[surahOf(g) + 1] - 1;
      if ((out.length >= size && endOfSurah) || out.length >= size * 3) break;
    }
    return { ayahs: out, next: out[out.length - 1] + 1 };
  }
  function recentWindow(c) {
    const rec = c.log.filter((e) => e.ns === 'ok' && e.n).slice(-c.setup.recent);
    const set = new Set();
    rec.forEach((e) => { for (let g = e.n[0]; g <= e.n[1]; g++) set.add(g); });
    return set;
  }
  // Simulation des prochaines séances en supposant chaque passage réussi du premier coup.
  function simulate(c, from, opts) {
    const o = Object.assign({ maxSessions: 4000, maxDays: 40000, untilDone: false, amount: null, skipToday: false }, opts);
    const { seq, knownAyahs } = plan(c);
    const learned = new Set(c.learned);
    const amount = o.amount || effectiveAmount(c).amount;
    const recentQ = c.log.filter((e) => e.ns === 'ok' && e.n).slice(-c.setup.recent).map((e) => range(e.n[0], e.n[1]));
    let fragile = new Set(c.fragile);
    let mp = c.mp || 0;
    const out = [];
    let d = from;
    for (let day = 0; day < o.maxDays && out.length < o.maxSessions; day++, d += DAY) {
      if (c.setup.days[wd(d)] !== 'n') continue;
      if (o.skipToday && d === from) continue;
      const chunk = nextChunk(seq, learned, amount);
      if (o.untilDone && !chunk.length) break;
      const recent = new Set(recentQ.flat()); fragile.forEach((g) => recent.add(g));
      const poolArr = [...new Set(knownAyahs.concat([...learned]))].filter((g) => !recent.has(g)).sort((a, b) => a - b);
      const old = takeOld(poolArr, mp, c.setup.old);
      out.push({ date: d, n: chunk, recent: [...recent], old: old.ayahs, mpNext: old.next });
      chunk.forEach((g) => learned.add(g));
      if (chunk.length) { recentQ.push(chunk); while (recentQ.length > c.setup.recent) recentQ.shift(); }
      mp = old.next; fragile = new Set();
    }
    return out;
  }
  let EFF = new Map();
  function effectiveAmount(c) {
    if (c.setup.mode !== 'date' || !parseISO(c.setup.target)) return { amount: c.setup.amount };
    if (EFF.has(c.id)) return EFF.get(c.id);
    const r = solveAmount(c);
    EFF.set(c.id, r);
    return r;
  }
  function solveAmount(c) {
    const target = parseISO(c.setup.target);
    const from = nextSessionStart(c);
    for (let a = 1; a <= MAX_AMOUNT; a++) {
      const sim = simulate(c, from, { untilDone: true, amount: a });
      const end = sim.length ? sim[sim.length - 1].date : from;
      if (end <= target) return { amount: a, end };
    }
    const sim = simulate(c, from, { untilDone: true, amount: MAX_AMOUNT });
    return { amount: MAX_AMOUNT, impossible: true, end: sim.length ? sim[sim.length - 1].date : from };
  }
  const todayEntry = (c) => c.log.find((e) => e.d === iso(todayMs()));
  function nextSessionStart(c) {
    const t = todayMs();
    const e = todayEntry(c);
    return (e && (e.ns || e.skip)) ? t + DAY : t;
  }
  function missedSessions(c) {
    const t = todayMs();
    const logged = new Set(c.log.map((e) => e.d));
    const last = c.log.length ? parseISO(c.log[c.log.length - 1].d) + DAY : parseISO(c.setup.start);
    const out = [];
    for (let d = Math.max(last, t - 28 * DAY); d < t; d += DAY) if (c.setup.days[wd(d)] === 'n' && !logged.has(iso(d))) out.push(d);
    return out;
  }
  function targetAyahs(c) { return plan(c).seq.length; }
  function learnedInTarget(c) { const L = new Set(c.learned); return plan(c).seq.filter((g) => L.has(g)).length; }

  /* ---------------- Libellés des passages ---------------- */
  function segments(ayahs) {
    const s = [...new Set(ayahs)].sort((a, b) => a - b);
    const runs = [];
    for (const g of s) { const r = runs[runs.length - 1]; if (r && g === r[1] + 1 && surahOf(g) === surahOf(r[0])) r[1] = g; else runs.push([g, g]); }
    return runs.map(([a, b]) => { const su = surahOf(a); return { s: su, a1: a - SS[su] + 1, a2: b - SS[su] + 1, full: a === SS[su] && b === SS[su + 1] - 1 }; });
  }
  function label(ayahs, max) {
    const segs = segments(ayahs);
    if (!segs.length) return '';
    const one = (x) => x.full ? T('surah_full', { s: sName(x.s) }) : (x.a1 === x.a2 ? T('surah_ayah', { s: sName(x.s), a: x.a1 }) : T('surah_ayahs', { s: sName(x.s), a: x.a1, b: x.a2 }));
    const m = max || 4;
    if (segs.length > m) return segs.slice(0, m).map(one).join(' · ') + ' ' + T('and_more', { n: segs.length - m });
    return segs.map(one).join(' · ');
  }
  function listenLink(ayahs) {
    const x = segments(ayahs)[0];
    if (!x) return null;
    if (LISTEN[x.s]) return LISTEN[x.s];
    return `https://quran.com/${x.s}/${x.a1}-${x.a2}`;
  }

  /* ---------------- Rendu ---------------- */
  const V = { setup: $('.hz-setup', app), main: $('.hz-main', app), tabs: $('.hz-tabs', app) };

  function render() {
    EFF = new Map();
    const c = child();
    renderTabs();
    if (!c || app.dataset.editing === '1') { V.main.hidden = true; V.setup.hidden = false; renderSetup(c && app.dataset.editing === '1' ? c : null); return; }
    V.setup.hidden = true; V.main.hidden = false;
    renderToday(c); renderProgress(c); renderWeek(c); renderMilestones(c); renderTools(c);
  }

  function renderTabs() {
    if (!S.children.length) { V.tabs.innerHTML = ''; return; }
    V.tabs.innerHTML = S.children.map((c, i) => `<button type="button" class="hz-tab${c.id === S.cur ? ' is-on' : ''}" data-child="${c.id}">${esc(c.name || T('child_n', { n: i + 1 }))}</button>`).join('')
      + `<button type="button" class="hz-tab hz-tab-add" data-act="add-child">${esc(T('add_child'))}</button>`;
  }

  function block(kind, title, ayahs, actions, note) {
    if (!ayahs.length) return '';
    const link = listenLink(ayahs);
    return `<div class="hz-block b-${kind}">
      <div class="hz-block-head"><span class="hz-tag">${esc(title)}</span>${link ? `<a class="hz-listen" href="${esc(link)}" target="_blank" rel="noopener">${esc(T('listen'))}</a>` : ''}</div>
      <p class="hz-passage">${esc(label(ayahs, 5))}</p>${note ? `<p class="hz-note">${esc(note)}</p>` : ''}
      <div class="hz-btns">${actions}</div></div>`;
  }
  const btn = (act, txt, cls) => `<button type="button" class="hz-btn ${cls || ''}" data-act="${act}">${esc(txt)}</button>`;
  const doneChip = (st) => `<span class="hz-chip ${st === 'ok' ? 'ok' : 'again'}">${esc(T(st === 'ok' ? 'status_ok' : 'status_again'))}</span>`;

  function renderToday(c) {
    const t = todayMs();
    const box = $('.hz-today', app);
    const e = todayEntry(c);
    const missed = missedSessions(c);
    let html = '';
    if (missed.length) {
      html += `<div class="hz-banner"><p>${esc(T(missed.length === 1 ? 'missed_one' : 'missed_many', { n: missed.length, d: fDay(missed[0]) }))}</p>${btn('ack-missed', T('missed_ack'), 'small')}</div>`;
    }
    const isSession = c.setup.days[wd(t)] === 'n' || (e && e.extra) || app.dataset.extra === '1';
    const remaining = targetAyahs(c) - learnedInTarget(c);
    html += `<div class="hz-today-head"><h2>${esc(T('today_title', { d: fDay(t) }))}</h2>${c.name ? `<span class="hz-who">${esc(c.name)}</span>` : ''}</div>`;
    if (e && e.skip) {
      html += `<p class="hz-rest">${esc(T('skipped_today'))}</p>${btn('undo-skip', T('undo'), 'small')}`;
    } else if (!isSession) {
      const nxt = simulate(c, t + DAY, { maxSessions: 1 })[0];
      html += `<p class="hz-rest">${esc(T('rest_day'))}${nxt ? ' ' + esc(T('next_session', { d: fDay(nxt.date) })) : ''}</p>${btn('extra', T('do_extra'), 'small')}`;
    } else {
      const sess = e && e.view ? e.view : simulate(c, t, { maxSessions: 1 })[0];
      if (!sess) { box.innerHTML = html; return; }
      const nSt = e && e.ns, rSt = e && e.rs, oSt = e && e.os;
      const newActs = nSt ? doneChip(nSt) + btn('undo-new', T('undo'), 'link') : btn('new-ok', T('btn_recited'), 'primary') + btn('new-again', T('btn_again'));
      const recActs = rSt ? doneChip(rSt) + btn('undo-rec', T('undo'), 'link') : btn('rec-ok', T('btn_rev_ok'), 'primary') + btn('rec-again', T('btn_rework'));
      const oldActs = oSt ? doneChip(oSt) + btn('undo-old', T('undo'), 'link') : btn('old-ok', T('btn_rev_ok'), 'primary') + btn('old-again', T('btn_rework'));
      if (!sess.n.length && remaining <= 0) html += `<p class="hz-congrats">${esc(T('all_learned'))}</p>`;
      html += block('new', T('new'), sess.n, newActs, nSt === 'again' ? T('again_note') : '');
      html += block('recent', T('recent'), sess.recent, recActs);
      html += block('old', T('old'), sess.old, oldActs);
      if (!sess.n.length && !sess.recent.length && !sess.old.length) html += `<p class="hz-rest">${esc(T('nothing_today'))}</p>`;
      const complete = (!sess.n.length || nSt) && (!sess.recent.length || rSt) && (!sess.old.length || oSt);
      html += complete ? `<p class="hz-congrats">${esc(T('session_done'))}</p>` : `<div class="hz-footer-acts">${btn('skip', T('btn_skip'), 'link')}<span class="hz-muted">${esc(T('session_hint'))}</span></div>`;
    }
    box.innerHTML = html;
  }

  function renderProgress(c) {
    const total = targetAyahs(c), got = learnedInTarget(c);
    const pct = total ? Math.round(got / total * 100) : 100;
    const stars = c.log.filter((e) => e.ns === 'ok').length;
    const eff = effectiveAmount(c);
    const sim = simulate(c, nextSessionStart(c), { untilDone: true });
    const end = total - got > 0 && sim.length ? sim[sim.length - 1].date : null;
    let streak = 0;
    for (let d = todayMs(), n = 0; n < 400; d -= DAY, n++) {
      if (c.setup.days[wd(d)] !== 'n') continue;
      const e = c.log.find((x) => x.d === iso(d));
      if (e && (e.ns || e.rs || e.os) && !e.skip) streak++; else if (d < todayMs()) break;
    }
    $('.hz-progress', app).innerHTML = `
      <div class="hz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>
      <ul class="hz-stats">
        <li><b>${nf.format(got)}/${nf.format(total)}</b><span>${esc(T('stat_ayahs'))}</span></li>
        <li><b>⭐ ${nf.format(stars)}</b><span>${esc(T('stat_stars'))}</span></li>
        <li><b>${nf.format(streak)}</b><span>${esc(T('stat_streak'))}</span></li>
        <li><b>${end ? esc(fmt(end, { day: 'numeric', month: 'short', year: 'numeric' })) : '✓'}</b><span>${esc(T(end ? 'stat_end' : 'stat_end_done'))}</span></li>
      </ul>
      <p class="hz-muted">${esc(T('pace', { n: eff.amount }))}${c.setup.mode === 'date' && c.setup.target ? ' ' + esc(T(eff.impossible ? 'target_impossible' : 'target_ok', { d: fDate(parseISO(c.setup.target)), e: fDate(eff.end) })) : ''}</p>`;
  }

  function weekDays(c) {
    const t = todayMs(), monday = t - wd(t) * DAY;
    const future = simulate(c, nextSessionStart(c), { maxDays: 7 });
    const byDate = new Map(future.map((s) => [iso(s.date), s]));
    const out = [];
    for (let i = 0; i < 7; i++) {
      const d = monday + i * DAY, key = iso(d);
      const e = c.log.find((x) => x.d === key);
      const isSess = c.setup.days[wd(d)] === 'n';
      if (d < t || (e && (e.ns || e.skip))) {
        if (e && e.skip) out.push({ d, kind: 'skip' });
        else if (e) out.push({ d, kind: 'done', e, s: e.view });
        else out.push({ d, kind: isSess ? 'missed' : 'rest' });
      } else {
        const s = byDate.get(key) || (d === t && isSess ? simulate(c, t, { maxSessions: 1 })[0] : null);
        out.push({ d, kind: s ? 'plan' : 'rest', s });
      }
    }
    return out;
  }
  function renderWeek(c) {
    const rows = weekDays(c).map((w) => {
      let body;
      if (w.kind === 'rest') body = `<td colspan="3" class="hz-muted">${esc(T('rest'))}</td>`;
      else if (w.kind === 'skip') body = `<td colspan="3" class="hz-muted">${esc(T('skipped'))}</td>`;
      else if (w.kind === 'missed') body = `<td colspan="3" class="hz-muted">${esc(T('missed'))}</td>`;
      else { const s = w.s || { n: [], recent: [], old: [] }; body = `<td>${esc(label(s.n, 2) || '—')}</td><td>${esc(label(s.recent, 2) || '—')}</td><td>${esc(label(s.old, 2) || '—')}</td>`; }
      const mark = w.kind === 'done' ? (w.e.ns === 'again' ? '↻' : '✓') : '';
      return `<tr class="w-${w.kind}${w.d === todayMs() ? ' is-today' : ''}"><th scope="row">${esc(fShort(w.d))}</th>${body}<td class="hz-tick">${mark}</td><td class="hz-tick"></td></tr>`;
    }).join('');
    const t = todayMs(), monday = t - wd(t) * DAY;
    $('.hz-week', app).innerHTML = `
      <p class="hz-muted">${esc(T('week_of', { a: fmt(monday, { day: 'numeric', month: 'long' }), b: fmt(monday + 6 * DAY, { day: 'numeric', month: 'long' }) }))}</p>
      <div class="hz-tablewrap"><table class="hz-sheet"><thead><tr><th>${esc(T('col_day'))}</th><th>${esc(T('new'))}</th><th>${esc(T('recent'))}</th><th>${esc(T('old'))}</th><th>${esc(T('col_parent'))}</th><th>${esc(T('col_teacher'))}</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="hz-btns">${PREVIEW ? '' : btn('print', T('btn_print'))}${btn('copy-week', T('btn_copy_week'), 'primary')}</div>`;
    // version imprimable (une page A4)
    $('#hz-print').innerHTML = `<h1>${esc(T('sheet_title'))}${c.name ? ' — ' + esc(c.name) : ''}</h1>
      <p>${esc(T('week_of', { a: fmt(monday, { day: 'numeric', month: 'long' }), b: fmt(monday + 6 * DAY, { day: 'numeric', month: 'long', year: 'numeric' }) }))} · ${esc(T('hafs_note'))}</p>
      <table class="hz-sheet"><thead><tr><th>${esc(T('col_day'))}</th><th>${esc(T('new'))}</th><th>${esc(T('recent'))}</th><th>${esc(T('old'))}</th><th>${esc(T('col_parent'))}</th><th>${esc(T('col_teacher'))}</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="hz-sign">${esc(T('sheet_teacher_note'))} ______________________________________________</p><p class="hz-small">${esc(SITE)}</p>`;
  }
  function weekText(c) {
    const lines = weekDays(c).map((w) => {
      const d = fShort(w.d);
      if (w.kind === 'rest') return `${d} : ${T('rest')}`;
      if (w.kind === 'skip') return `${d} : ${T('skipped')}`;
      if (w.kind === 'missed') return `${d} : ${T('missed')}`;
      const s = w.s || { n: [], recent: [], old: [] };
      const parts = [];
      if (s.n.length) parts.push(`${T('new')} ${label(s.n, 2)}${w.kind === 'done' ? (w.e.ns === 'ok' ? ' ✓' : w.e.ns === 'again' ? ' ↻' : '') : ''}`);
      if (s.recent.length) parts.push(`${T('recent')} ${label(s.recent, 2)}`);
      if (s.old.length) parts.push(`${T('old')} ${label(s.old, 2)}`);
      return `${d} : ${parts.join(' | ')}`;
    });
    return `${T('sheet_title')}${c.name ? ' — ' + c.name : ''}\n${lines.join('\n')}\n(${T('hafs_note')})`;
  }

  function renderMilestones(c) {
    const known = new Set(c.setup.known);
    const L = new Set(c.learned);
    const sim = simulate(c, nextSessionStart(c), { untilDone: true });
    const proj = new Map();
    const left = new Map(c.setup.surahs.map((su) => [su, ayahsOf(su).filter((g) => !L.has(g)).length]));
    sim.forEach((s) => s.n.forEach((g) => { const su = surahOf(g); const r = left.get(su) - 1; left.set(su, r); if (r === 0 && !proj.has(su)) proj.set(su, s.date); }));
    const items = c.setup.surahs.map((su) => {
      const isKnown = known.has(su), done = isKnown || ayahsOf(su).every((g) => L.has(g));
      const part = !done && ayahsOf(su).some((g) => L.has(g));
      const when = done ? T(isKnown ? 'm_known' : 'm_done') : (proj.has(su) ? T('m_planned', { d: fmt(proj.get(su), { day: 'numeric', month: 'short' }) }) : '');
      return `<li class="${done ? 'is-done' : part ? 'is-part' : ''}"><span class="hz-dot"></span><b>${esc(sName(su))}</b><small>${esc(when)}</small>${done && !isKnown ? `<button type="button" class="hz-link" data-card="${su}">${esc(T('share'))}</button>` : ''}</li>`;
    }).join('');
    $('.hz-miles', app).innerHTML = `<ol class="hz-miles-list">${items}</ol>`;
  }

  function renderTools(c) {
    $('.hz-tools', app).innerHTML = `<div class="hz-btns">
      ${btn('edit', T('btn_edit'))}${PREVIEW ? '' : btn('reminder', T('btn_reminder'))}${PREVIEW ? '' : btn('backup', T('btn_backup'))}
      ${app.dataset.confirm === 'reset' ? `<span class="hz-confirm">${esc(T('confirm_reset'))} ${btn('reset-yes', T('yes_reset'), 'danger')}${btn('reset-no', T('cancel'), 'link')}</span>` : btn('reset', T('btn_reset'), 'link')}
    </div><p class="hz-muted">${esc(T('privacy_short'))}</p>`;
  }

  /* ---------------- Configuration (3 étapes) ---------------- */
  const PICKS = { juzamma: range(114, 78), last10: range(114, 105), qul: [1, 114, 113, 112] };
  function renderSetup(c) {
    const st = Object.assign({}, DEFAULT_SETUP, c ? c.setup : {}, { start: iso(todayMs()) });
    const pick = c ? 'custom' : 'juzamma';
    const surahChecks = (list, name, checked) => list.map((s) => `<label class="hz-pill"><input type="checkbox" name="${name}" value="${s}"${checked.includes(s) ? ' checked' : ''}><span>${esc(sName(s))}</span></label>`).join('');
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => `<label class="hz-pill hz-day"><input type="checkbox" name="day" value="${i}"${st.days[i] === 'n' ? ' checked' : ''}><span>${esc(fmt(Date.UTC(2024, 0, 1 + i), { weekday: 'short' }))}</span></label>`).join('');
    V.setup.innerHTML = `<form class="hz-form" autocomplete="off">
      <h2>${esc(T(c ? 'setup_edit_title' : 'setup_title'))}</h2>
      ${c ? `<p class="hz-muted">${esc(T('setup_edit_note'))}</p>` : ''}
      <fieldset><legend><span class="hz-step">1</span>${esc(T('step1'))}</legend>
        <div class="hz-choice">
          <label><input type="radio" name="pick" value="juzamma"${pick === 'juzamma' ? ' checked' : ''}> ${esc(T('pick_juzamma'))}</label>
          <label><input type="radio" name="pick" value="last10"> ${esc(T('pick_last10'))}</label>
          <label><input type="radio" name="pick" value="qul"> ${esc(T('pick_qul'))}</label>
          <label><input type="radio" name="pick" value="custom"${pick === 'custom' ? ' checked' : ''}> ${esc(T('pick_custom'))}</label>
        </div>
        <div class="hz-custom" ${pick === 'custom' ? '' : 'hidden'}>
          <div class="hz-pills">${surahChecks([1].concat(range(78, 114)), 'surah', st.surahs)}</div>
          <details><summary>${esc(T('more_surahs'))}</summary><div class="hz-pills">${surahChecks(range(2, 77), 'surah', st.surahs)}</div></details>
          <label class="hz-inline"><span>${esc(T('order'))}</span><select name="order"><option value="end"${st.order === 'end' ? ' selected' : ''}>${esc(T('order_end'))}</option><option value="start"${st.order === 'start' ? ' selected' : ''}>${esc(T('order_start'))}</option></select></label>
        </div>
      </fieldset>
      <fieldset><legend><span class="hz-step">2</span>${esc(T('step2'))}</legend>
        <p class="hz-muted">${esc(T('step2_hint'))}</p>
        <div class="hz-pills hz-known"></div>
      </fieldset>
      <fieldset><legend><span class="hz-step">3</span>${esc(T('step3'))}</legend>
        <p class="hz-label">${esc(T('days_label'))}</p><div class="hz-pills">${days}</div>
        <div class="hz-choice">
          <label><input type="radio" name="mode" value="amount"${st.mode !== 'date' ? ' checked' : ''}> ${esc(T('mode_amount'))}</label>
          <label class="hz-inline" data-for="amount"><span>${esc(T('amount_label'))}</span><input type="number" name="amount" min="1" max="${MAX_AMOUNT}" value="${st.amount}" inputmode="numeric"></label>
          <label><input type="radio" name="mode" value="date"${st.mode === 'date' ? ' checked' : ''}> ${esc(T('mode_date'))}</label>
          <label class="hz-inline" data-for="date"><span>${esc(T('target_label'))}</span><input type="date" name="target" value="${esc(st.target)}"></label>
        </div>
        <details><summary>${esc(T('advanced'))}</summary>
          <label class="hz-inline"><span>${esc(T('recent_label'))}</span><input type="number" name="recent" min="1" max="14" value="${st.recent}" inputmode="numeric"></label>
          <label class="hz-inline"><span>${esc(T('old_label'))}</span><input type="number" name="old" min="0" max="200" value="${st.old}" inputmode="numeric"></label>
        </details>
        <label class="hz-inline"><span>${esc(T('time_label'))}</span><input type="time" name="time" value="${esc(st.time)}"></label>
        <label class="hz-inline"><span>${esc(T('name_label'))}</span><input type="text" name="name" maxlength="30" value="${esc(c ? c.name : '')}" placeholder="${esc(T('name_ph'))}"></label>
        <p class="hz-muted">${esc(T('name_note'))}</p>
      </fieldset>
      <p class="hz-error" hidden></p>
      <div class="hz-btns">${btn('save-setup', T(c ? 'btn_save' : 'btn_start'), 'primary big')}${c || S.children.length ? btn('cancel-setup', T('cancel'), 'link') : ''}</div>
    </form>`;
    syncSetup(c ? c.setup.known : []);
  }
  function selectedSurahs(form) {
    const pick = form.querySelector('input[name="pick"]:checked').value;
    if (pick !== 'custom') return PICKS[pick].slice();
    const chosen = $$('input[name="surah"]:checked', form).map((x) => +x.value);
    const order = form.elements.namedItem('order').value;
    return chosen.sort((a, b) => order === 'end' ? b - a : a - b);
  }
  function syncSetup(prevKnown) {
    const form = $('form.hz-form', V.setup);
    if (!form) return;
    const pick = form.querySelector('input[name="pick"]:checked').value;
    $('.hz-custom', form).hidden = pick !== 'custom';
    const mode = form.querySelector('input[name="mode"]:checked').value;
    $('[data-for="amount"]', form).hidden = mode !== 'amount';
    $('[data-for="date"]', form).hidden = mode !== 'date';
    const kept = prevKnown || $$('input[name="known"]:checked', form).map((x) => +x.value);
    const list = selectedSurahs(form);
    $('.hz-known', form).innerHTML = list.length
      ? `<label class="hz-pill hz-all"><input type="checkbox" name="known-all"${list.every((s) => kept.includes(s)) ? ' checked' : ''}><span>${esc(T('known_all'))}</span></label>`
        + list.map((s) => `<label class="hz-pill"><input type="checkbox" name="known" value="${s}"${kept.includes(s) ? ' checked' : ''}><span>${esc(sName(s))}</span></label>`).join('')
      : `<span class="hz-muted">${esc(T('choose_first'))}</span>`;
  }
  function readSetup(form) {
    const surahs = selectedSurahs(form);
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => (form.querySelector(`input[name="day"][value="${i}"]`).checked ? 'n' : 'o')).join('');
    const num = (n, a, b, d) => { const v = parseInt(form.elements.namedItem(n).value, 10); return Number.isFinite(v) ? Math.min(b, Math.max(a, v)) : d; };
    const mode = form.querySelector('input[name="mode"]:checked').value;
    const target = form.elements.namedItem('target').value;
    const err = !surahs.length ? T('err_surahs') : !days.includes('n') ? T('err_days') : (mode === 'date' && !(parseISO(target) >= todayMs())) ? T('err_target') : '';
    return {
      err,
      name: form.elements.namedItem('name').value.trim().slice(0, 30),
      setup: { surahs, known: $$('input[name="known"]:checked', form).map((x) => +x.value).filter((s) => surahs.includes(s)), order: form.elements.namedItem('order').value,
        mode, amount: num('amount', 1, MAX_AMOUNT, 3), target, days, recent: num('recent', 1, 14, 5), old: num('old', 0, 200, 10),
        time: form.elements.namedItem('time').value || '18:30', start: iso(todayMs()) },
    };
  }

  /* ---------------- Actions ---------------- */
  function entry(c) {
    const key = iso(todayMs());
    let e = c.log.find((x) => x.d === key);
    if (!e) {
      const s = simulate(c, todayMs(), { maxSessions: 1, maxDays: 1 })[0] || simulate(c, todayMs(), { maxSessions: 1, maxDays: 1, amount: effectiveAmount(c).amount })[0];
      e = { d: key, view: s ? { n: s.n, recent: s.recent, old: s.old, mpNext: s.mpNext } : { n: [], recent: [], old: [], mpNext: c.mp }, extra: app.dataset.extra === '1' };
      // jour de repos ou séance supplémentaire : on calcule la séance comme si c'était un jour d'étude
      if (!s) { const forced = Object.assign({}, c, { setup: Object.assign({}, c.setup, { days: 'nnnnnnn' }) }); const f = simulate(forced, todayMs(), { maxSessions: 1 })[0]; if (f) e.view = { n: f.n, recent: f.recent, old: f.old, mpNext: f.mpNext }; }
      c.log.push(e); c.log.sort((a, b) => (a.d < b.d ? -1 : 1));
    }
    return e;
  }
  function act(name, el) {
    const c = child();
    if (name === 'add-child') { app.dataset.editing = ''; S.cur = null; render(); return; }
    if (name === 'save-setup') return saveSetup();
    if (name === 'cancel-setup') { app.dataset.editing = ''; if (!S.cur && S.children.length) S.cur = S.children[0].id; render(); return; }
    if (!c) return;
    const e = ['new-ok', 'new-again', 'rec-ok', 'rec-again', 'old-ok', 'old-again', 'skip'].includes(name) ? entry(c) : todayEntry(c);
    switch (name) {
      case 'new-ok': e.ns = 'ok'; e.n = e.view.n.length ? [e.view.n[0], e.view.n[e.view.n.length - 1]] : null; c.learned = [...new Set(c.learned.concat(e.view.n))]; break;
      case 'new-again': e.ns = 'again'; e.n = null; break;
      case 'undo-new': if (e) { const drop = new Set(e.ns === 'ok' ? e.view.n : []); c.learned = c.learned.filter((g) => !drop.has(g)); e.ns = null; e.n = null; } break;
      case 'rec-ok': e.rs = 'ok'; c.fragile = c.fragile.filter((g) => !e.view.recent.includes(g)); break;
      case 'rec-again': e.rs = 'again'; c.fragile = [...new Set(c.fragile.concat(e.view.recent))]; break;
      case 'undo-rec': if (e) e.rs = null; break;
      case 'old-ok': case 'old-again':
        e.os = name === 'old-ok' ? 'ok' : 'again';
        if (e.mpPrev == null) { e.mpPrev = c.mp; c.mp = e.view.mpNext; }
        if (e.os === 'again') c.fragile = [...new Set(c.fragile.concat(e.view.old))];
        break;
      case 'undo-old': if (e) { e.os = null; if (e.mpPrev != null) { c.mp = e.mpPrev; e.mpPrev = null; } } break;
      case 'skip': e.skip = true; break;
      case 'undo-skip': if (e) e.skip = false; break;
      case 'extra': app.dataset.extra = '1'; break;
      case 'ack-missed': missedSessions(c).forEach((d) => c.log.push({ d: iso(d), skip: true, auto: true })); c.log.sort((a, b) => (a.d < b.d ? -1 : 1)); break;
      case 'edit': app.dataset.editing = '1'; break;
      case 'reset': app.dataset.confirm = 'reset'; break;
      case 'reset-no': app.dataset.confirm = ''; break;
      case 'reset-yes': app.dataset.confirm = ''; S.children = S.children.filter((x) => x.id !== c.id); S.cur = S.children[0] ? S.children[0].id : null; break;
      case 'copy-week': copy(weekText(c), el); return;
      case 'print': window.print(); return;
      case 'reminder': downloadReminder(c); return;
      case 'backup': copy(backupLink(c), el); return;
      default: return;
    }
    if (e && e.view && e.ns === 'ok' && c.log.filter((x) => x.ns === 'ok').length > 0) { /* étoile gagnée */ }
    save(); render();
  }
  function saveSetup() {
    const form = $('form.hz-form', V.setup);
    const r = readSetup(form);
    const errEl = $('.hz-error', form);
    if (r.err) { errEl.textContent = r.err; errEl.hidden = false; errEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    let c = app.dataset.editing === '1' ? child() : null;
    if (c) { c.setup = Object.assign({}, c.setup, r.setup, { start: c.setup.start }); c.name = r.name; }
    else { c = { id: newId(), name: r.name, setup: r.setup, learned: [], fragile: [], log: [], mp: 0 }; S.children.push(c); }
    S.cur = c.id; app.dataset.editing = ''; app.dataset.extra = '';
    save(); render(); window.scrollTo({ top: app.offsetTop - 10, behavior: 'smooth' });
  }

  /* ---------------- Exports ---------------- */
  function copy(text, b) {
    const ok = () => { const t = b.textContent; b.textContent = T('copied'); setTimeout(() => (b.textContent = t), 1600); };
    const fb = () => { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { /* rien */ } document.body.removeChild(ta); };
    try { if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fb); else fb(); } catch (e) { fb(); }
  }
  function downloadReminder(c) {
    const by = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].filter((_, i) => c.setup.days[i] === 'n').join(',');
    const [h, m] = (c.setup.time || '18:30').split(':');
    const start = new Date(todayMs());
    const d8 = start.toISOString().slice(0, 10).replace(/-/g, '');
    const esc2 = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//QuranSteps//FR', 'BEGIN:VEVENT', `UID:${c.id}-${d8}@quransteps`,
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''), `DTSTART:${d8}T${h}${m}00`, `DURATION:PT15M`,
      `RRULE:FREQ=WEEKLY;BYDAY=${by}`, 'SUMMARY:' + esc2(T('reminder_title') + (c.name ? ' — ' + c.name : '')),
      'DESCRIPTION:' + esc2(T('reminder_desc') + ' ' + location.origin + location.pathname),
      'BEGIN:VALARM', 'TRIGGER:PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:' + esc2(T('reminder_title')), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'rappel-hifz.ics'; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); document.body.removeChild(a); }, 1000);
  }
  // Lien de sauvegarde : réglages et progrès, sans le prénom de l'enfant.
  function backupLink(c) {
    const runs = segments(c.learned).map((x) => [SS[x.s] + x.a1 - 1, SS[x.s] + x.a2 - 1]);
    const data = { v: 1, s: c.setup, l: runs, f: c.fragile, m: c.mp };
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(data)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return location.origin + location.pathname + '#import=' + b64;
  }
  function checkImport() {
    const m = /#import=([A-Za-z0-9_-]+)/.exec(location.hash);
    if (!m) return;
    try {
      const json = decodeURIComponent(escape(atob(m[1].replace(/-/g, '+').replace(/_/g, '/'))));
      const d = JSON.parse(json);
      const learned = [];
      (d.l || []).forEach(([a, b]) => { for (let g = a; g <= b && g < SS[115]; g++) learned.push(g); });
      const setup = Object.assign({}, DEFAULT_SETUP, d.s);
      const box = $('.hz-import', app);
      box.hidden = false;
      box.innerHTML = `<p>${esc(T('import_q', { n: learned.length }))}</p><div class="hz-btns">${btn('import-yes', T('import_yes'), 'primary')}${btn('import-no', T('cancel'), 'link')}</div>`;
      box.addEventListener('click', (ev) => {
        const b = ev.target.closest('[data-act]'); if (!b) return;
        if (b.dataset.act === 'import-yes') { const c = { id: newId(), name: '', setup, learned, fragile: d.f || [], log: [], mp: d.m || 0 }; S.children.push(c); S.cur = c.id; save(); }
        box.hidden = true;
        try { history.replaceState(null, '', location.pathname); } catch (e) { /* cadre isolé */ }
        render();
      });
    } catch (e) { /* lien invalide */ }
  }

  /* ---------------- Carte de jalon ---------------- */
  async function shareCard(su, b) {
    const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1350;
    const x = cv.getContext('2d');
    const g = x.createLinearGradient(0, 0, 1080, 1350); g.addColorStop(0, '#0b4f40'); g.addColorStop(1, '#063329');
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1350);
    x.strokeStyle = 'rgba(214,178,94,.18)'; x.lineWidth = 2;
    for (let yy = 90; yy < 1350; yy += 180) for (let xx = (yy / 180) % 2 ? 0 : 90; xx < 1170; xx += 180) for (let r = 0; r < 2; r++) { x.save(); x.translate(xx, yy); x.rotate(r * Math.PI / 4); x.strokeRect(-34, -34, 68, 68); x.restore(); }
    x.textAlign = 'center';
    x.fillStyle = '#d6b25e'; x.font = '700 96px "Noto Naskh Arabic", "Geeza Pro", serif'; x.fillText('الحمد لله', 540, 330);
    x.fillStyle = '#fff'; x.font = '700 60px system-ui, -apple-system, "Segoe UI", sans-serif'; x.fillText(T('card_head'), 540, 520);
    x.fillStyle = '#d6b25e'; x.font = '800 100px system-ui, -apple-system, "Segoe UI", sans-serif'; x.fillText(Q.surahs[su - 1].tr_en, 540, 680);
    x.font = '700 80px "Noto Naskh Arabic", "Geeza Pro", serif'; x.fillText(Q.surahs[su - 1].ar, 540, 820);
    x.fillStyle = '#fff'; x.font = '700 44px system-ui, sans-serif'; x.fillText(SITE, 540, 1230);
    const blob = await new Promise((r) => cv.toBlob(r, 'image/png'));
    const file = new File([blob], 'sourate-terminee.png', { type: 'image/png' });
    if (!PREVIEW && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], text: T('card_text', { s: sName(su) }) }); return; } catch (e) { /* annulé */ } }
    const ov = document.createElement('div'); ov.className = 'hz-overlay';
    ov.innerHTML = `<figure><img alt="" src="${URL.createObjectURL(blob)}"><figcaption>${esc(T('card_save'))}</figcaption>${btn('close', T('close'), 'primary')}</figure>`;
    ov.addEventListener('click', (ev) => { if (ev.target === ov || ev.target.closest('[data-act="close"]')) document.body.removeChild(ov); });
    document.body.appendChild(ov);
  }

  /* ---------------- Événements ---------------- */
  app.addEventListener('click', (ev) => {
    const tab = ev.target.closest('[data-child]');
    if (tab) { S.cur = tab.dataset.child; app.dataset.editing = ''; app.dataset.extra = ''; save(); render(); return; }
    const card = ev.target.closest('[data-card]');
    if (card) { shareCard(+card.dataset.card, card); return; }
    const b = ev.target.closest('[data-act]');
    if (b && app.contains(b)) act(b.dataset.act, b);
  });
  app.addEventListener('change', (ev) => {
    const form = ev.target.closest('form.hz-form');
    if (!form) return;
    if (ev.target.name === 'known-all') { $$('input[name="known"]', form).forEach((x) => (x.checked = ev.target.checked)); return; }
    if (['pick', 'surah', 'order', 'mode'].includes(ev.target.name)) syncSetup();
  });

  loadQuran().then(() => {
    if (!S.cur && S.children.length) S.cur = S.children[0].id;
    checkImport();
    render();
    app.classList.remove('is-loading');
  }).catch((err) => { app.textContent = 'Erreur : ' + err.message; });
})();
