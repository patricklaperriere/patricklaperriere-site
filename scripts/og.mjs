// Generates branded Open Graph images (1200×630) into public/og/.
// Run with: npm run og
//
// One default image + one per section, service, published case study and post. Text uses a
// system font with full accent coverage so accents render.

import sharp from 'sharp';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';

mkdirSync('public/og', { recursive: true });

// Read blog frontmatter so each article gets its own OG image automatically.
function blogOgImages() {
  const dir = 'src/content/blog';
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  return files.map((f) => {
    const src = readFileSync(`${dir}/${f}`, 'utf8');
    const fm = src.split('---')[1] ?? '';
    const get = (key) => (fm.match(new RegExp(`${key}:\\s*"?([^"\\n]+)"?`)) || [])[1]?.trim();
    const slug = get('slug');
    const title = get('title');
    const lang = get('lang');
    return {
      file: `post-${slug}.png`,
      kicker: lang === 'en' ? 'ARTICLE · BLOG' : 'ARTICLE · BLOGUE',
      title,
      subtitle: 'patricklaperriere.com',
    };
  });
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Naive width-based wrap into <= 2 lines for the big title.
function wrap(text, max = 18) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}

// Matches the report theme: aubergine ground, bone type, signal-yellow
// annotations, a plum block for the monogram, hairline rules. System fonts only (sharp renders through librsvg), with
// fallbacks that carry French accents on Windows, macOS and Linux.
const SANS = "'Segoe UI', 'Helvetica Neue', Ubuntu, Arial, sans-serif";
const MONO = "Consolas, 'SFMono-Regular', 'Ubuntu Mono', 'DejaVu Sans Mono', monospace";

function template({ kicker, title, subtitle }) {
  const lines = wrap(title, 22);
  const size = lines.some((l) => l.length > 16) ? 88 : 104;
  const titleSvg = lines
    .map(
      (ln, i) =>
        `<text x="96" y="${300 + i * (size + 14)}" font-family="${SANS}" font-weight="600" font-size="${size}" letter-spacing="-3" fill="#F6EEF2">${esc(ln)}</text>`,
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#300A24"/>
  <rect x="96" y="150" width="56" height="3" fill="#FFD23F"/>
  <text x="172" y="160" font-family="${MONO}" font-size="22" letter-spacing="5" fill="#FFD23F">${esc(kicker)}</text>
  <rect x="1048" y="112" width="56" height="56" fill="#77216F"/>
  <text x="1076" y="150" text-anchor="middle" font-family="Georgia, 'DejaVu Serif', serif" font-weight="700" font-size="26" fill="#F6EEF2">PL</text>
  ${titleSvg}
  <line x1="96" y1="500" x2="1104" y2="500" stroke="#F6EEF2" stroke-opacity="0.16"/>
  ${wrap(subtitle, 64)
    .map((ln, i) => `<text x="96" y="${548 + i * 36}" font-family="${SANS}" font-size="28" fill="#D5C3CE">${esc(ln)}</text>`)
    .join('')}
  <text x="1104" y="478" text-anchor="end" font-family="${MONO}" font-size="20" fill="#B9A2B1">patricklaperriere.com</text>
</svg>`;
}

// Published projects, read from the content collection files so a new
// project gets its card without editing this script. Values in those files
// are JSON-quoted strings, which keeps this frontmatter read trivial.
function projectOgImages() {
  const dir = 'src/content/projets';
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => {
      const fm = readFileSync(`${dir}/${f}`, 'utf8').split('---')[1] ?? '';
      const fr = (key) => {
        const m = fm.match(new RegExp(`^${key}:\\n  fr: (".*")$`, 'm'));
        return m ? JSON.parse(m[1]) : '';
      };
      return {
        published: /^publié: true$/m.test(fm),
        file: `project-${f.replace(/\.md$/, '')}.png`,
        kicker: 'ÉTUDE DE CAS · CASE STUDY',
        title: fr('titre'),
        subtitle: fr('accroche').split(/\. /)[0].replace(/\.$/, ''),
      };
    })
    .filter((p) => p.published && !p.subtitle.includes('À CONFIRMER'));
}

const images = [
  {
    file: 'default.png',
    kicker: 'DÉVELOPPEUR WEB · WEB DEVELOPER',
    title: 'Patrick Laperrière',
    subtitle: 'Sites web, boutiques Shopify et outils sur mesure',
  },
  {
    file: 'home-fr.png',
    kicker: 'DÉVELOPPEUR WEB · QUÉBEC',
    title: 'Des sites rapides. Des outils sur mesure.',
    subtitle: 'Patrick Laperrière, sites et outils web pour les PME',
  },
  {
    file: 'home-en.png',
    kicker: 'WEB DEVELOPER · QUEBEC',
    title: 'Fast websites. Custom tools.',
    subtitle: 'Patrick Laperrière, websites and web tools for small businesses',
  },
  // Services
  {
    file: 'services.png',
    kicker: 'SERVICES',
    title: 'Quatre services, un interlocuteur',
    subtitle: 'Site web, refonte et SEO, boutique Shopify, outils sur mesure',
  },
  {
    file: 'service-web.png',
    kicker: 'SERVICE',
    title: 'Création de site web',
    subtitle: 'Un site rapide, clair et bien référencé',
  },
  {
    file: 'service-seo.png',
    kicker: 'SERVICE',
    title: 'Refonte et SEO',
    subtitle: 'Mesurer d’abord, corriger dans le bon ordre',
  },
  {
    file: 'service-shopify.png',
    kicker: 'SERVICE',
    title: 'Boutique Shopify',
    subtitle: 'Une boutique sur mesure en Liquid',
  },
  {
    file: 'service-tools.png',
    kicker: 'SERVICE',
    title: 'Outils sur mesure',
    subtitle: 'Applications web en React et Supabase',
  },
  // Section pages
  {
    file: 'about.png',
    kicker: 'À PROPOS · ABOUT',
    title: 'Patrick Laperrière',
    subtitle: 'Développeur web, fondateur de Technologies Habita inc.',
  },
  {
    file: 'work.png',
    kicker: 'RÉALISATIONS · WORK',
    title: 'Réalisations',
    subtitle: 'Un logiciel, des sites et des boutiques, avec des faits vérifiables',
  },
  {
    file: 'blog.png',
    kicker: 'BLOGUE · BLOG',
    title: 'Le web, le SEO et la vitesse',
    subtitle: 'Des articles concrets pour les PME',
  },
  {
    file: 'contact.png',
    kicker: 'CONTACT',
    title: 'Démarrons votre projet',
    subtitle: 'Une réponse personnelle, en français ou en anglais',
  },
  {
    file: 'privacy.png',
    kicker: 'CONFIDENTIALITÉ · PRIVACY',
    title: 'Confidentialité',
    subtitle: 'Ce que le site recueille, et vos droits selon la Loi 25',
  },
  {
    file: 'regions.png',
    kicker: 'RÉGIONS · REGIONS',
    title: 'Création de site web au Québec',
    subtitle: 'Montréal, Québec, Longueuil, Gatineau, Terrebonne',
  },
  // Concepts showcase
  {
    file: 'concepts.png',
    kicker: 'CONCEPTS',
    title: 'Concepts d’interfaces',
    subtitle: 'Des maquettes codées pour des entreprises fictives',
  },
  // Local SEO city pages
  {
    file: 'ville-montreal.png',
    kicker: 'CRÉATION DE SITE WEB',
    title: 'Site web à Montréal',
    subtitle: 'Sur mesure, bilingue et bien référencé',
  },
  {
    file: 'ville-longueuil.png',
    kicker: 'CRÉATION DE SITE WEB · RIVE-SUD',
    title: 'Site web à Longueuil',
    subtitle: 'Référencement local pour la Rive-Sud',
  },
  {
    file: 'ville-gatineau.png',
    kicker: 'CRÉATION DE SITE WEB · OUTAOUAIS',
    title: 'Site web à Gatineau',
    subtitle: 'Bilingue FR et EN, marché Gatineau-Ottawa',
  },
  {
    file: 'ville-quebec.png',
    kicker: 'CRÉATION DE SITE WEB · CAPITALE-NATIONALE',
    title: 'Site web à Québec',
    subtitle: 'Rapide, soigné et bien référencé',
  },
  {
    file: 'ville-terrebonne.png',
    kicker: 'CRÉATION DE SITE WEB · COURONNE NORD',
    title: 'Site web à Terrebonne',
    subtitle: 'Référencement local pour la Couronne Nord',
  },
];

const allImages = [...images, ...projectOgImages(), ...blogOgImages()];
for (const img of allImages) {
  const svg = template(img);
  await sharp(Buffer.from(svg)).png().toFile(`public/og/${img.file}`);
  console.log('✓', img.file);
}
console.log(`\n${allImages.length} OG images written to public/og/`);
