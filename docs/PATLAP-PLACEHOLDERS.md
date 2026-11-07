# Pat Lap : textes et liens encore manquants (avant la mise en prod)

Les placeholders sont des appels `tbc(...)` dans `src/data/patlap.ts`. En dev
(`astro dev`), ils s'affichent en jaune « À CONFIRMER PATRICK ». Le build ne
les affiche pas :
- photo absente : illustration neutre ;
- lien Stripe absent : bouton « Bientôt disponible », désactivé ;
- vidéo absente : pas de cadre.

| N° | Quoi | Où le mettre | Rendu dans le build tant qu'il manque |
|---|---|---|---|
| 17 | Photo de Patrick (portrait, 1200 × 1500) | `public/pat-lap/pat.jpg`, puis `PHOTOS.portrait.pret = true` | Illustration neutre (téléphone + bulle) |
| 20 | Lien de paiement Stripe de la Soirée (compte au nom de Patrick) | `LIENS.stripeSoiree` | Bouton désactivé « Bientôt disponible » / « Coming soon » |
| 21 | Vidéos YouTube non répertoriées, jours 1 à 5 | `LIENS.youtube[1..5]` (ID seulement) | Pas de cadre vidéo, le geste seul |

Avant de passer `BROUILLON = false` : les trois lignes ci-dessus remplies, puis l'OK de mise en ligne de Patrick.
