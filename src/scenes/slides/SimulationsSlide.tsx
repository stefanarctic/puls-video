import { PRESENTATION_ASSETS } from "../../assets";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { getSlideMeta } from "../../presentation/slideData";

export const SimulationsSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("simulations");

  const sims = [
    { src: PRESENTATION_ASSETS.pendul, label: "Pendul", x: 120, y: 360 },
    { src: PRESENTATION_ASSETS.unde, label: "Unde", x: 520, y: 360 },
    { src: PRESENTATION_ASSETS.proiectil, label: "Proiectil", x: 920, y: 360 },
    { src: PRESENTATION_ASSETS.circuite, label: "Circuite", x: 1320, y: 360 },
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
        <SlideScreenshot
          key={sim.label}
          src={sim.src}
          x={sim.x}
          y={sim.y}
          width={380}
          height={480}
          delay={34 + index * 12}
        />
      ))}
      <SlideCta label={meta.ctaLabel} delay={82} />
    </SlideLayout>
  );
};
