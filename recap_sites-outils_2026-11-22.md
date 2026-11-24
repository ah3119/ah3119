# Recap : sites d'outils gratuits financés par la pub (22/11/2026)

> **Décision du 24/11 : nom définitif « Sakina Quran Planner »**, domaine `sakinaquranplan.com`, accroche « A Quran memorization planner for families » / « Le carnet de mémorisation du Coran pour les familles », signature « by Sakina Kids ». Appliqué partout (site, fiche, carte, documents du pilote).
>
> **Mise à jour (fin de journée) : version pilote « Sakina Hifz »**
> - Revue de ChatGPT confrontée au code : tous les bugs moteur ont été reproduits, plus un bug plus grave sur les pages sourates, corrigé.
> - Concurrence : HifzMate et HifzPath existent ; mon affirmation « aucun outil » était fausse. Nom « Hifzly » abandonné.
> - Moteur reconstruit : il suit les versets **réellement récités**. Boutons Récité / À revoir / Reporter, révision continue, date cible exacte, plusieurs enfants, fiche de la semaine A4, rappel d'agenda, lien de sauvegarde sans prénom.
> - Français (racine) + anglais. **18 scénarios de validation réussis.**
> - Pilote proposé : 10 familles et 2 enseignants, **du 7 au 20 décembre 2026**. Tout est prêt dans `hifz/pilote/` (workflow, messages, questionnaires, suivi).
> - Choix faits **par défaut**, à confirmer par Alaa : nom « Sakina Hifz », pilote en français, écoute via Quran.com tant que les liens de récitations Sakina ne sont pas fournis.
> - Coût : ≈ 10-15 €/an (domaine) ; temps d'Alaa ≈ 2 h de mise en ligne, 2 h de recrutement, puis ≈ 15 min/jour pendant le pilote.

> **Mise à jour du 22/11 (soir) : 3e projet, Hifzly.** Alaa a jugé les deux premiers projets décevants et a demandé « une idée originale, et fais tout ».
> - **Hifzly** (dossier `hifz/`) : planificateur de mémorisation du Coran (sabaq / sabqi / manzil), anglais d'abord, 6 langues (EN, AR, FR, UR, ID, TR), 43 pages.
> - ✅ Aucun outil trouvé qui génère un planning complet sabaq/sabqi/manzil à partir d'un objectif (recherche web non exhaustive). Les utilisateurs de Quran.com réclament cette fonction.
> - Aperçu privé en ligne : https://claude.ai/artifact/79K9MCZ99eTHYjLTpMs5Er
> - Lancement : `hifz/LANCEMENT.md`. ⚠️ Fenêtre clé : être en ligne avant mi-janvier 2027 (Ramadan estimé vers le 8 février 2027).
> - Coût de démarrage : identique, ≈ 10-15 €/an de domaine et hébergement gratuit.
> - Concept proposé par Claude, **à valider par Alaa** ; le nom « Hifzly » n'est pas vérifié (domaine et marque).

## 1. Contexte
Alaa veut multiplier ses sources de revenus après avoir vu une vidéo YouTube sponsorisée par Hostinger. Le modèle présenté : des outils web gratuits, du trafic venu de Google, de la publicité AdSense.

Deux sites ont été construits, testés et poussés sur la branche `claude/wizardly-dirac-6ixmjl` du dépôt `ah3119/ah3119` :
- **Lettres en vrac** (France), dossier `lettres-en-vrac/` ;
- **Fairclock** (monde, anglais d'abord), dossier `fairclock/`.

Rien n'est encore en ligne : il faut un domaine et un compte d'hébergement au nom d'Alaa.

## 2. Ce qui a été créé

| | Lettres en vrac | Fairclock |
|---|---|---|
| Concept | Outils de mots en français (anagrammes, mots croisés, compteur de mots…) | Trouve l'horaire de réunion équitable entre plusieurs pays |
| Originalité | Faible : modèle de la vidéo, marché saturé | ✅ Pas d'équivalent trouvé combinant fériés, week-ends vendredi-samedi et rotation (⚠️ recherche non exhaustive) |
| Langues | Français | EN (principal), ES, FR, DE, PT, AR (de droite à gauche) |
| Pages | 11 (6 outils et 5 pages site/légales) | 56 indexables (6 accueils, 45 pages « ville A ↔ ville B », pages légales EN/FR) |
| Données | 331 778 mots (MIT et CC BY-SA 4.0) | 6 315 villes (GeoNames) et jours fériés de 251 pays 2026-2028 (lib `holidays`) |
| Fonctions clés | Jokers, filtres, anagrammes en 2 mots, aide Wordle/SUTOM | Grille horaire, meilleurs créneaux, rotation équitable, export agenda, invitation, lien de partage |
| Technique | Site statique, calcul dans le navigateur, zéro serveur | Idem, et l'équipe est stockée dans le lien |
| Tests | ✅ 11 scénarios, mobile OK | ✅ 6 langues, mobile et ordinateur, fichier agenda vérifié |

## 3. Décisions validées par Alaa
- 22/11 : un simple clone ne suffit pas. Il veut un projet **nouveau, créatif, utile, mondial, en anglais d'abord, avec choix des langues**. ✅
- Le concept Fairclock et les deux noms sont des **propositions de Claude, pas encore validées**.

## 4. Points en suspens
1. ❓ Disponibilité des domaines (`fairclock.app`, `lettresenvrac.fr`) et absence de marque « Fairclock » déjà déposée (EUIPO, USPTO, INPI) : non vérifiable depuis l'environnement cloud.
2. Informations d'éditeur pour les mentions légales : nom, statut/SIRET, adresse, téléphone. Elles sont dans `config.json`, champs `TO COMPLETE` / `À COMPLÉTER`.
3. Statut fiscal : la publicité est un revenu à déclarer. Micro-entreprise à créer ou existante ? Régime BNC ou BIC à confirmer (URSSAF ou expert-comptable).
4. Traductions ES, DE, PT, AR rédigées par IA : relecture par un natif avant d'investir dans ces langues. Alaa peut relire FR et AR.
5. Pas de données de mots-clés. Le plugin HarborRank est installé mais bloqué par le réseau de l'environnement cloud, et il demande un compte payant après 7 jours d'essai.

## 5. Workflow de mise en place (qui fait quoi)

| # | Étape | Qui | Durée estimée ⚠️ |
|---|---|---|---|
| 1 | Vérifier les noms : domaine libre et recherche de marque | Alaa | 30 min |
| 2 | Acheter les domaines (Cloudflare Registrar ou autre) | Alaa | 15 min |
| 3 | Envoyer à Claude : domaines et infos éditeur | Alaa | 5 min |
| 4 | Mettre à jour `config.json`, rebuild, commit | Claude | 5 min |
| 5 | Cloudflare Pages : *Upload assets*, déposer `dist/`, brancher le domaine | Alaa (guidé) | 30 min par site |
| 6 | Google Search Console : validation DNS, soumission de `sitemap.xml` | Alaa (guidé) | 20 min par site |
| 7 | Préparer les posts de lancement (Product Hunt, Show HN, LinkedIn) | Claude rédige, Alaa publie | 1 h |
| 8 | Demande AdSense, bandeau cookies certifié, annonces auto avec la zone de l'outil exclue | Alaa (guidé) | 1 h |
| 9 | Chaque mois : lire Search Console, puis ajouter des paires de villes ou des outils selon les vraies requêtes | Claude, sur données d'Alaa | 1-2 h/mois |
| 10 | Chaque année en novembre : régénérer les jours fériés de l'année n+2 (Fairclock) | Claude | 15 min |

## 6. Calendrier

| Période | Actions | Indicateur / décision |
|---|---|---|
| **Semaine du 23/11/2026** | Étapes 1 à 6 : les deux sites en ligne et déclarés à Google | Pages indexées |
| Décembre 2026 | Relecture des traductions, 5 à 10 paires de villes de plus. **Pas de lancement public** : période de fêtes, faible engagement B2B (⚠️ usage courant) | — |
| **Mi-janvier 2027** (mardi-jeudi) | Lancement public de Fairclock (Product Hunt, Hacker News, LinkedIn). Rentrée et planification des réunions de l'année | Visites, liens partagés |
| Janvier-février 2027 | Demande AdSense pour les deux sites une fois indexés | Acceptation |
| **Mi-février 2027 (M3)** | Bilan : utilisateurs récurrents, trafic venu des partages | Si positif : construire Fairclock Pro (abonnement équipes), affiliation |
| **Mai 2027 (M6)** | Bilan SEO (impressions, clics/jour, revenu par page vue réel) | Continuer, pivoter ou arrêter, par site |
| Novembre 2027 | Mise à jour des données 2029 et des pages « 2028 » | — |

## 7. Coûts de mise en place

| Poste | Coût | Statut |
|---|---|---|
| Développement des 2 sites | 0 € (fait) | ✅ |
| Hébergement Cloudflare Pages (offre gratuite) | 0 € | ⚠️ vérifier les conditions actuelles |
| Domaine `.fr` ou `.com` | ≈ 10-15 €/an chacun | ⚠️ varie selon le registraire |
| Domaine `.app` | ≈ 15-20 €/an | ⚠️ |
| E-mail sur le domaine (transfert Cloudflare Email Routing) | 0 € | ⚠️ ; boîte complète Google Workspace ≈ 7 €/mois en option |
| Search Console, AdSense | 0 € | ✅ |
| Déclaration micro-entreprise | 0 € (formalité en ligne) | ⚠️ à confirmer |
| **Total minimum pour démarrer** | **≈ 25-35 € la première année** | |
| Optionnel : relecture par des natifs ES/DE/PT | 0 € (réseau) à ≈ 50-150 €/langue | ❓ estimation |
| Optionnel, plus tard : dépôt de marque « Fairclock » | INPI ≈ 190 € (1 classe) ; UE ≈ 850 € | ⚠️ à faire seulement avant une version payante |
| Temps d'Alaa au lancement | ≈ 4-6 h, puis 1-2 h/mois | ⚠️ |

Inutile pour ce projet : l'abonnement Hostinger « Unlimited » de la vidéo (≈ 144 € payés d'avance sur 48 mois).

## 8. Revenus : ce qu'on sait
- ❓ Aucun chiffre fiable pour ces niches. Les 500 000 €/mois de la vidéo sont une extrapolation : les estimations de trafic varient de 1 à 8 selon Ahrefs ou Semrush.
- Repère d'ordre de grandeur, purement hypothétique : à 5 € de revenu pour 1 000 pages vues, 1 000 €/mois demandent environ 200 000 pages vues par mois.
- Le potentiel principal de Fairclock est **l'abonnement pour équipes**, pas la publicité.

## 9. Skills à utiliser ensuite
- `anthropic-skills:grilling` : stress-tester le choix du nom et le plan avant d'acheter les domaines.
- `harborrank:keyword-research` : à utiliser si l'accès réseau est débloqué et le compte créé, pour choisir les paires de villes et les outils suivants.
- `anthropic-skills:stop-slop` : rédiger les posts de lancement.
- `anthropic-skills:sp-verification` : avant d'annoncer une mise en ligne comme terminée.

## 10. Références (dans le dépôt)
- `lettres-en-vrac/README.md` : guide de mise en ligne et AdSense (FR)
- `fairclock/README.md` : positionnement, modèle économique, indicateurs, limites
- `lettres-en-vrac/config.json`, `fairclock/config.json` : champs à compléter
- `fairclock/src/corridors.json` : liste des paires de villes, à enrichir
- Captures : `lettres-en-vrac/apercus/`, `fairclock/apercus/`
