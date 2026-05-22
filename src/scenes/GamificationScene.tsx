import { AbsoluteFill, interpolate } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { GlassPanel, MiniLabel, ProgressBar } from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { COLORS, FONT_FAMILY } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import {
  cinematicEase,
  enterExitOpacity,
  looping,
  smoothProgress,
} from "../utils/animation";

const badges = ["Vector Master", "7 Day Streak", "Level 12", "Top 4%"];

export const GamificationScene = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
  const opacity = enterExitOpacity(timeline, duration, 14, 24);
  const energy = smoothProgress(timeline, 0, 72);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${1 + energy * 0.035})`,
      }}
    >
      <CinematicBackdrop intensity={1} />
      <ParticleField count={120} speed={1.65} opacity={0.58} energy={1.5} />
      <KineticText
        lines={["Turn learning", "into momentum."]}
        top={102}
        left={136}
        width={1060}
        size={94}
        delay={12}
        accentIndex={1}
      />
      <GlassPanel x={164} y={438} width={760} height={400} delay={34}>
        <MiniLabel x={38} y={34}>
          Progress System
        </MiniLabel>
        <ProgressBar
          x={52}
          y={112}
          width={610}
          label="Mechanics Track"
          progress={interpolate(timeline, [46, 132], [0.18, 0.86], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: cinematicEase,
          })}
        />
        <ProgressBar
          x={52}
          y={216}
          width={610}
          label="Weekly XP"
          progress={interpolate(timeline, [66, 142], [0.08, 0.94], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: cinematicEase,
          })}
          color={COLORS.electricBlue}
        />
        <div
          style={{
            position: "absolute",
            left: 52,
            bottom: 46,
            display: "flex",
            gap: 18,
          }}
        >
          {Array.from({ length: 7 }).map((_, index) => {
            const reveal = smoothProgress(timeline, 82 + index * 5, 16);

            return (
              <div
                key={index}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background:
                    reveal > 0.7
                      ? `linear-gradient(145deg, ${COLORS.cyan}, ${COLORS.blue})`
                      : "rgba(255,255,255,0.08)",
                  opacity: 0.4 + reveal * 0.6,
                  boxShadow: reveal > 0.7 ? `0 0 30px ${COLORS.cyan}` : "none",
                  transform: `translateY(${(1 - reveal) * 18}px) scale(${0.82 + reveal * 0.18})`,
                }}
              />
            );
          })}
        </div>
      </GlassPanel>
      <div
        style={{
          position: "absolute",
          right: 154,
          top: 360,
          width: 700,
          height: 520,
          perspective: 1200,
        }}
      >
        {badges.map((badge, index) => {
          const reveal = smoothProgress(timeline, 48 + index * 16, 28);
          const y = index * 112;

          return (
            <div
              key={badge}
              style={{
                position: "absolute",
                left: index % 2 === 0 ? 40 : 132,
                top: y,
                width: 470,
                height: 88,
                borderRadius: 28,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(24,244,255,0.07))",
                border: "1px solid rgba(24,244,255,0.2)",
                boxShadow: `0 26px 80px rgba(0,0,0,0.32), 0 0 ${reveal * 38}px rgba(24,244,255,0.24)`,
                opacity: reveal,
                transform: `translate3d(${(1 - reveal) * 180}px, ${looping(loop, 0.04, index) * 5}px, ${index * -40}px) rotateY(${-12 + reveal * 12}deg)`,
                fontFamily: FONT_FAMILY,
                color: COLORS.white,
                fontSize: 30,
                fontWeight: 760,
                display: "flex",
                alignItems: "center",
                paddingLeft: 94,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 26,
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: `linear-gradient(145deg, ${COLORS.cyan}, ${COLORS.blue})`,
                  boxShadow: `0 0 28px ${COLORS.cyan}`,
                }}
              />
              {badge}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
