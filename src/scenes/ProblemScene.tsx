import { AbsoluteFill } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { FormulaStorm } from "../components/PhysicsVisuals";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import { enterExitOpacity, exitProgress, smoothProgress } from "../utils/animation";
import "./ProblemScene.scss";

export const ProblemScene = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
  const collapse = exitProgress(timeline, duration - 58, 48);
  const tension = smoothProgress(timeline, 0, duration - 40);
  const opacity = enterExitOpacity(timeline, duration, 28, 22);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${1 + tension * 0.035}) translate3d(${collapse * -34}px, ${collapse * 18}px, 0)`,
        filter: `contrast(${1 + collapse * 0.8}) saturate(${1 + tension * 0.25})`,
      }}
    >
      <CinematicBackdrop intensity={0.62} chaos={collapse} />
      <ParticleField count={62} speed={0.55} opacity={0.32} energy={0.55} />
      <FormulaStorm collapse={collapse} />
      <div
        className="problem-scene__frame"
        style={{
          transform: `rotateX(${tension * 2.4}deg) rotateY(${-tension * 4.8}deg)`,
        }}
      />
      <KineticText
        lines={["Physics was never", "meant to be", "memorized."]}
        top={586}
        left={150}
        width={1120}
        size={92}
        delay={52}
        accentIndex={2}
      />
      <div
        className="problem-scene__accent-line"
        style={{ opacity: 0.55 - collapse * 0.4 }}
      />
      {collapse > 0 ? (
        <AbsoluteFill
          className="problem-scene__glitch"
          style={{
            opacity: collapse * 0.7,
            transform: `translateX(${Math.sin(loop * 1.9) * 34}px)`,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
