import type { CSSProperties } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { drift, looping } from "../utils/animation";

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
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 42%, #0b213a 0%, #07101f 34%, #02040b 76%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,244,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(24,244,255,0.035) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          transform: `translateY(${(frame * -0.24) % 96}px) scale(${1 + chaos * 0.02})`,
          opacity: 0.32 + intensity * 0.12,
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />
      {orbStyles.map((orb) => {
        const offset = drift(frame, 38, 28, 0.012, orb.phase);
        const pulse = 0.72 + looping(frame, 0.025, orb.phase) * 0.16;
        const style: CSSProperties = {
          position: "absolute",
          width: orb.size,
          height: orb.size,
          borderRadius: orb.size,
          background: orb.color,
          filter: "blur(140px)",
          opacity: intensity * pulse * 0.22,
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          mixBlendMode: "screen",
        };

        return (
          <div
            key={orb.phase}
            style={{
              ...style,
              left: "left" in orb ? orb.left : undefined,
              right: "right" in orb ? orb.right : undefined,
              top: orb.top,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(2,4,11,0.82), transparent 28%, transparent 70%, rgba(2,4,11,0.86))",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(2,4,11,0.32) 58%, rgba(2,4,11,0.92) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: interpolate(looping(frame, 0.2), [-1, 1], [0.03, 0.085]),
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(255,255,255,0.12) 50%)",
          backgroundSize: "100% 4px",
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
