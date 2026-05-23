import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
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
      <div
        style={{
          position: "absolute",
          left: 1060,
          top: 360,
          width: 740,
        }}
      >
        {steps.map((step, index) => {
          const reveal = smoothProgress(timeline, 36 + stagger(index, 14), 24);

          return (
            <div key={step}>
              <div
                style={{
                  padding: "20px 24px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(24,244,255,0.18)",
                  fontFamily: FONT_FAMILY,
                  fontSize: 22,
                  fontWeight: 680,
                  color: COLORS.white,
                  lineHeight: 1.3,
                  opacity: reveal,
                  transform: `translateX(${(1 - reveal) * 24}px)`,
                }}
              >
                {step}
              </div>
              {index < steps.length - 1 ? (
                <div
                  style={{
                    padding: "8px 0 8px 28px",
                    fontSize: 24,
                    color: COLORS.cyan,
                    opacity: reveal * 0.55,
                  }}
                >
                  ↓
                </div>
              ) : null}
            </div>
          );
        })}
        <div
          style={{
            marginTop: 24,
            padding: "28px 32px",
            borderRadius: 24,
            background:
              "linear-gradient(160deg, rgba(24,244,255,0.12), rgba(255,255,255,0.04))",
            border: "1px solid rgba(24,244,255,0.2)",
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            color: COLORS.muted,
            lineHeight: 1.5,
            opacity: smoothProgress(timeline, 88, 24),
          }}
        >
          „AI-ul devine valoros cand nu da doar raspunsul, ci il ajuta pe elev sa
          vada unde a gresit si cum gandeste fizic problema."
        </div>
      </div>
      <SlideCta label={meta.ctaLabel} delay={96} />
    </SlideLayout>
  );
};
