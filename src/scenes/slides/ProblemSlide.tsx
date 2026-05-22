import { BookOpen, Clock, Unlink } from "lucide-react";
import { PRESENTATION_ASSETS } from "../../assets";
import {
  BlockCard,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS } from "../../constants";
import { getSlideMeta } from "../../presentation/slideData";

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: 56,
      height: 56,
      borderRadius: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(24,244,255,0.12)",
      border: "1px solid rgba(24,244,255,0.28)",
    }}
  >
    {children}
  </div>
);

export const ProblemSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("problem");

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["Elevii invata pentru examene,", "dar rareori simt fizica."]}
        accentIndex={1}
        size={68}
      />
      <SlideSubtitle top={268} delay={24}>
        Pregatirea pentru BAC este adesea bazata pe exercitii repetitive,
        explicatii fragmentate si lipsa de feedback imediat.
      </SlideSubtitle>
      <BlockCard
        label="Formule fara intuitie"
        x={120}
        y={400}
        width={520}
        height={220}
        delay={40}
        icon={
          <IconWrap>
            <BookOpen size={28} color={COLORS.cyan} />
          </IconWrap>
        }
      />
      <BlockCard
        label="Probleme fara feedback rapid"
        x={700}
        y={400}
        width={520}
        height={220}
        delay={52}
        icon={
          <IconWrap>
            <Clock size={28} color={COLORS.cyan} />
          </IconWrap>
        }
      />
      <BlockCard
        label="Lectii fara legatura cu lumea reala"
        x={1280}
        y={400}
        width={520}
        height={220}
        delay={64}
        icon={
          <IconWrap>
            <Unlink size={28} color={COLORS.cyan} />
          </IconWrap>
        }
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.probleme}
        x={120}
        y={660}
        width={1680}
        height={320}
        delay={72}
      />
      <SlideCta label={meta.ctaLabel} delay={80} />
    </SlideLayout>
  );
};
