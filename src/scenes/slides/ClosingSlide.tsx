import { AbsoluteFill, interpolate } from "remotion";
import { PulsLogo } from "../../components/Logo";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { cinematicEase, smoothProgress } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";
import "./ClosingSlide.scss";

const equationParts = [
  "BAC",
  "Simulari",
  "AI",
  "Cercetare romaneasca",
  "PULS",
];

export const ClosingSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("closing");
  const timeline = useTimelineFrame();
  const fade = interpolate(timeline, [duration - 30, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: cinematicEase,
  });

  return (
    <SlideLayout duration={duration} particles={false} intensity={0.75}>
      <AbsoluteFill style={{ opacity: fade }}>
        <SlideHeadline
          lines={["De ce PULS poate fi", "urmatorul pas in educatie."]}
          accentIndex={1}
          size={72}
          top={72}
        />
        <div className="closing-slide__equation">
          {equationParts.map((part, index) => {
            const reveal = smoothProgress(timeline, 28 + index * 10, 22);
            const isResult = index === equationParts.length - 1;

            return (
              <div key={part} className="closing-slide__equation-row">
                {index > 0 ? (
                  <span
                    className={`closing-slide__operator ${isResult ? "closing-slide__operator--equals" : "closing-slide__operator--plus"}`}
                    style={{ opacity: reveal }}
                  >
                    {isResult ? "=" : "+"}
                  </span>
                ) : null}
                <div
                  className={`closing-slide__part${isResult ? " closing-slide__part--result" : ""}`}
                  style={{
                    opacity: reveal,
                    transform: `scale(${0.9 + reveal * 0.1})`,
                  }}
                >
                  {part}
                </div>
              </div>
            );
          })}
        </div>
        <SlideSubtitle top={520} delay={70} width={1200}>
          PULS nu pregateste doar elevi pentru un examen. PULS pregateste elevi
          sa inteleaga lumea.
        </SlideSubtitle>
        <div className="closing-slide__logo-wrap">
          <PulsLogo
            anchored={false}
            delay={50}
            size={220}
            tagline="Fizica care se vede."
          />
        </div>
        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={88} />
      </AbsoluteFill>
    </SlideLayout>
  );
};
