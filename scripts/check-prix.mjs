// Deploy guard: fails if a TODO_PRIX (or any other TODO_ marker) made it into
// the built HTML. Run after `npm run build`, before deploying.
//
//   npm run check
//
// This exists because the price placeholders are rendered ON THE PAGE on
// purpose — which is exactly what makes them dangerous to forget.

import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const MARKERS = ['TODO_PRIX', 'TODO_VIDEO', 'TODO_POSTER', 'TODO_PHOTO'];

let files = [];
try {
  files = globSync('dist/**/*.html');
} catch {
  console.error('  ✗ dist/ introuvable — lance `npm run build` avant.');
  process.exit(1);
}

if (!files.length) {
  console.error('  ✗ Aucun HTML dans dist/ — lance `npm run build` avant.');
  process.exit(1);
}

const hits = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of MARKERS) {
    const n = html.split(m).length - 1;
    if (n > 0) hits.push({ file: f.replace(/\\/g, '/'), marker: m, n });
  }
}

if (!hits.length) {
  console.log(`\n  ✓ Aucun marqueur TODO dans les ${files.length} pages construites.\n`);
  process.exit(0);
}

const byMarker = {};
for (const h of hits) byMarker[h.marker] = (byMarker[h.marker] || 0) + h.n;

console.error(`\n  ✗ NE PAS DÉPLOYER — marqueurs TODO présents dans le build :\n`);
for (const [m, n] of Object.entries(byMarker)) {
  console.error(`    ${m} — ${n} occurrence(s)`);
  hits
    .filter((h) => h.marker === m)
    .slice(0, 6)
    .forEach((h) => console.error(`       · ${h.file}`));
  const extra = hits.filter((h) => h.marker === m).length - 6;
  if (extra > 0) console.error(`       · … et ${extra} autre(s) fichier(s)`);
}
console.error('');
process.exit(1);
