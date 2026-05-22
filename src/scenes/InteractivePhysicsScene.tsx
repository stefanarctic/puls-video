import { AbsoluteFill, interpolate } from "remotion";
import { CinematicBackdrop } from "../components/Backdrop";
import { GlassPanel, GraphGrid, MiniLabel } from "../components/InterfacePrimitives";
import { KineticText } from "../components/KineticText";
import { ParticleField } from "../components/Particles";
import { ElectricField, Pendulum, ProjectileArc } from "../components/PhysicsVisuals";
import { COLORS, FONT_FAMILY } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import {
  cinematicEase,
  enterExitOpacity,
  looping,
  smoothProgress,
} from "../utils/animation";

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
        <div
          style={{
            position: "absolute",
            right: 42,
            top: 90,
            width: 136,
            height: 320,
            borderRadius: 28,
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {["g", "θ", "m"].map((label, index) => (
            <div
              key={label}
              style={{
                position: "absolute",
                left: 24,
                top: 34 + index * 88,
                width: 88,
                height: 8,
                borderRadius: 99,
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <div
                style={{
                  width: `${45 + index * 18 + looping(loop, 0.04, index) * 14}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: COLORS.cyan,
                  boxShadow: `0 0 18px ${COLORS.cyan}`,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: -28,
                  fontFamily: FONT_FAMILY,
                  color: COLORS.muted,
                  fontSize: 18,
                }}
              >
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
          style={{
            position: "absolute",
            left: 66 + projectileProgress * 480,
            top:
              260 -
              Math.sin(projectileProgress * Math.PI) * 210 +
              projectileProgress * 140,
            width: 34,
            height: 34,
            borderRadius: 99,
            background: COLORS.white,
            boxShadow: `0 0 34px ${COLORS.cyan}`,
          }}
        />
      </GlassPanel>
      <GlassPanel x={1180} y={512} width={560} height={380} delay={82}>
        <MiniLabel x={34} y={32}>
          Electric Field
        </MiniLabel>
        <ElectricField progress={progress} centerX={282} centerY={186} />
        <div
          style={{
            position: "absolute",
            left: 252,
            top: 150,
            width: 64,
            height: 64,
            borderRadius: 999,
            background: `radial-gradient(circle, white, ${COLORS.cyan}, ${COLORS.blue})`,
            boxShadow: `0 0 60px ${COLORS.cyan}`,
          }}
        />
      </GlassPanel>
      <div
        style={{
          position: "absolute",
          left: 1196,
          top: 220,
          width: 400,
          fontFamily: FONT_FAMILY,
          color: COLORS.muted,
          fontSize: 27,
          fontWeight: 620,
          lineHeight: 1.35,
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
