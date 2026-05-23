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
import { COLORS, FONT_FAMILY } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, enterExitOpacity, smoothProgress, springIn } from "../utils/animation";
import { CinematicBackdrop } from "./Backdrop";
import { ParticleField } from "./Particles";

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
      style={{
        position: "absolute",
        right: 72,
        bottom: 56,
        padding: "18px 32px",
        borderRadius: 999,
        fontFamily: FONT_FAMILY,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: COLORS.white,
        background: `linear-gradient(135deg, rgba(22,136,255,0.92), rgba(24,244,255,0.72))`,
        border: "1px solid rgba(24,244,255,0.55)",
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
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        fontFamily: FONT_FAMILY,
      }}
    >
      {lines.map((line, index) => {
        const reveal = smoothProgress(timeline, delay + index * 10, 22);
        const isAccent = accentIndex === index;

        return (
          <div
            key={line}
            style={{
              marginTop: index === 0 ? 0 : 8,
              fontSize: size - (index > 0 ? 8 : 0),
              fontWeight: 760,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: isAccent ? COLORS.cyan : COLORS.white,
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
      style={{
        position: "absolute",
        top,
        left,
        width,
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        fontWeight: 560,
        lineHeight: 1.45,
        color: COLORS.muted,
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
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(24,244,255,0.22)",
        boxShadow: `0 24px 80px rgba(0,0,0,0.45), 0 0 ${reveal * 40}px rgba(24,244,255,0.12)`,
        background:
          "linear-gradient(145deg, rgba(15,37,63,0.82), rgba(5,12,24,0.7))",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 40}px) scale(${0.96 + reveal * 0.04})`,
        ...style,
      }}
    >
      {src ? (
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(2,4,11,0.08) 0%, rgba(2,4,11,0.35) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 0 1px rgba(24,244,255,0.12)",
              pointerEvents: "none",
            }}
          />
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
  children?: ReactNode;
}) => {
  const captionHeight = caption ? 36 : 0;
  const imageHeight = height - captionHeight;

  return (
    <div style={{ position: "absolute", left: x, top: y, width, ...style }}>
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
      >
        {children}
      </SlideScreenshot>
      {caption ? (
        <div
          style={{
            marginTop: 12,
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            fontWeight: 650,
            color: COLORS.muted,
            letterSpacing: "0.02em",
            textAlign: "center",
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
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: 28,
        padding: "32px 36px",
        boxSizing: "border-box",
        background:
          "linear-gradient(145deg, rgba(15,37,63,0.88), rgba(5,12,24,0.78))",
        border: "1px solid rgba(119,224,255,0.22)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 48}px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      {icon}
      <div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 720,
            lineHeight: 1.2,
            color: COLORS.white,
            letterSpacing: "-0.02em",
          }}
        >
          {label}
        </div>
        {sublabel ? (
          <div
            style={{
              marginTop: 10,
              fontFamily: FONT_FAMILY,
              fontSize: 20,
              fontWeight: 520,
              lineHeight: 1.35,
              color: COLORS.muted,
            }}
          >
            {sublabel}
          </div>
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
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * -32}px)`,
      }}
    >
      <div
        style={{
          width: FLOW_BADGE_SIZE,
          height: FLOW_BADGE_SIZE,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          fontWeight: 800,
          color: COLORS.black,
          background: COLORS.cyan,
          boxShadow: `0 0 24px ${COLORS.cyan}`,
          marginBottom: 16,
        }}
      >
        {step}
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 26,
          fontWeight: 680,
          color: COLORS.white,
          lineHeight: 1.25,
        }}
      >
        {label}
      </div>
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
      style={{
        position: "absolute",
        left: x,
        top: arrowTop,
        fontSize: 36,
        lineHeight: 1,
        color: COLORS.cyan,
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
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: hubReveal * 0.55,
        }}
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
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              width: 300,
              padding: "18px 20px 20px",
              borderRadius: 20,
              fontFamily: FONT_FAMILY,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(24,244,255,0.18)",
              opacity: node.reveal,
              transform: `scale(${0.88 + node.reveal * 0.12})`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: "rgba(24,244,255,0.12)",
                  border: "1px solid rgba(24,244,255,0.28)",
                }}
              >
                <Icon size={22} color={COLORS.cyan} strokeWidth={2} />
              </div>
              <div
                style={{
                  fontSize: 21,
                  fontWeight: 680,
                  color: COLORS.white,
                  lineHeight: 1.2,
                }}
              >
                {node.label}
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: centerX - 120,
          top: centerY - 120,
          width: 240,
          height: 240,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 52,
          fontWeight: 900,
          color: COLORS.cyan,
          background:
            "radial-gradient(circle, rgba(24,244,255,0.18), rgba(5,12,24,0.9))",
          border: "2px solid rgba(24,244,255,0.45)",
          boxShadow: `0 0 80px rgba(24,244,255,0.25)`,
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
      style={{
        position: "absolute",
        left: 900,
        top: 360,
        width: 720,
        height: 520,
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
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              fontWeight: 760,
              color: COLORS.white,
            }}
          >
            {point.label}
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: COLORS.muted,
              marginTop: 4,
            }}
          >
            {point.sub}
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: smoothProgress(timeline, delay + 40, 24),
        }}
      >
        {ROMANIA_MILESTONES.map((milestone, index) => {
          const stepReveal = smoothProgress(timeline, delay + 44 + index * 10, 20);
          return (
            <div
              key={milestone}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flex: index === ROMANIA_MILESTONES.length - 1 ? "0 0 auto" : 1,
              }}
            >
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: 14,
                  fontFamily: FONT_FAMILY,
                  fontSize: 18,
                  fontWeight: 650,
                  color: COLORS.white,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(24,244,255,0.2)",
                  opacity: stepReveal,
                  whiteSpace: "nowrap",
                }}
              >
                {milestone}
              </div>
              {index < ROMANIA_MILESTONES.length - 1 ? (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background:
                      "linear-gradient(90deg, rgba(24,244,255,0.45), rgba(24,244,255,0.12))",
                    opacity: stepReveal * 0.8,
                  }}
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
  <div
    style={{
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 2,
      padding: "10px 16px",
      borderRadius: 12,
      fontFamily: FONT_FAMILY,
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: accent ? COLORS.cyan : COLORS.muted,
      background: accent
        ? "rgba(24,244,255,0.12)"
        : "rgba(255,255,255,0.06)",
      border: accent
        ? "1px solid rgba(24,244,255,0.35)"
        : "1px solid rgba(136,169,200,0.2)",
    }}
  >
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
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 340,
        width: 1680,
        height: 580,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        opacity: reveal,
      }}
    >
      <div
        style={{
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(136,169,200,0.15)",
          background: "rgba(255,255,255,0.03)",
          position: "relative",
        }}
      >
        {leftBadge ? <PanelBadge label={leftBadge} /> : null}
        {left}
      </div>
      <div
        style={{
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(24,244,255,0.22)",
          boxShadow: `0 0 ${reveal * 48}px rgba(24,244,255,0.1)`,
          position: "relative",
        }}
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
  <div style={{ width, fontFamily: FONT_FAMILY, color: COLORS.white }}>
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
      <span style={{ color: COLORS.cyan }}>{Math.round(progress * 100)}%</span>
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
          background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})`,
          boxShadow: `0 0 32px ${COLORS.cyan}`,
        }}
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

export { springIn, smoothProgress };
