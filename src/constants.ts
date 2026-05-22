export const VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
};

export const SCENE_DURATIONS = {
  problem: 180,
  shift: 135,
  interactive: 210,
  ai: 210,
  gamification: 165,
  final: 180,
} as const;

export const TIMELINE = {
  problem: 0,
  shift: SCENE_DURATIONS.problem,
  interactive: SCENE_DURATIONS.problem + SCENE_DURATIONS.shift,
  ai:
    SCENE_DURATIONS.problem +
    SCENE_DURATIONS.shift +
    SCENE_DURATIONS.interactive,
  gamification:
    SCENE_DURATIONS.problem +
    SCENE_DURATIONS.shift +
    SCENE_DURATIONS.interactive +
    SCENE_DURATIONS.ai,
  final:
    SCENE_DURATIONS.problem +
    SCENE_DURATIONS.shift +
    SCENE_DURATIONS.interactive +
    SCENE_DURATIONS.ai +
    SCENE_DURATIONS.gamification,
};

export const TOTAL_DURATION =
  SCENE_DURATIONS.problem +
  SCENE_DURATIONS.shift +
  SCENE_DURATIONS.interactive +
  SCENE_DURATIONS.ai +
  SCENE_DURATIONS.gamification +
  SCENE_DURATIONS.final;

export const COLORS = {
  black: "#02040b",
  navy: "#06111f",
  deepNavy: "#08182c",
  cyan: "#18f4ff",
  blue: "#1688ff",
  electricBlue: "#3aa8ff",
  white: "#f7fbff",
  muted: "#88a9c8",
  panel: "rgba(9, 25, 45, 0.72)",
};

export const FONT_FAMILY =
  "Inter, Satoshi, Avenir Next, Helvetica Neue, Arial, sans-serif";
