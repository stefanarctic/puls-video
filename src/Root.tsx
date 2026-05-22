import "./index.css";
import { Composition } from "remotion";
import { PulsJuryPresentation } from "./Composition";
import { TOTAL_DURATION, VIDEO } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PulsJuryPresentation"
        component={PulsJuryPresentation}
        durationInFrames={TOTAL_DURATION}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
