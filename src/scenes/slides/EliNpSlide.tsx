import { PRESENTATION_ASSETS } from "../../assets";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS } from "../../constants";
import { useLoopFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";
import "./EliNpSlide.scss";

export const EliNpSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("elinp");
  const loop = useLoopFrame();

  return (
    <SlideLayout duration={duration} intensity={1}>
      <SlideHeadline
        lines={["ELI-NP: cand liceenii", "ating cercetarea de frontiera."]}
        accentIndex={1}
        size={64}
      />
      <SlideSubtitle top={260} delay={22} width={820}>
        Colaborarea cu Magurele traduce lasere ultra-puternice, interactie
        laser-materie si accelerare laser-plasma in experiente accesibile
        elevilor.
      </SlideSubtitle>
      <div className="elinp-slide__laser-stage">
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index / 8) * Math.PI * 2 + loop * 0.02;
          return (
            <div
              key={index}
              className="elinp-slide__beam"
              style={{
                left: 280 + Math.cos(angle) * (120 + index * 12),
                top: 240 + Math.sin(angle) * (80 + index * 8),
                background: `linear-gradient(180deg, ${COLORS.cyan}, transparent)`,
                transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
                opacity: 0.5 + index * 0.06,
              }}
            />
          );
        })}
        <div
          className="elinp-slide__core"
          style={{
            background: `radial-gradient(circle, white, ${COLORS.cyan}, transparent 70%)`,
          }}
        />
        <div className="elinp-slide__label">
          10 PW · Extreme Light Infrastructure
        </div>
      </div>
      <SlideScreenshot
        src={PRESENTATION_ASSETS.eliNp}
        x={720}
        y={380}
        width={560}
        height={480}
        delay={40}
        objectFit="cover"
        objectPosition="top center"
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.laser}
        x={1320}
        y={380}
        width={480}
        height={230}
        delay={54}
        objectFit="cover"
        objectPosition="top center"
      />
      <SlideScreenshot
        src={PRESENTATION_ASSETS.accelerator}
        x={1320}
        y={630}
        width={480}
        height={230}
        delay={66}
        objectFit="cover"
        objectPosition="top center"
      />
      <SlideCta label={meta.ctaLabel} delay={78} />
    </SlideLayout>
  );
};
