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
import "./AiSlide.scss";

const steps = [
  "Elev trimite solutia",
  "AI analizeaza greselile",
  "Elev primeste feedback",
  "Elev reface si progreseaza",
];

export const AiSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("ai");
  const timeline = useTimelineFrame();

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={[
          "Profesorul digital care nu inlocuieste",
          "profesorul, ci il amplifica.",
        ]}
        accentIndex={1}
        size={58}
      />
      <SlideSubtitle top={280} delay={22} width={900}>
        AI pentru explicatii, analiza de solutii si ghidare personalizata —
        accent pe invatare, nu pe copierea raspunsurilor.
      </SlideSubtitle>
      <ScreenshotFrame
        src={PRESENTATION_ASSETS.asistent}
        x={120}
        y={360}
        width={900}
        height={520}
        delay={32}
        caption="Profesorul Whiz — asistent PULS"
        lightOverlay
        objectFit="cover"
        objectPosition="top left"
      />
      <div className="ai-slide__steps">
        {steps.map((step, index) => {
          const reveal = smoothProgress(timeline, 36 + stagger(index, 14), 24);

          return (
            <div key={step}>
              <div
                className="ai-slide__step"
                style={{
                  opacity: reveal,
                  transform: `translateX(${(1 - reveal) * 24}px)`,
                }}
              >
                {step}
              </div>
              {index < steps.length - 1 ? (
                <div
                  className="ai-slide__arrow"
                  style={{ opacity: reveal * 0.55 }}
                >
                  ↓
                </div>
              ) : null}
            </div>
          );
        })}
        <div
          className="ai-slide__quote"
          style={{ opacity: smoothProgress(timeline, 88, 24) }}
        >
          „AI-ul devine valoros cand nu da doar raspunsul, ci il ajuta pe elev sa
          vada unde a gresit si cum gandeste fizic problema."
        </div>
      </div>
      <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={96} />
    </SlideLayout>
  );
};
