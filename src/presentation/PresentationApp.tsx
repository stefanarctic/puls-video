import { Player, type PlayerRef } from "@remotion/player";
import { useRef } from "react";
import { PulsMarketingVideo } from "../Composition";
import { TOTAL_DURATION, VIDEO } from "../constants";
import { PRESENTATION_SEGMENTS } from "./presentationSegments";
import { usePresentationPlayer } from "./usePresentationPlayer";
import "./presentation.css";

export const PresentationApp = () => {
  const playerRef = useRef<PlayerRef>(null);
  const { currentIndex, phase, isFirst, isLast, goNext, goPrevious, goToSegment } =
    usePresentationPlayer(playerRef);

  return (
    <div className="presentation-shell">
      <Player
        ref={playerRef}
        className="presentation-player"
        component={PulsMarketingVideo}
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

      <div className="presentation-controls">
        <button
          type="button"
          className="presentation-button"
          onClick={goPrevious}
          disabled={isFirst}
        >
          Previous
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
          Next
        </button>
      </div>

      <div className="presentation-hint">← → or Space</div>
    </div>
  );
};
