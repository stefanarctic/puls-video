import { BookOpen, Clock, Unlink } from "lucide-react";
import {
  BlockCard,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { COLORS } from "../../constants";
import { getSlideMeta } from "../../presentation/slideData";
import "./ProblemSlide.scss";

const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="problem-slide__icon-wrap">{children}</div>
);

const LEFT_X = 100;
const CARD_WIDTH = 420;
const CARD_HEIGHT = 168;
const CARD_GAP = 14;
const PANEL_X = LEFT_X + CARD_WIDTH + 48;
const PANEL_WIDTH = 1920 - PANEL_X - 100;
const PANEL_HEIGHT = CARD_HEIGHT * 3 + CARD_GAP * 2 + 48;

const PROBLEM_SLIDE_LAYOUT = {
  headlineTop: 30,
  subtitleTop: 185,
  cardsTop: 320,
  screenshotTop: 320,
  screenshotDelay: 72,
  screenshotCaptionDelay: 90,
} as const;

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
      <div className="problem-slide">
        <SlideHeadline
          lines={["Elevii invata pentru examene,", "dar rareori simt fizica."]}
          accentIndex={1}
          size={68}
          top={PROBLEM_SLIDE_LAYOUT.headlineTop}
        />
        <SlideSubtitle top={PROBLEM_SLIDE_LAYOUT.subtitleTop} delay={24}>
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
              y={
                PROBLEM_SLIDE_LAYOUT.cardsTop +
                index * (CARD_HEIGHT + CARD_GAP)
              }
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              delay={card.delay}
              icon={
                <IconWrap>
                  <Icon size={20} color={COLORS.cyan} />
                </IconWrap>
              }
            />
          );
        })}
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.equationsBlackboard}
          x={PANEL_X}
          y={PROBLEM_SLIDE_LAYOUT.screenshotTop}
          width={PANEL_WIDTH}
          height={PANEL_HEIGHT}
          delay={PROBLEM_SLIDE_LAYOUT.screenshotDelay}
          caption="Formule memorate — fara intuitie vizuala"
          captionDelay={PROBLEM_SLIDE_LAYOUT.screenshotCaptionDelay}
          screenshotClassName="problem-slide__screenshot-frame"
          objectFit="cover"
          objectPosition="center"
        />
        <SlideCta label={meta.ctaLabel} delay={80} />
      </div>
    </SlideLayout>
  );
};
