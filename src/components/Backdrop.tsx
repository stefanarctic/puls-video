import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../constants";
import { useLoopFrame } from "../utils/ambientMotion";
import { drift, looping } from "../utils/animation";
import "./Backdrop.scss";

const orbStyles = [
  { left: -220, top: 80, size: 620, color: COLORS.blue, phase: 0.2 },
  { right: -180, top: 390, size: 520, color: COLORS.cyan, phase: 2.2 },
  { left: 760, top: -270, size: 540, color: COLORS.electricBlue, phase: 4.1 },
];

export const CinematicBackdrop = ({
  intensity = 1,
  chaos = 0,
}: {
  intensity?: number;
  chaos?: number;
}) => {
  const frame = useLoopFrame();

  return (
    <AbsoluteFill className="cinematic-backdrop">
      <AbsoluteFill
        className="cinematic-backdrop__grid"
        style={{
          transform: `translateY(${looping(frame, 0.024, 1.7) * 48}px) scale(${1 + chaos * 0.02})`,
          opacity: 0.32 + intensity * 0.12,
        }}
      />
      {orbStyles.map((orb) => {
        const offset = drift(frame, 38, 28, 0.012, orb.phase);
        const pulse = 0.72 + looping(frame, 0.025, orb.phase) * 0.16;

        return (
          <div
            key={orb.phase}
            className="cinematic-backdrop__orb"
            style={{
              width: orb.size,
              height: orb.size,
              borderRadius: orb.size,
              background: orb.color,
              opacity: intensity * pulse * 0.22,
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
              left: "left" in orb ? orb.left : undefined,
              right: "right" in orb ? orb.right : undefined,
              top: orb.top,
            }}
          />
        );
      })}
      <AbsoluteFill className="cinematic-backdrop__side-vignette" />
      <AbsoluteFill className="cinematic-backdrop__radial-vignette" />
      <AbsoluteFill
        className="cinematic-backdrop__scanlines"
        style={{
          opacity: interpolate(looping(frame, 0.2), [-1, 1], [0.03, 0.085]),
        }}
      />
    </AbsoluteFill>
  );
};
