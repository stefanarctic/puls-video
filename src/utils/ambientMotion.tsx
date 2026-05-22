import { useCurrentFrame } from "remotion";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type AmbientMotionContextValue = {
  enabled: boolean;
  elapsedFrames: number;
};

const AmbientMotionContext = createContext<AmbientMotionContextValue>({
  enabled: false,
  elapsedFrames: 0,
});

export const AmbientMotionProvider = ({
  enabled,
  elapsedFrames,
  children,
}: {
  enabled: boolean;
  elapsedFrames: number;
  children: ReactNode;
}) => {
  return (
    <AmbientMotionContext.Provider value={{ enabled, elapsedFrames }}>
      {children}
    </AmbientMotionContext.Provider>
  );
};

export const useTimelineFrame = () => useCurrentFrame();

export const useAmbientElapsed = () => {
  const { enabled, elapsedFrames } = useContext(AmbientMotionContext);
  return enabled ? elapsedFrames : 0;
};

export const useLoopFrame = () => {
  const frozen = useCurrentFrame();
  const elapsed = useAmbientElapsed();

  return frozen + elapsed;
};
