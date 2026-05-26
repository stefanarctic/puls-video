import { SLIDES, type SlideKey } from "./slideData";
import { preloadSlideModule, SLIDE_ASSETS } from "./slideRegistry";

const prefetchedImages = new Set<string>();
const imagePromises = new Map<string, Promise<void>>();

export const prefetchImageAsset = (assetPath: string) => {
  void prefetchImageAssetAsync(assetPath);
};

export const prefetchImageAssetAsync = (assetPath: string): Promise<void> => {
  if (prefetchedImages.has(assetPath)) {
    return Promise.resolve();
  }

  const pending = imagePromises.get(assetPath);
  if (pending) {
    return pending;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      prefetchedImages.add(assetPath);
      resolve();
    };
    image.onerror = () => {
      reject(new Error(`Failed to prefetch image: ${assetPath}`));
    };
    image.src = `/${assetPath}`;
  }).finally(() => {
    imagePromises.delete(assetPath);
  });

  imagePromises.set(assetPath, promise);
  return promise;
};

export const prefetchSlideByKey = (key: SlideKey) => {
  for (const assetPath of SLIDE_ASSETS[key]) {
    prefetchImageAsset(assetPath);
  }

  void preloadSlideModule(key);
};

export const prefetchNextSlide = (activeIndex: number) => {
  const nextSlide = SLIDES[activeIndex + 1];
  if (nextSlide) {
    prefetchSlideByKey(nextSlide.key);
  }

  const ecosystemIndex = SLIDES.findIndex((slide) => slide.key === "ecosystem");
  if (
    ecosystemIndex >= 0 &&
    activeIndex >= ecosystemIndex - 2 &&
    activeIndex < ecosystemIndex
  ) {
    prefetchSlideByKey("ecosystem");
  }
};

export const ensureSlideReady = async (index: number) => {
  const slide = SLIDES[index];
  if (!slide) {
    return;
  }

  await Promise.all([
    preloadSlideModule(slide.key),
    ...SLIDE_ASSETS[slide.key].map((assetPath) =>
      prefetchImageAssetAsync(assetPath),
    ),
  ]);
};

/** @deprecated Use prefetchSlideByKey("splash") */
export const prefetchOpeningSlide = () => {
  prefetchSlideByKey("splash");
};
