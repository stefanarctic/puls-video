import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { smoothProgress, stagger } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";
import "./ClaseSlide.scss";

const steps = [
  "Profesorul creeaza clasa",
  "Publica teme cu termen",
  "Elevii rezolva in platforma",
  "Progresul clasei devine vizibil",
];

const highlights = ["Lucrari de curs", "Termene clare", "Colegi si profesor"];

export const ClaseSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("clase");
  const timeline = useTimelineFrame();

  return (
    <SlideLayout duration={duration}>
      <div className="clase-slide">
        <SlideHeadline
          lines={["Profesorul da directia.", "Elevii stiu ce au de facut."]}
          accentIndex={1}
          size={68}
          top={52}
          left={120}
          width={920}
        />
        <SlideSubtitle top={228} delay={22} left={120} width={860}>
          Clase, teme si termene — profesorul publica activitati din probleme,
          simulari si resurse PULS, iar elevii lucreaza in acelasi spatiu in
          care invata zilnic.
        </SlideSubtitle>
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.claseProfesor}
          x={120}
          y={360}
          width={980}
          height={560}
          delay={32}
          caption="Fizica XII B — lucrari de curs si colegi"
          lightOverlay
          objectFit="cover"
          objectPosition="top center"
          screenshotClassName="clase-slide__screenshot"
        />
        <div className="clase-slide__side">
          <div className="clase-slide__steps">
            {steps.map((step, index) => {
              const reveal = smoothProgress(timeline, 36 + stagger(index, 12), 22);

              return (
                <div key={step}>
                  <div
                    className="clase-slide__step"
                    style={{
                      opacity: reveal,
                      transform: `translateX(${(1 - reveal) * 24}px)`,
                    }}
                  >
                    <span className="clase-slide__step-index">{index + 1}</span>
                    {step}
                  </div>
                  {index < steps.length - 1 ? (
                    <div
                      className="clase-slide__arrow"
                      style={{ opacity: reveal * 0.55 }}
                    >
                      ↓
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="clase-slide__highlights">
            {highlights.map((item, index) => {
              const reveal = smoothProgress(timeline, 84 + stagger(index, 8), 20);

              return (
                <div
                  key={item}
                  className="clase-slide__highlight"
                  style={{
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 12}px)`,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={96} />
      </div>
    </SlideLayout>
  );
};
