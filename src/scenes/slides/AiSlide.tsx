import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { smoothProgress, stagger } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";

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
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 420,
          width: 1680,
          height: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        {steps.map((step, index) => {
          const reveal = smoothProgress(timeline, 36 + stagger(index, 16), 24);

          return (
            <div key={step} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 280,
                  padding: "28px 24px",
                  borderRadius: 24,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(24,244,255,0.18)",
                  fontFamily: FONT_FAMILY,
                  fontSize: 22,
                  fontWeight: 680,
                  color: COLORS.white,
                  lineHeight: 1.3,
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 32}px)`,
                }}
              >
                {step}
              </div>
              {index < steps.length - 1 ? (
                <div
                  style={{
                    margin: "0 16px",
                    fontSize: 32,
                    color: COLORS.cyan,
                    opacity: reveal * 0.6,
                  }}
                >
                  →
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 720,
          width: 780,
          padding: "32px 36px",
          borderRadius: 28,
          background:
            "linear-gradient(160deg, rgba(24,244,255,0.12), rgba(255,255,255,0.04))",
          border: "1px solid rgba(24,244,255,0.2)",
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          color: COLORS.muted,
          lineHeight: 1.5,
          opacity: smoothProgress(timeline, 90, 24),
        }}
      >
        „AI-ul devine valoros cand nu da doar raspunsul, ci il ajuta pe elev sa
        vada unde a gresit si cum gandeste fizic problema."
      </div>
      <SlideCta label={meta.ctaLabel} delay={96} />
    </SlideLayout>
  );
};
