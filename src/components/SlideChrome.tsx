import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
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
import { PRESENTATION_ASSETS } from "../assets";
import { COLORS } from "../constants";
import { usePresentationInteractive, useTimelineFrame } from "../utils/ambientMotion";
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
  captionDelay,
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
  captionDelay?: number;
  lightOverlay?: boolean;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
  imageScale?: number;
  style?: CSSProperties;
  screenshotStyle?: CSSProperties;
  screenshotClassName?: string;
  children?: ReactNode;
}) => {
  const timeline = useTimelineFrame();
  const captionHeight = caption ? 36 : 0;
  const imageHeight = height - captionHeight;
  const captionReveal = smoothProgress(
    timeline,
    captionDelay ?? delay,
    22,
  );

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
        <div
          className="screenshot-frame__caption"
          style={{
            opacity: captionDelay === undefined ? 1 : captionReveal,
            transform:
              captionDelay === undefined
                ? undefined
                : `translateY(${(1 - captionReveal) * 12}px)`,
          }}
        >
          {caption}
        </div>
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

const HUB_ITEMS: {
  label: string;
  icon: LucideIcon;
  url: string;
  screenshot: string;
  caption: string;
}[] = [
  {
    label: "Simulari interactive",
    icon: Orbit,
    url: "https://puls-fizica.ro/simulari",
    screenshot: PRESENTATION_ASSETS.simulariCatalog,
    caption: "53 simulari — laborator in browser",
  },
  {
    label: "Probleme BAC si grile",
    icon: FlaskConical,
    url: "https://puls-fizica.ro/probleme/bac",
    screenshot: PRESENTATION_ASSETS.problemeLista,
    caption: "Probleme, grile si rezolvari",
  },
  {
    label: "Resurse teoretice",
    icon: BookOpen,
    url: "https://puls-fizica.ro/resurse",
    screenshot: PRESENTATION_ASSETS.resurseLectii,
    caption: "Lectii, formule si experimente",
  },
  {
    label: "Feedback AI",
    icon: Bot,
    url: "https://puls-fizica.ro/asistent",
    screenshot: PRESENTATION_ASSETS.asistent,
    caption: "Asistent PULS — feedback personalizat",
  },
  {
    label: "Profil si progres",
    icon: Trophy,
    url: "https://puls-fizica.ro/profil",
    screenshot: PRESENTATION_ASSETS.profilProgres,
    caption: "XP, streak si statistici",
  },
  {
    label: "Clase profesor-elev",
    icon: Users,
    url: "https://puls-fizica.ro/profesor",
    screenshot: PRESENTATION_ASSETS.claseProfesor,
    caption: "Teme, colegi si dashboard profesor",
  },
];

const HUB_CENTER_X = 960;
const HUB_CENTER_Y = 520;
const HUB_RADIUS = 280;
const NODE_WIDTH = 300;
const NODE_WIDTH_ACTIVE = 368;
const NODE_HEIGHT = 82;
const NODE_HEIGHT_ACTIVE = 292;

export const RadialHub = ({ delay = 40 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const interactive = usePresentationInteractive();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hubReveal = smoothProgress(timeline, delay - 10, 24);

  const nodes = HUB_ITEMS.map((item, index) => {
    const angle = (index / HUB_ITEMS.length) * Math.PI * 2 - Math.PI / 2;
    const nodeCenterX = HUB_CENTER_X + Math.cos(angle) * HUB_RADIUS;
    const nodeCenterY = HUB_CENTER_Y + Math.sin(angle) * HUB_RADIUS;
    return {
      ...item,
      index,
      angle,
      nodeCenterX,
      nodeCenterY,
      reveal: smoothProgress(timeline, delay + index * 8, 24),
    };
  });

  const openHubLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`radial-hub${interactive ? " radial-hub--interactive" : ""}`}>
      <svg
        className="radial-hub__svg"
        style={{ opacity: hubReveal * 0.55 }}
        viewBox="0 0 1920 1080"
      >
        {nodes.map((node) => {
          const isActive = hoveredIndex === node.index;

          return (
            <line
              key={node.label}
              x1={HUB_CENTER_X}
              y1={HUB_CENTER_Y}
              x2={node.nodeCenterX}
              y2={node.nodeCenterY}
              stroke={
                isActive ? "rgba(24,244,255,0.72)" : "rgba(24,244,255,0.28)"
              }
              strokeWidth={isActive ? 3 : 2}
              strokeDasharray="8 6"
            />
          );
        })}
      </svg>

      <div
        className="radial-hub__center"
        style={{
          left: HUB_CENTER_X - 120,
          top: HUB_CENTER_Y - 120,
          opacity: hubReveal,
        }}
      >
        PULS
      </div>

      {nodes.map((node) => {
        const Icon = node.icon;
        const isHovered = hoveredIndex === node.index;
        const nodeWidth = isHovered ? NODE_WIDTH_ACTIVE : NODE_WIDTH;
        const nodeHeight = isHovered ? NODE_HEIGHT_ACTIVE : NODE_HEIGHT;
        const revealScale = 0.88 + node.reveal * 0.12;

        return (
          <div
            key={node.label}
            className={`radial-hub__node${isHovered ? " radial-hub__node--active" : ""}`}
            style={{
              left: node.nodeCenterX - nodeWidth / 2,
              top: node.nodeCenterY - nodeHeight / 2,
              width: nodeWidth,
              opacity: node.reveal,
              transform: `scale(${revealScale})`,
              zIndex: isHovered ? 12 : 2,
            }}
            role={interactive ? "link" : undefined}
            tabIndex={interactive ? 0 : undefined}
            onMouseEnter={
              interactive ? () => setHoveredIndex(node.index) : undefined
            }
            onMouseLeave={interactive ? () => setHoveredIndex(null) : undefined}
            onClick={interactive ? () => openHubLink(node.url) : undefined}
            onKeyDown={
              interactive
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openHubLink(node.url);
                    }
                  }
                : undefined
            }
          >
            <div className="radial-hub__node-header">
              <div className="radial-hub__node-row">
                <div className="radial-hub__node-icon">
                  <Icon size={22} color={COLORS.cyan} strokeWidth={2} />
                </div>
                <div className="radial-hub__node-label">{node.label}</div>
              </div>
            </div>
            <div className="radial-hub__node-media">
              <div className="radial-hub__node-media-inner">
                <Img
                  src={staticFile(node.screenshot)}
                  className="radial-hub__node-image"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
                <div className="radial-hub__node-caption">{node.caption}</div>
              </div>
            </div>
          </div>
        );
      })}

      {interactive ? (
        <div className="radial-hub__hint" style={{ opacity: hubReveal * 0.85 }}>
          Hover pentru preview · Click pentru a deschide
        </div>
      ) : null}
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
