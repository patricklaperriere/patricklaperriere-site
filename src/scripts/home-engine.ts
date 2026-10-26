// Home-page motion, loaded on demand by home-motion.ts (never under reduced
// motion). Two things only:
//
//   · soft fade-ins for content still below the fold when this runs, from 0.6
//     opacity over 12px: nothing a visitor already sees ever disappears;
//   · the inspection: the plan is pinned, pulled apart into an exploded view,
//     and each layer in turn gets its mauve wash, its traced outline and its
//     annotation (on phones, a caption under the plan); then the house closes
//     again. The full text of each layer follows the pinned plan.
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

let stage: ReturnType<typeof prepareInspection> = null;

function prepareInspection() {
  const el = document.querySelector<HTMLElement>('[data-insp-stage]');
  if (!el) return null;
  el.classList.add('is-pinned');
  const body = el.querySelector<SVGGElement>('[data-plan-body]')!;
  const layers = [...el.querySelectorAll<SVGGElement>('.iplan__layer')];
  const traces = layers.map((l) => [...l.querySelectorAll<SVGPathElement>('[data-trace] path')]);
  const fills = layers.map((l) => l.querySelector<SVGPathElement>('[data-fill]')!);
  const notes = layers.map((l) => l.querySelector<SVGGElement>('[data-note]')!);
  const captions = [...el.querySelectorAll<HTMLElement>('[data-caption]')];
  const accent = token('--mauve-light');
  const done = token('--bone');

  gsap.set(traces.flat(), { drawSVG: '0%', stroke: accent });
  gsap.set(fills, { opacity: 0.15 });
  gsap.set(notes, { opacity: 0.35 });
  gsap.set(captions, { autoAlpha: 0, y: 8 });
  return { el, body, layers, traces, fills, notes, captions, done };
}

function inspection() {
  stage = prepareInspection();
  return () => {
    stage?.el.classList.remove('is-pinned');
    stage = null;
  };
}

// Travel of the exploded view, in viewBox units (the pinned plan reserves 120).
const EXPLODE = 60;

function inspectionTimeline() {
  if (!stage) return;
  const { el, body, layers, traces, fills, notes, captions, done } = stage;
  const last = layers.length - 1;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: () => `+=${window.innerHeight * 2.8}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  // Open: the plan grows and comes apart, roof lifted, foundations dropped.
  tl.fromTo(body, { scale: 0.9 }, { scale: 1, duration: 0.8, transformOrigin: '50% 50%', ease: 'power2.out' }, 0);
  tl.to(layers[0], { y: -EXPLODE, duration: 0.8, ease: 'power3.inOut' }, 0);
  tl.to(layers[last], { y: EXPLODE, duration: 0.8, ease: 'power3.inOut' }, 0);

  traces.forEach((paths, i) => {
    const at = 0.8 + i * 1.6;
    if (i > 0) {
      tl.to(traces[i - 1], { stroke: done, duration: 0.4 }, at);
      tl.to(fills[i - 1], { opacity: 0.35, duration: 0.4 }, at);
      tl.to(notes[i - 1], { opacity: 0.35, duration: 0.3 }, at);
      tl.to(captions[i - 1], { autoAlpha: 0, y: -8, duration: 0.3 }, at);
    }
    tl.to(captions[i], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.1);
    tl.to(fills[i], { opacity: 1, duration: 0.4 }, at);
    tl.to(notes[i], { opacity: 1, duration: 0.3 }, at);
    tl.to(paths, { drawSVG: '100%', duration: 1.1, stagger: { amount: 0.3 } }, at + 0.1);
  });

  // Close: the last layer settles and the house comes back together.
  const end = 0.8 + layers.length * 1.6;
  tl.to(traces[last], { stroke: done, duration: 0.4 }, end);
  tl.to(fills, { opacity: 0.35, duration: 0.4 }, end);
  tl.to(notes, { opacity: 1, duration: 0.4 }, end);
  tl.to([layers[0], layers[last]], { y: 0, duration: 0.8, ease: 'power3.inOut' }, end);
  tl.to({}, { duration: 0.3 });
}

export async function start() {
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  const mm = gsap.matchMedia();
  for (const step of [smoothScroll, hideBelowFold, inspection, inspectionTimeline, fades]) {
    mm.add(MOTION, step);
    await yieldToMain();
  }
}
