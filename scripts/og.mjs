// Generates branded Open Graph images (1200×630) into public/og/.
// Run with: npm run og
//
// One default image + one per service + one per case study. Text uses a
// system font with full accent coverage (Segoe UI / Arial) so accents render.

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('public/og', { recursive: true });

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

function template({ kicker, title, subtitle }) {
  const lines = wrap(title);
  const titleSvg = lines
    .map(
      (ln, i) =>
        `<text x="96" y="${330 + i * 118}" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-weight="700" font-size="104" letter-spacing="-3" fill="${
          i === lines.length - 1 ? 'url(#gold)' : '#eef1f6'
        }">${esc(ln)}</text>`,
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="50%" cy="-10%" r="120%">
      <stop offset="0%" stop-color="#0a1320"/><stop offset="60%" stop-color="#060b14"/>
    </radialGradient>
    <radialGradient id="blob" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e8c79a" stop-opacity="0.35"/><stop offset="100%" stop-color="#e8c79a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f4d9b0"/><stop offset="60%" stop-color="#e8c79a"/><stop offset="100%" stop-color="#c9a878"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="120" r="360" fill="url(#blob)"/>
  <circle cx="120" cy="560" r="280" fill="#6fd8e0" opacity="0.08"/>
  <rect x="64" y="64" width="1072" height="502" rx="24" fill="none" stroke="#eef1f6" stroke-opacity="0.10"/>
  <text x="100" y="180" font-family="Consolas, 'Courier New', monospace" font-size="24" letter-spacing="5" fill="#e8c79a">${esc(kicker)}</text>
  ${titleSvg}
  <text x="100" y="535" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#8a97ad">${esc(subtitle)}</text>
  <text x="1136" y="535" text-anchor="end" font-family="Consolas, monospace" font-size="22" fill="#6b7689">patricklaperriere.com</text>
</svg>`;
}

const images = [
  {
    file: 'default.png',
    kicker: 'DÉVELOPPEUR WEB · WEB DEVELOPER',
    title: 'Patrick Laperrière',
    subtitle: 'Sites web rapides, élégants et optimisés pour Google',
  },
  // Services
  {
    file: 'service-web.png',
    kicker: 'SERVICE',
    title: 'Création de site web',
    subtitle: 'Sites sur mesure, rapides et pensés pour convertir',
  },
  {
    file: 'service-seo.png',
    kicker: 'SERVICE',
    title: 'Refonte + SEO',
    subtitle: 'Transformer un site lent en machine à leads',
  },
  {
    file: 'service-shopify.png',
    kicker: 'SERVICE',
    title: 'E-commerce Shopify',
    subtitle: 'Boutiques Shopify sur mesure en Liquid',
  },
  // Projects
  {
    file: 'project-inspection-habitation-outaouais.png',
    kicker: 'RÉALISATION · CASE STUDY',
    title: 'Inspection Habitation Outaouais',
    subtitle: 'Site Astro bilingue + SEO local · Outaouais',
  },
  {
    file: 'project-hp-addik.png',
    kicker: 'RÉALISATION · CASE STUDY',
    title: 'HP Addik',
    subtitle: 'Boutique Shopify sur mesure · powersports',
  },
  {
    file: 'project-envita-wellness.png',
    kicker: 'RÉALISATION · CASE STUDY',
    title: 'Envita Wellness',
    subtitle: 'Plateforme Shopify custom · breathwork',
  },
];

for (const img of images) {
  const svg = template(img);
  await sharp(Buffer.from(svg)).png().toFile(`public/og/${img.file}`);
  console.log('✓', img.file);
}
console.log(`\n${images.length} OG images written to public/og/`);
