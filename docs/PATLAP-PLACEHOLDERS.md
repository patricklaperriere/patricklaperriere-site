# Pat Lap : textes et liens encore manquants (avant la mise en prod)

Les placeholders sont des appels `tbc(...)` dans `src/data/patlap.ts`. En dev
(`astro dev`), ils s'affichent en jaune « À CONFIRMER PATRICK ». Le build ne
les affiche pas :
- lien Stripe absent : bouton « Bientôt disponible », désactivé ;
- vidéo absente : pas de cadre.

| N° | Quoi | Où le mettre | Rendu dans le build tant qu'il manque |
|---|---|---|---|
| 20 | Lien de paiement Stripe de la Soirée (compte au nom de Patrick) | `LIENS.stripeSoiree` | Bouton désactivé « Bientôt disponible » / « Coming soon » |
| 21 | Vidéos YouTube non répertoriées, jours 1 à 5 | `LIENS.youtube[1..5]` (ID seulement) | Pas de cadre vidéo, le geste seul |

Fait le 6 nov. : n° 17, photo de Patrick (`src/assets/pat-lap/patrick-portrait.jpg`, `PHOTOS.portrait.pret = true`). L'illustration neutre reste dans le code, au cas où la photo serait retirée.

Avant de passer `BROUILLON = false` : les deux lignes ci-dessus remplies, puis l'OK de mise en ligne de Patrick.
