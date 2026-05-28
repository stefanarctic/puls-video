import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
  smoothProgress,
} from "../../components/SlideChrome";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";
import { RomaniaGeoMap } from "./RomaniaGeoMap";
import "./RomaniaStorySlide.scss";

const CONTENT_OFFSET_Y = 96;

const LAYOUT = {
  left: 120,
  gap: 20,
  headlineTop: 72,
  subtitleTop: 228,
  screenshotsY: 292 + CONTENT_OFFSET_Y,
  screenshotHeight: 248,
  apaWidth: 360,
  schimbWidth: 400,
  belowScreenshotsGap: 44,
  map: { left: 960, top: 168 + CONTENT_OFFSET_Y, width: 880, height: 540 },
};

const imagesWidth = LAYOUT.apaWidth + LAYOUT.gap + LAYOUT.schimbWidth;
const schimbX = LAYOUT.left + LAYOUT.apaWidth + LAYOUT.gap;
const screenshotsBottom =
  LAYOUT.screenshotsY + LAYOUT.screenshotHeight;

const DEDICATION = {
  x: LAYOUT.left,
  y: screenshotsBottom + LAYOUT.belowScreenshotsGap,
  width: imagesWidth,
};

const CollaborationNote = ({ delay = 30 }: { delay?: number }) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 28);

  return (
    <div
      className="romania-slide__dedication"
      style={{
        left: DEDICATION.x,
        top: DEDICATION.y,
        width: DEDICATION.width,
        opacity: reveal,
        transform: `translateY(${(1 - reveal) * 20}px)`,
      }}
    >
      <p className="romania-slide__dedication-eyebrow">Colaborare stiintifica</p>
      <p className="romania-slide__dedication-text">
        Am lucrat la simularile PULS despre apa grea impreuna cu domnul{" "}
        <span className="romania-slide__dedication-name">
          Dorel-Mihai Constantinescu
        </span>
        , doctor in stiinte si cercetator la Uzina G din Ramnicu Valcea —
        printre pionierii care, alaturi de academicianul Marius Peculea, au
        contribuit la obtinerea, pe{" "}
        <span className="romania-slide__dedication-date">9 august 1976</span>, a
        primei cantitati de apa grea de grad nuclear produse in Romania.
      </p>
      <div className="romania-slide__timeline">
        <span className="romania-slide__timeline-chip">Uzina G · 1970–1991</span>
        <span className="romania-slide__timeline-chip">
          Tehnologie romaneasca CANDU
        </span>
        <span className="romania-slide__timeline-chip">ROMAG-PROD</span>
      </div>
    </div>
  );
};

export const RomaniaStorySlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("romania");

  return (
    <SlideLayout duration={duration}>
      <div className="romania-slide">
        <SlideHeadline
          lines={["Ramnicu Valcea,", "punctul zero al apei grele."]}
          accentIndex={1}
          size={68}
          top={LAYOUT.headlineTop}
          left={LAYOUT.left}
          width={900}
        />
        <SlideSubtitle
          top={LAYOUT.subtitleTop}
          delay={18}
          left={LAYOUT.left}
          width={720}
        >
          De la primul miligram de D₂O la reactoare CANDU — o poveste romaneasca
          pe care o putem explora in simulari interactive.
        </SlideSubtitle>

        <ScreenshotFrame
          src={PRESENTATION_ASSETS.apaGrea}
          x={LAYOUT.left}
          y={LAYOUT.screenshotsY}
          width={LAYOUT.apaWidth}
          height={LAYOUT.screenshotHeight}
          delay={36}
          caption="Simulator D₂O vs H₂O"
          captionDelay={48}
          objectFit="cover"
          objectPosition="top center"
          screenshotClassName="romania-slide__screenshot"
        />
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.schimbIzotopic}
          x={schimbX}
          y={LAYOUT.screenshotsY}
          width={LAYOUT.schimbWidth}
          height={LAYOUT.screenshotHeight}
          delay={44}
          caption="Instalatie schimb izotopic H₂S–H₂O"
          captionDelay={56}
          objectFit="cover"
          objectPosition="top center"
          screenshotClassName="romania-slide__screenshot"
        />

        <CollaborationNote delay={52} />

        <RomaniaGeoMap
          delay={38}
          left={LAYOUT.map.left}
          top={LAYOUT.map.top}
          width={LAYOUT.map.width}
          height={LAYOUT.map.height}
        />
        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={86} />
      </div>
    </SlideLayout>
  );
};
