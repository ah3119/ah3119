# L'Histoire de l'Argent — plan de chaîne de A à Z
Version 1 · 18/11/2026 · décisions arbitrées par Claude, sur mandat d'Alaa (« valide tout »)

Légende : ✅ établi (source officielle) · ⚠️ probable ou source secondaire · ❓ hypothèse à tester

---

## 1. Décisions verrouillées

| Sujet | Décision | Raison |
|---|---|---|
| Niche | **Histoire financière racontée** : bulles, krachs, arnaques, empires business | Elle hérite de la prime de RPM finance sans conseil en placement, donc reste compatible halal. Les sujets ne vieillissent pas : un épisode sur 1720 reste regardé en 2030. |
| Nom | **L'Histoire de l'Argent** | Clair, cherchable, et traduisible en « The History of Money » pour le doublage. |
| Handle | `@HistoireDeLArgent`, sinon `@LHistoireDeLArgent`, sinon `@HistoireArgent` | Le même handle sur YouTube, TikTok et Instagram. |
| Langue | **Français d'abord**, anglais en piste audio doublée à partir du 4e mois | Il faut d'abord valider le format sur un seul marché, puis viser le RPM américain. |
| Voix | **`Sakina-Kids-FR-IVC` (`LRnruiHfyadbJQKy1AZn`)**, la voix d'Alaa, validée le 19/11. La même voix que Sakina Kids. | Point bloquant : ElevenLabs refuse les clones instantanés avec l'offre actuelle (test du 19/11). Il faut passer au moins à Starter. Le clone professionnel `Sakina-Kids-FR-PVC-V1` ⚠️ demande l'offre Creator. |
| Cadence | 1 vidéo longue (7–10 min) et 3 Shorts par semaine | Plafond fixé dans le récap pour ne pas cannibaliser Sakina. |
| Plateformes | YouTube (long + Shorts) en principal ; TikTok et Instagram Reels reçoivent les mêmes 9:16 | Une seule production, trois diffusions. |
| Publicité payante | **Aucune pendant 90 jours** | Payer pour des vues avant d'avoir validé la rétention brûle du cash et pollue les signaux de l'algorithme. |

## 2. Identité visuelle : charte officielle v2 (19/11)
Référence unique : `branding/CHARTE.html`, publiée sur https://claude.ai/artifact/4jqmXQ1cjTGETARb77UQ8H. Elle remplace la v1 (noir et or).
- **Concept** : la chaîne est un billet de banque. Encre verte fiduciaire, papier, guilloché, numéro de série, tampon rouge.
- **Accroche officielle** : « L'argent a une mémoire. » Version longue : « L'argent a une mémoire. Nous la racontons. » Phrase de fin en voix : « L'argent oublie vite. Nous, non. »
- **Logo** : rosace guillochée calculée et monogramme « HA », dont le A est rouge. Fichiers `branding/logo-mark.svg`, `logo-mark-paper.svg`, `avatar.png`.
- **Couleurs** : encre profonde `#0B241A`, encre `#123829`, papier `#F2ECDC`, rouge numéroteur `#C23A2B`, or `#B8913A`. Proportions : encre 70, papier 20, rouge 8, or 2.
- **Polices** : Bodoni Moda (titres), Anton (chiffres), IBM Plex Mono (numéros, dates), IBM Plex Sans (texte).
- **Signature animée** : la rosace se trace, le numéroteur fait défiler les chiffres, le tampon rouge tombe une fois par épisode.
- **Miniatures** : le nom, la démesure, le verdict (modèle : `branding/thumb-ep01.png`).
- Pour regénérer les visuels : `npm run assets`. Les couleurs et polices viennent de `config/theme.json`, la source unique.

## 3. Textes de la chaîne

**Description YouTube** (le début est ce qui apparaît dans la recherche) :
> L'argent a une mémoire. Nous la racontons : bulles, krachs, arnaques et empires, en animation. Chaque chiffre est sourcé, chaque épisode finit par une leçon. Ce n'est pas du conseil en investissement, c'est de l'histoire.
> Nouvel épisode chaque semaine.

**Bio TikTok et Instagram** (80 caractères max) :
> L'argent a une mémoire. Bulles, krachs, arnaques, racontés et sourcés.

**Mots-clés de chaîne** : histoire de l'argent, histoire économique, krach boursier, bulle spéculative, arnaque célèbre, Ponzi, histoire de la finance, économie expliquée, documentaire animé

## 4. Réglages YouTube Studio (à faire une fois)
1. **Paramètres > Chaîne > Infos de base** : pays France, mots-clés du §3.
2. **Paramètres > Paramètres par défaut de l'importation** :
   - Catégorie : **Éducation**
   - Langue de la vidéo et du titre : français
   - Licence : standard
   - Commentaires : activés, en filtrant les commentaires « potentiellement inappropriés » pour examen
   - Description par défaut : le modèle du §7
3. **Contenu modifié ou synthétique : cocher OUI.** ⚠️ La règle officielle impose la mention pour le contenu réaliste créé ou modifié par IA, dont la voix de synthèse d'une personne réelle [YouTube Help 14328491]. Un site tiers affirme que le clone de sa propre voix en est exempté, mais je ne l'ai pas confirmé. La mention ne coûte rien : YouTube indique qu'elle ne limite ni la portée ni la monétisation. On coche, sans débat.
4. **Fonctionnalités avancées** : valider le compte par téléphone, ce qui débloque les miniatures personnalisées et les vidéos de plus de 15 minutes.
5. **Personnalisation > Mise en page** : bande-annonce pour les non-abonnés = le Short 1 de John Law ; vidéo à la une pour les abonnés = le dernier épisode.
6. **Playlists dès le jour 1** : « Bulles & krachs », « Arnaques célèbres », « Empires business », « L'argent expliqué ».
7. **Monétisation (YPP)** ✅ [YouTube Help, programme Partenaire] :
   - Revenus publicitaires : 1 000 abonnés + 4 000 heures de visionnage publiques sur 12 mois, ou 10 M de vues de Shorts sur 90 jours.
   - Palier d'accès anticipé (sans pubs) : 500 abonnés + 3 vidéos en 90 jours + 3 000 heures ou 3 M de vues de Shorts.
8. **Dès l'entrée dans YPP : blocage des pubs** (YouTube Studio sur ordinateur > Monétisation > Contrôle des annonces) ✅ [support.google.com/youtube/answer/172795]. Bloquer :
   - Catégories sensibles : jeux d'argent (bloqué par défaut, vérifier), alcool, rencontres, astrologie / voyance.
   - Catégories générales : Crédit et prêts, Assurances, Courtage et trading, Cryptomonnaies, Prêts immobiliers, Cartes de crédit.
   - Le RPM baissera, c'est assumé : on garde la prime « finance » de l'audience, pas celle des annonceurs. Le filtrage reste imparfait, d'où la question en suspens au savant (§14).

## 5. Réglages TikTok
- Passer en **compte Pro > Créateur**, catégorie Éducation.
- **Contenu généré par l'IA : activer le label** à chaque publication. ⚠️ TikTok l'exige pour le contenu réaliste généré par IA, et une voix clonée entre dans ce cas.
- Toujours publier en 9:16, en 1080×1920 haute qualité. Pas de lien externe avant d'y être éligible.
- **Creator Rewards** ⚠️ (sources secondaires, à vérifier dans TikTok Studio) : 10 000 abonnés, 100 000 vues sur 30 jours, vidéos originales de plus de **1 minute**, 18 ans minimum ; la France figure dans la plupart des listes. Conséquence : faire **1 Short sur 3 entre 61 et 75 s** pour TikTok.
- Publier entre 18 h et 21 h, heure de Paris. ❓ C'est une hypothèse de départ, à recaler sur les statistiques après 4 semaines.

## 6. Réglages Instagram
- Compte professionnel > Créateur, catégorie « Éducation ».
- Reels repostés tels quels, **sans watermark TikTok**. Les exports viennent directement de Remotion, donc aucun watermark.
- Label « IA » (Meta) activé pour la voix clonée.
- Lien en bio : la chaîne YouTube, puis plus tard une page de liens avec la newsletter.

## 7. Modèles de publication

**Titre** : on écrit trois variantes et on garde la plus concrète. Formules :
- [Personnage] + [conséquence démesurée] : « L'Écossais qui a ruiné la France »
- [Chiffre absurde] + [objet banal] : « Une tulipe au prix d'une maison »
- [Question qui dérange] : « Pourquoi personne n'a arrêté Madoff ? »
- Règles : moins de 60 caractères, pas de majuscules à tous les mots, pas de « INCROYABLE ». L'émotion vient du fait, pas de l'adjectif.

**Miniature** : un visage ou une silhouette, un chiffre, une courbe. Trois mots maximum. Fond sombre et or ; le rouge seulement s'il y a un krach. Elle doit rester lisible en 160 px de large (tester dans Studio > aperçu mobile).

**Description vidéo** :
```
[1 phrase qui reformule le hook]

Chapitres
00:00 …

Sources
[S1] …
[S2] …

Cette vidéo raconte l'histoire, ce n'est pas un conseil financier.
Narration : voix d'Alaa, clonée avec ElevenLabs.
#histoire #économie #[sujet]
```

**Commentaire épinglé** : une question qui ouvre le débat, par exemple : « Qui, aujourd'hui, ressemble le plus à John Law ? »

**Écran de fin** : l'épisode suivant de la même playlist et le bouton s'abonner. Les 20 dernières secondes ne contiennent que la leçon, pas de contenu neuf.

## 8. Banque de hooks (les 3 premières secondes)
Règle : une image forte et une phrase qui crée un manque à combler. Jamais « Bonjour, aujourd'hui on va parler de… ».
1. « En 1719, une action coûte 500 livres. Un an plus tard, 10 000. Ce qui suit a ruiné un royaume. » (Velde 2003 ; Moen)
2. « Cette fleur a coûté plus cher qu'une maison à Amsterdam. »
3. « Il a volé 65 milliards de dollars, et la police avait été prévenue neuf ans avant. » ⚠️ (chiffres Madoff à sourcer)
4. « Dans ce pays, un pain coûtait le matin moins cher que le soir. »
5. « Votre banque n'a pas l'argent que vous croyez y avoir déposé. »
6. « Il a vendu un pont qui ne lui appartenait pas. Plusieurs fois. » ⚠️
7. « Le jour où l'action la plus sûre du monde a perdu 90 %. »
8. « Il était condamné à mort à Londres. Six ans plus tard, il dirigeait les finances du royaume de France. » (Murphy 1997)
9. « Il a donné son nom à l'arnaque. Il n'en était même pas l'inventeur. » (Ponzi)
10. « Pourquoi IKEA ne vous livre pas les meubles montés ? La réponse vaut des milliards. »

## 9. Calendrier de lancement (les 12 premiers épisodes)
| # | Épisode | Playlist |
|---|---|---|
| 1 | John Law, l'Écossais qui a ruiné la France (1720) | Bulles & krachs |
| 2 | La tulipe qui valait une maison (1637) | Bulles & krachs |
| 3 | Charles Ponzi : l'homme qui a donné son nom à l'arnaque | Arnaques |
| 4 | Weimar 1923 : quand un pain coûtait des milliards | Bulles & krachs |
| 5 | Comment les banques créent l'argent | L'argent expliqué |
| 6 | Madoff : 17 ans de mensonge ⚠️ (durée à sourcer) | Arnaques |
| 7 | IKEA : l'empire du meuble en kit | Empires |
| 8 | 1929 : le jeudi noir | Bulles & krachs |
| 9 | FTX : la chute en dix jours ⚠️ | Arnaques |
| 10 | L'inflation expliquée avec une baguette | L'argent expliqué |
| 11 | Zara : la mode en deux semaines | Empires |
| 12 | La bulle des mers du Sud : Newton aussi a perdu | Bulles & krachs |

Alterner les playlists sert à voir quel format retient le mieux. Après 8 épisodes, on double la série gagnante.

## 10. Routine hebdomadaire avec Claude Code
| Jour | Tâche | Durée estimée ❓ |
|---|---|---|
| Lundi | Claude écrit le script sourcé et liste les chiffres à vérifier ; Alaa relit | 1 h |
| Mardi | Voix ElevenLabs (clone) ; Claude recale les durées des scènes sur l'audio | 30 min |
| Mercredi | Scènes Remotion, rendu 16:9 et trois rendus 9:16 | 1–2 h |
| Jeudi | Miniature, titre, description, programmation de la publication | 30 min |
| Samedi, 10 h | Publication de la vidéo longue ; Shorts mardi, jeudi et dimanche | — |

Commande type dans Claude Code : « Épisode N : [sujet]. Suis PLAN_CHAINE.md et le modèle ep01-john-law. »

## 11. Croissance
- Les Shorts sont des **bandes-annonces** de la vidéo longue (lien « vidéo associée » sur YouTube), pas des contenus isolés.
- Répondre à tous les commentaires pendant les 2 premières heures, les 4 premières semaines.
- Collaborations : à partir de 1 000 abonnés, proposer des échanges à des chaînes d'histoire ou d'économie FR de taille équivalente.
- Après 30 jours, si le taux de clics est faible, refaire les miniatures des vidéos les plus vues (test A/B « Tester et comparer » dans Studio ⚠️, disponibilité à vérifier sur le compte).

## 12. Monétisation, par ordre de priorité
1. **Sponsors choisis** à partir d'environ 5 000 abonnés ❓ : éditeurs de livres, applis de budget sans crédit, outils éducatifs. Liste noire : néobanques à crédit, courtiers, crypto, paris.
2. **Affiliation propre** : livres cités dans les sources (Murphy, Kindleberger…), logiciels utilisés.
3. **AdSense** avec les blocages du §4.
4. **Produit maison** au-delà de 10 000 abonnés ❓ : une fiche par épisode (« les 10 bulles de l'histoire ») ou un mini-ebook.
5. **Doublage anglais** à partir du 4e mois : piste audio multilingue sur la même vidéo ⚠️ (vérifier que la fonctionnalité est ouverte sur le compte), sinon une chaîne EN séparée.

Pas de publicité payante avant le 90e jour. Ensuite, un seul test : 50 € en « Promouvoir » YouTube sur la meilleure vidéo longue, pour mesurer le coût par abonné. On arrête si ce coût dépasse 0,50 €. ❓ Seuil arbitraire, à recaler.

## 13. Indicateurs et critères de décision
| Indicateur | Cible à 90 jours ❓ | Si raté |
|---|---|---|
| Rétention à 30 s (vidéo longue) | > 65 % | Réécrire les hooks |
| Durée moyenne de visionnage | > 40 % de la vidéo | Couper les intros, monter plus serré |
| Taux de clics des impressions | > 5 % | Refaire titres et miniatures |
| Shorts : taux de « visionnage » contre « balayage » | > 70 % | Ouvrir le Short sur le visuel le plus fort |
| Abonnés | 1 000 | Voir la règle d'arrêt |

**Règle d'arrêt et de pivot** : si les 12 premiers épisodes n'atteignent pas ensemble 300 abonnés et que la rétention à 30 s reste sous 50 %, on change le format (plus court, plus centré sur les arnaques) avant de produire davantage. On ne lance pas de 13e épisode « pour voir ».

## 14. Risques et points ouverts
- **Clone vocal à créer** (bloquant) : 1 à 3 minutes d'audio propre pour un clone instantané ; davantage pour un clone professionnel ⚠️ (durées à vérifier dans la doc ElevenLabs).
- **Erreur factuelle** : la liste « À vérifier » de chaque script doit être vide avant d'enregistrer la voix.
- **Contenu répétitif ou produit en masse** : une vraie opinion et une leçon dans chaque épisode, un seul format à la fois.
- **Dispersion avec Sakina** : le plafond hebdomadaire est ferme.
- ❓ Avis d'un savant sur les revenus des pubs qui passent malgré le filtrage.

## Sources
- YouTube Help, contrôle des annonces : https://support.google.com/youtube/answer/172795
- YouTube Help, divulgation du contenu IA : https://support.google.com/youtube/answer/14328491
- YouTube Blog, divulgation du contenu modifié ou synthétique : https://blog.youtube/news-and-events/disclosing-ai-generated-content
- Creator Rewards TikTok (sources secondaires) : https://ttcalculator.net/learn/tiktok-pay-france-earnings/ ; https://www.shortsync.app/resources/tiktok-creator-rewards-program-2026
- Seuils YPP : YouTube Help, « Programme Partenaire YouTube : présentation et conditions d'éligibilité »
