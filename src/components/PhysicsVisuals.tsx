import { AbsoluteFill, interpolate } from "remotion";
import { useLoopFrame } from "../utils/ambientMotion";
import { cinematicEase, drift, flicker, looping } from "../utils/animation";
import "./PhysicsVisuals.scss";

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
  const frame = useLoopFrame();

  return (
    <AbsoluteFill className="formula-storm">
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
            className={`formula-storm__formula ${index % 3 === 0 ? "formula-storm__formula--cyan" : "formula-storm__formula--muted"}`}
            style={{
              left: baseX + position.x + glitch,
              top: baseY + position.y - collapse * 120,
              fontSize: 34 + index * 3,
              opacity,
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
  const frame = useLoopFrame();
  const angle = looping(frame, 0.048, 0.4) * 28;

  return (
    <div
      className="pendulum"
      style={{
        left: x,
        top: y,
        width: 260 * scale,
        height: 360 * scale,
        transform: `scale(${scale})`,
      }}
    >
      <div className="pendulum__pivot" />
      <div
        className="pendulum__arm"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div className="pendulum__bob" />
      </div>
      <div className="pendulum__ground" />
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
    <div className="projectile-arc" style={{ left: x, top: y }}>
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
            className="projectile-arc__dot"
            style={{
              left: px,
              top: py,
              opacity: visible * (0.25 + t * 0.75),
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
  const frame = useLoopFrame();

  return (
    <AbsoluteFill>
      {Array.from({ length: 18 }).map((_, index) => {
        const angle = (index / 18) * Math.PI * 2 + frame * 0.006;
        const length = 220 + looping(frame, 0.03, index) * 28;
        const opacity = progress * (0.25 + (index % 4) * 0.11);

        return (
          <div
            key={index}
            className="electric-field__line"
            style={{
              left: centerX + Math.cos(angle) * 160,
              top: centerY + Math.sin(angle) * 130,
              width: length,
              opacity,
              transform: `rotate(${angle}rad) scaleX(${progress})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
