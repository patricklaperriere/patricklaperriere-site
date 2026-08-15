// ─── TODO_PRIX ──────────────────────────────────────────────────────────────
// Starting prices per service. Replace each 'TODO_PRIX' with the real amount
// (CAD, before taxes) — e.g. '2 500'. The literal string is rendered ON THE
// PAGE on purpose, so the slot is impossible to miss while reviewing.
//
//   ⚠ DO NOT DEPLOY while any value is still 'TODO_PRIX'.
//     `npm run check:prix` fails the moment one is left in a build.
//
// Set a value to null instead if a service should show no price at all: the
// price line then disappears cleanly rather than rendering an empty figure.

import type { RouteKey } from '../i18n/routes';

export type PricedService = Extract<RouteKey, 'svcWeb' | 'svcSeo' | 'svcShopify'>;

// Currently null so the structure ships without publishing a placeholder.
// Put the real amounts in ('2 500', '1 800', …) and the price line appears
// everywhere at once: service cards, service pages, and the FAQ answers.
export const startingPrice: Record<PricedService, string | null> = {
  svcWeb: null, // TODO_PRIX
  svcSeo: null, // TODO_PRIX
  svcShopify: null, // TODO_PRIX
};

/** True while any price is still a placeholder — used by the deploy guard. */
export const hasPlaceholderPrice = Object.values(startingPrice).some(
  (p) => p === 'TODO_PRIX',
);
