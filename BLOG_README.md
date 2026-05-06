# Blog — How to publish an article

Guide for publishing bilingual (FR/EN) articles on patricklaperriere.com.
The blog is **fully static HTML** — no build step, no framework. Vercel
serves the files as-is.

## TL;DR — checklist for publishing one article

1. Decide on a **slug** (kebab-case, no accents, no leading articles).
2. Copy `blog/_template.html` → `blog/<slug-en>.html` (English version).
3. Copy `blog/_template.html` → `blog/<slug-fr>.html` (French version).
4. Replace every `{{PLACEHOLDER}}` in both files (see list below).
5. Replace the static text marked `REPLACE` in nav, footer, and modal
   with the matching language strings (see "Static text" section).
6. Add a `.blog-card` (one per language) to `blog/index.html`.
7. Add 2 `<url>` entries to `sitemap.xml` (EN + FR, with hreflang).
8. Validate the JSON-LD with Google's Rich Results Test.
9. Commit and push — Vercel will deploy.

## File layout

```
/
├── index.html             ← home (FR/EN via JS toggle)
├── sitemap.xml            ← root sitemap (also lists articles)
├── robots.txt
├── vercel.json
├── BLOG_README.md         ← this file
├── assets/
│   ├── blog.css           ← shared blog stylesheet
│   └── blog.js            ← shared blog scripts (nav/modal/lang filter)
└── blog/
    ├── index.html         ← blog listing page (FR/EN via JS toggle)
    ├── _template.html     ← copy this for new articles — DO NOT EDIT IN PLACE
    ├── <slug-en>.html     ← one HTML file per article, per language
    └── <slug-fr>.html
```

## Slug convention

- **kebab-case** (lowercase words separated by hyphens)
- **no accents** — strip diacritics (`é → e`, `à → a`, …)
- **no leading articles** — drop `the`, `a`, `le`, `la`, `les`, `un`, `une`
- **descriptive but short** — aim for 3–6 words
- **same root for both languages**, with a language suffix when the
  translation is not literal:
  - `facebook-marketplace-sync-for-powersport-dealers.html` (EN)
  - `synchronisation-facebook-marketplace-concessionnaires.html` (FR)
- Slug appears in the URL and in the OG/canonical metadata, so it's
  worth checking with the SEO keywords list before locking it in.

## Filename convention

- One HTML file per article **per language** at `/blog/<slug>.html`.
- The file's language is fixed — there is **no JS toggle on article
  pages**. Switching language navigates to the sibling URL via the
  `<a class="lang-btn">` in the nav.
- If a translation does not exist yet, add the `disabled` class on the
  alt-language `lang-btn` and remove the `hreflang` alternate
  `<link>` for the missing language.

## Frontmatter / placeholder reference

Every `{{PLACEHOLDER}}` in `blog/_template.html` to replace per article:

| Placeholder | Example value |
|---|---|
| `{{ARTICLE_TITLE}}` | `5 reasons your snowmobile dealer website is leaking leads` |
| `{{ARTICLE_DESCRIPTION}}` | meta description, ≤ 160 chars |
| `{{ARTICLE_SLUG}}` | `snowmobile-dealer-website-leaking-leads` |
| `{{ARTICLE_LANG}}` | `en` or `fr-CA` |
| `{{ARTICLE_LOCALE_OG}}` | `en_US` or `fr_CA` |
| `{{ARTICLE_LOCALE_ALT}}` | the OTHER OG locale |
| `{{ARTICLE_LANG_SHORT}}` | `EN` or `FR` (label in nav switcher) |
| `{{ARTICLE_OTHER_LANG_SHORT}}` | the OTHER short label |
| `{{ARTICLE_HREFLANG_OTHER}}` | full URL of the translated article (`<head>` only — see "Lang switcher URLs" below) |
| `{{ARTICLE_OTHER_LANG_PATH}}` | root-relative path of the translated article (nav switcher) |
| `{{ARTICLE_OTHER_LANG_LABEL}}` | `Read in French` / `Lire en anglais` |
| `{{ARTICLE_DATE_ISO}}` | `2026-05-06` |
| `{{ARTICLE_DATE_DISPLAY}}` | `May 6, 2026` / `6 mai 2026` |
| `{{ARTICLE_DATE_MODIFIED}}` | `2026-05-06` (== published if new) |
| `{{ARTICLE_READING_TIME}}` | `6 min read` / `6 min de lecture` |
| `{{ARTICLE_IMAGE}}` | absolute URL to a 1200×630 OG image |
| `{{ARTICLE_IMAGE_ALT}}` | descriptive alt text |
| `{{ARTICLE_KEYWORDS}}` | comma-separated SEO keywords |
| `{{BREADCRUMB_BLOG_LABEL}}` | `Blog` |
| `{{BREADCRUMB_ARTICLE_LABEL}}` | short article title |
| `{{ARTICLE_CONTENT}}` | the article body as HTML (h2/h3/p/ul/...) |
| `{{ARTICLE_CTA_TITLE}}` | end-of-article CTA title |
| `{{ARTICLE_CTA_DESC}}` | CTA description |
| `{{ARTICLE_CTA_BTN}}` | CTA button text |
| `{{RELATED_ARTICLES}}` | two `.related-card` blocks (same language) |

### Article content HTML

Wrap content in `<article class="prose">…</article>` (already in the
template). The `.prose` class styles `h2`, `h3`, `h4`, `p`, `ul`, `ol`,
`blockquote`, `code`, `pre`, `img`, `a`, `hr`. Body font size is `18px`,
line-height `1.75`, max-width `760px` — set on the parent `.article-page`.

Reading time rule of thumb: **200 words/min** in English, **180 wpm** in
French. Round to the nearest minute.

## Lang switcher URLs — absolute vs relative

Two separate places reference the alternate language URL, and they need
**different formats**:

- **`<link rel="alternate" hreflang>` in `<head>`** → must be **absolute**
  (`https://patricklaperriere.com/blog/<slug>.html`). Google's hreflang
  spec requires fully qualified URLs.
- **`<a class="lang-btn">` in the nav switcher** → must be **root-relative**
  (`/blog/<slug>.html`). An absolute URL works on prod but breaks the
  switcher on `localhost:8000` (it sends the user to production), which
  during local preview shows up as a 404 if the article hasn't been
  deployed yet. Relative paths work in both environments.

The template uses `{{ARTICLE_HREFLANG_OTHER}}` for the absolute one and
`{{ARTICLE_OTHER_LANG_PATH}}` for the relative one.

## Reveal animations on article pages

`assets/blog.js` automatically detects article pages (via the
`<main class="article-page">` selector) and renders all `.reveal`
elements visible immediately on those pages — no scroll-triggered
animation. This is intentional:

- Long-form copy must be readable on first paint.
- Intersection Observer adds visible delay when scrolling fast through
  2000+ word articles, leaving blank gaps.
- Pre-rendering content also helps Core Web Vitals (CLS).

The `.reveal` class is harmless on article pages (it gets `.visible`
added on load), so you don't need to strip it from the template — it
remains semantically meaningful and would re-enable animations if the
script ever gets reverted. Animations stay on for `index.html` (home)
and `/blog/index.html` (listing) where the layout benefits from them.

## Static text to localize per article

Inside the template, several strings are tagged with `REPLACE` comments
and need to be hand-translated for the FR copy of the article:

- `<span class="nav-tagline">` — `Dealer Web Partner` / `Partenaire web concessionnaire`
- nav links — `About / Services / Work / Blog` / `À propos / Services / Projets / Blog`
- nav CTA — `Let's talk` / `Parlons-en`
- breadcrumb — `Home` / `Accueil`
- "Keep reading" label — `Keep reading` / `Continuer la lecture`
- modal copy (Discovery Call / form labels / placeholders)
- footer copy (`All rights reserved.` / `Tous droits réservés.`)

If you make these adjustments often, consider extracting them into a
shared component — but as long as it's just a handful of articles,
copy-paste from a previously-shipped FR article is fastest.

## Adding a card to `/blog/index.html`

Inside `<section class="blog-grid">`, add **one card per language version**:

```html
<a class="blog-card reveal" data-lang="en" href="/blog/<slug-en>.html">
  <div class="blog-card-meta">
    <time datetime="2026-05-06">May 6, 2026</time>
    <span>·</span>
    <span>6 min read</span>
    <span class="blog-card-lang">EN</span>
  </div>
  <h2 class="blog-card-title">Article title</h2>
  <p class="blog-card-desc">Short description.</p>
  <span class="blog-card-cta">
    <span>Read article</span>
    <span class="arrow">→</span>
  </span>
</a>
```

The `data-lang` attribute drives the FR/EN filter in the nav switcher
(`assets/blog.js → setBlogLang`). Cards without `data-lang` are always
shown.

Once at least one card exists, **delete the `<div class="blog-empty">`
empty-state block** below the grid.

You can also add the article into the `Blog.blogPost` and `ItemList`
arrays in the JSON-LD at the top of `blog/index.html` — optional but
helps Google connect the listing to the articles.

## Adding entries to `sitemap.xml`

Add **two `<url>` entries per article** (one per language), each with
crossed `xhtml:link` hreflang alternates pointing to both versions.
The example block in `sitemap.xml` shows the exact shape — uncomment
and adapt.

`lastmod` should match `dateModified` in the article's JSON-LD.

## Local preview

Open `index.html` directly in the browser to spot-check. For absolute
paths (`/blog/`, `/assets/blog.css`, `/assets/blog.js`) you'll want a
local server — easiest options:

```sh
# Python
python -m http.server 8000

# Node
npx serve .
```

Then browse to http://localhost:8000/blog/.

## Validation before deploy

- **JSON-LD**: paste the URL into https://search.google.com/test/rich-results
- **Hreflang**: confirm `<link rel="alternate">` tags resolve and point
  to the correct sibling URL.
- **Open Graph**: https://www.opengraph.xyz/ to preview share cards.
- **Mobile**: test the article body at 375 px width — long words and
  inline code should not overflow.
- **Lang toggle on `/blog/`**: switching to FR should hide EN cards
  (and vice-versa). The empty-state block stays visible regardless.
- **Lang toggle on article**: clicking the alt-language `lang-btn`
  navigates to the translated URL — there is no JS toggle.
