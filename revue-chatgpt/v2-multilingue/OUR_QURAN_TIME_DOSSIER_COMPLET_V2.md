# Our Quran Time, dossier complet v2 (24/11/2026)

Fichier unique destiné à ChatGPT pour une revue indépendante et une comparaison avec les choix de Claude. Il contient le brief, toute la documentation, les textes des 10 langues, le code source complet et les résultats des tests. Seuls les fichiers binaires (604 pages du mushaf, icônes, captures d’écran) sont absents : ils sont dans `dossier-v2-chatgpt.zip`.

**Commence par la section 1 (le brief) et réponds dans l’ordre qu’elle demande.**

## Sommaire

1. Brief et questions pour ChatGPT
2. Règles permanentes du dépôt (CLAUDE.md)
3. Référence coranique (REFERENCE_CORAN.md)
4. État du projet (README)
5. Workflow de monétisation
6. Traductions : état et relecture
7. Guide de mise en ligne
8. Pilote : 1-WORKFLOW.md
9. Pilote : 2-MESSAGES.md
10. Pilote : 3-QUESTIONNAIRES.md
11. Pilote : tableau de suivi
12. Résultats des tests (53 contrôles)
13. Textes du carnet, anglais (en.json)
14. Textes du carnet, chinois (zh.json)
15. Textes du carnet, hindi (hi.json)
16. Textes du carnet, espagnol (es.json)
17. Textes du carnet, arabe (ar.json)
18. Textes du carnet, français (fr.json)
19. Textes du carnet, bengali (bn.json)
20. Textes du carnet, portugais (pt.json)
21. Textes du carnet, russe (ru.json)
22. Textes du carnet, indonésien (id.json)
23. Noms des sourates en écriture locale (zh, hi, bn, ru)
24. Page about, anglais
25. Page privacy, anglais
26. Page legal, anglais
27. Page about, chinois
28. Page privacy, chinois
29. Page legal, chinois
30. Page about, hindi
31. Page privacy, hindi
32. Page legal, hindi
33. Page about, espagnol
34. Page privacy, espagnol
35. Page legal, espagnol
36. Page about, arabe
37. Page privacy, arabe
38. Page legal, arabe
39. Page about, français
40. Page privacy, français
41. Page legal, français
42. Page about, bengali
43. Page privacy, bengali
44. Page legal, bengali
45. Page about, portugais
46. Page privacy, portugais
47. Page legal, portugais
48. Page about, russe
49. Page privacy, russe
50. Page legal, russe
51. Page about, indonésien
52. Page privacy, indonésien
53. Page legal, indonésien
54. Page 404 (anglais)
55. Gabarit de page (layout.html)
56. Gabarit du carnet (app.html)
57. Réglages (config.json)
58. Générateur du site (build.py)
59. Le carnet (app.js)
60. Styles (style.css)
61. Conversion du mushaf officiel (render_mushaf.py)
62. Recadrage des pages (trim_mushaf.py)
63. Tests : scénarios du carnet (pilot_ml.js)
64. Tests : contrôles multilingues (ml.js)
65. Tests : contrôles d’affichage (ml2.js)

---

## 1. Brief et questions pour ChatGPT

*Fichier : `revue-chatgpt/v2-multilingue/BRIEF_CHATGPT_V2.md`*

## Our Quran Time, version 2 : dossier de revue pour ChatGPT

Tu reçois le dossier complet d'un site web, préparé par Claude, pour une **revue indépendante et une comparaison**. Sois critique et précis. Ne valide rien par politesse.

### 1. Le projet en bref
- **Our Quran Time** : un carnet gratuit qui aide les parents à faire mémoriser le Coran (hifz) à leurs enfants. Chaque jour, il donne le passage nouveau, la révision récente et la révision ancienne, calculés d'après ce que l'enfant a vraiment récité. Pas de compte, pas de serveur : tout reste sur le téléphone.
- Site statique (Python, sans dépendance) : `hifz/build.py` génère `dist/`, qui sera hébergé sur Cloudflare Pages, à l'adresse prévue `ourqurantime.com`.
- Pilote prévu avec 10 familles francophones en décembre 2026 ou janvier 2027.

### 2. Ce qui a changé depuis ta revue précédente (v1)
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

### 3. Ce que je te demande, dans cet ordre

#### A. Avant de lire `5-MONETISATION.md` : ta propre recommandation
Comment ce produit peut-il générer des revenus sans trahir la confiance des familles musulmanes ? Donne ton plan, avec le calendrier et les conditions de passage d'une étape à l'autre. Ne lis le plan de Claude qu'ensuite.

#### B. Comparaison avec le plan de Claude
Tableau : **Point | Claude | Toi | Verdict (qui a raison et pourquoi)**. Couvre au minimum :
- publicité oui ou non ;
- dons : association ou micro-entreprise ;
- espace enseignant payant ;
- produits imprimés ;
- Ramadan 2027 ;
- critères go / no-go du pilote ;
- usage commercial des pages du mushaf.

#### C. Traductions (le plus important pour la suite)
Pour chaque langue que tu maîtrises bien, lis `hifz/src/i18n/<langue>.json` et `hifz/src/pages/<langue>/`. Signale :
- les phrases qui ne sonnent pas naturelles pour un parent natif, avec ta correction ;
- les **termes religieux** mal choisis : sabaq, révision, récité, mushaf, verset, juz, formules (alhamdulillah, barakAllahu fik) ;
- les noms des sourates dans `hifz/src/data/surah_names.json` (chinois, hindi, bengali, russe) : erreurs ou variantes plus courantes.

Format : **Langue | Clé ou fichier | Texte actuel | Problème | Correction proposée | Gravité (bloquant / gênant / détail)**. Dis franchement pour quelles langues ton jugement est fiable et pour lesquelles il ne l'est pas.

#### D. Code et produit
- Bugs ou risques dans `hifz/src/assets/app.js`, notamment la visionneuse du mushaf (`openMushaf`), les pluriels (fonction `T`) et le menu des langues (`LANG_SCRIPT` dans `build.py`).
- Accessibilité de la visionneuse : focus, clavier, lecteurs d'écran.
- Ce qui manque pour qu'un parent revienne chaque jour.

#### E. Référence coranique et droits
- Lis `REFERENCE_CORAN.md`. La règle « aucun texte coranique généré par IA, la source officielle seulement » est-elle bien formulée et applicable aux vidéos Sakina Kids ?
- La page du Complexe autorise l'usage « dans les applications, programmes éducatifs et sites web ». Notre usage (pages affichées, non modifiées, avec mention) te paraît-il couvert ? Que faut-il demander par écrit au Complexe avant tout usage payant ?

#### F. Juridique (France)
Les mentions légales en mode « particulier » (éditeur anonyme, LCEN art. 1-1, II) sont-elles correctes pour un site gratuit ? Que change le premier euro de dons ?

### 4. Format de ta réponse
1. Résumé en 5 lignes.
2. Parties A à F, avec les tableaux demandés.
3. Les 5 actions prioritaires, classées, chacune avec un critère de réussite vérifiable.
Pour chaque affirmation factuelle (loi, chiffre, usage religieux), indique ta source ou écris « non vérifié ».

### 5. Contenu du dossier
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

---

## 2. Règles permanentes du dépôt (CLAUDE.md)

*Fichier : `CLAUDE.md`*

## Règles permanentes du dépôt

### Coran : source de référence unique
Pour tout contenu coranique, dans **tous les projets** (Our Quran Time, Sakina Kids, Sakina, vidéos, livrets, applis) :

- **Référence** : le Mushaf de Médine, lecture **Hafs ʿan ʿĀṣim**, imprimé par le **Complexe du Roi Fahd pour l'impression du Saint Coran** (مجمع الملك فهد لطباعة المصحف الشريف), https://qurancomplex.gov.sa/mushaf-printing
  - 604 pages, 6 236 versets (comptage koufi). Numéros de versets, pages, juz : ceux de ce mushaf.
  - Fichier officiel : `1441-mushaf-hafs-ai.zip` (604 pages vectorielles, 423,3 Mo), SHA-256 `C2FA8D93A7C4F689B58EB32756E1AE56CD1B7CE4826F63E09723BE8B092224FB` (vérifiée le 24/11/2026).
- **Texte arabe** : ne jamais le retaper, le reformuler ni le générer de mémoire. L'image ou le texte vient de la source officielle ; sinon, laisser un emplacement et le signaler.
- **Vérifier toute référence** (sourate, verset, page, juz) contre cette source avant de la publier. En cas de doute : le marquer « non vérifié ».
- **Traductions du sens** : toujours présentées comme « traduction du sens », jamais comme « le Coran ». Citer le traducteur.
- **Mention** à reproduire quand des pages du mushaf sont montrées : « Mushaf de Médine (Hafs) · Complexe du Roi Fahd pour l'impression du Saint Coran ».
- Détails, usages autorisés et points à vérifier : `REFERENCE_CORAN.md`.

### Rédaction
- Répondre en français ; distinguer ✅ établi / ⚠️ probable / ❓ spéculatif ; sourcer tout chiffre.
- Pas de nom de modèle d'IA dans les commits ni dans les fichiers publiés.

---

## 3. Référence coranique (REFERENCE_CORAN.md)

*Fichier : `REFERENCE_CORAN.md`*

## Référence de confiance pour le Coran

Décision d'Alaa du 24/11/2026 : le **Complexe du Roi Fahd pour l'impression du Saint Coran** est la source de référence pour le Coran et les contenus associés, **dans tous les projets** (Our Quran Time, Sakina Kids, Sakina…).

### 1. Ce que le Complexe publie (constaté sur son site le 24/11/2026)
Le site indique être en « lancement expérimental » (الإطلاق التجريبي) : l'offre peut évoluer.

| Ressource | État au 24/11/2026 | Usage chez nous |
|---|---|---|
| **Mushaf de Médine numérique, lecture Hafs**, 604 pages vectorielles (format AI, compatible PDF), zip de 423,3 Mo | ✅ Téléchargeable sur https://qurancomplex.gov.sa/mushaf-printing | Intégré dans Our Quran Time : les 604 pages, converties en images web |
| Polices Unicode du texte coranique (Hafs, Shuʿba, Warsh, Qālūn, al-Sūsī, al-Dūrī) | ⏳ « Bientôt » (قريباً) | À intégrer dès leur sortie, pour afficher le texte des versets |
| Applications Mushaf al-Madina (Hafs, Warsh) | ✅ App Store et Google Play | À recommander aux familles qui veulent tout le mushaf hors ligne |
| Traductions audio du sens, mushaf en braille, autres polices | ⏳ « Bientôt » | À surveiller |

### 2. Fichier officiel téléchargé
- Nom : `1441-mushaf-hafs-ai.zip`. Taille : 443 825 492 octets. Dernière modification annoncée par le serveur : 16/11/2026.
- Empreinte SHA-256 publiée par le Complexe : `C2FA8D93A7C4F689B58EB32756E1AE56CD1B7CE4826F63E09723BE8B092224FB`.
- ✅ **Empreinte recalculée après téléchargement le 24/11/2026 : identique.** Le fichier est intact et authentique.
- Contenu : 604 fichiers `NNN___Hafs39__DM.ai`, un par page, produits par le Complexe.
- Le zip (423 Mo) n'est pas conservé dans le dépôt. Pour le retélécharger et le reconvertir : `hifz/tools/render_mushaf.py`, puis `hifz/tools/trim_mushaf.py`.

### 3. Autorisation d'usage (texte du Complexe, page « mushaf-printing »)
> « وقد تم ولله الحمد اعتماد نشر هذا الإنتاج الرقمي المبارك لجميع عموم المسلمين لوجه الله تعالى، ليستفاد منه في الكثير من التطبيقات الحاسوبية، والبرامج التعليمية، والمواقع الإلكترونية المختلفة »

Traduction : la publication de cette production numérique a été approuvée, pour tous les musulmans et pour l'agrément d'Allah, afin qu'elle serve dans les applications informatiques, les programmes éducatifs et les sites web.

- ✅ L'usage dans un site éducatif gratuit est explicitement prévu.
- ⚠️ **Non précisé sur la page** : l'usage commercial (produit payant, publicité) et une éventuelle obligation de mention. Avant toute version payante qui inclut ces pages, écrire au Complexe pour obtenir une confirmation écrite. En attendant, nous citons toujours la source, sans jamais modifier le contenu des pages : seuls la résolution et le recadrage des marges blanches changent.

### 4. Contrôle de cohérence effectué
Les données de découpage du carnet (bibliothèque quran-meta) ont été comparées aux pages officielles. Concordance sur les pages contrôlées :
- p. 1 : Al-Fātiḥa 1–7 ; p. 2 : Al-Baqara 1–5 ; p. 151 : Al-Aʿrāf 1–11 ; p. 377 : An-Naml 1–13 ; p. 562 : Al-Mulk 1–12 ; p. 582 : An-Nabaʾ 1–30 ; p. 604 : Al-Ikhlāṣ 1 → An-Nās 6.

### 5. Règles pour tous les projets
1. Ne jamais écrire, recopier ni générer le texte arabe du Coran de mémoire, ni par une IA. Il doit venir d'une source officielle.
2. Toute référence (sourate, verset, page, juz) se vérifie contre le Mushaf de Médine (Hafs).
3. Une traduction est toujours une « traduction du sens », avec le nom du traducteur.
4. Mention à afficher avec les pages : « Mushaf de Médine (Hafs) · Complexe du Roi Fahd pour l'impression du Saint Coran ».
5. Dans les vidéos (Sakina Kids), un verset montré à l'écran est une capture de la page officielle, ou un texte issu de la police officielle quand elle sera publiée.

### 6. À coller dans les skills Sakina (sakina-batch-format, sakina-prompt-library, sakina-qa-protocol)
Ces skills sont dans ton compte Claude, pas dans ce dépôt : je ne peux pas les modifier d'ici. Ajoute ce bloc dans chacun :

```
### Référence Coran (obligatoire)
Source unique : Mushaf de Médine, lecture Hafs ʿan ʿĀṣim, Complexe du Roi Fahd (qurancomplex.gov.sa/mushaf-printing), 604 pages, 6 236 versets.
- Aucun texte arabe coranique écrit de mémoire ni généré par IA (VEO, ChatGPT Image, ElevenLabs compris) : capture de la page officielle ou texte de la police officielle.
- Chaque référence sourate:verset est vérifiée contre ce mushaf avant production.
- QA : refuser tout épisode dont un verset affiché ou récité n'a pas été vérifié contre la source.
```

---

## 4. État du projet (README)

*Fichier : `hifz/README.md`*

## Our Quran Time — carnet de mémorisation du Coran pour les familles (version pilote)

**Aperçu en ligne (privé, version française) :** https://claude.ai/artifact/79K9MCZ99eTHYjLTpMs5Er

### Où trouver quoi
| Besoin | Fichier |
|---|---|
| Lancer le pilote pas à pas | **`pilote/1-WORKFLOW.md`** |
| Messages prêts à copier (familles, enseignants, vidéos) | `pilote/2-MESSAGES.md` |
| Questionnaires J7 / J14 / enseignants | `pilote/3-QUESTIONNAIRES.md` |
| Tableau de suivi (sans prénoms) | `pilote/4-suivi-pilote.csv` |
| **Publier le site (guide pas à pas, 45 min)** | **`publication/PUBLIER.md`** |
| Le site prêt à téléverser | `publication/ourqurantime-site.zip` (56 Mo, fourni à part ; `python3 build.py --zip` pour le refaire) |
| Réglages (nom, domaine, éditeur, langues, liens d'écoute) | `config.json`, puis `python3 build.py` et refaire le zip |

### Prêt à publier (24/11/2026)
- **10 langues** (top 10 mondial, Ethnologue 2025) : anglais à la racine, puis `/zh/` `/hi/` `/es/` `/ar/` `/fr/` `/bn/` `/pt/` `/ru/` `/id/`. Menu 🌐 dans l'en-tête : tout le site change de langue et le plan de l'enfant suit. Bandeau discret qui propose la langue du téléphone, seulement sur l'accueil anglais. Arabe de droite à gauche ; noms des sourates dans l'écriture locale en chinois, hindi, bengali et russe ; pluriels et chiffres propres à chaque langue. Relecture par des locuteurs natifs : voir `TRADUCTIONS.md`.
- **Mushaf de Médine officiel** (Complexe du Roi Fahd, Hafs) : les 604 pages sont intégrées. Le bouton « 📖 Mushaf p. N » ouvre la page exacte du passage du jour. Source et contrôles : `../REFERENCE_CORAN.md`.
- Domaine `ourqurantime.com` : non enregistré le 24/11 (registre .com de Verisign, réponse « introuvable »). À acheter.
- Mentions légales en mode « particulier » dans les 10 langues. À passer en « professionnel » dès le premier revenu (`editor_mode` dans `config.json`).
- Icônes, un manifeste par langue (l'icône d'écran d'accueil rouvre la bonne langue), images d'aperçu WhatsApp dans les 10 langues, en-têtes de sécurité, sitemap, hreflang.
- Tests : 18 scénarios du carnet + 32 contrôles multilingues + 3 contrôles d'affichage, tous réussis (iPhone SE et iPhone 13).
- Monétisation : `pilote/5-MONETISATION.md`.

### Le produit
Chaque jour, le parent voit la séance de son enfant :
- **Nouveau** : quelques versets, sans jamais mélanger deux sourates ;
- **Révision récente** : les passages des dernières séances ;
- **Révision ancienne** : des sourates déjà connues, à tour de rôle.

Le parent touche **Récité ✓** ou **À revoir** (le passage revient à la séance suivante), **C'est bon** ou **À retravailler** pour les révisions, ou **Reporter la séance**.

Le reste :
- Le carnet **suit les versets réellement récités**, pas le calendrier. Les dates ne sont que des estimations recalculées chaque jour.
- **Séance manquée** : un message bienveillant, puis la reprise là où l'enfant en était. Rien n'est marqué « terminé » par erreur.
- **Choix des sourates** : Juz ʿAmma complet, les 10 dernières, Al-Fatiha et les 3 Qul, ou choix libre. Les sourates déjà connues sont seulement révisées. Si tout est connu, il reste un parcours de révision seule.
- **Rythme** : soit un nombre de versets par séance, soit une date de fin. Dans ce cas, le carnet calcule la portion en tenant compte des limites de sourates, et prévient si l'objectif est impossible.
- **Plusieurs enfants** sur le même téléphone, chacun avec sa progression.
- **Fiche de la semaine** sur une page A4 (imprimable), ou copiée en texte pour l'enseignant via WhatsApp.
- **Rappel dans l'agenda**, les jours de séance, à l'heure choisie.
- **Lien de sauvegarde** pour changer de téléphone. Il ne contient pas le prénom de l'enfant.
- **Confidentialité** : aucun compte, aucun serveur, tout reste sur le téléphone. Le prénom est facultatif.
- **Langues** : français (racine `/`) et anglais (`/en/`). L'arabe, l'ourdou, l'indonésien et le turc sont en pause : leurs fichiers ne couvrent pas les nouveaux textes et doivent être relus par des natifs.
- **Écoute** : liens vers Quran.com par défaut. Pour utiliser d'autres récitations, remplir `listen` dans `config.json`, par exemple `"114": "https://www.youtube.com/watch?v=..."`.

### Validation (navigateur, dates figées, 18 scénarios, tous réussis)
- Coche conservée après un changement de rythme (le verset 1 reste acquis, le passage suivant devient 2 à 4).
- Séances passées non faites : signalées, jamais comptées comme réussies.
- « Reporter » décale la fin estimée ; « À revoir » fait revenir le passage.
- Date cible exacte (sourates 114 à 112 avant le 26/11 → 5 versets par séance) ; objectif impossible signalé.
- Révision seule, et révision qui continue après la dernière leçon.
- Fiche : 7 jours, texte pour l'enseignant, une seule page A4 à l'impression (PDF dans `apercus/`).
- Deux enfants séparés, lien de sauvegarde importé sans prénom, rappel d'agenda récurrent.
- Téléphone en 390 px sans débordement, français et anglais sans clé non traduite, aucune erreur JavaScript.

### Données
- Découpage des sourates et des versets (lecture Hafs) : `quran-meta` 7.0.0 (MIT).
- Noms des sourates : `quran-json` 3.1.2 (**CC BY-SA 4.0** : c'est le fichier de licence qui fait foi).
- Crédits sur la page À propos.

### En pause jusqu'au bilan du pilote
Pages « How to memorize Surah X » (`"surah_pages": false`), carte de partage publique, publicité, langues autres que le français et l'anglais, mode « lignes du mushaf ».

---

## 5. Workflow de monétisation

*Fichier : `hifz/pilote/5-MONETISATION.md`*

## Our Quran Time : workflow pour intégrer des revenus

### 1. Diagnostic
- ✅ Le produit existe, il est publiable et gratuit, en 10 langues, avec le mushaf officiel. Coût fixe : environ 10-12 € par an (domaine) ; hébergement gratuit.
- ✅ Il n'y a **ni compte, ni serveur, ni e-mail collecté**. C'est un atout pour la confiance et la vie privée, mais aussi le principal frein à la monétisation : on ne connaît pas ses utilisateurs et on ne peut pas les recontacter.
- ❓ **Aucune preuve d'usage pour l'instant.** Le pilote (10 familles) doit dire si les parents reviennent à J7 et à J14, et si les enseignants s'en servent. Sans cette preuve, toute monétisation est prématurée.
- ✅ L'outil sert un public religieux qui attend de la sobriété. Une monétisation mal choisie (publicité intrusive, Coran derrière un mur payant) détruirait la confiance, et c'est précisément elle qui fait la valeur du produit.

### 2. Risques et angles morts
1. **Publicité (AdSense)** : c'est la voie la plus facile à brancher (prévue dans `config.json`), mais à éviter au départ.
   - On ne contrôle pas parfaitement les annonces affichées (musique, images, jeux d'argent) à côté de pages du Coran destinées à des enfants.
   - Le revenu par visiteur d'un site de niche à faible trafic est très faible : je n'ai pas de chiffre fiable, donc je n'en donne pas.
   - Il faudrait aussi un bandeau de consentement certifié en Europe.
2. **Usage commercial des pages du mushaf** : la page du Complexe du Roi Fahd autorise les applications, programmes éducatifs et sites web, mais **ne dit rien de l'usage commercial**. Aucun produit payant ne doit contenir ces pages sans confirmation écrite du Complexe.
3. **Dons à titre personnel** : leur traitement fiscal en France est à vérifier (micro-entreprise ou association loi 1901 ?). Une association est souvent mieux adaptée pour collecter des dons, mais seul un expert-comptable ou l'URSSAF peut trancher pour ton cas.
4. **Mentions légales** : dès le premier euro, le mode « particulier » n'est plus valable. Il faut passer en « professionnel » (nom, statut, SIRET, adresse publiés).
5. **Données d'enfants** : un espace enseignant avec comptes signifie des données de mineurs sur un serveur. Cela exige consentement parental, RGPD renforcé et sécurité. C'est un vrai chantier, pas un réglage.
6. **Traductions non relues** : faire de la promotion payante dans une langue non relue, c'est risquer une erreur visible sur des termes religieux.

### 3. Options
| | Prudente | **Recommandée** | Ambitieuse |
|---|---|---|---|
| Principe | Dons seulement | Dons, puis « espace enseignant » payant validé par le pilote | Plateforme écoles + produits imprimés + partenariats |
| Revenu | Faible, irrégulier | Récurrent si les écoles adhèrent | Le plus élevé, mais le plus long |
| Effort | 1 heure | 2-3 mois de développement après validation | 6 mois et plus, statut et partenaires |
| Risque pour la confiance | Nul | Faible : les familles restent gratuites | Moyen : dispersion |
| Ce qui reste gratuit | Tout | Tout le carnet familial | Le carnet familial |

**Pourquoi l'option recommandée.** La valeur payante la plus crédible n'est pas chez le parent, qui trouve des outils gratuits, mais chez l'**enseignant ou l'école**. Un enseignant qui suit 15 à 30 élèves gagne un temps réel avec un tableau de bord qui reçoit les fiches de la semaine. Le pilote teste déjà les enseignants : c'est le bon endroit pour valider cette hypothèse avant de coder quoi que ce soit.

### 4. Workflow, dans l'ordre (le « quand » compte autant que le « quoi »)

#### Maintenant → fin du pilote (20 décembre, ou 17 janvier si prétest) : on ne monétise pas, on mesure
1. Publier le site (guide `publication/PUBLIER.md`).
2. Faire relire **le français** (pilote), puis 1 ou 2 langues prioritaires (voir § 5).
3. Ajouter 2 questions au questionnaire J14 :
   - aux familles : « Si ce carnet disparaissait demain, seriez-vous : très déçu / un peu / pas du tout ? » (mesure d'attachement, plus fiable qu'une question de prix) ;
   - aux enseignants : « Un espace où vous recevez automatiquement la fiche de chaque élève vous ferait-il gagner du temps ? Votre école paierait-elle pour cela ? Combien par mois et par classe ? »
4. Activer Cloudflare Web Analytics (sans cookies) pour connaître les visites par langue.

#### Bilan du pilote : décision chiffrée (go / no-go)
- **Go** si : au moins 6 familles sur 10 utilisent encore le carnet à J14, **et** au moins 2 enseignants disent que leur école paierait.
- Sinon : améliorer le produit et refaire un pilote. Pas de monétisation.

#### Janvier 2027 : premier revenu, sans rien abîmer
5. **Statut** : rendez-vous avec un expert-comptable pour choisir entre micro-entreprise et association. Décider avant d'encaisser.
6. **Passer les mentions légales en mode « professionnel »** : remplir `config.json`, puis `python3 build.py --zip` et redéployer.
7. **Bouton « Soutenir le projet »** : déjà prévu dans le pied de page (`support_url` dans `config.json`), traduit dans les 10 langues. Plateformes possibles : LaunchGood (dons de la communauté musulmane), Ko-fi ou Stripe. Comparer les frais au moment de choisir (⚠️ non vérifiés ici).
8. **Liste d'attente « Espace enseignant »** : une page simple « Bientôt : recevez les fiches de vos élèves », avec formulaire d'e-mail. C'est un test de demande avant de développer.

#### Février-mars 2027 : le Ramadan, fenêtre majeure
- ⚠️ Le Ramadan 1448 devrait commencer vers le 8 février 2027 (date astronomique approximative, à confirmer). C'est la période de l'année où l'engagement autour du Coran est le plus fort.
9. Campagne « Défi hifz du Ramadan en famille », dans les langues relues : messages pour les groupes de parents et les mosquées, carte de partage « sourate apprise » déjà intégrée.
10. Proposer à des mosquées ou associations de **parrainer** le projet pendant le Ramadan (« carnet offert grâce à… »), sans publicité dans le carnet.

#### Avril-juin 2027 : l'espace enseignant (seulement si le go est validé)
11. Version 1 minimale : l'enseignant crée une classe et reçoit un code ; le parent colle le code et la fiche part automatiquement ; tableau de la semaine pour toute la classe.
12. Technique : Cloudflare Workers + base D1, sur la même infrastructure. Données minimales : prénom ou pseudonyme et versets, sans nom de famille.
13. RGPD : consentement parental, politique de confidentialité mise à jour, suppression à la demande. C'est le point le plus lourd.
14. Tarif : à fixer d'après les réponses des enseignants (§ 4, étape 3), avec une période d'essai gratuite pour les premières écoles.

#### Plus tard, en réserve
- Carnet de hifz **imprimé** pour enfants (impression à la demande), sans pages du mushaf tant que l'usage commercial n'est pas confirmé par écrit.
- Affiliation (mushafs, livres jeunesse), seulement dans les pages d'information, jamais dans le carnet.
- Publicité : non, sauf changement d'avis argumenté une fois le trafic connu.

### 5. Langues à faire relire en premier, pour la croissance
Ordre conseillé, selon le nombre de musulmans concernés et la facilité à trouver des relecteurs (⚠️ jugement, pas une étude) :
1. **Français** (pilote) ;
2. **Arabe** ;
3. **Indonésien** et **bengali** : deux des plus grandes populations musulmanes ;
4. **Anglais** (diaspora, Royaume-Uni, États-Unis).

Les autres langues restent en ligne, mais sans promotion tant qu'elles n'ont pas été relues.

### 6. Ordre de grandeur, sans chiffre inventé
Revenu des dons = familles actives par mois × part qui donne × montant moyen.
Exemple purement hypothétique : 1 000 familles actives × 1 % × 5 € = 50 € par mois.
Conclusion : **les dons couvrent les frais, ils ne font pas un revenu.** Le revenu viendra des écoles, ou ne viendra pas de ce produit seul.

### 7. Prochaine étape concrète
**Acheter `ourqurantime.com` et publier le site (guide `publication/PUBLIER.md`).** Aucune monétisation n'a de sens avant que les familles du pilote l'utilisent.

---

## 6. Traductions : état et relecture

*Fichier : `hifz/TRADUCTIONS.md`*

## Traductions : état et relecture

### État (24/11/2026)
- Les 10 langues sont complètes : carnet, accueil, À propos, Confidentialité, Mentions légales, visionneuse du mushaf, images d'aperçu WhatsApp. Le générateur refuse de construire le site s'il manque une seule phrase dans une langue.
- Les textes ont été **rédigés directement dans chaque langue**, pas traduits mot à mot, avec le vocabulaire des écoles de hifz du pays : *ziyadah* et *muraja'ah* en indonésien, *amparā*, *sabaq*, *sātsabaq* et *āmukhtā* en bengali, *sabaq*, *sabqī* et *manzil* en hindi, « حفظ جديد / مراجعة قريبة / مراجعة بعيدة » en arabe, noms des sourates de Ma Jian en chinois.
- ⚠️ **Aucune langue n'a encore été relue par un locuteur natif.** C'est le niveau d'un bon rédacteur, pas celui d'une validation. Avant de promouvoir le site dans une langue, faire relire cette langue (30 à 45 minutes) par une personne native, idéalement un parent ou un enseignant de Coran.

### Qui fait relire quoi
| Langue | Public visé | Points à faire valider en priorité |
|---|---|---|
| Arabe | Monde arabe, Maghreb | Termes « حفظ جديد / مراجعة قريبة / مراجعة بعيدة » ; tutoiement au masculin générique ; chiffres latins (choix actuel) ou indo-arabes ? |
| Ourdou | (non publié) | Fichier archivé dans `src/i18n/archive-v1/` : à refaire si l'ourdou est ajouté |
| Bengali | Bangladesh, Bengale-Occidental | Noms des sourates en bengali ; « নতুন সবক / সাম্প্রতিক রিভিশন / পুরোনো রিভিশন » ; chiffres bengalis |
| Hindi | Musulmans de l'Inde du Nord | Noms des sourates en devanagari ; registre hindi/ourdou (सबक़, दोहराई, उस्ताद) |
| Indonésien | Indonésie, Malaisie (en partie) | *Lancar / Ulangi / setoran / muraja'ah* ; « Agenda hafalan » |
| Chinois | Musulmans hui, diaspora | Noms des sourates de Ma Jian (开端章…), « 节 » pour verset, « 感赞真主 » |
| Russe | Russie, Asie centrale, Caucase | Translittérations (Аль-Фатиха…) ; pluriels ; « Рассказано » pour « récité » |
| Espagnol | Amérique latine, Espagne | « aleya » ou « aya » ; tutoiement |
| Portugais | Brésil d'abord | « surata / versículo » (usage de la traduction d'Helmi Nasr) ; « você » |
| Français, anglais | Pilote | Déjà relus pendant la conception |

### Fichiers à donner au relecteur
- Textes du carnet : `src/i18n/<langue>.json` (sections `ui`, `app`, `home`, `legal`).
- Pages : `src/pages/<langue>/about.html`, `privacy.html`, `legal.html`.
- Noms des sourates : `src/data/surah_names.json` (chinois, hindi, bengali, russe).
- Le plus simple pour un relecteur : ouvrir le site dans sa langue sur son téléphone, créer un plan, puis noter ce qui sonne faux, avec une capture d'écran.

### Message type au relecteur (à adapter)
> Assalamu alaykum, je lance un carnet gratuit pour aider les parents à faire mémoriser le Coran à leurs enfants. Il existe en [langue]. Pourriez-vous l'ouvrir sur votre téléphone (ourqurantime.com/[code]/), créer un plan d'essai, et me signaler en 30 minutes tout ce qui ne sonne pas naturel, surtout les termes religieux ? Une capture d'écran suffit. Jazakum Allahu khayran.

---

## 7. Guide de mise en ligne

*Fichier : `hifz/publication/PUBLIER.md`*

## Publier Our Quran Time — guide pas à pas

**Durée** : environ 45 minutes. **Coût** : le prix du domaine, environ 10-12 € par an (⚠️ prix exact affiché par Cloudflare au moment de l'achat). L'hébergement est gratuit.
**À préparer** : une carte bancaire et ton adresse e-mail personnelle.
**Fichier à envoyer** : `ourqurantime-site.zip` (56 Mo, 675 fichiers). C'est le site complet : 10 langues, et les 604 pages du Mushaf de Médine du Complexe du Roi Fahd. Il est fourni à part (trop lourd pour le dépôt) ; pour le refaire : `python3 build.py --zip`.

**Adresses** : l'anglais est à la racine (`ourqurantime.com`), les autres langues ont leur dossier : `/fr/`, `/ar/`, `/zh/`, `/hi/`, `/es/`, `/bn/`, `/pt/`, `/ru/`, `/id/`. **Pour les familles du pilote, partage `https://ourqurantime.com/fr/`.**

> Vérification du 24 novembre 2026 : **ourqurantime.com n'était pas enregistré**. Le registre officiel des .com (Verisign) répondait « introuvable », alors qu'il répond normalement pour un domaine existant. Achète-le rapidement : un domaine libre peut partir à tout moment.
>
> ⚠️ Les noms des menus Cloudflare ci-dessous datent de fin 2026 et peuvent légèrement changer. Cherche le libellé le plus proche.

---

### Étape 1 — Créer le compte Cloudflare (5 min)
1. Va sur **cloudflare.com**, clique sur **Sign up** et crée le compte avec ton e-mail personnel.
2. Confirme l'e-mail reçu.

Ce compte porte ton identité : c'est ce qui permet au site d'afficher des mentions légales sans ton adresse personnelle (voir « Mode éditeur » en bas de page).

### Étape 2 — Acheter le domaine (10 min)
1. Dans le tableau de bord : **Domain Registration → Register Domains**.
2. Cherche **ourqurantime.com**, puis **Purchase** pour 1 an. Active le renouvellement automatique.
3. Renseigne tes vraies coordonnées : elles sont obligatoires pour tout achat de domaine. Cloudflare les masque dans l'annuaire public des domaines.

### Étape 3 — Mettre le site en ligne (10 min)
1. **Workers & Pages → Create**, puis l'onglet **Pages**, puis **Upload assets** (téléversement direct).
2. Nom du projet : `ourqurantime`, puis **Create project**.
3. Dépose le fichier **`ourqurantime-site.zip`**, puis **Deploy site**.
4. Ouvre l'adresse provisoire affichée (du type `https://ourqurantime.pages.dev`) : le site doit apparaître.

⚠️ Limites annoncées par Cloudflare : 20 000 fichiers par site et 25 Mo par fichier ([documentation](https://developers.cloudflare.com/pages/platform/limits/)). Le zip reste bien en dessous (675 fichiers, 104 Ko maximum chacun). Si le glisser-déposer refuse quand même le zip, décompresse-le et dépose le **dossier** à la place.

### Étape 4 — Brancher le domaine (5 min, puis quelques minutes d'attente)
1. Dans le projet : **Custom domains → Set up a custom domain**.
2. Saisis `ourqurantime.com`, puis **Continue** et **Activate domain**. Les réglages DNS se font automatiquement, puisque le domaine est chez Cloudflare.
3. Recommence avec `www.ourqurantime.com`.
4. Le cadenas HTTPS s'active automatiquement. Compte de quelques minutes à quelques heures.

### Étape 5 — Créer l'adresse contact@ourqurantime.com (5 min)
1. Clique sur ton domaine, puis **Email → Email Routing → Get started**.
2. Crée l'adresse `contact`, avec comme destination ton e-mail personnel.
3. Clique sur le lien de vérification reçu, puis sur **Add records and enable**.
4. Teste en écrivant à `contact@ourqurantime.com` depuis une autre adresse. Le message doit arriver dans ta boîte personnelle.

### Étape 6 — Vérifier avant d'annoncer (10 min)
- [ ] `https://ourqurantime.com` s'ouvre en anglais ; `https://ourqurantime.com/fr/` en français.
- [ ] Bouton 🌐 en haut à droite → « العربية » : tout le site passe en arabe, de droite à gauche ; ton plan est toujours là.
- [ ] Sur ton téléphone (`/fr/`) : créer un plan « Al-Fatiha et les 3 Qul », puis toucher « Récité ».
- [ ] Toucher « 📖 Mushaf p. 1 » : la page officielle d'Al-Fatiha s'affiche ; glisser vers la droite pour passer à la page suivante.
- [ ] « Ajouter un rappel à l'agenda » : l'événement apparaît dans ton agenda.
- [ ] « Copier la fiche pour l'enseignant », puis la coller dans WhatsApp : c'est lisible.
- [ ] Sur un ordinateur, « Imprimer la fiche » : une seule page.
- [ ] Partager le lien du site dans WhatsApp : l'aperçu vert « Our Quran Time » s'affiche (WhatsApp peut mettre quelques minutes à le récupérer).
- [ ] Menu Partager du téléphone → « Sur l'écran d'accueil » : l'icône verte apparaît.
- [ ] Pied de page → **Mentions légales** : la mention « Site édité par un particulier… » et l'hébergeur Cloudflare apparaissent.

### Étape 7 (facultative) — Statistiques de visite sans cookies
Dans le projet Pages : **Metrics → Web Analytics → Enable**.
Cette mesure Cloudflare fonctionne sans cookies (⚠️ à confirmer au moment de l'activation). Tant que c'est le cas, aucun bandeau de consentement n'est nécessaire.

### Mettre à jour le site plus tard
Je te fournis un nouveau `ourqurantime-site.zip`. Dans le projet : **Create deployment** (ou « Create new deployment »), dépose le zip, puis **Save and deploy**.
Une ancienne version peut être restaurée en un clic depuis la liste des déploiements (**Rollback**).

---

### Mode éditeur (mentions légales)
Le site est configuré en **mode « particulier »**. Les mentions légales indiquent que le site est édité à titre non professionnel par une personne qui préserve son anonymat, avec l'hébergeur (Cloudflare) et l'e-mail de contact. C'est permis par l'**article 1-1, II de la LCEN** (anciennement article 6 ; ⚠️ texte consolidé à vérifier sur Légifrance), à condition d'avoir donné ton identité à l'hébergeur, ce que fait ton compte Cloudflare.

**Dès que le site rapporte quoi que ce soit** (dons, carnet payant, publicité, affiliation), ce n'est plus non professionnel. Envoie-moi alors ton nom, ton statut et ton SIRET (micro-entreprise), ton adresse et ton téléphone : je passe le site en mode « professionnel » (une ligne dans `config.json`) et je te fournis un nouveau zip.

---

## 8. Pilote : 1-WORKFLOW.md

*Fichier : `hifz/pilote/1-WORKFLOW.md`*

## Pilote Our Quran Time — déroulé complet

**Objectif du pilote** : savoir si des parents utilisent le carnet **plusieurs fois par semaine pendant 2 semaines** avec leur enfant, et s'ils reprennent après une séance manquée. Ce n'est pas un test de trafic ni de revenus.

**Format** : 10 familles (enfants de 5 à 12 ans environ qui apprennent Juz ʿAmma) et 2 enseignants, du **lundi 7 au dimanche 20 décembre 2026**, en français.

> ⚠️ Vacances scolaires de Noël en France : du 19 décembre 2026 au 4 janvier 2027 (à vérifier sur education.gouv.fr). Le pilote se termine juste avant, pendant que les routines familiales sont encore normales.

---

### Vue d'ensemble

| Partie | Période | Qui | Temps pour toi |
|---|---|---|---|
| 1. Mise en ligne | 24 → 27 nov. | Toi, avec Claude | ≈ 2 h |
| 2. Recrutement | 25 nov. → 4 déc. | Toi | ≈ 3-4 h |
| 3. Démarrage | lun. 7 déc. | Toi | ≈ 30 min |
| 4. Pilote | 7 → 20 déc. | Familles ; toi pour les messages | ≈ 15 min/jour au maximum |
| 5. Bilan et décision | 21 → 23 déc. | Toi, avec Claude | ≈ 2 h |
| 6. Après le pilote | janv. 2027 | Toi, avec Claude | selon la décision |

Coût : **≈ 10-15 € par an** (nom de domaine). L'hébergement Cloudflare Pages est gratuit (⚠️ conditions à revérifier au moment de l'inscription).

---

### Partie 1 — Mise en ligne (24 → 27 novembre)

Tout est prêt : le site complet est dans `publication/ourqurantime-site.zip`, et le guide clic par clic dans **`publication/PUBLIER.md`** (environ 45 min).

1. **Domaine** : `ourqurantime.com` était libre le 24/11 (vérifié auprès du registre officiel des .com). L'acheter tout de suite chez Cloudflare.
2. **Marque** : vérifier qu'aucune marque « QURAN TIME » ou « OUR QURAN TIME » n'est déposée (une appli iOS « Quran Time » existe) : [data.inpi.fr](https://data.inpi.fr) et la base de l'EUIPO (office des marques de l'Union européenne).
3. **Mentions légales** : mode « particulier ». Le site peut être publié sans ton adresse personnelle tant qu'il est gratuit et ne rapporte rien. Le passage en mode « professionnel » est expliqué dans `PUBLIER.md`.
4. **Publier** en suivant `PUBLIER.md` (compte Cloudflare, domaine, téléversement du zip, adresse `contact@`, vérifications).
5. Ajouter le site à l'écran d'accueil de ton téléphone : c'est ce que tu montreras aux familles.

### Partie 2 — Recrutement (25 novembre → 4 décembre)

- **Cible** : 10 familles, plus 2 ou 3 de réserve (certaines abandonnent avant de commencer). Les enfants apprennent ou veulent apprendre Juz ʿAmma. Les deux parents n'ont pas besoin de parler arabe.
- **2 enseignants** (madrasa, école du week-end, enseignant particulier) qui suivent au moins un des enfants.
- **Canaux, menés en parallèle** :
  1. **les enseignants d'abord** : chacun peut proposer le pilote à 3 à 5 familles de ses élèves ;
  2. **ton réseau personnel** ;
  3. **les groupes de parents** (WhatsApp, Facebook) et les mosquées ou écoles du week-end, avec l'accord de l'administrateur ou du responsable.

  Textes prêts dans `2-MESSAGES.md`. Vise 13 à 14 inscriptions pour obtenir 10 familles réellement confirmées.
- **Critère de démarrage, à trancher le vendredi 4 décembre** :
  - **10 familles confirmées ou plus** : le pilote démarre le lundi 7 décembre comme prévu. Les 2 enseignants restent l'objectif, pour recueillir leurs avis, mais ne bloquent pas le départ.
  - **Moins de 10** : semaine de prétest de prise en main du 7 au 13 décembre avec les familles déjà inscrites (création du plan, premières séances, blocages), recrutement poursuivi, puis pilote de 2 semaines **du 4 au 17 janvier 2027**, après les vacances de Noël. Le bilan tombe alors le 18-20 janvier, environ 3 semaines avant le Ramadan.
- **Organisation** :
  - Utilise une **liste de diffusion WhatsApp** ou une communauté avec un canal d'annonces, **pas un groupe** : dans un groupe, chaque participant voit les numéros des autres.
  - Donne à chaque famille un code (F01 à F12) dans `4-suivi-pilote.csv`. N'écris pas les prénoms des enfants dans le fichier.
- **Ce que tu dis clairement aux familles** :
  - c'est gratuit et bénévole ;
  - l'appli ne collecte aucune donnée (tout reste sur leur téléphone) ;
  - on leur demandera 2 avis courts (J7 et J14).

### Partie 3 — Démarrage (lundi 7 décembre)

1. Envoyer le message « Lancement » (`2-MESSAGES.md`, C) avec le lien et le guide en 3 étapes.
2. Envoyer aux enseignants le message dédié (H1).
3. Le soir, noter dans `4-suivi-pilote.csv` qui a confirmé avoir créé son plan. Une famille peut répondre simplement « ✅ ».

### Partie 4 — Pendant le pilote (7 → 20 décembre)

| Jour | Action (message prêt) | À noter dans le suivi |
|---|---|---|
| J1 lun. 7 | C. Lancement | plan créé oui/non |
| J3 mer. 9 | D. Point rapide : un blocage ? | blocages signalés |
| J7 dim. 13 | E. Mi-parcours + questionnaire court | séances semaine 1 (déclarées), réponses J7 |
| J7 dim. 13 | H2. Demander la fiche de la semaine aux enseignants | retour enseignant |
| J10 mer. 16 | F. Encouragement + « séance manquée ? on reprend » | reprises après absence |
| J14 dim. 20 | G. Fin + questionnaire final + merci | séances semaine 2, note, recommandation |
| J14 dim. 20 | H3. Bilan enseignants | avis sur les portions |

**Règle d'or** : ne relance pas une famille plus d'une fois par semaine en dehors de ces messages. Une absence de séance est **une donnée**, pas un échec à corriger.

### Partie 5 — Bilan et décision (21 → 23 décembre)

Remplir le tableau à partir du suivi et des questionnaires.

| Indicateur | Seuil (❓ proposé, à ajuster avant le pilote) |
|---|---|
| Familles actives en semaine 2 (≥ 3 séances déclarées) | **≥ 6 sur 10** |
| Familles qui ont repris après au moins une séance manquée | ≥ 50 % de celles concernées |
| Note « je continuerais à l'utiliser » | moyenne ≥ 7/10 |
| Avis des enseignants sur les portions et la fiche | « utile » pour au moins 1 sur 2 |

**Décision** :
- **GO** (seuils atteints) : préparer le lancement public de janvier (partie 6).
- **ITÉRER** (rétention entre 3 et 5 familles sur 10) : corriger les 3 problèmes les plus cités, puis retester 1 semaine avec les mêmes familles début janvier.
- **STOP / PIVOT** (2 familles ou moins) : les parents ne reviennent pas. C'est le rappel ou le format qui ne marche pas, pas l'algorithme. On en reparle avant d'investir plus.

Envoie-moi le suivi et les réponses : je fais l'analyse et la liste des corrections.

### Partie 6 — Après le pilote (janvier 2027)

1. Corrections issues du pilote.
2. Relecture de l'anglais (et de l'arabe si on l'ajoute) par des locuteurs natifs.
3. Lancement public **avant le Ramadan** (⚠️ début estimé vers le 8 février 2027, à confirmer) : enseignants partenaires, groupes de parents, réseaux sociaux du projet, Search Console.
4. Puis, seulement si l'usage se confirme :
   - le carnet guidé facultatif (exercices de révision, bilan hebdomadaire) ;
   - ensuite, une version pour les enseignants.

La publicité, la carte de partage et les pages par sourate restent en attente.

---

## 9. Pilote : 2-MESSAGES.md

*Fichier : `hifz/pilote/2-MESSAGES.md`*

## Messages prêts à copier — pilote Our Quran Time

Remplace `[LIEN]` par **`https://ourqurantime.com/fr/`** (version française ; la racine du site est en anglais) et `[DATE]` si besoin. Ton : simple, chaleureux, sans promesse excessive.

---

### A. Recrutement

#### A1. Post pour un groupe de parents ou une affichette (avec l'accord de l'administrateur ou du responsable)
> 🌙 **Parents, on a besoin de vous !**
> On teste un **carnet de hifz gratuit** qui dit chaque soir à votre enfant quoi apprendre et quoi réviser dans Juz ʿAmma.
> 🗓️ 2 semaines, du 7 au 20 décembre, 10 à 15 minutes par jour.
> 📱 Sur le téléphone, sans compte ni inscription, sans données collectées.
> 👉 Pour participer (10 familles), écrivez « HIFZ » à [ton numéro ou ton e-mail].

#### A2. Message WhatsApp direct à un parent
> Salam [prénom du parent] 🙂
> Je prépare un petit outil gratuit pour aider les enfants à apprendre Juz ʿAmma à la maison : chaque jour, il indique le nouveau passage et ce qu'il faut réviser, et il s'adapte si on rate un jour.
> Je cherche 10 familles pour le tester pendant 2 semaines (7-20 décembre), environ 10 minutes par jour. Tout reste sur votre téléphone, sans compte.
> Ça vous intéresserait ? Je vous enverrai le lien le 7 décembre in cha Allah.

#### A3. Message à un enseignant
> Salam [nom], j'espère que vous allez bien.
> Je teste avec quelques familles un carnet gratuit pour accompagner la mémorisation de Juz ʿAmma à la maison : nouveau passage, révision récente, révision ancienne, et une fiche de la semaine que les parents peuvent vous transmettre.
> Accepteriez-vous de jeter un œil aux réglages (taille des passages, révisions) avant le 7 décembre, puis de me donner votre avis sur les fiches de vos élèves participants ? Cela prendrait environ 20 minutes en tout. Votre regard d'enseignant m'est précieux.

---

### B. Confirmation d'inscription (dès qu'une famille dit oui)
> BarakAllahu fikum ! Vous êtes inscrits ✅
> Le 7 décembre, vous recevrez le lien et un mode d'emploi d'une minute.
> En bref : c'est gratuit, sans compte, et rien de ce que vous saisissez ne quitte votre téléphone. Je vous demanderai seulement deux avis très courts (le 13 et le 20 décembre).

---

### C. Lancement — lundi 7 décembre
> Salam alaykoum ! Le pilote commence aujourd'hui 🌙
> 👉 [LIEN]
> **En 3 étapes (1 minute)** :
> 1️⃣ Choisissez les sourates (par exemple « Juz ʿAmma complet »).
> 2️⃣ Cochez celles que votre enfant connaît déjà.
> 3️⃣ Choisissez les jours et le nombre de versets par séance (3, c'est bien pour commencer).
> Ensuite, chaque jour : écoutez le passage, faites réciter votre enfant, puis touchez **« Récité ✓ »** ou **« À revoir »**.
> 💡 Ajoutez le site à l'écran d'accueil de votre téléphone et touchez « Ajouter un rappel à l'agenda ».
> Répondez « ✅ » quand le plan est créé. Une question ? Écrivez-moi.

### D. Point rapide — mercredi 9 décembre
> Petit point de mi-semaine 🙂 Est-ce que tout fonctionne ? Si quelque chose bloque ou n'est pas clair, dites-le-moi en une phrase, ça m'aide beaucoup.

### E. Mi-parcours — dimanche 13 décembre
> Une semaine déjà, barakAllahu fikum ! 🌟
> Pouvez-vous répondre à **5 questions (2 minutes)** ? [LIEN DU QUESTIONNAIRE]
> Et si votre enfant a un enseignant, vous pouvez lui envoyer la fiche de la semaine : bouton « Copier la fiche pour l'enseignant », puis coller dans WhatsApp.

### F. Encouragement — mercredi 16 décembre
> Dernière ligne droite 💪 Rappel : si vous avez raté un ou plusieurs jours, **rien n'est perdu**. Le carnet reprend exactement là où vous en étiez. Même 5 minutes ce soir, c'est une victoire.

### G. Fin du pilote — dimanche 20 décembre
> Le pilote est terminé, merci infiniment pour votre aide 🤲
> Dernier service : **le questionnaire final (4 minutes)** [LIEN DU QUESTIONNAIRE]. Vos réponses décideront de la suite.
> Vous pouvez continuer à utiliser le carnet : votre progression reste sur votre téléphone.

---

### H. Enseignants

#### H1. Lancement
> Salam [nom], le pilote démarre aujourd'hui avec [nombre] de vos élèves. Les parents peuvent vous envoyer la « fiche de la semaine » : nouveau passage, révisions, et ce qui a été récité ou est à revoir. N'hésitez pas à leur dire si la taille des passages ne convient pas.

#### H2. Mi-parcours
> Avez-vous reçu des fiches ? Une remarque sur la taille des passages ou sur la révision ? Une phrase me suffit.

#### H3. Bilan
> Merci pour votre aide. Pouvez-vous répondre aux 6 questions enseignant (3 minutes) ? [LIEN DU QUESTIONNAIRE] Votre avis compte double pour la suite.

---

### I. Scripts vidéo de recrutement (TikTok / Reels / Shorts, 20 à 30 s)

#### I1. « Ce soir, on récite quoi ? »
- **0-3 s**, accroche face caméra ou voix off : « Ce soir, ton enfant doit réviser quoi exactement ? »
- **3-15 s**, capture d'écran : le bloc « Aujourd'hui ». Nouveau : Al-Masad, versets 4 à 5. Révision récente. Révision ancienne. On touche « Récité ✓ ».
- **15-25 s** : « Gratuit, sans compte, et si vous ratez un jour, il reprend là où vous en étiez. On cherche 10 familles pour le tester. »
- **Fin** : « Écrivez HIFZ en commentaire. »

#### I2. « La révision, c'est ce qui manque »
- **Accroche** : « Votre enfant apprend des sourates… et les oublie le mois suivant ? »
- **Corps** : les trois couleurs (nouveau, révision récente, révision ancienne) expliquées en 3 phrases, avec la capture.
- **Fin** : appel au pilote, comme I1.

---

## 10. Pilote : 3-QUESTIONNAIRES.md

*Fichier : `hifz/pilote/3-QUESTIONNAIRES.md`*

## Questionnaires du pilote

À créer dans Google Forms ou Tally (gratuit), ou à poser directement par WhatsApp.
Ne demande **ni nom ni prénom d'enfant** : seulement le code famille (F01 à F12) indiqué dans ton message.

---

### Q-J7 — Parents, mi-parcours (2 minutes)
1. Code famille : ____
2. Combien de séances avez-vous faites cette semaine ? (0 / 1 / 2 / 3 / 4 / 5 ou plus)
3. À quel moment de la journée, en général ? (matin / après l'école / soir / variable)
4. Quelle est la chose la plus pénible ou la moins claire jusqu'ici ? (réponse libre)
5. La taille des passages est… (trop petite / bien / trop grande)

### Q-J14 — Parents, bilan final (4 minutes)
1. Code famille : ____
2. Combien de séances avez-vous faites **la 2e semaine** ? (0 / 1 / 2 / 3 / 4 / 5 ou plus)
3. Avez-vous raté au moins une séance prévue ? (oui / non)
   - Si oui : avez-vous repris ensuite avec le carnet ? (oui / non / pas encore)
4. Qu'est-ce qui vous a fait revenir le plus souvent ? (rappel de l'agenda / habitude / enfant qui demande / message du groupe / autre)
5. De 0 à 10, continueriez-vous à l'utiliser si rien ne changeait ? ____
6. De 0 à 10, le recommanderiez-vous à une autre famille ? ____
7. Votre enfant a-t-il aimé cocher et voir sa progression ? (beaucoup / un peu / pas vraiment)
8. Avez-vous envoyé la fiche de la semaine à un enseignant ? (oui / non / pas d'enseignant)
9. La chose à améliorer en priorité : (réponse libre)
10. Payeriez-vous pour un **carnet guidé** facultatif (exercices de révision, bilan hebdomadaire imprimable) ? (non / oui, jusqu'à 3 € / oui, jusqu'à 7 € / oui, plus)

### Q-ENS — Enseignants (3 minutes)
1. Nombre d'élèves suivis dans le pilote : ____
2. La répartition nouveau / révision récente / révision ancienne vous paraît-elle juste ? (oui / à ajuster : comment ?)
3. La taille des passages par défaut (3 versets) convient-elle aux enfants de cet âge ? (trop petite / bien / trop grande)
4. La fiche de la semaine vous a-t-elle été utile ? (très / un peu / pas du tout / pas reçue)
5. Recommanderiez-vous l'outil aux parents de vos élèves ? (oui / non / avec des changements : lesquels ?)
6. Une erreur ou une formulation à corriger (vocabulaire, noms de sourates, méthode) ? (réponse libre)

---

### Lien avec la décision (voir `1-WORKFLOW.md`, partie 5)
| Question | Indicateur |
|---|---|
| Q-J14 n° 2 | familles actives en semaine 2 (≥ 3 séances) |
| Q-J14 n° 3 | taux de reprise après une absence |
| Q-J14 n° 5 | intention de continuer (moyenne) |
| Q-ENS n° 2 à 4 | validité pédagogique et utilité de la fiche |
| Q-J14 n° 10 | premier signal sur le carnet payant (indicatif seulement : déclarer « je paierais » n'est pas payer) |

---

## 11. Pilote : tableau de suivi

*Fichier : `hifz/pilote/4-suivi-pilote.csv`*

```csv
code_famille;age_enfant;sourates_visees;enseignant;inscrit_le;plan_cree;seances_semaine1;seances_semaine2;seance_manquee;reprise_apres_absence;J7_blocage;J14_continuerait_0_10;J14_recommande_0_10;J14_priorite;remarques
F01;;;;;;;;;;;;;;
F02;;;;;;;;;;;;;;
F03;;;;;;;;;;;;;;
F04;;;;;;;;;;;;;;
F05;;;;;;;;;;;;;;
F06;;;;;;;;;;;;;;
F07;;;;;;;;;;;;;;
F08;;;;;;;;;;;;;;
F09;;;;;;;;;;;;;;
F10;;;;;;;;;;;;;;
F11 (réserve);;;;;;;;;;;;;;
F12 (réserve);;;;;;;;;;;;;;
```

---

## 12. Résultats des tests (53 contrôles)

*Fichier : `revue-chatgpt/v2-multilingue/RESULTATS_TESTS.md`*

## Résultats des tests du 24/11/2026

### 1. Scénarios du carnet (version française /fr/, iPhone 13)
OK   V0 parcours créé en 3 étapes  — Al-Fatihah, versets 1 à 3
OK   V8 au retour, la page s’ouvre sur Aujourd’hui  — Aujourd’hui, lundi 23 novembre
OK   V1 verset 1 reste acquis après passage à 3 versets  — stat 1/6 · demain : An-Nas, versets 2 à 4 · aujourd’hui : Aujourd’hui, lundi 23 novembre Yasmine Nouveau 📖 Mushaf p. 604 Écouter ▶ An-Nas
OK   V2 séances manquées signalées, rien n’est « terminé »  — 2 séances n’ont pas été faites depuis le jeudi 19 novembre. Pas grave : on reprend simplement là où vous en étiez. Compr
OK   V3 « Reporter » décale la fin estimée  — 30 nov. 2026 → 1 déc. 2026
OK   V4 « À revoir » : même passage à la séance suivante  — An-Nas, versets 1 à 3
OK   V5 objectif du 26/11 tenu avec 5 versets/séance  — nces d’affilée 26 nov. 2026 fin estimée Rythme : 5 nouveaux versets par séance. Objectif du 26 novembre 2026 : tenu (fin estimée le 26 novembre 2026).
OK   V5b objectif impossible signalé  —  par séance. Objectif du 23 novembre 2026 impossible à tenir même à 20 versets par séance (fin estimée le 25 novembre 2026). Choisissez une date plus lointaine.
OK   V6 tout connu : séance de révision proposée  — Aujourd’hui, lundi 23 novembre Yasmine Toutes les sourates choisies sont apprises, alhamdulillah ! On continue la révision pour ne rien oublier. Révision ancien
OK   V6b après la dernière leçon, la révision continue  — Aujourd’hui, mardi 24 novembre Yasmine Toutes les sourates choisies sont apprises, alhamdulillah ! On continue la révision pour ne rien oublier. Révision récente 📖 Mushaf p. 604 Écouter ▶ An-Nas (sourate entière) C’est bon ✓ À retravailler Reporter la séance Environ 10 à 15 minutes.
OK   V7 fiche : 7 jours + texte pour l’enseignant  — Fiche de hifz de la semaine — Yasmine / lun. 23 nov. : Nouveau An-Nas, versets 1 à 3 / mar. 24 nov. : Nouveau An-Nas, versets 4 à 6 | Révision récente An-Nas, versets 1 à 3
OK   V7b fiche imprimée sur une seule page A4  — 1 page(s)
OK   V9 deux enfants, progressions séparées  — Adam : Al-Fatihah, versets 1 à 3 · Yasmine : 3/6
OK   V11 sauvegarde importée, sans prénom  — importé 3/6
OK   V12 rappel récurrent les jours de séance à 18:30  — RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR
OK   V10 /fr/ sans débordement ni clé non traduite  — débordement 0, clés 
OK   V10 / sans débordement ni clé non traduite  — débordement 0, clés 
OK   Aucune erreur JavaScript

18 OK, 0 échec(s)

### 2. Contrôles multilingues (10 langues, iPhone SE)
OK   en rendu  — lang=en dir=ltr débordement 0/0 · « Al-Fatihah, ayahs 1–3 » · 📖 Mushaf p. 1
OK   en mushaf  — Madinah Mushaf, page 1 → page 2 → fermé
OK   zh rendu  — lang=zh-Hans dir=ltr débordement 0/0 · « 开端章 第 1–3 节 » · 📖 古兰经第 1 页
OK   zh mushaf  — 麦地那版古兰经 第 1 页 → page 2 → fermé
OK   hi rendu  — lang=hi dir=ltr débordement 0/0 · « फ़ातिहा, आयतें 1–3 » · 📖 मुसहफ़ पृ. 1
OK   hi mushaf  — मदीना मुसहफ़, पन्ना 1 → page 2 → fermé
OK   es rendu  — lang=es dir=ltr débordement 0/0 · « Al-Fatihah, aleyas 1–3 » · 📖 Mushaf p. 1
OK   es mushaf  — Mushaf de Medina, página 1 → page 2 → fermé
OK   ar rendu  — lang=ar dir=rtl débordement 0/0 · « الفاتحة، الآيات 1–3 » · 📖 المصحف ص 1
OK   ar mushaf  — مصحف المدينة النبوية، الصفحة 1 → page 2 → fermé
OK   fr rendu  — lang=fr dir=ltr débordement 0/0 · « Al-Fatihah, versets 1 à 3 » · 📖 Mushaf p. 1
OK   fr mushaf  — Mushaf de Médine, page 1 → page 2 → fermé
OK   bn rendu  — lang=bn dir=ltr débordement 0/0 · « ফাতিহা, আয়াত ১–৩ » · 📖 মুসহাফ পৃ. ১
OK   bn mushaf  — মদীনা মুসহাফ, পৃষ্ঠা ১ → page 2 → fermé
OK   pt rendu  — lang=pt dir=ltr débordement 0/0 · « Al-Fatihah, versículos 1–3 » · 📖 Mushaf p. 1
OK   pt mushaf  — Mushaf de Medina, página 1 → page 2 → fermé
OK   ru rendu  — lang=ru dir=ltr débordement 0/0 · « Аль-Фатиха, аяты 1–3 » · 📖 Мусхаф, с. 1
OK   ru mushaf  — Мединский мусхаф, страница 1 → page 2 → fermé
OK   id rendu  — lang=id dir=ltr débordement 0/0 · « Al-Fatihah, ayat 1–3 » · 📖 Mushaf hlm. 1
OK   id mushaf  — Mushaf Madinah, halaman 1 → page 2 → fermé
OK   30 pages À propos / Confidentialité / Mentions légales
OK   Menu Langues : English → Français, même plan  — Aujourd’hui, mardi 24 novembre
OK   Choix de langue mémorisé  — fr
OK   Bandeau pour un téléphone fr-FR  — Ce site existe en français.
OK     fermé, il ne revient pas (fr-FR)
OK   Bandeau pour un téléphone bn-BD  — এই ওয়েবসাইটটি বাংলায়ও পড়া যায়।
OK     fermé, il ne revient pas (bn-BD)
OK   Bandeau pour un téléphone en-US@bn  — null
OK   Bandeau pour un téléphone en-US  — null
OK   Bandeau pour un téléphone de-DE  — null
OK   hreflang : 10 langues + x-default  — en zh-Hans hi es ar fr bn pt ru id x-default
OK   Aucune erreur JavaScript

32 OK, 0 échec(s)

### 3. Contrôles d'affichage
OK   Téléphone en anglais sur /bn/ : pas de bandeau
OK   En-tête sur une seule ligne (iPhone SE)  — 61 px
OK   Menu des langues entièrement visible  — 16 / 304 / 320

3 OK, 0 échec(s)

---

## 13. Textes du carnet, anglais (en.json)

*Fichier : `hifz/src/i18n/en.json`*

```json
{
 "meta": {
  "lang_name": "English",
  "dir": "ltr",
  "og_locale": "en_US",
  "suggest": "This site is available in English.",
  "date_fmt": "{m} {d}, {y}",
  "months": [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
  ]
 },
 "ui": {
  "skip": "Skip to content",
  "language": "Language",
  "footer": "Footer",
  "footer_note": "Free, no account. Your child's progress stays on your phone.",
  "nav_home": "The notebook",
  "nav_surahs": "Surah plans",
  "nav_about": "About",
  "nav_privacy": "Privacy",
  "nav_legal": "Legal notice",
  "support": "Support this project",
  "loading": "Loading…",
  "children_nav": "Children",
  "progress_title": "Progress",
  "week_title": "This week's sheet",
  "miles_title": "Surahs",
  "tools_title": "Settings",
  "tagline": "A Quran memorization planner for families"
 },
 "app": {
  "child_n": "Child {n}",
  "add_child": "+ Add a child",
  "listen": "Listen ▶",
  "status_ok": "Recited ✓",
  "status_again": "To repeat ↻",
  "missed_one": "One session was not done ({d}). No problem: we simply pick up where you left off.",
  "missed_many": "{n} sessions were not done since {d}. No problem: we simply pick up where you left off.",
  "missed_ack": "Got it",
  "today_title": "Today, {d}",
  "skipped_today": "Session postponed. The plan adapts: nothing is lost.",
  "undo": "Undo",
  "rest_day": "Rest day.",
  "next_session": "Next session: {d}.",
  "do_extra": "Do a session anyway",
  "btn_recited": "Recited ✓",
  "btn_again": "To repeat",
  "btn_rev_ok": "All good ✓",
  "btn_rework": "Needs work",
  "all_learned": "Every chosen surah is learned, alhamdulillah! We keep revising so nothing is forgotten.",
  "new": "New",
  "recent": "Recent revision",
  "old": "Old revision",
  "again_note": "Not solid yet: this passage will come back next session.",
  "nothing_today": "Nothing to revise yet.",
  "session_done": "Session complete, barakAllahu fik! ⭐",
  "btn_skip": "Postpone the session",
  "session_hint": "About 10 to 15 minutes.",
  "stat_ayahs": "ayahs learned",
  "stat_stars": "passages recited",
  "stat_streak": "sessions in a row",
  "stat_end": "estimated finish",
  "stat_end_done": "all learned",
  "target_ok": "Goal of {d}: on track (estimated finish {e}).",
  "target_impossible": "The goal of {d} cannot be met even at 20 ayahs per session (estimated finish {e}). Choose a later date.",
  "rest": "Rest",
  "skipped": "Postponed",
  "missed": "Not done",
  "week_of": "Week of {a} to {b}",
  "col_day": "Day",
  "col_parent": "Parent",
  "col_teacher": "Teacher",
  "btn_print": "Print the sheet",
  "btn_copy_week": "Copy the sheet for the teacher",
  "sheet_title": "Weekly hifz sheet",
  "hafs_note": "Madinah Mushaf, Hafs ʿan ʿĀṣim (King Fahd Complex)",
  "sheet_teacher_note": "Teacher's note:",
  "m_known": "already known",
  "m_done": "learned ✓",
  "m_planned": "planned around {d}",
  "share": "Share",
  "btn_edit": "Edit the plan",
  "btn_reminder": "Add a calendar reminder",
  "btn_backup": "Copy the backup link",
  "confirm_reset": "Delete this plan and all its progress?",
  "yes_reset": "Yes, delete",
  "cancel": "Cancel",
  "btn_reset": "Start over",
  "privacy_short": "Everything is saved on this device only. The backup link restores progress on another phone; it does not contain the first name.",
  "setup_title": "Create your child's plan",
  "setup_edit_title": "Edit the plan",
  "setup_edit_note": "Ayahs already recited stay learned: only the upcoming programme changes.",
  "step1": "Which surahs to learn?",
  "pick_juzamma": "All of Juz ʿAmma, from An-Nas to An-Naba (37 surahs)",
  "pick_last10": "The last 10 surahs, from An-Nas to Al-Fil",
  "pick_qul": "Al-Fatiha and the 3 “Qul” (Al-Ikhlas, Al-Falaq, An-Nas)",
  "pick_custom": "I choose the surahs",
  "more_surahs": "Show the other surahs",
  "order": "Order",
  "order_end": "From the end (An-Nas first)",
  "order_start": "In mushaf order",
  "step2": "Which does your child already know?",
  "step2_hint": "They will be revised, not re-learned. If everything is known, the plan offers revision only.",
  "known_all": "Knows them all: revision only",
  "choose_first": "Choose surahs first.",
  "step3": "What pace?",
  "days_label": "Session days",
  "mode_amount": "I choose the number of new ayahs per session",
  "amount_label": "Ayahs per session",
  "mode_date": "I want to finish by a date",
  "target_label": "Finish by",
  "advanced": "Revision settings",
  "recent_label": "Recent revision: last sessions to review",
  "old_label": "Old revision: ayahs per session (approx.)",
  "time_label": "Reminder time",
  "name_label": "First name (optional)",
  "name_ph": "e.g. Yasmine",
  "name_note": "The first name only helps tell your children apart and stays on this phone.",
  "btn_start": "Create the plan",
  "btn_save": "Save",
  "err_surahs": "Choose at least one surah.",
  "err_days": "Choose at least one session day.",
  "err_target": "Enter a future date.",
  "copied": "Copied ✓",
  "reminder_title": "Quran session",
  "reminder_desc": "Time for the hifz session.",
  "import_yes": "Add the plan",
  "card_head": "Surah learned",
  "card_text": "Alhamdulillah! Surah {s} learned 🌙",
  "card_save": "Long-press or right-click the image to save it.",
  "close": "Close",
  "surah_full": "{s} (whole surah)",
  "surah_ayah": "{s}, ayah {a}",
  "surah_ayahs": "{s}, ayahs {a}–{b}",
  "and_more": "and {n} more",
  "pace_one": "Pace: {n} new ayah per session.",
  "pace_other": "Pace: {n} new ayahs per session.",
  "import_q_one": "This link contains a plan with {n} ayah learned. Add it to this phone?",
  "import_q_other": "This link contains a plan with {n} ayahs learned. Add it to this phone?",
  "mushaf_btn": "Mushaf p. {p}",
  "mushaf_title": "Madinah Mushaf, page {p}",
  "mushaf_next": "Next page",
  "mushaf_prev": "Previous page",
  "mushaf_credit": "Madinah Mushaf (Hafs) · King Fahd Glorious Qur'an Printing Complex",
  "mushaf_error": "This page could not be loaded. Check your connection.",
  "mushaf_preview_only": "This preview only includes Al-Fatiha and Juz ʿAmma. All 604 pages are on the published site."
 },
 "home": {
  "title": "Our Quran Time — a Quran memorization planner for families",
  "description": "Know every day what to learn and what to revise with your child. Juz ʿAmma, short surahs, a weekly sheet for the teacher. Free, no account.",
  "h1": "Tonight, you know what to recite",
  "lead": "A hifz notebook for parents: every day, your child's new passage and revisions, adapted to their pace. Missed a session? The plan simply picks up where you left off.",
  "content": "<h2>How it works</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>New</b>A small passage to learn, often 2 to 5 ayahs (the <em>sabaq</em>).</li><li class=\"t-sabqi\"><b>Recent revision</b>The passages of the last sessions, until they are solid (the <em>sabqi</em>).</li><li class=\"t-manzil\"><b>Old revision</b>One or two known surahs in rotation, so nothing is forgotten (the <em>manzil</em>).</li></ul><p>You tick what your child actually recited. If they hesitate, tap “To repeat”: the passage comes back next session. Skip a day and nothing is lost: the plan resumes where you were.</p><h2>A typical session (10 to 15 minutes)</h2><ol><li>Open the passage in the Madinah Mushaf (📖 button) and read it together.</li><li>Listen to the new passage three times with the “Listen” button.</li><li>Repeat ayah by ayah, then link the ayahs together.</li><li>Your child recites without looking: “Recited” or “To repeat”.</li><li>Do the recent revision, then the old revision.</li></ol><h2>Tips for parents</h2><ul><li><strong>Short and regular</strong>: 10 minutes every day beat an hour at the weekend.</li><li><strong>Same time</strong>: after a prayer or before bedtime. The calendar reminder helps a lot.</li><li><strong>Encourage</strong>: every recited passage is a star, every learned surah is a celebration.</li><li><strong>Recite in prayer</strong>: it is the best revision.</li></ul><h2>For the teacher</h2><p>The weekly sheet sums up the planned passages and what was actually recited. Print it or paste it into WhatsApp: the teacher sees at a glance where the child is and can add a note.</p><p class=\"note\">This notebook organises memorization; it does not replace a teacher who listens to the child and corrects their recitation (tajweed).</p><h2>Frequently asked questions</h2><div class=\"faq\"><details><summary>Where is my child's data saved?</summary><p>Only on your phone. No account, no server. The first name is optional.</p></details><details><summary>I have several children.</summary><p>Add one plan per child with “+ Add a child”. Each plan has its own progress.</p></details><details><summary>We missed several days.</summary><p>No problem: today's session resumes exactly where you stopped, and the estimated finish date is recalculated.</p></details><details><summary>I'm changing phones.</summary><p>In “Settings”, copy the backup link and open it on the new phone.</p></details><details><summary>Which mushaf is the reference?</summary><p>The Madinah Mushaf in the Hafs ʿan ʿĀṣim narration, printed by the King Fahd Glorious Qur'an Printing Complex: 604 pages and 6,236 ayahs. Ayah numbers and pages match this mushaf, the most widespread in the world.</p></details><details><summary>Is it free?</summary><p>Yes, free and ad-free during the test phase.</p></details></div>"
 },
 "legal": {
  "private": "This site is published by a private individual on a non-professional basis. As permitted by French law (LCEN, art. 1-1, II), the publisher remains anonymous; their identity has been provided to the hosting provider below.<br>Contact: {mail}",
  "controller": "the site publisher (private individual)",
  "phone": "Phone:",
  "email": "Email:",
  "director": "Publication director"
 }
}
```

---

## 14. Textes du carnet, chinois (zh.json)

*Fichier : `hifz/src/i18n/zh.json`*

```json
{
 "meta": {
  "lang_name": "中文",
  "html_lang": "zh-Hans",
  "dir": "ltr",
  "og_locale": "zh_CN",
  "suggest": "本网站提供中文版。",
  "date_fmt": "{y}年{mo}月{d}日",
  "months": [
   "1月",
   "2月",
   "3月",
   "4月",
   "5月",
   "6月",
   "7月",
   "8月",
   "9月",
   "10月",
   "11月",
   "12月"
  ]
 },
 "ui": {
  "skip": "跳到正文",
  "language": "语言",
  "footer": "页脚",
  "footer_note": "免费，无需注册。孩子的进度只保存在您的手机上。",
  "nav_home": "背诵手册",
  "nav_surahs": "各章计划",
  "nav_about": "关于",
  "nav_privacy": "隐私",
  "nav_legal": "法律声明",
  "support": "支持本项目",
  "loading": "加载中…",
  "children_nav": "孩子",
  "progress_title": "进度",
  "week_title": "本周记录表",
  "miles_title": "各章",
  "tools_title": "设置",
  "tagline": "家庭古兰经背诵计划手册"
 },
 "app": {
  "child_n": "孩子 {n}",
  "add_child": "+ 添加孩子",
  "listen": "收听 ▶",
  "status_ok": "已背会 ✓",
  "status_again": "再练一次 ↻",
  "missed_one": "有一次课没有完成（{d}）。没关系，我们从上次停下的地方继续。",
  "missed_many": "自{d}以来有 {n} 次课没有完成。没关系，我们从上次停下的地方继续。",
  "missed_ack": "知道了",
  "today_title": "今天，{d}",
  "skipped_today": "本次课已推迟。计划会自动调整，什么都不会丢失。",
  "undo": "撤销",
  "rest_day": "今天休息。",
  "next_session": "下一次课：{d}。",
  "do_extra": "仍然上一次课",
  "btn_recited": "已背会 ✓",
  "btn_again": "再练一次",
  "btn_rev_ok": "都很熟练 ✓",
  "btn_rework": "还需巩固",
  "all_learned": "所选各章已全部背会，感赞真主！复习会继续进行，以免遗忘。",
  "new": "新课",
  "recent": "近期复习",
  "old": "旧课复习",
  "again_note": "还不熟练：这一段会在下次课再次出现。",
  "nothing_today": "目前还没有需要复习的内容。",
  "session_done": "本次课完成，愿真主赐福你！⭐",
  "btn_skip": "推迟本次课",
  "session_hint": "大约 10 到 15 分钟。",
  "stat_ayahs": "节已背会",
  "stat_stars": "段已背诵",
  "stat_streak": "次课连续完成",
  "stat_end": "预计完成",
  "stat_end_done": "全部背会",
  "pace": "进度：每次课新学 {n} 节。",
  "target_ok": "目标 {d}：按计划进行（预计 {e} 完成）。",
  "target_impossible": "即使每次课学 20 节，也无法在 {d} 前完成（预计 {e} 完成）。请选择更晚的日期。",
  "rest": "休息",
  "skipped": "已推迟",
  "missed": "未完成",
  "week_of": "{a} – {b}",
  "col_day": "日期",
  "col_parent": "家长",
  "col_teacher": "老师",
  "btn_print": "打印记录表",
  "btn_copy_week": "复制记录表给老师",
  "sheet_title": "每周背诵记录表",
  "hafs_note": "麦地那版古兰经，哈夫斯读法（法赫德国王古兰经印制中心）",
  "sheet_teacher_note": "老师评语：",
  "m_known": "原本会背",
  "m_done": "已背会 ✓",
  "m_planned": "预计 {d} 左右",
  "share": "分享",
  "btn_edit": "修改计划",
  "btn_reminder": "添加日历提醒",
  "btn_backup": "复制备份链接",
  "confirm_reset": "删除此计划及其全部进度？",
  "yes_reset": "是的，删除",
  "cancel": "取消",
  "btn_reset": "重新开始",
  "privacy_short": "所有内容只保存在本设备上。备份链接可在另一部手机上恢复进度，链接中不包含孩子的名字。",
  "setup_title": "为孩子制定计划",
  "setup_edit_title": "修改计划",
  "setup_edit_note": "已背诵的经文仍算作已背会，只有之后的安排会改变。",
  "step1": "要背哪些章？",
  "pick_juzamma": "整个第三十卷（安姆卷），从世人章到消息章（共 37 章）",
  "pick_last10": "最后 10 章，从世人章到象章",
  "pick_qul": "开端章和三个“古勒”章（忠诚章、曙光章、世人章）",
  "pick_custom": "我自己选择章节",
  "more_surahs": "显示其他章",
  "order": "顺序",
  "order_end": "从后往前（先背世人章）",
  "order_start": "按经文顺序",
  "step2": "孩子已经会背哪些？",
  "step2_hint": "这些章只复习，不重新背。如果全部都会，计划只安排复习。",
  "known_all": "全部会背：只复习",
  "choose_first": "请先选择章节。",
  "step3": "按什么节奏？",
  "days_label": "上课日",
  "mode_amount": "我来决定每次课新学几节",
  "amount_label": "每次课节数",
  "mode_date": "我想在某个日期前完成",
  "target_label": "完成日期",
  "advanced": "复习设置",
  "recent_label": "近期复习：复习最近几次课的内容",
  "old_label": "旧课复习：每次课复习的节数（大约）",
  "time_label": "提醒时间",
  "name_label": "名字（可选）",
  "name_ph": "例如：阿伊莎",
  "name_note": "名字只用来区分您的孩子，并且只保存在这部手机上。",
  "btn_start": "制定计划",
  "btn_save": "保存",
  "err_surahs": "请至少选择一章。",
  "err_days": "请至少选择一个上课日。",
  "err_target": "请输入一个将来的日期。",
  "copied": "已复制 ✓",
  "reminder_title": "古兰经课",
  "reminder_desc": "背诵课的时间到了。",
  "import_q": "此链接包含一个已背会 {n} 节的计划。要添加到这部手机吗？",
  "import_yes": "添加计划",
  "card_head": "又背会了一章",
  "card_text": "感赞真主！{s}已背会 🌙",
  "card_save": "长按图片或单击右键即可保存。",
  "close": "关闭",
  "surah_full": "{s}（全章）",
  "surah_ayah": "{s} 第 {a} 节",
  "surah_ayahs": "{s} 第 {a}–{b} 节",
  "and_more": "及另外 {n} 项",
  "mushaf_btn": "古兰经第 {p} 页",
  "mushaf_title": "麦地那版古兰经 第 {p} 页",
  "mushaf_next": "下一页",
  "mushaf_prev": "上一页",
  "mushaf_credit": "麦地那版古兰经（哈夫斯读法）· 法赫德国王古兰经印制中心",
  "mushaf_error": "无法加载此页，请检查网络连接。",
  "mushaf_preview_only": "此预览仅包含开端章和第三十卷。完整的 604 页可在正式网站上查看。"
 },
 "home": {
  "title": "Our Quran Time — 家庭古兰经背诵计划手册",
  "description": "每天都知道孩子该背什么、该复习什么。第三十卷、短章，以及给老师的每周记录表。免费，无需注册。",
  "h1": "今晚背什么，您心里有数",
  "lead": "写给家长的背诵手册：每天为孩子安排新课和复习，按孩子自己的节奏来。错过了一次课？计划会从上次停下的地方继续。",
  "content": "<h2>如何使用</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>新课</b>一小段新内容，通常 2 到 5 节。</li><li class=\"t-sabqi\"><b>近期复习</b>最近几次课学过的段落，直到背熟为止。</li><li class=\"t-manzil\"><b>旧课复习</b>轮流复习一两章已会背的经文，以免遗忘。</li></ul><p>孩子真正背出来的内容，您就打勾。如果还不熟练，点“再练一次”：这一段会在下次课再次出现。错过一天也不会丢失任何内容，计划会从原来的位置继续。</p><h2>一次课的示例（10 到 15 分钟）</h2><ol><li>用 📖 按钮在麦地那版古兰经中打开这一段，和孩子一起读。</li><li>用“收听”按钮把新课听三遍。</li><li>一节一节地跟读，然后把各节连起来读。</li><li>孩子不看经文背诵：点“已背会”或“再练一次”。</li><li>先做近期复习，再做旧课复习。</li></ol><h2>给家长的建议</h2><ul><li><strong>少而有恒</strong>：每天 10 分钟，胜过周末一小时。</li><li><strong>固定时间</strong>：在某次礼拜之后或睡前。日历提醒很有帮助。</li><li><strong>多鼓励</strong>：每背出一段就是一颗星，每背会一章都值得庆祝。</li><li><strong>在礼拜中诵读</strong>：这是最好的复习。</li></ul><h2>给老师</h2><p>每周记录表汇总了计划的段落和实际背诵的内容。可以打印，也可以粘贴到微信或 WhatsApp：老师一眼就能看到孩子学到了哪里，还可以写下评语。</p><p class=\"note\">本手册用来安排背诵进度，不能代替老师聆听孩子诵读、纠正其诵读规则（泰吉威德）。</p><h2>常见问题</h2><div class=\"faq\"><details><summary>孩子的数据保存在哪里？</summary><p>只保存在您的手机上。无需账号，没有服务器。名字是可选的。</p></details><details><summary>我有好几个孩子。</summary><p>用“+ 添加孩子”为每个孩子分别制定计划，每个计划的进度各自独立。</p></details><details><summary>我们错过了好几天。</summary><p>没关系：今天的课会从上次停下的地方准确继续，预计完成日期也会重新计算。</p></details><details><summary>我要换手机。</summary><p>在“设置”中复制备份链接，然后在新手机上打开。</p></details><details><summary>以哪部古兰经为准？</summary><p>以法赫德国王古兰经印制中心印制的哈夫斯读法麦地那版古兰经为准：共 604 页、6236 节。经节编号和页码均与这部全世界最通行的版本一致。</p></details><details><summary>免费吗？</summary><p>是的，测试期间免费且无广告。</p></details></div>"
 },
 "legal": {
  "private": "本网站由个人以非职业身份发布。根据法国法律（《数字经济信任法》LCEN 第 1-1 条第 II 款），发布者选择不公开身份，其身份信息已提供给下方的托管服务商。<br>联系方式：{mail}",
  "controller": "网站发布者（个人）",
  "phone": "电话：",
  "email": "电子邮件：",
  "director": "出版负责人"
 }
}
```

---

## 15. Textes du carnet, hindi (hi.json)

*Fichier : `hifz/src/i18n/hi.json`*

```json
{
 "meta": {
  "lang_name": "हिन्दी",
  "dir": "ltr",
  "og_locale": "hi_IN",
  "suggest": "यह वेबसाइट हिन्दी में भी उपलब्ध है।",
  "date_fmt": "{d} {m} {y}",
  "months": [
   "जनवरी",
   "फ़रवरी",
   "मार्च",
   "अप्रैल",
   "मई",
   "जून",
   "जुलाई",
   "अगस्त",
   "सितंबर",
   "अक्तूबर",
   "नवंबर",
   "दिसंबर"
  ]
 },
 "ui": {
  "skip": "मुख्य सामग्री पर जाएँ",
  "language": "भाषा",
  "footer": "फ़ुटर",
  "footer_note": "मुफ़्त, कोई अकाउंट नहीं। बच्चे की प्रगति आपके फ़ोन में ही रहती है।",
  "nav_home": "हिफ़्ज़ डायरी",
  "nav_surahs": "सूरह के हिसाब से योजनाएँ",
  "nav_about": "हमारे बारे में",
  "nav_privacy": "निजता",
  "nav_legal": "क़ानूनी जानकारी",
  "support": "इस प्रोजेक्ट की मदद करें",
  "loading": "लोड हो रहा है…",
  "children_nav": "बच्चे",
  "progress_title": "प्रगति",
  "week_title": "इस हफ़्ते की शीट",
  "miles_title": "सूरतें",
  "tools_title": "सेटिंग्स",
  "tagline": "परिवारों के लिए क़ुरआन हिफ़्ज़ की डायरी"
 },
 "app": {
  "child_n": "बच्चा {n}",
  "add_child": "+ एक और बच्चा जोड़ें",
  "listen": "सुनें ▶",
  "status_ok": "सुना दिया ✓",
  "status_again": "फिर से ↻",
  "missed_one": "एक सत्र छूट गया ({d})। कोई बात नहीं: जहाँ रुके थे, वहीं से आगे बढ़ेंगे।",
  "missed_many": "{d} से अब तक {n} सत्र छूट गए। कोई बात नहीं: जहाँ रुके थे, वहीं से आगे बढ़ेंगे।",
  "missed_ack": "ठीक है",
  "today_title": "आज, {d}",
  "skipped_today": "सत्र आगे बढ़ा दिया गया। योजना ख़ुद को ढाल लेती है, कुछ नहीं छूटता।",
  "undo": "वापस लें",
  "rest_day": "आज आराम का दिन है।",
  "next_session": "अगला सत्र: {d}।",
  "do_extra": "फिर भी एक सत्र करें",
  "btn_recited": "सुना दिया ✓",
  "btn_again": "फिर से",
  "btn_rev_ok": "सब ठीक ✓",
  "btn_rework": "और पक्का करना है",
  "all_learned": "चुनी हुई सारी सूरतें याद हो गईं, अल्हम्दुलिल्लाह! दोहराई जारी रहेगी ताकि कुछ भूले नहीं।",
  "new": "नया सबक़",
  "recent": "हाल की दोहराई",
  "old": "पुरानी दोहराई",
  "again_note": "अभी पक्का नहीं हुआ: यह हिस्सा अगले सत्र में फिर आएगा।",
  "nothing_today": "अभी दोहराने के लिए कुछ नहीं है।",
  "session_done": "सत्र पूरा हुआ, बारकल्लाहु फ़ीक! ⭐",
  "btn_skip": "सत्र आगे बढ़ाएँ",
  "session_hint": "लगभग 10 से 15 मिनट।",
  "stat_ayahs": "आयतें याद",
  "stat_stars": "हिस्से सुनाए",
  "stat_streak": "लगातार सत्र",
  "stat_end": "अनुमानित समापन",
  "stat_end_done": "सब याद",
  "pace_one": "रफ़्तार: हर सत्र में {n} नई आयत।",
  "pace_other": "रफ़्तार: हर सत्र में {n} नई आयतें।",
  "target_ok": "{d} का लक्ष्य: सही राह पर (अनुमानित समापन {e})।",
  "target_impossible": "हर सत्र में 20 आयतें करके भी {d} का लक्ष्य पूरा नहीं होगा (अनुमानित समापन {e})। कोई बाद की तारीख़ चुनें।",
  "rest": "आराम",
  "skipped": "आगे बढ़ाया",
  "missed": "छूट गया",
  "week_of": "हफ़्ता: {a} – {b}",
  "col_day": "दिन",
  "col_parent": "अभिभावक",
  "col_teacher": "उस्ताद",
  "btn_print": "शीट प्रिंट करें",
  "btn_copy_week": "उस्ताद के लिए शीट कॉपी करें",
  "sheet_title": "हफ़्तावार हिफ़्ज़ शीट",
  "hafs_note": "मदीना मुसहफ़, हफ़्स अन आसिम रिवायत (किंग फ़हद कॉम्प्लेक्स)",
  "sheet_teacher_note": "उस्ताद की टिप्पणी:",
  "m_known": "पहले से याद",
  "m_done": "याद हो गई ✓",
  "m_planned": "लगभग {d} तक",
  "share": "शेयर करें",
  "btn_edit": "योजना बदलें",
  "btn_reminder": "कैलेंडर में रिमाइंडर जोड़ें",
  "btn_backup": "बैकअप लिंक कॉपी करें",
  "confirm_reset": "यह योजना और इसकी सारी प्रगति मिटा दें?",
  "yes_reset": "हाँ, मिटा दें",
  "cancel": "रद्द करें",
  "btn_reset": "नए सिरे से शुरू करें",
  "privacy_short": "सब कुछ सिर्फ़ इसी डिवाइस में सेव रहता है। बैकअप लिंक से दूसरे फ़ोन में प्रगति वापस आ जाती है; उसमें बच्चे का नाम नहीं होता।",
  "setup_title": "अपने बच्चे की योजना बनाएँ",
  "setup_edit_title": "योजना बदलें",
  "setup_edit_note": "जो आयतें सुनाई जा चुकी हैं, वे याद ही गिनी जाएँगी; सिर्फ़ आगे का कार्यक्रम बदलेगा।",
  "step1": "कौन-सी सूरतें याद करनी हैं?",
  "pick_juzamma": "पूरा अम्मा पारा (30वाँ पारा), सूरह नास से सूरह नबा तक (37 सूरतें)",
  "pick_last10": "आख़िरी 10 सूरतें, नास से फ़ील तक",
  "pick_qul": "फ़ातिहा और तीनों “क़ुल” (इख़लास, फ़लक़, नास)",
  "pick_custom": "सूरतें ख़ुद चुनें",
  "more_surahs": "बाक़ी सूरतें दिखाएँ",
  "order": "क्रम",
  "order_end": "आख़िर से (पहले नास)",
  "order_start": "मुसहफ़ के क्रम में",
  "step2": "बच्चे को पहले से क्या याद है?",
  "step2_hint": "इन्हें दोबारा याद नहीं कराया जाएगा, सिर्फ़ दोहराया जाएगा। अगर सब याद है, तो योजना में सिर्फ़ दोहराई होगी।",
  "known_all": "सब याद है: सिर्फ़ दोहराई",
  "choose_first": "पहले सूरतें चुनें।",
  "step3": "कितनी रफ़्तार से?",
  "days_label": "सत्र के दिन",
  "mode_amount": "हर सत्र में नई आयतों की गिनती ख़ुद तय करें",
  "amount_label": "हर सत्र में आयतें",
  "mode_date": "किसी तय तारीख़ तक पूरा करना है",
  "target_label": "इस तारीख़ तक",
  "advanced": "दोहराई की सेटिंग्स",
  "recent_label": "हाल की दोहराई: पिछले कितने सत्र दोहराने हैं",
  "old_label": "पुरानी दोहराई: हर सत्र में आयतें (लगभग)",
  "time_label": "रिमाइंडर का समय",
  "name_label": "नाम (वैकल्पिक)",
  "name_ph": "जैसे: आयशा",
  "name_note": "नाम सिर्फ़ आपके बच्चों में फ़र्क़ करने के लिए है और इसी फ़ोन में रहता है।",
  "btn_start": "योजना बनाएँ",
  "btn_save": "सेव करें",
  "err_surahs": "कम से कम एक सूरह चुनें।",
  "err_days": "सत्र के लिए कम से कम एक दिन चुनें।",
  "err_target": "आने वाली कोई तारीख़ डालें।",
  "copied": "कॉपी हो गया ✓",
  "reminder_title": "क़ुरआन का सत्र",
  "reminder_desc": "हिफ़्ज़ के सत्र का समय हो गया।",
  "import_q_one": "इस लिंक में एक योजना है जिसमें {n} आयत याद हो चुकी है। इसे इस फ़ोन में जोड़ें?",
  "import_q_other": "इस लिंक में एक योजना है जिसमें {n} आयतें याद हो चुकी हैं। इसे इस फ़ोन में जोड़ें?",
  "import_yes": "योजना जोड़ें",
  "card_head": "सूरह याद हो गई",
  "card_text": "अल्हम्दुलिल्लाह! सूरह {s} याद हो गई 🌙",
  "card_save": "तस्वीर सेव करने के लिए उसे देर तक दबाएँ या राइट-क्लिक करें।",
  "close": "बंद करें",
  "surah_full": "{s} (पूरी सूरह)",
  "surah_ayah": "{s}, आयत {a}",
  "surah_ayahs": "{s}, आयतें {a}–{b}",
  "and_more": "और {n}",
  "mushaf_btn": "मुसहफ़ पृ. {p}",
  "mushaf_title": "मदीना मुसहफ़, पन्ना {p}",
  "mushaf_next": "अगला पन्ना",
  "mushaf_prev": "पिछला पन्ना",
  "mushaf_credit": "मदीना मुसहफ़ (हफ़्स) · किंग फ़हद क़ुरआन प्रिंटिंग कॉम्प्लेक्स",
  "mushaf_error": "यह पन्ना लोड नहीं हो सका। अपना इंटरनेट कनेक्शन जाँचें।",
  "mushaf_preview_only": "इस प्रीव्यू में सिर्फ़ फ़ातिहा और अम्मा पारा हैं। पूरे 604 पन्ने प्रकाशित वेबसाइट पर हैं।"
 },
 "home": {
  "title": "Our Quran Time — परिवारों के लिए क़ुरआन हिफ़्ज़ की डायरी",
  "description": "हर दिन जानिए कि बच्चे के साथ क्या याद करना है और क्या दोहराना है। अम्मा पारा, छोटी सूरतें और उस्ताद के लिए हफ़्तावार शीट। मुफ़्त, कोई अकाउंट नहीं।",
  "h1": "आज रात क्या सुनाना है, आपको पता है",
  "lead": "माता-पिता के लिए हिफ़्ज़ की डायरी: हर दिन आपके बच्चे का नया सबक़ और दोहराई, उसकी अपनी रफ़्तार से। कोई सत्र छूट गया? योजना वहीं से आगे बढ़ती है जहाँ आप रुके थे।",
  "content": "<h2>यह कैसे काम करता है</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>नया सबक़</b>याद करने के लिए छोटा हिस्सा, अक्सर 2 से 5 आयतें (<em>सबक़</em>)।</li><li class=\"t-sabqi\"><b>हाल की दोहराई</b>पिछले सत्रों के हिस्से, जब तक पक्के न हो जाएँ (<em>सबक़ी</em>)।</li><li class=\"t-manzil\"><b>पुरानी दोहराई</b>याद की हुई एक या दो सूरतें बारी-बारी से, ताकि कुछ भूले नहीं (<em>मंज़िल</em>)।</li></ul><p>बच्चे ने जो सच में सुनाया, आप बस उस पर टिक करते हैं। अगर वह अटके, तो “फिर से” दबाएँ: वह हिस्सा अगले सत्र में फिर आएगा। कोई दिन छूट जाए तो भी कुछ नहीं खोता: योजना वहीं से चलती है जहाँ आप थे।</p><h2>एक आम सत्र (10 से 15 मिनट)</h2><ol><li>📖 बटन से यह हिस्सा मदीना मुसहफ़ में खोलें और साथ मिलकर पढ़ें।</li><li>“सुनें” बटन से नया हिस्सा तीन बार सुनें।</li><li>एक-एक आयत दोहराएँ, फिर आयतों को जोड़कर पढ़ें।</li><li>बच्चा बिना देखे सुनाए: “सुना दिया” या “फिर से”।</li><li>फिर हाल की दोहराई, और उसके बाद पुरानी दोहराई।</li></ol><h2>माता-पिता के लिए सुझाव</h2><ul><li><strong>थोड़ा, मगर रोज़</strong>: हफ़्ते के आख़िर में एक घंटे से बेहतर है रोज़ 10 मिनट।</li><li><strong>एक ही समय</strong>: किसी नमाज़ के बाद या सोने से पहले। कैलेंडर का रिमाइंडर बहुत काम आता है।</li><li><strong>हौसला बढ़ाएँ</strong>: हर सुनाया गया हिस्सा एक सितारा है, हर याद हुई सूरह एक जश्न।</li><li><strong>नमाज़ में पढ़ें</strong>: यही सबसे अच्छी दोहराई है।</li></ul><h2>उस्ताद के लिए</h2><p>हफ़्तावार शीट में तय किए गए हिस्से भी होते हैं और असल में सुनाए गए हिस्से भी। इसे प्रिंट करें या व्हाट्सऐप में पेस्ट करें: उस्ताद एक नज़र में देख लेते हैं कि बच्चा कहाँ तक पहुँचा, और चाहें तो टिप्पणी लिख सकते हैं।</p><p class=\"note\">यह डायरी हिफ़्ज़ को व्यवस्थित करती है; यह उस उस्ताद की जगह नहीं लेती जो बच्चे की तिलावत सुनकर तजवीद ठीक करते हैं।</p><h2>अक्सर पूछे जाने वाले सवाल</h2><div class=\"faq\"><details><summary>मेरे बच्चे का डेटा कहाँ सेव होता है?</summary><p>सिर्फ़ आपके फ़ोन में। न कोई अकाउंट, न कोई सर्वर। नाम डालना वैकल्पिक है।</p></details><details><summary>मेरे एक से ज़्यादा बच्चे हैं।</summary><p>“+ एक और बच्चा जोड़ें” से हर बच्चे की अलग योजना बनाएँ। हर योजना की प्रगति अलग रहती है।</p></details><details><summary>हमसे कई दिन छूट गए।</summary><p>कोई बात नहीं: आज का सत्र ठीक वहीं से शुरू होगा जहाँ आप रुके थे, और अनुमानित समापन की तारीख़ फिर से निकाली जाएगी।</p></details><details><summary>नया फ़ोन ले रहे हैं?</summary><p>“सेटिंग्स” में बैकअप लिंक कॉपी करें और उसे नए फ़ोन में खोलें।</p></details><details><summary>कौन-सा मुसहफ़ आधार है?</summary><p>हफ़्स अन आसिम रिवायत का मदीना मुसहफ़, जिसे किंग फ़हद क़ुरआन प्रिंटिंग कॉम्प्लेक्स छापता है: 604 पन्ने और 6,236 आयतें। आयतों के नंबर और पन्ने इसी मुसहफ़ से मेल खाते हैं, जो दुनिया में सबसे ज़्यादा प्रचलित है।</p></details><details><summary>क्या यह मुफ़्त है?</summary><p>हाँ, परीक्षण के दौरान यह मुफ़्त है और इसमें कोई विज्ञापन नहीं है।</p></details></div>"
 },
 "legal": {
  "private": "यह वेबसाइट एक व्यक्ति ग़ैर-पेशेवर रूप से प्रकाशित करता है। फ़्रांसीसी क़ानून (LCEN, अनुच्छेद 1-1, II) के तहत प्रकाशक ने अपनी पहचान ज़ाहिर न करने का विकल्प चुना है; उनकी पहचान नीचे दी गई होस्टिंग कंपनी को दी जा चुकी है।<br>संपर्क: {mail}",
  "controller": "वेबसाइट के प्रकाशक (व्यक्ति)",
  "phone": "फ़ोन:",
  "email": "ईमेल:",
  "director": "प्रकाशन के ज़िम्मेदार व्यक्ति"
 }
}
```

---

## 16. Textes du carnet, espagnol (es.json)

*Fichier : `hifz/src/i18n/es.json`*

```json
{
 "meta": {
  "lang_name": "Español",
  "dir": "ltr",
  "og_locale": "es_LA",
  "suggest": "Este sitio está disponible en español.",
  "date_fmt": "{d} de {m} de {y}",
  "months": [
   "enero",
   "febrero",
   "marzo",
   "abril",
   "mayo",
   "junio",
   "julio",
   "agosto",
   "septiembre",
   "octubre",
   "noviembre",
   "diciembre"
  ]
 },
 "ui": {
  "skip": "Ir al contenido",
  "language": "Idioma",
  "footer": "Pie de página",
  "footer_note": "Gratis y sin cuenta. El avance de tu hijo se queda en tu teléfono.",
  "nav_home": "El cuaderno",
  "nav_surahs": "Planes por sura",
  "nav_about": "Acerca de",
  "nav_privacy": "Privacidad",
  "nav_legal": "Aviso legal",
  "support": "Apoya este proyecto",
  "loading": "Cargando…",
  "children_nav": "Hijos",
  "progress_title": "Avance",
  "week_title": "Ficha de la semana",
  "miles_title": "Suras",
  "tools_title": "Ajustes",
  "tagline": "Cuaderno de memorización del Corán para familias"
 },
 "app": {
  "child_n": "Hijo {n}",
  "add_child": "+ Añadir un hijo",
  "listen": "Escuchar ▶",
  "status_ok": "Recitado ✓",
  "status_again": "Repetir ↻",
  "missed_one": "Una sesión no se hizo ({d}). No pasa nada: seguimos justo donde lo dejaron.",
  "missed_many": "{n} sesiones no se hicieron desde el {d}. No pasa nada: seguimos justo donde lo dejaron.",
  "missed_ack": "Entendido",
  "today_title": "Hoy, {d}",
  "skipped_today": "Sesión aplazada. El plan se adapta: no se pierde nada.",
  "undo": "Deshacer",
  "rest_day": "Día de descanso.",
  "next_session": "Próxima sesión: {d}.",
  "do_extra": "Hacer una sesión igualmente",
  "btn_recited": "Recitado ✓",
  "btn_again": "Repetir",
  "btn_rev_ok": "Todo bien ✓",
  "btn_rework": "Hay que reforzar",
  "all_learned": "¡Todas las suras elegidas están memorizadas, alhamdulillah! Seguimos repasando para no olvidar nada.",
  "new": "Nuevo",
  "recent": "Repaso reciente",
  "old": "Repaso antiguo",
  "again_note": "Aún no está firme: este pasaje volverá en la próxima sesión.",
  "nothing_today": "Todavía no hay nada que repasar.",
  "session_done": "¡Sesión terminada, barakAllahu fik! ⭐",
  "btn_skip": "Aplazar la sesión",
  "session_hint": "Entre 10 y 15 minutos, más o menos.",
  "stat_ayahs": "aleyas memorizadas",
  "stat_stars": "pasajes recitados",
  "stat_streak": "sesiones seguidas",
  "stat_end": "fin estimado",
  "stat_end_done": "todo memorizado",
  "pace_one": "Ritmo: {n} aleya nueva por sesión.",
  "pace_other": "Ritmo: {n} aleyas nuevas por sesión.",
  "target_ok": "Objetivo del {d}: vas bien (fin estimado: {e}).",
  "target_impossible": "El objetivo del {d} no se puede cumplir ni con 20 aleyas por sesión (fin estimado: {e}). Elige una fecha más lejana.",
  "rest": "Descanso",
  "skipped": "Aplazada",
  "missed": "No hecha",
  "week_of": "Semana del {a} al {b}",
  "col_day": "Día",
  "col_parent": "Padre o madre",
  "col_teacher": "Maestro",
  "btn_print": "Imprimir la ficha",
  "btn_copy_week": "Copiar la ficha para el maestro",
  "sheet_title": "Ficha semanal de memorización",
  "hafs_note": "Mushaf de Medina, lectura de Hafs ʿan ʿĀṣim (Complejo Rey Fahd)",
  "sheet_teacher_note": "Nota del maestro:",
  "m_known": "ya la sabía",
  "m_done": "memorizada ✓",
  "m_planned": "prevista hacia el {d}",
  "share": "Compartir",
  "btn_edit": "Modificar el plan",
  "btn_reminder": "Añadir un recordatorio al calendario",
  "btn_backup": "Copiar el enlace de copia de seguridad",
  "confirm_reset": "¿Borrar este plan y todo su avance?",
  "yes_reset": "Sí, borrar",
  "cancel": "Cancelar",
  "btn_reset": "Empezar de nuevo",
  "privacy_short": "Todo se guarda solo en este dispositivo. El enlace de copia de seguridad recupera el avance en otro teléfono y no incluye el nombre.",
  "setup_title": "Crea el plan de tu hijo",
  "setup_edit_title": "Modificar el plan",
  "setup_edit_note": "Las aleyas ya recitadas siguen contando como memorizadas: solo cambia el programa que viene.",
  "step1": "¿Qué suras va a memorizar?",
  "pick_juzamma": "Todo el yuz ʿAmma, de An-Nas a An-Naba (37 suras)",
  "pick_last10": "Las 10 últimas suras, de An-Nas a Al-Fil",
  "pick_qul": "Al-Fatiha y los 3 «Qul» (Al-Ijlás, Al-Falaq, An-Nas)",
  "pick_custom": "Elijo yo las suras",
  "more_surahs": "Ver las demás suras",
  "order": "Orden",
  "order_end": "Desde el final (An-Nas primero)",
  "order_start": "En el orden del mushaf",
  "step2": "¿Cuáles se sabe ya tu hijo?",
  "step2_hint": "Se repasarán, no se volverán a memorizar. Si se las sabe todas, el plan propone solo repaso.",
  "known_all": "Se las sabe todas: solo repaso",
  "choose_first": "Primero elige las suras.",
  "step3": "¿A qué ritmo?",
  "days_label": "Días de sesión",
  "mode_amount": "Elijo cuántas aleyas nuevas por sesión",
  "amount_label": "Aleyas por sesión",
  "mode_date": "Quiero terminar antes de una fecha",
  "target_label": "Terminar antes del",
  "advanced": "Ajustes del repaso",
  "recent_label": "Repaso reciente: últimas sesiones que se repasan",
  "old_label": "Repaso antiguo: aleyas por sesión (aprox.)",
  "time_label": "Hora del recordatorio",
  "name_label": "Nombre (opcional)",
  "name_ph": "p. ej., Yasmín",
  "name_note": "El nombre solo sirve para distinguir a tus hijos y se queda en este teléfono.",
  "btn_start": "Crear el plan",
  "btn_save": "Guardar",
  "err_surahs": "Elige al menos una sura.",
  "err_days": "Elige al menos un día de sesión.",
  "err_target": "Indica una fecha futura.",
  "copied": "Copiado ✓",
  "reminder_title": "Sesión de Corán",
  "reminder_desc": "Es la hora de la sesión de memorización.",
  "import_q_one": "Este enlace contiene un plan con {n} aleya memorizada. ¿Añadirlo a este teléfono?",
  "import_q_other": "Este enlace contiene un plan con {n} aleyas memorizadas. ¿Añadirlo a este teléfono?",
  "import_yes": "Añadir el plan",
  "card_head": "Sura memorizada",
  "card_text": "¡Alhamdulillah! Sura {s} memorizada 🌙",
  "card_save": "Mantén pulsada la imagen o haz clic derecho para guardarla.",
  "close": "Cerrar",
  "surah_full": "{s} (sura completa)",
  "surah_ayah": "{s}, aleya {a}",
  "surah_ayahs": "{s}, aleyas {a}–{b}",
  "and_more": "y {n} más",
  "mushaf_btn": "Mushaf p. {p}",
  "mushaf_title": "Mushaf de Medina, página {p}",
  "mushaf_next": "Página siguiente",
  "mushaf_prev": "Página anterior",
  "mushaf_credit": "Mushaf de Medina (Hafs) · Complejo Rey Fahd para la Impresión del Sagrado Corán",
  "mushaf_error": "No se pudo cargar esta página. Comprueba tu conexión.",
  "mushaf_preview_only": "Esta vista previa solo incluye Al-Fatiha y el yuz ʿAmma. Las 604 páginas están en el sitio publicado."
 },
 "home": {
  "title": "Our Quran Time — cuaderno de memorización del Corán para familias",
  "description": "Sabe cada día qué memorizar y qué repasar con tu hijo. Yuz ʿAmma, suras cortas y una ficha semanal para el maestro. Gratis y sin cuenta.",
  "h1": "Esta noche, ya sabes qué recitar",
  "lead": "Un cuaderno de hifz para padres: cada día, el pasaje nuevo de tu hijo y sus repasos, a su ritmo. ¿Se saltaron una sesión? El plan sigue justo donde lo dejaron.",
  "content": "<h2>Cómo funciona</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>Nuevo</b>Un pasaje corto para memorizar, normalmente de 2 a 5 aleyas (el <em>sabaq</em>).</li><li class=\"t-sabqi\"><b>Repaso reciente</b>Los pasajes de las últimas sesiones, hasta que estén firmes (el <em>sabqi</em>).</li><li class=\"t-manzil\"><b>Repaso antiguo</b>Una o dos suras ya sabidas, por turnos, para no olvidar nada (el <em>manzil</em>).</li></ul><p>Marcas lo que tu hijo ha recitado de verdad. Si duda, toca «Repetir»: el pasaje vuelve en la próxima sesión. Si se salta un día, no se pierde nada: el plan continúa donde estaban.</p><h2>Una sesión típica (de 10 a 15 minutos)</h2><ol><li>Abran el pasaje en el Mushaf de Medina (botón 📖) y léanlo juntos.</li><li>Escuchen tres veces el pasaje nuevo con el botón «Escuchar».</li><li>Repitan aleya por aleya y después encadenen las aleyas.</li><li>Tu hijo recita sin mirar: «Recitado» o «Repetir».</li><li>Hagan el repaso reciente y luego el repaso antiguo.</li></ol><h2>Consejos para los padres</h2><ul><li><strong>Poco y constante</strong>: 10 minutos al día valen más que una hora el fin de semana.</li><li><strong>Siempre a la misma hora</strong>: después de una oración o antes de dormir. El recordatorio del calendario ayuda mucho.</li><li><strong>Anima</strong>: cada pasaje recitado es una estrella, cada sura memorizada es una fiesta.</li><li><strong>Recitar en la oración</strong>: es el mejor repaso.</li></ul><h2>Para el maestro</h2><p>La ficha semanal resume los pasajes previstos y lo que se ha recitado de verdad. Imprímela o pégala en WhatsApp: el maestro ve de un vistazo por dónde va el niño y puede añadir una nota.</p><p class=\"note\">Este cuaderno organiza la memorización; no sustituye a un maestro que escuche al niño y corrija su recitación (tajwid).</p><h2>Preguntas frecuentes</h2><div class=\"faq\"><details><summary>¿Dónde se guardan los datos de mi hijo?</summary><p>Solo en tu teléfono. Sin cuenta y sin servidor. El nombre es opcional.</p></details><details><summary>Tengo varios hijos.</summary><p>Crea un plan para cada uno con «+ Añadir un hijo». Cada plan tiene su propio avance.</p></details><details><summary>Nos hemos saltado varios días.</summary><p>No pasa nada: la sesión de hoy sigue exactamente donde lo dejaron y la fecha de fin estimada se vuelve a calcular.</p></details><details><summary>Voy a cambiar de teléfono.</summary><p>En «Ajustes», copia el enlace de copia de seguridad y ábrelo en el teléfono nuevo.</p></details><details><summary>¿Qué mushaf se toma como referencia?</summary><p>El Mushaf de Medina en la lectura de Hafs ʿan ʿĀṣim, impreso por el Complejo Rey Fahd para la Impresión del Sagrado Corán: 604 páginas y 6236 aleyas. Los números de aleya y las páginas coinciden con este mushaf, el más extendido del mundo.</p></details><details><summary>¿Es gratis?</summary><p>Sí, gratis y sin publicidad durante la fase de prueba.</p></details></div>"
 },
 "legal": {
  "private": "Este sitio lo publica un particular, sin fines profesionales. Conforme a la ley francesa (LCEN, art. 1-1, II), el editor ha optado por mantener el anonimato; sus datos se han facilitado al proveedor de alojamiento indicado más abajo.<br>Contacto: {mail}",
  "controller": "el editor del sitio (particular)",
  "phone": "Teléfono:",
  "email": "Correo electrónico:",
  "director": "Director de la publicación"
 }
}
```

---

## 17. Textes du carnet, arabe (ar.json)

*Fichier : `hifz/src/i18n/ar.json`*

```json
{
 "meta": {
  "lang_name": "العربية",
  "dir": "rtl",
  "og_locale": "ar_AR",
  "suggest": "هذا الموقع متوفّر باللغة العربية.",
  "date_fmt": "{d} {m} {y}",
  "months": [
   "يناير",
   "فبراير",
   "مارس",
   "أبريل",
   "مايو",
   "يونيو",
   "يوليو",
   "أغسطس",
   "سبتمبر",
   "أكتوبر",
   "نوفمبر",
   "ديسمبر"
  ]
 },
 "ui": {
  "skip": "تخطَّ إلى المحتوى",
  "language": "اللغة",
  "footer": "تذييل الصفحة",
  "footer_note": "مجاني ودون حساب. يبقى تقدّم طفلك على هاتفك.",
  "nav_home": "الدفتر",
  "nav_surahs": "خطط السور",
  "nav_about": "عن الموقع",
  "nav_privacy": "الخصوصية",
  "nav_legal": "الإشعار القانوني",
  "support": "ادعم هذا المشروع",
  "loading": "جارٍ التحميل…",
  "children_nav": "الأطفال",
  "progress_title": "التقدّم",
  "week_title": "ورقة الأسبوع",
  "miles_title": "السور",
  "tools_title": "الإعدادات",
  "tagline": "دفتر حفظ القرآن الكريم للعائلات"
 },
 "app": {
  "child_n": "الطفل {n}",
  "add_child": "+ إضافة طفل",
  "listen": "استمع ▶",
  "status_ok": "تمّ التسميع ✓",
  "status_again": "يُعاد ↻",
  "missed_one": "لم تُنجَز جلسة واحدة ({d}). لا بأس، نُكمل ببساطة من حيث توقّفتم.",
  "missed_many_two": "لم تُنجَز جلستان منذ {d}. لا بأس، نُكمل ببساطة من حيث توقّفتم.",
  "missed_many_few": "لم تُنجَز {n} جلسات منذ {d}. لا بأس، نُكمل ببساطة من حيث توقّفتم.",
  "missed_many_many": "لم تُنجَز {n} جلسة منذ {d}. لا بأس، نُكمل ببساطة من حيث توقّفتم.",
  "missed_many_other": "لم تُنجَز {n} جلسة منذ {d}. لا بأس، نُكمل ببساطة من حيث توقّفتم.",
  "missed_ack": "حسنًا",
  "today_title": "اليوم، {d}",
  "skipped_today": "أُجِّلت الجلسة. تتكيّف الخطة ولا يضيع شيء.",
  "undo": "تراجع",
  "rest_day": "يوم راحة.",
  "next_session": "الجلسة القادمة: {d}.",
  "do_extra": "أداء جلسة رغم ذلك",
  "btn_recited": "تمّ التسميع ✓",
  "btn_again": "يُعاد",
  "btn_rev_ok": "ممتاز ✓",
  "btn_rework": "تحتاج إلى تثبيت",
  "all_learned": "حُفِظت كل السور المختارة، الحمد لله! نواصل المراجعة حتى لا يُنسى شيء.",
  "new": "حفظ جديد",
  "recent": "مراجعة قريبة",
  "old": "مراجعة بعيدة",
  "again_note": "لم يثبت بعد: سيعود هذا المقطع في الجلسة القادمة.",
  "nothing_today": "لا شيء للمراجعة بعد.",
  "session_done": "اكتملت الجلسة، بارك الله فيك! ⭐",
  "btn_skip": "تأجيل الجلسة",
  "session_hint": "من 10 إلى 15 دقيقة تقريبًا.",
  "stat_ayahs": "آيات محفوظة",
  "stat_stars": "مقاطع مُسمَّعة",
  "stat_streak": "جلسات متتالية",
  "stat_end": "الإتمام المتوقَّع",
  "stat_end_done": "حُفِظ كلّه",
  "pace_zero": "الوتيرة: لا آيات جديدة في الجلسة.",
  "pace_one": "الوتيرة: آية جديدة واحدة في كل جلسة.",
  "pace_two": "الوتيرة: آيتان جديدتان في كل جلسة.",
  "pace_few": "الوتيرة: {n} آيات جديدة في كل جلسة.",
  "pace_many": "الوتيرة: {n} آية جديدة في كل جلسة.",
  "pace_other": "الوتيرة: {n} آية جديدة في كل جلسة.",
  "target_ok": "هدف {d}: أنتم على الطريق الصحيح (الإتمام المتوقَّع {e}).",
  "target_impossible": "لا يمكن بلوغ هدف {d} حتى بعشرين آية في الجلسة (الإتمام المتوقَّع {e}). اختر تاريخًا أبعد.",
  "rest": "راحة",
  "skipped": "مؤجَّلة",
  "missed": "لم تُنجَز",
  "week_of": "أسبوع {a} – {b}",
  "col_day": "اليوم",
  "col_parent": "وليّ الأمر",
  "col_teacher": "المعلّم",
  "btn_print": "طباعة الورقة",
  "btn_copy_week": "نسخ الورقة للمعلّم",
  "sheet_title": "ورقة الحفظ الأسبوعية",
  "hafs_note": "مصحف المدينة النبوية، رواية حفص عن عاصم (مجمع الملك فهد)",
  "sheet_teacher_note": "ملاحظة المعلّم:",
  "m_known": "محفوظة من قبل",
  "m_done": "حُفِظت ✓",
  "m_planned": "متوقَّعة نحو {d}",
  "share": "مشاركة",
  "btn_edit": "تعديل الخطة",
  "btn_reminder": "إضافة تذكير إلى التقويم",
  "btn_backup": "نسخ رابط النسخة الاحتياطية",
  "confirm_reset": "حذف هذه الخطة وكل تقدّمها؟",
  "yes_reset": "نعم، احذف",
  "cancel": "إلغاء",
  "btn_reset": "البدء من جديد",
  "privacy_short": "يُحفَظ كل شيء على هذا الجهاز فقط. رابط النسخة الاحتياطية يستعيد التقدّم على هاتف آخر، ولا يتضمّن الاسم.",
  "setup_title": "أنشئ خطة طفلك",
  "setup_edit_title": "تعديل الخطة",
  "setup_edit_note": "تبقى الآيات التي سُمِّعت محفوظة، ويتغيّر البرنامج القادم فقط.",
  "step1": "ما السور التي سيحفظها؟",
  "pick_juzamma": "جزء عمّ كاملًا، من سورة الناس إلى سورة النبأ (37 سورة)",
  "pick_last10": "آخر عشر سور، من سورة الناس إلى سورة الفيل",
  "pick_qul": "الفاتحة والمعوِّذات (الإخلاص والفلق والناس)",
  "pick_custom": "أختار السور بنفسي",
  "more_surahs": "عرض السور الأخرى",
  "order": "الترتيب",
  "order_end": "من آخر المصحف (الناس أولًا)",
  "order_start": "بترتيب المصحف",
  "step2": "ما الذي يحفظه طفلك من قبل؟",
  "step2_hint": "ستُراجَع ولن يُعاد حفظها. إن كان يحفظها كلها، تقترح الخطة المراجعة فقط.",
  "known_all": "يحفظها كلها: مراجعة فقط",
  "choose_first": "اختر السور أولًا.",
  "step3": "ما الوتيرة المناسبة؟",
  "days_label": "أيام الجلسات",
  "mode_amount": "أختار عدد الآيات الجديدة في كل جلسة",
  "amount_label": "عدد الآيات في الجلسة",
  "mode_date": "أريد الإتمام قبل تاريخ معيّن",
  "target_label": "الإتمام قبل",
  "advanced": "إعدادات المراجعة",
  "recent_label": "المراجعة القريبة: عدد الجلسات الأخيرة التي تُراجَع",
  "old_label": "المراجعة البعيدة: عدد الآيات في كل جلسة (تقريبًا)",
  "time_label": "وقت التذكير",
  "name_label": "الاسم (اختياري)",
  "name_ph": "مثال: ياسمين",
  "name_note": "يفيد الاسم فقط في التمييز بين أطفالك، ويبقى على هذا الهاتف.",
  "btn_start": "إنشاء الخطة",
  "btn_save": "حفظ التغييرات",
  "err_surahs": "اختر سورة واحدة على الأقل.",
  "err_days": "اختر يومًا واحدًا على الأقل للجلسات.",
  "err_target": "أدخل تاريخًا في المستقبل.",
  "copied": "تمّ النسخ ✓",
  "reminder_title": "جلسة القرآن",
  "reminder_desc": "حان وقت جلسة الحفظ.",
  "import_q_zero": "يحتوي هذا الرابط على خطة لم تُحفَظ فيها آيات بعد. هل تضيفها إلى هذا الهاتف؟",
  "import_q_one": "يحتوي هذا الرابط على خطة حُفِظت فيها آية واحدة. هل تضيفها إلى هذا الهاتف؟",
  "import_q_two": "يحتوي هذا الرابط على خطة حُفِظت فيها آيتان. هل تضيفها إلى هذا الهاتف؟",
  "import_q_few": "يحتوي هذا الرابط على خطة حُفِظت فيها {n} آيات. هل تضيفها إلى هذا الهاتف؟",
  "import_q_many": "يحتوي هذا الرابط على خطة حُفِظت فيها {n} آية. هل تضيفها إلى هذا الهاتف؟",
  "import_q_other": "يحتوي هذا الرابط على خطة حُفِظت فيها {n} آية. هل تضيفها إلى هذا الهاتف؟",
  "import_yes": "إضافة الخطة",
  "card_head": "تمّ حفظ سورة",
  "card_text": "الحمد لله! تمّ حفظ سورة {s} 🌙",
  "card_save": "اضغط مطوّلًا على الصورة أو انقر بالزر الأيمن لحفظها.",
  "close": "إغلاق",
  "surah_full": "{s} (السورة كاملة)",
  "surah_ayah": "{s}، الآية {a}",
  "surah_ayahs": "{s}، الآيات {a}–{b}",
  "and_more": "و{n} غيرها",
  "mushaf_btn": "المصحف ص {p}",
  "mushaf_title": "مصحف المدينة النبوية، الصفحة {p}",
  "mushaf_next": "الصفحة التالية",
  "mushaf_prev": "الصفحة السابقة",
  "mushaf_credit": "مصحف المدينة النبوية (رواية حفص) · مجمع الملك فهد لطباعة المصحف الشريف",
  "mushaf_error": "تعذّر تحميل هذه الصفحة. تحقّق من اتصالك بالإنترنت.",
  "mushaf_preview_only": "لا تتضمّن هذه المعاينة إلا الفاتحة وجزء عمّ. الصفحات الـ604 كلها متاحة على الموقع المنشور."
 },
 "home": {
  "title": "Our Quran Time — دفتر حفظ القرآن الكريم للعائلات",
  "description": "اعرف كل يوم ما يحفظه طفلك وما يراجعه: جزء عمّ والسور القصيرة، وورقة أسبوعية للمعلّم. مجاني ودون حساب.",
  "h1": "الليلة، تعرف ماذا يحفظ طفلك وماذا يراجع",
  "lead": "دفتر حفظ لأولياء الأمور: كل يوم، المقطع الجديد لطفلك ومراجعاته، على قدر طاقته. فاتتكم جلسة؟ تُكمل الخطة ببساطة من حيث توقّفتم.",
  "content": "<h2>كيف يعمل الدفتر</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>حفظ جديد</b>مقطع قصير يُحفَظ، غالبًا من آيتين إلى خمس آيات.</li><li class=\"t-sabqi\"><b>مراجعة قريبة</b>مقاطع الجلسات الأخيرة، حتى تثبت.</li><li class=\"t-manzil\"><b>مراجعة بعيدة</b>سورة أو سورتان محفوظتان بالتناوب، حتى لا يُنسى شيء.</li></ul><p>تؤشّر على ما سمّعه طفلك فعلًا. إن تردّد فاضغط «يُعاد»، فيعود المقطع في الجلسة القادمة. وإن فاتكم يوم فلا يضيع شيء: تستأنف الخطة من حيث كنتم.</p><h2>جلسة نموذجية (من 10 إلى 15 دقيقة)</h2><ol><li>افتح المقطع في مصحف المدينة النبوية (زر 📖) واقرأه مع طفلك.</li><li>استمع إلى المقطع الجديد ثلاث مرات بزر «استمع».</li><li>كرّر مع طفلك آيةً آية، ثم صِل الآيات بعضها ببعض.</li><li>يُسمِّع طفلك دون أن ينظر في المصحف: «تمّ التسميع» أو «يُعاد».</li><li>أنجز المراجعة القريبة، ثم المراجعة البعيدة.</li></ol><h2>نصائح لأولياء الأمور</h2><ul><li><strong>قليل دائم</strong>: عشر دقائق كل يوم خير من ساعة في نهاية الأسبوع.</li><li><strong>الوقت نفسه</strong>: بعد إحدى الصلوات أو قبل النوم. ويساعد تذكير التقويم كثيرًا.</li><li><strong>شجِّع</strong>: كل مقطع يُسمَّع نجمة، وكل سورة تُحفَظ فرحة.</li><li><strong>القراءة في الصلاة</strong>: هي أفضل مراجعة.</li></ul><h2>للمعلّم</h2><p>تلخّص الورقة الأسبوعية المقاطع المقرّرة وما سُمِّع فعلًا. اطبعها أو الصقها في واتساب: يرى المعلّم بنظرة واحدة أين وصل الطفل، ويمكنه إضافة ملاحظة.</p><p class=\"note\">ينظّم هذا الدفتر الحفظ، ولا يُغني عن معلّم يستمع إلى الطفل ويصحّح تلاوته وتجويده.</p><h2>أسئلة شائعة</h2><div class=\"faq\"><details><summary>أين تُحفَظ بيانات طفلي؟</summary><p>على هاتفك فقط. لا حساب ولا خادم، والاسم اختياري.</p></details><details><summary>لديّ أكثر من طفل.</summary><p>أضف خطة لكل طفل عبر «+ إضافة طفل». لكل خطة تقدّمها الخاص.</p></details><details><summary>فاتتنا عدة أيام.</summary><p>لا بأس: تستأنف جلسة اليوم من حيث توقّفتم تمامًا، ويُعاد حساب موعد الإتمام المتوقَّع.</p></details><details><summary>سأغيّر هاتفي.</summary><p>في «الإعدادات»، انسخ رابط النسخة الاحتياطية وافتحه على الهاتف الجديد.</p></details><details><summary>ما المصحف المعتمد؟</summary><p>مصحف المدينة النبوية برواية حفص عن عاصم، من طباعة مجمع الملك فهد لطباعة المصحف الشريف: 604 صفحات و6236 آية. أرقام الآيات والصفحات مطابقة لهذا المصحف، وهو الأوسع انتشارًا في العالم.</p></details><details><summary>هل هو مجاني؟</summary><p>نعم، مجاني ودون إعلانات خلال مرحلة التجربة.</p></details></div>"
 },
 "legal": {
  "private": "ينشر هذا الموقعَ فردٌ بصفة غير مهنية. ووفقًا للقانون الفرنسي (قانون الثقة في الاقتصاد الرقمي LCEN، المادة 1-1، الفقرة II)، اختار الناشر عدم الكشف عن هويته، وقد زوّد المستضيف المذكور أدناه ببياناته.<br>للتواصل: {mail}",
  "controller": "ناشر الموقع (فرد)",
  "phone": "الهاتف:",
  "email": "البريد الإلكتروني:",
  "director": "مدير النشر"
 }
}
```

---

## 18. Textes du carnet, français (fr.json)

*Fichier : `hifz/src/i18n/fr.json`*

```json
{
 "meta": {
  "lang_name": "Français",
  "dir": "ltr",
  "og_locale": "fr_FR",
  "suggest": "Ce site existe en français.",
  "date_fmt": "{d} {m} {y}",
  "months": [
   "janvier",
   "février",
   "mars",
   "avril",
   "mai",
   "juin",
   "juillet",
   "août",
   "septembre",
   "octobre",
   "novembre",
   "décembre"
  ]
 },
 "ui": {
  "skip": "Aller au contenu",
  "language": "Langue",
  "footer": "Pied de page",
  "footer_note": "Gratuit, sans compte. Le suivi de votre enfant reste sur votre téléphone.",
  "nav_home": "Le carnet",
  "nav_surahs": "Plans par sourate",
  "nav_about": "À propos",
  "nav_privacy": "Confidentialité",
  "nav_legal": "Mentions légales",
  "support": "Soutenir ce projet",
  "loading": "Chargement…",
  "children_nav": "Enfants",
  "progress_title": "Progression",
  "week_title": "Fiche de la semaine",
  "miles_title": "Sourates",
  "tools_title": "Réglages",
  "tagline": "Le carnet de mémorisation du Coran pour les familles"
 },
 "app": {
  "child_n": "Enfant {n}",
  "add_child": "+ Ajouter un enfant",
  "listen": "Écouter ▶",
  "status_ok": "Récité ✓",
  "status_again": "À revoir ↻",
  "missed_one": "Une séance n’a pas été faite ({d}). Pas grave : on reprend simplement là où vous en étiez.",
  "missed_many": "{n} séances n’ont pas été faites depuis le {d}. Pas grave : on reprend simplement là où vous en étiez.",
  "missed_ack": "Compris",
  "today_title": "Aujourd’hui, {d}",
  "skipped_today": "Séance reportée. Le programme s’adapte : rien n’est perdu.",
  "undo": "Annuler",
  "rest_day": "Jour de repos.",
  "next_session": "Prochaine séance : {d}.",
  "do_extra": "Faire une séance quand même",
  "btn_recited": "Récité ✓",
  "btn_again": "À revoir",
  "btn_rev_ok": "C’est bon ✓",
  "btn_rework": "À retravailler",
  "all_learned": "Toutes les sourates choisies sont apprises, alhamdulillah ! On continue la révision pour ne rien oublier.",
  "new": "Nouveau",
  "recent": "Révision récente",
  "old": "Révision ancienne",
  "again_note": "Pas encore solide : ce passage reviendra à la prochaine séance.",
  "nothing_today": "Rien à réviser pour l’instant.",
  "session_done": "Séance terminée, barakAllahu fik ! ⭐",
  "btn_skip": "Reporter la séance",
  "session_hint": "Environ 10 à 15 minutes.",
  "stat_ayahs": "versets acquis",
  "stat_stars": "passages récités",
  "stat_streak": "séances d’affilée",
  "stat_end": "fin estimée",
  "stat_end_done": "tout est appris",
  "target_ok": "Objectif du {d} : tenu (fin estimée le {e}).",
  "target_impossible": "Objectif du {d} impossible à tenir même à 20 versets par séance (fin estimée le {e}). Choisissez une date plus lointaine.",
  "rest": "Repos",
  "skipped": "Reportée",
  "missed": "Non faite",
  "week_of": "Semaine du {a} au {b}",
  "col_day": "Jour",
  "col_parent": "Parent",
  "col_teacher": "Enseignant",
  "btn_print": "Imprimer la fiche",
  "btn_copy_week": "Copier la fiche pour l’enseignant",
  "sheet_title": "Fiche de hifz de la semaine",
  "hafs_note": "Mushaf de Médine, Hafs ʿan ʿĀṣim (Complexe du Roi Fahd)",
  "sheet_teacher_note": "Remarque de l’enseignant :",
  "m_known": "déjà connue",
  "m_done": "apprise ✓",
  "m_planned": "prévue vers le {d}",
  "share": "Partager",
  "btn_edit": "Modifier le plan",
  "btn_reminder": "Ajouter un rappel à l’agenda",
  "btn_backup": "Copier le lien de sauvegarde",
  "confirm_reset": "Effacer ce plan et toute sa progression ?",
  "yes_reset": "Oui, effacer",
  "cancel": "Annuler",
  "btn_reset": "Recommencer à zéro",
  "privacy_short": "Tout est enregistré sur cet appareil uniquement. Le lien de sauvegarde permet de retrouver la progression sur un autre téléphone ; il ne contient pas le prénom.",
  "setup_title": "Créer le plan de votre enfant",
  "setup_edit_title": "Modifier le plan",
  "setup_edit_note": "Les versets déjà récités restent acquis : seul le programme à venir change.",
  "step1": "Quelles sourates apprendre ?",
  "pick_juzamma": "Juz ʿAmma complet, d’An-Nas à An-Naba (37 sourates)",
  "pick_last10": "Les 10 dernières sourates, d’An-Nas à Al-Fil",
  "pick_qul": "Al-Fatiha et les 3 « Qul » (Al-Ikhlas, Al-Falaq, An-Nas)",
  "pick_custom": "Je choisis les sourates",
  "more_surahs": "Afficher les autres sourates",
  "order": "Ordre",
  "order_end": "De la fin (An-Nas en premier)",
  "order_start": "Dans l’ordre du mushaf",
  "step2": "Lesquelles sont déjà connues ?",
  "step2_hint": "Elles seront révisées mais pas réapprises. Si tout est déjà connu, le plan proposera seulement de la révision.",
  "known_all": "Toutes sont déjà connues : révision seulement",
  "choose_first": "Choisissez d’abord des sourates.",
  "step3": "Quel rythme ?",
  "days_label": "Jours de séance",
  "mode_amount": "Je choisis le nombre de versets nouveaux par séance",
  "amount_label": "Versets par séance",
  "mode_date": "Je veux finir avant une date",
  "target_label": "Finir avant le",
  "advanced": "Réglages de révision",
  "recent_label": "Révision récente : dernières séances à revoir",
  "old_label": "Révision ancienne : versets par séance (environ)",
  "time_label": "Heure du rappel",
  "name_label": "Prénom (facultatif)",
  "name_ph": "ex. Yasmine",
  "name_note": "Le prénom sert seulement à distinguer vos enfants et reste sur ce téléphone.",
  "btn_start": "Créer le plan",
  "btn_save": "Enregistrer",
  "err_surahs": "Choisissez au moins une sourate.",
  "err_days": "Choisissez au moins un jour de séance.",
  "err_target": "Indiquez une date à venir.",
  "copied": "Copié ✓",
  "reminder_title": "Séance de Coran",
  "reminder_desc": "C’est l’heure de la séance de hifz.",
  "import_yes": "Ajouter le plan",
  "card_head": "Sourate apprise",
  "card_text": "Alhamdulillah ! Sourate {s} apprise 🌙",
  "card_save": "Appui long ou clic droit sur l’image pour l’enregistrer.",
  "close": "Fermer",
  "surah_full": "{s} (sourate entière)",
  "surah_ayah": "{s}, verset {a}",
  "surah_ayahs": "{s}, versets {a} à {b}",
  "and_more": "et {n} autre(s)",
  "pace_one": "Rythme : {n} nouveau verset par séance.",
  "pace_other": "Rythme : {n} nouveaux versets par séance.",
  "import_q_one": "Ce lien contient un plan avec {n} verset acquis. L’ajouter sur ce téléphone ?",
  "import_q_other": "Ce lien contient un plan avec {n} versets acquis. L’ajouter sur ce téléphone ?",
  "mushaf_btn": "Mushaf p. {p}",
  "mushaf_title": "Mushaf de Médine, page {p}",
  "mushaf_next": "Page suivante",
  "mushaf_prev": "Page précédente",
  "mushaf_credit": "Mushaf de Médine (Hafs) · Complexe du Roi Fahd pour l’impression du Saint Coran",
  "mushaf_error": "Impossible de charger cette page. Vérifiez votre connexion.",
  "mushaf_preview_only": "Cet aperçu ne contient qu’Al-Fatiha et le Juz ʿAmma. Les 604 pages sont sur le site publié."
 },
 "home": {
  "title": "Our Quran Time — le carnet de mémorisation du Coran pour les familles",
  "description": "Chaque jour, sachez quoi apprendre et quoi réviser avec votre enfant. Juz ʿAmma, sourates courtes, fiche de la semaine pour l’enseignant. Gratuit, sans compte.",
  "h1": "Ce soir, on sait quoi réciter",
  "lead": "Un carnet de hifz pour les parents : chaque jour, le nouveau passage et les révisions de votre enfant, adaptés à son rythme. Une séance manquée ? Le programme se recale tout seul.",
  "content": "<h2>Comment ça marche ?</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>Nouveau</b>Un petit passage à apprendre, souvent 2 à 5 versets (le <em>sabaq</em>).</li><li class=\"t-sabqi\"><b>Révision récente</b>Les passages des dernières séances, pour qu’ils deviennent solides (le <em>sabqi</em>).</li><li class=\"t-manzil\"><b>Révision ancienne</b>Une ou deux sourates déjà connues, à tour de rôle, pour ne rien oublier (le <em>manzil</em>).</li></ul><p>Vous cochez ce que votre enfant a réellement récité. S’il hésite, « À revoir » : le passage revient à la séance suivante. Si vous sautez un jour, rien n’est perdu, le programme reprend où vous en étiez.</p><h2>Une séance type (10 à 15 minutes)</h2><ol><li>Ouvrez le passage dans le Mushaf de Médine (bouton 📖) et lisez-le ensemble.</li><li>Écoutez le nouveau passage trois fois avec le bouton « Écouter ».</li><li>Répétez verset par verset, puis enchaînez les versets.</li><li>Votre enfant récite sans regarder : « Récité » ou « À revoir ».</li><li>Faites la révision récente, puis la révision ancienne.</li></ol><h2>Conseils pour les parents</h2><ul><li><strong>Court et régulier</strong> : 10 minutes chaque jour valent mieux qu’une heure le week-end.</li><li><strong>Même moment</strong> : après une prière ou avant le coucher. Le rappel dans l’agenda aide beaucoup.</li><li><strong>Encouragez</strong> : chaque passage récité est une étoile, chaque sourate apprise se fête.</li><li><strong>Faites-le réciter en prière</strong> : c’est la meilleure des révisions.</li></ul><h2>Pour l’enseignant</h2><p>La fiche de la semaine résume les passages prévus et ceux réellement récités. Imprimez-la ou copiez-la dans WhatsApp : l’enseignant voit d’un coup d’œil où en est l’enfant et peut écrire sa remarque.</p><p class=\"note\">Ce carnet organise la mémorisation ; il ne remplace pas un enseignant qui écoute l’enfant et corrige sa récitation (tajwid).</p><h2>Questions fréquentes</h2><div class=\"faq\"><details><summary>Où sont enregistrées les données de mon enfant ?</summary><p>Uniquement sur votre téléphone. Aucun compte, aucun serveur. Le prénom est facultatif.</p></details><details><summary>J’ai plusieurs enfants.</summary><p>Ajoutez un plan par enfant avec « + Ajouter un enfant ». Chaque plan a sa propre progression.</p></details><details><summary>Nous avons manqué plusieurs jours.</summary><p>Aucun souci : la séance du jour reprend exactement là où vous vous êtes arrêtés, et la date de fin estimée se recalcule.</p></details><details><summary>Je change de téléphone.</summary><p>Dans « Réglages », copiez le lien de sauvegarde et ouvrez-le sur le nouveau téléphone.</p></details><details><summary>Quel mushaf sert de référence ?</summary><p>Le Mushaf de Médine dans la lecture Hafs ʿan ʿĀṣim, imprimé par le Complexe du Roi Fahd pour l’impression du Saint Coran : 604 pages et 6 236 versets. Les numéros de versets et les pages correspondent à ce mushaf, le plus répandu au monde.</p></details><details><summary>Est-ce gratuit ?</summary><p>Oui, gratuit et sans publicité pendant la phase de test.</p></details></div>"
 },
 "legal": {
  "private": "Site édité par un particulier, à titre non professionnel. Conformément à l’article 1-1, II de la LCEN, l’éditeur a choisi de préserver son anonymat ; ses coordonnées ont été communiquées à l’hébergeur ci-dessous.<br>Contact : {mail}",
  "controller": "l’éditeur du site (particulier)",
  "phone": "Téléphone :",
  "email": "E-mail :",
  "director": "Directeur de la publication"
 }
}
```

---

## 19. Textes du carnet, bengali (bn.json)

*Fichier : `hifz/src/i18n/bn.json`*

```json
{
 "meta": {
  "lang_name": "বাংলা",
  "dir": "ltr",
  "og_locale": "bn_BD",
  "suggest": "এই ওয়েবসাইটটি বাংলায়ও পড়া যায়।",
  "date_fmt": "{d} {m} {y}",
  "digits": "০১২৩৪৫৬৭৮৯",
  "months": [
   "জানুয়ারি",
   "ফেব্রুয়ারি",
   "মার্চ",
   "এপ্রিল",
   "মে",
   "জুন",
   "জুলাই",
   "আগস্ট",
   "সেপ্টেম্বর",
   "অক্টোবর",
   "নভেম্বর",
   "ডিসেম্বর"
  ]
 },
 "ui": {
  "skip": "মূল অংশে যান",
  "language": "ভাষা",
  "footer": "পাদটীকা",
  "footer_note": "বিনামূল্যে, কোনো অ্যাকাউন্ট লাগে না। আপনার সন্তানের অগ্রগতি আপনার ফোনেই থাকে।",
  "nav_home": "হিফজ খাতা",
  "nav_surahs": "সূরাভিত্তিক পরিকল্পনা",
  "nav_about": "আমাদের কথা",
  "nav_privacy": "গোপনীয়তা",
  "nav_legal": "আইনি তথ্য",
  "support": "এই উদ্যোগে সহায়তা করুন",
  "loading": "লোড হচ্ছে…",
  "children_nav": "সন্তানেরা",
  "progress_title": "অগ্রগতি",
  "week_title": "এই সপ্তাহের শিট",
  "miles_title": "সূরাসমূহ",
  "tools_title": "সেটিংস",
  "tagline": "পরিবারের জন্য কুরআন হিফজের খাতা"
 },
 "app": {
  "child_n": "সন্তান {n}",
  "add_child": "+ আরেকটি সন্তান যোগ করুন",
  "listen": "শুনুন ▶",
  "status_ok": "শুনিয়েছে ✓",
  "status_again": "আবার পড়বে ↻",
  "missed_one": "একটি সেশন হয়নি ({d})। সমস্যা নেই: যেখানে থেমেছিলেন, সেখান থেকেই আবার শুরু হবে।",
  "missed_many": "{d} থেকে {n}টি সেশন হয়নি। সমস্যা নেই: যেখানে থেমেছিলেন, সেখান থেকেই আবার শুরু হবে।",
  "missed_ack": "ঠিক আছে",
  "today_title": "আজ, {d}",
  "skipped_today": "সেশনটি পিছিয়ে দেওয়া হয়েছে। পরিকল্পনা নিজেকে মানিয়ে নেবে, কিছুই হারাবে না।",
  "undo": "ফিরিয়ে নিন",
  "rest_day": "আজ বিশ্রামের দিন।",
  "next_session": "পরের সেশন: {d}।",
  "do_extra": "তবুও একটি সেশন করুন",
  "btn_recited": "শুনিয়েছে ✓",
  "btn_again": "আবার পড়বে",
  "btn_rev_ok": "সব ঠিক আছে ✓",
  "btn_rework": "আরও অনুশীলন দরকার",
  "all_learned": "বাছাই করা সব সূরা মুখস্থ হয়ে গেছে, আলহামদুলিল্লাহ! কিছু যেন ভুলে না যায়, তাই রিভিশন চলতে থাকবে।",
  "new": "নতুন সবক",
  "recent": "সাম্প্রতিক রিভিশন",
  "old": "পুরোনো রিভিশন",
  "again_note": "এখনও পাকা হয়নি: এই অংশটি পরের সেশনে আবার আসবে।",
  "nothing_today": "এখনও রিভিশনের কিছু নেই।",
  "session_done": "সেশন শেষ, বারাকাল্লাহু ফীক! ⭐",
  "btn_skip": "সেশন পিছিয়ে দিন",
  "session_hint": "প্রায় ১০ থেকে ১৫ মিনিট।",
  "stat_ayahs": "আয়াত মুখস্থ",
  "stat_stars": "অংশ শোনানো হয়েছে",
  "stat_streak": "টানা সেশন",
  "stat_end": "সম্ভাব্য সমাপ্তি",
  "stat_end_done": "সব মুখস্থ",
  "pace": "গতি: প্রতি সেশনে {n}টি নতুন আয়াত।",
  "target_ok": "লক্ষ্য {d}: ঠিক পথে আছেন (সম্ভাব্য সমাপ্তি {e})।",
  "target_impossible": "প্রতি সেশনে ২০টি আয়াত করলেও {d} তারিখের লক্ষ্য পূরণ হবে না (সম্ভাব্য সমাপ্তি {e})। আরও পরের একটি তারিখ বেছে নিন।",
  "rest": "বিশ্রাম",
  "skipped": "পিছানো",
  "missed": "হয়নি",
  "week_of": "সপ্তাহ: {a} – {b}",
  "col_day": "দিন",
  "col_parent": "অভিভাবক",
  "col_teacher": "উস্তাদ",
  "btn_print": "শিট প্রিন্ট করুন",
  "btn_copy_week": "উস্তাদের জন্য শিট কপি করুন",
  "sheet_title": "সাপ্তাহিক হিফজ শিট",
  "hafs_note": "মদীনা মুসহাফ, হাফস আন আসিম রেওয়ায়াত (বাদশাহ ফাহাদ কমপ্লেক্স)",
  "sheet_teacher_note": "উস্তাদের মন্তব্য:",
  "m_known": "আগে থেকেই মুখস্থ",
  "m_done": "মুখস্থ ✓",
  "m_planned": "সম্ভাব্য {d}",
  "share": "শেয়ার করুন",
  "btn_edit": "পরিকল্পনা বদলান",
  "btn_reminder": "ক্যালেন্ডারে রিমাইন্ডার যোগ করুন",
  "btn_backup": "ব্যাকআপ লিংক কপি করুন",
  "confirm_reset": "এই পরিকল্পনা ও এর সব অগ্রগতি মুছে ফেলবেন?",
  "yes_reset": "হ্যাঁ, মুছে ফেলুন",
  "cancel": "বাতিল",
  "btn_reset": "নতুন করে শুরু করুন",
  "privacy_short": "সবকিছু শুধু এই ডিভাইসেই সংরক্ষিত থাকে। ব্যাকআপ লিংক দিয়ে অন্য ফোনে অগ্রগতি ফিরিয়ে আনা যায়; তাতে নাম থাকে না।",
  "setup_title": "আপনার সন্তানের পরিকল্পনা তৈরি করুন",
  "setup_edit_title": "পরিকল্পনা বদলান",
  "setup_edit_note": "যে আয়াতগুলো শোনানো হয়ে গেছে সেগুলো মুখস্থ হিসেবেই থাকবে; শুধু সামনের পরিকল্পনা বদলাবে।",
  "step1": "কোন সূরাগুলো মুখস্থ করবে?",
  "pick_juzamma": "পুরো আমপারা, সূরা নাস থেকে সূরা নাবা পর্যন্ত (৩৭টি সূরা)",
  "pick_last10": "শেষ ১০টি সূরা, নাস থেকে ফীল পর্যন্ত",
  "pick_qul": "ফাতিহা ও তিন ‘কুল’ (ইখলাস, ফালাক, নাস)",
  "pick_custom": "আমি নিজে সূরা বাছাই করব",
  "more_surahs": "অন্য সূরাগুলো দেখুন",
  "order": "ক্রম",
  "order_end": "শেষ দিক থেকে (প্রথমে নাস)",
  "order_start": "মুসহাফের ক্রমে",
  "step2": "আপনার সন্তান আগে থেকে কোনগুলো পারে?",
  "step2_hint": "এগুলো নতুন করে মুখস্থ নয়, রিভিশন করা হবে। সবগুলো জানা থাকলে পরিকল্পনায় শুধু রিভিশন থাকবে।",
  "known_all": "সবগুলোই জানে: শুধু রিভিশন",
  "choose_first": "আগে সূরা বাছাই করুন।",
  "step3": "কী গতিতে?",
  "days_label": "সেশনের দিন",
  "mode_amount": "প্রতি সেশনে কয়টি নতুন আয়াত, তা আমি ঠিক করব",
  "amount_label": "প্রতি সেশনে আয়াত",
  "mode_date": "একটি নির্দিষ্ট তারিখের মধ্যে শেষ করতে চাই",
  "target_label": "শেষ করার তারিখ",
  "advanced": "রিভিশনের সেটিংস",
  "recent_label": "সাম্প্রতিক রিভিশন: শেষ কয়টি সেশনের পড়া",
  "old_label": "পুরোনো রিভিশন: প্রতি সেশনে আয়াত (আনুমানিক)",
  "time_label": "রিমাইন্ডারের সময়",
  "name_label": "নাম (ঐচ্ছিক)",
  "name_ph": "যেমন: আয়েশা",
  "name_note": "নামটি শুধু সন্তানদের আলাদা করে চেনার জন্য, আর এটি এই ফোনেই থাকে।",
  "btn_start": "পরিকল্পনা তৈরি করুন",
  "btn_save": "সংরক্ষণ করুন",
  "err_surahs": "অন্তত একটি সূরা বাছাই করুন।",
  "err_days": "সেশনের জন্য অন্তত একটি দিন বাছাই করুন।",
  "err_target": "ভবিষ্যতের একটি তারিখ দিন।",
  "copied": "কপি হয়েছে ✓",
  "reminder_title": "কুরআন সেশন",
  "reminder_desc": "হিফজ সেশনের সময় হয়েছে।",
  "import_q": "এই লিংকে একটি পরিকল্পনা আছে, যাতে {n}টি আয়াত মুখস্থ হয়েছে। এই ফোনে যোগ করবেন?",
  "import_yes": "পরিকল্পনা যোগ করুন",
  "card_head": "সূরা মুখস্থ হয়েছে",
  "card_text": "আলহামদুলিল্লাহ! সূরা {s} মুখস্থ হয়েছে 🌙",
  "card_save": "ছবিটি সংরক্ষণ করতে চেপে ধরে রাখুন বা রাইট-ক্লিক করুন।",
  "close": "বন্ধ করুন",
  "surah_full": "{s} (পুরো সূরা)",
  "surah_ayah": "{s}, আয়াত {a}",
  "surah_ayahs": "{s}, আয়াত {a}–{b}",
  "and_more": "আরও {n}টি",
  "mushaf_btn": "মুসহাফ পৃ. {p}",
  "mushaf_title": "মদীনা মুসহাফ, পৃষ্ঠা {p}",
  "mushaf_next": "পরের পৃষ্ঠা",
  "mushaf_prev": "আগের পৃষ্ঠা",
  "mushaf_credit": "মদীনা মুসহাফ (হাফস) · বাদশাহ ফাহাদ কুরআন মুদ্রণ কমপ্লেক্স",
  "mushaf_error": "পৃষ্ঠাটি লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে নিন।",
  "mushaf_preview_only": "এই প্রিভিউতে শুধু ফাতিহা ও আমপারা আছে। ৬০৪টি পৃষ্ঠাই প্রকাশিত ওয়েবসাইটে পাওয়া যাবে।"
 },
 "home": {
  "title": "Our Quran Time — পরিবারের জন্য কুরআন হিফজের খাতা",
  "description": "প্রতিদিন জানুন সন্তানের সঙ্গে কী মুখস্থ করবেন আর কী রিভিশন দেবেন। আমপারা, ছোট সূরা, আর উস্তাদের জন্য সাপ্তাহিক শিট। বিনামূল্যে, কোনো অ্যাকাউন্ট লাগে না।",
  "h1": "আজ রাতে কী পড়বে, আপনি জানেন",
  "lead": "অভিভাবকদের জন্য একটি হিফজ খাতা: প্রতিদিন আপনার সন্তানের নতুন সবক আর রিভিশন, তার নিজের গতিতে। কোনো সেশন বাদ পড়েছে? পরিকল্পনা সেখান থেকেই আবার শুরু হয়।",
  "content": "<h2>কীভাবে কাজ করে</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>নতুন সবক</b>মুখস্থ করার জন্য ছোট একটি অংশ, সাধারণত ২ থেকে ৫টি আয়াত (<em>সবক</em>)।</li><li class=\"t-sabqi\"><b>সাম্প্রতিক রিভিশন</b>শেষ কয়েকটি সেশনের পড়া, পাকা না হওয়া পর্যন্ত (<em>সাতসবক</em>)।</li><li class=\"t-manzil\"><b>পুরোনো রিভিশন</b>আগে মুখস্থ করা এক বা দুটি সূরা পালাক্রমে, যাতে কিছু ভুলে না যায় (<em>আমুখতা</em>)।</li></ul><p>সন্তান যা সত্যিই শুনিয়েছে, আপনি শুধু তাতে টিক দেবেন। আটকে গেলে “আবার পড়বে” চাপুন: অংশটি পরের সেশনে আবার আসবে। কোনো দিন বাদ পড়লেও কিছু হারায় না, পরিকল্পনা যেখানে ছিল সেখান থেকেই চলবে।</p><h2>একটি সাধারণ সেশন (১০ থেকে ১৫ মিনিট)</h2><ol><li>📖 বোতাম দিয়ে অংশটি মদীনা মুসহাফে খুলুন এবং একসঙ্গে পড়ুন।</li><li>“শুনুন” বোতাম দিয়ে নতুন অংশটি তিনবার শুনুন।</li><li>এক আয়াত এক আয়াত করে পুনরাবৃত্তি করুন, তারপর আয়াতগুলো জুড়ে পড়ুন।</li><li>সন্তান না দেখে শোনাবে: “শুনিয়েছে” অথবা “আবার পড়বে”।</li><li>এরপর সাম্প্রতিক রিভিশন, তারপর পুরোনো রিভিশন।</li></ol><h2>অভিভাবকদের জন্য পরামর্শ</h2><ul><li><strong>অল্প কিন্তু নিয়মিত</strong>: সপ্তাহান্তে এক ঘণ্টার চেয়ে প্রতিদিন ১০ মিনিট ভালো।</li><li><strong>একই সময়ে</strong>: কোনো নামাজের পরে বা ঘুমের আগে। ক্যালেন্ডারের রিমাইন্ডার খুব কাজে দেয়।</li><li><strong>উৎসাহ দিন</strong>: প্রতিটি শোনানো অংশ একটি তারা, প্রতিটি মুখস্থ সূরা একটি আনন্দের উপলক্ষ।</li><li><strong>নামাজে পড়ুক</strong>: এটাই সবচেয়ে ভালো রিভিশন।</li></ul><h2>উস্তাদের জন্য</h2><p>সাপ্তাহিক শিটে থাকে কী পড়ার কথা ছিল আর আসলে কী শোনানো হয়েছে। প্রিন্ট করুন বা হোয়াটসঅ্যাপে পেস্ট করুন: উস্তাদ এক নজরে দেখবেন সন্তান কোথায় আছে, আর চাইলে মন্তব্য লিখতে পারবেন।</p><p class=\"note\">এই খাতা হিফজ গুছিয়ে রাখে; যে উস্তাদ সন্তানের তিলাওয়াত শুনে তাজবীদ শুধরে দেন, তাঁর বিকল্প নয়।</p><h2>সাধারণ প্রশ্ন</h2><div class=\"faq\"><details><summary>আমার সন্তানের তথ্য কোথায় থাকে?</summary><p>শুধু আপনার ফোনে। কোনো অ্যাকাউন্ট নেই, কোনো সার্ভার নেই। নাম দেওয়া ঐচ্ছিক।</p></details><details><summary>আমার একাধিক সন্তান আছে।</summary><p>“+ আরেকটি সন্তান যোগ করুন” দিয়ে প্রত্যেকের জন্য আলাদা পরিকল্পনা করুন। প্রতিটির অগ্রগতি আলাদা থাকে।</p></details><details><summary>কয়েক দিন বাদ পড়ে গেছে।</summary><p>সমস্যা নেই: আজকের সেশন ঠিক যেখানে থেমেছিলেন সেখান থেকে শুরু হবে, আর সম্ভাব্য সমাপ্তির তারিখ নতুন করে হিসাব হবে।</p></details><details><summary>আমি ফোন বদলাচ্ছি।</summary><p>“সেটিংস”-এ গিয়ে ব্যাকআপ লিংক কপি করুন, তারপর নতুন ফোনে খুলুন।</p></details><details><summary>কোন মুসহাফ অনুসরণ করা হয়?</summary><p>হাফস আন আসিম রেওয়ায়াতের মদীনা মুসহাফ, যা বাদশাহ ফাহাদ কুরআন মুদ্রণ কমপ্লেক্স ছাপে: ৬০৪ পৃষ্ঠা ও ৬,২৩৬টি আয়াত। আয়াত নম্বর ও পৃষ্ঠা এই মুসহাফের সঙ্গে মেলে, যা বিশ্বে সবচেয়ে বেশি প্রচলিত।</p></details><details><summary>এটা কি বিনামূল্যে?</summary><p>হ্যাঁ, পরীক্ষামূলক পর্যায়ে এটি বিনামূল্যে এবং বিজ্ঞাপনমুক্ত।</p></details></div>"
 },
 "legal": {
  "private": "এই ওয়েবসাইটটি একজন ব্যক্তি অপেশাদারভাবে প্রকাশ করেন। ফরাসি আইন (LCEN, ধারা ১-১, II) অনুযায়ী প্রকাশক নিজের পরিচয় প্রকাশ না করার সিদ্ধান্ত নিয়েছেন; তাঁর পরিচয় নিচের হোস্টিং প্রতিষ্ঠানকে জানানো আছে।<br>যোগাযোগ: {mail}",
  "controller": "ওয়েবসাইটের প্রকাশক (ব্যক্তি)",
  "phone": "ফোন:",
  "email": "ইমেইল:",
  "director": "প্রকাশনার দায়িত্বপ্রাপ্ত ব্যক্তি"
 }
}
```

---

## 20. Textes du carnet, portugais (pt.json)

*Fichier : `hifz/src/i18n/pt.json`*

```json
{
 "meta": {
  "lang_name": "Português",
  "dir": "ltr",
  "og_locale": "pt_BR",
  "suggest": "Este site está disponível em português.",
  "date_fmt": "{d} de {m} de {y}",
  "months": [
   "janeiro",
   "fevereiro",
   "março",
   "abril",
   "maio",
   "junho",
   "julho",
   "agosto",
   "setembro",
   "outubro",
   "novembro",
   "dezembro"
  ]
 },
 "ui": {
  "skip": "Ir para o conteúdo",
  "language": "Idioma",
  "footer": "Rodapé",
  "footer_note": "Grátis, sem cadastro. O progresso do seu filho fica no seu celular.",
  "nav_home": "O caderno",
  "nav_surahs": "Planos por surata",
  "nav_about": "Sobre",
  "nav_privacy": "Privacidade",
  "nav_legal": "Informações legais",
  "support": "Apoie este projeto",
  "loading": "Carregando…",
  "children_nav": "Filhos",
  "progress_title": "Progresso",
  "week_title": "Ficha da semana",
  "miles_title": "Suratas",
  "tools_title": "Configurações",
  "tagline": "Caderno de memorização do Alcorão para famílias"
 },
 "app": {
  "child_n": "Filho {n}",
  "add_child": "+ Adicionar um filho",
  "listen": "Ouvir ▶",
  "status_ok": "Recitou ✓",
  "status_again": "Repetir ↻",
  "missed_one": "Uma sessão não foi feita ({d}). Sem problema: continuamos de onde vocês pararam.",
  "missed_many": "{n} sessões não foram feitas desde {d}. Sem problema: continuamos de onde vocês pararam.",
  "missed_ack": "Entendi",
  "today_title": "Hoje, {d}",
  "skipped_today": "Sessão adiada. O plano se ajusta: nada se perde.",
  "undo": "Desfazer",
  "rest_day": "Dia de descanso.",
  "next_session": "Próxima sessão: {d}.",
  "do_extra": "Fazer uma sessão mesmo assim",
  "btn_recited": "Recitou ✓",
  "btn_again": "Repetir",
  "btn_rev_ok": "Tudo certo ✓",
  "btn_rework": "Precisa reforçar",
  "all_learned": "Todas as suratas escolhidas foram memorizadas, alhamdulillah! A revisão continua para que nada seja esquecido.",
  "new": "Novo",
  "recent": "Revisão recente",
  "old": "Revisão antiga",
  "again_note": "Ainda não está firme: este trecho volta na próxima sessão.",
  "nothing_today": "Ainda não há nada para revisar.",
  "session_done": "Sessão concluída, barakAllahu fik! ⭐",
  "btn_skip": "Adiar a sessão",
  "session_hint": "Cerca de 10 a 15 minutos.",
  "stat_ayahs": "versículos memorizados",
  "stat_stars": "trechos recitados",
  "stat_streak": "sessões seguidas",
  "stat_end": "término previsto",
  "stat_end_done": "tudo memorizado",
  "pace_one": "Ritmo: {n} versículo novo por sessão.",
  "pace_other": "Ritmo: {n} versículos novos por sessão.",
  "target_ok": "Meta de {d}: no caminho certo (término previsto: {e}).",
  "target_impossible": "A meta de {d} não pode ser cumprida nem com 20 versículos por sessão (término previsto: {e}). Escolha uma data mais distante.",
  "rest": "Descanso",
  "skipped": "Adiada",
  "missed": "Não feita",
  "week_of": "Semana de {a} a {b}",
  "col_day": "Dia",
  "col_parent": "Pai ou mãe",
  "col_teacher": "Professor",
  "btn_print": "Imprimir a ficha",
  "btn_copy_week": "Copiar a ficha para o professor",
  "sheet_title": "Ficha semanal de memorização",
  "hafs_note": "Mushaf de Medina, leitura de Hafs ʿan ʿĀṣim (Complexo Rei Fahd)",
  "sheet_teacher_note": "Observação do professor:",
  "m_known": "já sabia",
  "m_done": "memorizada ✓",
  "m_planned": "prevista para {d}",
  "share": "Compartilhar",
  "btn_edit": "Alterar o plano",
  "btn_reminder": "Adicionar um lembrete à agenda",
  "btn_backup": "Copiar o link de backup",
  "confirm_reset": "Apagar este plano e todo o progresso?",
  "yes_reset": "Sim, apagar",
  "cancel": "Cancelar",
  "btn_reset": "Recomeçar",
  "privacy_short": "Tudo fica salvo apenas neste aparelho. O link de backup recupera o progresso em outro celular e não inclui o nome.",
  "setup_title": "Crie o plano do seu filho",
  "setup_edit_title": "Alterar o plano",
  "setup_edit_note": "Os versículos já recitados continuam memorizados: só muda o programa daqui para a frente.",
  "step1": "Quais suratas memorizar?",
  "pick_juzamma": "Todo o Juz ʿAmma, de An-Nas a An-Naba (37 suratas)",
  "pick_last10": "As 10 últimas suratas, de An-Nas a Al-Fil",
  "pick_qul": "Al-Fatiha e os 3 “Qul” (Al-Ikhlas, Al-Falaq, An-Nas)",
  "pick_custom": "Eu escolho as suratas",
  "more_surahs": "Mostrar as outras suratas",
  "order": "Ordem",
  "order_end": "Do fim para o começo (An-Nas primeiro)",
  "order_start": "Na ordem do mushaf",
  "step2": "Quais o seu filho já sabe?",
  "step2_hint": "Elas serão revisadas, não memorizadas de novo. Se ele já souber tudo, o plano propõe só revisão.",
  "known_all": "Sabe todas: só revisão",
  "choose_first": "Primeiro escolha as suratas.",
  "step3": "Em que ritmo?",
  "days_label": "Dias de sessão",
  "mode_amount": "Eu escolho quantos versículos novos por sessão",
  "amount_label": "Versículos por sessão",
  "mode_date": "Quero terminar até uma data",
  "target_label": "Terminar até",
  "advanced": "Ajustes da revisão",
  "recent_label": "Revisão recente: últimas sessões revisadas",
  "old_label": "Revisão antiga: versículos por sessão (aprox.)",
  "time_label": "Horário do lembrete",
  "name_label": "Nome (opcional)",
  "name_ph": "ex.: Yasmin",
  "name_note": "O nome serve só para diferenciar seus filhos e fica neste celular.",
  "btn_start": "Criar o plano",
  "btn_save": "Salvar",
  "err_surahs": "Escolha pelo menos uma surata.",
  "err_days": "Escolha pelo menos um dia de sessão.",
  "err_target": "Informe uma data futura.",
  "copied": "Copiado ✓",
  "reminder_title": "Sessão de Alcorão",
  "reminder_desc": "Hora da sessão de memorização.",
  "import_q_one": "Este link contém um plano com {n} versículo memorizado. Adicionar a este celular?",
  "import_q_other": "Este link contém um plano com {n} versículos memorizados. Adicionar a este celular?",
  "import_yes": "Adicionar o plano",
  "card_head": "Surata memorizada",
  "card_text": "Alhamdulillah! Surata {s} memorizada 🌙",
  "card_save": "Toque e segure a imagem ou clique com o botão direito para salvá-la.",
  "close": "Fechar",
  "surah_full": "{s} (surata inteira)",
  "surah_ayah": "{s}, versículo {a}",
  "surah_ayahs": "{s}, versículos {a}–{b}",
  "and_more": "e mais {n}",
  "mushaf_btn": "Mushaf p. {p}",
  "mushaf_title": "Mushaf de Medina, página {p}",
  "mushaf_next": "Próxima página",
  "mushaf_prev": "Página anterior",
  "mushaf_credit": "Mushaf de Medina (Hafs) · Complexo Rei Fahd para a Impressão do Alcorão Sagrado",
  "mushaf_error": "Não foi possível carregar esta página. Verifique sua conexão.",
  "mushaf_preview_only": "Esta prévia inclui só Al-Fatiha e o Juz ʿAmma. As 604 páginas estão no site publicado."
 },
 "home": {
  "title": "Our Quran Time — caderno de memorização do Alcorão para famílias",
  "description": "Saiba todos os dias o que memorizar e o que revisar com seu filho. Juz ʿAmma, suratas curtas e uma ficha semanal para o professor. Grátis, sem cadastro.",
  "h1": "Hoje à noite, você sabe o que recitar",
  "lead": "Um caderno de hifz para pais: todos os dias, o trecho novo do seu filho e as revisões, no ritmo dele. Perdeu uma sessão? O plano continua de onde vocês pararam.",
  "content": "<h2>Como funciona</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>Novo</b>Um trecho curto para memorizar, em geral de 2 a 5 versículos (o <em>sabaq</em>).</li><li class=\"t-sabqi\"><b>Revisão recente</b>Os trechos das últimas sessões, até ficarem firmes (o <em>sabqi</em>).</li><li class=\"t-manzil\"><b>Revisão antiga</b>Uma ou duas suratas já sabidas, em rodízio, para nada ser esquecido (o <em>manzil</em>).</li></ul><p>Você marca o que seu filho realmente recitou. Se ele hesitar, toque em “Repetir”: o trecho volta na próxima sessão. Se pular um dia, nada se perde: o plano continua de onde vocês estavam.</p><h2>Uma sessão típica (10 a 15 minutos)</h2><ol><li>Abram o trecho no Mushaf de Medina (botão 📖) e leiam juntos.</li><li>Ouçam o trecho novo três vezes com o botão “Ouvir”.</li><li>Repitam versículo por versículo e depois juntem os versículos.</li><li>Seu filho recita sem olhar: “Recitou” ou “Repetir”.</li><li>Façam a revisão recente e depois a revisão antiga.</li></ol><h2>Dicas para os pais</h2><ul><li><strong>Pouco e sempre</strong>: 10 minutos por dia valem mais do que uma hora no fim de semana.</li><li><strong>Mesmo horário</strong>: depois de uma oração ou antes de dormir. O lembrete da agenda ajuda muito.</li><li><strong>Incentive</strong>: cada trecho recitado é uma estrela, cada surata memorizada é uma festa.</li><li><strong>Recitar na oração</strong>: é a melhor revisão.</li></ul><h2>Para o professor</h2><p>A ficha semanal resume os trechos previstos e o que foi realmente recitado. Imprima ou cole no WhatsApp: o professor vê num relance onde a criança está e pode acrescentar uma observação.</p><p class=\"note\">Este caderno organiza a memorização; ele não substitui um professor que ouça a criança e corrija a recitação (tajwid).</p><h2>Perguntas frequentes</h2><div class=\"faq\"><details><summary>Onde ficam os dados do meu filho?</summary><p>Só no seu celular. Sem cadastro, sem servidor. O nome é opcional.</p></details><details><summary>Tenho vários filhos.</summary><p>Crie um plano para cada um com “+ Adicionar um filho”. Cada plano tem o próprio progresso.</p></details><details><summary>Pulamos vários dias.</summary><p>Sem problema: a sessão de hoje continua exatamente de onde vocês pararam, e a data de término prevista é recalculada.</p></details><details><summary>Vou trocar de celular.</summary><p>Em “Configurações”, copie o link de backup e abra no celular novo.</p></details><details><summary>Qual mushaf serve de referência?</summary><p>O Mushaf de Medina na leitura de Hafs ʿan ʿĀṣim, impresso pelo Complexo Rei Fahd para a Impressão do Alcorão Sagrado: 604 páginas e 6.236 versículos. Os números dos versículos e as páginas correspondem a este mushaf, o mais difundido do mundo.</p></details><details><summary>É grátis?</summary><p>Sim, grátis e sem anúncios durante a fase de teste.</p></details></div>"
 },
 "legal": {
  "private": "Este site é publicado por uma pessoa física, sem fins profissionais. Conforme a lei francesa (LCEN, art. 1-1, II), o editor optou por manter o anonimato; seus dados de identificação foram fornecidos ao provedor de hospedagem indicado abaixo.<br>Contato: {mail}",
  "controller": "o editor do site (pessoa física)",
  "phone": "Telefone:",
  "email": "E-mail:",
  "director": "Responsável pela publicação"
 }
}
```

---

## 21. Textes du carnet, russe (ru.json)

*Fichier : `hifz/src/i18n/ru.json`*

```json
{
 "meta": {
  "lang_name": "Русский",
  "dir": "ltr",
  "og_locale": "ru_RU",
  "suggest": "Этот сайт доступен на русском языке.",
  "date_fmt": "{d} {m} {y} г.",
  "months": [
   "января",
   "февраля",
   "марта",
   "апреля",
   "мая",
   "июня",
   "июля",
   "августа",
   "сентября",
   "октября",
   "ноября",
   "декабря"
  ]
 },
 "ui": {
  "skip": "Перейти к содержанию",
  "language": "Язык",
  "footer": "Нижний колонтитул",
  "footer_note": "Бесплатно и без регистрации. Прогресс ребёнка хранится только на вашем телефоне.",
  "nav_home": "Тетрадь хифза",
  "nav_surahs": "Планы по сурам",
  "nav_about": "О проекте",
  "nav_privacy": "Конфиденциальность",
  "nav_legal": "Правовая информация",
  "support": "Поддержать проект",
  "loading": "Загрузка…",
  "children_nav": "Дети",
  "progress_title": "Прогресс",
  "week_title": "Лист этой недели",
  "miles_title": "Суры",
  "tools_title": "Настройки",
  "tagline": "Тетрадь заучивания Корана для семьи"
 },
 "app": {
  "child_n": "Ребёнок {n}",
  "add_child": "+ Добавить ребёнка",
  "listen": "Слушать ▶",
  "status_ok": "Рассказано ✓",
  "status_again": "Повторить ↻",
  "missed_one": "Одно занятие пропущено ({d}). Ничего страшного: продолжаем с того места, где вы остановились.",
  "missed_many_one": "С {d} пропущено {n} занятие. Ничего страшного: продолжаем с того места, где вы остановились.",
  "missed_many_few": "С {d} пропущено {n} занятия. Ничего страшного: продолжаем с того места, где вы остановились.",
  "missed_many_many": "С {d} пропущено {n} занятий. Ничего страшного: продолжаем с того места, где вы остановились.",
  "missed_many_other": "С {d} пропущено {n} занятия. Ничего страшного: продолжаем с того места, где вы остановились.",
  "missed_ack": "Понятно",
  "today_title": "Сегодня, {d}",
  "skipped_today": "Занятие перенесено. План подстроится, ничего не потеряется.",
  "undo": "Отменить",
  "rest_day": "Сегодня день отдыха.",
  "next_session": "Следующее занятие: {d}.",
  "do_extra": "Всё равно позаниматься",
  "btn_recited": "Рассказано ✓",
  "btn_again": "Повторить",
  "btn_rev_ok": "Всё хорошо ✓",
  "btn_rework": "Нужно доработать",
  "all_learned": "Все выбранные суры выучены, альхамдулиллях! Повторение продолжается, чтобы ничего не забылось.",
  "new": "Новый урок",
  "recent": "Недавнее повторение",
  "old": "Повторение старого",
  "again_note": "Пока не закрепилось: этот отрывок вернётся на следующем занятии.",
  "nothing_today": "Повторять пока нечего.",
  "session_done": "Занятие окончено, БаракаЛлаху фик! ⭐",
  "btn_skip": "Перенести занятие",
  "session_hint": "Примерно 10–15 минут.",
  "stat_ayahs": "аятов выучено",
  "stat_stars": "отрывков рассказано",
  "stat_streak": "занятий подряд",
  "stat_end": "ожидаемое окончание",
  "stat_end_done": "всё выучено",
  "pace_one": "Темп: {n} новый аят за занятие.",
  "pace_few": "Темп: {n} новых аята за занятие.",
  "pace_many": "Темп: {n} новых аятов за занятие.",
  "pace_other": "Темп: {n} новых аята за занятие.",
  "target_ok": "Цель к {d}: идёте по плану (ожидаемое окончание {e}).",
  "target_impossible": "Цель к {d} недостижима даже при 20 аятах за занятие (ожидаемое окончание {e}). Выберите более позднюю дату.",
  "rest": "Отдых",
  "skipped": "Перенесено",
  "missed": "Пропущено",
  "week_of": "Неделя: {a} – {b}",
  "col_day": "День",
  "col_parent": "Родитель",
  "col_teacher": "Учитель",
  "btn_print": "Распечатать лист",
  "btn_copy_week": "Скопировать лист для учителя",
  "sheet_title": "Недельный лист хифза",
  "hafs_note": "Мединский мусхаф, чтение Хафс от Асыма (Комплекс короля Фахда)",
  "sheet_teacher_note": "Заметка учителя:",
  "m_known": "уже знал(а)",
  "m_done": "выучена ✓",
  "m_planned": "ориентировочно {d}",
  "share": "Поделиться",
  "btn_edit": "Изменить план",
  "btn_reminder": "Добавить напоминание в календарь",
  "btn_backup": "Скопировать ссылку для резервной копии",
  "confirm_reset": "Удалить этот план и весь прогресс?",
  "yes_reset": "Да, удалить",
  "cancel": "Отмена",
  "btn_reset": "Начать заново",
  "privacy_short": "Всё хранится только на этом устройстве. Ссылка для резервной копии восстанавливает прогресс на другом телефоне; имени в ней нет.",
  "setup_title": "Составьте план для ребёнка",
  "setup_edit_title": "Изменить план",
  "setup_edit_note": "Уже рассказанные аяты остаются выученными: меняется только дальнейшая программа.",
  "step1": "Какие суры учить?",
  "pick_juzamma": "Весь джуз «Амма», от суры «Ан-Нас» до суры «Ан-Наба» (37 сур)",
  "pick_last10": "Последние 10 сур, от «Ан-Нас» до «Аль-Филь»",
  "pick_qul": "«Аль-Фатиха» и три суры «Куль» («Аль-Ихлас», «Аль-Фалак», «Ан-Нас»)",
  "pick_custom": "Выбрать суры самостоятельно",
  "more_surahs": "Показать остальные суры",
  "order": "Порядок",
  "order_end": "С конца (сначала «Ан-Нас»)",
  "order_start": "В порядке мусхафа",
  "step2": "Что ребёнок уже знает?",
  "step2_hint": "Эти суры будут повторяться, а не учиться заново. Если всё уже выучено, план предложит только повторение.",
  "known_all": "Знает все: только повторение",
  "choose_first": "Сначала выберите суры.",
  "step3": "В каком темпе?",
  "days_label": "Дни занятий",
  "mode_amount": "Я сам(а) выбираю, сколько новых аятов за занятие",
  "amount_label": "Аятов за занятие",
  "mode_date": "Хочу закончить к определённой дате",
  "target_label": "Закончить к",
  "advanced": "Настройки повторения",
  "recent_label": "Недавнее повторение: сколько последних занятий повторять",
  "old_label": "Повторение старого: аятов за занятие (примерно)",
  "time_label": "Время напоминания",
  "name_label": "Имя (необязательно)",
  "name_ph": "например, Амина",
  "name_note": "Имя нужно только для того, чтобы различать детей, и хранится на этом телефоне.",
  "btn_start": "Создать план",
  "btn_save": "Сохранить",
  "err_surahs": "Выберите хотя бы одну суру.",
  "err_days": "Выберите хотя бы один день занятий.",
  "err_target": "Укажите дату в будущем.",
  "copied": "Скопировано ✓",
  "reminder_title": "Занятие по Корану",
  "reminder_desc": "Пора заниматься хифзом.",
  "import_q_one": "По этой ссылке — план, в котором выучен {n} аят. Добавить его на этот телефон?",
  "import_q_few": "По этой ссылке — план, в котором выучено {n} аята. Добавить его на этот телефон?",
  "import_q_many": "По этой ссылке — план, в котором выучено {n} аятов. Добавить его на этот телефон?",
  "import_q_other": "По этой ссылке — план, в котором выучено {n} аята. Добавить его на этот телефон?",
  "import_yes": "Добавить план",
  "card_head": "Сура выучена",
  "card_text": "Альхамдулиллях! Сура «{s}» выучена 🌙",
  "card_save": "Чтобы сохранить картинку, нажмите на неё и удерживайте или щёлкните правой кнопкой мыши.",
  "close": "Закрыть",
  "surah_full": "{s} (вся сура)",
  "surah_ayah": "{s}, аят {a}",
  "surah_ayahs": "{s}, аяты {a}–{b}",
  "and_more": "и ещё {n}",
  "mushaf_btn": "Мусхаф, с. {p}",
  "mushaf_title": "Мединский мусхаф, страница {p}",
  "mushaf_next": "Следующая страница",
  "mushaf_prev": "Предыдущая страница",
  "mushaf_credit": "Мединский мусхаф (Хафс) · Комплекс короля Фахда по изданию Священного Корана",
  "mushaf_error": "Не удалось загрузить страницу. Проверьте подключение к интернету.",
  "mushaf_preview_only": "В этом предпросмотре есть только «Аль-Фатиха» и джуз «Амма». Все 604 страницы доступны на опубликованном сайте."
 },
 "home": {
  "title": "Our Quran Time — тетрадь заучивания Корана для семьи",
  "description": "Каждый день знайте, что учить и что повторять с ребёнком. Джуз «Амма», короткие суры и недельный лист для учителя. Бесплатно и без регистрации.",
  "h1": "Сегодня вечером вы знаете, что рассказывать",
  "lead": "Тетрадь хифза для родителей: каждый день — новый отрывок и повторение в темпе вашего ребёнка. Пропустили занятие? План просто продолжится с того места, где вы остановились.",
  "content": "<h2>Как это работает</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>Новый урок</b>Небольшой отрывок для заучивания, обычно от 2 до 5 аятов (<em>сабак</em>).</li><li class=\"t-sabqi\"><b>Недавнее повторение</b>Отрывки последних занятий, пока они не закрепятся (<em>сабки</em>).</li><li class=\"t-manzil\"><b>Повторение старого</b>Одна-две выученные суры по очереди, чтобы ничего не забылось (<em>манзиль</em>).</li></ul><p>Вы отмечаете то, что ребёнок действительно рассказал наизусть. Если он сбивается, нажмите «Повторить»: отрывок вернётся на следующем занятии. Пропустили день — ничего не потеряно: план продолжится с того же места.</p><h2>Обычное занятие (10–15 минут)</h2><ol><li>Откройте отрывок в Мединском мусхафе (кнопка 📖) и прочитайте его вместе.</li><li>Прослушайте новый отрывок три раза кнопкой «Слушать».</li><li>Повторяйте аят за аятом, затем соедините аяты вместе.</li><li>Ребёнок рассказывает, не подглядывая: «Рассказано» или «Повторить».</li><li>Сделайте недавнее повторение, а затем повторение старого.</li></ol><h2>Советы родителям</h2><ul><li><strong>Понемногу, но постоянно</strong>: 10 минут каждый день лучше, чем час по выходным.</li><li><strong>В одно и то же время</strong>: после одного из намазов или перед сном. Напоминание в календаре очень помогает.</li><li><strong>Поддерживайте</strong>: каждый рассказанный отрывок — звёздочка, каждая выученная сура — праздник.</li><li><strong>Читайте в намазе</strong>: это лучшее повторение.</li></ul><h2>Для учителя</h2><p>Недельный лист показывает запланированные отрывки и то, что было рассказано на самом деле. Распечатайте его или вставьте в WhatsApp: учитель сразу видит, где сейчас ребёнок, и может оставить заметку.</p><p class=\"note\">Эта тетрадь помогает организовать заучивание, но не заменяет учителя, который слушает ребёнка и исправляет таджвид.</p><h2>Частые вопросы</h2><div class=\"faq\"><details><summary>Где хранятся данные ребёнка?</summary><p>Только на вашем телефоне. Без учётной записи и без сервера. Имя указывать необязательно.</p></details><details><summary>У меня несколько детей.</summary><p>Создайте отдельный план для каждого кнопкой «+ Добавить ребёнка». У каждого плана свой прогресс.</p></details><details><summary>Мы пропустили несколько дней.</summary><p>Ничего страшного: сегодняшнее занятие продолжится ровно с того места, где вы остановились, а ожидаемая дата окончания пересчитается.</p></details><details><summary>Я меняю телефон.</summary><p>В «Настройках» скопируйте ссылку для резервной копии и откройте её на новом телефоне.</p></details><details><summary>Какой мусхаф взят за основу?</summary><p>Мединский мусхаф в чтении Хафс от Асыма, изданный Комплексом короля Фахда по изданию Священного Корана: 604 страницы и 6236 аятов. Номера аятов и страниц совпадают с этим мусхафом, самым распространённым в мире.</p></details><details><summary>Это бесплатно?</summary><p>Да, на время тестирования — бесплатно и без рекламы.</p></details></div>"
 },
 "legal": {
  "private": "Сайт публикуется частным лицом на непрофессиональной основе. В соответствии с законодательством Франции (LCEN, ст. 1-1, п. II) издатель предпочёл сохранить анонимность; его данные переданы хостинг-провайдеру, указанному ниже.<br>Связь: {mail}",
  "controller": "издатель сайта (частное лицо)",
  "phone": "Телефон:",
  "email": "Эл. почта:",
  "director": "Ответственный за публикацию"
 }
}
```

---

## 22. Textes du carnet, indonésien (id.json)

*Fichier : `hifz/src/i18n/id.json`*

```json
{
 "meta": {
  "lang_name": "Bahasa Indonesia",
  "dir": "ltr",
  "og_locale": "id_ID",
  "suggest": "Situs ini tersedia dalam Bahasa Indonesia.",
  "date_fmt": "{d} {m} {y}",
  "months": [
   "Januari",
   "Februari",
   "Maret",
   "April",
   "Mei",
   "Juni",
   "Juli",
   "Agustus",
   "September",
   "Oktober",
   "November",
   "Desember"
  ]
 },
 "ui": {
  "skip": "Langsung ke konten",
  "language": "Bahasa",
  "footer": "Kaki halaman",
  "footer_note": "Gratis, tanpa akun. Perkembangan hafalan anak tersimpan di ponsel Anda.",
  "nav_home": "Buku hafalan",
  "nav_surahs": "Rencana per surah",
  "nav_about": "Tentang",
  "nav_privacy": "Privasi",
  "nav_legal": "Informasi hukum",
  "support": "Dukung proyek ini",
  "loading": "Memuat…",
  "children_nav": "Anak-anak",
  "progress_title": "Perkembangan",
  "week_title": "Lembar pekan ini",
  "miles_title": "Surah",
  "tools_title": "Pengaturan",
  "tagline": "Agenda hafalan Al-Qur'an untuk keluarga"
 },
 "app": {
  "child_n": "Anak {n}",
  "add_child": "+ Tambah anak",
  "listen": "Dengarkan ▶",
  "status_ok": "Lancar ✓",
  "status_again": "Diulang ↻",
  "missed_one": "Ada satu sesi yang terlewat ({d}). Tidak apa-apa: kita lanjutkan saja dari posisi terakhir.",
  "missed_many": "Ada {n} sesi yang terlewat sejak {d}. Tidak apa-apa: kita lanjutkan saja dari posisi terakhir.",
  "missed_ack": "Baik",
  "today_title": "Hari ini, {d}",
  "skipped_today": "Sesi ditunda. Rencana menyesuaikan diri, tidak ada yang hilang.",
  "undo": "Batalkan",
  "rest_day": "Hari libur.",
  "next_session": "Sesi berikutnya: {d}.",
  "do_extra": "Tetap adakan sesi",
  "btn_recited": "Lancar ✓",
  "btn_again": "Ulangi",
  "btn_rev_ok": "Lancar semua ✓",
  "btn_rework": "Perlu diulang",
  "all_learned": "Semua surah pilihan sudah hafal, alhamdulillah! Muraja'ah tetap berjalan agar tidak ada yang terlupa.",
  "new": "Hafalan baru",
  "recent": "Muraja'ah dekat",
  "old": "Muraja'ah jauh",
  "again_note": "Belum lancar: potongan ini akan muncul lagi di sesi berikutnya.",
  "nothing_today": "Belum ada yang perlu dimuraja'ah.",
  "session_done": "Sesi selesai, barakallahu fiik! ⭐",
  "btn_skip": "Tunda sesi",
  "session_hint": "Sekitar 10–15 menit.",
  "stat_ayahs": "ayat sudah hafal",
  "stat_stars": "setoran lancar",
  "stat_streak": "sesi berturut-turut",
  "stat_end": "perkiraan selesai",
  "stat_end_done": "semua sudah hafal",
  "pace": "Kecepatan: {n} ayat baru per sesi.",
  "target_ok": "Target {d}: sesuai jalur (perkiraan selesai {e}).",
  "target_impossible": "Target {d} tidak bisa tercapai meskipun 20 ayat per sesi (perkiraan selesai {e}). Pilih tanggal yang lebih jauh.",
  "rest": "Libur",
  "skipped": "Ditunda",
  "missed": "Terlewat",
  "week_of": "Pekan {a} – {b}",
  "col_day": "Hari",
  "col_parent": "Orang tua",
  "col_teacher": "Guru",
  "btn_print": "Cetak lembar",
  "btn_copy_week": "Salin lembar untuk guru",
  "sheet_title": "Lembar hafalan pekanan",
  "hafs_note": "Mushaf Madinah, riwayat Hafs 'an 'Ashim (Kompleks Raja Fahd)",
  "sheet_teacher_note": "Catatan guru:",
  "m_known": "sudah hafal sebelumnya",
  "m_done": "hafal ✓",
  "m_planned": "direncanakan sekitar {d}",
  "share": "Bagikan",
  "btn_edit": "Ubah rencana",
  "btn_reminder": "Tambah pengingat di kalender",
  "btn_backup": "Salin tautan cadangan",
  "confirm_reset": "Hapus rencana ini beserta seluruh perkembangannya?",
  "yes_reset": "Ya, hapus",
  "cancel": "Batal",
  "btn_reset": "Mulai dari awal",
  "privacy_short": "Semua data hanya tersimpan di perangkat ini. Tautan cadangan memulihkan perkembangan di ponsel lain, tanpa menyertakan nama anak.",
  "setup_title": "Buat rencana hafalan anak Anda",
  "setup_edit_title": "Ubah rencana",
  "setup_edit_note": "Ayat yang sudah disetorkan tetap tercatat hafal; hanya program berikutnya yang berubah.",
  "step1": "Surah apa yang akan dihafal?",
  "pick_juzamma": "Seluruh Juz 'Amma, dari An-Nas sampai An-Naba (37 surah)",
  "pick_last10": "10 surah terakhir, dari An-Nas sampai Al-Fil",
  "pick_qul": "Al-Fatihah dan 3 surah “Qul” (Al-Ikhlas, Al-Falaq, An-Nas)",
  "pick_custom": "Saya pilih sendiri surahnya",
  "more_surahs": "Tampilkan surah lainnya",
  "order": "Urutan",
  "order_end": "Dari belakang (An-Nas dulu)",
  "order_start": "Sesuai urutan mushaf",
  "step2": "Surah mana yang sudah dihafal anak Anda?",
  "step2_hint": "Surah ini akan dimuraja'ah, bukan dihafal ulang. Jika semuanya sudah hafal, rencana hanya berisi muraja'ah.",
  "known_all": "Sudah hafal semua: muraja'ah saja",
  "choose_first": "Pilih surah terlebih dahulu.",
  "step3": "Seberapa cepat?",
  "days_label": "Hari sesi",
  "mode_amount": "Saya tentukan jumlah ayat baru per sesi",
  "amount_label": "Ayat per sesi",
  "mode_date": "Saya ingin selesai sebelum tanggal tertentu",
  "target_label": "Selesai sebelum",
  "advanced": "Pengaturan muraja'ah",
  "recent_label": "Muraja'ah dekat: jumlah sesi terakhir yang diulang",
  "old_label": "Muraja'ah jauh: jumlah ayat per sesi (kira-kira)",
  "time_label": "Jam pengingat",
  "name_label": "Nama anak (opsional)",
  "name_ph": "contoh: Aisyah",
  "name_note": "Nama hanya untuk membedakan anak-anak Anda dan tetap tersimpan di ponsel ini.",
  "btn_start": "Buat rencana",
  "btn_save": "Simpan",
  "err_surahs": "Pilih minimal satu surah.",
  "err_days": "Pilih minimal satu hari sesi.",
  "err_target": "Masukkan tanggal di masa mendatang.",
  "copied": "Tersalin ✓",
  "reminder_title": "Sesi hafalan Al-Qur'an",
  "reminder_desc": "Saatnya sesi hafalan.",
  "import_q": "Tautan ini berisi rencana dengan {n} ayat yang sudah hafal. Tambahkan ke ponsel ini?",
  "import_yes": "Tambahkan rencana",
  "card_head": "Surah sudah hafal",
  "card_text": "Alhamdulillah! Surah {s} sudah hafal 🌙",
  "card_save": "Tekan lama atau klik kanan gambar untuk menyimpannya.",
  "close": "Tutup",
  "surah_full": "{s} (satu surah penuh)",
  "surah_ayah": "{s}, ayat {a}",
  "surah_ayahs": "{s}, ayat {a}–{b}",
  "and_more": "dan {n} lainnya",
  "mushaf_btn": "Mushaf hlm. {p}",
  "mushaf_title": "Mushaf Madinah, halaman {p}",
  "mushaf_next": "Halaman berikutnya",
  "mushaf_prev": "Halaman sebelumnya",
  "mushaf_credit": "Mushaf Madinah (Hafs) · Kompleks Percetakan Al-Qur'an Raja Fahd",
  "mushaf_error": "Halaman ini tidak dapat dimuat. Periksa koneksi Anda.",
  "mushaf_preview_only": "Pratinjau ini hanya berisi Al-Fatihah dan Juz 'Amma. Ke-604 halaman tersedia di situs yang sudah terbit."
 },
 "home": {
  "title": "Our Quran Time — agenda hafalan Al-Qur'an untuk keluarga",
  "description": "Setiap hari, ketahui apa yang harus dihafal dan dimuraja'ah bersama anak Anda. Juz 'Amma, surah-surah pendek, dan lembar pekanan untuk guru. Gratis, tanpa akun.",
  "h1": "Malam ini, Anda tahu apa yang akan disetorkan",
  "lead": "Agenda hafalan untuk orang tua: setiap hari, hafalan baru dan muraja'ah anak Anda, sesuai kemampuannya. Ada sesi yang terlewat? Rencana cukup dilanjutkan dari posisi terakhir.",
  "content": "<h2>Cara kerjanya</h2><ul class=\"trio\"><li class=\"t-sabaq\"><b>Hafalan baru</b>Potongan pendek untuk dihafal, biasanya 2 sampai 5 ayat (<em>ziyadah</em>).</li><li class=\"t-sabqi\"><b>Muraja'ah dekat</b>Potongan dari sesi-sesi terakhir, sampai benar-benar lancar.</li><li class=\"t-manzil\"><b>Muraja'ah jauh</b>Satu atau dua surah yang sudah hafal secara bergiliran, agar tidak ada yang terlupa.</li></ul><p>Anda mencentang apa yang benar-benar sudah disetorkan anak. Jika masih ragu, ketuk “Ulangi”: potongan itu akan muncul lagi di sesi berikutnya. Terlewat satu hari? Tidak ada yang hilang, rencana dilanjutkan dari posisi terakhir.</p><h2>Contoh satu sesi (10–15 menit)</h2><ol><li>Buka potongan itu di Mushaf Madinah (tombol 📖) dan baca bersama.</li><li>Dengarkan hafalan baru tiga kali dengan tombol “Dengarkan”.</li><li>Ulangi ayat demi ayat, lalu sambungkan ayat-ayatnya.</li><li>Anak menyetorkan tanpa melihat mushaf: “Lancar” atau “Ulangi”.</li><li>Lanjutkan dengan muraja'ah dekat, lalu muraja'ah jauh.</li></ol><h2>Tips untuk orang tua</h2><ul><li><strong>Sedikit tapi rutin</strong>: 10 menit setiap hari lebih baik daripada satu jam di akhir pekan.</li><li><strong>Jam yang sama</strong>: setelah shalat atau sebelum tidur. Pengingat di kalender sangat membantu.</li><li><strong>Beri semangat</strong>: setiap setoran lancar adalah bintang, setiap surah yang hafal layak dirayakan.</li><li><strong>Baca dalam shalat</strong>: itulah muraja'ah terbaik.</li></ul><h2>Untuk guru</h2><p>Lembar pekanan merangkum potongan yang direncanakan dan yang benar-benar disetorkan. Cetak atau tempel di WhatsApp: guru langsung melihat posisi hafalan anak dan bisa menambahkan catatan.</p><p class=\"note\">Agenda ini membantu mengatur hafalan; tidak menggantikan guru yang menyimak bacaan anak dan membetulkan tajwidnya.</p><h2>Pertanyaan yang sering diajukan</h2><div class=\"faq\"><details><summary>Di mana data anak saya disimpan?</summary><p>Hanya di ponsel Anda. Tanpa akun, tanpa server. Nama anak bersifat opsional.</p></details><details><summary>Anak saya lebih dari satu.</summary><p>Buat satu rencana untuk setiap anak dengan “+ Tambah anak”. Setiap rencana punya catatan perkembangannya sendiri.</p></details><details><summary>Kami terlewat beberapa hari.</summary><p>Tidak masalah: sesi hari ini melanjutkan tepat dari posisi terakhir, dan perkiraan tanggal selesai dihitung ulang.</p></details><details><summary>Saya ganti ponsel.</summary><p>Di “Pengaturan”, salin tautan cadangan lalu buka di ponsel baru.</p></details><details><summary>Mushaf apa yang menjadi acuan?</summary><p>Mushaf Madinah riwayat Hafs 'an 'Ashim, cetakan Kompleks Percetakan Al-Qur'an Raja Fahd: 604 halaman dan 6.236 ayat. Nomor ayat dan halaman sesuai dengan mushaf ini, yang paling banyak digunakan di dunia.</p></details><details><summary>Apakah gratis?</summary><p>Ya, gratis dan tanpa iklan selama masa uji coba.</p></details></div>"
 },
 "legal": {
  "private": "Situs ini diterbitkan oleh perorangan secara non-profesional. Sesuai hukum Prancis (LCEN, pasal 1-1, II), penerbit memilih untuk tidak mencantumkan identitasnya; identitas tersebut telah diberikan kepada penyedia hosting di bawah ini.<br>Kontak: {mail}",
  "controller": "penerbit situs (perorangan)",
  "phone": "Telepon:",
  "email": "Email:",
  "director": "Penanggung jawab publikasi"
 }
}
```

---

## 23. Noms des sourates en écriture locale (zh, hi, bn, ru)

*Fichier : `hifz/src/data/surah_names.json`*

```json
{
 "_source": "Noms usuels des sourates dans l'écriture de chaque langue (chinois : traduction de Ma Jian ; hindi, bengali, russe : translittérations courantes). À faire relire par un locuteur natif.",
 "zh": [
  "开端章",
  "黄牛章",
  "仪姆兰的家属章",
  "妇女章",
  "筵席章",
  "牲畜章",
  "高处章",
  "战利品章",
  "忏悔章",
  "优努斯章",
  "呼德章",
  "优素福章",
  "雷霆章",
  "易卜拉欣章",
  "石谷章",
  "蜜蜂章",
  "夜行章",
  "山洞章",
  "麦尔彦章",
  "塔哈章",
  "众先知章",
  "朝觐章",
  "信士章",
  "光明章",
  "准则章",
  "众诗人章",
  "蚂蚁章",
  "故事章",
  "蜘蛛章",
  "罗马人章",
  "鲁格曼章",
  "叩头章",
  "同盟军章",
  "赛伯邑章",
  "创造者章",
  "雅辛章",
  "列班者章",
  "萨德章",
  "队伍章",
  "赦宥者章",
  "奉绥来特章",
  "协商章",
  "金饰章",
  "烟雾章",
  "屈膝章",
  "沙丘章",
  "穆罕默德章",
  "胜利章",
  "寝室章",
  "戛弗章",
  "播种者章",
  "山岳章",
  "星宿章",
  "月亮章",
  "至仁主章",
  "大事章",
  "铁章",
  "辩诉者章",
  "放逐章",
  "受考验的妇人章",
  "列阵章",
  "聚礼章",
  "伪信者章",
  "相欺章",
  "离婚章",
  "禁戒章",
  "国权章",
  "笔章",
  "真灾章",
  "天梯章",
  "努哈章",
  "精灵章",
  "披衣的人章",
  "盖被的人章",
  "复活章",
  "人章",
  "天使章",
  "消息章",
  "急掣的章",
  "皱眉章",
  "黯黮章",
  "破裂章",
  "称量不公章",
  "绽裂章",
  "十二宫章",
  "启明星章",
  "至尊章",
  "大灾章",
  "黎明章",
  "地方章",
  "太阳章",
  "黑夜章",
  "上午章",
  "开拓章",
  "无花果章",
  "血块章",
  "高贵章",
  "明证章",
  "地震章",
  "奔驰的马队章",
  "大难章",
  "竞赛富庶章",
  "时光章",
  "诽谤者章",
  "象章",
  "古莱氏章",
  "什物章",
  "多福章",
  "不信道的人们章",
  "援助章",
  "火焰章",
  "忠诚章",
  "曙光章",
  "世人章"
 ],
 "hi": [
  "फ़ातिहा",
  "बक़रह",
  "आले इमरान",
  "निसा",
  "माइदा",
  "अनआम",
  "आराफ़",
  "अनफ़ाल",
  "तौबा",
  "यूनुस",
  "हूद",
  "यूसुफ़",
  "रअद",
  "इब्राहीम",
  "हिज्र",
  "नह्ल",
  "बनी इसराईल",
  "कहफ़",
  "मरयम",
  "ता-हा",
  "अम्बिया",
  "हज",
  "मोमिनून",
  "नूर",
  "फ़ुरक़ान",
  "शुअरा",
  "नम्ल",
  "क़सस",
  "अनकबूत",
  "रूम",
  "लुक़मान",
  "सजदा",
  "अहज़ाब",
  "सबा",
  "फ़ातिर",
  "यासीन",
  "साफ़्फ़ात",
  "साद",
  "ज़ुमर",
  "ग़ाफ़िर",
  "फ़ुस्सिलत",
  "शूरा",
  "ज़ुख़रुफ़",
  "दुख़ान",
  "जासिया",
  "अहक़ाफ़",
  "मुहम्मद",
  "फ़त्ह",
  "हुजुरात",
  "क़ाफ़",
  "ज़ारियात",
  "तूर",
  "नज्म",
  "क़मर",
  "रहमान",
  "वाक़िआ",
  "हदीद",
  "मुजादला",
  "हश्र",
  "मुमतहिना",
  "सफ़्फ़",
  "जुमुआ",
  "मुनाफ़िक़ून",
  "तग़ाबुन",
  "तलाक़",
  "तहरीम",
  "मुल्क",
  "क़लम",
  "हाक़्क़ा",
  "मआरिज",
  "नूह",
  "जिन्न",
  "मुज़्ज़म्मिल",
  "मुद्दस्सिर",
  "क़ियामह",
  "दहर",
  "मुरसलात",
  "नबा",
  "नाज़िआत",
  "अबस",
  "तकवीर",
  "इनफ़ितार",
  "मुतफ़्फ़िफ़ीन",
  "इनशिक़ाक़",
  "बुरूज",
  "तारिक़",
  "आला",
  "ग़ाशिया",
  "फ़ज्र",
  "बलद",
  "शम्स",
  "लैल",
  "ज़ुहा",
  "अलम नशरह",
  "तीन",
  "अलक़",
  "क़द्र",
  "बय्यिना",
  "ज़िलज़ाल",
  "आदियात",
  "क़ारिआ",
  "तकासुर",
  "अस्र",
  "हुमज़ा",
  "फ़ील",
  "क़ुरैश",
  "माऊन",
  "कौसर",
  "काफ़िरून",
  "नस्र",
  "लहब",
  "इख़लास",
  "फ़लक़",
  "नास"
 ],
 "bn": [
  "ফাতিহা",
  "বাকারা",
  "আলে ইমরান",
  "নিসা",
  "মায়িদা",
  "আনআম",
  "আরাফ",
  "আনফাল",
  "তাওবা",
  "ইউনুস",
  "হুদ",
  "ইউসুফ",
  "রাদ",
  "ইবরাহীম",
  "হিজর",
  "নাহল",
  "বনী ইসরাঈল",
  "কাহফ",
  "মারইয়াম",
  "ত্বা-হা",
  "আম্বিয়া",
  "হজ্জ",
  "মুমিনূন",
  "নূর",
  "ফুরকান",
  "শুআরা",
  "নামল",
  "কাসাস",
  "আনকাবূত",
  "রূম",
  "লুকমান",
  "সাজদা",
  "আহযাব",
  "সাবা",
  "ফাতির",
  "ইয়াসীন",
  "সাফফাত",
  "সোয়াদ",
  "যুমার",
  "গাফির",
  "ফুসসিলাত",
  "শূরা",
  "যুখরুফ",
  "দুখান",
  "জাসিয়া",
  "আহকাফ",
  "মুহাম্মাদ",
  "ফাতহ",
  "হুজুরাত",
  "ক্বাফ",
  "যারিয়াত",
  "তূর",
  "নাজম",
  "কামার",
  "আর-রহমান",
  "ওয়াকিয়া",
  "হাদীদ",
  "মুজাদালা",
  "হাশর",
  "মুমতাহিনা",
  "সফ",
  "জুমুআ",
  "মুনাফিকূন",
  "তাগাবুন",
  "তালাক",
  "তাহরীম",
  "মুলক",
  "কলম",
  "হাক্কাহ",
  "মাআরিজ",
  "নূহ",
  "জিন",
  "মুযযাম্মিল",
  "মুদ্দাসসির",
  "কিয়ামাহ",
  "দাহর",
  "মুরসালাত",
  "নাবা",
  "নাযিআত",
  "আবাসা",
  "তাকভীর",
  "ইনফিতার",
  "মুতাফফিফীন",
  "ইনশিকাক",
  "বুরূজ",
  "তারিক",
  "আলা",
  "গাশিয়াহ",
  "ফাজর",
  "বালাদ",
  "শামস",
  "লাইল",
  "দুহা",
  "ইনশিরাহ",
  "তীন",
  "আলাক",
  "কদর",
  "বাইয়্যিনাহ",
  "যিলযাল",
  "আদিয়াত",
  "কারিআহ",
  "তাকাসুর",
  "আসর",
  "হুমাযাহ",
  "ফীল",
  "কুরাইশ",
  "মাউন",
  "কাওসার",
  "কাফিরূন",
  "নাসর",
  "লাহাব",
  "ইখলাস",
  "ফালাক",
  "নাস"
 ],
 "ru": [
  "Аль-Фатиха",
  "Аль-Бакара",
  "Аль Имран",
  "Ан-Ниса",
  "Аль-Маида",
  "Аль-Анам",
  "Аль-Араф",
  "Аль-Анфаль",
  "Ат-Тауба",
  "Юнус",
  "Худ",
  "Юсуф",
  "Ар-Раад",
  "Ибрахим",
  "Аль-Хиджр",
  "Ан-Нахль",
  "Аль-Исра",
  "Аль-Кахф",
  "Марьям",
  "Та Ха",
  "Аль-Анбия",
  "Аль-Хадж",
  "Аль-Муминун",
  "Ан-Нур",
  "Аль-Фуркан",
  "Аш-Шуара",
  "Ан-Намль",
  "Аль-Касас",
  "Аль-Анкабут",
  "Ар-Рум",
  "Лукман",
  "Ас-Саджда",
  "Аль-Ахзаб",
  "Саба",
  "Фатыр",
  "Йа Син",
  "Ас-Саффат",
  "Сад",
  "Аз-Зумар",
  "Гафир",
  "Фуссылат",
  "Аш-Шура",
  "Аз-Зухруф",
  "Ад-Духан",
  "Аль-Джасия",
  "Аль-Ахкаф",
  "Мухаммад",
  "Аль-Фатх",
  "Аль-Худжурат",
  "Каф",
  "Аз-Зарият",
  "Ат-Тур",
  "Ан-Наджм",
  "Аль-Камар",
  "Ар-Рахман",
  "Аль-Вакиа",
  "Аль-Хадид",
  "Аль-Муджадила",
  "Аль-Хашр",
  "Аль-Мумтахана",
  "Ас-Сафф",
  "Аль-Джумуа",
  "Аль-Мунафикун",
  "Ат-Тагабун",
  "Ат-Талак",
  "Ат-Тахрим",
  "Аль-Мульк",
  "Аль-Калам",
  "Аль-Хакка",
  "Аль-Мааридж",
  "Нух",
  "Аль-Джинн",
  "Аль-Муззаммиль",
  "Аль-Муддассир",
  "Аль-Кияма",
  "Аль-Инсан",
  "Аль-Мурсалят",
  "Ан-Наба",
  "Ан-Назиат",
  "Абаса",
  "Ат-Таквир",
  "Аль-Инфитар",
  "Аль-Мутаффифин",
  "Аль-Иншикак",
  "Аль-Бурудж",
  "Ат-Тарик",
  "Аль-Аля",
  "Аль-Гашия",
  "Аль-Фаджр",
  "Аль-Балад",
  "Аш-Шамс",
  "Аль-Лейл",
  "Ад-Духа",
  "Аш-Шарх",
  "Ат-Тин",
  "Аль-Алак",
  "Аль-Кадр",
  "Аль-Баййина",
  "Аз-Зальзаля",
  "Аль-Адият",
  "Аль-Кариа",
  "Ат-Такасур",
  "Аль-Аср",
  "Аль-Хумаза",
  "Аль-Филь",
  "Курайш",
  "Аль-Маун",
  "Аль-Каусар",
  "Аль-Кафирун",
  "Ан-Наср",
  "Аль-Масад",
  "Аль-Ихлас",
  "Аль-Фалак",
  "Ан-Нас"
 ]
}
```

---

## 24. Page about, anglais

*Fichier : `hifz/src/pages/en/about.html`*

```html
<!--meta {"slug": "about", "title": "About {{site_name}}", "description": "Why {{site_name}} exists, how the notebook works and where the Quran data comes from."} -->
<section class="hero"><h1>About {{site_name}}</h1><p>A free notebook to support children's Quran memorization at home.</p></section>
<article class="prose">
  <h2>Why this notebook</h2>
  <p>Many parents want their children to memorize Juz ʿAmma, but knowing every evening what to learn and what to revise takes organisation few have time for. Quran schools use a simple routine: a new passage, revision of recent passages and rotating revision of older ones. {{site_name}} applies that routine for you, at your child's pace.</p>
  <h2>How the programme is calculated</h2>
  <ul>
    <li>The notebook follows the ayahs actually recited: what you mark “Recited” is learned; “To repeat” brings the passage back next session.</li>
    <li>A passage never mixes two surahs.</li>
    <li>Recent revision covers the passages of the last sessions; old revision rotates through known surahs in mushaf order.</li>
    <li>Dates shown are estimates, recalculated every day: a missed session never makes you “fail”.</li>
  </ul>
  <h2>Data sources</h2>
  <ul>
    <li>Reference mushaf: the Madinah Mushaf, Hafs ʿan ʿĀṣim narration, printed by the <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">King Fahd Glorious Qur'an Printing Complex</a> (604 pages, 6,236 ayahs).</li>
    <li>Surah, ayah and page structure of this mushaf: <em>quran-meta</em> library (MIT licence).</li>
    <li>Surah names: <em>quran-json</em> by Risan Bagja Pradana (CC BY-SA 4.0).</li>
    <li>“Listen” links open <a href="https://quran.com" rel="noopener">Quran.com</a>, an independent website.</li>
  </ul>
  <p class="note">{{site_name}} organises memorization; it does not replace a teacher who listens to the child and corrects their tajweed.</p>
  <h2>Contact</h2>
  <p>A remark, an idea, a problem? Write to {{contact_email}}.</p>
</article>
```

---

## 25. Page privacy, anglais

*Fichier : `hifz/src/pages/en/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "Privacy and cookies — {{site_name}}", "description": "What data {{site_name}} processes and how to exercise your rights (GDPR)."} -->
<section class="hero"><h1>Privacy and cookies</h1><p>Your plan and your progress stay on your device.</p></section>
<article class="prose">
  <h2>Data controller</h2>
  <p>{{controller}}. Contact: {{contact_email}}.</p>
  <h2>Your plan and progress</h2>
  <p>The plan settings, ticked passages and progress are processed <strong>only in your browser</strong>. They are stored in the page address and in your browser's local storage. They are never sent to our servers.</p>
  <h2>The child's first name</h2>
  <p>The first name is optional. If entered, it stays on your device only and is not included in the backup link. It appears on the weekly sheet only if you print or copy it yourself.</p>
  <h2>Technical logs</h2>
  <p>Our host ({{host_name}}) receives technical data needed to deliver pages and protect the site (IP address, browser type, requested pages, date and time) and keeps it for a limited period. Legal basis: legitimate interest.</p>
  <h2>Advertising and cookies</h2>
  <p>The site may be funded by advertising through Google AdSense (Google Ireland Limited). With your consent, Google and its partners may use cookies or similar identifiers to show personalised ads and measure their performance; without consent, non-personalised ads may be shown. In the EEA, the UK and Switzerland, a consent banner lets you accept, refuse or customise these cookies, and you can change your choice at any time. Learn more: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">how Google uses information from partner sites</a>.</p>
  <h2>Your rights</h2>
  <p>Under the GDPR you may access, rectify, erase, restrict, object to and port your data. Write to {{contact_email}}. You may also complain to your data protection authority (in France, the <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>).</p>
  <p><small>Last updated: {{updated}}.</small></p>
</article>
```

---

## 26. Page legal, anglais

*Fichier : `hifz/src/pages/en/legal.html`*

```html
<!--meta {"slug": "legal", "title": "Legal notice — {{site_name}}", "description": "Publisher, hosting provider and terms of use of {{site_name}}."} -->
<section class="hero"><h1>Legal notice</h1></section>
<article class="prose">
  <h2>Publisher</h2>
  {{editor_block}}
  <h2>Hosting provider</h2><p>{{host_name}}<br>{{host_address}}<br>Phone: {{host_phone}}</p>
  <h2>Terms of use</h2>
  <p>{{site_name}} is provided free of charge, as is, to help organise memorization. Ayah numbering and pages follow the Madinah Mushaf (Hafs ʿan ʿĀṣim) printed by the King Fahd Glorious Qur'an Printing Complex. The publisher cannot be held liable for any use of the programmes. This notebook does not replace a teacher.</p>
  <h2>Intellectual property</h2>
  <p>The site's design, code and texts belong to the publisher unless stated otherwise. Surah and ayah structure: quran-meta (MIT). Surah names: quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 27. Page about, chinois

*Fichier : `hifz/src/pages/zh/about.html`*

```html
<!--meta {"slug": "about", "title": "关于 {{site_name}}", "description": "为什么做 {{site_name}}、手册如何运作，以及经文数据的来源。"} -->
<section class="hero"><h1>关于 {{site_name}}</h1><p>一本免费的手册，帮助家庭在家里陪孩子背诵古兰经。</p></section>
<article class="prose">
  <h2>为什么做这本手册</h2>
  <p>很多家长都希望孩子能背会第三十卷，但每天晚上都要想清楚该背什么、该复习什么，需要花心思安排，不是每个人都有时间。古兰经学堂一般采用简单的方法：学新课、复习最近学过的段落、轮流复习以前背会的内容。{{site_name}} 按照孩子的节奏，替您把这套方法安排好。</p>
  <h2>计划是怎样计算的</h2>
  <ul>
    <li>手册根据孩子实际背出来的经节安排：您点“已背会”的内容算作背会；点“再练一次”，这一段会在下次课再次出现。</li>
    <li>每一段绝不会跨越两章。</li>
    <li>近期复习包括最近几次课的段落；旧课复习按经文顺序轮流复习已会背的各章。</li>
    <li>显示的日期都是估算，每天重新计算：错过一次课绝不意味着“失败”。</li>
  </ul>
  <h2>数据来源</h2>
  <ul>
    <li>参照版本：<a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">法赫德国王古兰经印制中心</a>印制的哈夫斯读法麦地那版古兰经（604 页，6236 节）。</li>
    <li>该版本的章、节、页划分：<em>quran-meta</em> 程序库（MIT 许可）。</li>
    <li>各章中文名称：采用马坚译本的章名；拉丁字母章名：<em>quran-json</em>，作者 Risan Bagja Pradana（CC BY-SA 4.0）。</li>
    <li>“收听”链接会打开独立网站 <a href="https://quran.com" rel="noopener">Quran.com</a>。</li>
  </ul>
  <p class="note">{{site_name}} 帮助安排背诵进度，不能代替老师聆听孩子诵读、纠正其诵读规则。</p>
  <h2>联系我们</h2>
  <p>有意见、想法或遇到问题？请写信至 {{contact_email}}。</p>
</article>
```

---

## 28. Page privacy, chinois

*Fichier : `hifz/src/pages/zh/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "隐私与 Cookie — {{site_name}}", "description": "{{site_name}} 处理哪些数据，以及如何行使您的权利（GDPR）。"} -->
<section class="hero"><h1>隐私与 Cookie</h1><p>您的计划和孩子的进度都保存在您的设备上。</p></section>
<article class="prose">
  <h2>数据控制者</h2>
  <p>{{controller}}。联系方式：{{contact_email}}。</p>
  <h2>您的计划和进度</h2>
  <p>计划设置、已勾选的段落和进度<strong>只在您的浏览器中</strong>处理。这些内容保存在页面地址和浏览器的本地存储中，从不发送到我们的服务器。</p>
  <h2>孩子的名字</h2>
  <p>名字是可选的。如果填写，它只保存在您的设备上，不会包含在备份链接中。只有当您自己打印或复制每周记录表时，名字才会出现在表上。</p>
  <h2>技术日志</h2>
  <p>我们的托管服务商（{{host_name}}）会收到显示页面和保护网站所需的技术数据（IP 地址、浏览器类型、访问的页面、日期和时间），并在有限期限内保存。法律依据：正当利益。</p>
  <h2>广告与 Cookie</h2>
  <p>将来本网站可能通过 Google AdSense（Google Ireland Limited）的广告维持运营。经您同意，Google 及其合作伙伴可使用 Cookie 或类似标识符来展示个性化广告并衡量广告效果；未经同意，可能会展示非个性化广告。在欧洲经济区、英国和瑞士，您可以通过同意横幅接受、拒绝或自定义这些 Cookie，并可随时更改选择。了解更多：<a href="https://policies.google.com/technologies/partner-sites" rel="noopener">Google 如何使用合作伙伴网站的信息</a>。</p>
  <h2>您的权利</h2>
  <p>根据 GDPR，您有权访问、更正、删除数据，限制或反对数据处理，以及携带您的数据。请写信至 {{contact_email}}。您也可以向数据保护机构投诉（在法国为 <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>）。</p>
  <p><small>最后更新：{{updated}}。</small></p>
</article>
```

---

## 29. Page legal, chinois

*Fichier : `hifz/src/pages/zh/legal.html`*

```html
<!--meta {"slug": "legal", "title": "法律声明 — {{site_name}}", "description": "{{site_name}} 的发布者、托管服务商和使用条款。"} -->
<section class="hero"><h1>法律声明</h1></section>
<article class="prose">
  <h2>发布者</h2>
  {{editor_block}}
  <h2>托管服务商</h2><p>{{host_name}}<br>{{host_address}}<br>电话：{{host_phone}}</p>
  <h2>使用条款</h2>
  <p>{{site_name}} 免费且按现状提供，用于帮助安排背诵。经节编号和页码以法赫德国王古兰经印制中心印制的麦地那版古兰经（哈夫斯读法）为准。发布者对所提供计划的任何使用不承担责任。本手册不能代替老师。</p>
  <h2>知识产权</h2>
  <p>除另有说明外，本网站的设计、代码和文字归发布者所有。章节划分：quran-meta（MIT）。拉丁字母章名：quran-json（CC BY-SA 4.0）。</p>
</article>
```

---

## 30. Page about, hindi

*Fichier : `hifz/src/pages/hi/about.html`*

```html
<!--meta {"slug": "about", "title": "{{site_name}} के बारे में", "description": "{{site_name}} क्यों बना, डायरी कैसे काम करती है और मुसहफ़ का डेटा कहाँ से आता है।"} -->
<section class="hero"><h1>{{site_name}} के बारे में</h1><p>घर पर बच्चों के क़ुरआन हिफ़्ज़ में साथ देने के लिए एक मुफ़्त डायरी।</p></section>
<article class="prose">
  <h2>यह डायरी क्यों</h2>
  <p>बहुत से माता-पिता चाहते हैं कि उनके बच्चे अम्मा पारा याद करें, लेकिन हर शाम यह तय करना कि क्या नया याद करना है और क्या दोहराना है, ऐसी व्यवस्था माँगता है जिसके लिए सबके पास समय नहीं होता। मदरसे एक आसान तरीक़ा अपनाते हैं: नया सबक़, हाल के सबक़ की दोहराई, और पुराने याद किए हुए हिस्सों की बारी-बारी से दोहराई। {{site_name}} आपके लिए यही तरीक़ा अपनाता है, आपके बच्चे की रफ़्तार से।</p>
  <h2>कार्यक्रम कैसे तय होता है</h2>
  <ul>
    <li>डायरी उन्हीं आयतों के हिसाब से चलती है जो सच में सुनाई गईं: जिस पर आप “सुना दिया” दबाते हैं वह याद गिना जाता है; “फिर से” दबाने पर वह हिस्सा अगले सत्र में लौट आता है।</li>
    <li>एक हिस्से में कभी दो सूरतें नहीं मिलाई जातीं।</li>
    <li>हाल की दोहराई में पिछले सत्रों के हिस्से होते हैं; पुरानी दोहराई में याद की हुई सूरतें मुसहफ़ के क्रम में बारी-बारी से आती हैं।</li>
    <li>दिखाई गई तारीख़ें अनुमान हैं और रोज़ फिर से निकाली जाती हैं: कोई सत्र छूट जाने का मतलब कभी “नाकामी” नहीं है।</li>
  </ul>
  <h2>डेटा के स्रोत</h2>
  <ul>
    <li>आधार मुसहफ़: हफ़्स अन आसिम रिवायत का मदीना मुसहफ़, जिसे <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">किंग फ़हद क़ुरआन प्रिंटिंग कॉम्प्लेक्स</a> छापता है (604 पन्ने, 6,236 आयतें)।</li>
    <li>इस मुसहफ़ का सूरतों, आयतों और पन्नों में बँटवारा: <em>quran-meta</em> लाइब्रेरी (MIT लाइसेंस)।</li>
    <li>सूरतों के नाम: हिन्दी में प्रचलित उच्चारण; लैटिन लिपि में नाम: <em>quran-json</em>, रिसान बगजा प्रदाना (CC BY-SA 4.0)।</li>
    <li>“सुनें” लिंक <a href="https://quran.com" rel="noopener">Quran.com</a> खोलते हैं, जो एक स्वतंत्र वेबसाइट है।</li>
  </ul>
  <p class="note">{{site_name}} हिफ़्ज़ को व्यवस्थित करता है; यह उस उस्ताद की जगह नहीं लेता जो बच्चे की तिलावत सुनकर तजवीद ठीक करते हैं।</p>
  <h2>संपर्क</h2>
  <p>कोई राय, सुझाव या परेशानी? {{contact_email}} पर लिखें।</p>
</article>
```

---

## 31. Page privacy, hindi

*Fichier : `hifz/src/pages/hi/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "निजता और कुकीज़ — {{site_name}}", "description": "{{site_name}} कौन-सा डेटा इस्तेमाल करता है और आप अपने अधिकार कैसे इस्तेमाल करें (GDPR)।"} -->
<section class="hero"><h1>निजता और कुकीज़</h1><p>आपकी योजना और प्रगति आपके डिवाइस में ही रहती है।</p></section>
<article class="prose">
  <h2>डेटा नियंत्रक</h2>
  <p>{{controller}}। संपर्क: {{contact_email}}।</p>
  <h2>आपकी योजना और प्रगति</h2>
  <p>योजना की सेटिंग्स, टिक किए गए हिस्से और प्रगति <strong>सिर्फ़ आपके ब्राउज़र में</strong> प्रोसेस होती हैं। ये पेज के पते और आपके ब्राउज़र की लोकल स्टोरेज में रहती हैं, और कभी हमारे सर्वर पर नहीं भेजी जातीं।</p>
  <h2>बच्चे का नाम</h2>
  <p>नाम डालना वैकल्पिक है। अगर डाला जाए, तो वह सिर्फ़ आपके डिवाइस में रहता है और बैकअप लिंक में शामिल नहीं होता। हफ़्तावार शीट पर नाम तभी दिखता है जब आप ख़ुद उसे प्रिंट या कॉपी करें।</p>
  <h2>तकनीकी लॉग</h2>
  <p>हमारी होस्टिंग कंपनी ({{host_name}}) पेज दिखाने और वेबसाइट की सुरक्षा के लिए ज़रूरी तकनीकी डेटा पाती है (IP पता, ब्राउज़र का प्रकार, देखे गए पेज, तारीख़ और समय) और उसे सीमित समय तक रखती है। क़ानूनी आधार: वैध हित।</p>
  <h2>विज्ञापन और कुकीज़</h2>
  <p>आगे चलकर वेबसाइट का ख़र्च Google AdSense (Google Ireland Limited) के विज्ञापनों से चल सकता है। आपकी सहमति से Google और उसके साझेदार निजी विज्ञापन दिखाने और उनका असर मापने के लिए कुकीज़ या मिलते-जुलते पहचानकर्ता इस्तेमाल कर सकते हैं; सहमति न होने पर ग़ैर-निजी विज्ञापन दिखाए जा सकते हैं। यूरोपीय आर्थिक क्षेत्र, यूनाइटेड किंगडम और स्विट्ज़रलैंड में एक सहमति बैनर से आप इन कुकीज़ को स्वीकार, अस्वीकार या अपने हिसाब से सेट कर सकते हैं, और कभी भी अपना फ़ैसला बदल सकते हैं। ज़्यादा जानकारी: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">Google साझेदार साइटों की जानकारी कैसे इस्तेमाल करता है</a>।</p>
  <h2>आपके अधिकार</h2>
  <p>GDPR के तहत आप अपना डेटा देख सकते हैं, सुधार सकते हैं, मिटवा सकते हैं, उसके इस्तेमाल को सीमित कर सकते हैं, आपत्ति कर सकते हैं और उसे कहीं और ले जा सकते हैं। {{contact_email}} पर लिखें। आप डेटा सुरक्षा प्राधिकरण से शिकायत भी कर सकते हैं (फ़्रांस में: <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>)।</p>
  <p><small>पिछला अपडेट: {{updated}}।</small></p>
</article>
```

---

## 32. Page legal, hindi

*Fichier : `hifz/src/pages/hi/legal.html`*

```html
<!--meta {"slug": "legal", "title": "क़ानूनी जानकारी — {{site_name}}", "description": "{{site_name}} के प्रकाशक, होस्टिंग कंपनी और इस्तेमाल की शर्तें।"} -->
<section class="hero"><h1>क़ानूनी जानकारी</h1></section>
<article class="prose">
  <h2>प्रकाशक</h2>
  {{editor_block}}
  <h2>होस्टिंग कंपनी</h2><p>{{host_name}}<br>{{host_address}}<br>फ़ोन: {{host_phone}}</p>
  <h2>इस्तेमाल की शर्तें</h2>
  <p>{{site_name}} हिफ़्ज़ को व्यवस्थित करने में मदद के लिए मुफ़्त और “जैसा है वैसा” दिया जाता है। आयतों के नंबर और पन्ने किंग फ़हद क़ुरआन प्रिंटिंग कॉम्प्लेक्स के छापे मदीना मुसहफ़ (हफ़्स अन आसिम) के अनुसार हैं। सुझाई गई योजनाओं के किसी भी इस्तेमाल के लिए प्रकाशक ज़िम्मेदार नहीं है। यह डायरी उस्ताद की जगह नहीं लेती।</p>
  <h2>बौद्धिक संपदा</h2>
  <p>जब तक अलग से न लिखा हो, वेबसाइट का डिज़ाइन, कोड और लेख प्रकाशक के हैं। सूरतों और आयतों का बँटवारा: quran-meta (MIT)। लैटिन लिपि में सूरतों के नाम: quran-json (CC BY-SA 4.0)।</p>
</article>
```

---

## 33. Page about, espagnol

*Fichier : `hifz/src/pages/es/about.html`*

```html
<!--meta {"slug": "about", "title": "Acerca de {{site_name}}", "description": "Por qué existe {{site_name}}, cómo funciona el cuaderno y de dónde vienen los datos del mushaf."} -->
<section class="hero"><h1>Acerca de {{site_name}}</h1><p>Un cuaderno gratuito para acompañar en casa la memorización del Corán de los niños.</p></section>
<article class="prose">
  <h2>Por qué este cuaderno</h2>
  <p>Muchos padres quieren que sus hijos memoricen el yuz ʿAmma, pero saber cada tarde qué aprender y qué repasar exige una organización para la que no todos tienen tiempo. Las escuelas coránicas siguen una rutina sencilla: un pasaje nuevo, el repaso de los pasajes recientes y el repaso por turnos de lo antiguo. {{site_name}} aplica esa rutina por ti, al ritmo de tu hijo.</p>
  <h2>Cómo se calcula el programa</h2>
  <ul>
    <li>El cuaderno sigue las aleyas recitadas de verdad: lo que marcas como «Recitado» queda memorizado; «Repetir» hace que el pasaje vuelva en la próxima sesión.</li>
    <li>Un pasaje nunca mezcla dos suras.</li>
    <li>El repaso reciente cubre los pasajes de las últimas sesiones; el repaso antiguo va rotando por las suras conocidas en el orden del mushaf.</li>
    <li>Las fechas son estimaciones que se recalculan cada día: saltarse una sesión nunca significa «fracasar».</li>
  </ul>
  <h2>Fuentes de los datos</h2>
  <ul>
    <li>Mushaf de referencia: el Mushaf de Medina, lectura de Hafs ʿan ʿĀṣim, impreso por el <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">Complejo Rey Fahd para la Impresión del Sagrado Corán</a> (604 páginas, 6236 aleyas).</li>
    <li>División en suras, aleyas y páginas de este mushaf: biblioteca <em>quran-meta</em> (licencia MIT).</li>
    <li>Nombres de las suras: <em>quran-json</em>, de Risan Bagja Pradana (CC BY-SA 4.0).</li>
    <li>Los enlaces «Escuchar» abren <a href="https://quran.com" rel="noopener">Quran.com</a>, un sitio independiente.</li>
  </ul>
  <p class="note">{{site_name}} organiza la memorización; no sustituye a un maestro que escuche al niño y corrija su tajwid.</p>
  <h2>Contacto</h2>
  <p>¿Un comentario, una idea, un problema? Escribe a {{contact_email}}.</p>
</article>
```

---

## 34. Page privacy, espagnol

*Fichier : `hifz/src/pages/es/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "Privacidad y cookies — {{site_name}}", "description": "Qué datos trata {{site_name}} y cómo ejercer tus derechos (RGPD)."} -->
<section class="hero"><h1>Privacidad y cookies</h1><p>Tu plan y tu avance se quedan en tu dispositivo.</p></section>
<article class="prose">
  <h2>Responsable del tratamiento</h2>
  <p>{{controller}}. Contacto: {{contact_email}}.</p>
  <h2>Tu plan y tu avance</h2>
  <p>Los ajustes del plan, los pasajes marcados y el avance se tratan <strong>solo en tu navegador</strong>. Se guardan en la dirección de la página y en el almacenamiento local del navegador, y nunca se envían a nuestros servidores.</p>
  <h2>El nombre del niño</h2>
  <p>El nombre es opcional. Si lo escribes, se queda solo en tu dispositivo y no se incluye en el enlace de copia de seguridad. Solo aparece en la ficha semanal si tú mismo la imprimes o la copias.</p>
  <h2>Registros técnicos</h2>
  <p>Nuestro proveedor de alojamiento ({{host_name}}) recibe los datos técnicos necesarios para servir las páginas y proteger el sitio (dirección IP, tipo de navegador, páginas solicitadas, fecha y hora) y los conserva durante un tiempo limitado. Base jurídica: interés legítimo.</p>
  <h2>Publicidad y cookies</h2>
  <p>En el futuro, el sitio podría financiarse con publicidad a través de Google AdSense (Google Ireland Limited). Con tu consentimiento, Google y sus socios pueden usar cookies o identificadores similares para mostrar anuncios personalizados y medir su rendimiento; sin consentimiento, pueden mostrarse anuncios no personalizados. En el EEE, el Reino Unido y Suiza, un banner de consentimiento te permite aceptar, rechazar o configurar esas cookies, y puedes cambiar tu elección en cualquier momento. Más información: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">cómo usa Google la información de los sitios asociados</a>.</p>
  <h2>Tus derechos</h2>
  <p>Según el RGPD, puedes acceder a tus datos, rectificarlos, suprimirlos, limitar u oponerte a su tratamiento y solicitar su portabilidad. Escribe a {{contact_email}}. También puedes reclamar ante tu autoridad de protección de datos (en Francia, la <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>).</p>
  <p><small>Última actualización: {{updated}}.</small></p>
</article>
```

---

## 35. Page legal, espagnol

*Fichier : `hifz/src/pages/es/legal.html`*

```html
<!--meta {"slug": "legal", "title": "Aviso legal — {{site_name}}", "description": "Editor, proveedor de alojamiento y condiciones de uso de {{site_name}}."} -->
<section class="hero"><h1>Aviso legal</h1></section>
<article class="prose">
  <h2>Editor</h2>
  {{editor_block}}
  <h2>Proveedor de alojamiento</h2><p>{{host_name}}<br>{{host_address}}<br>Teléfono: {{host_phone}}</p>
  <h2>Condiciones de uso</h2>
  <p>{{site_name}} se ofrece gratis, tal cual, como ayuda para organizar la memorización. La numeración de las aleyas y las páginas siguen el Mushaf de Medina (Hafs ʿan ʿĀṣim) impreso por el Complejo Rey Fahd para la Impresión del Sagrado Corán. El editor no se hace responsable del uso que se haga de los programas propuestos. Este cuaderno no sustituye a un maestro.</p>
  <h2>Propiedad intelectual</h2>
  <p>El diseño, el código y los textos del sitio pertenecen al editor, salvo que se indique lo contrario. División en suras y aleyas: quran-meta (MIT). Nombres de las suras: quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 36. Page about, arabe

*Fichier : `hifz/src/pages/ar/about.html`*

```html
<!--meta {"slug": "about", "title": "عن {{site_name}}", "description": "لماذا أُنشئ {{site_name}}، وكيف يعمل الدفتر، ومن أين تأتي بيانات المصحف."} -->
<section class="hero"><h1>عن {{site_name}}</h1><p>دفتر مجاني يعين الأسرة على تحفيظ أطفالها القرآن الكريم في البيت.</p></section>
<article class="prose">
  <h2>لماذا هذا الدفتر</h2>
  <p>يتمنّى كثير من الآباء والأمهات أن يحفظ أبناؤهم جزء عمّ، لكنّ معرفة ما يُحفَظ وما يُراجَع كل مساء تحتاج إلى تنظيم لا يتّسع له وقت الجميع. تعتمد حلقات التحفيظ طريقة بسيطة: حفظ جديد، ومراجعة المقاطع القريبة، ومراجعة المحفوظ القديم بالتناوب. يطبّق {{site_name}} هذه الطريقة عنك، على قدر طاقة طفلك.</p>
  <h2>كيف يُحسَب البرنامج</h2>
  <ul>
    <li>يتّبع الدفتر الآيات التي سُمِّعت فعلًا: ما تؤشّر عليه بـ«تمّ التسميع» يُعَدّ محفوظًا، و«يُعاد» يُرجع المقطع في الجلسة القادمة.</li>
    <li>لا يجمع المقطع الواحد بين سورتين أبدًا.</li>
    <li>المراجعة القريبة تشمل مقاطع الجلسات الأخيرة، والمراجعة البعيدة تدور على السور المحفوظة بترتيب المصحف.</li>
    <li>التواريخ المعروضة تقديرات يُعاد حسابها كل يوم: الجلسة الفائتة لا تعني الإخفاق أبدًا.</li>
  </ul>
  <h2>مصادر البيانات</h2>
  <ul>
    <li>المصحف المرجعي: مصحف المدينة النبوية برواية حفص عن عاصم، من طباعة <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">مجمع الملك فهد لطباعة المصحف الشريف</a> (604 صفحات، 6236 آية).</li>
    <li>تقسيم هذا المصحف إلى سور وآيات وصفحات: مكتبة <em>quran-meta</em> (رخصة MIT).</li>
    <li>أسماء السور: <em>quran-json</em> لريسان باجا برادانا (CC BY-SA 4.0).</li>
    <li>روابط «استمع» تفتح موقع <a href="https://quran.com" rel="noopener">Quran.com</a>، وهو موقع مستقل.</li>
  </ul>
  <p class="note">ينظّم {{site_name}} الحفظ، ولا يُغني عن معلّم يستمع إلى الطفل ويصحّح تجويده.</p>
  <h2>للتواصل</h2>
  <p>ملاحظة أو فكرة أو مشكلة؟ راسلنا على {{contact_email}}.</p>
</article>
```

---

## 37. Page privacy, arabe

*Fichier : `hifz/src/pages/ar/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "الخصوصية وملفات تعريف الارتباط — {{site_name}}", "description": "ما البيانات التي يعالجها {{site_name}} وكيف تمارس حقوقك (اللائحة العامة لحماية البيانات)."} -->
<section class="hero"><h1>الخصوصية وملفات تعريف الارتباط</h1><p>تبقى خطتك وتقدّم طفلك على جهازك.</p></section>
<article class="prose">
  <h2>المسؤول عن المعالجة</h2>
  <p>{{controller}}. للتواصل: {{contact_email}}.</p>
  <h2>خطتك وتقدّمك</h2>
  <p>تُعالَج إعدادات الخطة والمقاطع المؤشَّر عليها والتقدّم <strong>داخل متصفحك فقط</strong>. تُخزَّن في عنوان الصفحة وفي التخزين المحلي لمتصفحك، ولا تُرسَل أبدًا إلى خوادمنا.</p>
  <h2>اسم الطفل</h2>
  <p>الاسم اختياري. إن أدخلته فإنه يبقى على جهازك فقط، ولا يُضمَّن في رابط النسخة الاحتياطية. ولا يظهر في الورقة الأسبوعية إلا إذا طبعتها أو نسختها بنفسك.</p>
  <h2>السجلات التقنية</h2>
  <p>يتلقّى مستضيفنا ({{host_name}}) البيانات التقنية اللازمة لعرض الصفحات وحماية الموقع (عنوان IP، ونوع المتصفح، والصفحات المطلوبة، والتاريخ والوقت)، ويحتفظ بها مدة محدودة. الأساس القانوني: المصلحة المشروعة.</p>
  <h2>الإعلانات وملفات تعريف الارتباط</h2>
  <p>قد يُموَّل الموقع لاحقًا بالإعلانات عبر Google AdSense (شركة Google Ireland Limited). بموافقتك، يمكن لـGoogle وشركائها استخدام ملفات تعريف الارتباط أو معرّفات مشابهة لعرض إعلانات مخصّصة وقياس أدائها؛ ومن دون موافقتك قد تُعرَض إعلانات غير مخصّصة. في المنطقة الاقتصادية الأوروبية والمملكة المتحدة وسويسرا، تتيح لك نافذة موافقة القبول أو الرفض أو التخصيص، ويمكنك تغيير اختيارك في أي وقت. للمزيد: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">كيف تستخدم Google المعلومات من المواقع الشريكة</a>.</p>
  <h2>حقوقك</h2>
  <p>وفق اللائحة العامة لحماية البيانات (GDPR)، يحقّ لك الاطلاع على بياناتك وتصحيحها وحذفها وتقييد معالجتها والاعتراض عليها ونقلها. راسلنا على {{contact_email}}. ويمكنك أيضًا تقديم شكوى إلى سلطة حماية البيانات (في فرنسا: <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>).</p>
  <p><small>آخر تحديث: {{updated}}.</small></p>
</article>
```

---

## 38. Page legal, arabe

*Fichier : `hifz/src/pages/ar/legal.html`*

```html
<!--meta {"slug": "legal", "title": "الإشعار القانوني — {{site_name}}", "description": "الناشر والمستضيف وشروط استخدام موقع {{site_name}}."} -->
<section class="hero"><h1>الإشعار القانوني</h1></section>
<article class="prose">
  <h2>الناشر</h2>
  {{editor_block}}
  <h2>المستضيف</h2><p>{{host_name}}<br><span dir="ltr">{{host_address}}</span><br>الهاتف: <span dir="ltr">{{host_phone}}</span></p>
  <h2>شروط الاستخدام</h2>
  <p>يُقدَّم {{site_name}} مجانًا، كما هو، للمساعدة على تنظيم الحفظ. ترقيم الآيات والصفحات مطابق لمصحف المدينة النبوية (رواية حفص عن عاصم) من طباعة مجمع الملك فهد لطباعة المصحف الشريف. ولا يتحمّل الناشر مسؤولية أي استخدام للبرامج المقترحة. هذا الدفتر لا يُغني عن المعلّم.</p>
  <h2>الملكية الفكرية</h2>
  <p>تصميم الموقع وشيفرته ونصوصه ملك للناشر ما لم يُذكَر خلاف ذلك. تقسيم السور والآيات: quran-meta (MIT). أسماء السور: quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 39. Page about, français

*Fichier : `hifz/src/pages/fr/about.html`*

```html
<!--meta {"slug": "about", "title": "À propos de {{site_name}}", "description": "Pourquoi {{site_name}} existe, comment fonctionne le carnet et d'où viennent les données coraniques."} -->
<section class="hero"><h1>À propos de {{site_name}}</h1><p>Un carnet gratuit pour accompagner la mémorisation du Coran des enfants, à la maison.</p></section>
<article class="prose">
  <h2>Pourquoi ce carnet</h2>
  <p>Beaucoup de parents veulent faire mémoriser Juz ʿAmma à leurs enfants, mais savoir chaque soir quoi apprendre et quoi réviser demande une organisation que peu ont le temps de tenir. Les écoles coraniques utilisent une routine simple : un nouveau passage, la révision des passages récents et la révision tournante de l’ancien. {{site_name}} applique cette routine pour vous, au rythme de votre enfant.</p>
  <h2>Comment le programme est calculé</h2>
  <ul>
    <li>Le carnet suit les versets réellement récités : ce que vous cochez « Récité » est acquis ; « À revoir » fait revenir le passage à la séance suivante.</li>
    <li>Un passage ne mélange jamais deux sourates.</li>
    <li>La révision récente reprend les passages des dernières séances ; la révision ancienne fait tourner les sourates déjà connues, dans l’ordre du mushaf.</li>
    <li>Les dates affichées sont des estimations, recalculées chaque jour : une séance manquée ne fait rien « rater ».</li>
  </ul>
  <h2>Sources des données</h2>
  <ul>
    <li>Mushaf de référence : le Mushaf de Médine, lecture Hafs ʿan ʿĀṣim, imprimé par le <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">Complexe du Roi Fahd pour l’impression du Saint Coran</a> (604 pages, 6 236 versets).</li>
    <li>Découpage de ce mushaf (sourates, versets, pages) : bibliothèque <em>quran-meta</em> (licence MIT).</li>
    <li>Noms des sourates : <em>quran-json</em> de Risan Bagja Pradana (CC BY-SA 4.0).</li>
    <li>Les liens « Écouter » ouvrent <a href="https://quran.com" rel="noopener">Quran.com</a>, site indépendant.</li>
  </ul>
  <p class="note">{{site_name}} organise la mémorisation ; il ne remplace pas un enseignant qui écoute l’enfant et corrige son tajwid.</p>
  <h2>Contact</h2>
  <p>Une remarque, une idée, un souci ? Écrivez à {{contact_email}}.</p>
</article>
```

---

## 40. Page privacy, français

*Fichier : `hifz/src/pages/fr/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "Confidentialité et cookies — {{site_name}}", "description": "Quelles données {{site_name}} traite et comment exercer vos droits (RGPD)."} -->
<section class="hero"><h1>Politique de confidentialité et cookies</h1><p>Votre plan et votre progression restent sur votre appareil.</p></section>
<article class="prose">
  <h2>Responsable du traitement</h2>
  <p>{{controller}}. Contact : {{contact_email}}.</p>
  <h2>Votre plan et votre progression</h2>
  <p>Les réglages du plan, les passages cochés et la progression sont traités <strong>uniquement dans votre navigateur</strong>. Ils sont stockés dans l’adresse de la page et dans le stockage local du navigateur, et ne sont jamais envoyés à nos serveurs.</p>
  <h2>Le prénom de l’enfant</h2>
  <p>Le prénom est facultatif. S’il est saisi, il reste uniquement sur votre appareil et n’apparaît pas dans le lien de sauvegarde. Il figure sur la fiche de la semaine seulement si vous l’imprimez ou la copiez vous-même.</p>
  <h2>Journaux techniques</h2>
  <p>Notre hébergeur ({{host_name}}) reçoit les données techniques nécessaires à l’affichage et à la sécurité du site (adresse IP, navigateur, pages demandées, date et heure) et les conserve pendant une durée limitée. Base légale : intérêt légitime.</p>
  <h2>Publicité et cookies</h2>
  <p>Le site peut être financé par la publicité via Google AdSense (Google Ireland Limited). Avec votre consentement, Google et ses partenaires peuvent utiliser des cookies ou identifiants similaires pour afficher des annonces personnalisées et en mesurer la performance ; sans consentement, des annonces non personnalisées peuvent être affichées. Dans l’EEE, au Royaume-Uni et en Suisse, un bandeau vous permet d’accepter, de refuser ou de paramétrer ces cookies, et de modifier votre choix à tout moment. Le consentement est conservé 13 mois au maximum.</p>
  <h2>Vos droits</h2>
  <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Écrivez à {{contact_email}}. Vous pouvez aussi saisir la <a href="https://www.cnil.fr/fr/plaintes" rel="noopener">CNIL</a>.</p>
  <p><small>Dernière mise à jour : 22 novembre 2026.</small></p>
</article>
```

---

## 41. Page legal, français

*Fichier : `hifz/src/pages/fr/legal.html`*

```html
<!--meta {"slug": "legal", "title": "Mentions légales — {{site_name}}", "description": "Éditeur, hébergeur et conditions d'utilisation du site {{site_name}}."} -->
<section class="hero"><h1>Mentions légales</h1><p>Informations prévues par la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).</p></section>
<article class="prose">
  <h2>Éditeur</h2>
  {{editor_block}}
  <h2>Hébergeur</h2><p>{{host_name}}<br>{{host_address}}<br>Téléphone : {{host_phone}}</p>
  <h2>Conditions d’utilisation</h2>
  <p>{{site_name}} est fourni gratuitement, en l’état, comme aide à l’organisation de la mémorisation. La numérotation des versets et les pages suivent le Mushaf de Médine (Hafs ʿan ʿĀṣim) imprimé par le Complexe du Roi Fahd pour l’impression du Saint Coran. L’éditeur ne saurait être tenu responsable de l’usage des programmes proposés. Ce carnet ne remplace pas un enseignant.</p>
  <h2>Propriété intellectuelle</h2>
  <p>La conception, le code et les textes du site appartiennent à l’éditeur, sauf mention contraire. Découpage des sourates et versets : quran-meta (MIT). Noms des sourates : quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 42. Page about, bengali

*Fichier : `hifz/src/pages/bn/about.html`*

```html
<!--meta {"slug": "about", "title": "{{site_name}} সম্পর্কে", "description": "{{site_name}} কেন, খাতাটি কীভাবে কাজ করে, আর মুসহাফের তথ্য কোথা থেকে আসে।"} -->
<section class="hero"><h1>{{site_name}} সম্পর্কে</h1><p>ঘরে বসে সন্তানের কুরআন হিফজে সাহায্য করার একটি বিনামূল্যের খাতা।</p></section>
<article class="prose">
  <h2>কেন এই খাতা</h2>
  <p>অনেক বাবা-মা চান তাঁদের সন্তান আমপারা মুখস্থ করুক, কিন্তু প্রতি সন্ধ্যায় কী নতুন পড়বে আর কী রিভিশন দেবে, তা ঠিক করতে যে গোছানো সময় লাগে, তা সবার থাকে না। হিফজখানাগুলো একটি সহজ নিয়ম মেনে চলে: নতুন সবক, সাম্প্রতিক পড়ার রিভিশন, আর পুরোনো পড়ার পালাক্রমে রিভিশন। {{site_name}} আপনার হয়ে এই নিয়ম মেনে চলে, আপনার সন্তানের গতিতে।</p>
  <h2>পরিকল্পনা কীভাবে হিসাব হয়</h2>
  <ul>
    <li>খাতাটি সত্যিই শোনানো আয়াতগুলো অনুসরণ করে: আপনি যেটিতে “শুনিয়েছে” দেন সেটি মুখস্থ ধরা হয়; “আবার পড়বে” দিলে অংশটি পরের সেশনে ফিরে আসে।</li>
    <li>একটি অংশে কখনো দুটি সূরা মেশানো হয় না।</li>
    <li>সাম্প্রতিক রিভিশনে থাকে শেষ কয়েকটি সেশনের পড়া; পুরোনো রিভিশনে মুসহাফের ক্রমে জানা সূরাগুলো পালাক্রমে আসে।</li>
    <li>দেখানো তারিখগুলো আনুমানিক, প্রতিদিন নতুন করে হিসাব হয়: কোনো সেশন বাদ পড়া মানে কখনোই “ব্যর্থতা” নয়।</li>
  </ul>
  <h2>তথ্যের উৎস</h2>
  <ul>
    <li>অনুসৃত মুসহাফ: হাফস আন আসিম রেওয়ায়াতের মদীনা মুসহাফ, যা ছাপে <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">বাদশাহ ফাহাদ কুরআন মুদ্রণ কমপ্লেক্স</a> (৬০৪ পৃষ্ঠা, ৬,২৩৬টি আয়াত)।</li>
    <li>এই মুসহাফের সূরা, আয়াত ও পৃষ্ঠা বিভাজন: <em>quran-meta</em> লাইব্রেরি (MIT লাইসেন্স)।</li>
    <li>সূরার নাম: বাংলায় প্রচলিত উচ্চারণ; লাতিন হরফে নাম: <em>quran-json</em>, রিসান বাগজা প্রাদানা (CC BY-SA 4.0)।</li>
    <li>“শুনুন” লিংক <a href="https://quran.com" rel="noopener">Quran.com</a> খোলে, যা একটি স্বতন্ত্র ওয়েবসাইট।</li>
  </ul>
  <p class="note">{{site_name}} হিফজ গুছিয়ে রাখে; যে উস্তাদ সন্তানের তিলাওয়াত শুনে তাজবীদ শুধরে দেন, তাঁর বিকল্প নয়।</p>
  <h2>যোগাযোগ</h2>
  <p>কোনো মতামত, পরামর্শ বা সমস্যা? লিখুন {{contact_email}} ঠিকানায়।</p>
</article>
```

---

## 43. Page privacy, bengali

*Fichier : `hifz/src/pages/bn/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "গোপনীয়তা ও কুকি — {{site_name}}", "description": "{{site_name}} কোন তথ্য ব্যবহার করে এবং আপনার অধিকার কীভাবে প্রয়োগ করবেন (GDPR)।"} -->
<section class="hero"><h1>গোপনীয়তা ও কুকি</h1><p>আপনার পরিকল্পনা ও অগ্রগতি আপনার ডিভাইসেই থাকে।</p></section>
<article class="prose">
  <h2>তথ্য নিয়ন্ত্রক</h2>
  <p>{{controller}}। যোগাযোগ: {{contact_email}}।</p>
  <h2>আপনার পরিকল্পনা ও অগ্রগতি</h2>
  <p>পরিকল্পনার সেটিংস, টিক দেওয়া অংশ আর অগ্রগতি <strong>শুধু আপনার ব্রাউজারেই</strong> প্রক্রিয়া করা হয়। এগুলো পেজের ঠিকানায় আর ব্রাউজারের লোকাল স্টোরেজে থাকে, কখনো আমাদের সার্ভারে পাঠানো হয় না।</p>
  <h2>সন্তানের নাম</h2>
  <p>নাম দেওয়া ঐচ্ছিক। দিলে তা শুধু আপনার ডিভাইসে থাকে, ব্যাকআপ লিংকে যুক্ত হয় না। সাপ্তাহিক শিটে নাম দেখা যায় কেবল তখনই, যখন আপনি নিজে শিটটি প্রিন্ট বা কপি করেন।</p>
  <h2>প্রযুক্তিগত লগ</h2>
  <p>আমাদের হোস্ট ({{host_name}}) পেজ দেখানো ও ওয়েবসাইট সুরক্ষার জন্য প্রয়োজনীয় প্রযুক্তিগত তথ্য পায় (IP ঠিকানা, ব্রাউজারের ধরন, দেখা পেজ, তারিখ ও সময়) এবং সীমিত সময়ের জন্য রাখে। আইনি ভিত্তি: বৈধ স্বার্থ।</p>
  <h2>বিজ্ঞাপন ও কুকি</h2>
  <p>ভবিষ্যতে ওয়েবসাইটটির খরচ Google AdSense (Google Ireland Limited)-এর বিজ্ঞাপন দিয়ে চালানো হতে পারে। আপনার সম্মতি থাকলে Google ও তার অংশীদারেরা ব্যক্তিগতকৃত বিজ্ঞাপন দেখাতে ও তার কার্যকারিতা মাপতে কুকি বা অনুরূপ শনাক্তকারী ব্যবহার করতে পারে; সম্মতি না থাকলে অ-ব্যক্তিগতকৃত বিজ্ঞাপন দেখানো হতে পারে। ইউরোপীয় অর্থনৈতিক অঞ্চল, যুক্তরাজ্য ও সুইজারল্যান্ডে একটি সম্মতি-ব্যানার দিয়ে আপনি এসব কুকি গ্রহণ, প্রত্যাখ্যান বা নিজের মতো ঠিক করতে পারবেন, এবং যেকোনো সময় সিদ্ধান্ত বদলাতে পারবেন। বিস্তারিত: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">অংশীদার সাইটের তথ্য Google কীভাবে ব্যবহার করে</a>।</p>
  <h2>আপনার অধিকার</h2>
  <p>GDPR অনুযায়ী আপনি নিজের তথ্য দেখতে, সংশোধন করতে, মুছে ফেলতে, প্রক্রিয়া সীমিত করতে, আপত্তি জানাতে এবং অন্যত্র নিতে পারেন। লিখুন {{contact_email}} ঠিকানায়। তথ্য সুরক্ষা কর্তৃপক্ষের কাছেও অভিযোগ করতে পারেন (ফ্রান্সে: <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>)।</p>
  <p><small>সর্বশেষ হালনাগাদ: {{updated}}।</small></p>
</article>
```

---

## 44. Page legal, bengali

*Fichier : `hifz/src/pages/bn/legal.html`*

```html
<!--meta {"slug": "legal", "title": "আইনি তথ্য — {{site_name}}", "description": "{{site_name}}-এর প্রকাশক, হোস্টিং প্রতিষ্ঠান ও ব্যবহারের শর্ত।"} -->
<section class="hero"><h1>আইনি তথ্য</h1></section>
<article class="prose">
  <h2>প্রকাশক</h2>
  {{editor_block}}
  <h2>হোস্টিং প্রতিষ্ঠান</h2><p>{{host_name}}<br>{{host_address}}<br>ফোন: {{host_phone}}</p>
  <h2>ব্যবহারের শর্ত</h2>
  <p>{{site_name}} বিনামূল্যে, যেমন আছে তেমনভাবে, হিফজ গুছিয়ে রাখতে সাহায্যের জন্য দেওয়া হয়। আয়াত নম্বর ও পৃষ্ঠা বাদশাহ ফাহাদ কুরআন মুদ্রণ কমপ্লেক্সের ছাপা মদীনা মুসহাফ (হাফস আন আসিম) অনুসরণ করে। প্রস্তাবিত পরিকল্পনার যেকোনো ব্যবহারের জন্য প্রকাশক দায়ী নন। এই খাতা উস্তাদের বিকল্প নয়।</p>
  <h2>মেধাস্বত্ব</h2>
  <p>ভিন্ন কিছু উল্লেখ না থাকলে ওয়েবসাইটের নকশা, কোড ও লেখা প্রকাশকের। সূরা ও আয়াত বিভাজন: quran-meta (MIT)। লাতিন হরফে সূরার নাম: quran-json (CC BY-SA 4.0)।</p>
</article>
```

---

## 45. Page about, portugais

*Fichier : `hifz/src/pages/pt/about.html`*

```html
<!--meta {"slug": "about", "title": "Sobre o {{site_name}}", "description": "Por que o {{site_name}} existe, como o caderno funciona e de onde vêm os dados do mushaf."} -->
<section class="hero"><h1>Sobre o {{site_name}}</h1><p>Um caderno gratuito para acompanhar em casa a memorização do Alcorão pelas crianças.</p></section>
<article class="prose">
  <h2>Por que este caderno</h2>
  <p>Muitos pais querem que os filhos memorizem o Juz ʿAmma, mas saber toda noite o que aprender e o que revisar exige uma organização para a qual nem todos têm tempo. As escolas corânicas seguem uma rotina simples: um trecho novo, a revisão dos trechos recentes e a revisão em rodízio do que é antigo. O {{site_name}} aplica essa rotina por você, no ritmo do seu filho.</p>
  <h2>Como o programa é calculado</h2>
  <ul>
    <li>O caderno acompanha os versículos realmente recitados: o que você marca como “Recitou” fica memorizado; “Repetir” traz o trecho de volta na próxima sessão.</li>
    <li>Um trecho nunca mistura duas suratas.</li>
    <li>A revisão recente cobre os trechos das últimas sessões; a revisão antiga percorre em rodízio as suratas já sabidas, na ordem do mushaf.</li>
    <li>As datas mostradas são estimativas recalculadas todos os dias: perder uma sessão nunca significa “fracassar”.</li>
  </ul>
  <h2>Fontes dos dados</h2>
  <ul>
    <li>Mushaf de referência: o Mushaf de Medina, leitura de Hafs ʿan ʿĀṣim, impresso pelo <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">Complexo Rei Fahd para a Impressão do Alcorão Sagrado</a> (604 páginas, 6.236 versículos).</li>
    <li>Divisão em suratas, versículos e páginas deste mushaf: biblioteca <em>quran-meta</em> (licença MIT).</li>
    <li>Nomes das suratas: <em>quran-json</em>, de Risan Bagja Pradana (CC BY-SA 4.0).</li>
    <li>Os links “Ouvir” abrem o <a href="https://quran.com" rel="noopener">Quran.com</a>, um site independente.</li>
  </ul>
  <p class="note">O {{site_name}} organiza a memorização; ele não substitui um professor que ouça a criança e corrija o tajwid.</p>
  <h2>Contato</h2>
  <p>Um comentário, uma ideia, um problema? Escreva para {{contact_email}}.</p>
</article>
```

---

## 46. Page privacy, portugais

*Fichier : `hifz/src/pages/pt/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "Privacidade e cookies — {{site_name}}", "description": "Quais dados o {{site_name}} trata e como exercer seus direitos (RGPD)."} -->
<section class="hero"><h1>Privacidade e cookies</h1><p>Seu plano e seu progresso ficam no seu aparelho.</p></section>
<article class="prose">
  <h2>Responsável pelo tratamento</h2>
  <p>{{controller}}. Contato: {{contact_email}}.</p>
  <h2>Seu plano e seu progresso</h2>
  <p>As configurações do plano, os trechos marcados e o progresso são tratados <strong>apenas no seu navegador</strong>. Eles ficam guardados no endereço da página e no armazenamento local do navegador, e nunca são enviados aos nossos servidores.</p>
  <h2>O nome da criança</h2>
  <p>O nome é opcional. Se for informado, fica apenas no seu aparelho e não entra no link de backup. Ele só aparece na ficha semanal se você mesmo a imprimir ou copiar.</p>
  <h2>Registros técnicos</h2>
  <p>Nosso provedor de hospedagem ({{host_name}}) recebe os dados técnicos necessários para entregar as páginas e proteger o site (endereço IP, tipo de navegador, páginas solicitadas, data e hora) e os guarda por um período limitado. Base legal: legítimo interesse.</p>
  <h2>Publicidade e cookies</h2>
  <p>No futuro, o site poderá ser financiado por anúncios do Google AdSense (Google Ireland Limited). Com o seu consentimento, o Google e seus parceiros podem usar cookies ou identificadores semelhantes para exibir anúncios personalizados e medir o desempenho deles; sem consentimento, podem ser exibidos anúncios não personalizados. No EEE, no Reino Unido e na Suíça, um banner de consentimento permite aceitar, recusar ou personalizar esses cookies, e você pode mudar sua escolha a qualquer momento. Saiba mais: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">como o Google usa informações de sites parceiros</a>.</p>
  <h2>Seus direitos</h2>
  <p>Pelo RGPD, você pode acessar, corrigir, apagar, limitar o tratamento, opor-se ao tratamento e pedir a portabilidade dos seus dados. Escreva para {{contact_email}}. Você também pode reclamar à autoridade de proteção de dados (na França, a <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>).</p>
  <p><small>Última atualização: {{updated}}.</small></p>
</article>
```

---

## 47. Page legal, portugais

*Fichier : `hifz/src/pages/pt/legal.html`*

```html
<!--meta {"slug": "legal", "title": "Informações legais — {{site_name}}", "description": "Editor, provedor de hospedagem e termos de uso do {{site_name}}."} -->
<section class="hero"><h1>Informações legais</h1></section>
<article class="prose">
  <h2>Editor</h2>
  {{editor_block}}
  <h2>Provedor de hospedagem</h2><p>{{host_name}}<br>{{host_address}}<br>Telefone: {{host_phone}}</p>
  <h2>Termos de uso</h2>
  <p>O {{site_name}} é oferecido gratuitamente, no estado em que se encontra, para ajudar a organizar a memorização. A numeração dos versículos e as páginas seguem o Mushaf de Medina (Hafs ʿan ʿĀṣim) impresso pelo Complexo Rei Fahd para a Impressão do Alcorão Sagrado. O editor não se responsabiliza pelo uso dos programas propostos. Este caderno não substitui um professor.</p>
  <h2>Propriedade intelectual</h2>
  <p>O design, o código e os textos do site pertencem ao editor, salvo indicação em contrário. Divisão em suratas e versículos: quran-meta (MIT). Nomes das suratas: quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 48. Page about, russe

*Fichier : `hifz/src/pages/ru/about.html`*

```html
<!--meta {"slug": "about", "title": "О проекте {{site_name}}", "description": "Зачем создан {{site_name}}, как работает тетрадь и откуда взяты данные мусхафа."} -->
<section class="hero"><h1>О проекте {{site_name}}</h1><p>Бесплатная тетрадь, которая помогает детям учить Коран наизусть дома.</p></section>
<article class="prose">
  <h2>Зачем эта тетрадь</h2>
  <p>Многие родители хотят, чтобы дети выучили джуз «Амма», но каждый вечер решать, что учить и что повторять, требует организованности, на которую не у всех есть время. В школах хифза применяют простой порядок: новый отрывок, повторение недавних отрывков и поочерёдное повторение старого. {{site_name}} выстраивает этот порядок за вас — в темпе вашего ребёнка.</p>
  <h2>Как рассчитывается программа</h2>
  <ul>
    <li>Тетрадь опирается на аяты, которые действительно рассказаны: отмеченное «Рассказано» считается выученным; «Повторить» возвращает отрывок на следующее занятие.</li>
    <li>Один отрывок никогда не захватывает две суры.</li>
    <li>Недавнее повторение охватывает отрывки последних занятий; повторение старого идёт по кругу по выученным сурам в порядке мусхафа.</li>
    <li>Показанные даты — это оценки, которые пересчитываются каждый день: пропущенное занятие никогда не означает «провал».</li>
  </ul>
  <h2>Источники данных</h2>
  <ul>
    <li>Эталонный мусхаф: Мединский мусхаф в чтении Хафс от Асыма, изданный <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">Комплексом короля Фахда по изданию Священного Корана</a> (604 страницы, 6236 аятов).</li>
    <li>Деление этого мусхафа на суры, аяты и страницы: библиотека <em>quran-meta</em> (лицензия MIT).</li>
    <li>Названия сур: общепринятая русская транслитерация; латиницей — <em>quran-json</em>, автор Risan Bagja Pradana (CC BY-SA 4.0).</li>
    <li>Ссылки «Слушать» открывают независимый сайт <a href="https://quran.com" rel="noopener">Quran.com</a>.</li>
  </ul>
  <p class="note">{{site_name}} помогает организовать заучивание, но не заменяет учителя, который слушает ребёнка и исправляет таджвид.</p>
  <h2>Связь</h2>
  <p>Замечание, идея, проблема? Пишите на {{contact_email}}.</p>
</article>
```

---

## 49. Page privacy, russe

*Fichier : `hifz/src/pages/ru/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "Конфиденциальность и cookie — {{site_name}}", "description": "Какие данные обрабатывает {{site_name}} и как воспользоваться своими правами (GDPR)."} -->
<section class="hero"><h1>Конфиденциальность и cookie</h1><p>Ваш план и прогресс остаются на вашем устройстве.</p></section>
<article class="prose">
  <h2>Ответственный за обработку данных</h2>
  <p>{{controller}}. Связь: {{contact_email}}.</p>
  <h2>Ваш план и прогресс</h2>
  <p>Настройки плана, отмеченные отрывки и прогресс обрабатываются <strong>только в вашем браузере</strong>. Они хранятся в адресе страницы и в локальном хранилище браузера и никогда не отправляются на наши серверы.</p>
  <h2>Имя ребёнка</h2>
  <p>Имя указывать необязательно. Если вы его укажете, оно останется только на вашем устройстве и не попадёт в ссылку для резервной копии. Имя появится в недельном листе, только если вы сами его распечатаете или скопируете.</p>
  <h2>Технические журналы</h2>
  <p>Наш хостинг-провайдер ({{host_name}}) получает технические данные, необходимые для показа страниц и защиты сайта (IP-адрес, тип браузера, запрошенные страницы, дата и время), и хранит их ограниченное время. Правовое основание: законный интерес.</p>
  <h2>Реклама и cookie</h2>
  <p>В будущем сайт может финансироваться за счёт рекламы Google AdSense (Google Ireland Limited). С вашего согласия Google и его партнёры могут использовать файлы cookie или похожие идентификаторы, чтобы показывать персонализированную рекламу и оценивать её эффективность; без согласия может показываться неперсонализированная реклама. В ЕЭЗ, Великобритании и Швейцарии баннер согласия позволяет принять, отклонить или настроить эти cookie, а изменить выбор можно в любой момент. Подробнее: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">как Google использует информацию с сайтов партнёров</a>.</p>
  <h2>Ваши права</h2>
  <p>Согласно GDPR вы можете получить доступ к своим данным, исправить или удалить их, ограничить их обработку или возразить против неё, а также запросить их перенос. Пишите на {{contact_email}}. Вы также можете подать жалобу в орган по защите данных (во Франции — <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>).</p>
  <p><small>Последнее обновление: {{updated}}.</small></p>
</article>
```

---

## 50. Page legal, russe

*Fichier : `hifz/src/pages/ru/legal.html`*

```html
<!--meta {"slug": "legal", "title": "Правовая информация — {{site_name}}", "description": "Издатель, хостинг-провайдер и условия использования {{site_name}}."} -->
<section class="hero"><h1>Правовая информация</h1></section>
<article class="prose">
  <h2>Издатель</h2>
  {{editor_block}}
  <h2>Хостинг-провайдер</h2><p>{{host_name}}<br>{{host_address}}<br>Телефон: {{host_phone}}</p>
  <h2>Условия использования</h2>
  <p>{{site_name}} предоставляется бесплатно, «как есть», в помощь организации заучивания. Нумерация аятов и страниц соответствует Мединскому мусхафу (чтение Хафс от Асыма), изданному Комплексом короля Фахда по изданию Священного Корана. Издатель не несёт ответственности за использование предложенных программ. Эта тетрадь не заменяет учителя.</p>
  <h2>Интеллектуальная собственность</h2>
  <p>Дизайн, код и тексты сайта принадлежат издателю, если не указано иное. Деление на суры и аяты: quran-meta (MIT). Названия сур латиницей: quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 51. Page about, indonésien

*Fichier : `hifz/src/pages/id/about.html`*

```html
<!--meta {"slug": "about", "title": "Tentang {{site_name}}", "description": "Mengapa {{site_name}} dibuat, cara kerja agenda hafalan, dan sumber data mushaf."} -->
<section class="hero"><h1>Tentang {{site_name}}</h1><p>Agenda gratis untuk mendampingi hafalan Al-Qur'an anak di rumah.</p></section>
<article class="prose">
  <h2>Mengapa agenda ini</h2>
  <p>Banyak orang tua ingin anaknya hafal Juz 'Amma, tetapi mengetahui setiap malam apa yang harus dihafal dan dimuraja'ah butuh pengaturan yang tidak semua orang sempat lakukan. Rumah tahfidz memakai cara sederhana: ziyadah (hafalan baru), muraja'ah hafalan yang baru, dan muraja'ah bergiliran untuk hafalan lama. {{site_name}} menerapkan cara itu untuk Anda, sesuai kemampuan anak.</p>
  <h2>Cara program dihitung</h2>
  <ul>
    <li>Agenda mengikuti ayat yang benar-benar disetorkan: yang Anda tandai “Lancar” dianggap hafal; “Ulangi” memunculkan potongan itu lagi di sesi berikutnya.</li>
    <li>Satu potongan tidak pernah menggabungkan dua surah.</li>
    <li>Muraja'ah dekat mencakup potongan dari sesi-sesi terakhir; muraja'ah jauh bergiliran pada surah yang sudah hafal, sesuai urutan mushaf.</li>
    <li>Tanggal yang ditampilkan hanyalah perkiraan yang dihitung ulang setiap hari: sesi yang terlewat tidak pernah berarti “gagal”.</li>
  </ul>
  <h2>Sumber data</h2>
  <ul>
    <li>Mushaf acuan: Mushaf Madinah riwayat Hafs 'an 'Ashim, cetakan <a href="https://qurancomplex.gov.sa/mushaf-printing" rel="noopener">Kompleks Percetakan Al-Qur'an Raja Fahd</a> (604 halaman, 6.236 ayat).</li>
    <li>Pembagian surah, ayat, dan halaman mushaf tersebut: pustaka <em>quran-meta</em> (lisensi MIT).</li>
    <li>Nama surah: <em>quran-json</em> karya Risan Bagja Pradana (CC BY-SA 4.0).</li>
    <li>Tautan “Dengarkan” membuka <a href="https://quran.com" rel="noopener">Quran.com</a>, situs independen.</li>
  </ul>
  <p class="note">{{site_name}} membantu mengatur hafalan; tidak menggantikan guru yang menyimak bacaan anak dan membetulkan tajwidnya.</p>
  <h2>Kontak</h2>
  <p>Ada masukan, ide, atau kendala? Tulis ke {{contact_email}}.</p>
</article>
```

---

## 52. Page privacy, indonésien

*Fichier : `hifz/src/pages/id/privacy.html`*

```html
<!--meta {"slug": "privacy", "title": "Privasi dan cookie — {{site_name}}", "description": "Data apa yang diproses {{site_name}} dan cara menggunakan hak Anda (GDPR)."} -->
<section class="hero"><h1>Privasi dan cookie</h1><p>Rencana dan perkembangan hafalan tetap berada di perangkat Anda.</p></section>
<article class="prose">
  <h2>Pengendali data</h2>
  <p>{{controller}}. Kontak: {{contact_email}}.</p>
  <h2>Rencana dan perkembangan Anda</h2>
  <p>Pengaturan rencana, potongan yang dicentang, dan perkembangan hafalan diproses <strong>hanya di browser Anda</strong>. Semuanya disimpan di alamat halaman dan di penyimpanan lokal browser, dan tidak pernah dikirim ke server kami.</p>
  <h2>Nama anak</h2>
  <p>Nama anak bersifat opsional. Jika diisi, nama hanya tersimpan di perangkat Anda dan tidak disertakan dalam tautan cadangan. Nama hanya muncul di lembar pekanan jika Anda sendiri mencetak atau menyalinnya.</p>
  <h2>Log teknis</h2>
  <p>Penyedia hosting kami ({{host_name}}) menerima data teknis yang diperlukan untuk menampilkan halaman dan melindungi situs (alamat IP, jenis browser, halaman yang diminta, tanggal dan jam) dan menyimpannya untuk jangka waktu terbatas. Dasar hukum: kepentingan yang sah.</p>
  <h2>Iklan dan cookie</h2>
  <p>Situs ini mungkin kelak dibiayai iklan melalui Google AdSense (Google Ireland Limited). Dengan persetujuan Anda, Google dan mitranya dapat menggunakan cookie atau pengenal serupa untuk menampilkan iklan yang dipersonalisasi dan mengukur kinerjanya; tanpa persetujuan, iklan yang tidak dipersonalisasi dapat ditampilkan. Di Wilayah Ekonomi Eropa, Inggris, dan Swiss, sebuah banner persetujuan memungkinkan Anda menerima, menolak, atau mengatur cookie tersebut, dan Anda dapat mengubah pilihan kapan saja. Selengkapnya: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">cara Google menggunakan informasi dari situs mitra</a>.</p>
  <h2>Hak-hak Anda</h2>
  <p>Berdasarkan GDPR, Anda berhak mengakses, memperbaiki, menghapus, membatasi pemrosesan, menolak pemrosesan, dan memindahkan data Anda. Tulis ke {{contact_email}}. Anda juga dapat mengajukan keluhan kepada otoritas perlindungan data (di Prancis: <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>).</p>
  <p><small>Terakhir diperbarui: {{updated}}.</small></p>
</article>
```

---

## 53. Page legal, indonésien

*Fichier : `hifz/src/pages/id/legal.html`*

```html
<!--meta {"slug": "legal", "title": "Informasi hukum — {{site_name}}", "description": "Penerbit, penyedia hosting, dan ketentuan penggunaan {{site_name}}."} -->
<section class="hero"><h1>Informasi hukum</h1></section>
<article class="prose">
  <h2>Penerbit</h2>
  {{editor_block}}
  <h2>Penyedia hosting</h2><p>{{host_name}}<br>{{host_address}}<br>Telepon: {{host_phone}}</p>
  <h2>Ketentuan penggunaan</h2>
  <p>{{site_name}} disediakan secara gratis, apa adanya, untuk membantu mengatur hafalan. Nomor ayat dan halaman mengikuti Mushaf Madinah (riwayat Hafs 'an 'Ashim) cetakan Kompleks Percetakan Al-Qur'an Raja Fahd. Penerbit tidak bertanggung jawab atas penggunaan program yang disajikan. Agenda ini tidak menggantikan guru.</p>
  <h2>Hak kekayaan intelektual</h2>
  <p>Desain, kode, dan teks situs ini milik penerbit, kecuali disebutkan lain. Pembagian surah dan ayat: quran-meta (MIT). Nama surah: quran-json (CC BY-SA 4.0).</p>
</article>
```

---

## 54. Page 404 (anglais)

*Fichier : `hifz/src/pages/en/404.html`*

```html
<!--meta {"title": "Page not found — {{site_name}}", "description": "This page does not exist."} -->
<section class="hero"><h1>This page could not be found</h1><p><a href="/">Back to the memorization planner</a>.</p></section>
```

---

## 55. Gabarit de page (layout.html)

*Fichier : `hifz/src/templates/layout.html`*

```html
<!doctype html>
<html lang="{{lang}}" dir="{{dir}}" data-lang="{{code}}" data-root="{{root_lang}}" data-site="{{site_name}}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{title}}</title>
<meta name="description" content="{{description}}">
<link rel="canonical" href="{{canonical}}">
{{hreflang}}
<meta name="robots" content="{{robots}}">
<meta name="theme-color" content="#f8f5ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c1412" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{{site_name}}">
<meta property="og:title" content="{{title}}">
<meta property="og:description" content="{{description}}">
<meta property="og:url" content="{{canonical}}">
<meta property="og:locale" content="{{og_locale}}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{{favicon}}" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="{{manifest}}">
<meta name="apple-mobile-web-app-title" content="{{site_name}}">
<meta property="og:image" content="{{og_image}}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
{{css_tag}}
<script type="application/ld+json">{{jsonld}}</script>
{{head_extra}}
</head>
<body>
<a class="skip" href="#main">{{t:skip}}</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{{home_url}}">
      <svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#0b5d4b"/><path d="M8 10.5c2.6-.9 5.3-.6 8 1v12c-2.7-1.6-5.4-1.9-8-1z" fill="#f6ead0"/><path d="M24 10.5c-2.6-.9-5.3-.6-8 1v12c2.7-1.6 5.4-1.9 8-1z" fill="#fff"/><circle cx="23" cy="7" r="2.2" fill="#e2b85c"/></svg>
      <span class="brand-text"><span class="brand-name">{{site_name}}</span><span class="brand-tag">{{t:tagline}}</span></span>
    </a>
    {{lang_menu}}
  </div>
</header>
<main id="main" class="wrap">
{{content}}
</main>
<footer class="site-footer">
  <div class="wrap">
    <nav aria-label="{{t:footer}}">{{footer_links}}</nav>
    <p>© {{year}} {{site_name}}{{signature}} — {{t:footer_note}}</p>
  </div>
</footer>
{{lang_script}}
{{scripts}}
</body>
</html>
```

---

## 56. Gabarit du carnet (app.html)

*Fichier : `hifz/src/templates/app.html`*

```html
<div id="hz" class="hz is-loading" data-quran="{{quran_url}}" data-mushaf="{{mushaf_url}}" data-listen="{{listen}}" data-signature="{{signature}}"{{preview_attr}}>
  <div class="hz-import card" hidden></div>
  <nav class="hz-tabs" aria-label="{{t:children_nav}}"></nav>
  <section class="hz-setup card" hidden><p>{{t:loading}}</p></section>
  <div class="hz-main" hidden>
    <section class="hz-today card" aria-live="polite"></section>
    <section class="card"><h2>{{t:progress_title}}</h2><div class="hz-progress"></div></section>
    <section class="card"><h2>{{t:week_title}}</h2><div class="hz-week"></div></section>
    <section class="card"><h2>{{t:miles_title}}</h2><div class="hz-miles"></div></section>
    <section class="card"><h2>{{t:tools_title}}</h2><div class="hz-tools"></div></section>
  </div>
</div>
<div id="hz-print"></div>
```

---

## 57. Réglages (config.json)

*Fichier : `hifz/config.json`*

```json
{
  "site_name": "Our Quran Time",
  "domain": "https://ourqurantime.com",
  "contact_email": "contact@ourqurantime.com",
  "sister_name": "",
  "sister_url": "",
  "support_url": "",
  "editor_name": "TO COMPLETE — your full name or company name",
  "editor_status": "TO COMPLETE — e.g. Entrepreneur individuel (micro-entreprise), SIRET 000 000 000 00000",
  "editor_address": "TO COMPLETE — postal address",
  "editor_phone": "TO COMPLETE — phone number",
  "host_name": "Cloudflare, Inc.",
  "host_address": "101 Townsend St, San Francisco, CA 94107, United States",
  "host_phone": "+1 (650) 319-8930",
  "adsense_client": "",
  "google_site_verification": "",
  "cloudflare_analytics_token": "",
  "last_updated": "2026-11-24",
  "languages": [
    "en",
    "zh",
    "hi",
    "es",
    "ar",
    "fr",
    "bn",
    "pt",
    "ru",
    "id"
  ],
  "surah_pages": false,
  "listen": {},
  "_listen_aide": "Pour remplacer Quran.com par une autre récitation : \"114\": \"https://...\"",
  "signature": "",
  "editor_mode": "particulier",
  "_editor_mode_aide": "« particulier » : publication à titre non professionnel, sans adresse personnelle (LCEN art. 1-1, II) ; « professionnel » : remplir editor_name, editor_status, editor_address, editor_phone (obligatoire dès qu'il y a des revenus).",
  "_languages_aide": "Ordre = ordre du menu Langues. La première langue est servie à la racine (/), les autres sous /code/. Top 10 des langues les plus parlées (Ethnologue 2025)."
}
```

---

## 58. Générateur du site (build.py)

*Fichier : `hifz/build.py`*

```python
#!/usr/bin/env python3
"""Our Quran Time — static site generator (Python 3.9+, no dependency).

    python3 build.py              → dist/ (full multilingual site)
    python3 build.py --standalone → dist-standalone/index.html (one self-contained page, for previews)
"""
import datetime as dt
import hashlib
import html
import json
import math
import re
import shutil
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC, DIST = ROOT / "src", ROOT / "dist"
TOKEN = re.compile(r"\{\{(t:|c:)?(\w+)\}\}")
META = re.compile(r"\A<!--meta\s+(\{.*?\})\s*-->\s*", re.S)
POPULAR = [1, 18, 36, 55, 56, 67, 32, 73, 76, 78, 87, 93, 94, 97, 99, 100, 101, 102, 103, 105, 108, 109, 110, 112, 113, 114, 19, 12, 2, 62]

cfg = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
DOMAIN = cfg["domain"].rstrip("/")
# Langues publiées (la première est servie à la racine, les autres sous /code/).
LANGS = cfg.get("languages") or ["en", "fr"]
SURAH_PAGES = bool(cfg.get("surah_pages"))
I18N = {l: json.loads((SRC / "i18n" / f"{l}.json").read_text(encoding="utf-8")) for l in LANGS}
QURAN = json.loads((SRC / "data" / "quran.json").read_text(encoding="utf-8"))
# Noms des sourates dans l'écriture locale (zh, hi, bn, ru) → champ name_<langue>
for _l, _names in json.loads((SRC / "data" / "surah_names.json").read_text(encoding="utf-8")).items():
    if not _l.startswith("_"):
        assert len(_names) == 114, _l
        for _s, _n in zip(QURAN["surahs"], _names):
            _s["name_" + _l] = _n
GLOBE = '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.8 12h18.4M12 2.8c2.6 2.7 3.9 5.8 3.9 9.2s-1.3 6.5-3.9 9.2c-2.6-2.7-3.9-5.8-3.9-9.2s1.3-6.5 3.9-9.2z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'


def hl(l):
    """Code de langue HTML/hreflang (ex. zh → zh-Hans)."""
    return I18N[l]["meta"].get("html_lang", l)


def check_keys():
    """Chaque langue doit avoir toutes les chaînes de l'anglais (une variante de pluriel suffit)."""
    ref = I18N["en"] if "en" in I18N else I18N[LANGS[0]]
    bad = []
    for l in LANGS:
        for sec in ("meta", "ui", "app", "home", "legal"):
            have = I18N[l].get(sec, {})
            for k in ref.get(sec, {}):
                base = k.rsplit("_", 1)[0] if k.rsplit("_", 1)[-1] in ("zero", "one", "two", "few", "many", "other") else k
                if k not in have and not any(x == base or x.startswith(base + "_") for x in have):
                    bad.append(f"{l}.{sec}.{k}")
    if bad:
        sys.exit("Missing translations: " + ", ".join(bad))


LANG_SCRIPT = """<script>(function(){var d=document,m=d.querySelector('.lang-menu');if(m){d.addEventListener('click',function(e){if(m.open&&!m.contains(e.target))m.open=false});d.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.open){m.open=false;m.querySelector('summary').focus()}});m.querySelectorAll('a[data-l]').forEach(function(a){a.addEventListener('click',function(){try{localStorage.setItem('oqt.lang',a.getAttribute('data-l'))}catch(e){}})})}
var j=d.getElementById('lang-alts');if(!j)return;try{var A=JSON.parse(j.textContent),L=d.documentElement.getAttribute('data-lang');if(localStorage.getItem('oqt.lang.nobanner'))return;var p=localStorage.getItem('oqt.lang'),w=null;
if(p){if(p!==L&&A[p])w=p}else if(L===d.documentElement.getAttribute('data-root')){var n=navigator.languages||[navigator.language||''];for(var i=0;i<n.length;i++){var c=String(n[i]).toLowerCase().split('-')[0];if(A[c]){if(c!==L)w=c;break}}}
if(!w)return;var a=A[w],b=d.createElement('div');b.className='lang-suggest';b.setAttribute('lang',a.h);b.setAttribute('dir',a.d);
b.innerHTML='<div class="wrap"><p><span></span> <a></a></p><button type="button" aria-label="×">×</button></div>';b.querySelector('span').textContent=a.s;var l=b.querySelector('a');l.textContent=a.n;l.href=a.u;
l.addEventListener('click',function(){try{localStorage.setItem('oqt.lang',w)}catch(e){}});b.querySelector('button').addEventListener('click',function(){try{localStorage.setItem('oqt.lang.nobanner','1')}catch(e){}b.remove()});
var h=d.querySelector('.site-header');h.parentNode.insertBefore(b,h.nextSibling)}catch(e){}})();</script>"""


def esc(s):
    return html.escape(str(s), quote=True)


def render(tpl, values, lang, where, c=None):
    t = I18N[lang]["ui"]

    def sub(m):
        kind, key = m.group(1), m.group(2)
        if kind == "t:":
            if key not in t:
                sys.exit(f"[{lang}] missing ui string '{key}' ({where})")
            return t[key]
        if kind == "c:":
            if c is None or key not in c:
                sys.exit(f"[{lang}] missing computed value '{key}' ({where})")
            return str(c[key])
        if key not in values:
            sys.exit(f"unknown token {{{{{key}}}}} in {where}")
        return str(values[key])
    return TOKEN.sub(sub, tpl)


def home_url(lang):
    return "/" if lang == LANGS[0] else f"/{lang}/"


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s.replace("'", "")).strip("-")


def fmt_num(lang, x):
    s = f"{x:.1f}".rstrip("0").rstrip(".")
    return s.replace(".", ",") if lang in ("fr", "id", "tr") else s


def juz_of_page(p):
    j = 1
    for k, start in enumerate(QURAN["juz"]):
        if start[0] <= p:
            j = k + 1
    return j


def fingerprint(src: Path) -> str:
    digest = hashlib.sha256(src.read_bytes()).hexdigest()[:10]
    name = f"{src.stem}.{digest}{src.suffix}"
    shutil.copyfile(src, DIST / "assets" / name)
    return f"/assets/{name}"


def write_quran():
    text = json.dumps(QURAN, ensure_ascii=False, separators=(",", ":"))
    name = f"quran.{hashlib.sha256(text.encode()).hexdigest()[:10]}.json"
    (DIST / "assets" / name).write_text(text, encoding="utf-8")
    return f"/assets/{name}"


# ---------------------------------------------------------------- computed content
def duration_table(lang):
    h = I18N[lang]["home"]
    rows = []
    for label, lines in zip(h["dur_rows"], (5, 7, 10, 15, 30)):
        days = math.ceil(604 * 15 / lines)
        years = days / 6 / 52.18
        rows.append(f"<tr><td>{esc(label)}</td><td>{days}</td><td>{esc(h['dur_years'].format(y=fmt_num(lang, years)))}</td></tr>")
    head = "".join(f"<th>{esc(x)}</th>" for x in h["dur_head"])
    return f"<table><thead><tr>{head}</tr></thead><tbody>{''.join(rows)}</tbody></table>"


def surah_values(n):
    s = QURAN["surahs"][n - 1]
    pages = s["p2"] - s["p1"] + 1
    j1, j2 = juz_of_page(s["p1"]), juz_of_page(s["p2"])
    paces = []
    for pace in (1, 2, 3, 5, 10):
        if pace > s["n"] and pace != 1:
            continue
        d = math.ceil(s["n"] / pace)
        weeks = d / 6
        paces.append(f"<tr><td>{pace} {'ayah' if pace == 1 else 'ayahs'} / day</td><td>{d}</td><td>{'≈ ' + fmt_num('en', weeks) + ' weeks' if d > 6 else 'less than a week'}</td></tr>")
    in30 = math.ceil(s["n"] / 30)
    in7 = math.ceil(s["n"] / 7)
    preset = {"scope": "surah", "sfrom": n, "sto": n, "unit": "ayah" if pages <= 20 else "line", "order": "start",
              "mode": "date" if s["n"] > 15 else "amount", "target": "+30d" if pages <= 3 else ("+90d" if pages <= 20 else "+1y"),
              "amount": 3 if s["n"] <= 15 else 5, "days": "nnnnnnn" if pages <= 3 else "nnnnrnn", "sabqi": 7, "manzil": 20 if pages <= 20 else 5}
    return {
        "name": esc(s["tr_en"]), "ar": esc(s["ar"]), "meaning": esc(s.get("en", "")), "n": n, "ayahs": s["n"],
        "pages": pages, "p1": s["p1"], "p2": s["p2"], "juz": f"{j1}" if j1 == j2 else f"{j1}–{j2}",
        "pace_rows": "".join(paces), "in30": in30, "in7": in7, "preset": esc(json.dumps(preset)),
        "quran_link": f"https://quran.com/{n}",
    }


# ---------------------------------------------------------------- page shell
def page_shell(lang, title, description, path, content, alternates, robots="index, follow", jsonld=None, with_app=False, standalone=False):
    m = I18N[lang]["meta"]
    hreflang = ""
    if alternates and not standalone:
        hreflang = "\n".join(f'<link rel="alternate" hreflang="{hl(l)}" href="{DOMAIN}{p}">' for l, p in alternates.items())
        if LANGS[0] in alternates:
            hreflang += f'\n<link rel="alternate" hreflang="x-default" href="{DOMAIN}{alternates[LANGS[0]]}">'
    items, alts_js = [], {}
    for l in LANGS:
        target = f"{l}.html" if standalone else (alternates or {}).get(l, home_url(l))
        cur = ' aria-current="page"' if l == lang else ""
        nm = esc(I18N[l]["meta"]["lang_name"])
        items.append(f'<li><a href="{target}" hreflang="{hl(l)}" lang="{hl(l)}" dir="{I18N[l]["meta"]["dir"]}" data-l="{l}"{cur}>{nm}</a></li>')
        alts_js[l] = {"n": I18N[l]["meta"]["lang_name"], "s": I18N[l]["meta"]["suggest"], "u": target, "h": hl(l), "d": I18N[l]["meta"]["dir"]}
    ui = I18N[lang]["ui"]
    lang_menu = (f'<details class="lang-menu"><summary aria-label="{esc(ui["language"])}: {esc(I18N[lang]["meta"]["lang_name"])}">{GLOBE}'
                 f'<span>{esc(I18N[lang]["meta"]["lang_name"])}</span></summary><ul role="list">{"".join(items)}</ul></details>')
    lang_script = LANG_SCRIPT if standalone else (
        '<script id="lang-alts" type="application/json">' + json.dumps(alts_js, ensure_ascii=False).replace("</", "<\\/") + "</script>\n" + LANG_SCRIPT)
    prefix = "" if lang == LANGS[0] else f"/{lang}"
    footer = [f'<a href="{home_url(lang)}">{esc(ui["nav_home"])}</a>'] + ([f'<a href="/surah/">{esc(ui["nav_surahs"])}</a>'] if SURAH_PAGES else []) + [
              f'<a href="{prefix}/about/">{esc(ui["nav_about"])}</a>', f'<a href="{prefix}/privacy/">{esc(ui["nav_privacy"])}</a>',
              f'<a href="{prefix}/legal/">{esc(ui["nav_legal"])}</a>']
    if standalone:
        footer = []
    if cfg.get("sister_name") and cfg.get("sister_url"):
        footer.append(f'<a href="{esc(cfg["sister_url"])}" rel="noopener">{esc(cfg["sister_name"])}</a>')
    if cfg.get("support_url"):
        footer.append(f'<a href="{esc(cfg["support_url"])}" rel="noopener">{esc(ui["support"])}</a>')
    scripts = ""
    if with_app:
        blob = json.dumps(I18N[lang]["app"], ensure_ascii=False).replace("</", "<\\/")
        scripts = f'<script id="i18n" type="application/json">{blob}</script>\n'
        if standalone:
            scripts += f'<script id="quran-data" type="application/json">{json.dumps(QURAN, ensure_ascii=False)}</script>\n'
            scripts += "<script>" + (SRC / "assets" / "app.js").read_text(encoding="utf-8") + "</script>"
        else:
            scripts += f'<script src="{ASSETS["js"]}" defer></script>'
    css_tag = (f"<style>{(SRC / 'assets' / 'style.css').read_text(encoding='utf-8')}</style>" if standalone
               else f'<link rel="stylesheet" href="{ASSETS["css"]}">')
    favicon = ("data:image/svg+xml," + (SRC / "assets" / "favicon.svg").read_text(encoding="utf-8").replace("#", "%23").replace('"', "'")
               if standalone else "/favicon.svg")
    values = {
        "lang": hl(lang), "code": lang, "root_lang": LANGS[0], "dir": m["dir"], "lang_menu": lang_menu, "lang_script": lang_script,
        "manifest": home_url(lang) + "manifest.webmanifest", "title": esc(title), "description": esc(description), "canonical": DOMAIN + path,
        "hreflang": hreflang, "robots": robots, "site_name": esc(cfg["site_name"]), "og_locale": m["og_locale"],
        "favicon": favicon, "css_tag": css_tag,
        "og_image": f"{DOMAIN}/og-{lang if (SRC / 'assets' / f'og-{lang}.jpg').exists() else 'en'}.jpg", "jsonld": json.dumps(jsonld or {}, ensure_ascii=False).replace("</", "<\\/"),
        "head_extra": "" if standalone else HEAD_EXTRA, "home_url": home_url(lang),
        "content": content, "footer_links": " ".join(footer), "year": dt.date.today().year, "scripts": scripts,
        "signature": ("" if not cfg.get("signature") else " · " + (f'<a href="{esc(cfg["sister_url"])}" rel="noopener">{esc(cfg["signature"])}</a>' if cfg.get("sister_url") else esc(cfg["signature"]))),
    }
    return render(LAYOUT, values, lang, "layout.html")


def write(path, text):
    dest = DIST / "index.html" if path == "/" else DIST / (path.strip("/") + "/index.html")
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text, encoding="utf-8")


def home_content(lang, standalone=False):
    h = I18N[lang]["home"]
    listen = esc(json.dumps(cfg.get("listen") or {}))
    planner = render(PLANNER, {"quran_url": "" if standalone else ASSETS["quran"], "mushaf_url": "mushaf/" if standalone else "/mushaf/", "listen": listen, "signature": esc(cfg.get("signature", "")),
                               "preview_attr": ' data-preview="1"' if standalone else ""}, lang, "app.html")
    body = h["content"]
    links = ""
    if SURAH_PAGES and lang == "en" and not standalone:
        links = "<h2>" + esc(h["popular_title"]) + '</h2><ul class="links">' + "".join(
            f'<li><a href="/surah/{slugify(QURAN["surahs"][n - 1]["tr_en"])}/">Surah {esc(QURAN["surahs"][n - 1]["tr_en"])}</a></li>' for n in POPULAR) + "</ul>"
    return (f'<section class="hero"><p class="bism" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p><h1>{esc(h["h1"])}</h1><p>{esc(h["lead"])}</p></section>\n'
            f'{planner}\n<article class="prose">{body}{links}</article>')


def main():
    global LAYOUT, PLANNER, ASSETS, HEAD_EXTRA
    LAYOUT = (SRC / "templates" / "layout.html").read_text(encoding="utf-8")
    PLANNER = (SRC / "templates" / "app.html").read_text(encoding="utf-8")
    HEAD_EXTRA = ""
    if cfg.get("google_site_verification"):
        HEAD_EXTRA += f'<meta name="google-site-verification" content="{esc(cfg["google_site_verification"])}">\n'
    if cfg.get("adsense_client"):
        cl = esc(cfg["adsense_client"])
        HEAD_EXTRA += f'<meta name="google-adsense-account" content="{cl}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={cl}" crossorigin="anonymous"></script>\n'
    if cfg.get("cloudflare_analytics_token"):
        HEAD_EXTRA += f"<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{json.dumps({'token': cfg['cloudflare_analytics_token']})}'></script>\n"

    check_keys()
    if "--standalone" in sys.argv:
        out = ROOT / "dist-standalone"
        out.mkdir(exist_ok=True)
        L0 = LANGS[0]
        ASSETS = {}
        for l in LANGS:
            h = I18N[l]["home"]
            pg = page_shell(l, cfg["site_name"], h["description"], home_url(l), home_content(l, standalone=True), None, with_app=True, standalone=True)
            pg = pg.replace(f'href="{home_url(l)}"', f'href="{l}.html"')
            # l'aperçu autonome n'a ni manifeste, ni icônes, ni image d'aperçu à côté de lui
            pg = re.sub(r'\n<link rel="(apple-touch-icon|manifest)"[^>]*>|\n<meta property="og:image[^>]*>', "", pg)
            (out / f"{l}.html").write_text(pg, encoding="utf-8")
            if l == L0:
                page = pg
        (out / "index.html").write_text(page, encoding="utf-8")
        # Artifact preview: the host adds doctype/html/head/body itself
        head = re.search(r"<head>(.*?)</head>", page, re.S).group(1)
        body = re.search(r"<body>(.*?)</body>", page, re.S).group(1)
        head = re.sub(r'<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*', "", head)
        boot = ("<script>document.documentElement.lang=" + json.dumps(hl(L0)) + ";document.documentElement.dataset.lang=" + json.dumps(L0) + ";document.documentElement.dir=" + json.dumps(I18N[L0]["meta"]["dir"])
                + ";document.documentElement.dataset.site=" + json.dumps(cfg["site_name"]) + ";</script>")
        (out / "preview.html").write_text(head.strip() + "\n" + boot + "\n" + body.strip() + "\n", encoding="utf-8")
        print(f"✅ standalone pages → dist-standalone/ ({len(LANGS)} languages, {len(page) // 1024} KB each)")
        return

    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "assets").mkdir(parents=True)
    ASSETS = {"css": fingerprint(SRC / "assets" / "style.css"), "js": fingerprint(SRC / "assets" / "app.js"),
              "quran": write_quran()}
    shutil.copyfile(SRC / "assets" / "favicon.svg", DIST / "favicon.svg")
    for extra in ["icon-192.png", "icon-512.png", "apple-touch-icon.png"] + [f"og-{l}.jpg" for l in LANGS]:
        if (SRC / "assets" / extra).exists():
            shutil.copyfile(SRC / "assets" / extra, DIST / extra)
    # Pages officielles du Mushaf de Médine (Complexe du Roi Fahd), converties par tools/render_mushaf.py
    mushaf = sorted((SRC / "mushaf").glob("*.webp"))
    if len(mushaf) != 604:
        sys.exit(f"src/mushaf: {len(mushaf)} pages au lieu de 604")
    (DIST / "mushaf").mkdir()
    for f in mushaf:
        shutil.copyfile(f, DIST / "mushaf" / f.name)
    for l in LANGS:  # un manifeste par langue : l'icône d'écran d'accueil rouvre la bonne langue
        dest = DIST / home_url(l).strip("/") / "manifest.webmanifest"
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(json.dumps({
            "name": cfg["site_name"], "short_name": cfg["site_name"], "lang": hl(l), "dir": I18N[l]["meta"]["dir"],
            "description": I18N[l]["home"]["description"], "start_url": home_url(l), "scope": "/", "display": "standalone",
            "background_color": "#f8f5ee", "theme_color": "#0b5d4b",
            "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
                      {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
                      {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]},
            ensure_ascii=False, indent=1), encoding="utf-8")
    sitemap = []
    home_alts = {l: home_url(l) for l in LANGS}

    for lang in LANGS:
        h = I18N[lang]["home"]
        jsonld = {"@context": "https://schema.org", "@type": "WebApplication", "name": cfg["site_name"], "url": DOMAIN + home_url(lang),
                  "description": h["description"], "inLanguage": hl(lang), "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Any (web browser)", "isAccessibleForFree": True, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}}
        write(home_url(lang), page_shell(lang, h["title"], h["description"], home_url(lang), home_content(lang), home_alts, jsonld=jsonld, with_app=True))
        sitemap.append(home_url(lang))

    # Surah plans (English) — en pause tant que SURAH_PAGES est faux
    tpl = (SRC / "templates" / "surah.html").read_text(encoding="utf-8")
    for n in (POPULAR if SURAH_PAGES else []):
        c = surah_values(n)
        c["planner"] = render(PLANNER, {"quran_url": ASSETS["quran"], "preset_attr": f" data-plan=\"{c['preset']}\""}, "en", "planner.html")
        c["others"] = "".join(f'<li><a href="/surah/{slugify(QURAN["surahs"][o - 1]["tr_en"])}/">Surah {esc(QURAN["surahs"][o - 1]["tr_en"])}</a></li>' for o in POPULAR if o != n)
        path = f"/surah/{slugify(QURAN['surahs'][n - 1]['tr_en'])}/"
        title = f"How to memorize Surah {QURAN['surahs'][n - 1]['tr_en']}: free daily plan ({c['ayahs']} ayahs)"
        desc = (f"Memorize Surah {QURAN['surahs'][n - 1]['tr_en']} ({c['ayahs']} ayahs, {c['pages']} page{'s' if c['pages'] > 1 else ''}) "
                f"with a personal day-by-day plan: new lesson, recent revision and old revision. Free, no sign-up.")
        jsonld = {"@context": "https://schema.org", "@type": "WebPage", "name": title, "url": DOMAIN + path, "inLanguage": "en"}
        write(path, page_shell("en", title, desc, path, render(tpl, {}, "en", "surah.html", c), {"en": path}, jsonld=jsonld, with_app=True))
        sitemap.append(path)

    # Index of all surahs
    rows = []
    if not SURAH_PAGES:
        QURAN_LIST = []
    else:
        QURAN_LIST = QURAN["surahs"]
    for i, s in enumerate(QURAN_LIST, start=1):
        slug = slugify(s["tr_en"])
        link = f'/surah/{slug}/' if i in POPULAR else "/#p=" + esc(json.dumps({"scope": "surah", "sfrom": i, "sto": i, "unit": "ayah", "order": "start"}).replace(" ", ""))
        rows.append(f'<tr><td>{i}</td><td><a href="{link}">{esc(s["tr_en"])}</a></td><td lang="ar" dir="rtl">{esc(s["ar"])}</td><td>{s["n"]}</td><td>{s["p1"]}</td><td>{juz_of_page(s["p1"])}</td></tr>')
    idx = (f'<section class="hero"><h1>Memorization plans for all 114 surahs</h1><p>Pick a surah to get a ready-made, day-by-day memorization plan with revision built in.</p></section>'
           f'<article class="prose"><table><thead><tr><th>#</th><th>Surah</th><th>Arabic</th><th>Ayahs</th><th>Page</th><th>Juz</th></tr></thead><tbody>{"".join(rows)}</tbody></table></article>')
    if SURAH_PAGES:
        write("/surah/", page_shell("en", "Quran memorization plans for every surah — " + cfg["site_name"],
                                    "List of the 114 surahs with ayah count, page and juz, each with a free personal memorization plan.", "/surah/", idx, {"en": "/surah/"}))
        sitemap.append("/surah/")

    # Static pages
    todo = [k for k, v in cfg.items() if isinstance(v, str) and "TO COMPLETE" in v]
    cfg_vals = {k: (f'<mark class="todo">{esc(v)}</mark>' if "TO COMPLETE" in v else esc(v)) for k, v in cfg.items() if isinstance(v, str)}
    mail = esc(cfg["contact_email"])
    private = cfg.get("editor_mode", "particulier") == "particulier"
    if private:
        todo = [k for k in todo if not k.startswith("editor_")]

    def legal_vals(lang):
        g = I18N[lang]["legal"]
        v = dict(cfg_vals)
        mt = I18N[lang]["meta"]
        y, mo, d = (int(x) for x in cfg["last_updated"].split("-"))
        v["updated"] = mt["date_fmt"].format(y=y, mo=mo, d=d, m=mt["months"][mo - 1])
        if mt.get("digits"):
            v["updated"] = v["updated"].translate(str.maketrans("0123456789", mt["digits"]))
        if private:
            v["editor_block"] = "<p>" + g["private"].replace("{mail}", mail) + "</p>"
            v["controller"] = g["controller"]
        else:
            v["editor_block"] = (f"<p>{v['editor_name']}<br>{v['editor_status']}<br>{v['editor_address']}<br>{g['phone']} {v['editor_phone']}<br>{g['email']} {mail}</p>"
                                 f"<h2>{g['director']}</h2><p>{v['editor_name']}</p>")
            v["controller"] = f"{v['editor_name']}, {v['editor_address']}"
        return v
    for lang_dir in sorted((SRC / "pages").iterdir()):
        lang = lang_dir.name
        if lang not in LANGS:
            continue
        for f in sorted(lang_dir.glob("*.html")):
            text = f.read_text(encoding="utf-8")
            mm = META.match(text)
            meta = json.loads(mm.group(1))
            vals = legal_vals(lang)
            body = TOKEN.sub(lambda m: vals.get(m.group(2), m.group(0)), text[mm.end():])
            slug = meta.get("slug")
            path = (home_url(lang) + slug + "/") if slug else "/404.html"
            alts = {l: home_url(l) + slug + "/" for l in LANGS if (SRC / "pages" / l / f.name).exists()} if slug else None
            out = page_shell(lang, meta["title"].replace("{{site_name}}", cfg["site_name"]), meta["description"].replace("{{site_name}}", cfg["site_name"]),
                             path, body, alts, robots="index, follow" if slug else "noindex, follow")
            if slug:
                write(path, out)
                sitemap.append(path)
            else:
                (DIST / "404.html").write_text(out, encoding="utf-8")

    today = dt.date.today().isoformat()
    (DIST / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                                      + "".join(f"<url><loc>{DOMAIN}{p}</loc><lastmod>{today}</lastmod></url>" for p in sitemap) + "</urlset>\n", encoding="utf-8")
    (DIST / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n", encoding="utf-8")
    if cfg.get("adsense_client"):
        (DIST / "ads.txt").write_text(f"google.com, {cfg['adsense_client'].replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n", encoding="utf-8")
    (DIST / "_headers").write_text("/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/mushaf/*\n  Cache-Control: public, max-age=31536000\n\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()\n", encoding="utf-8")
    if todo:
        print("⚠️  Fields to complete in config.json before going live:", ", ".join(todo))
    print(f"✅ {len(sitemap)} indexable pages in {len(LANGS)} languages + 604 mushaf pages → dist/")
    if "--zip" in sys.argv:  # fichier à téléverser sur Cloudflare Pages
        import zipfile
        out = ROOT / "publication" / "ourqurantime-site.zip"
        out.parent.mkdir(exist_ok=True)
        files = sorted(x for x in DIST.rglob("*") if x.is_file())
        with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
            for x in files:
                z.write(x, x.relative_to(DIST).as_posix(), compress_type=zipfile.ZIP_STORED if x.suffix in (".webp", ".jpg", ".png") else zipfile.ZIP_DEFLATED)
        print(f"📦 {out.relative_to(ROOT)} ({len(files)} files, {out.stat().st_size // 2**20} MB)")


if __name__ == "__main__":
    main()
```

---

## 59. Le carnet (app.js)

*Fichier : `hifz/src/assets/app.js`*

```javascript
/* Our Quran Time — carnet de mémorisation du Coran pour les familles.
   Le plan suit ce que l'enfant a réellement récité (versets acquis), pas le calendrier.
   Les dates ne sont que des projections recalculées chaque jour.
   Tout reste dans le navigateur : pas de compte, pas de serveur. */
(function () {
  'use strict';
  const I = JSON.parse(document.getElementById('i18n').textContent);
  const LANG = document.documentElement.dataset.lang || document.documentElement.lang || 'en';
  const LOC = { ar: 'ar-u-nu-latn', zh: 'zh-Hans' }[LANG] || LANG;
  const PR = new Intl.PluralRules(LOC);
  const SITE = document.documentElement.dataset.site || 'Our Quran Time';
  const SIGN = (document.getElementById('hz') || { dataset: {} }).dataset.signature || '';
  // Traductions : pluriels selon la langue (clé_one, clé_few, clé_many…), nombres écrits avec les chiffres de la langue.
  const T = (k, v) => {
    if (v && typeof v.n === 'number') { const r = PR.select(v.n); if (I[k + '_' + r] != null) k += '_' + r; else if (I[k + '_other'] != null) k += '_other'; }
    let s = I[k] != null ? I[k] : k;
    if (v) for (const a in v) s = s.split('{' + a + '}').join(typeof v[a] === 'number' ? nf.format(v[a]) : v[a]);
    return s;
  };
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nf = new Intl.NumberFormat(LOC);
  const DAY = 864e5;

  const app = $('#hz');
  if (!app) return;
  const PREVIEW = app.dataset.preview === '1';       // aperçu intégré : pas de téléchargement ni d'impression
  const LISTEN = (() => { try { return JSON.parse(app.dataset.listen || '{}'); } catch (e) { return {}; } })();
  const LS_KEY = 'hifz-planner.v1'; // clé neutre : ne dépend pas du nom de marque
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
  let Q = null, SS = [], PG = [];
  async function loadQuran() {
    const inline = document.getElementById('quran-data');
    Q = inline ? JSON.parse(inline.textContent) : await (await fetch(app.dataset.quran)).json();
    let g = 0; SS = [0];
    Q.surahs.forEach((s, i) => { SS[i + 1] = g; g += s.n; });
    SS.push(g);
    PG = Q.pages.map((x) => SS[x[0]] + x[1] - 1);
  }
  const gOf = (s, a) => SS[s] + a - 1;
  function surahOf(g) { let lo = 1, hi = 114; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (SS[m] <= g) lo = m; else hi = m - 1; } return lo; }
  const sName = (s) => { const x = Q.surahs[s - 1]; return x['name_' + LANG] || (LANG === 'ar' ? x.ar : x.tr_en); };
  // Page du Mushaf de Médine (604 pages) qui contient le verset global g
  function pageOf(g) { let lo = 0, hi = PG.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (PG[m] <= g) lo = m; else hi = m - 1; } return lo + 1; }
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
    const pg = pageOf(Math.min(...ayahs));
    return `<div class="hz-block b-${kind}">
      <div class="hz-block-head"><span class="hz-tag">${esc(title)}</span><span class="hz-links"><button type="button" class="hz-mushaf" data-page="${pg}">📖 ${esc(T('mushaf_btn', { p: pg }))}</button>${link ? `<a class="hz-listen" href="${esc(link)}" target="_blank" rel="noopener">${esc(T('listen'))}</a>` : ''}</span></div>
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
      <p class="hz-sign">${esc(T('sheet_teacher_note'))} ______________________________________________</p><p class="hz-small">${esc(SITE)}${SIGN ? ' · ' + esc(SIGN) : ''}</p>`;
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
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//OurQuranTime//' + LANG.toUpperCase(), 'BEGIN:VEVENT', `UID:${c.id}-${d8}@ourqurantime`,
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
    const fit = (txt, w, size, y) => { let z = size; do { x.font = `${w} ${z}px system-ui, -apple-system, "Segoe UI", sans-serif`; z -= 4; } while (x.measureText(txt).width > 960 && z > 36); x.fillText(txt, 540, y); };
    x.fillStyle = '#fff'; fit(T('card_head'), 700, 60, 520);
    x.fillStyle = '#d6b25e';
    if (LANG === 'ar') { x.font = '700 110px "Noto Naskh Arabic", "Geeza Pro", serif'; x.fillText('سورة ' + Q.surahs[su - 1].ar, 540, 740); }
    else { fit(sName(su), 800, 100, 680); x.font = '700 80px "Noto Naskh Arabic", "Geeza Pro", serif'; x.fillText(Q.surahs[su - 1].ar, 540, 820); }
    x.fillStyle = '#fff'; x.font = '700 44px system-ui, sans-serif'; x.fillText(SITE, 540, 1220);
    if (SIGN) { x.fillStyle = 'rgba(255,255,255,.75)'; x.font = '500 32px system-ui, sans-serif'; x.fillText(SIGN, 540, 1272); }
    const blob = await new Promise((r) => cv.toBlob(r, 'image/png'));
    const file = new File([blob], 'surah-' + su + '.png', { type: 'image/png' });
    if (!PREVIEW && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], text: T('card_text', { s: sName(su) }) }); return; } catch (e) { /* annulé */ } }
    const ov = document.createElement('div'); ov.className = 'hz-overlay';
    ov.innerHTML = `<figure><img alt="" src="${URL.createObjectURL(blob)}"><figcaption>${esc(T('card_save'))}</figcaption>${btn('close', T('close'), 'primary')}</figure>`;
    ov.addEventListener('click', (ev) => { if (ev.target === ov || ev.target.closest('[data-act="close"]')) document.body.removeChild(ov); });
    document.body.appendChild(ov);
  }

  /* ---------------- Mushaf de Médine (pages officielles du Complexe du Roi Fahd) ---------------- */
  const MUSHAF = app.dataset.mushaf || '/mushaf/';
  const pad3 = (n) => String(n).padStart(3, '0');
  function openMushaf(page, opener) {
    let p = page;
    const ov = document.createElement('div');
    ov.className = 'hz-overlay hz-mushaf-view'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.innerHTML = `<figure>
      <div class="hz-mv-bar"><b class="hz-mv-title"></b>${btn('close', T('close'), 'small')}</div>
      <div class="hz-mv-page" dir="rtl"><img alt="" decoding="async"><p class="hz-mv-err" hidden></p></div>
      <div class="hz-mv-nav" dir="ltr"><button type="button" class="hz-btn small" data-go="1"></button><button type="button" class="hz-btn small" data-go="-1"></button></div>
      <figcaption>${esc(T('mushaf_credit'))}</figcaption></figure>`;
    const img = $('img', ov), err = $('.hz-mv-err', ov), title = $('.hz-mv-title', ov);
    const show = () => {
      title.textContent = T('mushaf_title', { p });
      ov.setAttribute('aria-label', title.textContent);
      err.hidden = true; img.hidden = false;
      img.src = MUSHAF + pad3(p) + '.webp'; img.alt = title.textContent;
      const [nx, pv] = $$('[data-go]', ov);
      nx.disabled = p >= 604; pv.disabled = p <= 1;
      nx.textContent = '‹ ' + nf.format(Math.min(604, p + 1)); nx.setAttribute('aria-label', T('mushaf_next'));
      pv.textContent = nf.format(Math.max(1, p - 1)) + ' ›'; pv.setAttribute('aria-label', T('mushaf_prev'));
      [p + 1, p - 1].forEach((q) => { if (q >= 1 && q <= 604) { const im = new Image(); im.src = MUSHAF + pad3(q) + '.webp'; } });
    };
    img.addEventListener('error', () => { img.hidden = true; err.hidden = false; err.textContent = T(PREVIEW ? 'mushaf_preview_only' : 'mushaf_error'); });
    const go = (d) => { const q = p + d; if (q >= 1 && q <= 604) { p = q; show(); } };
    const close = () => { document.removeEventListener('keydown', onKey); if (ov.parentNode) ov.parentNode.removeChild(ov); if (opener) opener.focus(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') go(1); else if (e.key === 'ArrowRight') go(-1); };
    ov.addEventListener('click', (e) => {
      const g = e.target.closest('[data-go]');
      if (g) { go(+g.dataset.go); return; }
      if (e.target === ov || e.target.closest('[data-act="close"]')) close();
    });
    // Comme dans un mushaf : la page suivante est à gauche ; glisser vers la droite pour avancer.
    let x0 = null;
    ov.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    ov.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(ov);
    show();
    $('[data-act="close"]', ov).focus();
  }

  /* ---------------- Événements ---------------- */
  app.addEventListener('click', (ev) => {
    const tab = ev.target.closest('[data-child]');
    if (tab) { S.cur = tab.dataset.child; app.dataset.editing = ''; app.dataset.extra = ''; save(); render(); return; }
    const mp = ev.target.closest('[data-page]');
    if (mp) { openMushaf(+mp.dataset.page, mp); return; }
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
  }).catch((err) => { app.textContent = '⚠️ ' + err.message; });
})();
```

---

## 60. Styles (style.css)

*Fichier : `hifz/src/assets/style.css`*

```css
/* Hifzly — emerald & gold, light/dark, LTR/RTL, print-ready. System fonts only. */
:root {
  --bg: #f8f5ee;
  --surface: #ffffff;
  --surface-2: #f1ece0;
  --text: #17211d;
  --muted: #5d6a63;
  --line: #e3dccb;
  --brand: #0b5d4b;
  --brand-ink: #ffffff;
  --brand-soft: #dcefe8;
  --gold: #b8892b;
  --gold-soft: #f6ead0;
  --sabaq: #0b5d4b;   --sabaq-bg: #dcefe8;
  --sabqi: #8a5a00;   --sabqi-bg: #f8ebcf;
  --manzil: #3d4f8f;  --manzil-bg: #e3e7f6;
  --warn-bg: #fff1d6; --warn-ink: #6b4300;
  --focus: #2563eb;
  --radius: 16px;
  --shadow: 0 1px 2px rgba(23, 33, 29, .06), 0 10px 30px rgba(23, 33, 29, .07);
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0c1412; --surface: #13201c; --surface-2: #1a2a25; --text: #e8efe9; --muted: #9db0a7; --line: #26382f;
    --brand: #4fd1a5; --brand-ink: #062019; --brand-soft: #173b30; --gold: #e2b85c; --gold-soft: #3a2f16;
    --sabaq: #7fe0bd; --sabaq-bg: #173b30; --sabqi: #f1c46b; --sabqi-bg: #3a2f16; --manzil: #a9b8f0; --manzil-bg: #222c4d;
    --warn-bg: #3a2f16; --warn-ink: #f6dca2; --focus: #93b4ff; --shadow: 0 1px 2px rgba(0, 0, 0, .4), 0 10px 30px rgba(0, 0, 0, .35);
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #0c1412; --surface: #13201c; --surface-2: #1a2a25; --text: #e8efe9; --muted: #9db0a7; --line: #26382f;
  --brand: #4fd1a5; --brand-ink: #062019; --brand-soft: #173b30; --gold: #e2b85c; --gold-soft: #3a2f16;
  --sabaq: #7fe0bd; --sabaq-bg: #173b30; --sabqi: #f1c46b; --sabqi-bg: #3a2f16; --manzil: #a9b8f0; --manzil-bg: #222c4d;
  --warn-bg: #3a2f16; --warn-ink: #f6dca2; --focus: #93b4ff;
  color-scheme: dark;
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.6 system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial, sans-serif; -webkit-font-smoothing: antialiased; }
[dir="rtl"] body { font-family: system-ui, "Segoe UI", "Noto Naskh Arabic", "Noto Sans Arabic", Tahoma, "Geeza Pro", Arial, sans-serif; font-size: 17px; }
a { color: var(--brand); text-underline-offset: .15em; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; border-radius: 6px; }
.wrap { max-width: 1120px; margin: 0 auto; padding: 0 16px; }
.skip { position: absolute; inset-inline-start: -999px; top: 8px; background: var(--surface); padding: 8px 12px; z-index: 20; }
.skip:focus { inset-inline-start: 8px; }

/* Header */
.site-header { background: var(--surface); border-bottom: 1px solid var(--line); }
.site-header .wrap { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 60px; flex-wrap: wrap; }
.brand { display: flex; align-items: center; gap: 10px; color: var(--text); text-decoration: none; font-weight: 800; font-size: 1.15rem; }
.brand svg { width: 32px; height: 32px; flex: none; }
/* Menu des langues */
.site-header .wrap { position: relative; flex-wrap: nowrap; }
.brand { min-width: 0; }
.lang-menu { position: static; flex: none; }
.lang-menu summary { display: flex; align-items: center; gap: 6px; list-style: none; cursor: pointer; padding: 7px 12px; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--text); font-size: .9rem; font-weight: 700; min-height: 40px; box-sizing: border-box; }
.lang-menu summary::-webkit-details-marker { display: none; }
.lang-menu summary::after { content: ""; width: 7px; height: 7px; border: solid currentColor; border-width: 0 2px 2px 0; transform: translateY(-2px) rotate(45deg); margin-inline-start: 2px; opacity: .6; }
.lang-menu[open] summary { border-color: var(--brand); color: var(--brand); }
.lang-menu summary:focus-visible { outline: 3px solid var(--brand); outline-offset: 2px; }
.lang-menu svg { color: var(--brand); }
.lang-menu ul { position: absolute; inset-inline-end: 16px; top: calc(100% - 2px); z-index: 40; margin: 0; padding: 6px; list-style: none; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; box-shadow: 0 12px 32px rgba(0, 0, 0, .16); display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; width: min(360px, calc(100vw - 32px)); box-sizing: border-box; }
.lang-menu li { margin: 0; }
.lang-menu a { display: block; padding: 10px 12px; border-radius: 10px; color: var(--text); text-decoration: none; font-weight: 600; text-align: start; }
.lang-menu a:hover, .lang-menu a:focus-visible { background: var(--surface-2); }
.lang-menu a[aria-current="page"] { background: var(--brand-soft); color: var(--brand); }
.lang-suggest { background: var(--brand-soft); border-bottom: 1px solid var(--line); font-size: .92rem; }
.lang-suggest .wrap { display: flex; align-items: center; gap: 10px; padding-block: 6px; }
.lang-suggest p { margin: 0; flex: 1; min-width: 0; }
.lang-suggest a { font-weight: 800; }
.lang-suggest button { flex: none; border: 0; background: none; font-size: 1.3rem; line-height: 1; color: var(--muted); cursor: pointer; padding: 4px 8px; }
@media (max-width: 480px) { .lang-menu summary span { display: none; } .lang-menu summary { padding: 8px 10px; } }
/* Écritures : polices et interlignes adaptés */
:lang(hi) body, body:lang(hi) { font-family: system-ui, -apple-system, "Segoe UI", "Noto Sans Devanagari", "Nirmala UI", "Kohinoor Devanagari", sans-serif; line-height: 1.75; }
:lang(bn) body, body:lang(bn) { font-family: system-ui, -apple-system, "Segoe UI", "Noto Sans Bengali", "Nirmala UI", "Kohinoor Bangla", sans-serif; line-height: 1.75; }
:lang(zh) body, body:lang(zh) { font-family: system-ui, -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", "Noto Sans SC", sans-serif; line-height: 1.75; }
html:lang(zh) em, html:lang(zh) i { font-style: normal; }
html:lang(zh) .brand-tag, html:lang(hi) .brand-tag, html:lang(bn) .brand-tag { letter-spacing: 0; }

/* Hero */
.hero { padding: 30px 0 4px; }
.hero h1 { font-size: clamp(1.8rem, 4.8vw, 2.8rem); line-height: 1.12; letter-spacing: -.02em; margin: 0 0 10px; max-width: 22ch; }
.hero p { margin: 0; color: var(--muted); font-size: 1.08rem; max-width: 64ch; }
.hero .bism { color: var(--gold); font-size: 1.4rem; margin-bottom: 6px; font-family: "Noto Naskh Arabic", "Amiri", "Geeza Pro", serif; }

/* Presets */
.hz-presets { margin: 22px 0 10px; }
.hz-presets h2 { font-size: 1.05rem; margin: 0 0 10px; }
.hz-preset-grid { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.hz-preset { all: unset; box-sizing: border-box; cursor: pointer; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; box-shadow: var(--shadow); border-top: 4px solid var(--gold); }
.hz-preset:hover, .hz-preset:focus-visible { border-color: var(--brand); }
.hz-preset b { display: block; color: var(--brand); }
.hz-preset span { display: block; color: var(--muted); font-size: .9rem; line-height: 1.4; margin-top: 2px; }

/* Layout */
.hz-grid { display: grid; gap: 16px; margin: 16px 0; grid-template-columns: minmax(0, 1fr); }
@media (min-width: 980px) { .hz-grid { grid-template-columns: 360px minmax(0, 1fr); align-items: start; } .hz-form { position: sticky; top: 12px; } }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px; min-width: 0; }
.card h2 { font-size: 1.05rem; margin: 0 0 10px; }
.hz-results { display: grid; gap: 16px; min-width: 0; }
.hz.is-loading .hz-results { opacity: .5; }

/* Form */
.fld { display: block; margin: 0 0 12px; border: 0; padding: 0; min-width: 0; }
.fld > span, .fld > legend { display: block; font-weight: 700; font-size: .9rem; margin-bottom: 5px; padding: 0; }
.fld small { display: block; color: var(--muted); font-size: .82rem; margin-top: 4px; line-height: 1.4; }
.fld select, .fld input { width: 100%; font: inherit; color: var(--text); background: var(--bg); border: 1.5px solid var(--line); border-radius: 10px; padding: 9px 10px; min-width: 0; }
.fld select:focus, .fld input:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px var(--brand-soft); }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hz-days { display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 6px; }
.hz-dayctl { display: grid; gap: 2px; font-size: .8rem; font-weight: 700; }
.hz-dayctl select { font: inherit; font-size: .8rem; font-weight: 500; padding: 5px; border-radius: 8px; border: 1px solid var(--line); background: var(--bg); color: var(--text); }
.hz-adv { border-top: 1px dashed var(--line); padding-top: 10px; margin: 4px 0 12px; }
.hz-adv summary { cursor: pointer; font-weight: 700; color: var(--muted); margin-bottom: 10px; }
.hz-known { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; }
.hz-known label { position: relative; }
.hz-known input { position: absolute; opacity: 0; inset: 0; }
.hz-known span { display: grid; place-items: center; height: 30px; border-radius: 7px; border: 1px solid var(--line); font-size: .8rem; font-weight: 700; background: var(--bg); cursor: pointer; }
.hz-known input:checked + span { background: var(--brand); color: var(--brand-ink); border-color: var(--brand); }
.hz-known input:focus-visible + span { outline: 3px solid var(--focus); }

/* Buttons */
.hz-btn { font: inherit; font-weight: 700; font-size: .92rem; border-radius: 10px; padding: 9px 14px; border: 1.5px solid var(--line); background: var(--surface); color: var(--text); cursor: pointer; }
.hz-btn:hover { border-color: var(--muted); }
.hz-btn.primary { background: var(--brand); border-color: var(--brand); color: var(--brand-ink); }
form .hz-btn.primary { width: 100%; padding: 12px; font-size: 1rem; }
.hz-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.hz-link { all: unset; cursor: pointer; color: var(--brand); font-weight: 700; font-size: .85rem; }
.hz-link:hover { text-decoration: underline; }

/* Summary */
.hz-tiles { list-style: none; padding: 0; margin: 0 0 10px; display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
.hz-tiles li { background: var(--surface-2); border-radius: 12px; padding: 10px 12px; }
.hz-tiles b { display: block; font-size: 1.2rem; line-height: 1.25; }
.hz-tiles span { color: var(--muted); font-size: .82rem; font-weight: 600; }
.hz-summary p { margin: 6px 0 0; }
.hz-warn { background: var(--warn-bg); color: var(--warn-ink); border-radius: 10px; padding: 8px 12px; font-size: .92rem; }
.hz-muted { color: var(--muted); }

/* Day parts */
.hz-part { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; padding: 6px 0; border-bottom: 1px dashed var(--line); }
.hz-part:last-child { border-bottom: 0; }
.hz-tag { font-size: .74rem; font-weight: 800; letter-spacing: .02em; padding: 2px 9px; border-radius: 999px; min-width: 64px; text-align: center; }
.p-sabaq .hz-tag { background: var(--sabaq-bg); color: var(--sabaq); }
.p-sabqi .hz-tag { background: var(--sabqi-bg); color: var(--sabqi); }
.p-manzil .hz-tag { background: var(--manzil-bg); color: var(--manzil); }
.hz-txt { flex: 1; min-width: 160px; }
.hz-read { font-size: .85rem; font-weight: 700; white-space: nowrap; }
.hz-today-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
.hz-today-head h3 { margin: 0; font-size: 1.15rem; }
.hz-check { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; cursor: pointer; background: var(--brand-soft); color: var(--brand); padding: 6px 12px; border-radius: 999px; }
.hz-check input, .hz-date input { width: 18px; height: 18px; accent-color: var(--brand); }

/* Schedule list */
.hz-days-list { list-style: none; padding: 0; margin: 0 0 12px; display: grid; gap: 6px; }
.hz-day { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 10px; padding: 8px 10px; border: 1px solid var(--line); border-radius: 12px; background: var(--bg); }
.hz-day.is-today { border-color: var(--brand); box-shadow: 0 0 0 2px var(--brand-soft); }
.hz-day.is-done { opacity: .6; }
.hz-day.is-review { background: var(--surface-2); }
.hz-date { display: flex; align-items: flex-start; gap: 8px; font-weight: 700; font-size: .88rem; cursor: pointer; padding-top: 6px; }
.hz-parts .hz-part { padding: 3px 0; font-size: .92rem; }
@media (max-width: 560px) { .hz-day { grid-template-columns: 1fr; gap: 2px; } .hz-date { padding-top: 0; } }

/* Progress & milestones */
.hz-bar { height: 12px; background: var(--surface-2); border-radius: 999px; overflow: hidden; }
.hz-bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--brand), var(--gold)); border-radius: 999px; }
.hz-progress p { margin: 8px 0 0; color: var(--muted); font-weight: 600; }
.hz-miles-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); }
.hz-miles-list li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 2px 10px; padding: 8px 10px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); }
.hz-miles-list time { grid-column: 2; color: var(--muted); font-size: .85rem; }
.hz-miles-list .hz-link { grid-row: 1 / 3; grid-column: 3; }
.hz-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--gold); grid-row: 1 / 3; }
.is-reached .hz-dot { background: var(--gold); }

/* Share-card overlay */
.hz-overlay { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; background: rgba(6, 20, 16, .72); padding: 16px; }
.hz-overlay figure { margin: 0; display: grid; gap: 10px; justify-items: center; max-width: 420px; }
.hz-overlay img { width: 100%; max-height: 72vh; object-fit: contain; border-radius: 14px; box-shadow: var(--shadow); }
.hz-overlay figcaption { color: #fff; text-align: center; font-size: .92rem; }

/* Content */
.prose { margin: 34px 0; }
.prose h2 { font-size: 1.45rem; line-height: 1.25; margin: 34px 0 10px; }
.prose h3 { font-size: 1.1rem; margin: 22px 0 6px; }
.prose p, .prose li { max-width: 72ch; }
.prose table { border-collapse: collapse; width: 100%; font-size: .95rem; margin: 10px 0; display: block; overflow-x: auto; }
.prose th, .prose td { border: 1px solid var(--line); padding: 7px 10px; text-align: start; }
.prose th { background: var(--surface-2); }
.trio { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); padding: 0 !important; list-style: none; }
.trio li { max-width: none; border-radius: 14px; padding: 14px; border: 1px solid var(--line); background: var(--surface); }
.trio li b { display: block; font-size: 1.1rem; }
.trio .t-sabaq { border-top: 4px solid var(--sabaq); } .trio .t-sabqi { border-top: 4px solid var(--sabqi); } .trio .t-manzil { border-top: 4px solid var(--manzil); }
.facts { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); padding: 0 !important; list-style: none; }
.facts li { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; max-width: none; }
.facts b { display: block; font-size: 1.3rem; }
.facts span { color: var(--muted); font-size: .9rem; }
.faq details { border-bottom: 1px solid var(--line); padding: 10px 0; }
.faq summary { cursor: pointer; font-weight: 700; }
.links { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 !important; list-style: none; }
.links a { display: inline-block; padding: 6px 12px; border-radius: 999px; background: var(--brand-soft); text-decoration: none; font-weight: 600; font-size: .92rem; }
.note { background: var(--gold-soft); border-inline-start: 4px solid var(--gold); padding: 10px 14px; border-radius: 10px; }
.todo { background: #fff3b0; color: #3a2c00; padding: 0 4px; border-radius: 3px; }

/* Footer */
.site-footer { border-top: 1px solid var(--line); margin-top: 40px; padding: 24px 0 36px; color: var(--muted); font-size: .9rem; }
.site-footer nav { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-bottom: 10px; }
.site-footer a { color: var(--muted); }

/* Print: only the plan table */
#hz-print { display: none; }
@media print {
  .lang-menu, .lang-suggest { display: none !important; }
  body { background: #fff; color: #000; font-size: 11px; }
  .site-header, .site-footer, main > *:not(#hz-print), .skip { display: none !important; }
  #hz-print { display: block; }
  #hz-print h1 { font-size: 18px; margin: 0 0 4px; }
  #hz-print table { width: 100%; border-collapse: collapse; }
  #hz-print th, #hz-print td { border: 1px solid #999; padding: 3px 5px; text-align: start; vertical-align: top; }
  #hz-print tr { break-inside: avoid; }
}

/* ===== Parcours famille ===== */
.hz { display: grid; gap: 16px; margin: 20px 0; max-width: 760px; }
.hz.is-loading { opacity: .6; }
.hz-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
.hz-tabs:empty { display: none; }
.hz-tab { font: inherit; font-weight: 700; border: 1.5px solid var(--line); background: var(--surface); color: var(--text); border-radius: 999px; padding: 6px 14px; cursor: pointer; }
.hz-tab.is-on { background: var(--brand); border-color: var(--brand); color: var(--brand-ink); }
.hz-tab-add { border-style: dashed; color: var(--muted); }
.hz-today-head { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
.hz-today-head h2 { margin: 0; font-size: 1.25rem; }
.hz-who { font-weight: 700; color: var(--gold); }
.hz-block { border-radius: 14px; padding: 12px 14px; margin: 10px 0; border: 1px solid var(--line); border-inline-start-width: 6px; }
.b-new { border-inline-start-color: var(--sabaq); background: color-mix(in srgb, var(--sabaq-bg) 55%, var(--surface)); }
.b-recent { border-inline-start-color: var(--sabqi); background: color-mix(in srgb, var(--sabqi-bg) 55%, var(--surface)); }
.b-old { border-inline-start-color: var(--manzil); background: color-mix(in srgb, var(--manzil-bg) 55%, var(--surface)); }
.hz-block-head { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.b-new .hz-tag { background: var(--sabaq-bg); color: var(--sabaq); }
.b-recent .hz-tag { background: var(--sabqi-bg); color: var(--sabqi); }
.b-old .hz-tag { background: var(--manzil-bg); color: var(--manzil); }
.hz-listen { font-weight: 700; font-size: .9rem; white-space: nowrap; }
.hz-links { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
.hz-mushaf { font: inherit; font-weight: 700; font-size: .9rem; white-space: nowrap; color: var(--brand); background: none; border: 0; padding: 4px 0; cursor: pointer; text-decoration: underline; text-underline-offset: .15em; }
/* Visionneuse du mushaf */
.hz-overlay.hz-mushaf-view { background: rgba(6, 20, 16, .94); }
.hz-mushaf-view figure { max-width: min(560px, 100%); width: 100%; gap: 8px; }
.hz-mv-bar, .hz-mv-nav { display: flex; justify-content: space-between; align-items: center; gap: 10px; width: 100%; }
.hz-mv-title { color: #fff; font-size: 1rem; }
.hz-mv-page { width: 100%; background: #fff; border-radius: 12px; overflow: hidden; display: grid; place-items: center; min-height: 200px; }
.hz-mushaf-view img { width: 100%; height: auto; max-height: calc(100vh - 170px); object-fit: contain; border-radius: 0; box-shadow: none; background: #fff; }
.hz-mv-err { color: #333; padding: 24px; text-align: center; margin: 0; }
.hz-mv-nav .hz-btn { min-width: 96px; }
.hz-mv-nav .hz-btn[disabled] { visibility: hidden; }
.hz-mushaf-view figcaption { font-size: .8rem; opacity: .85; }
.hz-passage { font-size: 1.15rem; font-weight: 700; margin: 8px 0; }
.hz-note { color: var(--muted); font-size: .9rem; margin: 0 0 6px; }
.hz-btns { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.hz-btn { min-height: 44px; }
.hz-btn.small { min-height: 36px; padding: 6px 12px; font-size: .88rem; }
.hz-btn.big { padding: 14px 22px; font-size: 1.05rem; }
.hz-btn.link { background: none; border-color: transparent; color: var(--brand); text-decoration: underline; padding-inline: 4px; }
.hz-btn.danger { background: #b42318; border-color: #b42318; color: #fff; }
.hz-chip { display: inline-block; padding: 6px 12px; border-radius: 999px; font-weight: 800; font-size: .9rem; }
.hz-chip.ok { background: var(--sabaq-bg); color: var(--sabaq); }
.hz-chip.again { background: var(--sabqi-bg); color: var(--sabqi); }
.hz-banner { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; justify-content: space-between; background: var(--warn-bg); color: var(--warn-ink); border-radius: 12px; padding: 10px 14px; margin-bottom: 10px; }
.hz-banner p { margin: 0; }
.hz-rest { color: var(--muted); }
.hz-congrats { background: var(--gold-soft); border-radius: 12px; padding: 10px 14px; font-weight: 700; }
.hz-footer-acts { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; margin-top: 8px; }
.hz-stats { list-style: none; padding: 0; margin: 12px 0 6px; display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); }
.hz-stats li { background: var(--surface-2); border-radius: 12px; padding: 10px 12px; }
.hz-stats b { display: block; font-size: 1.25rem; font-variant-numeric: tabular-nums; }
.hz-stats span { color: var(--muted); font-size: .82rem; font-weight: 600; }
.hz-tablewrap { overflow-x: auto; margin: 8px 0 12px; }
.hz-sheet { border-collapse: collapse; width: 100%; font-size: .9rem; }
.hz-sheet th, .hz-sheet td { border: 1px solid var(--line); padding: 6px 8px; text-align: start; vertical-align: top; }
.hz-sheet thead th { background: var(--surface-2); font-size: .8rem; }
.hz-sheet tbody th { white-space: nowrap; }
.hz-sheet tr.is-today th { color: var(--brand); }
.hz-sheet .hz-tick { width: 52px; text-align: center; font-weight: 800; }
.hz-miles-list li.is-done .hz-dot { background: var(--gold); }
.hz-miles-list li.is-part .hz-dot { background: linear-gradient(90deg, var(--gold) 50%, transparent 50%); }
.hz-miles-list small { grid-column: 2; color: var(--muted); }
.hz-confirm { display: inline-flex; flex-wrap: wrap; gap: 6px; align-items: center; font-weight: 700; }
/* Formulaire de configuration */
.hz-form fieldset { border: 0; padding: 0; margin: 0 0 18px; min-width: 0; }
.hz-form legend { font-weight: 800; font-size: 1.05rem; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; padding: 0; }
.hz-step { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--brand); color: var(--brand-ink); font-size: .9rem; }
.hz-choice { display: grid; gap: 8px; margin: 6px 0 10px; }
.hz-choice > label { display: flex; gap: 8px; align-items: center; cursor: pointer; }
.hz-choice input[type="radio"] { width: 20px; height: 20px; accent-color: var(--brand); }
.hz-pills { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0; }
.hz-pill { position: relative; }
.hz-pill input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
.hz-pill span { display: inline-block; padding: 7px 12px; border-radius: 999px; border: 1.5px solid var(--line); background: var(--bg); font-weight: 600; font-size: .92rem; }
.hz-pill input:checked + span { background: var(--brand); border-color: var(--brand); color: var(--brand-ink); }
.hz-pill input:focus-visible + span { outline: 3px solid var(--focus); }
.hz-all span { border-style: dashed; }
.hz-inline { display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; margin: 6px 0; }
.hz-inline span { font-weight: 700; font-size: .92rem; }
.hz-inline input, .hz-inline select { font: inherit; color: var(--text); background: var(--bg); border: 1.5px solid var(--line); border-radius: 10px; padding: 8px 10px; min-width: 0; }
.hz-inline input[type="number"] { width: 90px; }
.hz-label { font-weight: 700; margin: 4px 0; }
.hz-error { background: #fde2e1; color: #8a1c13; border-radius: 10px; padding: 8px 12px; font-weight: 700; }
.hz-form details { margin: 8px 0; }
.hz-form summary { cursor: pointer; color: var(--muted); font-weight: 700; }
/* Impression : une fiche A4 */
@media print {
  @page { size: A4 portrait; margin: 12mm; }
  #hz-print h1 { font-size: 16px; margin: 0 0 4px; }
  #hz-print p { margin: 2px 0 8px; font-size: 11px; }
  #hz-print .hz-sheet { font-size: 11px; }
  #hz-print .hz-sheet th, #hz-print .hz-sheet td { border: 1px solid #777; padding: 6px; height: 36px; }
  #hz-print .hz-sign { margin-top: 14px; }
  #hz-print .hz-small { color: #555; font-size: 9px; }
}
/* La grille ne doit jamais s'élargir à cause du tableau de la semaine */
.hz { grid-template-columns: minmax(0, 1fr); }
.hz > *, .hz-main > * { min-width: 0; }
.hz-main { display: grid; gap: 16px; grid-template-columns: minmax(0, 1fr); }

/* Logo : nom + accroche */
.brand-text { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }
.brand-name { font-weight: 800; }
.brand-tag { font-size: .72rem; font-weight: 600; color: var(--muted); letter-spacing: .01em; }
@media (max-width: 420px) { .brand-name { font-size: 1.02rem; } .brand-tag { font-size: .68rem; } }

/* En-tête : un peu d air quand le logo et les langues passent sur deux lignes */
.site-header .wrap { padding-block: 8px; }
```

---

## 61. Conversion du mushaf officiel (render_mushaf.py)

*Fichier : `hifz/tools/render_mushaf.py`*

```python
"""Convertit les 604 pages officielles (AI/PDF du Complexe du Roi Fahd) en WebP pour le web."""
import os, subprocess, sys, tempfile, zipfile
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
ZIP, OUT = sys.argv[1], sys.argv[2]
z = zipfile.ZipFile(ZIP)
names = sorted(n for n in z.namelist() if n.endswith('.ai'))
assert len(names) == 604
tmp = tempfile.mkdtemp()
def one(n):
    p = int(os.path.basename(n)[:3])
    dest = os.path.join(OUT, f'{p:03d}.webp')
    if os.path.exists(dest):
        return 0
    src = os.path.join(tmp, f'{p:03d}.pdf')
    with z.open(n) as f, open(src, 'wb') as g:
        g.write(f.read())
    png = os.path.join(tmp, f'{p:03d}')
    subprocess.run(['pdftocairo', '-png', '-singlefile', '-scale-to-x', '960', '-scale-to-y', '-1', src, png], check=True)
    Image.open(png + '.png').convert('RGB').save(dest, 'WEBP', quality=66, method=6)
    os.remove(src); os.remove(png + '.png')
    return os.path.getsize(dest)
import threading
lock = threading.Lock()
def safe(n):
    with lock:
        data = None
    return one(n)
# zipfile n'est pas sûr en parallèle : on extrait séquentiellement, on convertit en parallèle
def extract_all():
    for n in names:
        p = int(os.path.basename(n)[:3])
        if os.path.exists(os.path.join(OUT, f'{p:03d}.webp')):
            continue
        with z.open(n) as f, open(os.path.join(tmp, f'{p:03d}.pdf'), 'wb') as g:
            g.write(f.read())
extract_all()
def conv(p):
    dest = os.path.join(OUT, f'{p:03d}.webp')
    if os.path.exists(dest):
        return os.path.getsize(dest)
    src = os.path.join(tmp, f'{p:03d}.pdf'); png = os.path.join(tmp, f'{p:03d}')
    subprocess.run(['pdftocairo', '-png', '-singlefile', '-scale-to-x', '960', '-scale-to-y', '-1', src, png], check=True)
    Image.open(png + '.png').convert('RGB').save(dest, 'WEBP', quality=66, method=6)
    os.remove(src); os.remove(png + '.png')
    return os.path.getsize(dest)
with ThreadPoolExecutor(4) as ex:
    sizes = list(ex.map(conv, range(1, 605)))
print(len(sizes), 'pages,', sum(sizes) // 2**20, 'MB, max', max(sizes) // 1024, 'KB')
```

---

## 62. Recadrage des pages (trim_mushaf.py)

*Fichier : `hifz/tools/trim_mushaf.py`*

```python
"""Recadre les marges blanches des pages du mushaf (garde 2 % de marge), en place."""
import sys, os
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageChops
D = sys.argv[1]
def trim(f):
    im = Image.open(f).convert('RGB')
    bg = Image.new('RGB', im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 24 else 0)
    box = diff.getbbox()
    if not box:
        return f, im.size, im.size
    pad = round(0.02 * im.size[0])
    l, t, r, b = max(0, box[0] - pad), max(0, box[1] - pad), min(im.size[0], box[2] + pad), min(im.size[1], box[3] + pad)
    out = im.crop((l, t, r, b))
    if out.size[0] < 900:  # pages décorées (1 et 2) : on les ramène à la largeur des autres
        out = out.resize((900, round(out.size[1] * 900 / out.size[0])), Image.LANCZOS)
    out.save(f, 'WEBP', quality=66, method=6)
    return f, im.size, out.size
files = sorted(os.path.join(D, x) for x in os.listdir(D) if x.endswith('.webp'))
with ThreadPoolExecutor(4) as ex:
    res = list(ex.map(trim, files))
for f, a, b in res[:3] + res[-2:]:
    print(os.path.basename(f), a, '→', b)
print(len(res), 'pages,', sum(os.path.getsize(f) for f in files) // 2**20, 'MB')
```

---

## 63. Tests : scénarios du carnet (pilot_ml.js)

*Fichier : `tests/pilot_ml.js`*

```javascript
const { chromium, devices } = require('playwright');
const fs = require('fs');
const B = 'http://localhost:8768';
const KEY = 'hifz-planner.v1';
const kid = (setup, extra) => Object.assign({ id: 'c1', name: 'Yasmine', setup: Object.assign({ surahs: [114], known: [], order: 'end', mode: 'amount', amount: 3, target: '', days: 'nnnnnoo', recent: 5, old: 10, time: '18:30', start: '2026-11-23' }, setup), learned: [], fragile: [], log: [], mp: 0 }, extra || {});
let ok = 0, ko = 0;
const check = (name, cond, info) => { cond ? ok++ : ko++; console.log((cond ? 'OK  ' : 'FAIL') + ' ' + name + (info ? '  — ' + info : '')); };
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'], permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const at = async (date) => { await p.clock.setFixedTime(new Date(date + 'T10:00:00')); };
  const state = async (children) => { await p.goto(B + '/fr/'); await p.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, { children, cur: children[0] && children[0].id }]); await p.reload(); await p.waitForSelector('.hz-today h2, .hz-form'); };
  const txt = async (sel) => (await p.innerText(sel)).replace(/\s+/g, ' ').trim();
  const newPassage = async () => (await p.$('.b-new .hz-passage')) ? txt('.b-new .hz-passage') : '';
  const stat = async (i) => (await p.$$eval('.hz-stats li b', l => l.map(x => x.innerText)))[i];

  // V0 — onboarding (mobile) : Al-Fatiha + 3 Qul
  await at('2026-11-23');
  await p.goto(B + '/fr/'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForSelector('.hz-form');
  const t0 = Date.now();
  await p.check('input[name="pick"][value="qul"]');
  await p.fill('input[name="name"]', 'Yasmine');
  await p.click('[data-act="save-setup"]'); await p.waitForSelector('.hz-today h2');
  check('V0 parcours créé en 3 étapes', (await newPassage()).includes('Al-Fatihah, versets 1 à 3'), await newPassage());
  // V8 — retour : « Aujourd’hui » d’abord
  await p.reload(); await p.waitForSelector('.hz-today h2');
  check('V8 au retour, la page s’ouvre sur Aujourd’hui', await p.isHidden('.hz-setup') && await p.isVisible('.hz-today'), await txt('.hz-today h2'));

  // V1 — la coche suit les versets, pas la date
  await at('2026-11-23');
  await state([kid({ surahs: [114], amount: 1 })]);
  await p.click('[data-act="new-ok"]');
  await p.click('[data-act="edit"]'); await p.fill('input[name="amount"]', '3'); await p.click('[data-act="save-setup"]'); await p.waitForSelector('.hz-today h2');
  const v1Today = await txt('.hz-today');
  await at('2026-11-24'); await p.reload(); await p.waitForSelector('.hz-today h2');
  check('V1 verset 1 reste acquis après passage à 3 versets', (await stat(0)) === '1/6' && (await newPassage()) === 'An-Nas, versets 2 à 4', `stat ${await stat(0)} · demain : ${await newPassage()} · aujourd’hui : ${v1Today.slice(0, 80)}`);

  // V2 — dates écoulées ≠ réussite
  await at('2026-11-23');
  await state([kid({ surahs: [114], amount: 3, start: '2026-11-19' })]);
  const v2 = await txt('.hz-today');
  check('V2 séances manquées signalées, rien n’est « terminé »', /2 séances n’ont pas été faites/.test(v2) && (await newPassage()) === 'An-Nas, versets 1 à 3' && !(await p.$('.hz-miles-list li.is-done')), v2.slice(0, 120));

  // V3 — Reporter décale la fin d’une séance
  await state([kid({ surahs: [114, 113, 112], amount: 3 })]);
  const end1 = await stat(3);
  await p.click('[data-act="skip"]');
  const end2 = await stat(3);
  check('V3 « Reporter » décale la fin estimée', end1 !== end2, `${end1} → ${end2}`);

  // V4 — « À revoir » : le passage revient
  await state([kid({ surahs: [114, 113, 112], amount: 3 })]);
  await p.click('[data-act="new-again"]');
  await at('2026-11-24'); await p.reload(); await p.waitForSelector('.hz-today h2');
  check('V4 « À revoir » : même passage à la séance suivante', (await newPassage()) === 'An-Nas, versets 1 à 3', await newPassage());

  // V5 — date cible exacte
  await at('2026-11-23');
  await state([kid({ surahs: [114, 113, 112], mode: 'date', target: '2026-11-26', days: 'nnnnnnn' })]);
  const v5 = await txt('.hz-progress');
  check('V5 objectif du 26/11 tenu avec 5 versets/séance', /Rythme : 5 nouveaux versets par séance/.test(v5) && /tenu/.test(v5), v5.slice(-150));
  await state([kid({ surahs: [114, 113, 112], mode: 'date', target: '2026-11-23', days: 'nnnnnnn' })]);
  check('V5b objectif impossible signalé', /impossible/.test(await txt('.hz-progress')), (await txt('.hz-progress')).slice(-160));

  // V6 — révision seule + révision après la dernière leçon
  await state([kid({ surahs: [114, 113, 112], known: [114, 113, 112] })]);
  const v6 = await txt('.hz-today');
  check('V6 tout connu : séance de révision proposée', !(await p.$('.b-new')) && !!(await p.$('.b-old')) && /alhamdulillah/i.test(v6), v6.slice(0, 160));
  const learnedAlmost = []; // An-Nas sauf le dernier verset
  await state([kid({ surahs: [114], amount: 3 }, { learned: [6230, 6231, 6232], log: [{ d: '2026-11-20', ns: 'ok', n: [6230, 6232], view: { n: [6230, 6231, 6232], recent: [], old: [] } }] })]);
  await p.click('[data-act="new-ok"]');
  await at('2026-11-24'); await p.reload(); await p.waitForSelector('.hz-today h2');
  check('V6b après la dernière leçon, la révision continue', !(await p.$('.b-new')) && (!!(await p.$('.b-recent')) || !!(await p.$('.b-old'))), await txt('.hz-today'));

  // V7 — fiche de la semaine : texte + impression sur 1 page A4
  await at('2026-11-23');
  await state([kid({ surahs: range(114, 78), amount: 3 })]);
  const rows = await p.$$eval('.hz-week tbody tr', l => l.length);
  await p.click('[data-act="copy-week"]');
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  check('V7 fiche : 7 jours + texte pour l’enseignant', rows === 7 && /Fiche de hifz de la semaine — Yasmine/.test(clip) && clip.split('\n').length >= 8, clip.split('\n').slice(0, 3).join(' / '));
  const pdf = await (await b.newContext()).newPage();
  await pdf.clock.setFixedTime(new Date('2026-11-23T10:00:00'));
  await pdf.goto(B + '/fr/'); await pdf.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, { children: [kid({ surahs: range(114, 78), amount: 3 })], cur: 'c1' }]); await pdf.reload(); await pdf.waitForSelector('.hz-week tbody tr');
  const buf = await pdf.pdf({ format: 'A4' }); fs.writeFileSync('/home/user/ah3119/hifz/apercus/fiche-semaine.pdf', buf);
  const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  check('V7b fiche imprimée sur une seule page A4', pages === 1, pages + ' page(s)');

  // V9 — plusieurs enfants
  await state([kid({ surahs: [114] }), Object.assign(kid({ surahs: [1] }), { id: 'c2', name: 'Adam' })]);
  await p.click('[data-act="new-ok"]');
  await p.click('[data-child="c2"]'); const adam = await newPassage();
  await p.click('[data-child="c1"]');
  check('V9 deux enfants, progressions séparées', adam === 'Al-Fatihah, versets 1 à 3' && (await stat(0)) === '3/6', `Adam : ${adam} · Yasmine : ${await stat(0)}`);

  // V11 — lien de sauvegarde sans prénom
  await p.click('[data-act="backup"]'); const link = await p.evaluate(() => navigator.clipboard.readText());
  const decoded = Buffer.from(link.split('#import=')[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
  const p2 = await (await b.newContext()).newPage(); await p2.clock.setFixedTime(new Date('2026-11-24T10:00:00'));
  await p2.goto(link); await p2.waitForSelector('.hz-import:not([hidden])'); await p2.click('[data-act="import-yes"]'); await p2.waitForSelector('.hz-today h2');
  const imp = await p2.$$eval('.hz-stats li b', l => l[0].innerText);
  check('V11 sauvegarde importée, sans prénom', imp === '3/6' && !/Yasmine/.test(decoded), `importé ${imp}`);

  // V12 — rappel agenda
  const [dl] = await Promise.all([p.waitForEvent('download'), p.click('[data-act="reminder"]')]);
  const ics = fs.readFileSync(await dl.path(), 'utf8');
  check('V12 rappel récurrent les jours de séance à 18:30', /RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR/.test(ics) && /T183000/.test(ics), ics.match(/RRULE[^\r]*/)[0]);

  // V10 — mobile, traductions, erreurs
  for (const path of ['/fr/', '/']) {
    await p.goto(B + path); await p.waitForSelector('.hz-today h2');
    const ov = await p.evaluate(() => Math.max(document.documentElement.scrollWidth, innerWidth) - 390);
    const raw = await p.evaluate(() => (document.body.innerText.match(/\b[a-z]+_[a-z_]+\b/g) || []).filter(x => !/^sakina/.test(x)));
    check(`V10 ${path} sans débordement ni clé non traduite`, ov === 0 && raw.length === 0, `débordement ${ov}, clés ${raw.join(',')}`);
  }
  await p.goto(B + '/fr/'); await p.waitForSelector('.hz-today h2');
  await p.screenshot({ path: '/home/user/ah3119/hifz/apercus/pilote-aujourdhui.png' });
  await p.evaluate(() => document.querySelector('.hz-week').scrollIntoView()); await p.screenshot({ path: '/home/user/ah3119/hifz/apercus/pilote-fiche.png' });
  await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForSelector('.hz-form');
  await p.evaluate(() => document.querySelector('.hz-form').scrollIntoView()); await p.screenshot({ path: '/home/user/ah3119/hifz/apercus/pilote-creation.png' });
  check('Aucune erreur JavaScript', errs.length === 0, errs.join(' | '));
  console.log(`\n${ok} OK, ${ko} échec(s)`);
  await b.close();
  function range(a, z) { const o = []; for (let x = a; x >= z; x--) o.push(x); return o; }
})();
```

---

## 64. Tests : contrôles multilingues (ml.js)

*Fichier : `tests/ml.js`*

```javascript
const { chromium, devices } = require('playwright');
const B = 'http://localhost:8768';
const KEY = 'hifz-planner.v1';
const SHOT = '/tmp/claude-0/-home-user-ah3119/9ba3e272-c7b8-543a-8f84-96d3944a0eba/scratchpad/ml-shots/';
require('fs').mkdirSync(SHOT, { recursive: true });
const LANGS = ['en', 'zh', 'hi', 'es', 'ar', 'fr', 'bn', 'pt', 'ru', 'id'];
const home = (l) => (l === 'en' ? '/' : `/${l}/`);
let ok = 0, ko = 0;
const check = (name, cond, info) => { cond ? ok++ : ko++; console.log((cond ? 'OK  ' : 'FAIL') + ' ' + name + (info ? '  — ' + info : '')); };
const kid = { id: 'c1', name: '', setup: { surahs: [1, 112, 113, 114], known: [], order: 'end', mode: 'amount', amount: 3, target: '', days: 'nnnnnnn', recent: 5, old: 10, time: '18:30', start: '2026-11-23' }, learned: [], fragile: [], log: [], mp: 0 };

(async () => {
  const b = await chromium.launch();
  const errs = [];
  // 1) Chaque langue, sur petit écran (iPhone SE, 375 px) : rendu, sens d'écriture, clés, débordement, visionneuse
  const ctx = await b.newContext({ ...devices['iPhone SE'] });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(e.message));
  await p.clock.setFixedTime(new Date('2026-11-24T10:00:00'));
  for (const l of LANGS) {
    await p.goto(B + home(l));
    await p.evaluate(() => localStorage.clear());
    await p.reload(); await p.waitForSelector('.hz-form');
    const ov1 = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.screenshot({ path: `${SHOT}${l}-setup.png`, fullPage: false });
    await p.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [KEY, { children: [kid], cur: 'c1' }]);
    await p.reload(); await p.waitForSelector('.hz-today h2');
    const info = await p.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir, title: document.title,
      raw: (document.body.innerText.match(/\b[a-z]+_[a-z_]+\b/g) || []), braces: /\{\{|\{[a-z]+\}/.test(document.body.innerText),
      passage: (document.querySelector('.b-new .hz-passage') || {}).innerText, btn: (document.querySelector('.hz-mushaf') || {}).innerText }));
    const ov2 = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await p.screenshot({ path: `${SHOT}${l}-today.png`, fullPage: false });
    const wantDir = l === 'ar' ? 'rtl' : 'ltr';
    check(`${l} rendu`, info.dir === wantDir && !info.raw.length && !info.braces && ov1 <= 0 && ov2 <= 0,
      `lang=${info.lang} dir=${info.dir} débordement ${ov1}/${ov2} · « ${info.passage} » · ${info.btn}${info.raw.length ? ' · clés ' + info.raw : ''}`);
    // visionneuse du mushaf : page 1 (Al-Fatiha), puis page suivante, puis fermeture
    await p.click('.b-new .hz-mushaf');
    await p.waitForSelector('.hz-mushaf-view img');
    await p.waitForFunction(() => { const i = document.querySelector('.hz-mushaf-view img'); return i.complete && i.naturalWidth > 0; }, null, { timeout: 8000 });
    const v1 = await p.evaluate(() => ({ t: document.querySelector('.hz-mv-title').innerText, src: document.querySelector('.hz-mushaf-view img').getAttribute('src') }));
    if (l === 'ar' || l === 'zh') await p.screenshot({ path: `${SHOT}${l}-mushaf.png` });
    await p.click('.hz-mv-nav [data-go="1"]');
    await p.waitForFunction(() => { const i = document.querySelector('.hz-mushaf-view img'); return /002\.webp$/.test(i.src) && i.complete && i.naturalWidth > 0; }, null, { timeout: 8000 });
    await p.keyboard.press('Escape');
    const closed = await p.evaluate(() => !document.querySelector('.hz-mushaf-view'));
    check(`${l} mushaf`, /001\.webp$/.test(v1.src) && closed, `${v1.t} → page 2 → fermé`);
  }
  // Pages légales et informations dans chaque langue
  for (const l of LANGS) {
    for (const slug of ['about', 'privacy', 'legal']) {
      const r = await p.goto(B + home(l) + slug + '/');
      const t = await p.evaluate(() => document.body.innerText);
      if (r.status() !== 200 || /\{\{|TO COMPLETE|À COMPLÉTER/.test(t)) check(`${l}/${slug}`, false, `HTTP ${r.status()}`);
    }
  }
  check('30 pages À propos / Confidentialité / Mentions légales', true);

  // 2) Menu Langues : depuis l'anglais, choisir Français ; le plan de l'enfant suit
  await p.goto(B + '/'); await p.waitForSelector('.hz-today h2');
  await p.click('.lang-menu summary');
  await p.screenshot({ path: `${SHOT}menu.png` });
  await p.click('.lang-menu a[data-l="fr"]');
  await p.waitForURL(B + '/fr/'); await p.waitForSelector('.hz-today h2');
  const frTitle = await p.innerText('.hz-today h2');
  check('Menu Langues : English → Français, même plan', /Aujourd’hui/.test(frTitle) && (await p.innerText('.b-new .hz-passage')).includes('Al-Fatihah'), frTitle);
  const pref = await p.evaluate(() => localStorage.getItem('oqt.lang'));
  check('Choix de langue mémorisé', pref === 'fr', pref);

  // 3) Bandeau de suggestion selon la langue du téléphone
  for (const [loc, expect] of [['fr-FR', 'Ce site existe en français.'], ['bn-BD', 'এই ওয়েবসাইটটি বাংলায়ও পড়া যায়।'], ['en-US@bn', null], ['en-US', null], ['de-DE', null]]) {
    const c2 = await b.newContext({ locale: loc });
    const q = await c2.newPage();
    await q.goto(B + '/'); await q.waitForSelector('.hz-form');
    const banner = await q.evaluate(() => { const x = document.querySelector('.lang-suggest span'); return x ? x.textContent : null; });
    check(`Bandeau pour un téléphone ${loc}`, banner === expect, String(banner));
    if (expect) { await q.click('.lang-suggest button'); await q.reload(); await q.waitForSelector('.hz-form'); check(`  fermé, il ne revient pas (${loc})`, !(await q.$('.lang-suggest'))); }
    await c2.close();
  }
  // 4) Référencement : hreflang et x-default sur l'accueil anglais
  await p.goto(B + '/');
  const hl = await p.$$eval('link[rel="alternate"]', (x) => x.map((y) => y.hreflang));
  check('hreflang : 10 langues + x-default', hl.length === 11 && hl.includes('zh-Hans') && hl.includes('x-default'), hl.join(' '));
  check('Aucune erreur JavaScript', errs.length === 0, errs.join(' | '));
  console.log(`\n${ok} OK, ${ko} échec(s)`);
  await b.close();
})();
```

---

## 65. Tests : contrôles d’affichage (ml2.js)

*Fichier : `tests/ml2.js`*

```javascript
const { chromium, devices } = require('playwright');
const B = 'http://localhost:8768';
const S = '/tmp/claude-0/-home-user-ah3119/9ba3e272-c7b8-543a-8f84-96d3944a0eba/scratchpad/ml-shots/';
const kid = { id: 'c1', name: '', setup: { surahs: [1, 112, 113, 114], known: [], order: 'end', mode: 'amount', amount: 3, target: '', days: 'nnnnnnn', recent: 5, old: 10, time: '18:30', start: '2026-11-23' }, learned: [], fragile: [], log: [], mp: 0 };
(async () => {
  const b = await chromium.launch();
  let ok = 0, ko = 0;
  const check = (n, c, i) => { c ? ok++ : ko++; console.log((c ? 'OK  ' : 'FAIL') + ' ' + n + (i ? '  — ' + i : '')); };
  // téléphone réglé en anglais qui ouvre un lien bengali partagé : pas de bandeau
  const c1 = await b.newContext({ ...devices['iPhone SE'], locale: 'en-US' });
  const p = await c1.newPage();
  await p.clock.setFixedTime(new Date('2026-11-24T10:00:00'));
  await p.goto(B + '/bn/');
  await p.evaluate((v) => localStorage.setItem('hifz-planner.v1', JSON.stringify(v)), { children: [kid], cur: 'c1' });
  await p.reload(); await p.waitForSelector('.hz-today h2');
  check('Téléphone en anglais sur /bn/ : pas de bandeau', !(await p.$('.lang-suggest')));
  const head = await p.evaluate(() => { const h = document.querySelector('.site-header'); return h.getBoundingClientRect().height; });
  check('En-tête sur une seule ligne (iPhone SE)', head < 80, `${Math.round(head)} px`);
  await p.screenshot({ path: S + 'v2-bn.png' });
  await p.click('.lang-menu summary');
  const box = await p.evaluate(() => { const r = document.querySelector('.lang-menu ul').getBoundingClientRect(); return [Math.round(r.left), Math.round(r.right), innerWidth]; });
  check('Menu des langues entièrement visible', box[0] >= 0 && box[1] <= box[2], box.join(' / '));
  await p.screenshot({ path: S + 'v2-menu.png' });
  await p.keyboard.press('Escape');
  await p.click('.b-new .hz-mushaf');
  await p.waitForFunction(() => { const i = document.querySelector('.hz-mushaf-view img'); return i && i.complete && i.naturalWidth > 0; });
  await p.screenshot({ path: S + 'v2-mushaf1.png' });
  await p.click('.hz-mv-nav [data-go="-1"]').catch(() => {});
  await p.keyboard.press('Escape');
  await p.goto(B + '/ar/'); await p.waitForSelector('.hz-today h2');
  await p.click('.b-new .hz-mushaf');
  await p.waitForFunction(() => { const i = document.querySelector('.hz-mushaf-view img'); return i && i.complete && i.naturalWidth > 0; });
  for (let k = 0; k < 3; k++) await p.click('.hz-mv-nav [data-go="1"]');
  await p.waitForFunction(() => /004\.webp$/.test(document.querySelector('.hz-mushaf-view img').src) && document.querySelector('.hz-mushaf-view img').naturalWidth > 0);
  await p.screenshot({ path: S + 'v2-mushaf4.png' });
  console.log(`\n${ok} OK, ${ko} échec(s)`);
  await b.close();
})();
```

