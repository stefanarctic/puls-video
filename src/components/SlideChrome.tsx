import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Bot,
  FlaskConical,
  Orbit,
  Trophy,
  Users,
} from "lucide-react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { COLORS } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, enterExitOpacity, smoothProgress } from "../utils/animation";
import { CinematicBackdrop } from "./Backdrop";
import { ParticleField } from "./Particles";
import "./SlideChrome.scss";

const FLOW_BADGE_SIZE = 52;

type SlideLayoutProps = {
  duration: number;
  children: ReactNode;
  intensity?: number;
  particles?: boolean;
};

export const SlideLayout = ({
  duration,
  children,
  intensity = 0.85,
  particles = true,
}: SlideLayoutProps) => {
  const timeline = useTimelineFrame();
  const opacity = enterExitOpacity(timeline, duration, 18, 20);

  return (
    <AbsoluteFill style={{ opacity }}>
      <CinematicBackdrop intensity={intensity} />
      {particles ? (
        <ParticleField count={48} speed={0.45} opacity={0.28} energy={0.55} />
      ) : null}
      {children}
    </AbsoluteFill>
  );
};

export const SlideCta = ({
  label,
  delay = 40,
}: {
  label: string;
  delay?: number;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 24);

  return (
    <div
      className="slide-cta"
      style={{
        boxShadow: `0 16px 48px rgba(0,0,0,0.35), 0 0 ${reveal * 32}px rgba(24,244,255,0.35)`,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 24}px) scale(${0.94 + reveal * 0.06})`,
      }}
    >
      {label}
    </div>
  );
};

export const SlideHeadline = ({
  lines,
  top = 88,
  left = 120,
  width = 1680,
  size = 72,
  delay = 12,
  accentIndex,
}: {
  lines: string[];
  top?: number;
  left?: number;
  width?: number;
  size?: number;
  delay?: number;
  accentIndex?: number;
}) => {
  const timeline = useTimelineFrame();

  return (
    <div className="slide-headline" style={{ top, left, width }}>
      {lines.map((line, index) => {
        const reveal = smoothProgress(timeline, delay + index * 10, 22);
        const isAccent = accentIndex === index;

        return (
          <div
            key={line}
            className={`slide-headline__line${isAccent ? " slide-headline__line--accent" : ""}`}
            style={{
              marginTop: index === 0 ? 0 : 8,
              fontSize: size - (index > 0 ? 8 : 0),
              textShadow: isAccent ? `0 0 28px ${COLORS.cyan}` : undefined,
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 36}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const SlideSubtitle = ({
  children,
  top,
  left = 120,
  width = 900,
  delay = 36,
}: {
  children: string;
  top: number;
  left?: number;
  width?: number;
  delay?: number;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 26);

  return (
    <div
      className="slide-subtitle"
      style={{
        top,
        left,
        width,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const SlideScreenshot = ({
  src,
  x,
  y,
  width,
  height,
  delay = 30,
  style,
  className,
  objectFit = "cover",
  objectPosition = "center",
  imageScale = 1,
  lightOverlay = false,
  children,
}: {
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  style?: CSSProperties;
  className?: string;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
  imageScale?: number;
  lightOverlay?: boolean;
  children?: ReactNode;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 28);

  return (
    <div
      className={className ? `slide-screenshot ${className}` : "slide-screenshot"}
      style={{
        left: x,
        top: y,
        width,
        height,
        boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 ${reveal * 40}px rgba(24,244,255,0.12)`,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 40}px) scale(${0.96 + reveal * 0.04})`,
        ...style,
      }}
    >
      {src ? (
        <Img
          src={staticFile(src)}
          className="slide-screenshot__image"
          style={{
            objectFit,
            objectPosition,
            transform: imageScale !== 1 ? `scale(${imageScale})` : undefined,
            transformOrigin: objectPosition as string,
          }}
        />
      ) : null}
      {children}
      {lightOverlay ? (
        <>
          <div className="slide-screenshot__overlay-gradient" />
          <div className="slide-screenshot__overlay-border" />
        </>
      ) : null}
    </div>
  );
};

export const ScreenshotFrame = ({
  src,
  x,
  y,
  width,
  height,
  delay = 30,
  caption,
  lightOverlay = false,
  objectFit = "cover",
  objectPosition = "center",
  imageScale = 1,
  style,
  screenshotStyle,
  screenshotClassName,
  children,
}: {
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  caption?: string;
  lightOverlay?: boolean;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
  imageScale?: number;
  style?: CSSProperties;
  screenshotStyle?: CSSProperties;
  screenshotClassName?: string;
  children?: ReactNode;
}) => {
  const captionHeight = caption ? 36 : 0;
  const imageHeight = height - captionHeight;

  return (
    <div className="screenshot-frame" style={{ left: x, top: y, width, ...style }}>
      <SlideScreenshot
        src={src}
        x={0}
        y={0}
        width={width}
        height={imageHeight}
        delay={delay}
        objectFit={objectFit}
        objectPosition={objectPosition}
        imageScale={imageScale}
        lightOverlay={lightOverlay}
        style={{ position: "relative", ...screenshotStyle }}
        className={screenshotClassName}
      >
        {children}
      </SlideScreenshot>
      {caption ? (
        <div className="screenshot-frame__caption">{caption}</div>
      ) : null}
    </div>
  );
};

export const BlockCard = ({
  label,
  sublabel,
  x,
  y,
  width,
  height,
  delay,
  icon,
}: {
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  icon?: ReactNode;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 26);

  return (
    <div
      className="block-card"
      style={{
        left: x,
        top: y,
        width,
        height,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 48}px)`,
      }}
    >
      {icon}
      <div>
        <div className="block-card__label">{label}</div>
        {sublabel ? (
          <div className="block-card__sublabel">{sublabel}</div>
        ) : null}
      </div>
    </div>
  );
};

export const FlowStep = ({
  step,
  label,
  x,
  y,
  delay,
  width = 320,
}: {
  step: number;
  label: string;
  x: number;
  y: number;
  delay: number;
  width?: number;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 22);

  return (
    <div
      className="flow-step"
      style={{
        left: x,
        top: y,
        width,
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * -32}px)`,
      }}
    >
      <div className="flow-step__badge">{step}</div>
      <div className="flow-step__label">{label}</div>
    </div>
  );
};

export const FlowArrow = ({
  x,
  stepY,
  delay,
}: {
  x: number;
  stepY: number;
  delay: number;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 18);
  const arrowTop = stepY + FLOW_BADGE_SIZE / 2 - 18;

  return (
    <div
      className="flow-arrow"
      style={{
        left: x,
        top: arrowTop,
        opacity: reveal * 0.7,
      }}
    >
      →
    </div>
  );
};

const HUB_ITEMS: { label: string; icon: LucideIcon }[] = [
  { label: "Simulari interactive", icon: Orbit },
  { label: "Probleme BAC si grile", icon: FlaskConical },
  { label: "Resurse teoretice", icon: BookOpen },
  { label: "Feedback AI", icon: Bot },
  { label: "Profil si progres", icon: Trophy },
  { label: "Clase profesor-elev", icon: Users },
];

export const RadialHub = ({ delay = 40 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const centerX = 960;
  const centerY = 480;
  const radius = 280;
  const hubReveal = smoothProgress(timeline, delay - 10, 24);

  const nodes = HUB_ITEMS.map((item, index) => {
    const angle = (index / HUB_ITEMS.length) * Math.PI * 2 - Math.PI / 2;
    const nodeCenterX = centerX + Math.cos(angle) * radius;
    const nodeCenterY = centerY + Math.sin(angle) * radius;
    return {
      ...item,
      angle,
      nodeCenterX,
      nodeCenterY,
      x: nodeCenterX - 150,
      y: nodeCenterY - 56,
      reveal: smoothProgress(timeline, delay + index * 8, 24),
    };
  });

  return (
    <>
      <svg
        className="radial-hub__svg"
        style={{ opacity: hubReveal * 0.55 }}
        viewBox="0 0 1920 1080"
      >
        {nodes.map((node) => (
          <line
            key={node.label}
            x1={centerX}
            y1={centerY}
            x2={node.nodeCenterX}
            y2={node.nodeCenterY}
            stroke="rgba(24,244,255,0.28)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
        ))}
      </svg>
      {nodes.map((node) => {
        const Icon = node.icon;

        return (
          <div
            key={node.label}
            className="radial-hub__node"
            style={{
              left: node.x,
              top: node.y,
              opacity: node.reveal,
              transform: `scale(${0.88 + node.reveal * 0.12})`,
            }}
          >
            <div className="radial-hub__node-row">
              <div className="radial-hub__node-icon">
                <Icon size={22} color={COLORS.cyan} strokeWidth={2} />
              </div>
              <div className="radial-hub__node-label">{node.label}</div>
            </div>
          </div>
        );
      })}
      <div
        className="radial-hub__center"
        style={{
          left: centerX - 120,
          top: centerY - 120,
          opacity: hubReveal,
        }}
      >
        PULS
      </div>
    </>
  );
};

const ROMANIA_MILESTONES = [
  "cercetare pilot",
  "productie industriala",
  "aplicatii nucleare",
];

export const RomaniaMap = ({ delay = 36 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 32);

  const points = [
    { x: 180, y: 200, label: "Ramnicu Valcea", sub: "Uzina G · 1976" },
    { x: 80, y: 320, label: "Drobeta-Turnu Severin", sub: "ROMAG-PROD" },
  ];

  return (
    <div
      className="romania-map"
      style={{
        left: 900,
        top: 360,
        opacity: reveal,
      }}
    >
      <svg viewBox="0 0 400 420" width="100%" height="72%">
        <path
          d="M180,40 L260,60 L300,120 L320,200 L310,280 L280,360 L240,420 L180,460 L120,420 L80,340 L70,240 L90,140 L130,70 Z"
          fill="rgba(24,244,255,0.08)"
          stroke="rgba(24,244,255,0.45)"
          strokeWidth="2"
        />
        <line
          x1="180"
          y1="200"
          x2="80"
          y2="320"
          stroke="rgba(24,244,255,0.5)"
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        {points.map((point, index) => {
          const pulse = smoothProgress(timeline, delay + 24 + index * 12, 20);
          return (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r={10 + pulse * 6}
                fill="none"
                stroke={COLORS.cyan}
                strokeWidth="2"
                opacity={0.35 * (1 - pulse)}
              />
              <circle cx={point.x} cy={point.y} r="10" fill={COLORS.cyan} />
            </g>
          );
        })}
      </svg>
      {points.map((point, index) => (
        <div
          key={point.label}
          style={{
            position: "absolute",
            left: `${(point.x / 400) * 100 + 4}%`,
            top: `${(point.y / 420) * 72 - 4}%`,
            opacity: smoothProgress(timeline, delay + 20 + index * 14, 22),
          }}
        >
          <div className="romania-map__point-label">{point.label}</div>
          <div className="romania-map__point-sub">{point.sub}</div>
        </div>
      ))}
      <div
        className="romania-map__milestones"
        style={{ opacity: smoothProgress(timeline, delay + 40, 24) }}
      >
        {ROMANIA_MILESTONES.map((milestone, index) => {
          const stepReveal = smoothProgress(timeline, delay + 44 + index * 10, 20);
          return (
            <div
              key={milestone}
              className={`romania-map__milestone-row${index === ROMANIA_MILESTONES.length - 1 ? " romania-map__milestone-row--last" : ""}`}
            >
              <div
                className="romania-map__milestone-chip"
                style={{ opacity: stepReveal }}
              >
                {milestone}
              </div>
              {index < ROMANIA_MILESTONES.length - 1 ? (
                <div
                  className="romania-map__milestone-connector"
                  style={{ opacity: stepReveal * 0.8 }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PanelBadge = ({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) => (
  <div className={`panel-badge${accent ? " panel-badge--accent" : ""}`}>
    {label}
  </div>
);

export const SplitPanel = ({
  left,
  right,
  delay = 24,
  leftBadge,
  rightBadge,
}: {
  left: ReactNode;
  right: ReactNode;
  delay?: number;
  leftBadge?: string;
  rightBadge?: string;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 28);

  return (
    <div className="split-panel" style={{ opacity: reveal }}>
      <div className="split-panel__left">
        {leftBadge ? <PanelBadge label={leftBadge} /> : null}
        {left}
      </div>
      <div
        className="split-panel__right"
        style={{ boxShadow: `0 0 ${reveal * 48}px rgba(24,244,255,0.1)` }}
      >
        {rightBadge ? <PanelBadge label={rightBadge} accent /> : null}
        {right}
      </div>
    </div>
  );
};

export const InlineProgressBar = ({
  label,
  progress,
  width = "100%",
}: {
  label: string;
  progress: number;
  width?: number | string;
}) => (
  <div className="inline-progress-bar" style={{ width }}>
    <div className="inline-progress-bar__header">
      <span>{label}</span>
      <span className="inline-progress-bar__value">
        {Math.round(progress * 100)}%
      </span>
    </div>
    <div className="inline-progress-bar__track">
      <div
        className="inline-progress-bar__fill"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  </div>
);

export const PulseReveal = ({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => {
  const timeline = useTimelineFrame();
  const reveal = interpolate(timeline, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });

  return (
    <div
      className="pulse-reveal"
      style={{
        opacity: reveal,
        transform: `scale(${0.92 + reveal * 0.08})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export { smoothProgress };
