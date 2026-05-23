import { interpolate } from "remotion";
import { PRESENTATION_ASSETS } from "../../assets";
import {
  InlineProgressBar,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
  smoothProgress,
} from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { cinematicEase } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";

const badges = ["Streak 7 zile", "Vector Master", "Top 4%", "Nivel 12"];

export const CommunitySlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("community");
  const timeline = useTimelineFrame();
  const panelReveal = smoothProgress(timeline, 40, 28);

  return (
    <SlideLayout duration={duration}>
      <SlideHeadline
        lines={["Invatarea devine", "un sistem."]}
        accentIndex={1}
        size={76}
      />
      <SlideSubtitle top={248} delay={22}>
        Profil, progres, realizari, comunitate si clase pentru profesori —
        retentie si utilizare in scoala.
      </SlideSubtitle>
      <ScreenshotFrame
        src={PRESENTATION_ASSETS.landing}
        x={120}
        y={360}
        width={820}
        height={520}
        delay={32}
        caption="Platforma PULS — elev"
        lightOverlay
        objectFit="cover"
        objectPosition="top center"
      />
      <div
        style={{
          position: "absolute",
          left: 980,
          top: 360,
          width: 820,
          height: 520,
          borderRadius: 28,
          padding: "40px 48px",
          boxSizing: "border-box",
          background:
            "linear-gradient(145deg, rgba(15,37,63,0.88), rgba(5,12,24,0.78))",
          border: "1px solid rgba(119,224,255,0.22)",
          opacity: panelReveal,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: COLORS.cyan,
            marginBottom: 28,
          }}
        >
          Dashboard profesor
        </div>
        <InlineProgressBar
          label="Clasa XII A · Mecanica"
          progress={interpolate(timeline, [50, 100], [0.2, 0.78], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: cinematicEase,
          })}
        />
        <div
          style={{
            marginTop: 36,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            flex: 1,
            alignContent: "start",
          }}
        >
          {badges.map((badge, index) => {
            const reveal = smoothProgress(timeline, 60 + index * 8, 20);
            return (
              <div
                key={badge}
                style={{
                  padding: "14px 22px",
                  borderRadius: 18,
                  fontFamily: FONT_FAMILY,
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.white,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(24,244,255,0.08))",
                  border: "1px solid rgba(24,244,255,0.2)",
                  opacity: reveal,
                  transform: `translateY(${(1 - reveal) * 16}px)`,
                }}
              >
                {badge}
              </div>
            );
          })}
        </div>
      </div>
      <SlideCta label={meta.ctaLabel} delay={72} />
    </SlideLayout>
  );
};
