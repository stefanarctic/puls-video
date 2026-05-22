import { createRoot } from "react-dom/client";
import { PresentationApp } from "../src/presentation/PresentationApp";
import { prefetchOpeningSlide } from "../src/presentation/prefetchSlideAssets";

prefetchOpeningSlide();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

createRoot(rootElement).render(<PresentationApp />);
