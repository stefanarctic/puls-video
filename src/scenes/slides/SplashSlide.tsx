import { AbsoluteFill, Img, interpolate, staticFile, useVideoConfig } from "remotion";
import { ASSETS } from "../../assets";
import { CinematicBackdrop } from "../../components/Backdrop";
import { ParticleField } from "../../components/Particles";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useLoopFrame, useTimelineFrame } from "../../utils/ambientMotion";
import {
  impactEase,
  enterExitOpacity,
  looping,
  smoothProgress,
  springIn,
} from "../../utils/animation";

const MOTTO_LINES = ["Fizica nu se memoreaza.", "Fizica se vede."];

export const SplashSlide = ({ duration }: { duration: number }) => {
  const timeline = useTimelineFrame();
  const loop = useLoopFrame();
  const { fps } = useVideoConfig();
  const opacity = enterExitOpacity(timeline, duration, 12, 18);

  const bloom = smoothProgress(timeline, 0, 28, impactEase);
  const flash = interpolate(timeline, [8, 18, 32], [0, 0.95, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoSpring = springIn(timeline, fps, 22, 16, 120);
  const logoGlow = 0.55 + looping(loop, 0.06) * 0.25 + bloom * 0.35;
  const haloSpin = loop * 0.22 + bloom * 18;

  return (
    <AbsoluteFill style={{ opacity }}>
      <CinematicBackdrop intensity={0.55 + bloom * 0.55} chaos={bloom * 0.4} />
      <ParticleField
        count={96}
        speed={0.55 + bloom * 0.35}
        opacity={0.18 + bloom * 0.32}
        energy={0.65 + bloom * 0.55}
      />

      {/* Converging energy vortex */}
      <AbsoluteFill
        style={{
          mixBlendMode: "screen",
          opacity: 0.35 + bloom * 0.45,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1100,
            height: 1100,
            borderRadius: 999,
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(24,244,255,0.28) 12%, transparent 24%, rgba(22,136,255,0.22) 38%, transparent 52%, rgba(24,244,255,0.18) 68%, transparent 82%)",
            transform: `translate(-50%, -50%) rotate(${haloSpin}deg) scale(${0.5 + bloom * 0.62})`,
            filter: "blur(28px)",
          }}
        />
      </AbsoluteFill>

      {/* Shockwave rings */}
      {Array.from({ length: 4 }).map((_, index) => {
        const ringStart = 6 + index * 10;
        const progress = smoothProgress(timeline, ringStart, 52, impactEase);
        const scale = 0.15 + progress * (2.8 + index * 0.55);
        const ringOpacity = (1 - progress) * (0.85 - index * 0.12);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 420,
              height: 420,
              borderRadius: 999,
              border: `${2.5 - index * 0.35}px solid rgba(24,244,255,${ringOpacity * 0.7})`,
              boxShadow: `0 0 ${90 * ringOpacity}px rgba(24,244,255,0.45), inset 0 0 ${40 * ringOpacity}px rgba(22,136,255,0.25)`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: ringOpacity,
            }}
          />
        );
      })}

      {/* Orbital sparks */}
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index / 8) * Math.PI * 2 + loop * 0.028;
        const radius = 280 + looping(loop, 0.018, index) * 40 + bloom * 60;
        const sparkOpacity =
          bloom * interpolate(looping(loop, 0.08, index), [-1, 1], [0.35, 1]);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 6,
              height: 6,
              borderRadius: 999,
              background: COLORS.cyan,
              boxShadow: `0 0 22px ${COLORS.cyan}, 0 0 44px ${COLORS.blue}`,
              opacity: sparkOpacity,
              transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))`,
            }}
          />
        );
      })}

      {/* Central glow bloom */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 46%, rgba(24,244,255,${0.08 + bloom * 0.38}) 0%, rgba(22,136,255,${bloom * 0.12}) 18%, transparent 42%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Opening flash */}
      <AbsoluteFill
        style={{
          background: "white",
          opacity: flash,
          mixBlendMode: "overlay",
        }}
      />

      {/* Logo + motto */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          fontFamily: FONT_FAMILY,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${0.72 + logoSpring * 0.28})`,
            opacity: interpolate(logoSpring, [0, 0.4, 1], [0, 0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 760,
              height: 760,
              borderRadius: 999,
              background: `radial-gradient(circle, rgba(24,244,255,${logoGlow * 0.35}) 0%, transparent 68%)`,
              filter: "blur(40px)",
            }}
          />
          <Img
            src={staticFile(ASSETS.logo)}
            style={{
              width: 720,
              height: "auto",
              objectFit: "contain",
              mixBlendMode: "screen",
              filter: `drop-shadow(0 0 ${36 + logoGlow * 48}px rgba(24,244,255,0.72)) drop-shadow(0 42px 120px rgba(22,136,255,0.38))`,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginTop: 8,
          }}
        >
          {MOTTO_LINES.map((line, index) => {
            const reveal = smoothProgress(timeline, 48 + index * 12, 26);
            const isAccent = index === 1;

            return (
              <div
                key={line}
                style={{
                  fontSize: isAccent ? 44 : 34,
                  fontWeight: isAccent ? 760 : 560,
                  letterSpacing: isAccent ? "-0.03em" : "0.14em",
                  textTransform: isAccent ? "none" : "uppercase",
                  color: isAccent ? COLORS.cyan : COLORS.muted,
                  textShadow: isAccent ? `0 0 32px rgba(24,244,255,0.55)` : undefined,
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 22}px)`,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(2,4,11,0.28) 58%, rgba(2,4,11,0.88) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
