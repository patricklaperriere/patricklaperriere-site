// Generates every derivative of the personal portrait into public/photo/.
// Run with: npm run photo
//
//   Source: photo-src/patrick.jpg  (or pass a path: npm run photo -- my.jpg)
//   Output: public/photo/*
//
// Square crops use sharp's "attention" strategy, which keeps the most salient
// region — on a headshot that is the face, not the middle of the chest.
//
// The script NEVER upscales. If the source is smaller than a target it emits
// the file at the source's native size and warns, because an upscaled portrait
// looks soft and a soft portrait is worse than a small one.

import sharp from 'sharp';
import { mkdirSync, existsSync, statSync } from 'node:fs';

const SRC = process.argv[2] || 'photo-src/patrick.jpg';
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

/** 4:5 portrait crop, also salience-centred. */
async function portrait(width, file) {
  const height = Math.round((width / 4) * 5);
  const maxWidth = Math.min(width, meta.width, Math.round((meta.height / 5) * 4));
  const w = maxWidth;
  const h = Math.round((w / 4) * 5);
  if (w < width) warnings.push(`${file} : ${w}×${h} au lieu de ${width}×${height} (source trop petite)`);
  await sharp(SRC)
    .resize(w, h, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 82 })
    .toFile(`${OUT}/${file}`);
  return file;
}

const written = [
  await portrait(720, 'patrick-720.webp'),
  await square(128, 'patrick-128.webp', { tight: true }),
  await square(256, 'patrick-256.webp', { tight: true }),
  await square(1200, 'patrick-square.jpg', { jpg: true }),
  await square(32, 'icon-32.png', { png: true, tight: true, round: true }),
  // Apple applies its own rounded mask to the home-screen icon and expects an
  // opaque square: a pre-rounded one gets a black wedge in each corner.
  await square(180, 'apple-touch-icon.png', { png: true, tight: true }),
  await square(512, 'icon-512.png', { png: true, tight: true, round: true }),
];

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

console.log(`\n  Dernière étape : passe SITE.hasPhoto à true dans src/config.ts\n`);
