// Hand-drawn strokes for SVG plans, generated at build time.
//
// A pencil line is never one perfect vector: it is drawn twice, a little off
// each time, runs past the corner it meets and bows slightly in the middle.
// Each segment here becomes two such strokes. The randomness is seeded, so the
// drawing is identical on every build (no hydration, no layout jitter).

type Pt = [number, number];

/** Small deterministic PRNG (mulberry32). */
export function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * One segment as two pencil strokes: each overshoots its ends a little, wobbles
 * a little, and bows through a quadratic control point.
 */
export function sketchSegment([x1, y1]: Pt, [x2, y2]: Pt, rand: () => number, rough = 1.4): string[] {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const j = (k = 1) => (rand() - 0.5) * rough * k;

  return [0, 1].map((pass) => {
    const over = 2 + rand() * 4 + pass * 2;
    const ax = x1 - ux * over + j();
    const ay = y1 - uy * over + j();
    const bx = x2 + ux * over * 0.6 + j();
    const by = y2 + uy * over * 0.6 + j();
    // Bow: offset the midpoint along the normal, proportional to length.
    const bow = (rand() - 0.5) * Math.min(len * 0.02, 3) * (pass ? 1.6 : 1);
    const cx = (ax + bx) / 2 - uy * bow;
    const cy = (ay + by) / 2 + ux * bow;
    return `M${r1(ax)} ${r1(ay)} Q${r1(cx)} ${r1(cy)} ${r1(bx)} ${r1(by)}`;
  });
}

/** A polyline (closed or not) as sketched segments. */
export function sketchPolyline(points: Pt[], rand: () => number, opts: { closed?: boolean; rough?: number } = {}) {
  const pts = opts.closed ? [...points, points[0]] : points;
  const out: string[] = [];
  for (let i = 0; i < pts.length - 1; i++) out.push(...sketchSegment(pts[i], pts[i + 1], rand, opts.rough));
  return out;
}

/** A rectangle as four sketched sides. */
export function sketchRect(x: number, y: number, w: number, h: number, rand: () => number, rough?: number) {
  return sketchPolyline(
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ],
    rand,
    { closed: true, rough },
  );
}

/** A loose hand-drawn ellipse (for circling something), as one path. */
export function sketchCircle(cx: number, cy: number, rx: number, ry: number, rand: () => number) {
  // A little more than a full turn, so the end overlaps the start like a pen loop.
  const steps = 28;
  const turn = Math.PI * 2 * 1.08;
  const start = rand() * Math.PI * 2;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = start + (turn * i) / steps;
    const k = 1 + (rand() - 0.5) * 0.06;
    const x = cx + Math.cos(t) * rx * k;
    const y = cy + Math.sin(t) * ry * k;
    d += `${i ? 'L' : 'M'}${r1(x)} ${r1(y)}`;
  }
  return d;
}

/** A hand-drawn arrow from a to b with a slight curve, plus its head. */
export function sketchArrow(a: Pt, b: Pt, rand: () => number, curve = 0.25): string[] {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const mx = (x1 + x2) / 2 + (y2 - y1) * curve + (rand() - 0.5) * 4;
  const my = (y1 + y2) / 2 - (x2 - x1) * curve + (rand() - 0.5) * 4;
  // Head: two short strokes back from the tip, along the curve's end tangent.
  const tx = x2 - mx;
  const ty = y2 - my;
  const tl = Math.hypot(tx, ty) || 1;
  const ux = tx / tl;
  const uy = ty / tl;
  const head = 9;
  const spread = 0.5;
  const h1: Pt = [x2 - head * (ux * Math.cos(spread) - uy * Math.sin(spread)), y2 - head * (uy * Math.cos(spread) + ux * Math.sin(spread))];
  const h2: Pt = [x2 - head * (ux * Math.cos(-spread) - uy * Math.sin(-spread)), y2 - head * (uy * Math.cos(-spread) + ux * Math.sin(-spread))];
  return [
    `M${r1(x1)} ${r1(y1)} Q${r1(mx)} ${r1(my)} ${r1(x2)} ${r1(y2)}`,
    `M${r1(h1[0])} ${r1(h1[1])} L${r1(x2)} ${r1(y2)} L${r1(h2[0])} ${r1(h2[1])}`,
  ];
}
