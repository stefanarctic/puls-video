import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { looping } from "../utils/animation";

type ParticleFieldProps = {
  count?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  energy?: number;
};

export const ParticleField = ({
  count = 72,
  speed = 1,
  opacity = 0.5,
  color = COLORS.cyan,
  energy = 1,
}: ParticleFieldProps) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, index) => {
        const seed = index * 97.13;
        const x = ((index * 137.5) % 1920) - 60;
        const y = ((index * 241.9) % 1080) - 40;
        const depth = 0.35 + ((index * 29) % 100) / 100;
        const driftX =
          looping(frame, 0.012 * speed * depth, seed) * 60 * energy +
          frame * 0.18 * speed * depth;
        const driftY = looping(frame, 0.019 * speed * depth, seed + 2) * 34;
        const size = 1.5 + depth * 4.5;
        const alpha =
          opacity *
          interpolate(looping(frame, 0.06, seed), [-1, 1], [0.25, 1]);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: 999,
              background: color,
              opacity: alpha,
              boxShadow: `0 0 ${18 * depth}px ${color}`,
              transform: `translate3d(${driftX}px, ${driftY}px, ${depth * 40}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
