# Récap — nettoyage realme Note 70T (27/11/2026)

## Contexte
- Téléphone : realme Note 70T (RMX5313), Android 16, version `RMX5313GDPR_16_C.18`. Déjà à jour.
- Problème : pubs omniprésentes.
- ROM alternative (LineageOS, etc.) : écartée. Aucune n'existe pour ce modèle, le bootloader n'est pas déverrouillable proprement, le risque de casse est réel.

## Décisions validées et actions faites
- Outil : lanceur Windows `LANCER-WINDOWS.bat` (autonome) + script `debloat.sh`, via ADB. Page de téléchargement : https://claude.ai/artifact/QbsfxYCp8WaD7PZKDcQjUQ
- Option 2 appliquée : statistiques realme, App Market, navigateur realme, carrousel de l'écran de verrouillage, Facebook (3 composants), puis Taboola et l'installateur Amazon (nouvelle version).
- Option 7 appliquée : 12 applis gadgets supprimées (lampe-launcher, « tapez des mains », scanner, farces, vieillissement du visage, etc.).
- Option 8 appliquée : 64 applis supprimées (63 jeux + Temu), 0 échec. L'installateur Amazon avait déjà été retiré par l'option 2.

- Vérifié après redémarrage : les 7 désactivations et le retrait d'Amazon tiennent.
- Taboola (`com.taboola.scoop`) : retiré, puis réinstallé par le système au redémarrage ; ensuite désactivation et retrait refusés. Protégé par realme. On ne force pas davantage.

## Diagnostic clé
- La source principale des pubs est la soixantaine de petits jeux gratuits installés, pas le système realme.

## Points en suspens
- `com.crypto.exchange` : appli non identifiée. À vérifier ; la supprimer si elle est inconnue.
- Option 3 (liste optionnelle, dont `com.oplus.commercial` au rôle non documenté) : non appliquée.
- Taboola : couper ses notifications et son activité en arrière-plan dans les Paramètres, et mettre le DNS AdGuard.

## Prochaines étapes
1. Taboola : notifications coupées, batterie « Restreint ».
2. DNS privé `dns.adguard-dns.com`.
3. Désactiver le débogage USB (et le débogage sans fil) dans les Options pour les développeurs.
4. Après chaque grosse mise à jour realme : réactiver le débogage USB, lancer l'option 1, puis l'option 2 si besoin.

## Retour arrière
- Option 4 du lanceur : remet toutes les applis système retirées.
- Applis gadgets et jeux supprimés : à réinstaller depuis le Play Store.
