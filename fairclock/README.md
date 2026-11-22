# Fairclock — l'horaire de réunion équitable, partout dans le monde

**Promesse :** *« Meeting times that are fair to everyone »*. Fairclock trouve l'horaire de réunion qui convient à une équipe, une clientèle ou une famille répartie dans plusieurs pays. Il tient compte de trois choses que les convertisseurs classiques ignorent :

1. **Les week-ends propres à chaque pays** : vendredi-samedi en Arabie saoudite, au Qatar et en Égypte ; vendredi seul en Iran ; samedi-dimanche ailleurs. Chaque personne peut modifier le sien.
2. **Les jours fériés nationaux de 251 pays** (2026-2028).
3. **L'équité** : quand aucun horaire ne convient à tous, Fairclock propose deux créneaux à alterner chaque semaine, pour que ce ne soient pas toujours les mêmes qui se sacrifient.

Anglais par défaut (`/`), avec `/es/`, `/fr/`, `/de/`, `/pt/` et `/ar/` (arabe de droite à gauche). Il n'y a ni compte ni serveur : l'équipe est stockée dans le lien de partage. Le site comprend 56 pages indexables, dont 45 pages « meilleur horaire entre la ville A et la ville B » calculées à partir de données réelles.

## Pourquoi ce positionnement (vérifié le 22/11/2026)

- L'optimiseur de congés et le compteur Schengen/183 jours ont été écartés : au moins 5 outils existent déjà sur chacun.
- Pour les planificateurs de réunion, aucun outil trouvé ne combine jours fériés, week-ends non standard et rotation équitable. Recherche web non exhaustive : à reconfirmer avec un outil de mots-clés.
- La tête de marché (« time zone converter ») est tenue par des sites anciens. **Il ne faut pas l'attaquer de front.** On cible :
  - la longue traîne des paires de villes (« best time to call India from USA », « Brückentage »…) ;
  - le partage : chaque lien envoyé expose l'outil à toute une équipe.

## Contenu du dossier

| Élément | Rôle |
|---|---|
| `dist/` | **Le site**, à glisser-déposer chez l'hébergeur |
| `build.py` | Générateur sans dépendance : `python3 build.py` |
| `config.json` | Domaine, e-mail, identité de l'éditeur, AdSense |
| `src/i18n/*.json` | Tous les textes, par langue |
| `src/corridors.json` | Les paires de villes : ajouter une ligne crée les pages |
| `src/assets/app.js` | L'application (fuseaux, statuts, meilleurs créneaux, rotation, .ics) |
| `src/data/` | Villes (GeoNames, CC BY 4.0) et jours fériés (lib `holidays`, MIT) |
| `data/build_data.py` | Régénère les données. **À relancer une fois par an** pour ajouter l'année suivante |

## Mise en ligne

1. **Avant d'acheter quoi que ce soit**, vérifier le nom :
   - disponibilité du domaine (`fairclock.app` est un exemple, non vérifié) ;
   - absence de marque « Fairclock » déposée dans tes classes (EUIPO, USPTO, INPI). Un autre nom se change en une ligne dans `config.json`.
2. Remplir les champs `TO COMPLETE` de `config.json`, puis lancer `python3 build.py`.
3. Créer un compte Cloudflare Pages (gratuit), puis *Upload assets* et y déposer `dist/`. Ajouter ensuite le domaine.
4. Google Search Console : ajouter le domaine et soumettre `sitemap.xml`.
5. Lancement hors Google, qui apporte les premiers visiteurs sans attendre le SEO :
   - Product Hunt et un « Show HN » sur Hacker News ;
   - communautés remote, freelance et nomades, en respectant leurs règles ;
   - posts LinkedIn.
6. AdSense quand le site est indexé et a du trafic :
   - renseigner `adsense_client` puis rebuild ;
   - créer le bandeau de consentement certifié (obligatoire en Europe) ;
   - activer les annonces automatiques en **excluant la zone de l'outil** (réglage « zones exclues » d'AdSense).

## Modèle économique (sources de revenus empilables)

| Source | Quand | Commentaire |
|---|---|---|
| Publicité display | Dès qu'il y a du trafic | Revenu modeste par visite ; l'audience « travail / B2B » vaut plus que la moyenne (⚠️ non chiffré) |
| Affiliation | Mois 3+ | Paie internationale / employeur de référence, eSIM, assurance nomade. Programmes et commissions à vérifier un par un |
| **Fairclock Pro** (SaaS) | Si plus de 1 000 utilisateurs réguliers | Équipes sauvegardées, bot Slack/Teams, synchro agenda, rappels de rotation, ~5–9 $/équipe/mois (hypothèse à tester) |
| Widget pour sites | Plus tard | « Meilleur moment pour nous joindre » pour les entreprises à clientèle internationale |

La publicité finance le gratuit. **Le vrai potentiel est le B2B** : c'est l'équipe qui revient chaque semaine, pas le visiteur unique.

## Indicateurs et décision

| Échéance | Indicateur | Décision |
|---|---|---|
| Mois 1 | Pages indexées, premiers liens partagés | — |
| Mois 3 | Visiteurs récurrents, part du trafic venue des liens partagés | Si le partage fonctionne, construire la version Pro |
| Mois 6 | Impressions Search Console, clics/jour | Continuer, pivoter ou arrêter |

## Limites connues (à dire aux utilisateurs, c'est déjà fait sur le site)

- Ne sont pas inclus : jours fériés régionaux (Länder, États, provinces) et ponts d'entreprise.
- Les fêtes musulmanes sont **estimées** (observation de la lune, ±1 jour).
- Les traductions ES/DE/PT/AR ont été rédigées par IA : faire relire par un natif avant d'investir dans ces langues. FR et AR peuvent être relus par toi.
- Un jour férié fédéral américain (ex. Columbus Day) n'est pas chômé par toutes les entreprises privées.

## Ajouter une langue ou une paire de villes

- **Paire de villes** : ajouter `{"a": "Toronto", "b": "Mumbai", "langs": ["en"]}` dans `src/corridors.json`, puis lancer le build. Le nom de ville est celui de `src/data/cities.json`.
- **Langue** : copier `src/i18n/en.json` vers `xx.json` et le traduire, ajouter `"xx"` à `LANGS` dans `build.py`, puis lancer le build. Pistes : hindi, indonésien, turc, japonais.
