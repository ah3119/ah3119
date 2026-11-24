# Référence de confiance pour le Coran

Décision d'Alaa du 24/11/2026 : le **Complexe du Roi Fahd pour l'impression du Saint Coran** est la source de référence pour le Coran et les contenus associés, **dans tous les projets** (Our Quran Time, Sakina Kids, Sakina…).

## 1. Ce que le Complexe publie (constaté sur son site le 24/11/2026)
Le site indique être en « lancement expérimental » (الإطلاق التجريبي) : l'offre peut évoluer.

| Ressource | État au 24/11/2026 | Usage chez nous |
|---|---|---|
| **Mushaf de Médine numérique, lecture Hafs**, 604 pages vectorielles (format AI, compatible PDF), zip de 423,3 Mo | ✅ Téléchargeable sur https://qurancomplex.gov.sa/mushaf-printing | Intégré dans Our Quran Time : les 604 pages, converties en images web |
| Polices Unicode du texte coranique (Hafs, Shuʿba, Warsh, Qālūn, al-Sūsī, al-Dūrī) | ⏳ « Bientôt » (قريباً) | À intégrer dès leur sortie, pour afficher le texte des versets |
| Applications Mushaf al-Madina (Hafs, Warsh) | ✅ App Store et Google Play | À recommander aux familles qui veulent tout le mushaf hors ligne |
| Traductions audio du sens, mushaf en braille, autres polices | ⏳ « Bientôt » | À surveiller |

## 2. Fichier officiel téléchargé
- Nom : `1441-mushaf-hafs-ai.zip`. Taille : 443 825 492 octets. Dernière modification annoncée par le serveur : 16/11/2026.
- Empreinte SHA-256 publiée par le Complexe : `C2FA8D93A7C4F689B58EB32756E1AE56CD1B7CE4826F63E09723BE8B092224FB`.
- ✅ **Empreinte recalculée après téléchargement le 24/11/2026 : identique.** Le fichier est intact et authentique.
- Contenu : 604 fichiers `NNN___Hafs39__DM.ai`, un par page, produits par le Complexe.
- Le zip (423 Mo) n'est pas conservé dans le dépôt. Pour le retélécharger et le reconvertir : `hifz/tools/render_mushaf.py`, puis `hifz/tools/trim_mushaf.py`.

## 3. Autorisation d'usage (texte du Complexe, page « mushaf-printing »)
> « وقد تم ولله الحمد اعتماد نشر هذا الإنتاج الرقمي المبارك لجميع عموم المسلمين لوجه الله تعالى، ليستفاد منه في الكثير من التطبيقات الحاسوبية، والبرامج التعليمية، والمواقع الإلكترونية المختلفة »

Traduction : la publication de cette production numérique a été approuvée, pour tous les musulmans et pour l'agrément d'Allah, afin qu'elle serve dans les applications informatiques, les programmes éducatifs et les sites web.

- ✅ L'usage dans un site éducatif gratuit est explicitement prévu.
- ⚠️ **Non précisé sur la page** : l'usage commercial (produit payant, publicité) et une éventuelle obligation de mention. Avant toute version payante qui inclut ces pages, écrire au Complexe pour obtenir une confirmation écrite. En attendant, nous citons toujours la source, sans jamais modifier le contenu des pages : seuls la résolution et le recadrage des marges blanches changent.

## 4. Contrôle de cohérence effectué
Les données de découpage du carnet (bibliothèque quran-meta) ont été comparées aux pages officielles. Concordance sur les pages contrôlées :
- p. 1 : Al-Fātiḥa 1–7 ; p. 2 : Al-Baqara 1–5 ; p. 151 : Al-Aʿrāf 1–11 ; p. 377 : An-Naml 1–13 ; p. 562 : Al-Mulk 1–12 ; p. 582 : An-Nabaʾ 1–30 ; p. 604 : Al-Ikhlāṣ 1 → An-Nās 6.

## 5. Règles pour tous les projets
1. Ne jamais écrire, recopier ni générer le texte arabe du Coran de mémoire, ni par une IA. Il doit venir d'une source officielle.
2. Toute référence (sourate, verset, page, juz) se vérifie contre le Mushaf de Médine (Hafs).
3. Une traduction est toujours une « traduction du sens », avec le nom du traducteur.
4. Mention à afficher avec les pages : « Mushaf de Médine (Hafs) · Complexe du Roi Fahd pour l'impression du Saint Coran ».
5. Dans les vidéos (Sakina Kids), un verset montré à l'écran est une capture de la page officielle, ou un texte issu de la police officielle quand elle sera publiée.

## 6. À coller dans les skills Sakina (sakina-batch-format, sakina-prompt-library, sakina-qa-protocol)
Ces skills sont dans ton compte Claude, pas dans ce dépôt : je ne peux pas les modifier d'ici. Ajoute ce bloc dans chacun :

```
## Référence Coran (obligatoire)
Source unique : Mushaf de Médine, lecture Hafs ʿan ʿĀṣim, Complexe du Roi Fahd (qurancomplex.gov.sa/mushaf-printing), 604 pages, 6 236 versets.
- Aucun texte arabe coranique écrit de mémoire ni généré par IA (VEO, ChatGPT Image, ElevenLabs compris) : capture de la page officielle ou texte de la police officielle.
- Chaque référence sourate:verset est vérifiée contre ce mushaf avant production.
- QA : refuser tout épisode dont un verset affiché ou récité n'a pas été vérifié contre la source.
```
