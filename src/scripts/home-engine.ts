// Home-page motion, loaded on demand by home-motion.ts (never under reduced
// motion). Two things only:
//
//   · soft fade-ins for content still below the fold when this runs, from 0.6
//     opacity over 12px: nothing a visitor already sees ever disappears;
//   · the inspection scene (HouseScene.astro), pinned for one extra screen on
//     a desktop (heading included, centred under the header) and three
//     quarters of one below 1024px (drawing and text only, just under the
//     header): the house comes apart, then each layer in turn is swept by the
//     scan rule and traced stroke by stroke while its text comes in beside
//     it, tied by a leader line; once traced, it is marked "Conforme". The
//     house closes and the "Inspecté" stamp lands.
//
// Setup runs in steps, each in its own gsap.matchMedia() handler with a yield
// in between: no long task, and every step reverts on its own if the visitor
// switches to reduced motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const MOTION = '(prefers-reduced-motion: no-preference)';
const DESKTOP = '(min-width: 1024px)';
const yieldToMain = () => new Promise((resolve) => setTimeout(resolve, 0));
// Resolved from the theme at run time: GSAP interpolates colours, not var().
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function smoothScroll() {
  // Wheel only: touch keeps native scrolling.
  const lenis = new Lenis({ autoRaf: false, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

// Measured before the pin exists (its spacer would push everything down), and
// wired after it, so the batch triggers are created below the pin in page
// order and see the final layout.
let below: HTMLElement[] = [];

function hideBelowFold() {
  below = [...document.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight,
  );
  // Opacity only (not visibility): a faded heading stays in the accessibility
  // tree, so the outline is the same before and after it fades in.
  if (below.length) gsap.set(below, { opacity: 0.6, y: 12 });
}

function fades() {
  if (!below.length) return;
  ScrollTrigger.batch(below, {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.08, overwrite: true }),
  });
}

// ---- The scene ------------------------------------------------------------------
// Travel of the exploded view, in viewBox units.
const EXPLODE = 50;
// Narrowest note column (18rem) and the gap before it, as in HouseScene.astro;
// the drawing never grows past MAX_DRAW (about 7 columns).
const NOTE_MIN = 288;
const NOTE_GAP = 40;
const MAX_DRAW = 760;
// Where the pinned block sits. Desktop (heading included): centred in the
// screen under the header, at least 32px below it. Below 1024px (the heading
// scrolls away): 16px under the header. A block taller than the room pins by
// its bottom instead.
const navH = () => document.getElementById('site-nav')?.offsetHeight ?? 72;
const margin = () => (window.matchMedia(DESKTOP).matches ? 32 : 16);
const fits = (h: number) => h <= window.innerHeight - navH() - 2 * margin();
const pinAt = (h: number) =>
  window.matchMedia(DESKTOP).matches
    ? Math.round(Math.max(navH() + margin(), navH() + (window.innerHeight - navH() - h) / 2))
    : navH() + margin();
// A note may run this far past the bottom of the drawing rather than bend
// its leader by a few pixels.
const SLACK = 48;

let scene: ReturnType<typeof prepareScene> = null;

function prepareScene() {
  const el = document.querySelector<HTMLElement>('[data-scene]');
  if (!el) return null;
  el.classList.add('is-live');
  const svg = el.querySelector<SVGSVGElement>('[data-house]')!;
  const body = el.querySelector<SVGGElement>('[data-house-body]')!;
  const layers = [...el.querySelectorAll<SVGGElement>('.house__layer')];
  const traces = layers.map((l) => [...l.querySelectorAll<SVGPathElement>('[data-trace] path')]);
  const fills = layers.map((l) => l.querySelector<SVGPathElement>('[data-fill]')!);
  const tags = layers.map((l) => l.querySelector<SVGGElement>('[data-tag]')!);
  const leaders = layers.map((l) => l.querySelector<SVGPathElement>('[data-leader]')!);
  const anchors = layers.map((l) => l.querySelector<SVGCircleElement>('[data-anchor]')!);
  const spans = layers.map((l) => l.dataset.span!.split(' ').map(Number) as [number, number]);
  const scan = el.querySelector<SVGGElement>('[data-scan]')!;
  const stamp = el.querySelector<SVGGElement>('[data-stamp]')!;
  const notes = [...el.querySelectorAll<HTMLElement>('[data-note]')];
  const notesBox = el.querySelector<HTMLElement>('.scene__notes')!;

  const ends = anchors.map((a) => [Number(a.getAttribute('cx')), Number(a.getAttribute('cy'))]);
  // Each layer's offset in the exploded view, when its note is shown.
  const shift = layers.map((_, i) => (i === 0 ? -EXPLODE : i === layers.length - 1 ? EXPLODE : 0));

  // Re-measured on every refresh. Desktop: the drawing takes the height left
  // under the heading once pinned, up to MAX_DRAW wide and leaving the notes
  // at least NOTE_MIN; its width is rounded to 20px so the plan's round
  // coordinates land on whole pixels.
  // The notes box keeps the tallest note's height, since the notes are
  // stacked. Each note's label sits on its leader line; a note that would
  // run more than SLACK past the bottom of the drawing moves up, and its
  // leader bends to meet it. Every leader ends 8px short of its note.
  const stage = el.querySelector<HTMLElement>('.scene__stage')!;
  const place = () => {
    const desktop = window.matchMedia(DESKTOP).matches;
    const tallest = Math.max(...notes.map((n) => n.offsetHeight));
    el.style.setProperty('--notes-h', `${tallest}px`);
    if (desktop) {
      const room = window.innerHeight - navH() - 2 * margin() - (stage.getBoundingClientRect().top - el.getBoundingClientRect().top);
      const w = Math.min(MAX_DRAW, el.clientWidth - NOTE_MIN - NOTE_GAP, (room * 1000) / 560);
      el.style.setProperty('--draw-w', `${Math.max(400, Math.floor(w / 20) * 20)}px`);
    }
    const d = svg.getBoundingClientRect();
    const n = notesBox.getBoundingClientRect();
    const drawTop = d.top - n.top;
    const floor = d.bottom - n.top;
    const scale = d.height / 560;
    let reach = tallest;
    notes.forEach((note, i) => {
      const [x, y] = ends[i];
      if (!desktop) {
        note.style.removeProperty('top');
        leaders[i].setAttribute('d', `M${x} ${y} H1000`);
        return;
      }
      const name = note.querySelector<HTMLElement>('.note__name')!;
      const mid = name.offsetTop + name.offsetHeight / 2;
      const line = drawTop + (y + shift[i]) * scale;
      const h = note.offsetHeight;
      const top = Math.round(Math.max(0, line - mid + h > floor + SLACK ? floor - h : line - mid));
      reach = Math.max(reach, top + h);
      note.style.top = `${top}px`;
      const meet = Math.round(((top + mid - drawTop) / scale - shift[i]) * 10) / 10;
      const tip = Math.round((n.left - d.left - 8) / scale);
      const bend = Math.round((960 + tip) / 2);
      leaders[i].setAttribute('d', Math.abs(meet - y) < 1 ? `M${x} ${y} H${tip}` : `M${x} ${y} H${bend} V${meet} H${tip}`);
    });
    if (desktop) el.style.setProperty('--notes-h', `${reach}px`);
  };
  // Placed before the triggers re-measure, so the leader tweens pick up
  // the new path lengths, and again once the layout has settled.
  ScrollTrigger.addEventListener('refreshInit', place);
  ScrollTrigger.addEventListener('refresh', place);
  place();

  gsap.set(traces.flat(), { drawSVG: '0%', stroke: token('--signal') });
  gsap.set(fills, { opacity: 0.12 });
  gsap.set([...tags, ...anchors], { autoAlpha: 0 });
  gsap.set(leaders, { drawSVG: '0%' });
  gsap.set(scan, { autoAlpha: 0, y: spans[0][0] });
  gsap.set(stamp, { autoAlpha: 0, scale: 1.6, transformOrigin: '50% 50%' });
  gsap.set(notes, { autoAlpha: 0, y: 8 });
  return { el, stage, svg, body, layers, traces, fills, tags, leaders, anchors, spans, scan, stamp, notes };
}

function sceneSetup() {
  scene = prepareScene();
  return () => {
    scene?.el.classList.remove('is-live');
    scene = null;
  };
}

// Timeline units: the opening takes OPEN, then each layer one SEG, end to end,
// never overlapping. Within a layer's segment: the previous text and leader
// leave and the scan rule moves to the layer (0 to HAND); then the text, its
// leader and the tracing all start together and the tracing, the plum wash
// and the scan end together (HAND to TAG); the "Conforme" tag lands (TAG to
// 0.95); a short hold. After the last layer the house closes, then the stamp.
const OPEN = 0.4;
const SEG = 1;
const HAND = 0.15;
const TAG = 0.85;

function sceneTimeline() {
  if (!scene) return;
  const { el, stage, body, layers, traces, fills, tags, leaders, anchors, spans, scan, stamp, notes } = scene;
  const done = token('--bone');
  const last = layers.length - 1;
  const desktop = window.matchMedia(DESKTOP).matches;

  // Desktop: the whole scene, heading included. Below 1024px: only the
  // drawing and its text, so the heading never slides beneath the header.
  const target = desktop ? el : stage;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: target,
      start: () => {
        const h = target.offsetHeight;
        // Pinned by its bottom, the block gives up its bottom margin before
        // it would slip under the header.
        return fits(h) ? `top ${pinAt(h)}px` : `bottom bottom-=${Math.max(0, Math.min(margin(), window.innerHeight - navH() - h))}`;
      },
      // One extra screen on a desktop, three quarters of one on a phone.
      end: () => `+=${window.innerHeight * (desktop ? 1 : 0.75)}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  // Open: the house grows a little and comes apart.
  // An absolute SVG origin, in both states: a transformOrigin set on the "to"
  // side alone makes GSAP compensate with a translate that outlives the scale.
  tl.fromTo(body, { scale: 0.94, svgOrigin: '500 300' }, { scale: 1, svgOrigin: '500 300', duration: OPEN, ease: 'power2.out' }, 0);
  tl.to(layers[0], { y: -EXPLODE, duration: OPEN, ease: 'power3.inOut' }, 0);
  tl.to(layers[last], { y: EXPLODE, duration: OPEN, ease: 'power3.inOut' }, 0);

  const off = (i: number) => (i === 0 ? -EXPLODE : i === last ? EXPLODE : 0);
  tl.set(scan, { autoAlpha: 1, y: spans[0][0] + off(0) }, OPEN);
  traces.forEach((paths, i) => {
    const at = OPEN + i * SEG;
    const [top, bottom] = spans[i];
    // The scan rule rides with its layer, so add that layer's explode offset.
    const go = at + (i > 0 ? HAND : 0);
    const sweep = at + TAG - go;
    if (i > 0) {
      tl.to(notes[i - 1], { autoAlpha: 0, y: -8, duration: HAND }, at);
      tl.to([leaders[i - 1], anchors[i - 1]], { autoAlpha: 0, duration: HAND }, at);
      tl.to(traces[i - 1], { stroke: done, duration: HAND }, at);
      tl.to(fills[i - 1], { opacity: 0.4, duration: HAND }, at);
      tl.to(scan, { y: top + off(i), duration: HAND, ease: 'power1.inOut' }, at);
    }
    tl.to(notes[i], { autoAlpha: 1, y: 0, duration: HAND, ease: 'power2.out' }, go);
    tl.to(anchors[i], { autoAlpha: 1, duration: HAND }, go);
    tl.fromTo(leaders[i], { drawSVG: '0%' }, { drawSVG: '100%', autoAlpha: 1, duration: HAND, immediateRender: false }, go);
    // Stroke after stroke, the last one ending with the sweep.
    tl.to(paths, { drawSVG: '100%', duration: sweep / paths.length, stagger: sweep / paths.length }, go);
    tl.fromTo(scan, { y: top + off(i) }, { y: bottom + off(i), duration: sweep, immediateRender: false }, go);
    tl.to(fills[i], { opacity: 1, duration: sweep }, go);
    tl.to(tags[i], { autoAlpha: 1, duration: 0.1 }, at + TAG);
  });

  // Close: the last layer settles, the house comes back together, the stamp.
  const end = OPEN + layers.length * SEG;
  tl.set(scan, { autoAlpha: 0 }, end);
  tl.to(traces[last], { stroke: done, duration: HAND }, end);
  tl.to(fills, { opacity: 0.4, duration: HAND }, end);
  tl.to([leaders[last], anchors[last]], { autoAlpha: 0, duration: HAND }, end);
  tl.to([layers[0], layers[last]], { y: 0, duration: 0.4, ease: 'power3.inOut' }, end);
  tl.to(stamp, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, end + 0.4);
  tl.to({}, { duration: 0.3 });
}

export async function start() {
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  const mm = gsap.matchMedia();
  for (const step of [smoothScroll, hideBelowFold, sceneSetup, sceneTimeline, fades]) {
    mm.add(MOTION, step);
    await yieldToMain();
  }
}
