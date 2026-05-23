import { BookOpen } from "lucide-react";
import { Img, staticFile } from "remotion";
import { PRESENTATION_ASSETS } from "../../assets";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
  SplitPanel,
  smoothProgress,
} from "../../components/SlideChrome";
import { FormulaStorm } from "../../components/PhysicsVisuals";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";

export const OpeningSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("opening");
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, 28, 28);

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["Fizica nu se memoreaza.", "Fizica se vede."]}
        accentIndex={1}
        size={80}
      />
      <SlideSubtitle top={280} width={1100} delay={28}>
        PULS transforma pregatirea la fizica din teorie pasiva in experienta
        interactiva. Pentru BAC. Pentru clasa. Pentru elevii care vor sa
        inteleaga, nu doar sa retina.
      </SlideSubtitle>
      <SplitPanel
        leftBadge="Teorie pasiva"
        rightBadge="Simulare live"
        left={
          <>
            <FormulaStorm />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(2,4,11,0.15), rgba(2,4,11,0.55))",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 72,
                left: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(136,169,200,0.2)",
              }}
            >
              <BookOpen size={20} color={COLORS.muted} />
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: COLORS.muted,
                }}
              >
                Manual / formule
              </span>
            </div>
          </>
        }
        right={
          <Img
            src={staticFile(PRESENTATION_ASSETS.pendul)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: reveal,
            }}
          />
        }
      />
      <SlideCta label={meta.ctaLabel} delay={50} />
    </SlideLayout>
  );
};
