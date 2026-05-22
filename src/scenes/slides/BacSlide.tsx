import {
  FlowArrow,
  FlowStep,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { getSlideMeta } from "../../presentation/slideData";

export const BacSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("bac");

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
      <FlowStep
        step={1}
        label="Alege capitolul"
        x={120}
        y={380}
        delay={34}
      />
      <FlowArrow x={440} y={400} delay={42} />
      <FlowStep
        step={2}
        label="Rezolva problema"
        x={480}
        y={380}
        delay={46}
      />
      <FlowArrow x={800} y={400} delay={54} />
      <FlowStep
        step={3}
        label="Primeste feedback"
        x={840}
        y={380}
        delay={58}
      />
      <FlowArrow x={1160} y={400} delay={66} />
      <FlowStep
        step={4}
        label="Repeta pana vede progres"
        x={1200}
        y={380}
        delay={70}
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.probleme}
        x={120}
        y={580}
        width={1680}
        height={400}
        delay={78}
      />
      <SlideCta label={meta.ctaLabel} delay={86} />
    </SlideLayout>
  );
};
