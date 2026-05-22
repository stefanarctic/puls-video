import { AbsoluteFill, interpolate } from "remotion";
import { PulsLogo } from "../../components/Logo";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { cinematicEase, smoothProgress } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";

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
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 320,
            width: 1680,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {equationParts.map((part, index) => {
            const reveal = smoothProgress(timeline, 28 + index * 10, 22);
            const isResult = index === equationParts.length - 1;

            return (
              <div key={part} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                {index > 0 ? (
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: isResult ? 42 : 36,
                      fontWeight: isResult ? 800 : 400,
                      color: COLORS.cyan,
                      opacity: reveal,
                    }}
                  >
                    {isResult ? "=" : "+"}
                  </span>
                ) : null}
                <div
                  style={{
                    padding: isResult ? "20px 36px" : "16px 28px",
                    borderRadius: 20,
                    fontFamily: FONT_FAMILY,
                    fontSize: isResult ? 42 : 28,
                    fontWeight: isResult ? 900 : 700,
                    color: isResult ? COLORS.cyan : COLORS.white,
                    background: isResult
                      ? "rgba(24,244,255,0.12)"
                      : "rgba(255,255,255,0.06)",
                    border: `1px solid rgba(24,244,255,${isResult ? 0.45 : 0.18})`,
                    boxShadow: isResult ? `0 0 48px rgba(24,244,255,0.25)` : undefined,
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
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 160,
            transform: "translateX(-50%)",
          }}
        >
          <PulsLogo
            anchored={false}
            delay={50}
            size={220}
            tagline="Fizica care se vede."
          />
        </div>
        <SlideCta label={meta.ctaLabel} delay={88} />
      </AbsoluteFill>
    </SlideLayout>
  );
};
