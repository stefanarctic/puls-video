import { BookOpen, Clock, Unlink } from "lucide-react";
import { PRESENTATION_ASSETS } from "../../assets";
import {
  BlockCard,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
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
        sublabel="Formule memorate, fara intuitie vizuala"
        x={120}
        y={400}
        width={520}
        height={240}
        delay={40}
        icon={
          <IconWrap>
            <BookOpen size={28} color={COLORS.cyan} />
          </IconWrap>
        }
      />
      <BlockCard
        label="Probleme fara feedback rapid"
        sublabel="Rezolvare fara confirmare imediata"
        x={700}
        y={400}
        width={520}
        height={240}
        delay={52}
        icon={
          <IconWrap>
            <Clock size={28} color={COLORS.cyan} />
          </IconWrap>
        }
      />
      <BlockCard
        label="Lectii fara legatura cu lumea reala"
        sublabel="Teorie decuplata de experiment"
        x={1280}
        y={400}
        width={520}
        height={240}
        delay={64}
        icon={
          <IconWrap>
            <Unlink size={28} color={COLORS.cyan} />
          </IconWrap>
        }
      />
      <ScreenshotFrame
        src={PRESENTATION_ASSETS.probleme}
        x={260}
        y={668}
        width={1400}
        height={300}
        delay={72}
        caption="Problema BAC — Unde mecanice si figura Lissajous"
        lightOverlay
        objectFit="cover"
        objectPosition="top center"
        imageScale={1.08}
      />
      <SlideCta label={meta.ctaLabel} delay={80} />
    </SlideLayout>
  );
};
