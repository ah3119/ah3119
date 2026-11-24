# Our Quran Time : workflow pour intégrer des revenus

## 1. Diagnostic
- ✅ Le produit existe, il est publiable et gratuit, en 10 langues, avec le mushaf officiel. Coût fixe : environ 10-12 € par an (domaine) ; hébergement gratuit.
- ✅ Il n'y a **ni compte, ni serveur, ni e-mail collecté**. C'est un atout pour la confiance et la vie privée, mais aussi le principal frein à la monétisation : on ne connaît pas ses utilisateurs et on ne peut pas les recontacter.
- ❓ **Aucune preuve d'usage pour l'instant.** Le pilote (10 familles) doit dire si les parents reviennent à J7 et à J14, et si les enseignants s'en servent. Sans cette preuve, toute monétisation est prématurée.
- ✅ L'outil sert un public religieux qui attend de la sobriété. Une monétisation mal choisie (publicité intrusive, Coran derrière un mur payant) détruirait la confiance, et c'est précisément elle qui fait la valeur du produit.

## 2. Risques et angles morts
1. **Publicité (AdSense)** : c'est la voie la plus facile à brancher (prévue dans `config.json`), mais à éviter au départ.
   - On ne contrôle pas parfaitement les annonces affichées (musique, images, jeux d'argent) à côté de pages du Coran destinées à des enfants.
   - Le revenu par visiteur d'un site de niche à faible trafic est très faible : je n'ai pas de chiffre fiable, donc je n'en donne pas.
   - Il faudrait aussi un bandeau de consentement certifié en Europe.
2. **Usage commercial des pages du mushaf** : la page du Complexe du Roi Fahd autorise les applications, programmes éducatifs et sites web, mais **ne dit rien de l'usage commercial**. Aucun produit payant ne doit contenir ces pages sans confirmation écrite du Complexe.
3. **Dons à titre personnel** : leur traitement fiscal en France est à vérifier (micro-entreprise ou association loi 1901 ?). Une association est souvent mieux adaptée pour collecter des dons, mais seul un expert-comptable ou l'URSSAF peut trancher pour ton cas.
4. **Mentions légales** : dès le premier euro, le mode « particulier » n'est plus valable. Il faut passer en « professionnel » (nom, statut, SIRET, adresse publiés).
5. **Données d'enfants** : un espace enseignant avec comptes signifie des données de mineurs sur un serveur. Cela exige consentement parental, RGPD renforcé et sécurité. C'est un vrai chantier, pas un réglage.
6. **Traductions non relues** : faire de la promotion payante dans une langue non relue, c'est risquer une erreur visible sur des termes religieux.

## 3. Options
| | Prudente | **Recommandée** | Ambitieuse |
|---|---|---|---|
| Principe | Dons seulement | Dons, puis « espace enseignant » payant validé par le pilote | Plateforme écoles + produits imprimés + partenariats |
| Revenu | Faible, irrégulier | Récurrent si les écoles adhèrent | Le plus élevé, mais le plus long |
| Effort | 1 heure | 2-3 mois de développement après validation | 6 mois et plus, statut et partenaires |
| Risque pour la confiance | Nul | Faible : les familles restent gratuites | Moyen : dispersion |
| Ce qui reste gratuit | Tout | Tout le carnet familial | Le carnet familial |

**Pourquoi l'option recommandée.** La valeur payante la plus crédible n'est pas chez le parent, qui trouve des outils gratuits, mais chez l'**enseignant ou l'école**. Un enseignant qui suit 15 à 30 élèves gagne un temps réel avec un tableau de bord qui reçoit les fiches de la semaine. Le pilote teste déjà les enseignants : c'est le bon endroit pour valider cette hypothèse avant de coder quoi que ce soit.

## 4. Workflow, dans l'ordre (le « quand » compte autant que le « quoi »)

### Maintenant → fin du pilote (20 décembre, ou 17 janvier si prétest) : on ne monétise pas, on mesure
1. Publier le site (guide `publication/PUBLIER.md`).
2. Faire relire **le français** (pilote), puis 1 ou 2 langues prioritaires (voir § 5).
3. Ajouter 2 questions au questionnaire J14 :
   - aux familles : « Si ce carnet disparaissait demain, seriez-vous : très déçu / un peu / pas du tout ? » (mesure d'attachement, plus fiable qu'une question de prix) ;
   - aux enseignants : « Un espace où vous recevez automatiquement la fiche de chaque élève vous ferait-il gagner du temps ? Votre école paierait-elle pour cela ? Combien par mois et par classe ? »
4. Activer Cloudflare Web Analytics (sans cookies) pour connaître les visites par langue.

### Bilan du pilote : décision chiffrée (go / no-go)
- **Go** si : au moins 6 familles sur 10 utilisent encore le carnet à J14, **et** au moins 2 enseignants disent que leur école paierait.
- Sinon : améliorer le produit et refaire un pilote. Pas de monétisation.

### Janvier 2027 : premier revenu, sans rien abîmer
5. **Statut** : rendez-vous avec un expert-comptable pour choisir entre micro-entreprise et association. Décider avant d'encaisser.
6. **Passer les mentions légales en mode « professionnel »** : remplir `config.json`, puis `python3 build.py --zip` et redéployer.
7. **Bouton « Soutenir le projet »** : déjà prévu dans le pied de page (`support_url` dans `config.json`), traduit dans les 10 langues. Plateformes possibles : LaunchGood (dons de la communauté musulmane), Ko-fi ou Stripe. Comparer les frais au moment de choisir (⚠️ non vérifiés ici).
8. **Liste d'attente « Espace enseignant »** : une page simple « Bientôt : recevez les fiches de vos élèves », avec formulaire d'e-mail. C'est un test de demande avant de développer.

### Février-mars 2027 : le Ramadan, fenêtre majeure
- ⚠️ Le Ramadan 1448 devrait commencer vers le 8 février 2027 (date astronomique approximative, à confirmer). C'est la période de l'année où l'engagement autour du Coran est le plus fort.
9. Campagne « Défi hifz du Ramadan en famille », dans les langues relues : messages pour les groupes de parents et les mosquées, carte de partage « sourate apprise » déjà intégrée.
10. Proposer à des mosquées ou associations de **parrainer** le projet pendant le Ramadan (« carnet offert grâce à… »), sans publicité dans le carnet.

### Avril-juin 2027 : l'espace enseignant (seulement si le go est validé)
11. Version 1 minimale : l'enseignant crée une classe et reçoit un code ; le parent colle le code et la fiche part automatiquement ; tableau de la semaine pour toute la classe.
12. Technique : Cloudflare Workers + base D1, sur la même infrastructure. Données minimales : prénom ou pseudonyme et versets, sans nom de famille.
13. RGPD : consentement parental, politique de confidentialité mise à jour, suppression à la demande. C'est le point le plus lourd.
14. Tarif : à fixer d'après les réponses des enseignants (§ 4, étape 3), avec une période d'essai gratuite pour les premières écoles.

### Plus tard, en réserve
- Carnet de hifz **imprimé** pour enfants (impression à la demande), sans pages du mushaf tant que l'usage commercial n'est pas confirmé par écrit.
- Affiliation (mushafs, livres jeunesse), seulement dans les pages d'information, jamais dans le carnet.
- Publicité : non, sauf changement d'avis argumenté une fois le trafic connu.

## 5. Langues à faire relire en premier, pour la croissance
Ordre conseillé, selon le nombre de musulmans concernés et la facilité à trouver des relecteurs (⚠️ jugement, pas une étude) :
1. **Français** (pilote) ;
2. **Arabe** ;
3. **Indonésien** et **bengali** : deux des plus grandes populations musulmanes ;
4. **Anglais** (diaspora, Royaume-Uni, États-Unis).

Les autres langues restent en ligne, mais sans promotion tant qu'elles n'ont pas été relues.

## 6. Ordre de grandeur, sans chiffre inventé
Revenu des dons = familles actives par mois × part qui donne × montant moyen.
Exemple purement hypothétique : 1 000 familles actives × 1 % × 5 € = 50 € par mois.
Conclusion : **les dons couvrent les frais, ils ne font pas un revenu.** Le revenu viendra des écoles, ou ne viendra pas de ce produit seul.

## 7. Prochaine étape concrète
**Acheter `ourqurantime.com` et publier le site (guide `publication/PUBLIER.md`).** Aucune monétisation n'a de sens avant que les familles du pilote l'utilisent.
