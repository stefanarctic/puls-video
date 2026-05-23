import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { ASSETS, PRESENTATION_ASSETS } from "../assets";
import { SCENE_DURATIONS, TIMELINE } from "../constants";
import type { SlideKey } from "./slideData";

export type SlideComponentProps = { duration: number };
export type SlideComponent = ComponentType<SlideComponentProps>;

type SlideModule = { default: ComponentType<SlideComponentProps> };

const slideImporters: Record<
  SlideKey,
  () => Promise<SlideModule>
> = {
  splash: () =>
    import("../scenes/slides/SplashSlide").then((m) => ({
      default: m.SplashSlide,
    })),
  opening: () =>
    import("../scenes/slides/OpeningSlide").then((m) => ({
      default: m.OpeningSlide,
    })),
  problem: () =>
    import("../scenes/slides/ProblemSlide").then((m) => ({
      default: m.ProblemSlide,
    })),
  ecosystem: () =>
    import("../scenes/slides/EcosystemSlide").then((m) => ({
      default: m.EcosystemSlide,
    })),
  bac: () =>
    import("../scenes/slides/BacSlide").then((m) => ({ default: m.BacSlide })),
  simulations: () =>
    import("../scenes/slides/SimulationsSlide").then((m) => ({
      default: m.SimulationsSlide,
    })),
  nuclear: () =>
    import("../scenes/slides/NuclearSlide").then((m) => ({
      default: m.NuclearSlide,
    })),
  romania: () =>
    import("../scenes/slides/RomaniaStorySlide").then((m) => ({
      default: m.RomaniaStorySlide,
    })),
  elinp: () =>
    import("../scenes/slides/EliNpSlide").then((m) => ({
      default: m.EliNpSlide,
    })),
  ai: () =>
    import("../scenes/slides/AiSlide").then((m) => ({ default: m.AiSlide })),
  community: () =>
    import("../scenes/slides/CommunitySlide").then((m) => ({
      default: m.CommunitySlide,
    })),
  closing: () =>
    import("../scenes/slides/ClosingSlide").then((m) => ({
      default: m.ClosingSlide,
    })),
};

export const SLIDE_ASSETS: Record<SlideKey, readonly string[]> = {
  splash: [ASSETS.logo],
  opening: [PRESENTATION_ASSETS.pendul],
  problem: [PRESENTATION_ASSETS.probleme],
  ecosystem: [PRESENTATION_ASSETS.resurseSimulari],
  bac: [PRESENTATION_ASSETS.probleme],
  simulations: [
    PRESENTATION_ASSETS.pendul,
    PRESENTATION_ASSETS.unde,
    PRESENTATION_ASSETS.proiectil,
    PRESENTATION_ASSETS.circuite,
  ],
  nuclear: [
    PRESENTATION_ASSETS.probleme,
    PRESENTATION_ASSETS.apaGrea,
    PRESENTATION_ASSETS.fisiune,
    PRESENTATION_ASSETS.fuziune,
  ],
  romania: [PRESENTATION_ASSETS.schimbIzotopic],
  elinp: [
    PRESENTATION_ASSETS.eliNp,
    PRESENTATION_ASSETS.laser,
    PRESENTATION_ASSETS.accelerator,
  ],
  ai: [PRESENTATION_ASSETS.asistent],
  community: [PRESENTATION_ASSETS.landing],
  closing: [ASSETS.logo],
};

export type TransitionSpec = {
  targetIndex: number;
  type: "pulse" | "sweep";
  at: number;
  duration: number;
  strength?: number;
};

export const SLIDE_TRANSITIONS: TransitionSpec[] = [
  {
    targetIndex: 1,
    type: "pulse",
    at: TIMELINE.opening - 16,
    duration: 44,
    strength: 1.05,
  },
  {
    targetIndex: 1,
    type: "sweep",
    at: TIMELINE.opening - 12,
    duration: 40,
  },
  {
    targetIndex: 2,
    type: "pulse",
    at: TIMELINE.problem - 16,
    duration: 40,
    strength: 0.9,
  },
  {
    targetIndex: 3,
    type: "sweep",
    at: TIMELINE.ecosystem - 16,
    duration: 48,
  },
  {
    targetIndex: 4,
    type: "pulse",
    at: TIMELINE.bac - 16,
    duration: 38,
    strength: 0.75,
  },
  {
    targetIndex: 5,
    type: "sweep",
    at: TIMELINE.simulations - 18,
    duration: 52,
  },
  {
    targetIndex: 6,
    type: "pulse",
    at: TIMELINE.nuclear - 20,
    duration: 52,
    strength: 1.15,
  },
  {
    targetIndex: 7,
    type: "sweep",
    at: TIMELINE.romania - 18,
    duration: 48,
  },
  {
    targetIndex: 8,
    type: "pulse",
    at: TIMELINE.elinp - 20,
    duration: 54,
    strength: 1.2,
  },
  {
    targetIndex: 9,
    type: "sweep",
    at: TIMELINE.ai - 16,
    duration: 44,
  },
  {
    targetIndex: 10,
    type: "pulse",
    at: TIMELINE.community - 16,
    duration: 38,
    strength: 0.8,
  },
  {
    targetIndex: 11,
    type: "pulse",
    at: TIMELINE.closing - 20,
    duration: 56,
    strength: 1,
  },
];

const lazySlides = {} as Record<
  SlideKey,
  LazyExoticComponent<SlideComponent>
>;

for (const key of Object.keys(slideImporters) as SlideKey[]) {
  lazySlides[key] = lazy(slideImporters[key]);
}

const modulePromises = new Map<SlideKey, Promise<SlideModule>>();

export const getLazySlide = (key: SlideKey) => lazySlides[key];

export const getSlideDuration = (key: SlideKey) => SCENE_DURATIONS[key];

export const getSlideTimelineStart = (key: SlideKey) => TIMELINE[key];

export const preloadSlideModule = (key: SlideKey) => {
  const existing = modulePromises.get(key);
  if (existing) {
    return existing;
  }

  const promise = slideImporters[key]();
  modulePromises.set(key, promise);
  return promise;
};

export const getMountedSegmentIndices = (
  activeIndex: number,
  phase: "idle" | "playing",
) => {
  if (phase === "playing" && activeIndex > 0) {
    return [activeIndex - 1, activeIndex];
  }

  return [activeIndex];
};
