import { Easing, interpolate, spring } from "remotion";

export const cinematicEase = Easing.bezier(0.16, 1, 0.3, 1);
export const impactEase = Easing.bezier(0.7, 0, 0.13, 1);
export const softEase = Easing.bezier(0.22, 0.61, 0.36, 1);

export const smoothProgress = (
  frame: number,
  start: number,
  duration: number,
  easing = cinematicEase,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const exitProgress = (
  frame: number,
  start: number,
  duration: number,
  easing = impactEase,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const enterExitOpacity = (
  frame: number,
  duration: number,
  enterDuration = 20,
  exitDuration = 22,
) => {
  const enter = smoothProgress(frame, 0, enterDuration);
  const exit = exitProgress(frame, duration - exitDuration, exitDuration);
  return enter * (1 - exit);
};

export const springIn = (
  frame: number,
  fps: number,
  delay = 0,
  damping = 18,
  stiffness = 110,
) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping,
      stiffness,
      mass: 0.9,
    },
  });

export const looping = (frame: number, speed: number, phase = 0) =>
  Math.sin(frame * speed + phase);

export const drift = (
  frame: number,
  x: number,
  y: number,
  speed = 0.018,
  phase = 0,
) => ({
  x: looping(frame, speed, phase) * x,
  y: looping(frame, speed * 0.78, phase + 1.7) * y,
});

export const flicker = (frame: number, seed = 0) =>
  0.72 +
  Math.sin(frame * 0.41 + seed) * 0.16 +
  Math.sin(frame * 0.097 + seed * 2.1) * 0.12;

export const stagger = (index: number, amount: number) => index * amount;
