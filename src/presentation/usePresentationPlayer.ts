import type { PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useRef, useState } from "react";
import { PRESENTATION_SEGMENTS } from "./presentationSegments";

export type PresentationPhase = "idle" | "playing";

export const usePresentationPlayer = (playerRef: React.RefObject<PlayerRef | null>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<PresentationPhase>("playing");
  const hasStartedRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);
  const phaseRef = useRef(phase);

  currentIndexRef.current = currentIndex;
  phaseRef.current = phase;

  const playSegment = useCallback(
    (index: number) => {
      const player = playerRef.current;
      const segment = PRESENTATION_SEGMENTS[index];
      if (!player || !segment) {
        return;
      }

      player.seekTo(segment.playFrom);
      player.play();
      setPhase("playing");
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

  const goNext = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1;
    if (nextIndex >= PRESENTATION_SEGMENTS.length) {
      return;
    }

    setCurrentIndex(nextIndex);
    playSegment(nextIndex);
  }, [playSegment]);

  const goPrevious = useCallback(() => {
    const previousIndex = currentIndexRef.current - 1;
    if (previousIndex < 0) {
      return;
    }

    setCurrentIndex(previousIndex);
    holdSegment(previousIndex);
  }, [holdSegment]);

  const goToSegment = useCallback(
    (index: number) => {
      if (index < 0 || index >= PRESENTATION_SEGMENTS.length) {
        return;
      }

      const previousIndex = currentIndexRef.current;
      const previousPhase = phaseRef.current;
      setCurrentIndex(index);

      if (index === previousIndex && previousPhase === "idle") {
        playSegment(index);
        return;
      }

      if (index > previousIndex) {
        playSegment(index);
        return;
      }

      holdSegment(index);
    },
    [holdSegment, playSegment],
  );

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!playerRef.current || hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      playSegment(0);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [playerRef, playSegment]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) {
      return;
    }

    const onFrameUpdate = (event: { detail: { frame: number } }) => {
      if (phaseRef.current !== "playing") {
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
  }, [playerRef, holdSegment]);

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
