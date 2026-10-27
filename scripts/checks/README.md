# Vérifications du site (nuit du 27 octobre 2026)

Scripts de contrôle, à lancer sur un build (`npm run build`, puis `npm run preview` ou tout serveur de `dist/`).
Ils lisent seulement : aucun ne modifie le dépôt.

| Script | Ce qu'il vérifie | Commande |
|---|---|---|
| `sitecheck.py` | Titres (≤ 60), descriptions (110 à 160), doublons, un seul H1, niveaux de titres, `alt` et dimensions des images, liens internes cassés, images Open Graph présentes, JSON-LD valide et sans FAQPage, aucun `[À FOURNIR` ni `À CONFIRMER` publié, aucun tiret cadratin en français | `python3 -I scripts/checks/sitecheck.py dist` |
| `responsive.py` | Chaque page à 375, 768, 1280 et 1920 px : débordement horizontal, éléments plus larges que l'écran, menu accessible, un seul H1, images cassées | `python -I scripts/checks/responsive.py http://127.0.0.1:4321 dist` (Playwright) |
| `keyboard.py` | Premier Tab sur « Aller au contenu », anneau de focus visible sur chaque élément atteint | `python -I scripts/checks/keyboard.py http://127.0.0.1:4321 / /contact` (Playwright) |
| `lighthouse-pages.mjs` | Lighthouse mobile, un essai valide par page | `CHROME_PATH=… node scripts/checks/lighthouse-pages.mjs http://127.0.0.1:4321 out.json / /contact` |

Résultats de la nuit : voir NUIT_RAPPORT.md.
