# Dossier de revue indépendante — projets « outils web » d'Alaa

> **Pour Alaa : mode d'emploi**
> 1. Ouvre une nouvelle conversation ChatGPT, avec un modèle qui sait lire les fichiers joints.
> 2. Joins `dossier-complet-chatgpt.zip` et ce fichier `BRIEF_CHATGPT.md`.
> 3. Copie-colle le bloc **« Prompt à coller »** ci-dessous.
> 4. Rapporte la réponse à Claude pour la confronter et fusionner le meilleur des deux.
>
> Ce brief est volontairement **neutre**. Les affirmations de Claude y sont présentées comme des affirmations à vérifier, pas comme des faits acquis.

---

## Prompt à coller

```
Tu es un comité d'experts indépendants : product manager SaaS grand public, expert SEO international, spécialiste de la monétisation de sites gratuits, développeur front-end senior, et un enseignant de Coran (hifz) qui connaît les méthodes des écoles coraniques d'Asie du Sud, du monde arabe, d'Indonésie et de Turquie.

Le fichier BRIEF_CHATGPT.md décrit le contexte, et le zip contient tout le code et les documents. Ils ont été produits par une autre IA (Claude). Ton rôle n'est PAS de valider ce travail mais de le CHALLENGER : trouver les erreurs, les angles morts, les hypothèses fragiles et les meilleures alternatives.

Règles :
- Réponds en français.
- Marque chaque affirmation : ✅ établi (avec source et lien), ⚠️ probable (inférence), ❓ spéculatif.
- Ne donne aucun chiffre sans source. Si tu ne sais pas, dis-le.
- Vérifie toi-même la concurrence sur le web si tu as accès à la recherche, avec les liens.
- Ouvre et lis le code (hifz/src/assets/app.js, hifz/build.py) avant de juger la technique.
- Réponds question par question (Q1 à Q12 de la section 7 du brief), dans le format de la section 8.
```

---

## 1. Contexte

- **Qui** : Alaa, créateur de contenu francophone. Il parle français, arabe et anglais, et gère déjà des chaînes TikTok/YouTube (dont « Sakina Kids », contenu islamique pour enfants, produit avec VEO, ElevenLabs et CapCut). Il ne développe pas.
- **Objectif déclaré** : « m'enrichir, multiplier mes sources de revenus », avec un projet **nouveau, créatif, utile, mondial, en anglais d'abord, avec plusieurs langues**.
- **Point de départ** : une vidéo YouTube française sponsorisée par Hostinger. Elle affirme qu'un site d'anagrammes (wordunscrambler.me) rapporte 500 000 €/mois en publicité, et propose de « cloner » ce genre de sites avec l'IA.
- **Contraintes** :
  - budget minimal ;
  - pas de serveur ni de base de données (sites statiques, calculs dans le navigateur) ;
  - mise en ligne par Alaa lui-même (domaine, Cloudflare Pages).

## 2. Les trois projets réalisés (chronologie)

| # | Projet | Description | Statut / avis d'Alaa |
|---|---|---|---|
| 1 | **Lettres en vrac** (`lettres-en-vrac/`) | 6 outils de mots en français (anagrammes, solveur de mots croisés, compteur de mots…), dictionnaire de 331 778 mots | Jugé « un simple clone », pas original |
| 2 | **Fairclock** (`fairclock/`) | Planificateur de réunions entre fuseaux horaires, qui tient compte des week-ends propres à chaque pays (ven.-sam., etc.), des jours fériés de 251 pays et d'une rotation équitable. 6 langues, 56 pages | « Très déçu » |
| 3 | **Hifzly** (`hifz/`) | Planificateur de mémorisation du Coran : sabaq (nouvelle leçon), sabqi (révision récente), manzil (révision ancienne). 6 langues, 43 pages | Dernier livré, **pas encore validé par Alaa** |

Tous les trois sont construits, testés automatiquement dans un navigateur sans interface (Playwright), sans dépendance, prêts à déployer (`dist/`), mais **pas encore en ligne**.

## 3. Hifzly en détail (projet principal à évaluer)

### Fonctionnement
- **Entrées** :
  - quoi mémoriser : sourates, juz ou tout le Coran ;
  - ordre : depuis la fin (sourates courtes d'abord) ou depuis le début ;
  - unité : versets, ou lignes du mushaf de Médine (15 par page, 604 pages) ;
  - rythme : portion fixe, ou date de fin (l'outil calcule la portion) ;
  - statut de chaque jour de la semaine : nouveau + révision, révision seule, ou repos ;
  - fenêtre sabqi (N derniers jours d'étude) et quantité de manzil par jour ;
  - juz déjà mémorisés.
- **Sorties** :
  - planning jour par jour jusqu'à la fin, date de fin, jalons datés ;
  - bloc « aujourd'hui » avec un lien vers Quran.com ;
  - cases à cocher (stockage local du navigateur) et barre de progression ;
  - carte image à partager (canvas 1080×1350) ;
  - export agenda .ics, impression, lien du plan.
- **Préréglages** : Juz Amma pour enfants (3 versets/jour, 5 jours/semaine) ; Al-Mulk en 30 jours ; Al-Kahf en 3 mois ; une page par jour ; tout le Coran en 3 ans.
- **Langues** : EN (défaut), AR, FR, UR, ID, TR, avec le vocabulaire local. Exemples : سبق/سبقی/منزل en ourdou, ziyadah/muraja'ah en indonésien.
- **SEO** :
  - 6 pages d'accueil reliées par des balises hreflang ;
  - 30 pages anglaises « How to memorize Surah X », avec les chiffres réels et un plan prérempli ;
  - un index des 114 sourates.

### Algorithme (résumé ; le code est en annexe A)
1. La sélection est transformée en une liste ordonnée d'unités (lignes ou versets). Les unités des juz déjà connus vont directement dans le stock de révision.
2. À chaque jour d'étude, l'outil prend la portion suivante. En mode versets, une portion ne change jamais de sourate en cours de journée.
3. **Sabqi** : toutes les unités apprises pendant les N derniers jours d'étude (N = 7 par défaut).
4. Les unités qui sortent de cette fenêtre rejoignent le stock de **manzil**.
5. Le manzil est révisé par un curseur tournant, dans l'ordre du mushaf, à raison de K unités par jour.
6. Jalons : la date à laquelle chaque juz (mode lignes) ou chaque sourate (mode versets) est terminé.

### Données et vérifications revendiquées par Claude
- Structure du mushaf : paquet npm `quran-meta` 7.0.0 (MIT).
- Noms des sourates : `quran-json` 3.1.2 (CC BY 4.0).
- Contrôles effectués :
  - 604 pages, 6 236 versets ;
  - début des juz aux pages 1, 22, 42 … 582 ;
  - Juz Amma (sourates 78 à 114) = 564 versets ;
  - Al-Kahf pp. 293-304, Al-Mulk pp. 562-564.
- **Les juz 4, 7, 11 et 26 commencent en milieu de page** selon `quran-meta`. Le code utilise donc le premier verset réel de chaque juz.
- Test du moteur : Juz Amma à 3 versets/jour, sans couper une sourate dans la journée → 200 jours d'étude calculés à la main, 200 obtenus.

### Limites reconnues
- Le mode « lignes » suppose 15 lignes par page, y compris pour les pages 1-2 et les en-têtes de sourate.
- Le mushaf indo-pakistanais à 16 lignes n'est pas géré (le mode versets fonctionne quel que soit le mushaf).
- Les traductions ont été rédigées par IA.

## 4. Lancement et argent (proposés par Claude, voir `hifz/LANCEMENT.md`)
- **Moment** : être en ligne avant mi-janvier 2027, car le Ramadan est estimé vers le 8 février 2027 (⚠️ non confirmé).
- **Canaux** : chaînes Sakina Kids, groupes WhatsApp de mosquées et d'écoles, enseignants de Coran sur les réseaux, Reddit (selon les règles), SEO.
- **Ordre de monétisation proposé** :
  1. dons ;
  2. carnet PDF premium ;
  3. abonnement pour enseignants et écoles ;
  4. affiliation avec des cours de Coran en ligne ;
  5. publicité en dernier, catégories sensibles bloquées.
- **Coût de démarrage** : environ 10-15 €/an de domaine ; hébergement statique gratuit.

## 5. Faits établis pendant le travail (avec sources)
- ✅ Recherche du 22/11/2026, Hifzly : il existe des calculateurs simples (date de fin = total ÷ rythme) et des carnets à remplir à la main. Aucun outil trouvé ne génère automatiquement un planning complet sabaq/sabqi/manzil.
  - Exemples : [Taskade Hifz Tracker](https://www.taskade.com/apps/all/hifz-tracker-tbzmt7nwa1l54a1t), [Sabaq](https://www.producthunt.com/products/sabaq), [ChandKiTarikh](https://chandkitarikh.in/?p=3060).
  - Des utilisateurs de Quran.com réclament la fonction : [demande Hifdh](https://feedback.quran.com/feature-requests/p/hifdh-feature).
  - ⚠️ Recherche non exhaustive.
- ✅ Un carnet de hifz imprimable se vend 3,99 $ : [Getly](https://www.getly.store/product/quran-hifz-journal-printable-memorization-tracker-for-all-114-surahs-and-30-juz-).
- ✅ Idées écartées parce que déjà occupées :
  - optimiseur de jours de congés : [Vacation Tracker](https://vacationtracker.io/tools/pto-planner/), [Deutschland-rechner](https://www.deutschland-rechner.de/brueckentage-2027) ;
  - compteur Schengen 90/180 et résidence fiscale de 183 jours : nombreuses applications iOS sorties en 2026 ;
  - partage équitable argent + tâches dans un couple : [Household Fair Share](https://apps.apple.com/us/app/-/id1662481936), [Starling « Share the Load »](https://www.starlingbank.com/resources/tools/share-the-load-track-and-compare-your-household-chores/).
- ✅ Depuis le 5 mars 2024, Google sanctionne le « scaled content abuse », c'est-à-dire la production de contenu en masse pour manipuler le classement : [Google Search Central](https://developers.google.com/search/blog/2024/03/core-update-spam-policies).
- ✅ AdSense exige un outil de consentement certifié dans l'EEE et au Royaume-Uni depuis janvier 2024 : [aide AdSense](https://support.google.com/adsense/answer/13554116).
- ✅ Le trafic de wordunscrambler.me cité par la vidéo est très incertain : environ 2,6 M visites (Ahrefs, juin 2025) contre 20 M (Semrush). Le revenu annoncé est une extrapolation, pas une donnée.
- ❓ Revenu publicitaire par page en trafic francophone : seule donnée trouvée, 4-6 $ pour 1 000 pages vues (un témoignage sur un forum). Non fiable.

## 6. Hypothèses NON vérifiées (à challenger)
1. Le volume de recherche réel pour « hifz planner », « memorize surah al mulk », etc. Aucun outil de mots-clés n'a été utilisé.
2. La carte de partage rendra l'outil viral sur WhatsApp et TikTok.
3. Des enseignants et des écoles paieraient un abonnement.
4. Les valeurs par défaut (sabqi = 7 jours, manzil = 5 pages ou 20 versets par jour) sont pédagogiquement adaptées.
5. Le vocabulaire local et les traductions AR, UR, ID, TR sont justes et naturels.
6. Les noms « Hifzly » (et « Fairclock ») sont libres, en domaine comme en marque.
7. Les 30 pages par sourate ne seront pas vues par Google comme du contenu produit en masse.
8. La date estimée du Ramadan 2027.
9. Il vaut mieux se concentrer sur Hifzly que sur Fairclock ou Lettres en vrac.

## 7. Questions précises (réponds à chacune)
- **Q1 — Verdict global.** Hifzly mérite-t-il d'être lancé ? Donne une note sur 10 pour l'originalité, l'utilité, le potentiel de revenus et la faisabilité, puis go / no-go et pourquoi.
- **Q2 — Concurrence.** Existe-t-il déjà un outil (site, application, fonction de Quran.com, Tarteel, Quranly ou autre) qui génère automatiquement un planning sabaq/sabqi/manzil à partir d'un objectif ? Liens obligatoires.
- **Q3 — Pédagogie.** La logique sabaq / sabqi / manzil telle que codée est-elle fidèle aux pratiques des écoles coraniques ? Les valeurs par défaut sont-elles bonnes ? Que changerais-tu (ratio révision / nouveau, taille de la fenêtre sabqi, cycle de manzil par juz) ?
- **Q4 — Mushaf.** Faut-il gérer en priorité le mushaf indo-pakistanais à 16 lignes ? D'autres variantes (Warsh pour le Maghreb) ?
- **Q5 — Monétisation.** Classe les options et donne des ordres de grandeur sourcés. La publicité sur un outil coranique est-elle une erreur ?
- **Q6 — Distribution.** Le plan de lancement (Ramadan, Sakina Kids, WhatsApp) est-il le bon ? Que manque-t-il ?
- **Q7 — Produit.** Les 5 fonctions manquantes les plus importantes, et ce qu'il faudrait retirer.
- **Q8 — Revue de code.** Bugs, cas limites (dates, fuseaux, ordre « depuis la fin », juz commençant en milieu de page, gros plans de plus de 1 000 jours), performance, accessibilité, SEO (hreflang, données structurées, risque des 30 pages).
- **Q9 — Juridique et RGPD.** Mentions légales, enfants, stockage local, licences des données (CC BY 4.0), marque.
- **Q10 — Traductions.** Relis les fichiers `hifz/src/i18n/ar.json`, `ur.json`, `id.json`, `tr.json`, `fr.json`. Liste les erreurs et formulations non naturelles avec la correction proposée.
- **Q11 — Comparaison des trois projets.** Lequel garder, lequel abandonner, et pourquoi ? Y a-t-il une meilleure idée vu le profil d'Alaa ?
- **Q12 — Angles morts.** Qu'est-ce que Claude a raté ou surestimé ?

## 8. Format de réponse attendu
- Une section par question (Q1 à Q12), puis une conclusion.
- Dans chaque section, des puces courtes, chacune marquée ✅, ⚠️ ou ❓, avec le lien de la source quand elle existe.
- Q8 et Q10 : un tableau `fichier | ligne ou clé | problème | correction`.
- **Conclusion** : les 5 actions prioritaires, dans l'ordre, chacune avec son timing (maintenant / avant le Ramadan / plus tard).

## 9. Contenu du zip
```
BRIEF_CHATGPT.md                  ce fichier
recap_sites-outils_2026-11-22.md  récapitulatif chronologique (coûts, calendrier, décisions)
hifz/                             PROJET PRINCIPAL
  README.md, LANCEMENT.md         description, kit de lancement
  config.json                     configuration (identité de l'éditeur à compléter)
  build.py                        générateur du site (Python, sans dépendance)
  data/build_quran_data.mjs       extraction des données coraniques
  src/assets/app.js               moteur de planning et interface (503 lignes)
  src/assets/style.css            design (clair/sombre, LTR/RTL, impression)
  src/i18n/*.json                 textes par langue
  src/templates/*.html            gabarits (planificateur, pages sourates)
  src/pages/en|fr/*.html          pages légales
  src/data/quran.json             structure du mushaf (604 pages, 30 juz, 114 sourates)
  dist/                           site généré (43 pages) prêt à déployer
  dist-standalone/index.html      version autonome en un seul fichier, à ouvrir dans un navigateur
  apercus/                        captures d'écran et carte de partage générée
fairclock/                        projet 2 (sources, README, captures ; sans dist)
lettres-en-vrac/                  projet 1 (sources, README, captures ; sans dist ni dictionnaire)
```
**Tester Hifzly sans rien installer** : ouvrir `hifz/dist-standalone/index.html` dans un navigateur.
**Régénérer le site** : `cd hifz && python3 build.py`, puis `cd dist && python3 -m http.server 8000`.

---

## Annexe A — Cœur de l'algorithme (`hifz/src/assets/app.js`)
Valeurs par défaut :
```js
const DEFAULT = { scope: 'surah', from: 30, to: 30, sfrom: 114, sto: 78, unit: 'ayah', order: 'end', amount: 3, mode: 'amount', target: '', days: 'nnnnrnn', sabqi: 7, manzil: 20, known: [], start: '' };
// days : 7 caractères du lundi au dimanche — n = nouveau + révision, r = révision seule, o = repos
```
Construction des unités et du planning :
```js
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
```
