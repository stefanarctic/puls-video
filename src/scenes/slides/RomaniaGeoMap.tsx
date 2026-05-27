import { COLORS } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { smoothProgress } from "../../utils/animation";
import {
  getConnectionLength,
  getMapSitesProjected,
  getGridLineY,
  type MapSiteLabelPlacement,
  ROMANIA_GRID_LINES,
  ROMANIA_OUTLINE_PATH,
  ROMANIA_VIEWBOX,
} from "./romaniaGeoData";
import "./RomaniaGeoMap.scss";

const MAP_SITES = getMapSitesProjected();
const CONNECTION_LENGTH = getConnectionLength();

type RomaniaGeoMapProps = {
  delay?: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export const RomaniaGeoMap = ({
  delay = 36,
  left,
  top,
  width,
  height,
}: RomaniaGeoMapProps) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 32);
  const lineReveal = smoothProgress(timeline, delay + 18, 28);
  const [valcea, severin] = MAP_SITES;

  const labelPosition = (
    x: number,
    y: number,
    placement: MapSiteLabelPlacement,
  ) => {
    const base = {
      left: `${(x / ROMANIA_VIEWBOX.width) * 100}%`,
      top: `${(y / ROMANIA_VIEWBOX.height) * 100}%`,
    };

    if (placement === "bottom-left") {
      return {
        ...base,
        transform: "translate(calc(-100% - 28px), 32px)",
        textAlign: "right" as const,
      };
    }

    return {
      ...base,
      transform: "translate(-50%, calc(-100% - 14px))",
      textAlign: "center" as const,
    };
  };

  return (
    <div
      className="romania-geo-map"
      style={{
        left,
        top,
        width,
        height,
        opacity: reveal,
      }}
    >
      <div className="romania-geo-map__panel">
        <div
          className="romania-geo-map__svg-wrap"
          style={{
            aspectRatio: `${ROMANIA_VIEWBOX.width} / ${ROMANIA_VIEWBOX.height}`,
          }}
        >
        <svg
          className="romania-geo-map__svg"
          viewBox={`0 0 ${ROMANIA_VIEWBOX.width} ${ROMANIA_VIEWBOX.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="romania-geo-fill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(24,244,255,0.14)" />
              <stop offset="100%" stopColor="rgba(22,136,255,0.06)" />
            </linearGradient>
            <filter
              id="romania-geo-glow"
              x="-8%"
              y="-8%"
              width="116%"
              height="116%"
            >
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {ROMANIA_GRID_LINES.map((fraction) => {
            const y = getGridLineY(fraction);

            return (
              <line
                key={fraction}
                className="romania-geo-map__grid"
                x1={ROMANIA_VIEWBOX.width * 0.08}
                y1={y}
                x2={ROMANIA_VIEWBOX.width * 0.92}
                y2={y}
                opacity={reveal * 0.35}
                strokeWidth={1}
              />
            );
          })}

          <path
            className="romania-geo-map__outline"
            d={ROMANIA_OUTLINE_PATH}
            filter="url(#romania-geo-glow)"
          />

          <line
            className="romania-geo-map__connection"
            x1={valcea.x}
            y1={valcea.y}
            x2={severin.x}
            y2={severin.y}
            style={{
              strokeDasharray: CONNECTION_LENGTH,
              strokeDashoffset: (1 - lineReveal) * CONNECTION_LENGTH,
              opacity: 0.35 + lineReveal * 0.65,
            }}
          />

          {MAP_SITES.map((site, index) => {
            const pulse = smoothProgress(timeline, delay + 24 + index * 12, 20);

            return (
              <g key={site.label}>
                <circle
                  className="romania-geo-map__pulse"
                  cx={site.x}
                  cy={site.y}
                  r={11 + pulse * 7}
                  opacity={0.4 * (1 - pulse)}
                />
                <circle
                  className="romania-geo-map__marker"
                  cx={site.x}
                  cy={site.y}
                  r={9}
                />
                <circle
                  className="romania-geo-map__marker-core"
                  cx={site.x}
                  cy={site.y}
                  r={4}
                  fill={COLORS.cyan}
                />
              </g>
            );
          })}
        </svg>

        {MAP_SITES.map((site, index) => {
          const stepReveal = smoothProgress(timeline, delay + 20 + index * 14, 22);

          return (
            <div
              key={site.label}
              className="romania-geo-map__label"
              style={{
                ...labelPosition(site.x, site.y, site.labelPlacement),
                opacity: stepReveal,
              }}
            >
              <div className="romania-geo-map__point-label">{site.label}</div>
              <div className="romania-geo-map__point-sub">{site.sub}</div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};
