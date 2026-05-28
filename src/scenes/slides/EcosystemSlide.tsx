import { useEffect } from "react";
import {
  RadialHub,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { getSlideMeta } from "../../presentation/slideData";
import { prefetchImageAsset } from "../../presentation/prefetchSlideAssets";
import "./EcosystemSlide.scss";

const HUB_SCREENSHOTS = [
  PRESENTATION_ASSETS.simulariCatalog,
  PRESENTATION_ASSETS.problemeLista,
  PRESENTATION_ASSETS.resurseLectii,
  PRESENTATION_ASSETS.asistent,
  PRESENTATION_ASSETS.profilProgres,
  PRESENTATION_ASSETS.claseProfesor,
] as const;

export const EcosystemSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("ecosystem");

  useEffect(() => {
    for (const asset of HUB_SCREENSHOTS) {
      prefetchImageAsset(asset);
    }
  }, []);

  return (
    <SlideLayout duration={duration}>
      <div className="ecosystem-slide">
        <SlideHeadline
          lines={["PULS: un ecosistem complet", "pentru fizica."]}
          accentIndex={0}
          size={68}
          left={64}
          width={820}
        />
        <SlideSubtitle top={268} delay={24} left={64} width={540}>
          Invata, exerseaza, simuleaza si progreseaza — totul intr-o singura
          platforma.
        </SlideSubtitle>
        <RadialHub delay={36} />
        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={78} />
      </div>
    </SlideLayout>
  );
};
