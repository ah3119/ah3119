# Our Quran Time, version 2 : dossier de revue pour ChatGPT

Tu reçois le dossier complet d'un site web, préparé par Claude, pour une **revue indépendante et une comparaison**. Sois critique et précis. Ne valide rien par politesse.

## 1. Le projet en bref
- **Our Quran Time** : un carnet gratuit qui aide les parents à faire mémoriser le Coran (hifz) à leurs enfants. Chaque jour, il donne le passage nouveau, la révision récente et la révision ancienne, calculés d'après ce que l'enfant a vraiment récité. Pas de compte, pas de serveur : tout reste sur le téléphone.
- Site statique (Python, sans dépendance) : `hifz/build.py` génère `dist/`, qui sera hébergé sur Cloudflare Pages, à l'adresse prévue `ourqurantime.com`.
- Pilote prévu avec 10 familles francophones en décembre 2026 ou janvier 2027.

## 2. Ce qui a changé depuis ta revue précédente (v1)
1. **10 langues**, le top 10 mondial (Ethnologue 2025) : anglais (racine), chinois, hindi, espagnol, arabe, français, bengali, portugais, russe, indonésien.
   - Menu 🌐 : tout le site change de langue et le plan de l'enfant est conservé.
   - Arabe de droite à gauche. Pluriels propres à chaque langue (Intl.PluralRules) et chiffres natifs (bengali).
   - Noms des sourates dans l'écriture locale pour le chinois (Ma Jian), le hindi, le bengali et le russe.
   - Terminologie des écoles de hifz du pays : ziyadah et muraja'ah en indonésien, sabaq, sabqi et manzil en hindi, amukhta en bengali.
2. **Mushaf officiel intégré**.
   - Les 604 pages du Mushaf de Médine (Hafs) publiées par le Complexe du Roi Fahd, téléchargées depuis son site ; l'empreinte SHA-256 a été vérifiée.
   - Le bouton « 📖 Mushaf p. N » ouvre la page exacte du passage du jour.
   - Le Complexe est désormais la référence unique pour le Coran dans tous les projets de l'auteur (`REFERENCE_CORAN.md`).
3. **Bandeau de langue** proposé seulement sur l'accueil anglais, selon la langue du téléphone ; manifestes et images d'aperçu par langue ; mentions légales traduites.
4. **Workflow de monétisation** : `hifz/pilote/5-MONETISATION.md`.
5. **Tests** : 53 contrôles automatisés réussis (`RESULTATS_TESTS.md`).

## 3. Ce que je te demande, dans cet ordre

### A. Avant de lire `5-MONETISATION.md` : ta propre recommandation
Comment ce produit peut-il générer des revenus sans trahir la confiance des familles musulmanes ? Donne ton plan, avec le calendrier et les conditions de passage d'une étape à l'autre. Ne lis le plan de Claude qu'ensuite.

### B. Comparaison avec le plan de Claude
Tableau : **Point | Claude | Toi | Verdict (qui a raison et pourquoi)**. Couvre au minimum :
- publicité oui ou non ;
- dons : association ou micro-entreprise ;
- espace enseignant payant ;
- produits imprimés ;
- Ramadan 2027 ;
- critères go / no-go du pilote ;
- usage commercial des pages du mushaf.

### C. Traductions (le plus important pour la suite)
Pour chaque langue que tu maîtrises bien, lis `hifz/src/i18n/<langue>.json` et `hifz/src/pages/<langue>/`. Signale :
- les phrases qui ne sonnent pas naturelles pour un parent natif, avec ta correction ;
- les **termes religieux** mal choisis : sabaq, révision, récité, mushaf, verset, juz, formules (alhamdulillah, barakAllahu fik) ;
- les noms des sourates dans `hifz/src/data/surah_names.json` (chinois, hindi, bengali, russe) : erreurs ou variantes plus courantes.

Format : **Langue | Clé ou fichier | Texte actuel | Problème | Correction proposée | Gravité (bloquant / gênant / détail)**. Dis franchement pour quelles langues ton jugement est fiable et pour lesquelles il ne l'est pas.

### D. Code et produit
- Bugs ou risques dans `hifz/src/assets/app.js`, notamment la visionneuse du mushaf (`openMushaf`), les pluriels (fonction `T`) et le menu des langues (`LANG_SCRIPT` dans `build.py`).
- Accessibilité de la visionneuse : focus, clavier, lecteurs d'écran.
- Ce qui manque pour qu'un parent revienne chaque jour.

### E. Référence coranique et droits
- Lis `REFERENCE_CORAN.md`. La règle « aucun texte coranique généré par IA, la source officielle seulement » est-elle bien formulée et applicable aux vidéos Sakina Kids ?
- La page du Complexe autorise l'usage « dans les applications, programmes éducatifs et sites web ». Notre usage (pages affichées, non modifiées, avec mention) te paraît-il couvert ? Que faut-il demander par écrit au Complexe avant tout usage payant ?

### F. Juridique (France)
Les mentions légales en mode « particulier » (éditeur anonyme, LCEN art. 1-1, II) sont-elles correctes pour un site gratuit ? Que change le premier euro de dons ?

## 4. Format de ta réponse
1. Résumé en 5 lignes.
2. Parties A à F, avec les tableaux demandés.
3. Les 5 actions prioritaires, classées, chacune avec un critère de réussite vérifiable.
Pour chaque affirmation factuelle (loi, chiffre, usage religieux), indique ta source ou écris « non vérifié ».

## 5. Contenu du dossier
| Chemin | Contenu |
|---|---|
| `BRIEF_CHATGPT_V2.md` | Ce document |
| `RESULTATS_TESTS.md` | Sortie complète des 53 tests |
| `captures/` | Captures d'écran : 10 langues, menu, visionneuse du mushaf, images d'aperçu |
| `CLAUDE.md`, `REFERENCE_CORAN.md` | Règles permanentes et référence coranique |
| `hifz/build.py`, `hifz/config.json` | Générateur et réglages |
| `hifz/src/i18n/*.json` | Textes des 10 langues |
| `hifz/src/pages/<langue>/` | À propos, Confidentialité, Mentions légales |
| `hifz/src/data/surah_names.json` | Noms des sourates en chinois, hindi, bengali, russe |
| `hifz/src/assets/app.js`, `style.css` | Le carnet (JavaScript, CSS) |
| `hifz/src/mushaf/` | 3 pages d'exemple (001, 582, 604) sur 604 |
| `hifz/apercu/*.html` | Le site complet, une page autonome par langue (à ouvrir dans un navigateur) |
| `hifz/README.md`, `hifz/TRADUCTIONS.md` | État du projet, plan de relecture |
| `hifz/pilote/` | Workflow du pilote, messages, questionnaires, monétisation |
| `hifz/publication/PUBLIER.md` | Guide de mise en ligne |
| `tests/` | Scripts de test Playwright |
