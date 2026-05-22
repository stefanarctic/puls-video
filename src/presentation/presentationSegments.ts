import { SCENE_DURATIONS, TIMELINE } from "../constants";
import { SLIDES, type SlideKey } from "./slideData";

export type PresentationSegment = {
  key: SlideKey;
  label: string;
  playFrom: number;
  holdAt: number;
};

const TRANSITION_LEAD_FRAMES: Partial<Record<SlideKey, number>> = {
  opening: 16,
  problem: 16,
  ecosystem: 16,
  bac: 16,
  simulations: 18,
  nuclear: 20,
  romania: 18,
  elinp: 20,
  ai: 16,
  community: 16,
  closing: 20,
};

const EXIT_LEAD_FRAMES: Record<SlideKey, number> = {
  splash: 24,
  opening: 48,
  problem: 48,
  ecosystem: 48,
  bac: 48,
  simulations: 48,
  nuclear: 48,
  romania: 48,
  elinp: 48,
  ai: 48,
  community: 40,
  closing: 36,
};

const HOLD_BUFFER = 2;

const buildSegment = (key: SlideKey, label: string): PresentationSegment => {
  const start = TIMELINE[key];
  const duration = SCENE_DURATIONS[key];
  const transitionLead = TRANSITION_LEAD_FRAMES[key] ?? 0;

  return {
    key,
    label,
    playFrom: key === "splash" ? 0 : start - transitionLead,
    holdAt: start + duration - EXIT_LEAD_FRAMES[key] - HOLD_BUFFER,
  };
};

export const PRESENTATION_SEGMENTS: PresentationSegment[] = SLIDES.map(
  (slide) => buildSegment(slide.key, slide.label),
);

export const PRESENTATION_SEGMENT_COUNT = PRESENTATION_SEGMENTS.length;
