import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import {
  FeatureCard,
  FeatureCardGrid,
  GlassPanel,
  GraphGrid,
  MiniLabel,
  PHYSICS_FEATURES,
} from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { COLORS } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { enterExitOpacity, smoothProgress, springIn } from "../utils/animation";

export const ShiftScene = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const { fps } = useVideoConfig();
  const blast = springIn(timeline, fps, 0, 16, 150);
  const assembly = smoothProgress(timeline, 38, 84);
  const opacity = enterExitOpacity(timeline, duration, 10, 24);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${1.08 - blast * 0.08})`,
        filter: `blur(${(1 - blast) * 18}px)`,
      }}
    >
      <CinematicBackdrop intensity={0.95} />
      <ParticleField count={92} speed={1.4} opacity={0.52} energy={1.3} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(24,244,255,${0.62 * (1 - assembly)}), transparent 46%)`,
          mixBlendMode: "screen",
        }}
      />
      <KineticText
        lines={["So we rebuilt it", "from the ground up."]}
        top={144}
        left={150}
        width={1120}
        size={92}
        delay={24}
        accentIndex={1}
      />
      <GlassPanel x={254} y={440} width={1412} height={430} delay={54}>
        <GraphGrid progress={assembly} />
        <MiniLabel x={48} y={40}>
          Interactive Physics Engine
        </MiniLabel>
        <FeatureCardGrid x={48} y={96} width={1316} height={286}>
          {PHYSICS_FEATURES.map((feature, index) => {
            const cardProgress = smoothProgress(timeline, 70 + index * 8, 30);

            return (
              <FeatureCard
                key={feature.label}
                label={feature.label}
                icon={feature.icon}
                progress={cardProgress}
              />
            );
          })}
        </FeatureCardGrid>
      </GlassPanel>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 516,
          width: "100%",
          height: 2,
          opacity: interpolate(timeline, [18, 42, 92], [0, 1, 0.18], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, white, ${COLORS.blue}, transparent)`,
          boxShadow: `0 0 54px ${COLORS.cyan}`,
        }}
      />
    </AbsoluteFill>
  );
};
