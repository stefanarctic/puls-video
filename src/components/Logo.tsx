import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ASSETS } from "../assets";
import { COLORS, FONT_FAMILY } from "../constants";
import { cinematicEase } from "../utils/animation";

export const PulsLogo = ({
  size = 620,
  delay = 0,
}: {
  size?: number;
  delay?: number;
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [delay, delay + 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });
  const pulse = 0.8 + Math.sin((frame - delay) * 0.09) * 0.2;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${0.86 + reveal * 0.14})`,
        opacity: reveal,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        fontFamily: FONT_FAMILY,
      }}
    >
      <Img
        src={staticFile(ASSETS.logo)}
        style={{
          width: size,
          height: "auto",
          objectFit: "contain",
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 ${32 + pulse * 22}px rgba(24,244,255,0.62)) drop-shadow(0 38px 110px rgba(22,136,255,0.32))`,
        }}
      />
      <div
        style={{
          fontSize: 36,
          fontWeight: 620,
          color: COLORS.muted,
          letterSpacing: "-0.02em",
        }}
      >
        Physics that moves.
      </div>
    </div>
  );
};
