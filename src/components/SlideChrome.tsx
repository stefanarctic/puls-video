import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, enterExitOpacity, smoothProgress, springIn } from "../utils/animation";
import { CinematicBackdrop } from "./Backdrop";
import { ParticleField } from "./Particles";

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
}: {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay?: number;
  style?: CSSProperties;
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
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 40}px) scale(${0.96 + reveal * 0.04})`,
        ...style,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export const BlockCard = ({
  label,
  x,
  y,
  width,
  height,
  delay,
  icon,
}: {
  label: string;
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
      }}
    >
      {icon}
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
    </div>
  );
};

export const FlowStep = ({
  step,
  label,
  x,
  y,
  delay,
}: {
  step: number;
  label: string;
  x: number;
  y: number;
  delay: number;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 22);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 320,
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * -32}px)`,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
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

export const FlowArrow = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 18);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: 36,
        color: COLORS.cyan,
        opacity: reveal * 0.7,
      }}
    >
      →
    </div>
  );
};

export const RadialHub = ({ delay = 40 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const items = [
    "Simulari interactive",
    "Probleme BAC si grile",
    "Resurse teoretice",
    "Feedback AI",
    "Profil si progres",
    "Clase profesor-elev",
  ];
  const centerX = 960;
  const centerY = 560;
  const radius = 340;

  return (
    <>
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius - 150;
        const y = centerY + Math.sin(angle) * radius - 48;
        const reveal = smoothProgress(timeline, delay + index * 8, 24);

        return (
          <div
            key={item}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 300,
              padding: "20px 24px",
              borderRadius: 20,
              textAlign: "center",
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              fontWeight: 680,
              color: COLORS.white,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(24,244,255,0.18)",
              opacity: reveal,
              transform: `scale(${0.88 + reveal * 0.12})`,
            }}
          >
            {item}
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
          opacity: smoothProgress(timeline, delay - 10, 24),
        }}
      >
        PULS
      </div>
    </>
  );
};

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
        top: 340,
        width: 720,
        height: 560,
        opacity: reveal,
      }}
    >
      <svg viewBox="0 0 400 500" width="100%" height="100%">
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
        {points.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="10" fill={COLORS.cyan} />
        ))}
      </svg>
      {points.map((point, index) => (
        <div
          key={point.label}
          style={{
            position: "absolute",
            left: point.x + 20,
            top: point.y - 10,
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
          bottom: 0,
          fontFamily: FONT_FAMILY,
          fontSize: 20,
          color: COLORS.muted,
          lineHeight: 1.5,
          maxWidth: 480,
          opacity: smoothProgress(timeline, delay + 40, 24),
        }}
      >
        cercetare pilot → productie industriala → aplicatii nucleare
      </div>
    </div>
  );
};

export const SplitPanel = ({
  left,
  right,
  delay = 24,
}: {
  left: ReactNode;
  right: ReactNode;
  delay?: number;
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
        {right}
      </div>
    </div>
  );
};

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
