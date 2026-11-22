/* Fairclock — fair meeting times across time zones, weekends and public holidays.
   100 % client-side: no account, no server, the team lives in the URL. */
(function () {
  'use strict';

  /* ---------------- i18n & helpers ---------------- */
  const I = JSON.parse(document.getElementById('i18n').textContent);
  const LANG = document.documentElement.lang;
  const DATA = document.documentElement.dataset.data;
  const LOC = LANG === 'ar' ? 'ar-u-nu-latn' : LANG;
  // 12/24 h: follow the visitor's locale only if it matches the page language (en-GB → 24 h, en-US → 12 h)
  const HC = (() => {
    try {
      const nav = navigator.language || '';
      const base = nav.toLowerCase().startsWith(LANG) ? nav : LANG;
      return new Intl.DateTimeFormat(base, { hour: 'numeric' }).resolvedOptions().hourCycle || 'h23';
    } catch (e) { return 'h23'; }
  })();
  const H12 = HC === 'h12' || HC === 'h11';
  const T = (k, v) => { let s = I[k] != null ? I[k] : k; if (v) for (const a in v) s = s.split('{' + a + '}').join(v[a]); return s; };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[\u064B-\u065F]/g, '');
  const flag = (cc) => cc && cc.length === 2 ? String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1F1A5 + c.charCodeAt(0))) : '🌐';
  let regionNames = null;
  try { regionNames = new Intl.DisplayNames([LANG], { type: 'region' }); } catch (e) { /* old browser */ }
  const countryName = (cc) => { try { return (regionNames && regionNames.of(cc)) || cc; } catch (e) { return cc; } };
  const cityName = (n) => (I.cities && I.cities[n]) || n;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };

  /* ---------------- Data loading ---------------- */
  let CITIES = null, TZMAP = null;
  const HOL = {};
  async function getJSON(path) { const r = await fetch(DATA + path); if (!r.ok) throw new Error(r.status); return r.json(); }
  async function loadCities() {
    if (!CITIES) CITIES = (await getJSON('cities.json')).map((c) => ({ n: c[0], cc: c[1], tz: c[2], p: c[3], keys: fold(c[0] + '|' + c[4] + '|' + cityName(c[0])).split('|') }));
    return CITIES;
  }
  async function loadTzMap() { if (!TZMAP) { try { TZMAP = await getJSON('tzmap.json'); } catch (e) { TZMAP = {}; } } return TZMAP; }
  async function loadCountry(cc) {
    if (!cc || HOL[cc] !== undefined) return HOL[cc];
    HOL[cc] = null;
    try { const j = await getJSON('h/' + cc + '.json'); HOL[cc] = { w: j.w, h: new Map(j.h) }; } catch (e) { HOL[cc] = null; }
    return HOL[cc];
  }

  /* ---------------- Time maths ---------------- */
  const WD = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const DTF = new Map();
  const PARTS = new Map();
  function lp(tz, ms) {
    const key = tz + ms;
    const hit = PARTS.get(key);
    if (hit) return hit;
    let f = DTF.get(tz);
    if (!f) { f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short' }); DTF.set(tz, f); }
    const o = {};
    for (const p of f.formatToParts(ms)) o[p.type] = p.value;
    const r = { y: +o.year, mo: +o.month, d: +o.day, date: o.year + '-' + o.month + '-' + o.day, h: (+o.hour) % 24, m: +o.minute, wd: WD.indexOf(o.weekday) + 1 };
    if (PARTS.size > 50000) PARTS.clear();
    PARTS.set(key, r);
    return r;
  }
  function offsetMin(tz, ms) {
    const t = Math.floor(ms / 60000) * 60000;
    const L = lp(tz, t);
    return Math.round((Date.UTC(L.y, L.mo - 1, L.d, L.h, L.m) - t) / 60000);
  }
  function fmtOffset(min) {
    const s = min < 0 ? '−' : '+'; const a = Math.abs(min);
    return 'UTC' + s + Math.floor(a / 60) + (a % 60 ? ':' + String(a % 60).padStart(2, '0') : '');
  }
  /* UTC instant of local midnight for a date (YYYY-MM-DD) in a time zone */
  function localMidnight(tz, date) {
    const [y, m, d] = date.split('-').map(Number);
    let guess = Date.UTC(y, m - 1, d);
    for (let i = 0; i < 3; i++) guess = Date.UTC(y, m - 1, d) - offsetMin(tz, guess) * 60000;
    return guess;
  }
  const fmtCache = new Map();
  function fmt(ms, tz, opts) {
    const k = tz + JSON.stringify(opts);
    let f = fmtCache.get(k);
    if (!f) { f = new Intl.DateTimeFormat(LOC, Object.assign({ timeZone: tz }, opts.hour ? { hourCycle: H12 ? 'h12' : 'h23' } : {}, opts)); fmtCache.set(k, f); }
    return f.format(ms);
  }
  const fTime = (ms, tz) => fmt(ms, tz, { hour: H12 ? 'numeric' : '2-digit', minute: '2-digit' });
  const fDay = (ms, tz) => fmt(ms, tz, { weekday: 'short', day: 'numeric', month: 'short' });
  const fDayLong = (ms, tz) => fmt(ms, tz, { weekday: 'long', day: 'numeric', month: 'long' });
  const shortHour = (h, m) => {
    const mm = m ? ':' + String(m).padStart(2, '0') : '';
    if (!H12 || LANG !== 'en') return h + mm; // compact 24 h grid outside English
    const hh = h % 12 || 12;
    return hh + mm + (h < 12 ? 'a' : 'p');
  };

  /* ---------------- Availability model ---------------- */
  function weekendOf(p) { const c = HOL[p.cc]; return p.w || (c && c.w) || [6, 7]; }
  function status(p, ms, ignoreHolidays) {
    const L = lp(p.tz, ms);
    const t = L.h + L.m / 60;
    const c = HOL[p.cc];
    const hol = !ignoreHolidays && c && c.h.get(L.date);
    const off = hol ? 'holiday' : (weekendOf(p).includes(L.wd) ? 'weekend' : null);
    let k, dist = 0;
    if (t >= p.s && t < p.e) k = 'work';
    else if (t >= 23 || t < 7) k = 'sleep';
    else if (t < p.s) { k = 'early'; dist = p.s - t; } else { k = 'late'; dist = t - p.e; }
    return { k, off, hol, dist, L };
  }
  function pain(st) {
    if (st.k === 'sleep') return 10;
    let x = st.k === 'work' ? 0 : (st.dist <= 2 ? 2 : 4);
    if (st.off) x = Math.max(x, 6);
    return x;
  }
  const QUAL = (mx) => mx === 0 ? 'perfect' : mx <= 2 ? 'good' : mx <= 4 ? 'stretch' : 'bad';
  function slotPain(people, ms, dur, ignoreHolidays) {
    const step = 30 * 60000, n = Math.max(1, Math.round(dur / 30));
    const per = people.map((p) => { let x = 0; for (let k = 0; k < n; k++) x = Math.max(x, pain(status(p, ms + k * step, ignoreHolidays))); return x; });
    return { per, mx: Math.max(...per), sum: per.reduce((a, b) => a + b, 0) };
  }

  function bestSlots(people, fromMs, days, dur) {
    const step = 30 * 60000;
    const start = Math.ceil(fromMs / step) * step;
    const byDay = new Map();
    for (let ms = start; ms < start + days * 864e5; ms += step) {
      const s = slotPain(people, ms, dur);
      if (s.mx > 4) continue;
      const day = lp(people[0].tz, ms).date;
      const cur = byDay.get(day);
      if (!cur || s.mx < cur.mx || (s.mx === cur.mx && s.sum < cur.sum)) byDay.set(day, Object.assign({ ms }, s));
    }
    return [...byDay.values()].slice(0, 7);
  }

  /* Recurring meeting: best single weekly slot, or the fairest pair of alternating slots */
  function rotation(people, dur) {
    const step = 30 * 60000;
    const base = localMidnight(people[0].tz, lp(people[0].tz, Date.now() + 7 * 864e5).date);
    const cands = [];
    for (let ms = base; ms < base + 7 * 864e5; ms += step) {
      const s = slotPain(people, ms, dur, true);
      if (s.mx < 10) cands.push(Object.assign({ ms }, s));
    }
    if (!cands.length) return null;
    cands.sort((a, b) => a.mx - b.mx || a.sum - b.sum);
    const single = cands[0];
    if (single.mx === 0 || people.length < 2) return { single };
    const top = cands.slice().sort((a, b) => a.sum - b.sum || a.mx - b.mx).slice(0, 160);
    let best = null;
    for (let i = 0; i < top.length; i++) for (let j = i + 1; j < top.length; j++) {
      const a = top[i], b = top[j];
      if (Math.abs(a.ms - b.ms) < 864e5 / 2) continue; // different days
      const comb = a.per.map((x, k) => x + b.per[k]);
      const mx = Math.max(...comb), sum = comb.reduce((u, v) => u + v, 0);
      if (!best || mx < best.mx || (mx === best.mx && sum < best.sum)) best = { a, b, mx, sum };
    }
    if (!best || best.mx >= single.mx * 2) return { single };
    return { single, pair: best };
  }

  function overlapHours(people) {
    // Working-hour overlap on the next ordinary weekday for everyone
    const step = 30 * 60000;
    for (let d = 1; d < 10; d++) {
      const day = lp(people[0].tz, Date.now() + d * 864e5).date;
      const start = localMidnight(people[0].tz, day);
      let anyOff = false, n = 0;
      for (let ms = start; ms < start + 864e5; ms += step) {
        const sts = people.map((p) => status(p, ms));
        if (sts.some((s) => s.off) && ms === start + 12 * 3600e3) anyOff = true;
        if (sts.every((s) => s.k === 'work' && !s.off)) n++;
      }
      if (!anyOff) return n / 2;
    }
    return 0;
  }

  /* ---------------- State ---------------- */
  const app = $('#app');
  if (!app) return;
  const state = { people: [], date: null, sel: null, dur: 60 };
  let idSeq = 0;
  const mk = (o) => Object.assign({ id: ++idSeq, s: 9, e: 17, w: null }, o);

  function encode() {
    return encodeURIComponent(JSON.stringify(state.people.map((p) => [p.label || '', p.n, p.cc, p.tz, p.s, p.e, p.w ? p.w.join('') : ''])));
  }
  function decode(str) {
    try {
      const arr = JSON.parse(decodeURIComponent(str));
      return arr.slice(0, 20).map((a) => mk({ label: String(a[0] || '').slice(0, 40), n: String(a[1]), cc: String(a[2]).slice(0, 2), tz: String(a[3]), s: clampH(a[4], 9), e: clampH(a[5], 17), w: a[6] ? String(a[6]).split('').map(Number).filter((x) => x >= 1 && x <= 7) : null }))
        .filter((p) => { try { new Intl.DateTimeFormat('en', { timeZone: p.tz }); return true; } catch (e) { return false; } });
    } catch (e) { return null; }
  }
  function clampH(v, d) { v = Number(v); return Number.isFinite(v) && v >= 0 && v <= 24 ? v : d; }
  function save() {
    const enc = encode();
    history.replaceState(null, '', location.pathname + location.search + '#team=' + enc);
    if (!app.dataset.team) store.set('fairclock.team', enc);
  }

  /* ---------------- Rendering ---------------- */
  const els = {
    people: $('.fc-people', app), add: $('.fc-add input', app), sugg: $('.fc-suggest', app),
    summary: $('.fc-summary', app), grid: $('.fc-grid', app), date: $('.fc-date', app),
    slot: $('.fc-slot', app), best: $('.fc-best', app), rot: $('.fc-rotation', app), off: $('.fc-off', app),
  };

  function personCard(p, i) {
    const now = Date.now();
    const st = status(p, now);
    const wk = weekendOf(p);
    const hours = (sel) => Array.from({ length: 25 }, (_, h) => `<option value="${h}"${h === sel ? ' selected' : ''}>${shortHour(h % 24, 0)}${h === 24 ? ' (24)' : ''}</option>`).join('');
    const days = [1, 2, 3, 4, 5, 6, 7].map((d) => {
      const label = fmt(Date.UTC(2024, 0, d), 'UTC', { weekday: 'narrow' }); // 1 Jan 2024 = Monday
      return `<label class="fc-day" title="${esc(fmt(Date.UTC(2024, 0, d), 'UTC', { weekday: 'long' }))}"><input type="checkbox" data-wd="${d}"${wk.includes(d) ? ' checked' : ''}><span>${esc(label)}</span></label>`;
    }).join('');
    const badge = st.off ? (st.off === 'holiday' ? T('status_holiday') : T('status_weekend')) : T('status_' + st.k);
    return `<li class="fc-person st-${st.off ? 'off' : st.k}" data-id="${p.id}">
      <div class="fc-person-top">
        <span class="fc-flag" aria-hidden="true">${flag(p.cc)}</span>
        <div class="fc-person-id">
          <input class="fc-label" value="${esc(p.label || '')}" placeholder="${esc(cityName(p.n))}" aria-label="${esc(T('label_placeholder'))}" title="${esc(T('label_placeholder'))}" maxlength="40">
          <span class="fc-place">${esc(cityName(p.n))}, ${esc(countryName(p.cc))} · ${esc(fmtOffset(offsetMin(p.tz, now)))}</span>
        </div>
        <div class="fc-clock"><b data-clock="${esc(p.tz)}">${esc(fTime(now, p.tz))}</b><span class="fc-badge">${esc(badge)}</span></div>
      </div>
      <details class="fc-person-more"><summary>${esc(T('settings'))}</summary>
        <div class="fc-settings">
          <label>${esc(T('work_hours'))} <select data-f="s">${hours(p.s)}</select> – <select data-f="e">${hours(p.e)}</select></label>
          <div class="fc-weekend"><span>${esc(T('weekend'))}</span>${days}</div>
          <div class="fc-person-actions">
            ${i > 0 ? `<button type="button" class="fc-btn small" data-act="ref">${esc(T('make_reference'))}</button>` : `<span class="fc-ref">${esc(T('reference'))}</span>`}
            <button type="button" class="fc-btn small danger" data-act="del">${esc(T('remove'))}</button>
          </div>
        </div>
      </details>
    </li>`;
  }

  function renderPeople() {
    els.people.innerHTML = state.people.map(personCard).join('');
  }

  function renderSummary() {
    const P = state.people;
    if (P.length < 2) { els.summary.innerHTML = `<p>${esc(T('need_two'))}</p>`; return; }
    const now = Date.now();
    const offs = P.map((p) => offsetMin(p.tz, now));
    const spread = (Math.max(...offs) - Math.min(...offs)) / 60;
    const zones = new Set(offs).size;
    const ov = overlapHours(P);
    const wkSets = new Set(P.map((p) => weekendOf(p).join('')));
    let html = `<p>${T(ov > 0 ? 'summary' : 'summary_none', { zones: `<b>${zones}</b>`, spread: `<b>${fmtNum(spread)}</b>`, overlap: `<b>${fmtNum(ov)}</b>` })}</p>`;
    if (wkSets.size > 1) html += `<p class="fc-warn">${esc(T('different_weekends'))}</p>`;
    els.summary.innerHTML = html;
  }
  const fmtNum = (n) => new Intl.NumberFormat(LOC, { maximumFractionDigits: 1 }).format(n);

  function renderGrid() {
    const P = state.people;
    const ref = P[0];
    if (!state.date) state.date = lp(ref.tz, Date.now()).date;
    const start = localMidnight(ref.tz, state.date);
    els.date.textContent = fDayLong(start + 12 * 3600e3, ref.tz);
    const cols = Array.from({ length: 24 }, (_, i) => start + i * 3600e3);
    const nowCol = cols.findIndex((ms) => Date.now() >= ms && Date.now() < ms + 3600e3);
    let html = '<table class="fc-table"><thead><tr><th scope="col" class="fc-rowhead"></th>';
    cols.forEach((ms, i) => {
      const L = lp(ref.tz, ms);
      html += `<th scope="col" class="${i === nowCol ? 'is-now' : ''}"><button type="button" data-col="${ms}" aria-label="${esc(fDay(ms, ref.tz) + ' ' + fTime(ms, ref.tz))}">${esc(shortHour(L.h, L.m))}</button></th>`;
    });
    html += '</tr></thead><tbody>';
    P.forEach((p) => {
      html += `<tr><th scope="row" class="fc-rowhead"><span>${flag(p.cc)}</span> ${esc(p.label || cityName(p.n))}</th>`;
      cols.forEach((ms, i) => {
        const st = status(p, ms);
        const cls = 'c-' + st.k + (st.off ? ' c-off' : '') + (i === nowCol ? ' is-now' : '') + (state.sel === ms ? ' is-sel' : '');
        const dayChange = st.L.date !== lp(p.tz, start + 12 * 3600e3).date;
        const tip = `${fDay(ms, p.tz)} ${fTime(ms, p.tz)} — ${st.hol ? (st.hol[LANG] || st.hol.en) : st.off ? T('status_weekend') : T('status_' + st.k)}`;
        html += `<td class="${cls}${dayChange ? ' c-otherday' : ''}" data-col="${ms}" title="${esc(tip)}">${esc(shortHour(st.L.h, st.L.m))}</td>`;
      });
      html += '</tr>';
    });
    // team row
    html += `<tr class="fc-teamrow"><th scope="row" class="fc-rowhead">${esc(T('everyone'))}</th>`;
    cols.forEach((ms) => {
      const s = slotPain(P, ms, 60);
      html += `<td class="q-${QUAL(s.mx)}${state.sel === ms ? ' is-sel' : ''}" data-col="${ms}" title="${esc(T('q_' + QUAL(s.mx)))}"></td>`;
    });
    html += '</tr></tbody></table>';
    els.grid.innerHTML = html;
    // scroll to a sensible hour the first time
    const wrap = els.grid;
    if (!wrap.dataset.scrolled) {
      const target = $(`th:nth-child(${Math.max(2, (nowCol > 0 ? nowCol : 8) - 1)})`, wrap);
      if (target) wrap.scrollLeft = document.dir === 'rtl' ? -(target.offsetLeft) : target.offsetLeft - 120;
      wrap.dataset.scrolled = '1';
    }
  }

  function slotLines(ms) {
    return state.people.map((p) => {
      const st = status(p, ms);
      const note = st.hol ? ' — ' + (st.hol[LANG] || st.hol.en) : st.off ? ' — ' + T('status_weekend') : st.k !== 'work' ? ' — ' + T('status_' + st.k) : '';
      return { p, text: `${fDay(ms, p.tz)}, ${fTime(ms, p.tz)}–${fTime(ms + state.dur * 60000, p.tz)}`, note, st };
    });
  }

  function renderSlot() {
    if (state.sel == null) { els.slot.innerHTML = `<p class="fc-muted">${esc(T('pick_slot'))}</p>`; return; }
    const ms = state.sel;
    const s = slotPain(state.people, ms, state.dur);
    const q = QUAL(s.mx);
    const rows = slotLines(ms).map((l) => `<li><span>${flag(l.p.cc)} <b>${esc(l.p.label || cityName(l.p.n))}</b></span><span>${esc(l.text)}<small>${esc(l.note)}</small></span></li>`).join('');
    const durs = [30, 45, 60, 90].map((d) => `<option value="${d}"${d === state.dur ? ' selected' : ''}>${d} min</option>`).join('');
    els.slot.innerHTML = `<div class="fc-slot-head"><span class="fc-q q-${q}">${esc(T('q_' + q))}</span><label>${esc(T('length'))} <select class="fc-dur">${durs}</select></label></div>
      <ul class="fc-slot-list">${rows}</ul>
      <div class="fc-actions"><button type="button" class="fc-btn primary" data-act="ics">${esc(T('add_calendar'))}</button><button type="button" class="fc-btn" data-act="invite">${esc(T('copy_invite'))}</button></div>`;
  }

  function renderBest() {
    const P = state.people;
    if (P.length < 2) { els.best.innerHTML = ''; els.rot.innerHTML = ''; return; }
    const list = bestSlots(P, Date.now(), 14, state.dur);
    els.best.innerHTML = list.length ? '<ol class="fc-best-list">' + list.map((s) => {
      const q = QUAL(s.mx);
      const who = P.map((p) => `<span>${flag(p.cc)} ${esc(fTime(s.ms, p.tz))}</span>`).join('');
      return `<li><button type="button" data-pick="${s.ms}"><span class="fc-q q-${q}">${esc(T('q_' + q))}</span><b>${esc(fDay(s.ms, P[0].tz))}</b><span class="fc-who">${who}</span></button></li>`;
    }).join('') + '</ol>' : `<p class="fc-muted">${esc(T('no_slots'))}</p>`;

    const r = rotation(P, state.dur);
    if (!r) { els.rot.innerHTML = `<p class="fc-muted">${esc(T('no_slots'))}</p>`; return; }
    const desc = (ms) => P.map((p) => `<span>${flag(p.cc)} ${esc(fmt(ms, p.tz, { weekday: 'short' }))} ${esc(fTime(ms, p.tz))}</span>`).join('');
    if (!r.pair) {
      els.rot.innerHTML = `<p>${esc(T(r.single.mx === 0 ? 'rotation_none' : 'rotation_single'))}</p><div class="fc-rot"><div><b>${esc(T('every_week'))}</b><div class="fc-who">${desc(r.single.ms)}</div></div></div>`;
    } else {
      const fav = (slot) => P.filter((p, k) => slot.per[k] === 0).map((p) => p.label || cityName(p.n)).join(', ') || '—';
      els.rot.innerHTML = `<p>${esc(T('rotation_pair'))}</p><div class="fc-rot">
        <div><b>${esc(T('week_a'))}</b><small>${esc(T('easy_for', { who: fav(r.pair.a) }))}</small><div class="fc-who">${desc(r.pair.a.ms)}</div></div>
        <div><b>${esc(T('week_b'))}</b><small>${esc(T('easy_for', { who: fav(r.pair.b) }))}</small><div class="fc-who">${desc(r.pair.b.ms)}</div></div></div>`;
    }
  }

  function renderOff() {
    const P = state.people;
    const now = Date.now(), end = now + 60 * 864e5;
    const items = new Map();
    const startDate = new Date(now).toISOString().slice(0, 10), endDate = new Date(end).toISOString().slice(0, 10);
    P.forEach((p) => {
      const c = HOL[p.cc];
      if (!c) return;
      c.h.forEach((names, date) => {
        if (date < startDate || date > endDate) return;
        const key = date + '|' + p.cc;
        if (!items.has(key)) items.set(key, { date, cc: p.cc, name: names[LANG] || names.en, who: [] });
        items.get(key).who.push(p.label || cityName(p.n));
      });
    });
    const list = [...items.values()].sort((a, b) => a.date < b.date ? -1 : 1);
    const missing = [...new Set(P.filter((p) => !HOL[p.cc]).map((p) => countryName(p.cc)))];
    let html = list.length ? '<ul class="fc-off-list">' + list.map((x) => {
      const ms = Date.UTC(+x.date.slice(0, 4), +x.date.slice(5, 7) - 1, +x.date.slice(8, 10), 12);
      return `<li><time datetime="${x.date}">${esc(fDay(ms, 'UTC'))}</time><span>${flag(x.cc)} ${esc(x.name)}</span><small>${esc(x.who.join(', '))}</small></li>`;
    }).join('') + '</ul>' : `<p class="fc-muted">${esc(T('no_days_off'))}</p>`;
    if (missing.length) html += `<p class="fc-muted">${esc(T('no_holiday_data', { list: missing.join(', ') }))}</p>`;
    els.off.innerHTML = html;
  }

  function renderAll() {
    renderPeople();
    if (!state.people.length) { els.grid.innerHTML = ''; els.summary.innerHTML = `<p>${esc(T('need_two'))}</p>`; els.slot.innerHTML = ''; els.best.innerHTML = ''; els.rot.innerHTML = ''; els.off.innerHTML = ''; return; }
    renderSummary(); renderGrid(); renderSlot(); renderBest(); renderOff();
  }

  /* ---------------- Interactions ---------------- */
  async function addPerson(city, label) {
    if (state.people.length >= 20) return;
    await loadCountry(city.cc);
    state.people.push(mk({ n: city.n, cc: city.cc, tz: city.tz, label: label || '' }));
    save(); renderAll();
  }

  // City search
  let suggList = [], suggIdx = -1;
  async function suggest() {
    const q = fold(els.add.value.trim());
    if (!q) { els.sugg.hidden = true; return; }
    const cities = await loadCities();
    const res = [];
    for (const c of cities) {
      let score = -1;
      for (let k = 0; k < c.keys.length; k++) {
        const key = c.keys[k];
        if (!key) continue;
        if (key === q) { score = Math.max(score, 3); break; }
        if (key.startsWith(q)) score = Math.max(score, k === 0 ? 2 : 1.5);
        else if (q.length > 2 && key.includes(q)) score = Math.max(score, 0.5);
      }
      if (score >= 0) res.push([score, c]);
    }
    res.sort((a, b) => b[0] - a[0] || b[1].p - a[1].p);
    suggList = res.slice(0, 8).map((r) => r[1]);
    suggIdx = suggList.length ? 0 : -1;
    els.sugg.innerHTML = suggList.length ? suggList.map((c, i) => `<li role="option" id="fc-opt-${i}" data-i="${i}" aria-selected="${i === suggIdx}"><span>${flag(c.cc)} <b>${esc(cityName(c.n))}</b>, ${esc(countryName(c.cc))}</span><small>${esc(fTime(Date.now(), c.tz))}</small></li>`).join('') : `<li class="fc-muted">${esc(T('city_not_found'))}</li>`;
    els.sugg.hidden = false;
    els.add.setAttribute('aria-expanded', 'true');
  }
  function pick(i) {
    const c = suggList[i];
    if (!c) return;
    els.add.value = ''; els.sugg.hidden = true; els.add.setAttribute('aria-expanded', 'false');
    addPerson(c);
  }
  let st;
  els.add.addEventListener('input', () => { clearTimeout(st); st = setTimeout(suggest, 80); });
  els.add.addEventListener('focus', () => loadCities().catch(() => {}), { once: true });
  els.add.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!suggList.length) return;
      e.preventDefault();
      suggIdx = (suggIdx + (e.key === 'ArrowDown' ? 1 : -1) + suggList.length) % suggList.length;
      $$('li[data-i]', els.sugg).forEach((li) => li.setAttribute('aria-selected', String(+li.dataset.i === suggIdx)));
      els.add.setAttribute('aria-activedescendant', 'fc-opt-' + suggIdx);
    } else if (e.key === 'Enter') { e.preventDefault(); if (suggIdx >= 0) pick(suggIdx); }
    else if (e.key === 'Escape') { els.sugg.hidden = true; }
  });
  els.sugg.addEventListener('mousedown', (e) => { const li = e.target.closest('li[data-i]'); if (li) { e.preventDefault(); pick(+li.dataset.i); } });
  document.addEventListener('click', (e) => { if (!e.target.closest('.fc-add')) els.sugg.hidden = true; });

  // Person edits
  els.people.addEventListener('change', (e) => {
    const li = e.target.closest('.fc-person'); if (!li) return;
    const p = state.people.find((x) => x.id === +li.dataset.id); if (!p) return;
    if (e.target.dataset.f) {
      p[e.target.dataset.f] = +e.target.value;
      if (p.e <= p.s) { if (e.target.dataset.f === 's') p.e = Math.min(24, p.s + 1); else p.s = Math.max(0, p.e - 1); }
    } else if (e.target.dataset.wd) {
      p.w = $$('input[data-wd]', li).filter((x) => x.checked).map((x) => +x.dataset.wd);
    }
    save(); const open = li.querySelector('details').open; renderAll();
    const again = $(`.fc-person[data-id="${p.id}"] details`, app); if (again) again.open = open;
  });
  els.people.addEventListener('input', (e) => {
    if (!e.target.classList.contains('fc-label')) return;
    const li = e.target.closest('.fc-person');
    const p = state.people.find((x) => x.id === +li.dataset.id);
    p.label = e.target.value.slice(0, 40); save();
    clearTimeout(st); st = setTimeout(() => { renderGrid(); renderSlot(); renderBest(); renderOff(); }, 400);
  });
  els.people.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const id = +b.closest('.fc-person').dataset.id;
    const i = state.people.findIndex((x) => x.id === id);
    if (b.dataset.act === 'del') state.people.splice(i, 1);
    if (b.dataset.act === 'ref') { const [p] = state.people.splice(i, 1); state.people.unshift(p); state.date = null; els.grid.dataset.scrolled = ''; }
    save(); renderAll();
  });

  // Grid & slots
  app.addEventListener('click', (e) => {
    const c = e.target.closest('[data-col]');
    if (c && els.grid.contains(c)) { state.sel = +c.dataset.col; renderGrid(); renderSlot(); els.slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return; }
    const pk = e.target.closest('[data-pick]');
    if (pk) { state.sel = +pk.dataset.pick; state.date = lp(state.people[0].tz, state.sel).date; els.grid.dataset.scrolled = ''; renderGrid(); renderSlot(); els.slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return; }
    const nav = e.target.closest('[data-nav]');
    if (nav) {
      const ref = state.people[0]; if (!ref) return;
      const d = nav.dataset.nav === 'today' ? lp(ref.tz, Date.now()).date : lp(ref.tz, localMidnight(ref.tz, state.date) + 12 * 3600e3 + (+nav.dataset.nav) * 864e5).date;
      state.date = d; renderGrid(); return;
    }
    const act = e.target.closest('[data-act]');
    if (!act || els.people.contains(act)) return;
    if (act.dataset.act === 'ics') downloadICS();
    if (act.dataset.act === 'invite') copy(inviteText(), act);
    if (act.dataset.act === 'share') { save(); copy(location.href, act); }
  });
  app.addEventListener('change', (e) => {
    if (e.target.classList.contains('fc-dur')) { state.dur = +e.target.value; renderSlot(); renderBest(); }
  });

  function inviteText() {
    const ms = state.sel;
    return T('invite_head') + '\n' + slotLines(ms).map((l) => `${flag(l.p.cc)} ${l.p.label ? l.p.label + ' — ' : ''}${cityName(l.p.n)}: ${l.text}${l.note}`).join('\n') + '\n\n' + location.origin + location.pathname;
  }
  function downloadICS() {
    const ms = state.sel; if (ms == null) return;
    const z = (t) => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const escI = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    const desc = slotLines(ms).map((l) => `${cityName(l.p.n)}: ${l.text}`).join('\n');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Fairclock//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
      'UID:' + ms + '-' + Math.random().toString(36).slice(2) + '@fairclock', 'DTSTAMP:' + z(Date.now()),
      'DTSTART:' + z(ms), 'DTEND:' + z(ms + state.dur * 60000), 'SUMMARY:' + escI(T('invite_head')),
      'DESCRIPTION:' + escI(desc), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'meeting.ics'; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function copy(text, btn) {
    const done = () => { const t = btn.textContent; btn.textContent = T('copied'); setTimeout(() => (btn.textContent = t), 1500); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fb); else fb();
    function fb() { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { /* noop */ } ta.remove(); }
  }

  // Live clocks
  setInterval(() => { $$('[data-clock]', app).forEach((b) => { b.textContent = fTime(Date.now(), b.dataset.clock); }); }, 20000);

  /* ---------------- Boot ---------------- */
  (async function boot() {
    let people = null;
    const m = location.hash.match(/team=([^&]+)/);
    if (m) people = decode(m[1]);
    if (!people && app.dataset.team) people = decode(encodeURIComponent(app.dataset.team));
    if (!people) { const saved = store.get('fairclock.team'); if (saved) people = decode(saved); }
    if (!people || !people.length) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      const map = await loadTzMap();
      const hit = map[tz];
      people = [mk({ label: T('you'), n: hit ? hit[0] : tz.split('/').pop().replace(/_/g, ' '), cc: hit ? hit[1] : '', tz })];
    }
    await Promise.all([...new Set(people.map((p) => p.cc))].map(loadCountry));
    state.people = people;
    app.classList.remove('is-loading');
    renderAll();
  })().catch((err) => { app.classList.remove('is-loading'); els.summary.textContent = 'Error: ' + err.message; });
})();
