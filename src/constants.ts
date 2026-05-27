export const VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
};

/** Slide durations in frames (30 fps) — ~8 min total per plan. */
export const SCENE_DURATIONS = {
  splash: 180,
  opening: 900,
  problem: 1350,
  ecosystem: 1500,
  resurse: 1500,
  bac: 1500,
  simulations: 1800,
  nuclear: 1800,
  romania: 2040,
  elinp: 2040,
  ai: 1500,
  community: 1200,
  closing: 1140,
} as const;

const slideOrder = [
  "splash",
  "opening",
  "problem",
  "ecosystem",
  "resurse",
  "bac",
  "simulations",
  "nuclear",
  "romania",
  "elinp",
  "ai",
  "community",
  "closing",
] as const;

const buildTimeline = () => {
  let cursor = 0;
  const timeline: Record<string, number> = {};

  for (const key of slideOrder) {
    timeline[key] = cursor;
    cursor += SCENE_DURATIONS[key];
  }

  return timeline as Record<(typeof slideOrder)[number], number>;
};

export const TIMELINE = buildTimeline();

export const TOTAL_DURATION = slideOrder.reduce(
  (sum, key) => sum + SCENE_DURATIONS[key],
  0,
);

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
