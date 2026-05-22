import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { GlassPanel, GraphGrid, MiniLabel } from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { COLORS, FONT_FAMILY } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import { enterExitOpacity, smoothProgress, springIn } from "../utils/animation";

export const ShiftScene = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
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
        <MiniLabel x={42} y={38}>
          Interactive Physics Engine
        </MiniLabel>
        {Array.from({ length: 4 }).map((_, index) => {
          const cardProgress = smoothProgress(timeline, 70 + index * 8, 30);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: 72 + index * 314,
                top: 118,
                width: 260,
                height: 210,
                borderRadius: 28,
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.1), rgba(255,255,255,0.025))",
                border: "1px solid rgba(24,244,255,0.16)",
                opacity: cardProgress,
                transform: `translateY(${(1 - cardProgress) * 56}px) rotateX(${(1 - cardProgress) * 18}deg)`,
                boxShadow: `0 0 ${32 * cardProgress}px rgba(24,244,255,0.16)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 24,
                  borderRadius: 22,
                  border: `1px solid rgba(24,244,255,${0.18 + cardProgress * 0.28})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 28,
                  bottom: 30,
                  fontFamily: FONT_FAMILY,
                  color: COLORS.white,
                  fontSize: 26,
                  fontWeight: 720,
                }}
              >
                {["Motion", "Forces", "Fields", "Graphs"][index]}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 28,
                  top: 36,
                  width: 72 + index * 12,
                  height: 72 + index * 12,
                  borderRadius: 999,
                  border: `2px solid ${COLORS.cyan}`,
                  opacity: 0.48,
                  transform: `rotate(${loop * (0.3 + index * 0.08)}deg)`,
                }}
              />
            </div>
          );
        })}
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
