// The personal portrait, in one place.
//
// Source (28 October 2026): Patrick's professional photo from the Bravo 2025
// award (NEXUS-Passation/assets/patrick-photo-pro-2025.jpg, 1080 × 1080, white
// background). Cropped only, never retouched: 864 × 1080 (4:5) for the
// portrait, a 720 × 720 face crop for the square. Metadata stripped.
//
// The site finds its photos by file presence: drop a 4:5 portrait at
// src/assets/photo/patrick-portrait.jpg (and, optionally, a square face crop
// at patrick-square.jpg), run `npm run photo` for the favicons and the JSON-LD
// square, and every placement comes back on its own. While the files are
// absent, nothing photographic ships: the article byline falls back to the
// "PL" monogram, the favicon to the SVG monogram, and the portrait slots show
// a dashed reminder in `astro dev` only (PortraitSlot.astro).

import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photo/*.{jpg,jpeg,png,webp}', { eager: true });
const find = (name: string) =>
  Object.entries(files).find(([k]) => k.split('/').pop()!.replace(/\.\w+$/, '') === name)?.[1].default;

const portrait = find('patrick-portrait');
const square = find('patrick-square') ?? portrait;

export const hasPhoto = Boolean(portrait);

/** Widths generated for the portrait; each slot picks with its own `sizes`.
 *  Never wider than the source: an upscaled portrait only looks soft. */
export const PORTRAIT_WIDTHS = [160, 320, 480, 640, 840, 1080].filter(
  (w) => !portrait || w <= portrait.width,
);

export const PHOTO = {
  /** 4:5 portrait (home "Qui je suis", about page). */
  portrait,
  /** Square face crop (article author box). */
  square,
  /** Square JPEG for JSON-LD / rich results (crawlers want a stable raster). */
  schema: '/photo/patrick-laperriere-2025.jpg',
  /** Favicons. */
  icon32: '/photo/icon-32.png',
  icon48: '/photo/icon-48.png',
  icon192: '/photo/icon-192.png',
  icon180: '/photo/apple-touch-icon.png',
  icon512: '/photo/icon-512.png',
} as const;
