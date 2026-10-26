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
| `stack` | Technologies, dans l'ordre d'importance |
| `défi`, `réalisation`, `résultat` (fr, en) | Les trois sections de l'étude de cas |
| `lien` | URL du site en ligne |
| `image` | Capture 1280×800 en WebP dans `public/work/` |
| `ordre` | Position dans la liste (1 = premier) |
| `publié` | `false` = brouillon : visible seulement avec `npm run dev`, absent du build |
| `année`, `catégorie` (saas, web, seo, shopify), `vedette`, `accent`, `cadrage` (cover, contain) | Présentation |

Le corps du fichier (sous le frontmatter) sert aux notes internes. Il n'est jamais affiché.

## Garde-fou

Tant qu'un champ contient `À CONFIRMER`, le projet ne peut pas être publié : la compilation échoue
si `publié: true` et qu'une valeur affichée contient encore ce marqueur.

## Image de partage

`npm run og` génère `public/og/project-<slug>.png` pour chaque projet publié.
