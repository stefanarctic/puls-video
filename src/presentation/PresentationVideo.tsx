import { useEffect, useMemo } from "react";
import { getMountedSegmentIndices } from "./slideRegistry";
import { LazyPresentationComposition } from "./LazyPresentationComposition";
import {
  ensureSlideReady,
  prefetchNextSlide,
  prefetchSlideByKey,
} from "./prefetchSlideAssets";
import type { PresentationPhase } from "./usePresentationPlayer";

export type PresentationVideoProps = {
  activeSegmentIndex: number;
  phase: PresentationPhase;
  _ambientTick?: number;
};

export const PresentationVideo = ({
  activeSegmentIndex,
  phase,
  _ambientTick,
}: PresentationVideoProps) => {
  void _ambientTick;

  const mountedSegmentIndices = useMemo(
    () => getMountedSegmentIndices(activeSegmentIndex, phase),
    [activeSegmentIndex, phase],
  );

  useEffect(() => {
    void ensureSlideReady(activeSegmentIndex);
  }, [activeSegmentIndex]);

  useEffect(() => {
    prefetchNextSlide(activeSegmentIndex);
  }, [activeSegmentIndex]);

  useEffect(() => {
    prefetchSlideByKey("splash");
  }, []);

  return (
    <LazyPresentationComposition
      mountedSegmentIndices={mountedSegmentIndices}
    />
  );
};
