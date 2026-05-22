import "./index.css";
import { Composition } from "remotion";
import { PulsMarketingVideo } from "./Composition";
import { TOTAL_DURATION, VIDEO } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PULSMarketingVideo"
        component={PulsMarketingVideo}
        durationInFrames={TOTAL_DURATION}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    </>
  );
};
