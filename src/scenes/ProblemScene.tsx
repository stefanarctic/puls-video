import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { FormulaStorm } from "../components/PhysicsVisuals";
import { COLORS } from "../constants";
import { enterExitOpacity, exitProgress, smoothProgress } from "../utils/animation";

export const ProblemScene = ({ duration }: { duration: number }) => {
  const frame = useCurrentFrame();
  const collapse = exitProgress(frame, duration - 58, 48);
  const tension = smoothProgress(frame, 0, duration - 40);
  const opacity = enterExitOpacity(frame, duration, 28, 22);

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
        style={{
          position: "absolute",
          left: 128,
          top: 132,
          width: 1660,
          height: 760,
          borderRadius: 60,
          border: "1px solid rgba(136,169,200,0.08)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.006))",
          boxShadow: "inset 0 0 120px rgba(0,0,0,0.45)",
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
        style={{
          position: "absolute",
          right: 170,
          bottom: 140,
          width: 320,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
          opacity: 0.55 - collapse * 0.4,
          boxShadow: `0 0 34px ${COLORS.cyan}`,
        }}
      />
      {collapse > 0 ? (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(90deg, rgba(24,244,255,0.12), transparent 20%, rgba(255,255,255,0.08) 22%, transparent 24%)",
            opacity: collapse * 0.7,
            transform: `translateX(${Math.sin(frame * 1.9) * 34}px)`,
            mixBlendMode: "screen",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
