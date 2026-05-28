import { AbsoluteFill, Sequence } from "remotion";
import { SCENE_DURATIONS, TIMELINE } from "./constants";
import { AiSlide } from "./scenes/slides/AiSlide";
import { BacSlide } from "./scenes/slides/BacSlide";
import { ClosingSlide } from "./scenes/slides/ClosingSlide";
import { CommunitySlide } from "./scenes/slides/CommunitySlide";
import { ClaseSlide } from "./scenes/slides/ClaseSlide";
import { EcosystemSlide } from "./scenes/slides/EcosystemSlide";
import { EliNpSlide } from "./scenes/slides/EliNpSlide";
import { IcsiElectromagnetismSlide } from "./scenes/slides/IcsiElectromagnetismSlide";
import { NuclearSlide } from "./scenes/slides/NuclearSlide";
import { OpeningSlide } from "./scenes/slides/OpeningSlide";
import { SplashSlide } from "./scenes/slides/SplashSlide";
import { ProblemSlide } from "./scenes/slides/ProblemSlide";
import { ResurseSlide } from "./scenes/slides/ResurseSlide";
import { RomaniaStorySlide } from "./scenes/slides/RomaniaStorySlide";
import { SimulationsSlide } from "./scenes/slides/SimulationsSlide";
import { EnergyPulseTransition, LightSweep } from "./utils/transitions";
import "./styles/_composition.scss";

export const PulsJuryPresentation = () => {
  return (
    <AbsoluteFill className="composition-root">
      <Sequence
        from={TIMELINE.splash}
        durationInFrames={SCENE_DURATIONS.splash}
      >
        <SplashSlide duration={SCENE_DURATIONS.splash} />
      </Sequence>
      <Sequence
        from={TIMELINE.opening}
        durationInFrames={SCENE_DURATIONS.opening}
      >
        <OpeningSlide duration={SCENE_DURATIONS.opening} />
      </Sequence>
      <Sequence
        from={TIMELINE.problem}
        durationInFrames={SCENE_DURATIONS.problem}
      >
        <ProblemSlide duration={SCENE_DURATIONS.problem} />
      </Sequence>
      <Sequence
        from={TIMELINE.ecosystem}
        durationInFrames={SCENE_DURATIONS.ecosystem}
      >
        <EcosystemSlide duration={SCENE_DURATIONS.ecosystem} />
      </Sequence>
      <Sequence
        from={TIMELINE.resurse}
        durationInFrames={SCENE_DURATIONS.resurse}
      >
        <ResurseSlide duration={SCENE_DURATIONS.resurse} />
      </Sequence>
      <Sequence from={TIMELINE.bac} durationInFrames={SCENE_DURATIONS.bac}>
        <BacSlide duration={SCENE_DURATIONS.bac} />
      </Sequence>
      <Sequence
        from={TIMELINE.simulations}
        durationInFrames={SCENE_DURATIONS.simulations}
      >
        <SimulationsSlide duration={SCENE_DURATIONS.simulations} />
      </Sequence>
      <Sequence
        from={TIMELINE.nuclear}
        durationInFrames={SCENE_DURATIONS.nuclear}
      >
        <NuclearSlide duration={SCENE_DURATIONS.nuclear} />
      </Sequence>
      <Sequence
        from={TIMELINE.romania}
        durationInFrames={SCENE_DURATIONS.romania}
      >
        <RomaniaStorySlide duration={SCENE_DURATIONS.romania} />
      </Sequence>
      <Sequence from={TIMELINE.icsi} durationInFrames={SCENE_DURATIONS.icsi}>
        <IcsiElectromagnetismSlide duration={SCENE_DURATIONS.icsi} />
      </Sequence>
      <Sequence from={TIMELINE.elinp} durationInFrames={SCENE_DURATIONS.elinp}>
        <EliNpSlide duration={SCENE_DURATIONS.elinp} />
      </Sequence>
      <Sequence from={TIMELINE.ai} durationInFrames={SCENE_DURATIONS.ai}>
        <AiSlide duration={SCENE_DURATIONS.ai} />
      </Sequence>
      <Sequence
        from={TIMELINE.community}
        durationInFrames={SCENE_DURATIONS.community}
      >
        <CommunitySlide duration={SCENE_DURATIONS.community} />
      </Sequence>
      <Sequence from={TIMELINE.clase} durationInFrames={SCENE_DURATIONS.clase}>
        <ClaseSlide duration={SCENE_DURATIONS.clase} />
      </Sequence>
      <Sequence
        from={TIMELINE.closing}
        durationInFrames={SCENE_DURATIONS.closing}
      >
        <ClosingSlide duration={SCENE_DURATIONS.closing} />
      </Sequence>

      <EnergyPulseTransition
        at={TIMELINE.opening - 16}
        duration={44}
        strength={1.05}
      />
      <LightSweep at={TIMELINE.opening - 12} duration={40} />
      <EnergyPulseTransition
        at={TIMELINE.problem - 16}
        duration={40}
        strength={0.9}
      />
      <LightSweep at={TIMELINE.ecosystem - 16} duration={48} />
      <EnergyPulseTransition
        at={TIMELINE.resurse - 16}
        duration={40}
        strength={0.85}
      />
      <EnergyPulseTransition at={TIMELINE.bac - 16} duration={38} strength={0.75} />
      <LightSweep at={TIMELINE.simulations - 18} duration={52} />
      <EnergyPulseTransition
        at={TIMELINE.nuclear - 20}
        duration={52}
        strength={1.15}
      />
      <LightSweep at={TIMELINE.romania - 18} duration={48} />
      <EnergyPulseTransition
        at={TIMELINE.icsi - 18}
        duration={50}
        strength={1.05}
      />
      <EnergyPulseTransition at={TIMELINE.elinp - 20} duration={54} strength={1.2} />
      <LightSweep at={TIMELINE.ai - 16} duration={44} />
      <EnergyPulseTransition
        at={TIMELINE.community - 16}
        duration={38}
        strength={0.8}
      />
      <LightSweep at={TIMELINE.clase - 16} duration={44} />
      <EnergyPulseTransition at={TIMELINE.closing - 20} duration={56} strength={1} />
    </AbsoluteFill>
  );
};

/** @deprecated Use PulsJuryPresentation */
export const PulsMarketingVideo = PulsJuryPresentation;
