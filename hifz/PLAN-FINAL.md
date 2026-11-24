# Our Quran Time : version retenue, workflow, budget et revenus

Établi le 25/11/2026 à partir de ma version, de la revue comparative V3 de ChatGPT et de la proposition de Codex.
Légende : ✅ vérifié (source datée) · ⚠️ probable ou à confirmer · ❓ inconnu · 📌 recommandation.

---

## 1. La meilleure version (V3), et pourquoi

**Base retenue : la version Claude, complétée par ce que la revue V3 et Codex apportent de meilleur.**

Je ne retiens pas la proposition « paquet Codex comme base de déploiement », pour trois raisons :
1. Ce paquet n'est ni dans le dépôt ni dans les dossiers reçus : il est impossible de le vérifier ou de le construire d'ici.
2. La revue V3 recommande elle-même de garder **en priorité** mon moteur de révision (nouveau, révision récente, révision ancienne, « À retravailler »). Porter quelques fonctions de Codex dans ma version coûte beaucoup moins que l'inverse.
3. Aucun parent n'utilise encore le site : la question de migrer les sauvegardes locales ne se pose pas.

| Apport de la revue V3 ou de Codex | Statut dans la V3 | Contrôle |
|---|---|---|
| Ourdou dans le top 10 (Ethnologue 2026, russe 11e) | ✅ Intégré, de droite à gauche, en police nastaliq. **Russe conservé** en 11e langue : il est prêt et coûte peu | Test « Ourdou : RTL, nastaliq, sans débordement » |
| Visionneuse en `<dialog>` natif, avec saisie de page et zoom | ✅ Intégré : focus gardé dans la fenêtre, Échap, flèches, glissement, retour du focus | 4 tests |
| Aucun prénom dans ce qui est partagé | ✅ Fiche copiée, rappel d'agenda et sauvegarde sans prénom. Le prénom n'apparaît que sur l'écran et sur la fiche que le parent imprime lui-même | Tests V7, V12 et fichier |
| Sauvegarde par fichier, avec validation à l'import | ✅ Intégré ; un fichier ou un lien altéré est refusé | 4 tests |
| Libellés (séance manquée, message de l'aperçu) | ✅ Repris en français, anglais et portugais ; message de l'aperçu rendu général | — |
| Calendrier : questionnaire final le **18 décembre** (vacances le 19), indicateurs figés | ✅ Dans `pilote/1-WORKFLOW.md` | — |
| Nuance sur la LCEN (pas de seuil automatique d'un euro) | ✅ `PUBLIER.md` et `5-MONETISATION.md` corrigés | — |
| Pilote gratuit avant tout test payant ; un seul kit à 29 € ensuite | ✅ Déjà mon plan (`pilote/6-DECISION-OFFRE-PAYANTE.md`) | — |
| Retirer la date d'objectif et les profils multiples | ❌ Non retenu. Ce sont des options hors du parcours par défaut (rythme par défaut, un seul enfant). 🔬 Le pilote dira si elles gênent : on les masquera si c'est le cas | Mesure pendant le pilote |

**État vérifié de la V3** :
- 11 langues, 604 pages du Mushaf de Médine (empreinte SHA-256 vérifiée), 44 pages indexables, 681 fichiers, 56 Mo.
- **66 contrôles automatiques réussis**, sur iPhone SE et iPhone 13 simulés.
- ⚠️ Restent à faire sur de **vrais téléphones**, par toi : l'alarme du rappel sur iPhone et sur Android, l'impression A4, la visionneuse.

---

## 2. Workflow pas à pas

### Étape 0 : comptes et adresses (aujourd'hui, environ 1 h)
| # | Quoi | Coût | Détail |
|---|---|---|---|
| 1 | **Créer un Gmail dédié au projet** (ex. `ourqurantime.contact@gmail.com`, selon ce qui est libre) avec la double authentification | 0 € | Il possède tous les comptes du projet, pour ne jamais exposer ton e-mail personnel |
| 2 | **Compte Cloudflare** avec ce Gmail, double authentification | 0 € | Hébergement Cloudflare Pages gratuit |
| 3 | **Acheter `ourqurantime.com`** chez Cloudflare (renouvellement automatique) | ≈ 10 €/an | ⚠️ 11,17 $/an au prix coûtant depuis le 1/11/2026 (relevé par un comparateur tiers, oct. 2026) : vérifier le prix affiché |
| 4 | **Mettre le site en ligne** (`publication/PUBLIER.md`, étapes 3 et 4) | 0 € | Le zip V3 |
| 5 | **Créer l'adresse `contact@ourqurantime.com`** (Email Routing), redirigée vers le Gmail dédié | 0 € ⚠️ | Gratuit selon Cloudflare, à confirmer à l'activation |
| 6 | **Répondre aux e-mails** depuis le Gmail dédié | 0 € | Une vraie boîte `contact@` pour répondre sous ce nom (Zoho, Google Workspace, Proton…) : ❓ quelques euros par mois. Seulement si des ventes démarrent |

Pas d'autre adresse au départ. Si le kit est lancé, ajouter `kit@ourqurantime.com` redirigée vers le même Gmail (même règle, gratuite) pour séparer les questions des acheteurs.

### Étape 1 : vérifications et recrutement (25 novembre → 4 décembre)
1. Sur **ton** iPhone ou Android : créer un plan, ajouter le rappel (vérifier que l'alarme sonne), imprimer la fiche (une page A4), ouvrir le mushaf, changer de langue.
2. Vérifier la marque « QURAN TIME » sur data.inpi.fr et dans la base de l'EUIPO (10 min).
3. Faire relire le **français** (toi), puis trouver un relecteur natif pour l'**arabe** et pour l'**ourdou** (`TRADUCTIONS.md`).
4. Créer les questionnaires J7 et J12 dans **Google Forms** avec le Gmail dédié : gratuit, sans prénom d'enfant, codes F01 à F12 (`pilote/3-QUESTIONNAIRES.md`).
5. Recruter 10 familles et 2 enseignants, plus 2 familles de réserve (`pilote/2-MESSAGES.md`, lien `ourqurantime.com/fr/`).
6. **4 décembre** : décider si le pilote démarre (au moins 10 familles confirmées), **et** prendre les 3 décisions commerciales (étape 4) pour ne pas perdre de temps en janvier.

### Étape 2 : pilote gratuit (7 → 20 décembre, environ 15 min par jour)
- 7 déc. : démarrage. 9 déc. : point sur les blocages. 13 déc. : mi-parcours, et **entretien de 10 min avec les 2 enseignants** (comment informent-ils les parents aujourd'hui, en combien de temps), **sans présenter d'offre**.
- 16 déc. : rappel sur la reprise. **18 déc. : questionnaire final.** 20 déc. : fin et remerciements.
- **Aucune vente pendant le pilote**, pour ne pas fausser les mesures.

### Étape 3 : bilan (21 → 23 décembre)
Comparer aux seuils figés : au moins 6 familles sur 10 avec 3 séances en 2e semaine ; au moins 50 % de reprises ; intention moyenne d'au moins 7/10 ; au moins 1 enseignant sur 2 satisfait.
- Seuils atteints → étape 4.
- Sinon → corriger le carnet, refaire un pilote court en janvier, et **reporter** tout test payant.

### Étape 4 : préparer la première vente (28 décembre → 8 janvier, seulement si le bilan est bon)
| # | Quoi | Coût | Source / statut |
|---|---|---|---|
| 1 | **Immatriculer une micro-entreprise** sur le guichet des formalités des entreprises | **0 €** ✅ | Immatriculation gratuite pour une activité commerciale ou libérale ; dépôt possible « au plus tôt 1 mois avant le début d'activité » (*F36746, vérifié le 18/03/2026*). Déposer début décembre pour un début d'activité le 4 janvier |
| 2 | Choisir l'adresse publique : la tienne, ou une **domiciliation** | 0 € ou ❓ 10 à 30 €/mois (non vérifié) | Les mentions obligatoires imposent nom, prénoms et adresse (*F37351, vérifié le 13/10/2026*) |
| 3 | Passer le site en mode « professionnel » (je m'en charge à partir de tes informations) | 0 € | `config.json` |
| 4 | **Compte Stripe** (avec le Gmail dédié), activé avec ta pièce d'identité et ton IBAN | 0 € fixe ✅ | 1,5 % + 0,25 € par carte standard de l'EEE (*stripe.com/fr/pricing, 24/11/2026*) |
| 5 | Produire le **kit enseignant** (PDF A4 en français) et la fiche d'aperçu gratuite | 0 € | Environ 6 à 8 h. **Aucune page du Moushaf dans le kit** |
| 6 | Pages de vente : offre, conditions de vente, **rétractation en ligne** (Google Forms qui envoie une copie de la réponse à l'acheteur, comme accusé de réception) | 0 € ⚠️ | Fonctionnalité obligatoire (*F23455, vérifié le 19/06/2026*) ; vérifier que Google Forms la satisfait |
| 7 | Recette complète en mode test, puis un achat réel de 29 € suivi d'un remboursement | 0,69 € de frais | Liste de contrôle dans `pilote/6-DECISION-OFFRE-PAYANTE.md` |
| 8 | Compte bancaire : ton compte actuel au départ | 0 € ⚠️ | Seuil d'obligation d'un compte dédié à vérifier |

### Étape 5 : test commercial (11 janvier → 10 février)
- **11 janvier** : message de 62 mots (dans `6-DECISION-OFFRE-PAYANTE.md`) aux 20 contacts : 10 professeurs rémunérés et 10 écoles du week-end (adresse de l'association). Une seule relance à J+5.
- **25 janvier (J14)** :
  - au moins 3 commandes sur 12 personnes ayant vu le prix → on continue ;
  - 1 ou 2 → on change une seule variable ;
  - 0 → arrêt du kit, et atelier parents en repli.
- **10 février (J30)** : au moins 5 ventes, au moins 2 utilisations réelles, au plus 1 remboursement, **1 virement reçu**. Si c'est atteint : licence établissement.

### Étape 6 : Ramadan (⚠️ début vers le 8 février 2027, date astronomique non vérifiée)
- Campagne pour le **carnet gratuit** dans les langues relues (français, arabe, ourdou), avec des enseignants et des mosquées partenaires.
- Parrainage possible (« carnet offert grâce à… »), sans publicité dans le carnet.

### Étape 7 : abonnement (avril 2027 au plus tôt, seulement avec des preuves)
- **Condition** : au moins 3 acheteurs du kit qui demandent spontanément un suivi en ligne de leur classe.
- **Contenu** : l'enseignant crée une classe, les parents envoient la fiche avec un code, et il voit un tableau de la semaine.
- **Coût** : 40 à 80 h de développement (hypothèse) et un vrai dossier sur les données de mineurs (base légale, accès, durée de conservation, droits).
- Prix à tester d'après les réponses des enseignants, jamais avant.

### À ne pas faire
Pas de publicité dans le carnet. Pas de texte coranique produit par une IA. Pas de vente pendant le pilote. Pas de page du Moushaf dans un produit payant sans accord écrit du Complexe.

---

## 3. Budget prévisionnel sur 12 mois (déc. 2026 → nov. 2027)

| Poste | Minimal | Confort | Source / statut |
|---|---|---|---|
| Domaine `.com` | ≈ 10 € | ≈ 10 € | ⚠️ comparateur tiers |
| Hébergement Cloudflare Pages | 0 € | 0 € | ✅ offre gratuite (limites : 20 000 fichiers, 25 Mio par fichier) |
| Adresse `contact@` (redirection) | 0 € | 0 € | ⚠️ à confirmer |
| Vraie boîte e-mail professionnelle | 0 € | ❓ ≈ 30 à 80 € | non vérifié ; seulement si vente |
| Micro-entreprise (immatriculation) | 0 € | 0 € | ✅ F36746 |
| Domiciliation (pour ne pas publier ton adresse) | 0 € | ❓ ≈ 120 à 360 € | non vérifié ; optionnel |
| Stripe (frais fixes) | 0 € | 0 € | ✅ ; seuls les frais par vente |
| Formulaires, questionnaires, rétractation (Google Forms) | 0 € | 0 € | ⚠️ |
| Impressions de test, relectures natives offertes ou rémunérées | ≈ 10 € | ❓ ≈ 100 à 200 € | hypothèse |
| **Total en argent** | **≈ 20 €** | **≈ 260 à 650 €** | |
| **Temps** | ≈ 60 h sur l'année | ≈ 110 h | Pilote 20 à 25 h, kit et vente 16 à 18 h, prospection 5 h, support 1 h/semaine pendant les tests (hypothèses) |

📌 Recommandation : rester au **budget minimal** tant que le test J30 n'est pas positif. La seule dépense qui peut valoir le coup avant : la domiciliation, si tu refuses de publier ton adresse personnelle au moment de vendre.

---

## 4. Ce que cela peut rapporter (année 2027)

Base de calcul :
- prix du kit 29 € ; frais Stripe 0,69 € par vente ✅ ;
- cotisations sociales de 21,2 % du chiffre d'affaires en prestations de services (BIC) ou 25,6 % en activité libérale (BNC) ✅ (*service-public F36232, vérifié le 01/01/2026*) ; ❓ le classement de la vente de PDF est à confirmer avec l'URSSAF ;
- TVA : 0 € sous la franchise (seuil de 37 500 € en services) ✅ (*F21746*).

**Ces volumes sont des hypothèses, pas des prévisions. Aucune vente n'est prouvée à ce jour.**

| Scénario | Hypothèse de volume | Chiffre d'affaires | Frais Stripe | Cotisations | **Net estimé** | Temps |
|---|---|---|---|---|---|---|
| **Prudent** | Le kit s'arrête à J14 : 0 à 2 ventes | 0 à 58 € | 0 à 1,38 € | 0 à 15 € | **0 à ≈ 42 €** | ≈ 25 h perdues dans le kit et la prospection |
| **Central** | 3 ventes en janvier, puis 2 par mois de février à décembre (25 ventes) | 725 € | 17,25 € | 154 à 186 € | **≈ 520 à 555 €** | ≈ 35 h |
| **Haut** | 10 ventes en janvier, puis 8 par mois (≈ 100 ventes) + 3 licences établissement à 79 € + 4 ateliers parents de 10 personnes à 15 € | ≈ 3 740 € | ≈ 92 € | ≈ 790 à 960 € | **≈ 2 690 à 2 850 €** (≈ 225 à 240 €/mois) | ≈ 70 h |
| Abonnement (2028, hypothèse) | 20 écoles à 9 €/mois | 2 160 €/an | ≈ 94 € (hors frais d'abonnement Stripe ❓) | ≈ 460 à 550 € | ≈ 1 510 à 1 610 €/an | 40 à 80 h de développement d'abord |

**Lecture honnête.**
- Même le scénario haut fait un **complément de revenu**, pas un salaire.
- La vraie valeur de 2027 serait de prouver un besoin payant chez les enseignants et les écoles, et de construire une audience multilingue autour d'un outil gratuit utile.
- Si le test J30 échoue, le projet garde sa valeur (sadaqa jariya, audience), et les pertes se limitent à environ 20 € et quelques dizaines d'heures.

---

## 5. Trois décisions à prendre d'ici le 4 décembre
1. **Statut** : micro-entreprise (immatriculation gratuite) et choix entre ton adresse et une domiciliation.
2. **Paiement** : Stripe (recommandé : fonds disponibles dès la 1re vente, prix final net) plutôt que Gumroad (aucun versement sous 100 $).
3. **Cible et seuils** : professeurs rémunérés et écoles du week-end, kit à 29 €, seuils J14 et J30, aucune vente pendant le pilote.

## Sources (consultées les 24 et 25/11/2026)
- Mushaf : https://qurancomplex.gov.sa/mushaf-printing
- Cloudflare Pages, limites : https://developers.cloudflare.com/pages/platform/limits/
- Prix du `.com` chez Cloudflare (tiers) : https://costgoat.com/compare/domains/com
- Ethnologue 2026, via sources secondaires : https://logos-pres.md/en/news/the-most-spoken-languages-in-the-world-in-2026/ ; https://www.babbel.com/en/magazine/the-10-most-spoken-languages-in-the-world
- Stripe : https://stripe.com/fr/pricing ; https://docs.stripe.com/payouts ; https://docs.stripe.com/payment-links
- Gumroad : https://gumroad.com/help/article/66-gumroads-fees ; https://gumroad.com/help/article/13-getting-paid
- Service-public : F36746 (immatriculation, gratuité), F37351 (mentions), F23455 (vente en ligne, rétractation), F21746 (franchise de TVA), F36232 (cotisations 2026) : https://entreprendre.service-public.gouv.fr/vosdroits/
- CNIL, prospection : https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique
