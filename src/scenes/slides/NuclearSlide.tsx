import { PRESENTATION_ASSETS } from "../../assets";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { smoothProgress } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";

export const NuclearSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("nuclear");
  const timeline = useTimelineFrame();
  const shift = smoothProgress(timeline, 50, 40);

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
      <div
        style={{
          position: "absolute",
          left: 120 + (1 - shift) * 200,
          top: 380,
          width: 520,
          height: 480,
          borderRadius: 24,
          border: "1px solid rgba(136,169,200,0.2)",
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1 - shift * 0.6,
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          color: COLORS.muted,
        }}
      >
        Problema BAC
      </div>
      <SlideScreenshot
        src={PRESENTATION_ASSETS.apaGrea}
        x={120 + shift * 420}
        y={380}
        width={620}
        height={480}
        delay={40}
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.fisiune}
        x={820}
        y={380}
        width={480}
        height={480}
        delay={56}
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.fuziune}
        x={1340}
        y={380}
        width={460}
        height={480}
        delay={68}
      />
      <SlideCta label={meta.ctaLabel} delay={78} />
    </SlideLayout>
  );
};
