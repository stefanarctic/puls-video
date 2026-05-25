import { BookOpen, Clock, FileText, Unlink } from "lucide-react";
import {
  BlockCard,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { COLORS, FONT_FAMILY } from "../../constants";
import { getSlideMeta } from "../../presentation/slideData";

const BAC_VARIANT_ROWS = [
  { variant: "BAC 2024", subject: "Subiect II — Mecanica oscilatorie" },
  { variant: "BAC 2023", subject: "Subiect III — Unde mecanice" },
  { variant: "Simulare 2023", subject: "Subiect II — Termodinamica" },
  { variant: "Model 2022", subject: "Subiect III — Optica geometrica" },
  { variant: "BAC 2022", subject: "Subiect II — Curent continuu" },
  { variant: "BAC 2021", subject: "Subiect III — Lissajous si unde" },
] as const;

const StatusQuoPrepPanel = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      background: "#f4f4f2",
      fontFamily: FONT_FAMILY,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 22px",
        background: "#e8e8e4",
        borderBottom: "1px solid #d4d4ce",
      }}
    >
      <FileText size={18} color="#6b7280" strokeWidth={2} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#374151",
            letterSpacing: "-0.01em",
          }}
        >
          Variante BAC — Fizica
        </div>
        <div style={{ marginTop: 2, fontSize: 12, color: "#9ca3af" }}>
          Culegere digitala / PDF
        </div>
      </div>
      <div
        style={{
          padding: "6px 10px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 650,
          color: "#6b7280",
          background: "#fafaf8",
          border: "1px solid #d4d4ce",
        }}
      >
        24 variante
      </div>
    </div>

    <div style={{ flex: 1, overflow: "hidden", padding: "10px 18px 14px" }}>
      {BAC_VARIANT_ROWS.map((row, index) => (
        <div
          key={row.variant}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "11px 12px",
            borderRadius: 8,
            background: index % 2 === 0 ? "#fafaf8" : "transparent",
            border: "1px solid #eceae4",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              border: "1.5px solid #c4c4bc",
              background: "#fff",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#374151",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.variant}
            </div>
            <div
              style={{
                marginTop: 1,
                fontSize: 12,
                color: "#9ca3af",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.subject}
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#b8b8b0",
              whiteSpace: "nowrap",
            }}
          >
            fara verificare
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        padding: "10px 22px",
        borderTop: "1px solid #d4d4ce",
        background: "#eceae4",
        fontSize: 12,
        fontWeight: 600,
        color: "#9ca3af",
        textAlign: "center",
      }}
    >
      Raspunsuri disponibile manual — feedback dupa corectare la profesor
    </div>
  </div>
);

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: 48,
      height: 48,
      borderRadius: 14,
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

const LEFT_X = 100;
const CARD_WIDTH = 520;
const CARD_HEIGHT = 216;
const CARD_GAP = 18;
const CONTENT_TOP = 352;
const PANEL_X = LEFT_X + CARD_WIDTH + 48;
const PANEL_WIDTH = 1920 - PANEL_X - 100;
const PANEL_HEIGHT = CARD_HEIGHT * 3 + CARD_GAP * 2 + 48;

const PROBLEM_CARDS = [
  {
    label: "Formule fara intuitie",
    sublabel: "Formule memorate, fara intuitie vizuala",
    delay: 40,
    icon: BookOpen,
  },
  {
    label: "Probleme fara feedback rapid",
    sublabel: "Rezolvare fara confirmare imediata",
    delay: 52,
    icon: Clock,
  },
  {
    label: "Lectii fara legatura cu lumea reala",
    sublabel: "Teorie decuplata de experiment",
    delay: 64,
    icon: Unlink,
  },
] as const;

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
      {PROBLEM_CARDS.map((card, index) => {
        const Icon = card.icon;

        return (
          <BlockCard
            key={card.label}
            label={card.label}
            sublabel={card.sublabel}
            x={LEFT_X}
            y={CONTENT_TOP + index * (CARD_HEIGHT + CARD_GAP)}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            delay={card.delay}
            icon={
              <IconWrap>
                <Icon size={24} color={COLORS.cyan} />
              </IconWrap>
            }
          />
        );
      })}
      <ScreenshotFrame
        x={PANEL_X}
        y={CONTENT_TOP}
        width={PANEL_WIDTH}
        height={PANEL_HEIGHT}
        delay={72}
        caption="Pregatire repetitiva — fara feedback imediat"
        screenshotStyle={{
          background: "#f4f4f2",
          border: "1px solid rgba(136,169,200,0.28)",
          boxShadow: "0 18px 48px rgba(0,0,0,0.35)",
        }}
      >
        <StatusQuoPrepPanel />
      </ScreenshotFrame>
      <SlideCta label={meta.ctaLabel} delay={80} />
    </SlideLayout>
  );
};
