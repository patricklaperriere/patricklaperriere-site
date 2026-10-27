# Audit de nuit, 27 octobre 2026

Audit complet de patricklaperriere.com sur le build local de la branche
`refonte/accueil` (commit a4ccf9a), toutes les pages FR et EN (60 fichiers HTML :
58 pages indexables, la 404 et l'extrait `signature/`). Aucune requête vers le
domaine en ligne, aucune API payante ou à clé.

Trois agents ont tourné en parallèle :

| Volet | Agent | Note | Rapport détaillé |
|---|---|---|---|
| Technique (crawl, balises, hreflang, sitemap, robots, OG, maillage, images) | seo-technical | ≈ 93/100 | [audit-nuit/technique.md](audit-nuit/technique.md) |
| Contenu (E-E-A-T, contenu daté, doublons, ton, français) | seo-content | 58/100 (accueil 80, autres pages ≈ 50) | [audit-nuit/contenu.md](audit-nuit/contenu.md) |
| Données structurées (schema.org) | seo-schema | valide, à consolider | [audit-nuit/schema.md](audit-nuit/schema.md) |

En résumé : la technique est saine, mais le contenu des pages intérieures est
en retard sur l'accueil : il est daté, parfois contradictoire, et on y trouve des
affirmations invérifiables.

## Ce qui passe déjà

- **Liens internes :**
  - aucun lien interne cassé ;
  - aucun lien vers les redirections `laval` ;
  - aucune page orpheline parmi les pages indexables.
- **Titres et balises :**
  - aucun titre ni aucune meta description en double ;
  - un seul H1 par page.
- **Canonical :** absolue, autoréférente, sur `https://www.patricklaperriere.com`, sur les 58 pages.
- **hreflang :** fr-CA, en-CA et x-default présents et réciproques partout.
- **Sitemap et robots :**
  - le sitemap liste les 58 URL, toutes construites, sans noindex et avec leurs alternatives ;
  - la 404 en est exclue (et porte un noindex) ;
  - robots.txt autorise tout et déclare le sitemap.
- **Open Graph et Twitter :** balises complètes ; chaque image référencée existe.
- **Images :** width, height et loading présents partout.
- **JSON-LD :**
  - valide sur 58 pages, avec les mêmes @id (Person, WebSite, Organization Habita) en FR et en EN ;
  - Habita reste un nœud distinct de Patrick ;
  - aucune note, aucun avis, aucun prix inventé.

## Problèmes, par priorité

### Critique (contenu)

1. **Lieux contradictoires sur les pages régionales** (`src/data/villes.ts`). Les pages disent :
   - « Je suis dans le Grand Montréal » (Montréal) ;
   - « Établi tout près » (Longueuil) ;
   - « à quelques minutes seulement » (Terrebonne).

   Cela contredit la règle « le site ne nomme aucune ville d'attache » et le numéro en 819.
2. **Montants attribués à de vrais clients** dans le concept CRM fictif
   (`ConceptsContent.astro`) :
   - HP Addik 32 k$ ;
   - Envita 14 k$ ;
   - Inspection Outaouais 8 k$.
3. **Scores Lighthouse incohérents :**
   - la copie morte « 100 » traîne dans `fr.ts` et `en.ts` ;
   - les études de cas affichent des scores ordinateur du 15 août 2026, sans date ;
   - l'accueil affiche 99 en mobile.
4. **Confidentialité :**
   - la page dit « hébergé sur Cloudflare Pages » alors que le site est sur Vercel ;
   - la personne responsable de la protection des renseignements personnels (Loi 25) n'est pas nommée ;
   - la mise à jour est datée de « juin 2026 ».
5. **Habita confondu avec Patrick** dans l'ancienne copie :
   - « mon logiciel SaaS » ;
   - « l'outil que j'aurais voulu avoir » ;
   - noms de concurrents ;
   - affirmations commerciales (BNQ, IA sans plafond) ;
   - « ma plus grande fierté ».
6. **Statut de Habita non vérifié :**
   - l'ancienne copie dit « en production, des inspecteurs s'en servent chaque jour » ;
   - la note interne parle d'une bêta sur invitation.

### Élevé (contenu)

7. Les sections « Résultat » des études de cas ne sont que des adjectifs, sans fait vérifiable. On y lit par exemple « inspecteur de référence de l'Outaouais ».
8. La page À propos n'a aucun parcours, alors que l'accueil y renvoie avec « Mon parcours ». C'est le plus gros manque E-E-A-T du site.
9. Deux listes de technologies se contredisent :
   - l'accueil : Astro, React, Supabase, Vercel ;
   - la page À propos ajoute Next.js et Tailwind, que n'utilise aucun projet montré.
10. Le portfolio ne correspond pas à l'accueil :
    - l'accueil montre Habita et BeauRegard ;
    - l'index montre Habita, IHO, HP Addik et Envita ;
    - Bâti-Conseil et BeauRegard sont en brouillon.
11. Les pages de services ne renvoient à aucune étude de cas. Leurs cartes disent « Voir les services » alors qu'elles mènent à un seul service.
12. Le formulaire de contact et les pages régionales oublient le service « Outils sur mesure ».
13. La photo de profil (jugée générée par IA) apparaît à plusieurs endroits :
    - sur l'accueil ;
    - sur la page À propos ;
    - dans chaque encadré d'auteur du blogue ;
    - dans les favicônes ;
    - dans le JSON-LD.

### Moyen

14. `/signature/design-by-patrick.html` est indexable, sans titre, sans canonical et sans lang.
15. Dix titres dépassent 60 caractères (jusqu'à 65), par exemple :
    - `/en/services/shopify-ecommerce` ;
    - `/concepts` ;
    - `/creation-site-web/gatineau`.
16. FAQPage est émis sur 18 pages. Google a retiré ce résultat enrichi en mai 2026 : il n'apporte plus rien.
17. Des nœuds schema manquent :
    - AboutPage, ContactPage, CollectionPage ;
    - un @id sur les Service ;
    - le lien `provider` vers Person.

    Par ailleurs, `email` porte « mailto: », et `jobTitle` n'a pas « product builder ».
18. Le même nœud ProfessionalService est répété en entier sur 26 pages.
19. Français :
    - apostrophes droites dans `villes.ts` et dans les métadonnées du blogue ;
    - anglicismes (dark, template, plugins, responsive, look and feel, taps, e-commerce, « #1 ») ;
    - ton parfois vantard (« français impeccable », « c'est vous qui apparaissez »).
20. Des chiffres sans source dans le blogue, par exemple « la moitié de vos clients potentiels ». L'article sur les prix ne donne aucune fourchette.
21. Concepts : 13 images en `alt=""`, et des titres qui sautent un niveau (h2 → h4). Les réalisations passent aussi de h1 à h3.

### Faible

22. Neuf pages partagent `og/default.png` (accueil, services, régions, confidentialité, 404).
23. Quatre articles du blogue et les dix pages régionales ont peu de liens entrants (2 ou 3 chacun).
24. Deux descriptions sont un peu courtes : `/en/work/envita-wellness` (118 caractères) et `/en/blog/wordpress-vs-custom-website` (129).
25. Il n'y a pas de `/en/llms.txt`. C'est facultatif.
26. Les dates des BlogPosting sont en ISO avec heure UTC, et `dateModified` est toujours égal à `datePublished`.

## Plan de correction (phases B à E)

| # | Phase |
|---|---|
| 1 à 13, 19 | B (réécriture) et C (portfolio) |
| 14 à 18, 21, 22, 26 | D (SEO technique) |
| Images, polices, contraste, focus | E |
| 20, 23 (blogue) | Corrigés là où un chiffre n'a pas de source. Le reste est noté pour Patrick : réécrire les articles demande ses anecdotes réelles. |
