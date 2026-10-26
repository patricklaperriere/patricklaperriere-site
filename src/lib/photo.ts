// The personal portrait, in one place.
//
// The two sources live in src/assets/photo/ so Astro's image pipeline can
// serve them as responsive AVIF/WebP (<Picture>): a 4:5 portrait and a square
// crop centred on the face. Both were exported without any metadata (no EXIF,
// no GPS), already upright.
//
// The favicons and the square JPEG referenced by the Person JSON-LD need
// stable public URLs, so `npm run photo` derives them from the square source
// into /public/photo/.
//
// Everything is gated on SITE.hasPhoto: while it is false the site falls back
// to the "PL" monogram, so a missing file can never render as a broken image.

import { SITE } from '../config';
import portrait from '../assets/photo/patrick-portrait.jpg';
import square from '../assets/photo/patrick-square.jpg';

export const hasPhoto = SITE.hasPhoto;

/** Widths generated for the portrait; each slot picks with its own `sizes`. */
export const PORTRAIT_WIDTHS = [160, 320, 480, 640, 840, 1080];

export const PHOTO = {
  /** 4:5 portrait (hero, home intro, about page). */
  portrait,
  /** Square face crop (article author box). */
  square,
  /** Square JPEG for JSON-LD / rich results (crawlers want a stable raster). */
  schema: '/photo/patrick-square.jpg',
  /** Favicons. */
  icon32: '/photo/icon-32.png',
  icon180: '/photo/apple-touch-icon.png',
  icon512: '/photo/icon-512.png',
} as const;
