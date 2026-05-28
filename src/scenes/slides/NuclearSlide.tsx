import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { getSlideMeta } from "../../presentation/slideData";
import "./NuclearSlide.scss";

const PANEL = {
  y: 360,
  width: 352,
  height: 516,
};

const NUCLEAR_SIMS = [
  {
    src: PRESENTATION_ASSETS.apaGrea,
    label: "Apa grea",
    caption: "D₂O vs H₂O",
    x: 72,
    lightOverlay: false,
  },
  {
    src: PRESENTATION_ASSETS.schimbIzotopic,
    label: "Schimb izotopic",
    caption: "Instalatie H₂S–H₂O",
    x: 448,
    lightOverlay: true,
  },
  {
    src: PRESENTATION_ASSETS.distilareD2o,
    label: "Distilare D₂O",
    caption: "Rectificare apa grea",
    x: 824,
    lightOverlay: true,
  },
  {
    src: PRESENTATION_ASSETS.fisiune,
    label: "Fisiune",
    caption: "Fisiune in lant U-235",
    x: 1200,
    lightOverlay: true,
  },
  {
    src: PRESENTATION_ASSETS.fuziune,
    label: "Fuziune",
    caption: "Reactor D–T (model)",
    x: 1576,
    lightOverlay: false,
  },
] as const;

export const NuclearSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("nuclear");

  return (
    <SlideLayout duration={duration} intensity={1}>
      <div className="nuclear-slide">
      <SlideHeadline
        lines={["De la BAC", "la fizica nucleara."]}
        accentIndex={1}
        size={76}
      />
      <SlideSubtitle top={248} delay={22}>
        Apa grea, schimb izotopic, distilare D₂O, fisiune si fuziune — cinci
        simulari interactive pentru liceu.
      </SlideSubtitle>
      {NUCLEAR_SIMS.map((sim, index) => (
        <ScreenshotFrame
          key={sim.label}
          src={sim.src}
          x={sim.x}
          y={PANEL.y}
          width={PANEL.width}
          height={PANEL.height}
          delay={34 + index * 10}
          caption={sim.caption}
          objectFit="cover"
          objectPosition="top center"
          lightOverlay={sim.lightOverlay}
        />
      ))}
      <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={82} />
      </div>
    </SlideLayout>
  );
};
