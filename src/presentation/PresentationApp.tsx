import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import { TOTAL_DURATION, VIDEO } from "../constants";
import { AmbientMotionProvider } from "../utils/ambientMotion";
import { PRESENTATION_SEGMENTS } from "./presentationSegments";
import { PresentationVideo } from "./PresentationVideo";
import { usePresentationPlayer } from "./usePresentationPlayer";
import "./presentation.css";

export const PresentationApp = () => {
  const playerRef = useRef<PlayerRef>(null);
  const { currentIndex, phase, isFirst, isLast, goNext, goPrevious, goToSegment } =
    usePresentationPlayer(playerRef);
  const holdFrame = PRESENTATION_SEGMENTS[currentIndex]?.holdAt ?? 0;
  const [ambientElapsed, setAmbientElapsed] = useState(0);

  useEffect(() => {
    if (phase !== "idle") {
      setAmbientElapsed(0);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = () => {
      setAmbientElapsed(((performance.now() - start) / 1000) * VIDEO.fps);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [phase, holdFrame]);

  return (
    <div className="presentation-shell">
      <AmbientMotionProvider enabled={phase === "idle"} elapsedFrames={ambientElapsed}>
        <Player
          ref={playerRef}
          className="presentation-player"
          component={PresentationVideo}
          inputProps={{
            activeSegmentIndex: currentIndex,
            phase,
            _ambientTick: ambientElapsed,
          }}
          durationInFrames={TOTAL_DURATION}
          compositionWidth={VIDEO.width}
          compositionHeight={VIDEO.height}
          fps={VIDEO.fps}
          controls={false}
          autoPlay={false}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </AmbientMotionProvider>

      <div className="presentation-controls">
        <button
          type="button"
          className="presentation-button"
          onClick={goPrevious}
          disabled={isFirst}
        >
          Inapoi
        </button>

        <div className="presentation-dots" aria-label="Presentation scenes">
          {PRESENTATION_SEGMENTS.map((segment, index) => {
            const isActive = index === currentIndex;
            const isPlaying = isActive && phase === "playing";

            return (
              <button
                key={segment.key}
                type="button"
                className={`presentation-dot${isActive ? " is-active" : ""}${isPlaying ? " is-playing" : ""}`}
                aria-label={segment.label}
                aria-current={isActive ? "step" : undefined}
                onClick={() => goToSegment(index)}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="presentation-button"
          onClick={goNext}
          disabled={isLast && phase === "idle"}
        >
          Inainte
        </button>
      </div>

      <div className="presentation-hint">← → or Space</div>
    </div>
  );
};
