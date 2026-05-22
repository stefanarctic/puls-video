import { AbsoluteFill, Img, staticFile } from "remotion";
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
import { getSlideMeta } from "../../presentation/slideData";
import { useTimelineFrame } from "../../utils/ambientMotion";

export const OpeningSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("opening");
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, 20, 28);

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["Fizica nu se memoreaza.", "Fizica se vede."]}
        accentIndex={1}
        size={80}
      />
      <SlideSubtitle top={280} delay={28}>
        PULS transforma pregatirea la fizica din teorie pasiva in experienta
        interactiva. Pentru BAC. Pentru clasa. Pentru elevii care vor sa
        inteleaga, nu doar sa retina.
      </SlideSubtitle>
      <SplitPanel
        left={
          <AbsoluteFill>
            <FormulaStorm />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                fontWeight: 700,
                color: "rgba(136,169,200,0.5)",
                letterSpacing: "-0.03em",
              }}
            >
              Formule statice
            </div>
          </AbsoluteFill>
        }
        right={
          <Img
            src={staticFile(PRESENTATION_ASSETS.pendul)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: reveal,
            }}
          />
        }
      />
      <SlideCta label={meta.ctaLabel} delay={50} />
    </SlideLayout>
  );
};
