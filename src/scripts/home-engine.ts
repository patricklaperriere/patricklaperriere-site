// Home-page motion, loaded on demand by home-motion.ts (never under reduced
// motion). Two things only:
//
//   · soft fade-ins for content still below the fold when this runs, from 0.6
//     opacity over 12px: nothing a visitor already sees ever disappears;
//   · the inspection scene (HouseScene.astro), pinned for 2.5 screens on a
//     desktop and 2 on a phone: the house comes apart, then each layer is
//     swept by the scan rule, traced stroke by stroke, washed in plum, marked
//     "Conforme" and tied to its text by a leader line, while a large outlined
//     word drifts behind; the house closes and the "Inspecté" stamp lands.
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
  const word = el.querySelector<HTMLElement>('[data-word]')!;
  const notes = [...el.querySelectorAll<HTMLElement>('[data-note]')];
  const notesBox = el.querySelector<HTMLElement>('.scene__notes')!;
  const draw = el.querySelector<HTMLElement>('.scene__draw')!;

  // Desktop: the notes sit on their leader lines, so the notes column needs
  // the drawing's height and top offset. Re-measured on every refresh.
  const place = () => {
    const d = draw.getBoundingClientRect();
    const n = notesBox.getBoundingClientRect();
    el.style.setProperty('--draw-h', `${d.height}px`);
    el.style.setProperty('--draw-top', `${d.top - n.top}px`);
  };
  ScrollTrigger.addEventListener('refreshInit', () => el.style.removeProperty('--draw-top'));
  ScrollTrigger.addEventListener('refresh', place);
  place();

  gsap.set(traces.flat(), { drawSVG: '0%', stroke: token('--signal') });
  gsap.set(fills, { opacity: 0.12 });
  gsap.set([...tags, ...anchors], { autoAlpha: 0 });
  gsap.set(leaders, { drawSVG: '0%' });
  gsap.set(scan, { autoAlpha: 0, y: spans[0][0] });
  gsap.set(stamp, { autoAlpha: 0, scale: 1.6, transformOrigin: '50% 50%' });
  gsap.set(notes, { autoAlpha: 0, y: 12 });
  return { el, svg, body, layers, traces, fills, tags, leaders, anchors, spans, scan, stamp, word, notes };
}

function sceneSetup() {
  scene = prepareScene();
  return () => {
    scene?.el.classList.remove('is-live');
    scene = null;
  };
}

// Travel of the exploded view, in viewBox units.
const EXPLODE = 50;

function sceneTimeline() {
  if (!scene) return;
  const { el, body, layers, traces, fills, tags, leaders, anchors, spans, scan, stamp, word, notes } = scene;
  const done = token('--bone');
  const last = layers.length - 1;
  const desktop = window.matchMedia(DESKTOP).matches;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      // The stage is one screen; the pin adds 1.5 more on a desktop, 1 on a phone.
      end: () => `+=${window.innerHeight * (desktop ? 1.5 : 1)}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  // The word drifts the whole way, behind everything.
  tl.fromTo(word, { xPercent: 4 }, { xPercent: -38, duration: 4.8 }, 0);

  // Open: the house grows a little and comes apart.
  // An absolute SVG origin, in both states: a transformOrigin set on the "to"
  // side alone makes GSAP compensate with a translate that outlives the scale.
  tl.fromTo(body, { scale: 0.94, svgOrigin: '500 300' }, { scale: 1, svgOrigin: '500 300', duration: 0.5, ease: 'power2.out' }, 0);
  tl.to(layers[0], { y: -EXPLODE, duration: 0.5, ease: 'power3.inOut' }, 0);
  tl.to(layers[last], { y: EXPLODE, duration: 0.5, ease: 'power3.inOut' }, 0);
  tl.set(scan, { autoAlpha: 1 }, 0.5);

  traces.forEach((paths, i) => {
    const at = 0.5 + i * 1.2;
    const [top, bottom] = spans[i];
    // The scan rule rides with its layer, so add that layer's explode offset.
    const off = i === 0 ? -EXPLODE : i === last ? EXPLODE : 0;
    if (i > 0) {
      tl.to(notes[i - 1], { autoAlpha: 0, y: -12, duration: 0.25 }, at);
      tl.to(traces[i - 1], { stroke: done, duration: 0.3 }, at);
      tl.to(fills[i - 1], { opacity: 0.4, duration: 0.3 }, at);
      tl.to([leaders[i - 1], anchors[i - 1]], { autoAlpha: 0, duration: 0.2 }, at);
    }
    tl.fromTo(scan, { y: top + off }, { y: bottom + off, duration: 0.9, ease: 'power1.inOut' }, at);
    tl.to(paths, { drawSVG: '100%', duration: 0.9, stagger: { each: 0.9 / (paths.length + 1) } }, at);
    tl.to(fills[i], { opacity: 1, duration: 0.4 }, at + 0.3);
    tl.to(anchors[i], { autoAlpha: 1, duration: 0.1 }, at + 0.25);
    tl.fromTo(leaders[i], { drawSVG: '0%' }, { drawSVG: '100%', autoAlpha: 1, duration: 0.3, immediateRender: false }, at + 0.25);
    tl.to(notes[i], { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, at + 0.35);
    tl.to(tags[i], { autoAlpha: 1, duration: 0.2 }, at + 0.85);
  });

  // Close: the last layer settles, the house comes back together, the stamp.
  const end = 0.5 + layers.length * 1.2;
  tl.set(scan, { autoAlpha: 0 }, end);
  tl.to(traces[last], { stroke: done, duration: 0.3 }, end);
  tl.to(fills, { opacity: 0.4, duration: 0.3 }, end);
  tl.to([leaders[last], anchors[last]], { autoAlpha: 0, duration: 0.2 }, end);
  tl.to([layers[0], layers[last]], { y: 0, duration: 0.5, ease: 'power3.inOut' }, end);
  tl.to(stamp, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, end + 0.4);
  tl.to({}, { duration: 0.2 });
}

export async function start() {
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  const mm = gsap.matchMedia();
  for (const step of [smoothScroll, hideBelowFold, sceneSetup, sceneTimeline, fades]) {
    mm.add(MOTION, step);
    await yieldToMain();
  }
}
