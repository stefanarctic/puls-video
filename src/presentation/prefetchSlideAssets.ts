import { PRESENTATION_ASSETS } from "../assets";

const prefetchedImages = new Set<string>();

export const prefetchImageAsset = (assetPath: string) => {
  if (prefetchedImages.has(assetPath)) {
    return;
  }

  prefetchedImages.add(assetPath);
  const image = new Image();
  image.src = `/${assetPath}`;
};

export const prefetchOpeningSlide = () => {
  prefetchImageAsset(PRESENTATION_ASSETS.pendul);
};
