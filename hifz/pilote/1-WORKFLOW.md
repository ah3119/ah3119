# Pilote Sakina Quran Planner — déroulé complet

**Objectif du pilote** : savoir si des parents utilisent le carnet **plusieurs fois par semaine pendant 2 semaines** avec leur enfant, et s'ils reprennent après une séance manquée. Ce n'est pas un test de trafic ni de revenus.

**Format** : 10 familles (enfants de 5 à 12 ans environ qui apprennent Juz ʿAmma) et 2 enseignants, du **lundi 7 au dimanche 20 décembre 2026**, en français.

> ⚠️ Vacances scolaires de Noël en France : du 19 décembre 2026 au 4 janvier 2027 (à vérifier sur education.gouv.fr). Le pilote se termine juste avant, pendant que les routines familiales sont encore normales.

---

## Vue d'ensemble

| Partie | Période | Qui | Temps pour toi |
|---|---|---|---|
| 1. Mise en ligne | 24 → 27 nov. | Toi, avec Claude | ≈ 2 h |
| 2. Recrutement | 25 nov. → 4 déc. | Toi | ≈ 2 h |
| 3. Démarrage | lun. 7 déc. | Toi | ≈ 30 min |
| 4. Pilote | 7 → 20 déc. | Familles ; toi pour les messages | ≈ 15 min/jour au maximum |
| 5. Bilan et décision | 21 → 23 déc. | Toi, avec Claude | ≈ 2 h |
| 6. Après le pilote | janv. 2027 | Toi, avec Claude | selon la décision |

Coût : **≈ 10-15 € par an** (nom de domaine). L'hébergement Cloudflare Pages est gratuit (⚠️ conditions à revérifier au moment de l'inscription).

---

## Partie 1 — Mise en ligne (24 → 27 novembre)

1. **Nom** : « Sakina Quran Planner » (signature « by Sakina Kids »). Vérifier :
   - que le domaine est libre (sakinaquranplan.com ; en option sakinaquranplanner.com en redirection) chez un registraire ;
   - qu'aucune marque identique n'est déposée pour des services éducatifs : recherche gratuite sur [data.inpi.fr](https://data.inpi.fr) et [euipo.europa.eu](https://euipo.europa.eu/eSearch/).
2. **M'envoyer** :
   - le domaine choisi ;
   - les informations d'éditeur pour les mentions légales (nom, statut / SIRET, adresse, téléphone) ;
   - l'e-mail de contact ;
   - en option, les liens de récitations Sakina Kids par sourate, pour remplacer les liens Quran.com.

   Je mets à jour `config.json` et je régénère le site.
3. **Cloudflare Pages** :
   - créer un compte gratuit ;
   - *Workers & Pages → Create → Pages → Upload assets* ;
   - déposer le dossier `hifz/dist/` ;
   - *Custom domains* : brancher le domaine.
4. **Test sur 2 téléphones** (un iPhone et un Android), environ 15 min :
   - [ ] créer un plan « Al-Fatiha et les 3 Qul » ;
   - [ ] cocher « Récité », puis revenir le lendemain : le passage suivant apparaît ;
   - [ ] « Ajouter un rappel à l'agenda » : le rappel arrive à l'heure choisie ;
   - [ ] « Copier la fiche pour l'enseignant » puis la coller dans WhatsApp : c'est lisible ;
   - [ ] « Imprimer la fiche » (sur ordinateur) : elle tient sur une page.
5. Ajouter le site à l'écran d'accueil du téléphone (menu Partager → « Sur l'écran d'accueil »). C'est ce que tu montreras aux familles.

## Partie 2 — Recrutement (25 novembre → 4 décembre)

- **Cible** : 10 familles, plus 2 ou 3 de réserve (certaines abandonnent avant de commencer). Les enfants apprennent ou veulent apprendre Juz ʿAmma. Les deux parents n'ont pas besoin de parler arabe.
- **2 enseignants** (madrasa, école du week-end, enseignant particulier) qui suivent au moins un des enfants.
- **Canaux** : ta communauté Sakina Kids (story et post), puis le bouche-à-oreille et les enseignants. Textes prêts dans `2-MESSAGES.md`.
- **Organisation** :
  - Utilise une **liste de diffusion WhatsApp** ou une communauté avec un canal d'annonces, **pas un groupe** : dans un groupe, chaque participant voit les numéros des autres.
  - Donne à chaque famille un code (F01 à F12) dans `4-suivi-pilote.csv`. N'écris pas les prénoms des enfants dans le fichier.
- **Ce que tu dis clairement aux familles** :
  - c'est gratuit et bénévole ;
  - l'appli ne collecte aucune donnée (tout reste sur leur téléphone) ;
  - on leur demandera 2 avis courts (J7 et J14).

## Partie 3 — Démarrage (lundi 7 décembre)

1. Envoyer le message « Lancement » (`2-MESSAGES.md`, C) avec le lien et le guide en 3 étapes.
2. Envoyer aux enseignants le message dédié (H1).
3. Le soir, noter dans `4-suivi-pilote.csv` qui a confirmé avoir créé son plan. Une famille peut répondre simplement « ✅ ».

## Partie 4 — Pendant le pilote (7 → 20 décembre)

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

## Partie 5 — Bilan et décision (21 → 23 décembre)

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

## Partie 6 — Après le pilote (janvier 2027)

1. Corrections issues du pilote.
2. Relecture de l'anglais (et de l'arabe si on l'ajoute) par des locuteurs natifs.
3. Lancement public **avant le Ramadan** (⚠️ début estimé vers le 8 février 2027, à confirmer) : vidéos Sakina Kids, page publique, Search Console.
4. Puis, seulement si l'usage se confirme :
   - le carnet guidé facultatif (exercices de révision, bilan hebdomadaire) ;
   - ensuite, une version pour les enseignants.

La publicité, la carte de partage et les pages par sourate restent en attente.
