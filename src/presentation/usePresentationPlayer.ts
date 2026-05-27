import type { PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useRef, useState } from "react";
import { ensureSlideReady } from "./prefetchSlideAssets";
import { PRESENTATION_SEGMENTS } from "./presentationSegments";
import {
  getInitialSlideIndex,
  pathToSlideIndex,
  syncSlideRoute,
} from "./slideRoutes";

export type PresentationPhase = "idle" | "playing";

const waitForPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

const seekToFrame = (player: PlayerRef, frame: number) => {
  if (player.getCurrentFrame() === frame) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const timeout = window.setTimeout(() => {
      player.removeEventListener("seeked", onSeeked);
      resolve();
    }, 500);

    const onSeeked = (event: { detail: { frame: number } }) => {
      if (event.detail.frame !== frame) {
        return;
      }

      window.clearTimeout(timeout);
      player.removeEventListener("seeked", onSeeked);
      resolve();
    };

    player.addEventListener("seeked", onSeeked);
    player.seekTo(frame);
  });
};

export const usePresentationPlayer = (
  playerRef: React.RefObject<PlayerRef | null>,
  playerReady: boolean,
) => {
  const [currentIndex, setCurrentIndex] = useState(getInitialSlideIndex);
  const [phase, setPhase] = useState<PresentationPhase>("idle");
  const hasStartedRef = useRef(false);
  const playGenerationRef = useRef(0);
  const segmentStartFrameRef = useRef(0);
  const currentIndexRef = useRef(currentIndex);
  const phaseRef = useRef(phase);

  currentIndexRef.current = currentIndex;
  phaseRef.current = phase;

  const playSegment = useCallback(
    async (index: number) => {
      const generation = ++playGenerationRef.current;
      const player = playerRef.current;
      const segment = PRESENTATION_SEGMENTS[index];
      if (!player || !segment) {
        return;
      }

      try {
        await ensureSlideReady(index);
      } catch {
        // Continue even if prefetch fails so navigation is not blocked.
      }

      if (generation !== playGenerationRef.current) {
        return;
      }

      await waitForPaint();

      if (generation !== playGenerationRef.current) {
        return;
      }

      segmentStartFrameRef.current = segment.playFrom;
      player.pause();
      await seekToFrame(player, segment.playFrom);

      if (generation !== playGenerationRef.current) {
        return;
      }

      setPhase("playing");
      player.play();
    },
    [playerRef],
  );

  const holdSegment = useCallback(
    (index: number) => {
      const player = playerRef.current;
      const segment = PRESENTATION_SEGMENTS[index];
      if (!player || !segment) {
        return;
      }

      player.pause();
      player.seekTo(segment.holdAt);
      setPhase("idle");
    },
    [playerRef],
  );

  const navigateToSegment = useCallback(
    (
      index: number,
      options: { updateRoute?: boolean; routeMode?: "push" | "replace" } = {},
    ) => {
      if (index < 0 || index >= PRESENTATION_SEGMENTS.length) {
        return;
      }

      const { updateRoute = true, routeMode = "push" } = options;
      const previousIndex = currentIndexRef.current;
      const previousPhase = phaseRef.current;
      setCurrentIndex(index);

      if (updateRoute) {
        syncSlideRoute(index, routeMode);
      }

      if (index === previousIndex && previousPhase === "idle") {
        void playSegment(index);
        return;
      }

      if (index > previousIndex) {
        void playSegment(index);
        return;
      }

      holdSegment(index);
    },
    [holdSegment, playSegment],
  );

  const goNext = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1;
    if (nextIndex >= PRESENTATION_SEGMENTS.length) {
      return;
    }

    navigateToSegment(nextIndex);
  }, [navigateToSegment]);

  const goPrevious = useCallback(() => {
    const previousIndex = currentIndexRef.current - 1;
    if (previousIndex < 0) {
      return;
    }

    navigateToSegment(previousIndex);
  }, [navigateToSegment]);

  const goToSegment = useCallback(
    (index: number) => {
      navigateToSegment(index);
    },
    [navigateToSegment],
  );

  useEffect(() => {
    if (!playerReady || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    const initialIndex = getInitialSlideIndex();
    syncSlideRoute(initialIndex, "replace");
    void playSegment(initialIndex);

    return () => {
      playGenerationRef.current += 1;
    };
  }, [playerReady, playSegment]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || !playerRef.current) {
        return;
      }

      playGenerationRef.current += 1;
      const restoredIndex = getInitialSlideIndex();
      setCurrentIndex(restoredIndex);
      setPhase("idle");
      hasStartedRef.current = true;
      syncSlideRoute(restoredIndex, "replace");
      void playSegment(restoredIndex);
    };

    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [playSegment, playerRef]);

  useEffect(() => {
    if (!playerReady) {
      return;
    }

    const player = playerRef.current;
    if (!player) {
      return;
    }

    const onFrameUpdate = (event: { detail: { frame: number } }) => {
      if (phaseRef.current !== "playing") {
        return;
      }

      if (event.detail.frame < segmentStartFrameRef.current) {
        return;
      }

      const segment = PRESENTATION_SEGMENTS[currentIndexRef.current];
      if (!segment) {
        return;
      }

      if (event.detail.frame >= segment.holdAt) {
        holdSegment(currentIndexRef.current);
      }
    };

    player.addEventListener("frameupdate", onFrameUpdate);

    return () => {
      player.removeEventListener("frameupdate", onFrameUpdate);
    };
  }, [playerReady, playerRef, holdSegment]);

  useEffect(() => {
    const onPopState = () => {
      const index = pathToSlideIndex(window.location.pathname);
      if (index === null || index === currentIndexRef.current) {
        return;
      }

      navigateToSegment(index, { updateRoute: false });
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [navigateToSegment]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrevious]);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PRESENTATION_SEGMENTS.length - 1;

  return {
    currentIndex,
    phase,
    isFirst,
    isLast,
    goNext,
    goPrevious,
    goToSegment,
  };
};
