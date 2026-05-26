import { AbsoluteFill, interpolate } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { GlassPanel, GraphGrid, MiniLabel } from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { ElectricField, Pendulum, ProjectileArc } from "../components/PhysicsVisuals";
import { COLORS } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import {
  cinematicEase,
  enterExitOpacity,
  looping,
  smoothProgress,
} from "../utils/animation";
import "./InteractivePhysicsScene.scss";

export const InteractivePhysicsScene = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
  const opacity = enterExitOpacity(timeline, duration, 22, 24);
  const progress = smoothProgress(timeline, 28, 112);
  const camera = smoothProgress(timeline, 0, duration);
  const projectileProgress = smoothProgress(timeline, 80, 116);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate3d(${-camera * 42}px, ${camera * -18}px, 0) scale(${1.03 + camera * 0.05})`,
      }}
    >
      <CinematicBackdrop intensity={0.86} />
      <ParticleField count={78} speed={0.85} opacity={0.42} energy={0.9} />
      <KineticText
        lines={["See physics.", "Interact with concepts.", "Actually understand it."]}
        top={110}
        left={130}
        width={1220}
        size={70}
        delay={18}
        gap={10}
        accentIndex={2}
      />
      <GlassPanel x={118} y={372} width={620} height={500} delay={40}>
        <GraphGrid progress={progress} />
        <MiniLabel x={38} y={34}>
          Pendulum Lab
        </MiniLabel>
        <Pendulum x={176} y={94} scale={1.02} />
        <div className="interactive-physics-scene__controls">
          {["g", "θ", "m"].map((label, index) => (
            <div
              key={label}
              className="interactive-physics-scene__slider"
              style={{ top: 34 + index * 88 }}
            >
              <div
                className="interactive-physics-scene__slider-fill"
                style={{
                  width: `${45 + index * 18 + looping(loop, 0.04, index) * 14}%`,
                }}
              />
              <span className="interactive-physics-scene__slider-label">
                {label}
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel x={804} y={324} width={520} height={360} delay={62}>
        <GraphGrid progress={progress} />
        <MiniLabel x={34} y={30}>
          Projectile
        </MiniLabel>
        <ProjectileArc x={42} y={260} progress={projectileProgress} />
        <div
          className="interactive-physics-scene__projectile-dot"
          style={{
            left: 66 + projectileProgress * 480,
            top:
              260 -
              Math.sin(projectileProgress * Math.PI) * 210 +
              projectileProgress * 140,
          }}
        />
      </GlassPanel>
      <GlassPanel x={1180} y={512} width={560} height={380} delay={82}>
        <MiniLabel x={34} y={32}>
          Electric Field
        </MiniLabel>
        <ElectricField progress={progress} centerX={282} centerY={186} />
        <div
          className="interactive-physics-scene__charge"
          style={{
            background: `radial-gradient(circle, white, ${COLORS.cyan}, ${COLORS.blue})`,
          }}
        />
      </GlassPanel>
      <div
        className="interactive-physics-scene__caption"
        style={{
          opacity: interpolate(timeline, [130, 160], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: cinematicEase,
          }),
        }}
      >
        Move variables. Watch systems respond. Build intuition frame by frame.
      </div>
    </AbsoluteFill>
  );
};
