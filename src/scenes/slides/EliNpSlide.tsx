import { PRESENTATION_ASSETS } from "../../assets";
import {
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideScreenshot,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useLoopFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";

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
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 380,
          width: 560,
          height: 480,
          borderRadius: 28,
          overflow: "hidden",
          border: "1px solid rgba(24,244,255,0.25)",
          background:
            "radial-gradient(circle at 50% 50%, rgba(24,244,255,0.25), rgba(2,4,11,0.95))",
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index / 8) * Math.PI * 2 + loop * 0.02;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: 280 + Math.cos(angle) * (120 + index * 12),
                top: 240 + Math.sin(angle) * (80 + index * 8),
                width: 4,
                height: 180,
                background: `linear-gradient(180deg, ${COLORS.cyan}, transparent)`,
                transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
                transformOrigin: "center bottom",
                opacity: 0.5 + index * 0.06,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 120,
            height: 120,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, white, ${COLORS.cyan}, transparent 70%)`,
            boxShadow: `0 0 80px ${COLORS.cyan}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 32,
            bottom: 28,
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.cyan,
          }}
        >
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
