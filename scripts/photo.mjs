// Generates the portrait files that need a fixed public URL: the square JPEG
// referenced by the Person JSON-LD, and the favicons.
// Run with: npm run photo
//
//   Source: src/assets/photo/patrick-square.jpg  (or: npm run photo -- my.jpg)
//   Output: public/photo/*
//
// The on-page portraits are not produced here: Astro's <Picture> builds them
// (AVIF/WebP, responsive widths) from src/assets/photo/ at build time.
//
// Outputs carry no metadata: sharp writes none unless asked to.
//
// Square crops use sharp's "attention" strategy, which keeps the most salient
// region — on a headshot that is the face, not the middle of the chest.
//
// The script NEVER upscales. If the source is smaller than a target it emits
// the file at the source's native size and warns, because an upscaled portrait
// looks soft and a soft portrait is worse than a small one.

import sharp from 'sharp';
import { mkdirSync, existsSync, statSync, writeFileSync } from 'node:fs';

const SRC = process.argv[2] || 'src/assets/photo/patrick-square.jpg';
const OUT = 'public/photo';

if (!existsSync(SRC)) {
  console.error(`\n  ✗ Source introuvable : ${SRC}`);
  console.error(`    Dépose la photo à cet endroit, puis relance : npm run photo\n`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });

const meta = await sharp(SRC).metadata();
const shortest = Math.min(meta.width, meta.height);
console.log(`\n  Source : ${SRC} — ${meta.width}×${meta.height} ${meta.format}\n`);

const warnings = [];

/**
 * Square crop centred on the salient region (the face).
 *
 * `tight` pre-crops to the head before resizing. On an already-square source,
 * a plain cover-resize crops nothing — it just shrinks the whole torso, which
 * at 32px reads as an unidentifiable smudge. Favicons need the head to fill
 * the frame, so they extract an upper-centre square first.
 */
async function square(size, file, opts = {}) {
  const target = Math.min(size, shortest);
  if (target < size) warnings.push(`${file} : ${target}px au lieu de ${size}px (source trop petite)`);

  let pipeline = sharp(SRC);
  if (opts.tight) {
    const side = Math.round(shortest * 0.58);
    pipeline = pipeline.extract({
      left: Math.round((meta.width - side) / 2),
      top: Math.round(meta.height * 0.04),
      width: side,
      height: side,
    });
  }
  let img = pipeline.resize(target, target, {
    fit: 'cover',
    position: sharp.strategy.attention,
  });

  // Circular mask. Applied as a real alpha channel rather than CSS, because a
  // favicon is painted by the browser chrome where no stylesheet reaches.
  // JPEG has no alpha, so a round JPEG is impossible — only PNG/WebP get one.
  if (opts.round && !opts.jpg) {
    const r = target / 2;
    const mask = Buffer.from(
      `<svg width="${target}" height="${target}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`,
    );
    img = sharp(await img.png().toBuffer())
      .composite([{ input: mask, blend: 'dest-in' }]);
  }
  // A photographic PNG is enormous without quantization — a 512px portrait
  // lands around 600 kB at plain compressionLevel 9. Palette mode brings it
  // back to a size that belongs in a favicon.
  img = opts.png
    ? img.png({ compressionLevel: 9, palette: true, quality: 80, effort: 10 })
    : opts.jpg
      ? img.jpeg({ quality: 82, mozjpeg: true })
      : img.webp({ quality: 82 });
  await img.toFile(`${OUT}/${file}`);
  return file;
}

// The default source is already a face crop, so no `tight` pre-crop here.
const written = [
  await square(1080, 'patrick-laperriere-2025.jpg', { jpg: true }),
  await square(32, 'icon-32.png', { png: true, round: true }),
  // Apple applies its own rounded mask to the home-screen icon and expects an
  // opaque square: a pre-rounded one gets a black wedge in each corner.
  await square(180, 'apple-touch-icon.png', { png: true }),
  // 48 px: Google Search wants a favicon in a multiple of 48 px. 192 and 512
  // are the web app manifest icons (public/site.webmanifest).
  await square(48, 'icon-48.png', { png: true, round: true }),
  await square(192, 'icon-192.png', { png: true, round: true }),
  await square(512, 'icon-512.png', { png: true, round: true }),
];

// /favicon.ico, requested by browsers and crawlers whatever the <head> says.
// An ICO file may hold PNG images as is: 16, 32 and 48 px here.
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) =>
  sharp(`${OUT}/icon-512.png`).resize(s, s).png({ compressionLevel: 9 }).toBuffer()));
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(icoSizes[i], e); header.writeUInt8(icoSizes[i], e + 1);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(png.length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += png.length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...pngs]));
console.log('  ✓ ../favicon.ico (16, 32, 48)');

let total = 0;
for (const f of written) {
  const kb = statSync(`${OUT}/${f}`).size / 1024;
  total += kb;
  console.log(`  ✓ ${f.padEnd(26)} ${kb.toFixed(1).padStart(7)} Ko`);
}
console.log(`\n  Total : ${total.toFixed(1)} Ko`);

if (warnings.length) {
  console.log(`\n  ⚠ Source plus petite que certaines cibles (aucun agrandissement fait) :`);
  for (const w of warnings) console.log(`    · ${w}`);
}

console.log(`\n  Les portraits du site suivent la présence des fichiers dans src/assets/photo/ (voir src/lib/photo.ts).\n`);
