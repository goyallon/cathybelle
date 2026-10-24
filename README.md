# Cathy Belle — artiste peintre

Portfolio statique, inspiré de la galerie du thème Starving Artist, avec une réalisation HTML/CSS/JavaScript personnalisée. Aucun outil de compilation ni service externe.

## Aperçu local

Depuis ce dossier : `python -m http.server 8000`, puis ouvrir http://localhost:8000.

## GitHub Pages

Les fichiers du site sont à la racine du dépôt. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis **main** et **/(root)**. Le fichier `.nojekyll` permet de publier le HTML, le CSS et le JavaScript directement.

Adresse prévue après activation : https://goyallon.github.io/cathybelle/

Le dépôt peut rester privé avec une offre GitHub compatible (Pro pour un compte personnel). Le site publié est public. Un compte GitHub Free nécessite un dépôt public pour GitHub Pages.

Pour utiliser un domaine acheté chez OVH, le déclarer dans **Settings → Pages → Custom domain**, configurer sa zone DNS, puis activer **Enforce HTTPS**. Aucun domaine personnalisé n’est configuré tant que le nom définitif n’a pas été fourni.

Tous les chemins sont relatifs pour fonctionner aussi dans un dépôt de projet.

## Contenus

- `works.js` : fichiers, titres, légendes et textes alternatifs des douze peintures, sans répéter les fichiers identiques.
- Les sept légendes florales sont descriptives et doivent être remplacées par les titres officiels lorsqu’ils seront fournis.
- Les titres Rouge Baiser, Vibration Musicale et Carnaval sont retranscrits des photographies.
- `index.html` : présentation, démarche, atelier et coordonnées, adaptés du document fourni.
- `cv.html` et `cv.css` : CV artistique, portrait recadré et carte des lieux d’exposition.
- `style.css` : thème majoritairement blanc, responsive et respect de la préférence de réduction des animations.
- Les documents ODT, doublons et photographies de travail sont conservés localement et exclus de Git. Seules les images utilisées par le site sont publiées.

La consultation au clic propose les flèches gauche/droite et la touche Échap. Le contact utilise les applications e-mail et téléphone du visiteur.

Les œuvres et photographies restent la propriété de leurs ayants droit.
