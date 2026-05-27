import { Img, interpolate, staticFile } from "remotion";
import { ASSETS } from "../assets";
import { useLoopFrame, useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, smoothProgress } from "../utils/animation";
import "./Logo.scss";

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
      className={`puls-logo ${anchored ? "puls-logo--anchored" : "puls-logo--relative"}`}
      style={{
        transform: anchored
          ? `translate(-50%, -50%) scale(${0.86 + reveal * 0.14})`
          : `scale(${0.86 + reveal * 0.14})`,
        opacity: reveal,
      }}
    >
      <Img
        src={staticFile(ASSETS.logo)}
        className="puls-logo__image"
        style={{
          width: size,
          filter: `drop-shadow(0 0 ${32 + pulse * 22}px rgba(24,244,255,0.62)) drop-shadow(0 38px 110px rgba(22,136,255,0.32))`,
        }}
      />
      {tagline ? (
        <div className="puls-logo__tagline" style={{ opacity: taglineReveal }}>
          {tagline}
        </div>
      ) : null}
    </div>
  );
};
