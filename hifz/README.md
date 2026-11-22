# Sakina Hifz — carnet de mémorisation du Coran pour les familles (version pilote)

**Aperçu en ligne (privé, version française) :** https://claude.ai/artifact/79K9MCZ99eTHYjLTpMs5Er

## Où trouver quoi
| Besoin | Fichier |
|---|---|
| Lancer le pilote pas à pas | **`pilote/1-WORKFLOW.md`** |
| Messages prêts à copier (familles, enseignants, vidéos) | `pilote/2-MESSAGES.md` |
| Questionnaires J7 / J14 / enseignants | `pilote/3-QUESTIONNAIRES.md` |
| Tableau de suivi (sans prénoms) | `pilote/4-suivi-pilote.csv` |
| Le site à mettre en ligne | `dist/` (à déposer sur Cloudflare Pages) |
| Réglages (nom, domaine, éditeur, langues, liens d'écoute) | `config.json`, puis `python3 build.py` |

## Le produit
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
- **Écoute** : liens vers Quran.com par défaut. Pour utiliser les récitations Sakina Kids, remplir `listen` dans `config.json`, par exemple `"114": "https://www.youtube.com/watch?v=..."`.

## Validation (navigateur, dates figées, 18 scénarios, tous réussis)
- Coche conservée après un changement de rythme (le verset 1 reste acquis, le passage suivant devient 2 à 4).
- Séances passées non faites : signalées, jamais comptées comme réussies.
- « Reporter » décale la fin estimée ; « À revoir » fait revenir le passage.
- Date cible exacte (sourates 114 à 112 avant le 26/11 → 5 versets par séance) ; objectif impossible signalé.
- Révision seule, et révision qui continue après la dernière leçon.
- Fiche : 7 jours, texte pour l'enseignant, une seule page A4 à l'impression (PDF dans `apercus/`).
- Deux enfants séparés, lien de sauvegarde importé sans prénom, rappel d'agenda récurrent.
- Téléphone en 390 px sans débordement, français et anglais sans clé non traduite, aucune erreur JavaScript.

## Données
- Découpage des sourates et des versets (lecture Hafs) : `quran-meta` 7.0.0 (MIT).
- Noms des sourates : `quran-json` 3.1.2 (**CC BY-SA 4.0** : c'est le fichier de licence qui fait foi).
- Crédits sur la page À propos.

## En pause jusqu'au bilan du pilote
Pages « How to memorize Surah X » (`"surah_pages": false`), carte de partage publique, publicité, langues autres que le français et l'anglais, mode « lignes du mushaf ».
