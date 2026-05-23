import {
  FlowArrow,
  FlowStep,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { getSlideMeta } from "../../presentation/slideData";

const FLOW_Y = 380;
const STEP_WIDTH = 300;
const STEP_GAP = 60;
const FLOW_START = 120;

export const BacSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("bac");

  const steps = [
    { step: 1, label: "Alege capitolul", delay: 34 },
    { step: 2, label: "Rezolva problema", delay: 46 },
    { step: 3, label: "Primeste feedback", delay: 58 },
    { step: 4, label: "Repeta pana vezi progres", delay: 70 },
  ];

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["De la exercitiu", "la intelegere."]}
        accentIndex={1}
        size={76}
      />
      <SlideSubtitle top={248} delay={22}>
        PULS acopera nevoia practica a elevilor prin probleme BAC, grile,
        rezolvari si urmarirea progresului.
      </SlideSubtitle>
      {steps.map((item, index) => (
        <FlowStep
          key={item.step}
          step={item.step}
          label={item.label}
          x={FLOW_START + index * (STEP_WIDTH + STEP_GAP)}
          y={FLOW_Y}
          width={STEP_WIDTH}
          delay={item.delay}
        />
      ))}
      {steps.slice(0, -1).map((item, index) => (
        <FlowArrow
          key={item.step}
          x={FLOW_START + (index + 1) * STEP_WIDTH + index * STEP_GAP + 20}
          stepY={FLOW_Y}
          delay={item.delay + 8}
        />
      ))}
      <ScreenshotFrame
        src={PRESENTATION_ASSETS.probleme}
        x={260}
        y={580}
        width={1400}
        height={380}
        delay={78}
        caption="Problema BAC — Lissajous"
        lightOverlay
        objectFit="cover"
        objectPosition="top center"
        imageScale={1.06}
      />
      <SlideCta label={meta.ctaLabel} delay={86} />
    </SlideLayout>
  );
};
