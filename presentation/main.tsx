import { createRoot } from "react-dom/client";
import { PresentationApp } from "../src/presentation/PresentationApp";
import { prefetchSlideByKey } from "../src/presentation/prefetchSlideAssets";
import { normalizeSlideRoute } from "../src/presentation/slideRoutes";

normalizeSlideRoute();
prefetchSlideByKey("splash");

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

createRoot(rootElement).render(<PresentationApp />);
