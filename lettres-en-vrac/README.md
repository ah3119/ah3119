# Lettres en vrac — site d'outils de mots en français

Site statique (HTML/CSS/JS, aucune dépendance, aucun serveur) qui regroupe 6 outils :

| Page | Requête visée | Fichier source |
|---|---|---|
| `/` | trouver des mots avec des lettres | `src/pages/index.html` |
| `/anagramme/` | anagramme, anagramme prénom | `src/pages/anagramme.html` |
| `/solveur-mots-croises/` | solveur mots croisés / fléchés, aide Wordle, SUTOM | `src/pages/mots-croises.html` |
| `/mots-finissant-par/` | mot finissant par…, commençant par…, rimes | `src/pages/mots-finissant-par.html` |
| `/compteur-de-mots/` | compteur de mots, de caractères | `src/pages/compteur-de-mots.html` |
| `/majuscules-minuscules/` | convertir majuscules minuscules | `src/pages/majuscules-minuscules.html` |

Plus les pages exigées par AdSense et la loi : À propos, Contact, Mentions légales, Confidentialité et cookies, 404.
Sitemap, robots.txt, balises SEO, données structurées et `ads.txt` sont générés automatiquement.

Toutes les recherches tournent **dans le navigateur du visiteur** (Web Worker) : zéro coût serveur, zéro donnée personnelle collectée par les outils.

---

## 1. Mettre le site en ligne (≈ 30 min, ≈ 10 €/an)

Le dossier `dist/` **est** le site. Il suffit de l'envoyer chez un hébergeur statique.

**Option recommandée : Cloudflare Pages (gratuit)**
1. Acheter le nom de domaine (ex. `lettresenvrac.fr`, disponibilité non vérifiée) chez n'importe quel registraire, ou directement chez Cloudflare.
2. Créer un compte Cloudflare → *Workers & Pages* → *Create* → *Pages* → *Upload assets*.
3. Glisser-déposer le dossier `dist/`. Le site est en ligne sur une adresse `*.pages.dev`.
4. *Custom domains* → ajouter le domaine.

Alternatives équivalentes : Netlify (glisser-déposer `dist/` sur app.netlify.com/drop), GitHub Pages, ou Hostinger (envoyer le contenu de `dist/` dans `public_html` via le gestionnaire de fichiers). Un hébergement payant n'apporte rien à un site statique.

## 2. Avant d'ouvrir au public

- [ ] Remplir **tous** les champs `À COMPLÉTER` de `config.json` (éditeur, adresse, hébergeur…), puis `python3 build.py`. Le build affiche les champs manquants ; ils apparaissent surlignés en jaune sur les pages légales.
- [ ] Mettre le bon `domain` et le bon `contact_email` dans `config.json`.
- [ ] Statut : des revenus publicitaires sont une activité à déclarer. Le plus simple est la micro-entreprise ; faites valider le régime (BNC ou BIC) par l'URSSAF ou un expert-comptable.
- [ ] Créer une adresse e-mail sur le domaine (transfert gratuit possible avec Cloudflare Email Routing).

## 3. Être indexé par Google (jour 1)

1. Ouvrir [Google Search Console](https://search.google.com/search-console) → ajouter le domaine (validation par DNS, le plus simple sur Cloudflare), ou coller le code de la balise dans `google_site_verification` de `config.json` puis rebuild.
2. *Sitemaps* → soumettre `sitemap.xml`.
3. *Inspection d'URL* → demander l'indexation de la page d'accueil et des 5 outils.

Search Console est **gratuit** et c'est la meilleure source de mots-clés : il montre les requêtes réelles pour lesquelles le site apparaît.

## 4. Brancher AdSense (quand le site est indexé et complet)

1. Créer le compte sur adsense.google.com avec le domaine.
2. Copier l'identifiant éditeur (`ca-pub-XXXXXXXXXXXXXXXX`) dans `adsense_client` de `config.json`, puis `python3 build.py` et redéployer `dist/`.
   → le script AdSense est ajouté dans le `<head>` de toutes les pages et `ads.txt` est créé.
3. Dans AdSense : *Confidentialité et messages* → créer le message de consentement RGPD (CMP certifiée Google, obligatoire pour l'Europe depuis janvier 2024).
4. Activer les annonces automatiques, puis demander l'examen du site.

## 5. Ajouter un outil

1. Copier une page de `src/pages/` (ex. `mots-croises.html`) sous un nouveau nom.
2. Modifier le commentaire `<!--meta {...} -->` en haut : `path`, `title`, `description`, `nav`, `card`, `order`.
3. Si l'outil cherche dans le dictionnaire, réutiliser un type existant (`subAnagrams`, `anagrams`, `pattern`, `affixes`) ou en ajouter un dans `src/assets/worker.js`.
4. `python3 build.py` : la page apparaît dans le menu, le pied de page, les cartes « autres outils » et le sitemap.

## 6. Régénérer le dictionnaire

Voir l'en-tête de `data/build_dico.py` (sources, commandes de téléchargement). Le fichier produit, `src/assets/dico.txt`, contient 331 778 mots répartis en 5 blocs de fréquence.

## 7. Feuille de route (ordre conseillé)

| Quand | Quoi | Indicateur de décision |
|---|---|---|
| Semaine 1 | Domaine, config, mise en ligne, Search Console | Pages indexées |
| Semaines 2–8 | 1 à 2 outils par mois, choisis d'après les requêtes Search Console et un outil de mots-clés | Impressions en hausse |
| Mois 2–3 | Demande AdSense | Acceptation |
| Mois 6 | Bilan go / no-go | Clics/jour, RPM réel |

Pistes d'outils dans le même thème : générateur de mots aléatoires, palindromes, mots avec une lettre donnée en position N, conjugueur de base, aide « le mot le plus long » avec tirage aléatoire, version anglaise des solveurs.

## Licences

- Code et textes du site : propriété de l'éditeur.
- `src/assets/dico.txt` : CC BY-SA 4.0. Il est dérivé de *an-array-of-french-words* (MIT, issu de la liste Letterpress) et des fréquences *wordfreq* de Robyn Speer (données CC BY-SA 4.0). L'attribution figure sur la page À propos ; ne pas la retirer.
