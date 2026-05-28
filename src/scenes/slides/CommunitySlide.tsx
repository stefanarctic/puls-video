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
import { useTimelineFrame } from "../../utils/ambientMotion";
import { cinematicEase } from "../../utils/animation";
import { getSlideMeta } from "../../presentation/slideData";
import "./CommunitySlide.scss";

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
        className="community-slide__dashboard"
        style={{ opacity: panelReveal }}
      >
        <div className="community-slide__dashboard-label">
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
        <div className="community-slide__badges">
          {badges.map((badge, index) => {
            const reveal = smoothProgress(timeline, 60 + index * 8, 20);
            return (
              <div
                key={badge}
                className="community-slide__badge"
                style={{
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
      <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={72} />
    </SlideLayout>
  );
};
