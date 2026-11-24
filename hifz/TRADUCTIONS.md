# Traductions : état et relecture

## État (24/11/2026)
- Les 10 langues sont complètes : carnet, accueil, À propos, Confidentialité, Mentions légales, visionneuse du mushaf, images d'aperçu WhatsApp. Le générateur refuse de construire le site s'il manque une seule phrase dans une langue.
- Les textes ont été **rédigés directement dans chaque langue**, pas traduits mot à mot, avec le vocabulaire des écoles de hifz du pays : *ziyadah* et *muraja'ah* en indonésien, *amparā*, *sabaq*, *sātsabaq* et *āmukhtā* en bengali, *sabaq*, *sabqī* et *manzil* en hindi, « حفظ جديد / مراجعة قريبة / مراجعة بعيدة » en arabe, noms des sourates de Ma Jian en chinois.
- ⚠️ **Aucune langue n'a encore été relue par un locuteur natif.** C'est le niveau d'un bon rédacteur, pas celui d'une validation. Avant de promouvoir le site dans une langue, faire relire cette langue (30 à 45 minutes) par une personne native, idéalement un parent ou un enseignant de Coran.

## Qui fait relire quoi
| Langue | Public visé | Points à faire valider en priorité |
|---|---|---|
| Arabe | Monde arabe, Maghreb | Termes « حفظ جديد / مراجعة قريبة / مراجعة بعيدة » ; tutoiement au masculin générique ; chiffres latins (choix actuel) ou indo-arabes ? |
| Ourdou | (non publié) | Fichier archivé dans `src/i18n/archive-v1/` : à refaire si l'ourdou est ajouté |
| Bengali | Bangladesh, Bengale-Occidental | Noms des sourates en bengali ; « নতুন সবক / সাম্প্রতিক রিভিশন / পুরোনো রিভিশন » ; chiffres bengalis |
| Hindi | Musulmans de l'Inde du Nord | Noms des sourates en devanagari ; registre hindi/ourdou (सबक़, दोहराई, उस्ताद) |
| Indonésien | Indonésie, Malaisie (en partie) | *Lancar / Ulangi / setoran / muraja'ah* ; « Agenda hafalan » |
| Chinois | Musulmans hui, diaspora | Noms des sourates de Ma Jian (开端章…), « 节 » pour verset, « 感赞真主 » |
| Russe | Russie, Asie centrale, Caucase | Translittérations (Аль-Фатиха…) ; pluriels ; « Рассказано » pour « récité » |
| Espagnol | Amérique latine, Espagne | « aleya » ou « aya » ; tutoiement |
| Portugais | Brésil d'abord | « surata / versículo » (usage de la traduction d'Helmi Nasr) ; « você » |
| Français, anglais | Pilote | Déjà relus pendant la conception |

## Fichiers à donner au relecteur
- Textes du carnet : `src/i18n/<langue>.json` (sections `ui`, `app`, `home`, `legal`).
- Pages : `src/pages/<langue>/about.html`, `privacy.html`, `legal.html`.
- Noms des sourates : `src/data/surah_names.json` (chinois, hindi, bengali, russe).
- Le plus simple pour un relecteur : ouvrir le site dans sa langue sur son téléphone, créer un plan, puis noter ce qui sonne faux, avec une capture d'écran.

## Message type au relecteur (à adapter)
> Assalamu alaykum, je lance un carnet gratuit pour aider les parents à faire mémoriser le Coran à leurs enfants. Il existe en [langue]. Pourriez-vous l'ouvrir sur votre téléphone (ourqurantime.com/[code]/), créer un plan d'essai, et me signaler en 30 minutes tout ce qui ne sonne pas naturel, surtout les termes religieux ? Une capture d'écran suffit. Jazakum Allahu khayran.
