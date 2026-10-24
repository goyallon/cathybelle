# Cathy Belle — artiste peintre

Portfolio statique et CV artistique, en HTML, CSS et JavaScript. Aucun outil de compilation ni service externe n’est nécessaire.

## Organisation

```text
index.html                   Accueil, œuvres, présentation, atelier et contact
cv.html                      CV, expositions et galerie de photographies
assets/css/                  Styles communs et styles du CV
assets/js/                   Catalogue des œuvres et interactions des deux pages
images/oeuvres/              Peintures florales
images/rectified/            Peintures abstraites redressées
images/expositions/          Les 26 photographies issues de l’archive
images/cathy-belle-atelier.jpg Portrait recadré pour le CV
images/parcours-map.svg      Carte stylisée des lieux d’exposition
scripts/                    Scripts de rectification des originaux locaux
```

## Aperçu local

Depuis la racine : `python -m http.server 8000`, puis ouvrir http://localhost:8000.

## GitHub Pages

Dans **Settings → Pages**, choisir **Deploy from a branch**, **main**, puis **/(root)**. Le fichier `.nojekyll` publie directement les fichiers statiques. Tous les liens sont relatifs et fonctionnent avec un dépôt de projet.

Adresse prévue après activation : https://goyallon.github.io/cathybelle/

Un dépôt privé nécessite une offre GitHub compatible (Pro pour un compte personnel). Le site publié est public. GitHub Free nécessite un dépôt public pour Pages.

Pour un domaine OVH : renseigner le domaine définitif dans **Settings → Pages → Custom domain**, configurer la zone DNS et activer **Enforce HTTPS**. Aucun domaine personnalisé n’est encore configuré.

## Modifier les contenus

- `assets/js/works.js` : images, titres et descriptions des 12 peintures. Les sept légendes florales restent descriptives en attendant les titres officiels.
- `index.html` : présentation et coordonnées.
- `cv.html` : parcours et mosaïque de 26 photos en fond de la section des expositions.
- `assets/css/cv.css` : présentation du CV, carte et mosaïque responsive.

Les photos d’exposition sont présentées sans attribution de date ou de lieu non confirmé. Les documents ODT, archives ZIP, doublons, originaux de travail et outils locaux d’authentification restent exclus de Git. Aucun token n’est stocké dans le dépôt.

Les scripts de rectification s’exécutent depuis `scripts/` et utilisent les photographies originales conservées localement à la racine (Pillow et NumPy requis).

Les œuvres et photographies restent la propriété de leurs ayants droit.
