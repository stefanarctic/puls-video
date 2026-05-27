import { BookOpen, FlaskConical, LayoutGrid } from "lucide-react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { PRESENTATION_ASSETS } from "../../assets";
import { SlideLayout, smoothProgress } from "../../components/SlideChrome";
import { COLORS } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";
import "./OpeningSlide.scss";

const STAT_PILLS = [
  { icon: LayoutGrid, label: "Platforma completa PULS" },
  { icon: FlaskConical, label: "40+ simulari interactive" },
  { icon: BookOpen, label: "Resurse teoretice pe capitole" },
] as const;

const GAP_HEADER_PANELS = 56;
const GAP_PANELS_CTA = 52;

const PanelBadgeInline = ({
  label,
  accent = false,
}: {
  label: string;
  accent?: boolean;
}) => (
  <div
    className={`panel-badge-inline${accent ? " panel-badge-inline--accent" : ""}`}
  >
    {label}
  </div>
);

const ScreenshotPanel = ({
  src,
  badge,
  accent = false,
  title,
  subtitle,
}: {
  src: string;
  badge: string;
  accent?: boolean;
  title: string;
  subtitle: string;
}) => (
  <div
    className={`screenshot-panel${accent ? " screenshot-panel--accent" : ""}`}
  >
    <div className="screenshot-panel__badge-wrap">
      <PanelBadgeInline label={badge} accent={accent} />
    </div>

    <div className="screenshot-panel__image-wrap">
      <Img src={staticFile(src)} className="screenshot-panel__image" />
    </div>

    <div
      className={`screenshot-panel__footer${accent ? " screenshot-panel__footer--accent" : ""}`}
    >
      <div className="screenshot-panel__title">{title}</div>
      <div className="screenshot-panel__subtitle">{subtitle}</div>
    </div>
  </div>
);

export const OpeningSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("opening");
  const timeline = useTimelineFrame();
  const panelReveal = smoothProgress(timeline, 32, 28);
  const ctaReveal = smoothProgress(timeline, 48, 24);
  const subtitleReveal = smoothProgress(timeline, 24, 24);

  return (
    <SlideLayout duration={duration}>
      <AbsoluteFill className="opening-slide">
        <header className="opening-slide__header">
          <div>
            {["Fizica nu se memoreaza.", "Fizica se vede."].map((line, index) => {
              const reveal = smoothProgress(timeline, 10 + index * 8, 22);
              const isAccent = index === 1;

              return (
                <div
                  key={line}
                  className={`opening-slide__headline-line${isAccent ? " opening-slide__headline-line--accent" : ""}`}
                  style={{
                    marginTop: index === 0 ? 0 : 6,
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 20}px)`,
                  }}
                >
                  {line}
                </div>
              );
            })}

            <p
              className="opening-slide__subtitle"
              style={{ opacity: subtitleReveal }}
            >
              De la pagina principala la resurse detaliate — simulari, probleme
              si teorie intr-o singura platforma.
            </p>

            <div className="opening-slide__pills">
              {STAT_PILLS.map(({ icon: Icon, label }, index) => {
                const reveal = smoothProgress(timeline, 36 + index * 5, 18);

                return (
                  <div
                    key={label}
                    className="opening-slide__pill"
                    style={{ opacity: reveal }}
                  >
                    <Icon size={18} color={COLORS.cyan} strokeWidth={2} />
                    <span className="opening-slide__pill-label">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div
          className="opening-slide__panels"
          style={{
            marginTop: GAP_HEADER_PANELS,
            opacity: panelReveal,
            transform: `translateY(${(1 - panelReveal) * 16}px)`,
          }}
        >
          <ScreenshotPanel
            src={PRESENTATION_ASSETS.landing}
            badge="Landing page"
            title="Descopera fizica prin simulari"
            subtitle="Platforma PULS — exercitii, simulari si resurse"
          />
          <ScreenshotPanel
            src={PRESENTATION_ASSETS.resurseMecanica}
            badge="Resurse didactice"
            accent
            title="Mecanica — Miscari oscilatorii"
            subtitle="Lectii, explicatii si simulari pe acelasi capitol"
          />
        </div>

        <div
          className="opening-slide__spacer"
          style={{ minHeight: GAP_PANELS_CTA }}
        />

        <footer className="opening-slide__footer">
          <div
            className="opening-slide__cta"
            style={{
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 ${ctaReveal * 24}px rgba(24,244,255,0.28)`,
              opacity: ctaReveal,
              transform: `translateY(${(1 - ctaReveal) * 12}px)`,
            }}
          >
            {meta.ctaLabel}
          </div>
        </footer>
      </AbsoluteFill>
    </SlideLayout>
  );
};
