import { PRESENTATION_ASSETS } from "../../assets";
import {
  RadialHub,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
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
      <ScreenshotFrame
        src={PRESENTATION_ASSETS.resurseSimulari}
        x={1280}
        y={340}
        width={520}
        height={280}
        delay={70}
        caption="Resurse si simulari"
        lightOverlay
        objectFit="cover"
        objectPosition="top center"
      />
      <SlideCta label={meta.ctaLabel} delay={78} />
    </SlideLayout>
  );
};
