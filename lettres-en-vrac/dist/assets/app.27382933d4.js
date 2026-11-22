/* Lettres en vrac — interface des outils (aucune dépendance, aucun cookie). */
(function () {
  'use strict';
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const fmt = new Intl.NumberFormat('fr-FR');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Worker (dictionnaire) ---------- */
  let worker = null, seq = 0;
  const pending = new Map();
  function getWorker() {
    if (worker) return worker;
    worker = new Worker(document.documentElement.dataset.worker);
    worker.onmessage = (e) => {
      const p = pending.get(e.data.id);
      if (!p) return;
      pending.delete(e.data.id);
      e.data.error ? p.reject(new Error(e.data.error)) : p.resolve(e.data);
    };
    return worker;
  }
  function ask(type, query) {
    const id = ++seq;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      getWorker().postMessage({ id, type, query });
    });
  }

  /* ---------- Rendu des résultats ---------- */
  const wiki = (w) => 'https://fr.wiktionary.org/wiki/' + encodeURIComponent(w);
  const chip = (w, b) => `<li><a class="w b${b}" href="${wiki(w)}" target="_blank" rel="noopener nofollow" title="Définition de « ${esc(w)} » sur le Wiktionnaire">${esc(w)}</a></li>`;
  const plural = (n, one, many) => fmt.format(n) + ' ' + (n > 1 ? many : one);

  function renderGroups(box, groups) {
    box.innerHTML = groups.map((g) => {
      const more = g.total > g.words.length ? `<p class="more">… et ${fmt.format(g.total - g.words.length)} autres (affinez avec les filtres).</p>` : '';
      return `<section class="group"><h3>${g.len} lettres <span>· ${plural(g.total, 'mot', 'mots')}</span></h3><ul class="words">${g.words.map((x) => chip(x[0], x[1])).join('')}</ul>${more}</section>`;
    }).join('');
  }

  function renderAnagrams(box, r) {
    let html = '<section class="group"><h3>Anagrammes exactes <span>· ' + plural(r.exact.length, 'mot', 'mots') + '</span></h3>';
    html += r.exact.length ? `<ul class="words">${r.exact.map((x) => chip(x[0], x[1])).join('')}</ul>` : '<p class="empty">Aucun mot du dictionnaire n’utilise exactement ces lettres.</p>';
    html += '</section>';
    if (r.pairs && (r.pairs.length || r.pairsTotal === 0)) {
      html += '<section class="group"><h3>Anagrammes en deux mots <span>· ' + plural(r.pairsTotal || 0, 'combinaison', 'combinaisons') + '</span></h3>';
      html += r.pairs.length
        ? `<ul class="words pairs">${r.pairs.map((p) => `<li><span class="w b${p[2]}">${esc(p[0])} ${esc(p[1])}</span></li>`).join('')}</ul>`
        : '<p class="empty">Aucune combinaison de deux mots courants. Cochez « mots rares » pour élargir.</p>';
      if (r.pairsTotal > r.pairs.length) html += `<p class="more">… et ${fmt.format(r.pairsTotal - r.pairs.length)} autres combinaisons.</p>`;
      html += '</section>';
    }
    box.innerHTML = html;
  }

  /* ---------- Formulaires d'outils dictionnaire ---------- */
  function readForm(form) {
    const q = {};
    $$('input, select', form).forEach((el) => {
      if (!el.name) return;
      if (el.type === 'checkbox') { if (el.checked) q[el.name] = 1; }
      else if (el.value.trim()) q[el.name] = el.value.trim();
    });
    return q;
  }
  function fillForm(form, params) {
    let any = false;
    $$('input, select', form).forEach((el) => {
      if (!el.name || !params.has(el.name)) return;
      if (el.type === 'checkbox') el.checked = params.get(el.name) === '1';
      else el.value = params.get(el.name);
      any = true;
    });
    if (any) { const d = $('details', form); if (d && $$('details input', form).some((i) => i.value)) d.open = true; }
    return any;
  }
  function syncUrl(q) {
    const params = new URLSearchParams(q);
    const url = location.pathname + (params.toString() ? '?' + params : '');
    history.replaceState(null, '', url);
  }

  function initDictTool(form) {
    const type = form.dataset.tool;
    const box = $('.results', form.parentNode);
    const status = $('.status', form.parentNode);
    const copyBtn = $('.copy-results', form.parentNode);
    let timer = null, last = '';

    async function run(force) {
      const q = readForm(form);
      const sig = JSON.stringify(q);
      if (sig === last && !force) return;
      last = sig;
      const main = q.letters || q.pattern || q.start || q.end || q.contains;
      if (!main) { box.innerHTML = ''; status.textContent = ''; if (copyBtn) copyBtn.hidden = true; syncUrl({}); return; }
      status.textContent = worker ? 'Recherche…' : 'Chargement du dictionnaire (≈ 330 000 mots)…';
      status.classList.add('busy');
      try {
        const res = await ask(type, q);
        if (JSON.stringify(readForm(form)) !== sig) return; // une saisie plus récente est en cours
        const r = res.result;
        if (type === 'anagrams') renderAnagrams(box, r); else renderGroups(box, r.groups);
        const n = type === 'anagrams' ? r.exact.length + (r.pairsTotal || 0) : r.count;
        status.textContent = n ? `${plural(n, 'résultat', 'résultats')} · ${r.ms} ms` : 'Aucun résultat. Vérifiez l’orthographe ou ajoutez un joker « ? ».';
        if (copyBtn) copyBtn.hidden = !n;
        syncUrl(q);
      } catch (err) {
        status.textContent = 'Erreur : ' + err.message + '. Rechargez la page.';
      } finally {
        status.classList.remove('busy');
      }
    }

    form.addEventListener('submit', (e) => { e.preventDefault(); run(true); });
    form.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 250); });
    form.addEventListener('change', () => { clearTimeout(timer); timer = setTimeout(run, 50); });
    const reset = $('.reset', form);
    if (reset) reset.addEventListener('click', () => { form.reset(); run(true); $('input', form).focus(); });
    if (copyBtn) copyBtn.addEventListener('click', () => {
      const words = $$('.words .w', box).map((a) => a.textContent).join('\n');
      copyText(words, copyBtn);
    });

    // Exemples cliquables (liens vers la même page avec paramètres)
    $$('a[data-example]').forEach((a) => a.addEventListener('click', (e) => {
      const u = new URL(a.href, location.href);
      if (u.pathname !== location.pathname) return;
      e.preventDefault();
      form.reset();
      fillForm(form, u.searchParams);
      run(true);
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));

    // Pré-remplissage depuis l'URL (?letters=...)
    if (fillForm(form, new URLSearchParams(location.search))) run(true);
    else {
      // Préchargement discret du dictionnaire : au premier focus ou quand la page est inactive
      const warm = () => { if (!worker) ask('warmup').catch(() => {}); };
      form.addEventListener('focusin', warm, { once: true });
      ('requestIdleCallback' in window) ? requestIdleCallback(warm, { timeout: 4000 }) : setTimeout(warm, 2500);
    }
  }

  /* ---------- Copier ---------- */
  function copyText(text, btn) {
    const done = () => { const t = btn.textContent; btn.textContent = 'Copié ✓'; setTimeout(() => (btn.textContent = t), 1500); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { /* rien */ }
      ta.remove();
    }
  }

  /* ---------- Compteur de mots ---------- */
  const STOP = new Set('les des une est pas que qui dans pour par sur avec son ses aux mais plus tout tous comme elle ils elles nous vous leur leurs cette ces sont été être avoir fait ont était lui même aussi bien très sans entre dont donc car ainsi alors encore peut faire'.split(' '));
  function initCounter(root) {
    const ta = $('textarea', root);
    const out = (k, v) => { const el = $(`[data-stat="${k}"]`, root); if (el) el.textContent = v; };
    const seg = ('Segmenter' in Intl) ? new Intl.Segmenter('fr', { granularity: 'sentence' }) : null;
    function update() {
      const t = ta.value;
      const words = t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
      const chars = Array.from(t).length;
      const noSpace = Array.from(t.replace(/\s/g, '')).length;
      let sentences = 0;
      if (t.trim()) {
        if (seg) { for (const s of seg.segment(t)) if (/[\p{L}\p{N}]/u.test(s.segment)) sentences++; }
        else sentences = (t.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) || []).filter((s) => /[\p{L}\p{N}]/u.test(s)).length;
      }
      const paragraphs = t.split(/\n\s*\n|\n/).filter((p) => p.trim()).length;
      const read = words.length / 230, speak = words.length / 140;
      const dur = (m) => m < 1 ? Math.max(0, Math.round(m * 60)) + ' s' : Math.floor(m) + ' min ' + String(Math.round((m % 1) * 60)).padStart(2, '0') + ' s';
      out('words', fmt.format(words.length));
      out('chars', fmt.format(chars));
      out('nospace', fmt.format(noSpace));
      out('sentences', fmt.format(sentences));
      out('paragraphs', fmt.format(paragraphs));
      out('read', words.length ? dur(read) : '0 s');
      out('speak', words.length ? dur(speak) : '0 s');
      $$('[data-limit]', root).forEach((el) => {
        const lim = +el.dataset.limit;
        el.textContent = `${fmt.format(chars)} / ${fmt.format(lim)}`;
        el.classList.toggle('over', chars > lim);
      });
      const freq = new Map();
      for (const w of t.toLowerCase().match(/[\p{L}]+(?:[-][\p{L}]+)*/gu) || []) {
        const word = w.replace(/^[ldjmnstc]'|^qu'/, '');
        if (word.length < 3 || STOP.has(word)) continue;
        freq.set(word, (freq.get(word) || 0) + 1);
      }
      const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
      const list = $('.top-words', root);
      if (list) list.innerHTML = top.length ? top.map(([w, n]) => `<li><span>${esc(w)}</span><b>${n}</b><small>${(n / words.length * 100).toFixed(1).replace('.', ',')} %</small></li>`).join('') : '<li class="empty">Tapez ou collez un texte.</li>';
    }
    ta.addEventListener('input', update);
    const clear = $('.clear', root);
    if (clear) clear.addEventListener('click', () => { ta.value = ''; update(); ta.focus(); });
    update();
  }

  /* ---------- Majuscules / minuscules ---------- */
  const up = (s) => s.toLocaleUpperCase('fr-FR');
  const low = (s) => s.toLocaleLowerCase('fr-FR');
  const CASES = {
    upper: up,
    lower: low,
    sentence: (s) => low(s).replace(/(^\s*|[.!?…]\s+|\n\s*)(\p{L})/gu, (m, a, b) => a + up(b)),
    title: (s) => low(s).replace(/(^|[\s\-'’«(\[])(\p{L})/gu, (m, a, b) => a + up(b)),
    alternate: (s) => { let i = 0; return Array.from(s).map((c) => /\p{L}/u.test(c) ? (i++ % 2 ? up(c) : low(c)) : c).join(''); },
    invert: (s) => Array.from(s).map((c) => c === up(c) ? low(c) : up(c)).join(''),
    noaccent: (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').replace(/Œ/g, 'OE').replace(/æ/g, 'ae').replace(/Æ/g, 'AE'),
  };
  function initCase(root) {
    const ta = $('textarea', root);
    $$('[data-case]', root).forEach((b) => b.addEventListener('click', () => {
      ta.value = CASES[b.dataset.case](ta.value);
      ta.dispatchEvent(new Event('input'));
    }));
    const copy = $('.copy', root);
    if (copy) copy.addEventListener('click', () => copyText(ta.value, copy));
    const clear = $('.clear', root);
    if (clear) clear.addEventListener('click', () => { ta.value = ''; ta.focus(); });
  }

  /* ---------- Démarrage ---------- */
  $$('form[data-tool]').forEach(initDictTool);
  $$('[data-widget="counter"]').forEach(initCounter);
  $$('[data-widget="case"]').forEach(initCase);

  // Menu mobile
  const toggle = $('.nav-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();
