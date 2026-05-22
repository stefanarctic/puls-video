import { PRESENTATION_ASSETS } from "../../assets";
import {
  RomaniaMap,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { getSlideMeta } from "../../presentation/slideData";

export const RomaniaStorySlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("romania");

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["Ramnicu Valcea,", "punctul zero al apei grele."]}
        accentIndex={1}
        size={68}
      />
      <SlideSubtitle top={260} delay={22} width={780}>
        Uzina G — prima cantitate de apa grea romaneasca in 1976. ROMAG-PROD a
        dus tehnologia la scara industriala pentru reactoare CANDU.
      </SlideSubtitle>
      <RomaniaMap delay={34} />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.schimbIzotopic}
        x={120}
        y={380}
        width={720}
        height={520}
        delay={48}
      />
      <SlideCta label={meta.ctaLabel} delay={86} />
    </SlideLayout>
  );
};
