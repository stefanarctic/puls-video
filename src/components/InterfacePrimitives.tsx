import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ChartLine,
  Magnet,
  Orbit,
  Weight,
} from "lucide-react";
import { interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, springIn } from "../utils/animation";
import "./InterfacePrimitives.scss";

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
    className="feature-card"
    style={{
      boxShadow: `0 18px 48px rgba(0,0,0,0.22), 0 0 ${28 * progress}px rgba(24,244,255,0.14)`,
      opacity: progress,
      transform: `translateY(${(1 - progress) * 48}px)`,
      ...style,
    }}
  >
    <div className="feature-card__icon-wrap">
      <Icon
        size={FEATURE_ICON_SIZE}
        color={COLORS.cyan}
        strokeWidth={1.85}
        absoluteStrokeWidth
      />
    </div>
    <div className="feature-card__label">{label}</div>
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
    className="feature-card-grid"
    style={{ left: x, top: y, width, height }}
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
      className="glass-panel"
      style={{
        left: x,
        top: y,
        width,
        height,
        opacity,
        transform: `translate3d(0, ${(1 - enter) * 72}px, 0) scale(${0.94 + enter * 0.06})`,
        ...style,
      }}
    >
      <div className="glass-panel__shine" />
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
  <div className="mini-label" style={{ left: x, top: y }}>
    {children}
  </div>
);

export const GraphGrid = ({ progress }: { progress: number }) => (
  <div className="graph-grid" style={{ opacity: progress }} />
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
  <div className="progress-bar" style={{ left: x, top: y, width }}>
    <div className="progress-bar__header">
      <span>{label}</span>
      <span style={{ color }}>{Math.round(progress * 100)}%</span>
    </div>
    <div className="progress-bar__track">
      <div
        className="progress-bar__fill"
        style={{
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${COLORS.blue}, ${color})`,
          boxShadow: `0 0 32px ${color}`,
        }}
      />
    </div>
  </div>
);
