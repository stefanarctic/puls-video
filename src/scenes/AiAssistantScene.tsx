import { AbsoluteFill, interpolate } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { GlassPanel, GraphGrid, MiniLabel } from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { COLORS } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import {
  enterExitOpacity,
  looping,
  smoothProgress,
  stagger,
} from "../utils/animation";
import "./AiAssistantScene.scss";

const solutionSteps = [
  "Identify knowns: m, a, F",
  "Map forces as vectors",
  "Apply Newton's second law",
  "Solve, then explain the intuition",
];

export const AiAssistantScene = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
  const opacity = enterExitOpacity(timeline, duration, 20, 24);
  const neural = smoothProgress(timeline, 36, 96);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${1.04 - neural * 0.025})`,
      }}
    >
      <CinematicBackdrop intensity={0.9} />
      <ParticleField count={96} speed={1.08} opacity={0.45} energy={1.05} />
      <KineticText
        lines={["Ask anything.", "Get guided solutions.", "Learn like a personal tutor."]}
        top={96}
        left={116}
        width={1250}
        size={67}
        delay={18}
        gap={10}
        accentIndex={0}
      />
      <GlassPanel x={138} y={390} width={650} height={456} delay={44}>
        <MiniLabel x={38} y={34}>
          PULS AI
        </MiniLabel>
        <div className="ai-assistant-scene__question">
          Why does acceleration change when the force vector rotates?
        </div>
        <div className="ai-assistant-scene__steps-panel">
          {solutionSteps.map((step, index) => {
            const reveal = smoothProgress(timeline, 82 + stagger(index, 20), 22);

            return (
              <div
                key={step}
                className={`ai-assistant-scene__step${index === 3 ? " ai-assistant-scene__step--accent" : ""}`}
                style={{
                  top: 28 + index * 44,
                  opacity: reveal,
                  transform: `translateX(${(1 - reveal) * -24}px)`,
                }}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1} / {step}
              </div>
            );
          })}
        </div>
      </GlassPanel>
      <GlassPanel x={900} y={328} width={780} height={560} delay={62}>
        <GraphGrid progress={neural} />
        <MiniLabel x={38} y={34}>
          Visual Explanation
        </MiniLabel>
        {Array.from({ length: 22 }).map((_, index) => {
          const angle = (index / 22) * Math.PI * 2;
          const radius = 116 + (index % 3) * 72;
          const x = 390 + Math.cos(angle + loop * 0.01) * radius;
          const y = 276 + Math.sin(angle + loop * 0.012) * radius * 0.68;
          const reveal = smoothProgress(timeline, 70 + index * 2, 24);

          return (
            <div
              key={index}
              className="ai-assistant-scene__particle"
              style={{
                left: x,
                top: y,
                opacity: reveal * (0.55 + looping(loop, 0.04, index) * 0.22),
              }}
            />
          );
        })}
        {Array.from({ length: 14 }).map((_, index) => {
          const reveal = smoothProgress(timeline, 88 + index * 3, 20);
          const y = 164 + index * 22;

          return (
            <div
              key={index}
              className="ai-assistant-scene__field-line"
              style={{
                left: 180 + (index % 2) * 80,
                top: y,
                width: 290 + (index % 4) * 34,
                opacity: reveal * 0.42,
                transform: `rotate(${(index - 7) * 5}deg) scaleX(${reveal})`,
              }}
            />
          );
        })}
        <div
          className="ai-assistant-scene__orbit-ring"
          style={{
            border: `1px solid rgba(24,244,255,${0.38 + neural * 0.3})`,
            boxShadow: `0 0 ${70 + neural * 45}px rgba(24,244,255,0.36)`,
            transform: `scale(${0.86 + neural * 0.14}) rotate(${loop * 0.24}deg)`,
          }}
        />
        <div
          className="ai-assistant-scene__orbit-core"
          style={{
            background: `radial-gradient(circle, white, ${COLORS.cyan}, transparent 72%)`,
            opacity: interpolate(timeline, [92, 120], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </GlassPanel>
    </AbsoluteFill>
  );
};
