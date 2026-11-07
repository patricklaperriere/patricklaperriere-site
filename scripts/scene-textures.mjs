// Prépare les images de la home WOW (refonte/2026-11-wow) :
//  - les écrans de la scène 3D : captures réelles déjà dans public/work,
//    redimensionnées à 1024 px de large en WebP, 120 Ko au plus chacune ;
//  - la photo détourée de Patrick (PNG avec transparence), recadrée.
// Usage : node scripts/scene-textures.mjs [photo-detouree.png]
import sharp from 'sharp';
import { statSync } from 'node:fs';

const ECRANS = [
  ['habita', 'public/work/habita-loop.webp'],
  ['habita-rapport', 'public/work/habita-demo/temps-b-fr.webp'],
  ['habita-rapport-en', 'public/work/habita-demo/temps-b-en.webp'],
  ['beauregard', 'public/work/inspection-beauregard.webp'],
  ['beauregard-thermo', 'public/work/inspection-beauregard-thermographie.webp'],
  ['beauregard-mobile', 'public/work/inspection-beauregard-mobile.webp'],
  ['iho', 'public/work/inspection-habitation-outaouais-v2.webp'],
  ['iho-preachat', 'public/work/inspection-habitation-outaouais-v2-preachat.webp'],
  ['hpaddik', 'public/work/hp-addik.webp'],
];
const MAX = 120 * 1024;

for (const [nom, src] of ECRANS) {
  const meta = await sharp(src).metadata();
  const portrait = meta.height > meta.width;
  const out = `public/scene/${nom}.webp`;
  for (const q of [80, 72, 64, 56]) {
    await sharp(src).resize(portrait ? { width: 512 } : { width: 1024 }).webp({ quality: q, effort: 6 }).toFile(out);
    if (statSync(out).size <= MAX) break;
  }
  const m = await sharp(out).metadata();
  console.log(out, m.width, m.height, Math.round(statSync(out).size / 1024) + ' Ko');
}

const photo = process.argv[2];
if (photo) {
  // Recadre le haut vide ; garde la transparence.
  const m = await sharp(photo).metadata();
  const top = Math.round(m.height * 0.1);
  await sharp(photo).extract({ left: 0, top, width: m.width, height: m.height - top }).png({ compressionLevel: 9 }).toFile('src/assets/refonte/patrick-detoure.png');
  console.log('src/assets/refonte/patrick-detoure.png', m.width, m.height - top);
}
