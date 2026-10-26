// Contrast check for the report theme (WCAG 2.2). Run with: npm run contrast
//
// Reads the colour tokens straight from src/styles/report.css, so the numbers
// can never drift from the CSS, and checks every pairing the theme actually
// uses against its threshold: 4.5:1 for text, 3:1 for graphics (plan lines,
// active traces, focus rings). Exits non-zero if any pairing fails.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/report.css', import.meta.url), 'utf8');
const token = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`Token --${name} not found in report.css`);
  return m[1];
};

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const surfaces = ['ink', 'ink-raised', 'ink-high'];
const checks = [
  // [foreground, background, minimum, role]
  ...surfaces.flatMap((s) => [
    ['bone', s, 4.5, 'text'],
    ['slate', s, 4.5, 'secondary text'],
    ['slate-mute', s, 4.5, 'muted text'],
    ['signal', s, 4.5, 'annotation text'],
    ['plan-line', s, 3, 'plan line (graphic)'],
    ['signal', s, 3, 'active trace / focus (graphic)'],
  ]),
  ['bone', 'plum', 4.5, 'text on the plum wash'],
  ['mauve', 'ink', 3, 'button against the ground (control)'],
  ['bone', 'mauve', 4.5, 'button text'],
  ['ink', 'mauve-hover', 4.5, 'button text, hover'],
  ['mauve-hover', 'ink', 3, 'button against the ground, hover (control)'],
];

let failed = 0;
for (const [fg, bg, min, role] of checks) {
  const r = ratio(token(fg), token(bg));
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${r.toFixed(2).padStart(5)}:1 (min ${min})  --${fg} on --${bg}  · ${role}`);
}
console.log(failed ? `\n${failed} pairing(s) below WCAG AA.` : '\nAll pairings meet WCAG AA.');
process.exit(failed ? 1 : 0);
