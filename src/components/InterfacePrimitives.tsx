import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ChartLine,
  Magnet,
  Orbit,
  Weight,
} from "lucide-react";
import { interpolate, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, springIn } from "../utils/animation";

const FEATURE_ICON_SIZE = 34;

export const PHYSICS_FEATURES = [
  { label: "Motion", icon: Orbit },
  { label: "Forces", icon: Weight },
  { label: "Fields", icon: Magnet },
  { label: "Graphs", icon: ChartLine },
] as const;

type FeatureCardProps = {
  label: string;
  icon: LucideIcon;
  progress: number;
  style?: CSSProperties;
};

export const FeatureCard = ({
  label,
  icon: Icon,
  progress,
  style,
}: FeatureCardProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      padding: "26px 28px 24px",
      borderRadius: 24,
      background:
        "linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.03))",
      border: "1px solid rgba(24,244,255,0.18)",
      boxShadow: `0 18px 48px rgba(0,0,0,0.22), 0 0 ${28 * progress}px rgba(24,244,255,0.14)`,
      opacity: progress,
      transform: `translateY(${(1 - progress) * 48}px)`,
      boxSizing: "border-box",
      ...style,
    }}
  >
    <div
      style={{
        width: 68,
        height: 68,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background:
          "linear-gradient(145deg, rgba(24,244,255,0.16), rgba(24,244,255,0.04))",
        border: "1px solid rgba(24,244,255,0.28)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 28px rgba(24,244,255,0.14)",
      }}
    >
      <Icon
        size={FEATURE_ICON_SIZE}
        color={COLORS.cyan}
        strokeWidth={1.85}
        absoluteStrokeWidth
      />
    </div>
    <div
      style={{
        fontFamily: FONT_FAMILY,
        color: COLORS.white,
        fontSize: 26,
        fontWeight: 720,
        letterSpacing: "-0.02em",
        lineHeight: 1.1,
      }}
    >
      {label}
    </div>
  </div>
);

export const FeatureCardGrid = ({
  x,
  y,
  width,
  height,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  children: ReactNode;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: 28,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);

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
  const frame = useTimelineFrame();
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
