# Our Quran Time : décision sur un premier parcours payant

Réponse à `01-PROMPT-CLAUDE.txt`, établie le 24/11/2026.
Légende : ✅ fait vérifié (source datée) · 📌 proposition · ❓ inconnue · 🔬 à mesurer par le pilote ou le test.

**Ordre de lecture.** Les cinq fichiers m'ont été remis ensemble. Comme le demande le prompt dans ce cas, je formule d'abord mon scénario (§ 1 à 5). Il prolonge mon plan antérieur (`5-MONETISATION.md`, écrit avant de connaître la proposition de Codex). Je note ensuite les deux scénarios sur la grille (§ 6). Ayant lu la proposition de Codex, je signale les points où mon scénario la rejoint.

---

## 0. Écarts entre le brief commun et la version que j'ai livrée
Le brief décrit une version que je n'ai pas pu vérifier : son rapport `QA-SITE.md` n'est pas joint.

| Point | Brief commun | Version livrée par Claude (vérifiée le 24/11) |
|---|---|---|
| 10e langue | ourdou | **russe** (j'avais recommandé l'ourdou comme prochain ajout) |
| Tests | 11 tests automatisés | 53 contrôles (`RESULTATS_TESTS.md`) |
| Archive Cloudflare | ≈ 85 Mio, 637 fichiers | 56 Mo, 675 fichiers |
| Mentions d'édition | « à compléter » | mode « particulier » rempli ; **à passer en « professionnel » avant toute vente** |

Effet sur la décision : **aucun**. Le parcours payant ne dépend ni de la 10e langue ni du nombre de tests. Il faut seulement choisir quelle version sera publiée.

---

## 1. Mon scénario : l'offre de première vente 📌

**Kit de suivi hifz, licence « professeur », 29 € (prix final), vendu à l'unité, en français.**

| Élément | Choix | Pourquoi |
|---|---|---|
| **Qui paie** | Les **professeurs de Coran rémunérés** : cours particuliers, en visio, ou salariés d'une école, qui suivent au moins 5 enfants | Ils ont un revenu lié à leurs élèves et un intérêt économique direct : garder les familles qui les paient. Un enseignant bénévole n'a souvent pas de budget, et le démarcher par e-mail sans son accord relève des règles applicables aux particuliers (§ 5). |
| **Gain concret** | Envoyer à chaque parent un **bilan hebdomadaire clair en 2 minutes par élève**, et reprendre proprement après une absence | Hypothèse : les parents qui voient la progression restent. 🔬 À mesurer : temps gagné déclaré et usage réel. |
| **Livré** | PDF A4 en français : fiche de séance (nouveau, révision récente, révision ancienne, reprise), tableau de classe sur 4 semaines (codes élèves), **bilan hebdomadaire parent** (papier et texte à coller dans WhatsApp), fiche de reprise après absence, certificat « sourate apprise » au design original, 3 messages types, guide d'une page | **Aucun fac-similé du Moushaf** dans le kit : l'usage commercial des pages du Complexe n'est pas précisé (`REFERENCE_CORAN.md`). Le carnet et le Moushaf restent gratuits. |
| **Aperçu gratuit** | La fiche de séance | Montre la qualité avant de payer |
| **Prix test** | **29 €**, prix unique, sans remise | Pour un professeur rémunéré, le kit est amorti si un seul parent reste un mois de plus (raisonnement, non mesuré). |
| **Licence** | 1 professeur nommé, élèves illimités, impressions illimitées pour ses propres groupes, y compris des cours payants. Interdit : revente, partage ou mise en ligne des fichiers. **Licence établissement sur devis** : non vendue activement, chaque demande est notée comme un signal. | Simple à comprendre ; la demande établissement est mesurée sans être développée. |
| **Canal** | Démarchage B2B direct de 20 professeurs rémunérés (contacts professionnels publics) + recommandations des 2 enseignants du pilote | Ne dépend pas de l'audience Sakina Kids (§ 5) |
| **Encaissement** | **Stripe Payment Links** (page hébergée), reçu automatique, téléchargement immédiat sur une page de remerciement, copie par e-mail | Frais les plus bas, pas de seuil de versement (§ 2) |
| **Arrêt** | Voir § 5 (J14, J30) | |

**Si aucun enseignant ne paie** 📌 : un **atelier en visio pour les parents** (75 min, 15 €), co-animé avec un enseignant reconnu, qui n'a lieu qu'à partir de 5 inscrits.
- Il ne demande aucun stock à produire.
- Il teste si les parents paient pour du temps d'accompagnement.
- Il apporte la crédibilité qui manque à un éditeur anonyme.
- S'il se vend, on le transforme ensuite en « kit famille » imprimable.

---

## 2. Comparaison des offres et des moyens de paiement

### 2.1 Offres (une ligne par scénario, format de la grille)
| Offre | Acheteur | Prix affiché | Distribution | 1re vente (jours après J0) | 1re disponibilité des fonds | Temps de travail (hyp.) | Frais et taxes à vérifier | Indicateur d'usage | Règle d'arrêt |
|---|---|---|---|---|---|---|---|---|---|
| **Kit professeur (Claude)** | Professeur rémunéré | 29 € TTC (franchise de TVA) | Stripe Payment Link + page de remerciement | ❓ 2 à 10 j (hyp.) | ✅ 1er virement Stripe sous 7 à 14 j après le 1er paiement réel | 16 à 18 h jusqu'à la 1re vente, formalités comprises | Frais Stripe ✅ ; cotisations URSSAF ❓ | Au moins 2 acheteurs déclarent l'avoir utilisé avec de vrais élèves | 0 vente sur 12 personnes ayant vu le prix |
| Kit enseignant (Codex) | Enseignant qui encadre un groupe (souvent bénévole) | 29 € (+ TVA possible au paiement, ❓) | Gumroad | ❓ 2 à 10 j | ✅ Rien avant un solde de **100 USD** ; puis 7 jours de rétention et paiement hebdomadaire | 7 à 11 h (hors formalités, selon Codex) | Frais Gumroad ✅ ; TVA ajoutée ou incluse ❓ | Idem | 0 vente sur 10 offres |
| Atelier parents en visio | Parent | 15 € | Stripe Payment Link + lien visio | ❓ 3 à 14 j | ✅ 7 à 14 j | 8,25 h par session (préparation 6 h, animation 1,25 h, logistique 1 h, hyp.) | Frais Stripe ✅ | Au moins 70 % des inscrits présents ; note au moins 4/5 | Moins de 5 inscrits sur 2 sessions |
| Abonnement enseignant | Professeur ou école | 6 €/mois (hyp.) | Application avec comptes (à développer) | > 60 j | > 70 j | 40 à 80 h de développement + mise en conformité RGPD (hyp.) | Frais Stripe Billing ❓ | Classes actives par semaine | Moins de 5 inscrits en liste d'attente |

**Pourquoi l'abonnement n'est pas une première vente.** Il exige des comptes, un serveur et des **données d'enfants** : consentement parental et sécurité. Il ne peut pas produire de vente en 30 jours. Je le garde comme suite possible, déclenchée si des acheteurs du kit réclament des outils renouvelés (même idée que Codex).

### 2.2 Deux moyens de paiement pour mon scénario
| | **Stripe Payment Links** (recommandé) | Gumroad (comparaison) |
|---|---|---|
| Frais | ✅ 1,5 % + 0,25 € par carte standard de l'EEE ; 2,8 % + 0,25 € par carte premium de l'EEE ; 2,5 % + 0,25 € par carte britannique ; 3,15 % + 0,25 € par carte internationale (+ 2 % en cas de conversion). Pas de frais mensuels. *stripe.com/fr/pricing, consulté le 24/11/2026* | ✅ 10 % + 0,50 $ par vente directe, **sans compter** le traitement de la carte (2,9 % + 0,30 $) ni les frais PayPal ; 30 % pour les ventes issues de Discover. *gumroad.com/help/article/66, consulté le 24/11/2026* |
| Versements | ✅ 1er virement « généralement sous 7 à 14 jours » après le 1er paiement réel, puis selon la fréquence du compte. *docs.stripe.com/payouts, consulté le 24/11/2026* | ✅ Minimum de **100 USD** ; paiement en EUR en France ; 7 jours de rétention (rythmes hebdomadaire, mensuel ou trimestriel) ; virement bancaire en « quelques jours ouvrés ». *gumroad.com/help/article/13, consulté le 24/11/2026* |
| TVA | Le vendeur est responsable. En micro-entreprise sous la franchise : ✅ seuil de **37 500 €** pour les services (tolérance 41 250 €), inchangé en 2026 ; mention « TVA non applicable, art. 293 B du CGI ». *entreprendre.service-public.gouv.fr F21746, vérifié le 01/01/2026* | ✅ Gumroad est « Merchant of Record » depuis le 01/01/2025 et collecte la taxe. ❓ La TVA est-elle **ajoutée** au prix de 29 € ou **incluse** ? Ce n'est pas précisé pour les produits numériques. Effet : le prix final peut différer de 29 €, ce qui contredit l'exigence de prix final clair. À trancher par un achat test. |
| Livraison et reçu | ✅ Reçus automatiques et remboursements sans code ; redirection vers une URL de confirmation (avec l'identifiant de session) après le paiement. *docs.stripe.com/payment-links, consulté le 24/11/2026* | Téléchargement et reçu intégrés (page d'aide citée dans `05-SOURCES`, non relue) |
| Pour qui | Petit volume, prix final simple, fonds rapides, facture B2B possible | Vendeur qui veut déléguer la TVA mondiale et la livraison |

**Mon choix : Stripe.** À 3 ventes, Gumroad n'a encore rien versé (seuil de 100 USD), et le prix final payé par l'acheteur reste incertain. Gumroad redeviendrait préférable si l'offre visait beaucoup d'acheteurs hors de France et que la gestion de la TVA devenait le vrai sujet.

---

## 3. Parcours, du bouton au virement

```
Carnet (/fr/) : carte « Fiche de la semaine »
  └─ lien « Vous êtes enseignant ? Kit de suivi (payant, 29 €) »
       → /fr/kit-enseignant/ : contenu, aperçu gratuit (PDF), prix final, format, licence,
         remboursement, lien « Renoncer au contrat ici », CGV, identité du vendeur, contact
       → bouton « Acheter, 29 € » → page de paiement Stripe hébergée (e-mail, nom, carte)
       → paiement accepté → reçu Stripe automatique par e-mail
       → redirection vers /fr/kit-enseignant/merci/?session={CHECKOUT_SESSION_ID} (noindex)
            → téléchargement du PDF + rappel de la licence
       → sous 24 h : e-mail de confirmation avec le PDF, plus une facture si l'acheteur est un professionnel
       → solde Stripe → 1er virement sous 7 à 14 jours → relevé bancaire
       → registre : n° de commande, montant facturé, frais, net, date et montant du virement
```

### Le site statique peut-il rester statique ?
Oui, pour la vente. **Une exception : la fonctionnalité de rétractation en ligne.** ✅ Le professionnel doit mettre à disposition une fonctionnalité gratuite, « facilement accessible, visible » pendant les 14 jours. Elle porte une mention du type « renoncer au contrat ici », un bouton de confirmation, puis un accusé de réception « sur un support durable » (*F23455, vérifié le 19/06/2026*).
- Un lien `mailto:` ne suffit pas : il faut un formulaire hébergé avec accusé de réception automatique. 📌 Prendre un formulaire tiers, ou une petite fonction Cloudflare. ❓ Outil à choisir, et sa conformité à vérifier.
- ⚠️ Pour un contenu numérique fourni immédiatement, le droit de rétractation peut se perdre si l'acheteur donne son accord exprès et reconnaît cette perte (Code de la consommation, art. L221-28, 13° : **non relu aujourd'hui**, Légifrance inaccessible depuis cette session).
- 📌 Plus simple et plus rassurant : un **remboursement volontaire sous 14 jours**, en gardant la fonctionnalité de rétractation.

### Fichiers à modifier
| Fichier | Changement |
|---|---|
| `config.json` | `editor_mode: "professionnel"` et champs d'identité ; `kit_url` (lien Stripe, ajouté **après** la recette) ; `kit_price` |
| `src/pages/fr/kit-enseignant.html` (nouveau) | Page d'offre |
| `src/pages/fr/kit-merci.html` (nouveau) | Page de remerciement, `noindex`, hors du sitemap |
| `src/pages/fr/cgv.html`, `src/pages/fr/retractation.html` (nouveaux) | Conditions de vente ; rétractation, avec le lien vers le formulaire |
| `src/templates/app.html` + `src/assets/app.js` | Attribut `data-kit` ; le lien apparaît sous la fiche de la semaine **uniquement sur /fr/** |
| `build.py` | Méta `robots` par page (noindex pour la page de remerciement) ; exclure ces pages du sitemap ; lien CGV dans le pied de page en français |
| `_headers` | `/kit/*` → `X-Robots-Tag: noindex` |
| `dist/kit/v1-<jeton>/kit-suivi-hifz.pdf` | Le kit, à une adresse difficile à deviner. Risque accepté pour le test : le lien peut être partagé. |

Aucune clé d'API sur le site : uniquement l'URL publique du lien de paiement.

### Test de recette (avant toute ouverture)
1. Mode test Stripe :
   - carte de test acceptée → redirection → téléchargement sur iPhone (Safari) et Android (Chrome) ;
   - carte refusée → aucun accès ;
   - remboursement depuis le tableau de bord.
2. Le prix est identique sur la page d'offre, le paiement et le reçu : 29,00 €.
3. Le paiement ne demande ni nom d'enfant ni donnée de récitation : seulement e-mail, nom et carte.
4. Pages en ligne : mentions professionnelles, CGV, rétractation (demande → confirmation → accusé de réception reçu).
5. **Mode réel** : un achat de 29 € par toi, puis remboursement.
   - Vérifier la ligne de frais (0,69 € pour une carte standard, 1,06 € pour une carte premium).
   - Vérifier la date du 1er virement programmé.
   - Noter le tout dans le registre.
6. Le registre distingue les ventes, le solde Stripe et les virements reçus.

### Dépendances de mise en ligne
| Dépendance | Détail | Statut |
|---|---|---|
| Statut d'entreprise | ✅ Immatriculation en ligne au guichet des formalités des entreprises, « au plus tôt 1 mois avant le début d'activité » (*F36746, vérifié le 18/03/2026*) | ❓ délai d'obtention non publié |
| Identité publique | ✅ Un entrepreneur individuel doit afficher ses nom, prénoms et adresse, plus son numéro d'immatriculation (*F37351, vérifié le 13/10/2026*) | **La fin de l'anonymat est un coût personnel** ; une domiciliation est possible (❓ coût) |
| Compte Stripe activé | Identité + IBAN | ❓ délai |
| Kit v1 + aperçu gratuit | À produire | 📌 6 à 8 h |
| Site en ligne + domaine | Guide `PUBLIER.md` | à faire |
| Taux de cotisations | ❓ Page URSSAF en erreur 404 le 24/11 ; classement BIC ou BNC de la vente de PDF à confirmer avec l'URSSAF ou un expert-comptable | Change le net, pas la décision |

---

## 4. Chiffrage à 0, 3 et 10 ventes

Hypothèses : toutes les cartes sont des cartes standard de l'EEE, sauf mention contraire. Franchise de TVA. Pour Gumroad, 1 USD = 0,87 € (**taux non vérifié**) et des frais calculés sur 29 € hors taxe (❓).

### Kit à 29 € via Stripe (mon scénario)
| | 0 vente | 3 ventes | 10 ventes |
|---|---|---|---|
| Facturé | 0 € | 87,00 € | 290,00 € |
| Frais Stripe (0,69 € par carte standard → 1,06 € par carte premium) | 0 € | 2,07 € → 3,18 € | 6,90 € → 10,60 € |
| TVA | 0 € | 0 € (franchise) | 0 € |
| Solde Stripe | 0 € | 84,93 € → 83,82 € | 283,10 € → 279,40 € |
| Virement | — | Totalité du solde, 1er virement sous 7 à 14 j ✅ | Idem |
| Cotisations sociales | 0 € | t × 87 € (t ❓ ; à 25 %, hypothèse : 21,75 €) | t × 290 € (à 25 % : 72,50 €) |

### Kit à 29 € via Gumroad (scénario Codex)
| | 0 vente | 3 ventes | 10 ventes |
|---|---|---|---|
| Facturé (hors TVA collectée par Gumroad) | 0 € | 87,00 € | 290,00 € |
| Frais (10 % + 2,9 % + 0,80 $ par vente ≈ 4,44 €) | 0 € | ≈ 13,32 € | ≈ 44,40 € |
| TVA | — | collectée par Gumroad ; ❓ ajoutée (prix payé 34,80 € pour un acheteur français) ou incluse | idem |
| Solde Gumroad | 0 € | ≈ 73,68 € | ≈ 245,60 € |
| Virement | — | **0 €** : sous le seuil de 100 USD (≈ 87 €, hyp.) | ≈ 245,60 €, après 7 jours de rétention puis paiement hebdomadaire |
| Cotisations | — | ❓ base à confirmer (montant versé ou chiffre d'affaires ?) | idem |

### Atelier parents à 15 € via Stripe (solution de repli)
| | 0 inscrit | 3 inscrits | 10 inscrits |
|---|---|---|---|
| Facturé | 0 € | 45,00 € | 150,00 € |
| Frais Stripe (0,48 € par inscription) | 0 € | 1,44 € | 4,80 € |
| Solde | 0 € | 43,56 € (sous le seuil de 5 → annulation et remboursement ; frais conservés ❓) | 145,20 € |
| Temps (hyp.) | 1 h (page d'inscription) | 1 h + temps de remboursement | 8,25 h → **≈ 17,60 €/h** avant cotisations |

Ce que les chiffres montrent :
- À ce volume, **aucun scénario ne constitue un revenu**. Le test sert à savoir si des gens paient.
- L'écart Stripe/Gumroad (2,07 € contre 13,32 € de frais à 3 ventes) compte moins que l'**accès aux fonds** : avec Gumroad, rien n'est versé à 3 ventes.

---

## 5. Feuille de route
| Date | Étape | Livrable |
|---|---|---|
| 25 nov.–4 déc. | **3 décisions** (§ 7) ; seuils du pilote figés ; dépôt de l'immatriculation début décembre si le statut est validé (début d'activité au 4 janvier) | Décisions écrites |
| 7–20 déc. | **Pilote gratuit, sans aucune vente** pour ne pas fausser l'usage. Le 13 déc., entretien « problème » de 10 min avec les 2 enseignants (comment informent-ils les parents aujourd'hui, en combien de temps), sans présenter d'offre | Notes, résultats d'usage dans leur propre colonne |
| 14–20 déc. | Liste de 20 à 30 professeurs **rémunérés** francophones, à partir de contacts **professionnels publics** (sites de cours, fiches d'établissement), dans le respect des conditions des plateformes | Liste qualifiée |
| 21–23 déc. | Analyse du pilote ; contenu du kit ajusté. Si 0 enseignant sur 2 juge la fiche utile, revoir le kit avant de le vendre | Kit v1 défini |
| 28 déc.–8 janv. | Production du kit, pages d'offre, CGV et rétractation ; recette en mode test ; achat réel puis remboursement (**décision séparée**) | Recette signée |
| **Lun. 11 janv. = J0** | Message aux 20 contacts sur 3 jours ; 1 seule relance à J+5 | Tableau de suivi commercial |
| **J14 = 25 janv.** | Seuils J14 | Décision |
| **J30 = 10 févr.** | Seuils J30. ⚠️ Le Ramadan 1448 devrait commencer vers le 8 février 2027 (date astronomique, non vérifiée) : les enseignants seront moins disponibles en fin de test | Décision |

### Message d'approche (62 mots, B2B, avec opposition)
> Bonjour [Prénom], je suis [Prénom Nom], créateur d'Our Quran Time, un carnet gratuit pour mémoriser le Coran en famille. Pour les professeurs qui suivent plusieurs élèves, j'ai conçu un kit imprimable : fiche de séance, tableau de classe et bilan hebdomadaire à envoyer aux parents. Aperçu gratuit : [lien]. Kit complet : 29 €. Votre avis, même négatif, m'aiderait. Répondez « STOP » pour ne plus être contacté.

✅ Cadre légal : pour un professionnel, la prospection par e-mail est possible s'il est informé et peut s'y opposer ; chaque envoi doit permettre l'opposition. Pour un particulier, son **consentement préalable** est requis (*cnil.fr, « La prospection commerciale par courrier électronique… », 10/06/2026*). Conséquence : on n'envoie pas ce message à froid à un enseignant **bénévole** ; on passe par une recommandation de vive voix ou par l'adresse de l'association.

### Seuils de décision (test payant, distinct du pilote)
Compter séparément : contactés, personnes ayant vu le prix, commandes payées, remboursements, acheteurs qui utilisent le kit, virements reçus, refus avec leur motif en une phrase.
- **J14** :
  - **au moins 3 commandes payées** sur au moins 12 personnes ayant vu le prix → on continue ;
  - 1 ou 2 commandes → 5 entretiens avec des non-acheteurs, puis **une seule** variable changée (prix ou contenu) et 14 jours de plus ;
  - **0 commande** → arrêt du kit professeur ; on passe à la solution de repli (atelier parents) ou à la licence établissement **seulement** si des enseignants ont dit « mon école paierait ».
- **J30** :
  - **au moins 5 commandes cumulées**, au plus 1 remboursement, **au moins 2 acheteurs** qui déclarent l'avoir utilisé avec de vrais élèves, **un virement reçu** → version 2 (licence établissement, éventuellement une version anglaise) ;
  - sinon arrêt, avec les enseignements notés.

---

## 6. Notation sur la grille (calcul : poids × note ÷ 5)

| Critère | Poids | Codex /5 | Claude /5 | Justification |
|---|---|---|---|---|
| Besoin concret et preuve d'intention d'achat | 25 | 2 | 2 | **Aucune preuve dans les deux cas.** L'acheteur de mon scénario a un mobile économique, mais ce n'est qu'une hypothèse. Je ne me donne pas de point de plus sans donnée. |
| Temps et coût jusqu'aux premières ventes | 20 | 3 | 3 | Codex : 7 à 11 h, hors formalités. Moi : 16 à 18 h, mais formalités, CGV et rétractation comprises. Le même prérequis (statut) s'applique aux deux. |
| Marge, coûts de paiement et accès aux fonds | 20 | 2 | 4 | Gumroad : environ 15 % de frais et **0 € versé à 3 ventes** (seuil de 100 USD) ; prix final incertain si la TVA s'ajoute. Stripe : 2,4 à 3,7 % de frais, 1er virement sous 7 à 14 j, prix final = prix affiché. |
| Accès aux acheteurs sans audience | 15 | 2 | 3 | Codex ne dit pas d'où viennent les « 10 enseignants qualifiés », et les bénévoles ne peuvent pas être démarchés à froid par e-mail. Mon segment professionnel peut l'être (CNIL, B2B avec opposition). |
| Exécution, support et maintenance | 10 | 4 | 3 | Gumroad automatise livraison, reçus et remboursements. Mon parcours ajoute un e-mail de secours, des factures et un formulaire de rétractation. |
| Confiance, confidentialité et clarté | 10 | 4 | 4 | Les deux séparent le gratuit du payant, sans donnée d'enfant. Codex : aperçu gratuit et mention « kit en français ». Moi : prix final identique et facture professionnelle. |
| **Total** | **100** | **52** | **61** | |

**Non évalué** : la disposition réelle à payer (inconnue pour les deux), le délai d'obtention du SIRET, le délai d'activation de Stripe, le taux URSSAF 2026.

⚠️ **Biais** : je note mon propre scénario. L'écart (9 points) tient à deux critères **vérifiables sur pièces**, sans test : l'accès aux fonds et le cadre légal du démarchage. Il ne tient pas à une meilleure intuition du besoin. Pour départager au moindre coût le seul point incertain, le segment d'acheteurs : **même kit, même prix, même message**, envoyés à 10 professeurs rémunérés et à 10 responsables d'écoles du week-end (via l'adresse de l'association). On compare la conversion de chaque groupe à J14.

---

## 7. Verdict

**Une offre hybride** :
- **De Codex, je garde** :
  - le contenu du kit (trame, fiches, tableau de classe, messages, guide) ;
  - l'aperçu gratuit ;
  - l'interdiction des remises individuelles ;
  - le décompte des personnes qui ont **vu le prix** ;
  - la mention « kit en français » ;
  - les critères à 30 jours (remboursements, usage, temps passé, virement) ;
  - l'idée de ne tester l'abonnement que si des acheteurs le demandent.
- **De mon scénario, je garde** :
  - l'acheteur (professeurs **rémunérés**, plus un groupe « écoles » pour départager) ;
  - **Stripe Payment Links** plutôt que Gumroad (fonds accessibles dès la 1re vente, prix final net) ;
  - le démarchage B2B conforme aux règles de la CNIL ;
  - le bilan hebdomadaire au parent comme argument central ;
  - le remboursement volontaire sous 14 jours et la fonctionnalité de rétractation ;
  - l'absence de toute page du Moushaf dans le produit payant ;
  - l'atelier parents comme solution de repli.

### Les trois décisions à prendre en premier (avant le 4 décembre)
1. **Statut et identité publique** : créer ou non une micro-entreprise, en acceptant que ton nom et ton adresse (ou une domiciliation) apparaissent sur le site. Sans cela, aucune vente n'est possible. Le dépôt début décembre permet un début d'activité le 4 janvier.
2. **Prestataire de paiement** : Stripe Payment Links (recommandé) ou Gumroad. Ce choix fixe les mentions de vente, le traitement de la TVA et le délai des fonds. L'ouverture du compte fera l'objet d'une décision séparée.
3. **Acheteur cible et seuils** : professeurs rémunérés (et groupe « écoles »), 29 €, seuils J14 et J30 ci-dessus, et **aucune vente pendant le pilote gratuit** pour ne pas fausser les mesures d'usage.

---

## Sources consultées le 24/11/2026
- Stripe, tarifs France : https://stripe.com/fr/pricing
- Stripe, virements (« premier virement… sous 7 à 14 jours ») : https://docs.stripe.com/payouts
- Stripe, liens de paiement (reçus automatiques, redirection après paiement) : https://docs.stripe.com/payment-links et https://docs.stripe.com/payment-links/post-payment
- Gumroad, frais : https://gumroad.com/help/article/66-gumroads-fees ; tarifs et « Merchant of Record » depuis le 01/01/2025 : https://gumroad.com/pricing
- Gumroad, versements (seuil de 100 USD, EUR pour la France, rétention de 7 jours) : https://gumroad.com/help/article/13-getting-paid
- Gumroad, taxes : https://gumroad.com/help/article/121-sales-tax-on-gumroad (ne dit pas si la TVA est ajoutée ou incluse pour les produits numériques)
- Commerce en ligne, rétractation et fonctionnalité de rétractation (vérifié le 19/06/2026) : https://entreprendre.service-public.gouv.fr/vosdroits/F23455
- Mentions obligatoires (vérifié le 13/10/2026) : https://entreprendre.service-public.gouv.fr/vosdroits/F37351
- Immatriculation d'une micro-entreprise (vérifié le 18/03/2026) : https://entreprendre.service-public.gouv.fr/vosdroits/F36746
- Franchise en base de TVA, seuils 2026 (vérifié le 01/01/2026) : https://entreprendre.service-public.gouv.fr/vosdroits/F21746
- CNIL, prospection par courrier électronique (10/06/2026) : https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique
- **Non vérifiés** : taux URSSAF 2026 (page en erreur 404) ; Code de la consommation, art. L221-28, 13° (Légifrance inaccessible depuis la session) ; délais du SIRET et de l'activation Stripe ; taux de change USD/EUR.
