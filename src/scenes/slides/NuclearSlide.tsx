import { interpolate } from "remotion";
import { PRESENTATION_ASSETS } from "../../assets";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { cinematicEase, smoothProgress } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";
import "./NuclearSlide.scss";

const PANEL = {
  y: 380,
  height: 480,
  width: 520,
};

export const NuclearSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("nuclear");
  const timeline = useTimelineFrame();
  const shift = smoothProgress(timeline, 50, 40);

  const bacOpacity = interpolate(shift, [0, 0.45, 1], [1, 0.35, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });
  const bacX = 120 + shift * 180;
  const apaX = 120 + shift * 420;
  const fisiuneX = 820 + shift * 40;
  const fuziuneX = 1340;

  return (
    <SlideLayout duration={duration} intensity={1}>
      <SlideHeadline
        lines={["De la BAC", "la fizica nucleara."]}
        accentIndex={1}
        size={76}
      />
      <SlideSubtitle top={248} delay={22}>
        Apa grea, schimb izotopic, distilare D2O, fisiune, fuziune si izotopi —
        teme avansate accesibile elevilor de liceu.
      </SlideSubtitle>
      <SlideScreenshot
        src={PRESENTATION_ASSETS.probleme}
        x={bacX}
        y={PANEL.y}
        width={PANEL.width}
        height={PANEL.height}
        delay={34}
        lightOverlay
        objectFit="cover"
        objectPosition="top center"
        imageScale={1.05}
        style={{
          opacity: bacOpacity,
          zIndex: 4 - shift * 2,
        }}
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.apaGrea}
        x={apaX}
        y={PANEL.y}
        width={620}
        height={PANEL.height}
        delay={40}
        style={{ zIndex: 2 + shift }}
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.fisiune}
        x={fisiuneX}
        y={PANEL.y}
        width={480}
        height={PANEL.height}
        delay={56}
        lightOverlay
        objectFit="cover"
        objectPosition="top center"
        style={{
          zIndex: 3,
          opacity: smoothProgress(timeline, 56, 24),
        }}
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.fuziune}
        x={fuziuneX}
        y={PANEL.y}
        width={460}
        height={PANEL.height}
        delay={68}
        style={{ zIndex: 4 }}
      />
      <div
        className="nuclear-slide__bac-label"
        style={{
          left: bacX + 24,
          top: PANEL.y + PANEL.height - 56,
          opacity: bacOpacity,
        }}
      >
        Problema BAC
      </div>
      <SlideCta label={meta.ctaLabel} delay={78} />
    </SlideLayout>
  );
};
