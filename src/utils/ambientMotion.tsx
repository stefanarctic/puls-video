import { useCurrentFrame } from "remotion";
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type AmbientMotionContextValue = {
  enabled: boolean;
  elapsedFrames: number;
  interactive: boolean;
};

const AmbientMotionContext = createContext<AmbientMotionContextValue>({
  enabled: false,
  elapsedFrames: 0,
  interactive: false,
});

export const AmbientMotionProvider = ({
  enabled,
  elapsedFrames,
  interactive = false,
  children,
}: {
  enabled: boolean;
  elapsedFrames: number;
  interactive?: boolean;
  children: ReactNode;
}) => {
  return (
    <AmbientMotionContext.Provider value={{ enabled, elapsedFrames, interactive }}>
      {children}
    </AmbientMotionContext.Provider>
  );
};

export const usePresentationInteractive = () => {
  const { interactive } = useContext(AmbientMotionContext);
  return interactive;
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
