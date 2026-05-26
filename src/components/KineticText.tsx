import { fitText } from "@remotion/layout-utils";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { interpolate, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../constants";
import { useTimelineFrame } from "../utils/ambientMotion";
import { cinematicEase, springIn, stagger } from "../utils/animation";
import "./KineticText.scss";

type KineticTextProps = {
  lines: string[];
  top?: number;
  left?: number;
  width?: number;
  align?: "left" | "center" | "right";
  size?: number;
  delay?: number;
  gap?: number;
  accentIndex?: number;
  style?: CSSProperties;
};

export const KineticText = ({
  lines,
  top = 390,
  left = 160,
  width = 960,
  align = "left",
  size = 74,
  delay = 0,
  gap = 14,
  accentIndex,
  style,
}: KineticTextProps) => {
  const frame = useTimelineFrame();
  const { fps } = useVideoConfig();
  const fittedSize = useMemo(() => {
    const widest = lines.reduce((longest, current) =>
      current.length > longest.length ? current : longest,
    );

    return fitText({
      text: widest,
      withinWidth: width,
      fontFamily: FONT_FAMILY,
      fontWeight: 720,
      letterSpacing: "-0.055em",
      validateFontIsLoaded: false,
    }).fontSize;
  }, [lines, width]);

  return (
    <div
      className="kinetic-text"
      style={{
        top,
        left,
        width,
        textAlign: align,
        ...style,
      }}
    >
      {lines.map((line, index) => {
        const entrance = springIn(frame, fps, delay + stagger(index, 7), 20, 95);
        const reveal = interpolate(
          frame,
          [delay + stagger(index, 7), delay + stagger(index, 7) + 18],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: cinematicEase,
          },
        );
        const isAccent = accentIndex === index;

        return (
          <div
            key={line}
            className={`kinetic-text__line${isAccent ? " kinetic-text__line--accent" : ""}`}
            style={{
              marginTop: index === 0 ? 0 : gap,
              fontSize: Math.min(size, fittedSize),
              textShadow: isAccent ? `0 0 34px ${COLORS.cyan}` : undefined,
              opacity: reveal,
              transform: `translate3d(0, ${(1 - entrance) * 64}px, 0) scale(${0.96 + entrance * 0.04})`,
              filter: `blur(${(1 - entrance) * 14}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const Caption = ({
  children,
  top,
  left = 160,
  delay = 0,
}: {
  children: string;
  top: number;
  left?: number;
  delay?: number;
}) => {
  const frame = useTimelineFrame();
  const reveal = interpolate(frame, [delay, delay + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });

  return (
    <div
      className="caption"
      style={{
        top,
        left,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 22}px)`,
      }}
    >
      {children}
    </div>
  );
};
