# Récap — nettoyage realme Note 70T (27/11/2026)

## Contexte
- Téléphone : realme Note 70T (RMX5313), Android 16, version `RMX5313GDPR_16_C.18`. Déjà à jour.
- Problème : pubs omniprésentes.
- ROM alternative (LineageOS, etc.) : écartée. Aucune n'existe pour ce modèle, le bootloader n'est pas déverrouillable proprement, le risque de casse est réel.

## Décisions validées et actions faites
- Outil : lanceur Windows `LANCER-WINDOWS.bat` (autonome) + script `debloat.sh`, via ADB. Page de téléchargement : https://claude.ai/artifact/QbsfxYCp8WaD7PZKDcQjUQ
- Option 2 appliquée : statistiques realme, App Market, navigateur realme, carrousel de l'écran de verrouillage, Facebook (3 composants), puis Taboola et l'installateur Amazon (nouvelle version).
- Option 7 appliquée : 12 applis gadgets supprimées (lampe-launcher, « tapez des mains », scanner, farces, vieillissement du visage, etc.).

## Diagnostic clé
- La source principale des pubs est la soixantaine de petits jeux gratuits installés, pas le système realme.

## Points en suspens
- Décision : supprimer Temu, Amazon et les 63 jeux (option 8 du lanceur, 65 paquets vérifiés un à un). À lancer.
- `com.crypto.exchange` : appli non identifiée. À vérifier ; la supprimer si elle est inconnue.
- Option 3 (liste optionnelle, dont `com.oplus.commercial` au rôle non documenté) : non appliquée.
- Vérifier, après un redémarrage, que les retraits tiennent (option 1 = simulation).

## Prochaines étapes
1. Redémarrer le téléphone.
2. Lancer l'option 8 (jeux, Temu, Amazon), puis redémarrer.
3. Le lendemain : relancer l'option 1 et vérifier que rien n'est revenu.

## Retour arrière
- Option 4 du lanceur : remet toutes les applis système retirées.
- Applis gadgets et jeux supprimés : à réinstaller depuis le Play Store.
