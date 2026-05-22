import { Img, interpolate, staticFile } from "remotion";
import { ASSETS } from "../assets";
import { COLORS, FONT_FAMILY } from "../constants";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, smoothProgress } from "../utils/animation";

export const PulsLogo = ({
  size = 620,
  delay = 0,
  tagline = "Physics that moves.",
  anchored = true,
}: {
  size?: number;
  delay?: number;
  tagline?: string;
  anchored?: boolean;
}) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
  const reveal = interpolate(timeline, [delay, delay + 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });
  const pulse = 0.8 + Math.sin((loop - delay) * 0.09) * 0.2;
  const taglineReveal = smoothProgress(timeline, delay + 18, 24);

  return (
    <div
      style={{
        position: anchored ? "absolute" : "relative",
        left: anchored ? "50%" : undefined,
        top: anchored ? "50%" : undefined,
        transform: anchored
          ? `translate(-50%, -50%) scale(${0.86 + reveal * 0.14})`
          : `scale(${0.86 + reveal * 0.14})`,
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
      {tagline ? (
        <div
          style={{
            fontSize: 36,
            fontWeight: 620,
            color: COLORS.muted,
            letterSpacing: "-0.02em",
            opacity: taglineReveal,
          }}
        >
          {tagline}
        </div>
      ) : null}
    </div>
  );
};
