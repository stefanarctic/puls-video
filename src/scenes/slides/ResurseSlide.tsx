import { Fragment } from "react";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { smoothProgress } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";
import "./ResurseSlide.scss";

const LEFT_X = 80;
const HEADLINE_TOP = 56;
const SUBTITLE_TOP = 178;

const GRID_X = 700;
const GRID_Y = 268;
const COL_W = 500;
const COL_GAP = 44;
const ROW_GAP = 72;

const STEPS = [
  { step: 1, label: "Resurse teoretice", delay: 30 },
  { step: 2, label: "Simulari interactive", delay: 40 },
  { step: 3, label: "Probleme si grile", delay: 50 },
  { step: 4, label: "Feedback AI", delay: 60 },
] as const;

const PANELS = [
  {
    step: 1,
    src: PRESENTATION_ASSETS.resurseLectii,
    label: "Resurse teoretice",
    delay: 72,
    aspect: 1024 / 496,
    col: 0,
    row: 0,
    className: "resurse-slide__panel--resurse",
  },
  {
    step: 2,
    src: PRESENTATION_ASSETS.simulariCatalog,
    label: "Simulari interactive",
    delay: 78,
    aspect: 1024 / 512,
    col: 1,
    row: 0,
    className: "resurse-slide__panel--simulari",
  },
  {
    step: 3,
    src: PRESENTATION_ASSETS.problemeLista,
    label: "Probleme si grile",
    delay: 84,
    aspect: 1024 / 512,
    col: 0,
    row: 1,
    className: "resurse-slide__panel--probleme",
  },
  {
    step: 4,
    src: PRESENTATION_ASSETS.feedbackAiCompact,
    label: "Feedback AI",
    delay: 90,
    aspect: 910 / 520,
    col: 1,
    row: 1,
    className: "resurse-slide__panel--feedback",
  },
] as const;

const buildGridLayout = () => {
  const rowHeights = [0, 0];

  for (const panel of PANELS) {
    const height = Math.round(COL_W / panel.aspect);
    rowHeights[panel.row] = Math.max(rowHeights[panel.row], height);
  }

  const rowY = [GRID_Y, GRID_Y + rowHeights[0] + ROW_GAP];

  return PANELS.map((panel) => {
    const height = Math.round(COL_W / panel.aspect);
    const x = GRID_X + panel.col * (COL_W + COL_GAP);
    const y = rowY[panel.row];

    return {
      ...panel,
      x,
      y,
      width: COL_W,
      height,
      centerX: x + COL_W / 2,
      centerY: y + height / 2,
      right: x + COL_W,
      bottom: y + height,
    };
  });
};

const GRID_PANELS = buildGridLayout();

const ARROW_LEN = 14;
const ARROW_HALF = 7;

type RouteArrow = {
  x: number;
  y: number;
  direction: "right" | "down";
};

const buildPathSegments = () => {
  const [a1, a2, a3, a4] = GRID_PANELS;
  const topLinkY = (a1.centerY + a2.centerY) / 2;
  const bottomLinkY = (a3.centerY + a4.centerY) / 2;
  const turnY = a2.bottom + (a3.y - a2.bottom) * 0.42;
  const arrowTipX = a3.centerX;
  const arrowTipY = a3.y - 18;
  const topArrowTipX = a2.x - 12;
  const bottomArrowTipX = a4.x - 12;

  return [
    {
      key: "1-2",
      length: 560,
      d: `M ${a1.right + 12} ${topLinkY} L ${topArrowTipX - ARROW_LEN} ${topLinkY}`,
      arrow: { x: topArrowTipX, y: topLinkY, direction: "right" as const },
      delay: 64,
    },
    {
      key: "2-3",
      length: 720,
      d: `M ${a2.centerX} ${a2.bottom + 12} L ${a2.centerX} ${turnY} L ${arrowTipX} ${turnY} L ${arrowTipX} ${arrowTipY - ARROW_LEN}`,
      arrow: { x: arrowTipX, y: arrowTipY, direction: "down" as const },
      delay: 72,
    },
    {
      key: "3-4",
      length: 560,
      d: `M ${a3.right + 12} ${bottomLinkY} L ${bottomArrowTipX - ARROW_LEN} ${bottomLinkY}`,
      arrow: { x: bottomArrowTipX, y: bottomLinkY, direction: "right" as const },
      delay: 80,
    },
  ] as const;
};

const PATH_SEGMENTS = buildPathSegments();

const arrowPoints = (arrow: RouteArrow) => {
  const { x, y, direction } = arrow;

  if (direction === "right") {
    return `${x},${y} ${x - ARROW_LEN},${y - ARROW_HALF} ${x - ARROW_LEN},${y + ARROW_HALF}`;
  }

  return `${x},${y} ${x - ARROW_HALF},${y - ARROW_LEN} ${x + ARROW_HALF},${y - ARROW_LEN}`;
};

const PathArrows = () => {
  const timeline = useTimelineFrame();

  return (
    <svg className="resurse-slide__route" viewBox="0 0 1920 1080">
      {PATH_SEGMENTS.map((segment) => {
        const reveal = smoothProgress(timeline, segment.delay, 22);

        return (
          <g key={segment.key} opacity={0.4 + reveal * 0.6}>
            <path
              className="resurse-slide__route-line"
              d={segment.d}
              style={{
                strokeDasharray: segment.length,
                strokeDashoffset: (1 - reveal) * segment.length,
              }}
            />
            <polygon
              className="resurse-slide__route-head"
              points={arrowPoints(segment.arrow)}
              style={{ opacity: reveal }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export const ResurseSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("resurse");
  const timeline = useTimelineFrame();

  return (
    <SlideLayout duration={duration}>
      <div className="resurse-slide">
        <div className="resurse-slide__left">
          <SlideHeadline
            lines={["Traseul elevului", "incepe cu resurse."]}
            accentIndex={1}
            size={64}
            top={HEADLINE_TOP}
            left={LEFT_X}
            width={780}
          />
          <SlideSubtitle
            top={SUBTITLE_TOP}
            delay={20}
            left={LEFT_X}
            width={760}
          >
            De la lectii teoretice la simulari, probleme si feedback AI — un
            parcurs clar care transforma teoria in intelegere.
          </SlideSubtitle>

          <div className="resurse-slide__path">
            {STEPS.map((item, index) => {
              const reveal = smoothProgress(timeline, item.delay, 22);
              const arrowReveal = smoothProgress(timeline, item.delay + 8, 18);

              return (
                <Fragment key={item.step}>
                  <div
                    className="resurse-slide__step"
                    style={{
                      opacity: reveal,
                      transform: `translateX(${(1 - reveal) * -24}px)`,
                    }}
                  >
                    <div className="flow-step__badge">{item.step}</div>
                    <div className="flow-step__label">{item.label}</div>
                  </div>
                  {index < STEPS.length - 1 ? (
                    <div
                      className="resurse-slide__gap"
                      style={{
                        opacity: arrowReveal * 0.85,
                        transform: `translateY(${(1 - arrowReveal) * 4}px)`,
                      }}
                    >
                      <span className="resurse-slide__arrow">↓</span>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </div>

        <PathArrows />

        {GRID_PANELS.map((panel, index) => (
          <ScreenshotFrame
            key={panel.label}
            src={panel.src}
            x={panel.x}
            y={panel.y}
            width={panel.width}
            height={panel.height}
            delay={panel.delay}
            objectFit="contain"
            objectPosition="top center"
            screenshotClassName={panel.className}
            style={{ zIndex: index + 2 }}
          >
            <div className="resurse-slide__step-badge">{panel.step}</div>
            <div className="resurse-slide__shot-label">{panel.label}</div>
          </ScreenshotFrame>
        ))}

        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={96} />
      </div>
    </SlideLayout>
  );
};
