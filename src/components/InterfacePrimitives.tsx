import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";
import { cinematicEase, springIn } from "../utils/animation";

type GlassPanelProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  children?: ReactNode;
  style?: CSSProperties;
};

export const GlassPanel = ({
  x,
  y,
  width,
  height,
  delay = 0,
  children,
  style,
}: GlassPanelProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = springIn(frame, fps, delay, 20, 115);
  const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 34,
        background:
          "linear-gradient(145deg, rgba(15,37,63,0.82), rgba(5,12,24,0.7))",
        border: "1px solid rgba(119,224,255,0.22)",
        boxShadow:
          "0 32px 120px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.12)",
        overflow: "hidden",
        opacity,
        transform: `translate3d(0, ${(1 - enter) * 72}px, 0) scale(${0.94 + enter * 0.06})`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 0%, rgba(24,244,255,0.18), transparent 38%)",
        }}
      />
      {children}
    </div>
  );
};

export const MiniLabel = ({
  children,
  x,
  y,
}: {
  children: ReactNode;
  x: number;
  y: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontFamily: FONT_FAMILY,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: COLORS.cyan,
      opacity: 0.76,
    }}
  >
    {children}
  </div>
);

export const GraphGrid = ({ progress }: { progress: number }) => (
  <div
    style={{
      position: "absolute",
      inset: 24,
      opacity: progress,
      backgroundImage:
        "linear-gradient(rgba(24,244,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(24,244,255,0.08) 1px, transparent 1px)",
      backgroundSize: "44px 44px",
      maskImage: "linear-gradient(black, transparent 92%)",
    }}
  />
);

export const ProgressBar = ({
  x,
  y,
  width,
  label,
  progress,
  color = COLORS.cyan,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  progress: number;
  color?: string;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      fontFamily: FONT_FAMILY,
      color: COLORS.white,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 12,
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      <span>{label}</span>
      <span style={{ color }}>{Math.round(progress * 100)}%</span>
    </div>
    <div
      style={{
        height: 16,
        borderRadius: 99,
        background: "rgba(255,255,255,0.08)",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          borderRadius: 99,
          background: `linear-gradient(90deg, ${COLORS.blue}, ${color})`,
          boxShadow: `0 0 32px ${color}`,
        }}
      />
    </div>
  </div>
);
