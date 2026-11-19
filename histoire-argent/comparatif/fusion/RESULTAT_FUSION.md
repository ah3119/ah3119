# Résultat de la fusion Claude × ChatGPT · 19/11/2026

ChatGPT a rendu une charte « Le Registre imprimé » (2 pages), un storyboard du Short (7 scènes, 53 s) et un script Python qui génère ces PDF.
Il n'a pas suivi les messages 2 et 3 du protocole : la comparaison ci-dessous est faite par Claude. Elle n'est donc pas neutre, mais les écarts au brief sont factuels.

## Comparaison
| Critère | Claude | ChatGPT | Retenu |
|---|---|---|---|
| Respect du brief (nom, rythme, 10-12 scènes) | ✅ Fortunes & Ruines, ~3 mots/s, 11 scènes | ❌ ancien nom, 125 mots/min, 7 scènes | Claude |
| Direction artistique | Dossier d'enquête noir, jaune, rouge | Papier crème et encre verte, proche de la v2 rejetée par Alaa | Claude |
| Production | Vidéo Remotion animée, bruitages, tests | Images fixes en PDF, polices Windows | Claude |
| Rigueur des chiffres | Courbe avec valeurs intermédiaires inventées | Deux points sourcés seulement, mention « schéma » | **ChatGPT** |
| Honnêteté du chiffre clé | « ×20 » | « presque ×20 » | **ChatGPT** |
| Explication de la chute | « Les gros porteurs réclament l'or » (simplifié) | Rachat des actions par la banque, l'édit, le retrait de l'édit | **ChatGPT** |
| Placement du tampon | Sur la courbe | Sur l'édit du 21 mai | **ChatGPT** (et cohérent avec le concept « dossier ») |
| Réserve pour les sous-titres | Oui | Oui, explicite | Égalité |

## Ce qui a été intégré
1. Compteur avec la mention « Paliers intermédiaires : schéma ». La courbe aux valeurs inventées est retirée du Short.
2. « Presque vingt fois plus » à l'oral et « PRESQUE ×20 » sur la miniature.
3. Scène v08 : « Pour tenir le prix, la banque rachète les actions. Avec toujours plus de billets. » (presse, mars 1720).
4. Scène v09 : l'édit du 21 mai 1720 en document, avec le tampon KRACH posé dessus.
5. Scène v10 : « L'édit est retiré. Mais la confiance ne revient pas. »
6. Mention « RECONSTITUTION » sur les documents d'époque.

## Ce qui n'a pas été repris, et pourquoi
- La palette papier et vert, et le nom « L'Histoire de l'Argent » : déjà rejetés par Alaa.
- Les polices Georgia, Bahnschrift et Consolas : polices système Windows, absentes de Linux et de Remotion, et moins distinctives.
- Le rythme de 125 mots par minute et les scènes de 8 à 10 s : contraires au rythme rapide demandé.
- La génération de PDF en Python : le projet produit des vidéos, pas des planches.

---

# Second tour · fusion finale (19/11, soir)
ChatGPT a vu la version de Claude et livré un patch (`ep01-short-fusion`). Claude l'a appliqué tel quel, puis a jugé à l'image.

## Gardé de ChatGPT (il avait raison)
- Script en 10 plans, 107 mots, 44,6 s : seuls 500 (mai 1719) et environ 10 000 (hiver 1719-1720) sont affichés, sans valeur interpolée.
- Mécanisme exact en deux opérations distinctes : titres de dette → actions, puis actions → billets (Velde, sections 5.1 et 6.1).
- Édit du 21 mai, puis son retrait le 27 mai (Velde, section 6.2).
- Chute : « La confiance ne se décrète pas. »
- Polices embarquées avec Fontsource, au lieu d'un téléchargement depuis Google pendant le rendu.
- Composants `ActionPrice`, `Transaction`, `Certificate`, la nouvelle miniature, et 2 tests de plus.

## Changé par Claude (énergie visuelle)
- f01 : « 500 » géant qui frappe, devant la presse bien visible, avec un titre d'action plus petit.
- f02 : « 10 000 » au-dessus de la foule de la rue Quincampoix et de son bandeau.
- f09 : les billets qui brûlent, avec « La méfiance demeure. », au lieu d'un troisième document statique.
- Correctif : `--concurrency=6` était codé en dur et faisait échouer le rendu sur une machine à 4 cœurs.

Version officielle : composition `ep01-short-fusion`, rendu avec `npm run render:fusion`.
