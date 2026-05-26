import { BookOpen, Clock, FileText, Unlink } from "lucide-react";
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
import "./ProblemSlide.scss";

const BAC_VARIANT_ROWS = [
  { variant: "BAC 2024", subject: "Subiect II — Mecanica oscilatorie" },
  { variant: "BAC 2023", subject: "Subiect III — Unde mecanice" },
  { variant: "Simulare 2023", subject: "Subiect II — Termodinamica" },
  { variant: "Model 2022", subject: "Subiect III — Optica geometrica" },
  { variant: "BAC 2022", subject: "Subiect II — Curent continuu" },
  { variant: "BAC 2021", subject: "Subiect III — Lissajous si unde" },
] as const;

const StatusQuoPrepPanel = () => (
  <div className="problem-slide__status-quo">
    <div className="problem-slide__status-header">
      <FileText size={18} color="#6b7280" strokeWidth={2} />
      <div className="problem-slide__status-header-text">
        <div className="problem-slide__status-title">Variante BAC — Fizica</div>
        <div className="problem-slide__status-subtitle">
          Culegere digitala / PDF
        </div>
      </div>
      <div className="problem-slide__status-count">24 variante</div>
    </div>

    <div className="problem-slide__status-list">
      {BAC_VARIANT_ROWS.map((row, index) => (
        <div
          key={row.variant}
          className={`problem-slide__status-row problem-slide__status-row--${index % 2 === 0 ? "even" : "odd"}`}
        >
          <div className="problem-slide__status-checkbox" />
          <div className="problem-slide__status-row-text">
            <div className="problem-slide__status-variant">{row.variant}</div>
            <div className="problem-slide__status-subject">{row.subject}</div>
          </div>
          <div className="problem-slide__status-tag">fara verificare</div>
        </div>
      ))}
    </div>

    <div className="problem-slide__status-footer">
      Raspunsuri disponibile manual — feedback dupa corectare la profesor
    </div>
  </div>
);

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="problem-slide__icon-wrap">{children}</div>
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
    sublabel: "Teorie uneori decuplata de experiment",
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
        screenshotClassName="problem-slide__screenshot-frame"
      >
        <StatusQuoPrepPanel />
      </ScreenshotFrame>
      <SlideCta label={meta.ctaLabel} delay={80} />
    </SlideLayout>
  );
};
