import {
  FlowArrow,
  FlowStep,
  ScreenshotFrame,
  SlideCta,
  SlideHeadline,
  SlideLayout,
  SlideSubtitle,
} from "../../components/SlideChrome";
import { PRESENTATION_ASSETS } from "../../assets";
import { getSlideMeta } from "../../presentation/slideData";
import "./BacSlide.scss";

const TEXT_LEFT = 120;
const HEADLINE_TOP = 52;
const SUBTITLE_TOP = 212;
const FLOW_Y = 300;
const STEP_WIDTH = 220;
const STEP_GAP = 32;
const FLOW_START = TEXT_LEFT;
const FLOW_BADGE_SIZE = 52;
const ARROW_WIDTH = 36;

const SCREENSHOT_CAPTION_HEIGHT = 36;
const SCREENSHOT_ASPECT = 2; // 1024x512
const FEEDBACK_ASPECT = 830 / 844;
const PANEL_Y = 430;
const PANEL_HEIGHT = 480;
const SCREENSHOT_IMAGE_HEIGHT = PANEL_HEIGHT - SCREENSHOT_CAPTION_HEIGHT;
const LEFT_PANEL_WIDTH = SCREENSHOT_IMAGE_HEIGHT * SCREENSHOT_ASPECT;
const RIGHT_PANEL_MARGIN = 80;
const RIGHT_PANEL_IMAGE_HEIGHT = 545;
const RIGHT_PANEL_WIDTH = Math.round(RIGHT_PANEL_IMAGE_HEIGHT * FEEDBACK_ASPECT);
const RIGHT_PANEL_HEIGHT = RIGHT_PANEL_IMAGE_HEIGHT + SCREENSHOT_CAPTION_HEIGHT;
const RIGHT_PANEL_X = 1920 - RIGHT_PANEL_MARGIN - RIGHT_PANEL_WIDTH;
const RIGHT_PANEL_Y =
  PANEL_Y + PANEL_HEIGHT - RIGHT_PANEL_HEIGHT - 40;

const stepX = (index: number) => FLOW_START + index * (STEP_WIDTH + STEP_GAP);
const badgeCenterX = (index: number) => stepX(index) + FLOW_BADGE_SIZE / 2;
const arrowX = (index: number) => {
  const center = (badgeCenterX(index) + badgeCenterX(index + 1)) / 2;
  return center - ARROW_WIDTH / 2;
};

export const BacSlide = ({ duration }: { duration: number }) => {
  const meta = getSlideMeta("bac");

  const steps = [
    { step: 1, label: "Alege capitolul", delay: 34 },
    { step: 2, label: "Rezolva problema", delay: 46 },
    { step: 3, label: "Primeste feedback", delay: 58 },
    { step: 4, label: "Repeta pana vezi progres", delay: 70 },
  ];

  return (
    <SlideLayout duration={duration}>
      <div className="bac-slide">
        <SlideHeadline
          lines={["De la exercitiu", "la intelegere."]}
          accentIndex={1}
          size={76}
          top={HEADLINE_TOP}
          left={TEXT_LEFT}
        />
        <SlideSubtitle top={SUBTITLE_TOP} delay={22} left={TEXT_LEFT}>
          PULS acopera nevoia practica a elevilor prin probleme BAC, grile,
          rezolvari si urmarirea progresului.
        </SlideSubtitle>
        {steps.map((item, index) => (
          <FlowStep
            key={item.step}
            step={item.step}
            label={item.label}
            x={stepX(index)}
            y={FLOW_Y}
            width={STEP_WIDTH}
            delay={item.delay}
          />
        ))}
        {steps.slice(0, -1).map((item, index) => (
          <FlowArrow
            key={item.step}
            x={arrowX(index)}
            stepY={FLOW_Y}
            delay={item.delay + 8}
          />
        ))}
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.problemeOscilatori}
          x={TEXT_LEFT}
          y={PANEL_Y}
          width={LEFT_PANEL_WIDTH}
          height={PANEL_HEIGHT}
          delay={78}
          caption="Oscilatori liniari armonici — BAC"
          objectFit="contain"
          objectPosition="top center"
          screenshotClassName="bac-slide__main-shot"
        />
        <ScreenshotFrame
          src={PRESENTATION_ASSETS.feedbackProblema}
          x={RIGHT_PANEL_X}
          y={RIGHT_PANEL_Y}
          width={RIGHT_PANEL_WIDTH}
          height={RIGHT_PANEL_HEIGHT}
          delay={84}
          caption="Feedback — 8/10 puncte"
          objectFit="contain"
          objectPosition="top center"
          screenshotClassName="bac-slide__feedback-shot"
        />
        <SlideCta label={meta.ctaLabel} url={meta.ctaUrl} delay={86} />
      </div>
    </SlideLayout>
  );
};
