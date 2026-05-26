import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../constants";
import { useTimelineFrame } from "./ambientMotion";
import { cinematicEase, impactEase } from "./animation";
import "./transitions.scss";

export const transitionProgress = (
  frame: number,
  start: number,
  duration: number,
) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: impactEase,
  });

export const EnergyPulseTransition = ({
  at,
  duration = 34,
  strength = 1,
}: {
  at: number;
  duration?: number;
  strength?: number;
}) => {
  const frame = useTimelineFrame();
  const progress = transitionProgress(frame, at, duration);
  const opacity = interpolate(progress, [0, 0.22, 0.74, 1], [0, 1, 0.28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });
  const scale = interpolate(progress, [0, 1], [0.08, 3.1]);

  return (
    <AbsoluteFill className="energy-pulse-transition" style={{ opacity }}>
      <div
        className="energy-pulse-transition__ring"
        style={{
          border: `${8 * strength}px solid ${COLORS.cyan}`,
          boxShadow: `0 0 ${110 * strength}px ${COLORS.cyan}, inset 0 0 ${70 * strength}px ${COLORS.blue}`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
      <AbsoluteFill
        className="energy-pulse-transition__bloom"
        style={{
          background: `radial-gradient(circle, rgba(24,244,255,${0.72 * strength}) 0%, rgba(22,136,255,0.18) 24%, transparent 58%)`,
        }}
      />
      <AbsoluteFill
        className="energy-pulse-transition__flash"
        style={{
          opacity: interpolate(progress, [0.16, 0.28, 0.44], [0, 0.82, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};

export const LightSweep = ({
  at,
  duration = 56,
}: {
  at: number;
  duration?: number;
}) => {
  const frame = useTimelineFrame();
  const progress = transitionProgress(frame, at, duration);
  const x = interpolate(progress, [0, 1], [-600, 2400]);
  const opacity = interpolate(progress, [0, 0.3, 0.75, 1], [0, 0.65, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="light-sweep" style={{ opacity }}>
      <div className="light-sweep__beam" style={{ left: x }} />
    </AbsoluteFill>
  );
};
