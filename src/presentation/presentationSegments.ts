import { SCENE_DURATIONS, TIMELINE } from "../constants";
import { sceneKeys, type SceneKey } from "../utils/scene";

export type PresentationSegment = {
  key: SceneKey;
  label: string;
  playFrom: number;
  holdAt: number;
};

const SCENE_LABELS: Record<SceneKey, string> = {
  problem: "Problem",
  shift: "Shift",
  interactive: "Interactive Physics",
  ai: "AI Assistant",
  gamification: "Gamification",
  final: "Final Brand",
};

// Matches transition offsets in Composition.tsx (EnergyPulseTransition / LightSweep).
const TRANSITION_LEAD_FRAMES: Partial<Record<SceneKey, number>> = {
  shift: 20,
  interactive: 22,
  ai: 18,
  gamification: 18,
  final: 24,
};

// Frames before scene end where exit animations begin.
const EXIT_LEAD_FRAMES: Record<SceneKey, number> = {
  problem: 58,
  shift: 24,
  interactive: 24,
  ai: 24,
  gamification: 24,
  final: 34,
};

const HOLD_BUFFER = 2;

const buildSegment = (key: SceneKey): PresentationSegment => {
  const start = TIMELINE[key];
  const duration = SCENE_DURATIONS[key];
  const transitionLead = TRANSITION_LEAD_FRAMES[key] ?? 0;

  return {
    key,
    label: SCENE_LABELS[key],
    playFrom: key === "problem" ? 0 : start - transitionLead,
    holdAt: start + duration - EXIT_LEAD_FRAMES[key] - HOLD_BUFFER,
  };
};

export const PRESENTATION_SEGMENTS: PresentationSegment[] =
  sceneKeys.map(buildSegment);

export const PRESENTATION_SEGMENT_COUNT = PRESENTATION_SEGMENTS.length;
