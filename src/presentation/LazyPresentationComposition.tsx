import { Suspense } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { EnergyPulseTransition, LightSweep } from "../utils/transitions";
import { SLIDES } from "./slideData";
import {
  getLazySlide,
  getSlideDuration,
  getSlideTimelineStart,
  SLIDE_TRANSITIONS,
  type TransitionSpec,
} from "./slideRegistry";

type LazyPresentationCompositionProps = {
  mountedSegmentIndices: number[];
};

const LazySlideSlot = ({
  slideKey,
  duration,
}: {
  slideKey: (typeof SLIDES)[number]["key"];
  duration: number;
}) => {
  const Slide = getLazySlide(slideKey);

  return (
    <Suspense fallback={null}>
      <Slide duration={duration} />
    </Suspense>
  );
};

const renderTransition = (transition: TransitionSpec) => {
  if (transition.type === "pulse") {
    return (
      <EnergyPulseTransition
        key={`${transition.type}-${transition.at}`}
        at={transition.at}
        duration={transition.duration}
        strength={transition.strength}
      />
    );
  }

  return (
    <LightSweep
      key={`${transition.type}-${transition.at}`}
      at={transition.at}
      duration={transition.duration}
    />
  );
};

export const LazyPresentationComposition = ({
  mountedSegmentIndices,
}: LazyPresentationCompositionProps) => {
  const mounted = new Set(mountedSegmentIndices);

  return (
    <AbsoluteFill style={{ backgroundColor: "#02040b" }}>
      {SLIDES.map((slide, index) => {
        if (!mounted.has(index)) {
          return null;
        }

        return (
          <Sequence
            key={slide.key}
            from={getSlideTimelineStart(slide.key)}
            durationInFrames={getSlideDuration(slide.key)}
          >
            <LazySlideSlot slideKey={slide.key} duration={getSlideDuration(slide.key)} />
          </Sequence>
        );
      })}

      {SLIDE_TRANSITIONS.filter((transition) =>
        mounted.has(transition.targetIndex),
      ).map(renderTransition)}
    </AbsoluteFill>
  );
};
