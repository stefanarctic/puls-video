import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";
import { cinematicEase, drift, flicker, looping } from "../utils/animation";

const formulas = [
  "F = ma",
  "E = hf",
  "v = v0 + at",
  "ΣF = 0",
  "Δx = vt",
  "p = mv",
  "τ = r × F",
  "U = mgh",
  "qE = F",
  "λ = h / p",
];

export const FormulaStorm = ({ collapse = 0 }: { collapse?: number }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ perspective: 1200 }}>
      {formulas.map((formula, index) => {
        const position = drift(frame, 45 + index * 2, 34, 0.012, index);
        const baseX = 150 + ((index * 311) % 1580);
        const baseY = 95 + ((index * 181) % 780);
        const depth = -260 + index * 46;
        const glitch = collapse * looping(frame, 0.82, index) * 28;
        const scale = 0.76 + ((index * 17) % 60) / 100;
        const opacity = Math.max(0, flicker(frame, index) * (0.64 - collapse));

        return (
          <div
            key={formula}
            style={{
              position: "absolute",
              left: baseX + position.x + glitch,
              top: baseY + position.y - collapse * 120,
              fontFamily: FONT_FAMILY,
              fontSize: 34 + index * 3,
              fontWeight: 620,
              color: index % 3 === 0 ? COLORS.cyan : COLORS.muted,
              opacity,
              letterSpacing: "-0.03em",
              filter: `blur(${collapse * 7}px)`,
              textShadow: `0 0 ${28 + collapse * 40}px rgba(24,244,255,0.65)`,
              transform: `translateZ(${depth}px) rotate(${looping(frame, 0.008, index) * 8}deg) scale(${scale + collapse * 0.5})`,
            }}
          >
            {formula}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Pendulum = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => {
  const frame = useCurrentFrame();
  const angle = looping(frame, 0.048, 0.4) * 28;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 260 * scale,
        height: 360 * scale,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 126,
          top: 16,
          width: 8,
          height: 8,
          borderRadius: 99,
          background: COLORS.white,
          boxShadow: `0 0 24px ${COLORS.cyan}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 128,
          top: 18,
          width: 2,
          height: 270,
          background: "linear-gradient(#ffffff, rgba(24,244,255,0.25))",
          transformOrigin: "top center",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -25,
            top: 250,
            width: 52,
            height: 52,
            borderRadius: 999,
            background: `radial-gradient(circle, ${COLORS.white}, ${COLORS.cyan} 35%, ${COLORS.blue})`,
            boxShadow: `0 0 42px ${COLORS.cyan}`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 292,
          width: 190,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(24,244,255,0.45), transparent)",
        }}
      />
    </div>
  );
};

export const ProjectileArc = ({
  x,
  y,
  progress,
}: {
  x: number;
  y: number;
  progress: number;
}) => {
  const samples = Array.from({ length: 28 });

  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      {samples.map((_, index) => {
        const t = index / (samples.length - 1);
        const visible = interpolate(progress, [t - 0.08, t], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: cinematicEase,
        });
        const px = t * 480;
        const py = -Math.sin(t * Math.PI) * 210 + t * 140;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: 9,
              height: 9,
              borderRadius: 99,
              background: COLORS.cyan,
              opacity: visible * (0.25 + t * 0.75),
              boxShadow: `0 0 22px ${COLORS.cyan}`,
            }}
          />
        );
      })}
    </div>
  );
};

export const ElectricField = ({
  progress,
  centerX = 1350,
  centerY = 455,
}: {
  progress: number;
  centerX?: number;
  centerY?: number;
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {Array.from({ length: 18 }).map((_, index) => {
        const angle = (index / 18) * Math.PI * 2 + frame * 0.006;
        const length = 220 + looping(frame, 0.03, index) * 28;
        const opacity = progress * (0.25 + (index % 4) * 0.11);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: centerX + Math.cos(angle) * 160,
              top: centerY + Math.sin(angle) * 130,
              width: length,
              height: 2,
              background:
                "linear-gradient(90deg, rgba(24,244,255,0), rgba(24,244,255,0.9), rgba(22,136,255,0))",
              opacity,
              transform: `rotate(${angle}rad) scaleX(${progress})`,
              transformOrigin: "left center",
              filter: "blur(0.25px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
