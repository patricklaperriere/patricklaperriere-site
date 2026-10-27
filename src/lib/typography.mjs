// French typography for the rendered HTML: no line may start with a colon or
// a closing guillemet. Ordinary spaces before ; ? ! become narrow no-break
// spaces; before : and » and after « they become no-break spaces. Only text
// between tags is touched, never tags or attributes, and nothing inside
// script, style, pre, code or textarea. Shared by src/middleware.ts (every
// page, dev and build, blog included) and the build check in
// astro.config.mjs.

const TOKENS = /(<!--[\s\S]*?-->|<(script|style|pre|code|textarea)\b[\s\S]*?<\/\2\s*>|<[^>]+>)/gi;

/** Calls `fn` on each run of text outside tags and skipped elements. */
function mapText(html, fn) {
  let out = '';
  let last = 0;
  for (const m of html.matchAll(TOKENS)) {
    out += fn(html.slice(last, m.index)) + m[0];
    last = m.index + m[0].length;
  }
  return out + fn(html.slice(last));
}

const fix = (text) =>
  text
    .replace(/[  ]+([;?!])/g, ' $1')
    .replace(/ +([:»])/g, ' $1')
    .replace(/« +/g, '« ');

/** The page with its spaces fixed. */
export const typeset = (html) => mapText(html, fix);

/** Text runs that still have an ordinary space before ; : ? ! » or after «. */
export function typoFaults(html) {
  const faults = [];
  mapText(html, (text) => {
    for (const m of text.matchAll(/.{0,24}(?: [;:?!»]|« ).{0,12}/g)) faults.push(m[0].trim());
    return text;
  });
  return faults;
}
