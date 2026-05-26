import { AbsoluteFill, interpolate } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { GlassPanel, MiniLabel, ProgressBar } from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { COLORS } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import {
  cinematicEase,
  enterExitOpacity,
  looping,
  smoothProgress,
} from "../utils/animation";
import "./GamificationScene.scss";

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
        <div className="gamification-scene__streak-row">
          {Array.from({ length: 7 }).map((_, index) => {
            const reveal = smoothProgress(timeline, 82 + index * 5, 16);

            return (
              <div
                key={index}
                className={`gamification-scene__streak-day${reveal > 0.7 ? " gamification-scene__streak-day--active" : ""}`}
                style={{
                  opacity: 0.4 + reveal * 0.6,
                  boxShadow: reveal > 0.7 ? `0 0 30px ${COLORS.cyan}` : "none",
                  transform: `translateY(${(1 - reveal) * 18}px) scale(${0.82 + reveal * 0.18})`,
                }}
              />
            );
          })}
        </div>
      </GlassPanel>
      <div className="gamification-scene__badges">
        {badges.map((badge, index) => {
          const reveal = smoothProgress(timeline, 48 + index * 16, 28);
          const y = index * 112;

          return (
            <div
              key={badge}
              className="gamification-scene__badge"
              style={{
                left: index % 2 === 0 ? 40 : 132,
                top: y,
                boxShadow: `0 26px 80px rgba(0,0,0,0.32), 0 0 ${reveal * 38}px rgba(24,244,255,0.24)`,
                opacity: reveal,
                transform: `translate3d(${(1 - reveal) * 180}px, ${looping(loop, 0.04, index) * 5}px, ${index * -40}px) rotateY(${-12 + reveal * 12}deg)`,
              }}
            >
              <div className="gamification-scene__badge-icon" />
              {badge}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
