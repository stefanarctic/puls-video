import { Users, TrendingUp } from "lucide-react";
import { PRESENTATION_ASSETS } from "../../assets";
import {
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
  smoothProgress,
} from "../../components/SlideChrome";
import { COLORS } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";
import "./TractionSlide.scss";

const REGISTERED_USERS = 173;
const UNIQUE_VISITORS_30D = "1.78k";

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="traction-slide__stat-icon">{children}</div>
);

const StatCard = ({
  value,
  label,
  sublabel,
  x,
  y,
  width,
  height,
  delay,
  icon: Icon,
}: {
  value: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  icon: typeof Users;
}) => {
  const timeline = useTimelineFrame();
  const reveal = smoothProgress(timeline, delay, 24);

  return (
    <div
      className="traction-slide__stat-card"
      style={{
        left: x,
        top: y,
        width,
        height,
        opacity: reveal,
        transform: `translateX(${(1 - reveal) * 32}px)`,
      }}
    >
      <div className="traction-slide__stat-content">
        <IconWrap>
          <Icon size={22} color={COLORS.cyan} strokeWidth={2} />
        </IconWrap>
        <div className="traction-slide__stat-value">{value}</div>
        <div className="traction-slide__stat-label">{label}</div>
        <div className="traction-slide__stat-sublabel">{sublabel}</div>
      </div>
    </div>
  );
};

export const TractionSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("traction");

  return (
    <SlideLayout duration={duration}>
      <div className="traction-slide">
        <SlideHeadline
          lines={["Cum am", "ajuns aici?"]}
          accentIndex={1}
          size={76}
          top={72}
          left={120}
          width={760}
        />
        <SlideSubtitle top={248} delay={22} left={120} width={720}>
          De la primele demo-uri la sute de elevi care folosesc PULS in fiecare
          saptamana — la Presedintele Romaniei.
        </SlideSubtitle>

        <ScreenshotFrame
          src={PRESENTATION_ASSETS.nicusorDan}
          x={120}
          y={420}
          width={560}
          height={500}
          delay={32}
          caption="Nicusor Dan · Presedintele Romaniei"
          captionDelay={48}
          objectFit="cover"
          objectPosition="28% 18%"
          screenshotClassName="traction-slide__photo"
        />

        <StatCard
          value={String(REGISTERED_USERS)}
          label="Utilizatori inregistrati"
          sublabel="Conturi active pe platforma"
          x={740}
          y={340}
          width={360}
          height={248}
          delay={44}
          icon={Users}
        />
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.utilizatoriLogatiCrop}
          x={1128}
          y={340}
          width={672}
          height={248}
          delay={56}
          caption="Utilizatori logati in platforma"
          captionDelay={68}
          lightOverlay
          objectFit="cover"
          objectPosition="left 40%"
          screenshotClassName="traction-slide__screenshot traction-slide__screenshot--users"
        />

        <StatCard
          value={UNIQUE_VISITORS_30D}
          label="Vizitatori unici"
          sublabel="Ultimele 30 de zile"
          x={740}
          y={612}
          width={360}
          height={288}
          delay={58}
          icon={TrendingUp}
        />
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.vizitatori30Zile}
          x={1128}
          y={612}
          width={672}
          height={288}
          delay={70}
          caption="Trafic platforma · 27 apr — 27 mai"
          captionDelay={82}
          lightOverlay
          objectFit="cover"
          objectPosition="2% top"
          screenshotClassName="traction-slide__screenshot traction-slide__screenshot--traffic"
        />

        <SlideCta label={meta.ctaLabel} delay={88} />
      </div>
    </SlideLayout>
  );
};
