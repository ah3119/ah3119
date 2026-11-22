# Hifzly — planificateur de mémorisation du Coran (sabaq · sabqi · manzil)

**Aperçu en ligne (privé) :** https://claude.ai/artifact/79K9MCZ99eTHYjLTpMs5Er

## Le produit
Tu choisis ce que tu veux mémoriser et ton rythme. Hifzly génère **un planning jour par jour jusqu'à la fin** avec les trois volets utilisés dans les écoles coraniques :
- **sabaq** : la nouvelle leçon ;
- **sabqi** : la révision des derniers jours ;
- **manzil** : la révision tournante de l'ancien.

Fonctions :
- **5 préréglages en un clic** : Juz Amma pour enfants, Al-Mulk en 30 jours, Al-Kahf en 3 mois, une page par jour, tout le Coran en 3 ans.
- **Choix de l'unité** : en versets (enfants, sourates courtes) ou en lignes du mushaf de Médine (15 lignes, 604 pages).
- **Rythme** : « je choisis ma portion », ou « je veux finir avant telle date » (l'outil calcule la portion).
- **Semaine** : chaque jour réglé en nouveau + révision, révision seule, ou repos.
- **Acquis** : les juz déjà connus sont exclus du nouveau et ajoutés au manzil.
- **Suivi** :
  - « Aujourd'hui » avec un lien Lire / écouter vers Quran.com ;
  - cases à cocher et barre de progression (stockées sur l'appareil) ;
  - jalons datés (chaque juz ou sourate terminée).
- **Partage** : **carte image** à partager (« الحمد لله — I just completed Juz 30 »). C'est le moteur viral sur WhatsApp, Instagram et TikTok.
- **Exports** : fichier d'agenda (.ics), impression / PDF, lien du plan.
- **6 langues** : anglais (principal), arabe, français, ourdou, indonésien, turc. Chaque langue utilise son vocabulaire : سبق/سبقی/منزل en ourdou, ziyadah/muraja'ah en Indonésie, etc.
- **43 pages indexables**, dont 30 pages « How to memorize Surah X » avec les chiffres réels de chaque sourate et un index des 114 sourates.

## Pourquoi ce choix (vérifié le 22/11/2026)
- Il existe des calculateurs simples (« date de fin = total ÷ rythme ») et des carnets à remplir à la main.
- **Aucun outil trouvé ne génère automatiquement un planning complet sabaq/sabqi/manzil à partir d'un objectif.** ⚠️ Recherche web non exhaustive.
- Des utilisateurs de Quran.com réclament cette fonction. C'est un risque autant qu'un signal : ils pourraient la développer, donc il faut aller vite.
- Avantage propre à Alaa : public Sakina Kids, arabe et français, crédibilité dans la communauté.

## Données vérifiées
- Structure du mushaf : `quran-meta` 7.0.0 (MIT).
  - Contrôles faits : 604 pages, 6 236 versets, Juz Amma = 564 versets, Al-Kahf p. 293-304, Al-Mulk p. 562-564.
  - **4 juz (4, 7, 11, 26) commencent en milieu de page** ; c'est pris en compte dans le calcul.
- Noms des sourates : `quran-json` 3.1.2 (CC BY-SA 4.0, attribution sur la page À propos).
- Le moteur a été contrôlé sur Juz Amma, 3 versets/jour sans changer de sourate en cours de journée : 200 jours d'étude calculés à la main, 200 obtenus.

## Structure
| Élément | Rôle |
|---|---|
| `dist/` | Le site complet, à déposer chez l'hébergeur |
| `dist-standalone/` | Page unique autonome (`index.html`) et aperçu artifact (`preview.html`) |
| `build.py` | `python3 build.py` (site) / `python3 build.py --standalone` (aperçu) |
| `config.json` | Nom, domaine, éditeur, `support_url` (dons), `sister_name`/`sister_url` (lien Sakina), AdSense |
| `src/i18n/*.json` | Tous les textes par langue |
| `src/assets/app.js` | Le moteur de planning et l'interface |
| `data/build_quran_data.mjs` | Régénère `src/data/quran.json` depuis les paquets npm |

## Mise en ligne
Identique aux autres sites : Cloudflare Pages, puis glisser-déposer `dist/`.
1. Vérifier que le nom est libre (domaine et marque).
2. Remplir les champs `TO COMPLETE` de `config.json`.
3. Lancer le build et déposer `dist/`.
4. Déclarer le site à Google Search Console.

Calendrier, canaux et scripts vidéo : voir **`LANCEMENT.md`**.

## Évolutions prioritaires
1. **Mushaf indo-pakistanais à 16 lignes** : énorme public en Inde, au Pakistan et au Royaume-Uni. Le mode « versets » fonctionne déjà avec tous les mushafs.
2. Version enseignant : plusieurs élèves et rapport aux parents. C'est la piste pour un revenu récurrent.
3. Carnet PDF premium.
4. Rappels quotidiens (notification) via une petite application installable sur le téléphone (PWA).
