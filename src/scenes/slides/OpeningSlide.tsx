import { BookOpen, FlaskConical, LayoutGrid } from "lucide-react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { PRESENTATION_ASSETS } from "../../assets";
import { SlideLayout, smoothProgress } from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { useTimelineFrame } from "../../utils/ambientMotion";
import { getSlideMeta } from "../../presentation/slideData";

const STAT_PILLS = [
  { icon: LayoutGrid, label: "Platforma completa PULS" },
  { icon: FlaskConical, label: "40+ simulari interactive" },
  { icon: BookOpen, label: "Resurse teoretice pe capitole" },
] as const;

const MAX_IMAGE_WIDTH = 780;
const MAX_IMAGE_HEIGHT = 420;
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
    style={{
      display: "inline-flex",
      padding: "8px 14px",
      borderRadius: 10,
      fontFamily: FONT_FAMILY,
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: accent ? COLORS.cyan : COLORS.muted,
      background: accent ? "rgba(24,244,255,0.12)" : "rgba(255,255,255,0.06)",
      border: accent
        ? "1px solid rgba(24,244,255,0.35)"
        : "1px solid rgba(136,169,200,0.2)",
    }}
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
    style={{
      display: "inline-flex",
      flexDirection: "column",
      width: "fit-content",
      maxWidth: MAX_IMAGE_WIDTH + 24,
      borderRadius: 20,
      overflow: "hidden",
      border: accent
        ? "1px solid rgba(24,244,255,0.22)"
        : "1px solid rgba(136,169,200,0.15)",
      background: "rgba(255,255,255,0.03)",
      boxShadow: accent ? "0 0 32px rgba(24,244,255,0.08)" : undefined,
    }}
  >
    <div style={{ flexShrink: 0, padding: "14px 16px 10px" }}>
      <PanelBadgeInline label={badge} accent={accent} />
    </div>

    <div
      style={{
        flexShrink: 0,
        margin: "0 12px",
        borderRadius: 12,
        overflow: "hidden",
        background: COLORS.black,
        border: "1px solid rgba(255,255,255,0.06)",
        lineHeight: 0,
        width: "fit-content",
        maxWidth: MAX_IMAGE_WIDTH,
        alignSelf: "center",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          display: "block",
          width: "auto",
          height: "auto",
          maxWidth: MAX_IMAGE_WIDTH,
          maxHeight: MAX_IMAGE_HEIGHT,
        }}
      />
    </div>

    <div
      style={{
        flexShrink: 0,
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 16px",
        borderTop: accent
          ? "1px solid rgba(24,244,255,0.18)"
          : "1px solid rgba(136,169,200,0.15)",
        background: "rgba(2,4,11,0.92)",
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: COLORS.white,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 2,
          fontSize: 13,
          fontWeight: 520,
          color: COLORS.muted,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {subtitle}
      </div>
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
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "36px 80px 140px",
          boxSizing: "border-box",
          fontFamily: FONT_FAMILY,
          overflow: "hidden",
        }}
      >
        <header style={{ flexShrink: 0 }}>
          <div>
            {["Fizica nu se memoreaza.", "Fizica se vede."].map((line, index) => {
              const reveal = smoothProgress(timeline, 10 + index * 8, 22);
              const isAccent = index === 1;

              return (
                <div
                  key={line}
                  style={{
                    marginTop: index === 0 ? 0 : 6,
                    fontSize: isAccent ? 74 : 70,
                    fontWeight: 760,
                    lineHeight: 1.06,
                    letterSpacing: "-0.04em",
                    color: isAccent ? COLORS.cyan : COLORS.white,
                    textShadow: isAccent ? `0 0 28px ${COLORS.cyan}` : undefined,
                    opacity: reveal,
                    transform: `translateY(${(1 - reveal) * 20}px)`,
                  }}
                >
                  {line}
                </div>
              );
            })}

            <p
              style={{
                margin: "18px 0 0",
                maxWidth: 920,
                fontSize: 26,
                fontWeight: 520,
                lineHeight: 1.42,
                color: COLORS.muted,
                opacity: subtitleReveal,
              }}
            >
              De la pagina principala la resurse detaliate — simulari, probleme
              si teorie intr-o singura platforma.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginTop: 20,
              }}
            >
              {STAT_PILLS.map(({ icon: Icon, label }, index) => {
                const reveal = smoothProgress(timeline, 36 + index * 5, 18);

                return (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 20px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(136,169,200,0.16)",
                      opacity: reveal,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Icon size={18} color={COLORS.cyan} strokeWidth={2} />
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 650,
                        color: COLORS.muted,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        <div
          style={{
            flexShrink: 0,
            marginTop: GAP_HEADER_PANELS,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 32,
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

        <div style={{ flex: 1, minHeight: GAP_PANELS_CTA }} />

        <footer
          style={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "16px 32px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: COLORS.white,
              background: `linear-gradient(135deg, rgba(22,136,255,0.92), rgba(24,244,255,0.72))`,
              border: "1px solid rgba(24,244,255,0.55)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 ${ctaReveal * 24}px rgba(24,244,255,0.28)`,
              opacity: ctaReveal,
              transform: `translateY(${(1 - ctaReveal) * 12}px)`,
              whiteSpace: "nowrap",
            }}
          >
            {meta.ctaLabel}
          </div>
        </footer>
      </AbsoluteFill>
    </SlideLayout>
  );
};
