import {
  RadialHub,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { getSlideMeta } from "../../presentation/slideData";

export const EcosystemSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("ecosystem");

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["PULS: un ecosistem complet", "pentru fizica."]}
        accentIndex={0}
        size={68}
      />
      <SlideSubtitle top={268} delay={24}>
        Simulari, probleme, resurse, AI, progres, gamificare si clase pentru
        profesori — totul intr-o singura platforma.
      </SlideSubtitle>
      <RadialHub delay={36} />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.resurseSimulari}
        x={120}
        y={780}
        width={520}
        height={220}
        delay={70}
      />
      <SlideCta label={meta.ctaLabel} delay={78} />
    </SlideLayout>
  );
};
