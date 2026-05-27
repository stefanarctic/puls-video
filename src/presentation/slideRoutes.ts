import { PRESENTATION_SEGMENT_COUNT } from "./presentationSegments";

export const slideIndexToPath = (index: number) => {
  const slideNumber = index + 1;
  return `/${slideNumber}`;
};

export const pathToSlideIndex = (pathname: string): number | null => {
  const match = pathname.match(/^\/(\d+)\/?$/);
  if (!match) {
    return null;
  }

  const slideNumber = Number.parseInt(match[1], 10);
  if (
    !Number.isFinite(slideNumber) ||
    slideNumber < 1 ||
    slideNumber > PRESENTATION_SEGMENT_COUNT
  ) {
    return null;
  }

  return slideNumber - 1;
};

export const getInitialSlideIndex = () => {
  const fromPath = pathToSlideIndex(window.location.pathname);
  return fromPath ?? 0;
};

export const syncSlideRoute = (
  index: number,
  mode: "push" | "replace" = "push",
) => {
  const path = slideIndexToPath(index);
  if (window.location.pathname === path) {
    return;
  }

  if (mode === "replace") {
    window.history.replaceState({ slideIndex: index }, "", path);
    return;
  }

  window.history.pushState({ slideIndex: index }, "", path);
};

export const normalizeSlideRoute = () => {
  const index = getInitialSlideIndex();
  syncSlideRoute(index, "replace");
};
