# Publier Our Quran Time — guide pas à pas

**Durée** : environ 45 minutes. **Coût** : le prix du domaine, environ 10-12 € par an (⚠️ prix exact affiché par Cloudflare au moment de l'achat). L'hébergement est gratuit.
**À préparer** : une carte bancaire et ton adresse e-mail personnelle.
**Fichier à envoyer** : `ourqurantime-site.zip` (56 Mo, 675 fichiers). C'est le site complet : 10 langues, et les 604 pages du Mushaf de Médine du Complexe du Roi Fahd. Il est fourni à part (trop lourd pour le dépôt) ; pour le refaire : `python3 build.py --zip`.

**Adresses** : l'anglais est à la racine (`ourqurantime.com`), les autres langues ont leur dossier : `/fr/`, `/ar/`, `/zh/`, `/hi/`, `/es/`, `/bn/`, `/pt/`, `/ru/`, `/id/`. **Pour les familles du pilote, partage `https://ourqurantime.com/fr/`.**

> Vérification du 24 novembre 2026 : **ourqurantime.com n'était pas enregistré**. Le registre officiel des .com (Verisign) répondait « introuvable », alors qu'il répond normalement pour un domaine existant. Achète-le rapidement : un domaine libre peut partir à tout moment.
>
> ⚠️ Les noms des menus Cloudflare ci-dessous datent de fin 2026 et peuvent légèrement changer. Cherche le libellé le plus proche.

---

## Étape 1 — Créer le compte Cloudflare (5 min)
1. Va sur **cloudflare.com**, clique sur **Sign up** et crée le compte avec ton e-mail personnel.
2. Confirme l'e-mail reçu.

Ce compte porte ton identité : c'est ce qui permet au site d'afficher des mentions légales sans ton adresse personnelle (voir « Mode éditeur » en bas de page).

## Étape 2 — Acheter le domaine (10 min)
1. Dans le tableau de bord : **Domain Registration → Register Domains**.
2. Cherche **ourqurantime.com**, puis **Purchase** pour 1 an. Active le renouvellement automatique.
3. Renseigne tes vraies coordonnées : elles sont obligatoires pour tout achat de domaine. Cloudflare les masque dans l'annuaire public des domaines.

## Étape 3 — Mettre le site en ligne (10 min)
1. **Workers & Pages → Create**, puis l'onglet **Pages**, puis **Upload assets** (téléversement direct).
2. Nom du projet : `ourqurantime`, puis **Create project**.
3. Dépose le fichier **`ourqurantime-site.zip`**, puis **Deploy site**.
4. Ouvre l'adresse provisoire affichée (du type `https://ourqurantime.pages.dev`) : le site doit apparaître.

⚠️ Limites annoncées par Cloudflare : 20 000 fichiers par site et 25 Mo par fichier ([documentation](https://developers.cloudflare.com/pages/platform/limits/)). Le zip reste bien en dessous (675 fichiers, 104 Ko maximum chacun). Si le glisser-déposer refuse quand même le zip, décompresse-le et dépose le **dossier** à la place.

## Étape 4 — Brancher le domaine (5 min, puis quelques minutes d'attente)
1. Dans le projet : **Custom domains → Set up a custom domain**.
2. Saisis `ourqurantime.com`, puis **Continue** et **Activate domain**. Les réglages DNS se font automatiquement, puisque le domaine est chez Cloudflare.
3. Recommence avec `www.ourqurantime.com`.
4. Le cadenas HTTPS s'active automatiquement. Compte de quelques minutes à quelques heures.

## Étape 5 — Créer l'adresse contact@ourqurantime.com (5 min)
1. Clique sur ton domaine, puis **Email → Email Routing → Get started**.
2. Crée l'adresse `contact`, avec comme destination ton e-mail personnel.
3. Clique sur le lien de vérification reçu, puis sur **Add records and enable**.
4. Teste en écrivant à `contact@ourqurantime.com` depuis une autre adresse. Le message doit arriver dans ta boîte personnelle.

## Étape 6 — Vérifier avant d'annoncer (10 min)
- [ ] `https://ourqurantime.com` s'ouvre en anglais ; `https://ourqurantime.com/fr/` en français.
- [ ] Bouton 🌐 en haut à droite → « العربية » : tout le site passe en arabe, de droite à gauche ; ton plan est toujours là.
- [ ] Sur ton téléphone (`/fr/`) : créer un plan « Al-Fatiha et les 3 Qul », puis toucher « Récité ».
- [ ] Toucher « 📖 Mushaf p. 1 » : la page officielle d'Al-Fatiha s'affiche ; glisser vers la droite pour passer à la page suivante.
- [ ] « Ajouter un rappel à l'agenda » : l'événement apparaît dans ton agenda.
- [ ] « Copier la fiche pour l'enseignant », puis la coller dans WhatsApp : c'est lisible.
- [ ] Sur un ordinateur, « Imprimer la fiche » : une seule page.
- [ ] Partager le lien du site dans WhatsApp : l'aperçu vert « Our Quran Time » s'affiche (WhatsApp peut mettre quelques minutes à le récupérer).
- [ ] Menu Partager du téléphone → « Sur l'écran d'accueil » : l'icône verte apparaît.
- [ ] Pied de page → **Mentions légales** : la mention « Site édité par un particulier… » et l'hébergeur Cloudflare apparaissent.

## Étape 7 (facultative) — Statistiques de visite sans cookies
Dans le projet Pages : **Metrics → Web Analytics → Enable**.
Cette mesure Cloudflare fonctionne sans cookies (⚠️ à confirmer au moment de l'activation). Tant que c'est le cas, aucun bandeau de consentement n'est nécessaire.

## Mettre à jour le site plus tard
Je te fournis un nouveau `ourqurantime-site.zip`. Dans le projet : **Create deployment** (ou « Create new deployment »), dépose le zip, puis **Save and deploy**.
Une ancienne version peut être restaurée en un clic depuis la liste des déploiements (**Rollback**).

---

## Mode éditeur (mentions légales)
Le site est configuré en **mode « particulier »**. Les mentions légales indiquent que le site est édité à titre non professionnel par une personne qui préserve son anonymat, avec l'hébergeur (Cloudflare) et l'e-mail de contact. C'est permis par l'**article 1-1, II de la LCEN** (anciennement article 6 ; ⚠️ texte consolidé à vérifier sur Légifrance), à condition d'avoir donné ton identité à l'hébergeur, ce que fait ton compte Cloudflare.

**Dès que le site rapporte quoi que ce soit** (dons, carnet payant, publicité, affiliation), ce n'est plus non professionnel. Envoie-moi alors ton nom, ton statut et ton SIRET (micro-entreprise), ton adresse et ton téléphone : je passe le site en mode « professionnel » (une ligne dans `config.json`) et je te fournis un nouveau zip.
