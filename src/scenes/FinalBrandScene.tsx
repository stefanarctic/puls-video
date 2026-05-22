import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { PulsLogo } from "../components/Logo";
import { ParticleField } from "../components/Particles";
import { COLORS } from "../constants";
import { cinematicEase, looping, smoothProgress } from "../utils/animation";

export const FinalBrandScene = ({ duration }: { duration: number }) => {
  const frame = useCurrentFrame();
  const calm = smoothProgress(frame, 0, 120);
  const fade = interpolate(frame, [duration - 34, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });

  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <CinematicBackdrop intensity={0.82 - calm * 0.22} />
      <ParticleField count={88} speed={0.32} opacity={0.42} energy={0.35} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 48%, rgba(24,244,255,${0.24 + calm * 0.12}), transparent 35%, rgba(2,4,11,0.34) 72%)`,
          mixBlendMode: "screen",
        }}
      />
      {Array.from({ length: 3 }).map((_, index) => {
        const progress = smoothProgress(frame, 18 + index * 24, 82);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 340,
              height: 340,
              borderRadius: 999,
              border: `1px solid rgba(24,244,255,${(1 - progress) * 0.5})`,
              transform: `translate(-50%, -50%) scale(${0.4 + progress * (2.2 + index * 0.42)})`,
              boxShadow: `0 0 ${80 * (1 - progress)}px ${COLORS.cyan}`,
              opacity: (1 - progress) * 0.9,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 900,
          height: 900,
          borderRadius: 999,
          background:
            "conic-gradient(from 90deg, transparent, rgba(24,244,255,0.18), transparent, rgba(22,136,255,0.16), transparent)",
          transform: `translate(-50%, -50%) rotate(${frame * 0.18}deg) scale(${0.76 + calm * 0.12 + looping(frame, 0.02) * 0.012})`,
          filter: "blur(24px)",
          opacity: 0.7,
        }}
      />
      <PulsLogo delay={38} size={680} />
      <AbsoluteFill
        style={{
          background: "black",
          opacity: interpolate(frame, [duration - 20, duration], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
