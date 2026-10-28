# Projets du portfolio

Un projet = un fichier Markdown dans ce dossier. Le nom du fichier est le slug :
`turbofix-mecanique.md` génère `/realisations/turbofix-mecanique` et `/en/work/turbofix-mecanique`.

Le schéma est validé par `src/content.config.ts` : un champ manquant fait échouer la compilation.

## Champs

| Champ | Rôle |
| --- | --- |
| `titre` (fr, en) | Nom du projet, H1 de l'étude de cas |
| `titreSeo` (fr, en) | Début du `<title>`, avant « \| Patrick Laperrière ». 44 caractères au plus |
| `accroche` (fr, en) | Phrase sous le titre et sur les cartes |
| `description` (fr, en) | Meta description écrite à la main, 160 caractères au plus |
| `client` | Nom du client affiché |
| `rôle` (fr, en) | Ce que j'ai fait |
| `stack` | Outils ou points clés (section « En bref »). Un point à traduire s'écrit `{ fr: "…", en: "…" }` |
| `défi`, `réalisation`, `résultat` (fr, en) | Les trois sections de l'étude de cas |
| `terrain` (fr, en), facultatif | Section « Utilisé sur le terrain » |
| `témoignage`, facultatif | `citation` (fr, en), `auteur`, `fonction` (fr, en). Seulement avec l'accord écrit du client |
| `lien` | URL du site en ligne (vide tant que le site n'est pas en ligne) |
| `enLigne` | `false` : la fiche affiche « Pas encore en ligne », sans bouton ni lien |
| `aFournir` | Faits manquants : affichés `[À FOURNIR : …]` avec `npm run dev` seulement, jamais dans un build |
| `image` | Capture 1280×800 en WebP dans `public/work/`, plus une variante `-640.webp` à côté pour les téléphones. Vide : pas de cadre, la fiche s'affiche sans image |
| `ordre` | Position dans la liste (1 = premier) |
| `statut` | `brouillon` : visible seulement avec `npm run dev`, absent du build. `publié` : en ligne. `en_cours` : en ligne avec un badge « En cours » |
| `preuve` | 1 à 4 faits courts et vérifiables (fr, en), affichés sur la page Réalisations avec une coche |
| `période`, `rôleCourt` (fr, en) | Facultatifs, carte vedette : années affichées (ex. « 2025–2026 ») et rôle en une ligne |
| `grille` | Carte de la page Réalisations : `colonnes` (sur 12) et `ratio` du média (ex. `"21 / 9"`). Une rangée incomplète est complétée par sa dernière carte |
| `année`, `catégorie` (saas, web, seo, shopify), `vedette`, `accent`, `cadrage` (cover, contain) | Présentation |

Le corps du fichier (sous le frontmatter) sert aux notes internes. Il n'est jamais affiché.

## Garde-fou

Tant qu'un champ contient `À CONFIRMER`, le projet ne peut pas être publié : la compilation échoue
si `statut` n'est pas `brouillon` et qu'une valeur affichée contient encore ce marqueur.

Exception : `terrain` et `témoignage` peuvent garder le marqueur sur un projet publié. Ils s'affichent
alors avec `npm run dev` seulement et sont retirés du build jusqu'à confirmation.

## Image de partage

`npm run og` génère `public/og/project-<slug>.png` pour chaque projet publié.
