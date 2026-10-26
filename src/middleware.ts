// Every HTML page goes through the French typography pass (src/lib/
// typography.mjs): no-break spaces before ; : ? ! » and after «. Runs in dev
// and on every prerendered page at build, blog posts included.
import { defineMiddleware } from 'astro:middleware';
import { typeset } from './lib/typography.mjs';

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = await response.text();
  return new Response(typeset(html), { status: response.status, statusText: response.statusText, headers: response.headers });
});
