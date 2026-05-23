import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { getSlideMeta } from "../../presentation/slideData";

export const SimulationsSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("simulations");

  const sims = [
    {
      src: PRESENTATION_ASSETS.pendul,
      label: "Pendul",
      caption: "Pendul oscilator",
      x: 120,
      lightOverlay: false,
    },
    {
      src: PRESENTATION_ASSETS.unde,
      label: "Unde",
      caption: "Simulator de unde",
      x: 520,
      lightOverlay: true,
    },
    {
      src: PRESENTATION_ASSETS.proiectil,
      label: "Proiectil",
      caption: "Traiectorie proiectil",
      x: 920,
      lightOverlay: true,
    },
    {
      src: PRESENTATION_ASSETS.circuite,
      label: "Circuite",
      caption: "Circuite — electricitate",
      x: 1320,
      lightOverlay: true,
    },
  ];

  return (
    <SlideLayout duration={duration} intensity={0.92}>
      <SlideHeadline
        lines={["Laboratorul pe care", "il ai in browser."]}
        accentIndex={1}
        size={72}
      />
      <SlideSubtitle top={260} delay={22}>
        Zeci de simulari, fara instalare, cu parametri modificabili in timp
        real. Schimba un parametru si vezi imediat ce se intampla.
      </SlideSubtitle>
      {sims.map((sim, index) => (
        <ScreenshotFrame
          key={sim.label}
          src={sim.src}
          x={sim.x}
          y={360}
          width={380}
          height={516}
          delay={34 + index * 12}
          caption={sim.caption}
          objectFit="cover"
          objectPosition="top center"
          lightOverlay={sim.lightOverlay}
        />
      ))}
      <SlideCta label={meta.ctaLabel} delay={82} />
    </SlideLayout>
  );
};
