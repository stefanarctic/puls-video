import { AbsoluteFill, Sequence } from "remotion";
import { SCENE_DURATIONS, TIMELINE } from "./constants";
import { AiAssistantScene } from "./scenes/AiAssistantScene";
import { FinalBrandScene } from "./scenes/FinalBrandScene";
import { GamificationScene } from "./scenes/GamificationScene";
import { InteractivePhysicsScene } from "./scenes/InteractivePhysicsScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { ShiftScene } from "./scenes/ShiftScene";
import { EnergyPulseTransition, LightSweep } from "./utils/transitions";

export const PulsMarketingVideo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#02040b" }}>
      <Sequence
        from={TIMELINE.problem}
        durationInFrames={SCENE_DURATIONS.problem}
      >
        <ProblemScene duration={SCENE_DURATIONS.problem} />
      </Sequence>
      <Sequence from={TIMELINE.shift} durationInFrames={SCENE_DURATIONS.shift}>
        <ShiftScene duration={SCENE_DURATIONS.shift} />
      </Sequence>
      <Sequence
        from={TIMELINE.interactive}
        durationInFrames={SCENE_DURATIONS.interactive}
      >
        <InteractivePhysicsScene duration={SCENE_DURATIONS.interactive} />
      </Sequence>
      <Sequence from={TIMELINE.ai} durationInFrames={SCENE_DURATIONS.ai}>
        <AiAssistantScene duration={SCENE_DURATIONS.ai} />
      </Sequence>
      <Sequence
        from={TIMELINE.gamification}
        durationInFrames={SCENE_DURATIONS.gamification}
      >
        <GamificationScene duration={SCENE_DURATIONS.gamification} />
      </Sequence>
      <Sequence from={TIMELINE.final} durationInFrames={SCENE_DURATIONS.final}>
        <FinalBrandScene duration={SCENE_DURATIONS.final} />
      </Sequence>

      <EnergyPulseTransition at={TIMELINE.shift - 20} duration={48} strength={1.2} />
      <LightSweep at={TIMELINE.interactive - 22} duration={58} />
      <EnergyPulseTransition at={TIMELINE.ai - 18} duration={42} strength={0.82} />
      <LightSweep at={TIMELINE.gamification - 18} duration={44} />
      <EnergyPulseTransition at={TIMELINE.final - 24} duration={62} strength={1} />
    </AbsoluteFill>
  );
};
