import { PulsMarketingVideo } from "../Composition";

type PresentationVideoProps = {
  _ambientTick?: number;
};

export const PresentationVideo = ({ _ambientTick }: PresentationVideoProps) => {
  void _ambientTick;
  return <PulsMarketingVideo />;
};
