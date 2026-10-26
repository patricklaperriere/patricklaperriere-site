// Home-page motion, loaded on demand by home-motion.ts (never under reduced
// motion). Two things only:
//
//   · soft fade-ups for content that is below the fold when this runs, so
//     nothing a visitor is already looking at ever disappears;
//   · the inspection: the section drawing is pinned while each layer is
//     traced in the accent colour, its marker lit and its text brought in.
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
const ACCENT = 'var(--signal)';
const DONE = 'var(--bone)';

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
  if (below.length) gsap.set(below, { opacity: 0, y: 24 });
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
  const layers = [...el.querySelectorAll<SVGGElement>('.iplan__layer')];
  const traces = layers.map((l) => [...l.querySelectorAll<SVGPathElement>('[data-trace] path')]);
  const markers = layers.map((l) => l.querySelector<SVGGElement>('[data-marker]')!);
  const texts = [...el.querySelectorAll<HTMLElement>('[data-layer-text]')];

  gsap.set(traces.flat(), { drawSVG: '0%', stroke: ACCENT });
  gsap.set(markers, { opacity: 0.4 });
  gsap.set(texts.slice(1), { autoAlpha: 0, y: 16 });
  return { el, traces, markers, texts };
}

function inspection() {
  stage = prepareInspection();
  return () => {
    stage?.el.classList.remove('is-pinned');
    stage = null;
  };
}

function inspectionTimeline() {
  if (!stage) return;
  const { el, traces, markers, texts } = stage;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: () => `+=${window.innerHeight * 2.4}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  traces.forEach((paths, i) => {
    const at = i * 2;
    if (i > 0) {
      tl.to(texts[i - 1], { autoAlpha: 0, y: -16, duration: 0.4, ease: 'power1.in' }, at);
      tl.to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at + 0.2);
      tl.to(traces[i - 1], { stroke: DONE, duration: 0.4 }, at);
      tl.to(markers[i - 1], { opacity: 0.4, duration: 0.3 }, at);
    }
    tl.to(markers[i], { opacity: 1, duration: 0.3 }, at);
    tl.to(paths, { drawSVG: '100%', duration: 1.4, stagger: { amount: 0.4 } }, at + 0.1);
  });
  tl.to(traces[traces.length - 1], { stroke: DONE, duration: 0.4 });
  tl.to({}, { duration: 0.4 });
}

export async function start() {
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
  const mm = gsap.matchMedia();
  for (const step of [smoothScroll, hideBelowFold, inspection, inspectionTimeline, fades]) {
    mm.add(MOTION, step);
    await yieldToMain();
  }
}
