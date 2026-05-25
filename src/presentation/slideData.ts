export type SlideKey =
  | "splash"
  | "opening"
  | "problem"
  | "ecosystem"
  | "bac"
  | "simulations"
  | "nuclear"
  | "romania"
  | "elinp"
  | "ai"
  | "community"
  | "closing";

export type SlideMeta = {
  key: SlideKey;
  label: string;
  ctaLabel: string;
  ctaUrl: string;
};

export const SLIDES: SlideMeta[] = [
  {
    key: "splash",
    label: "Intro",
    ctaLabel: "PULS",
    ctaUrl: "https://puls-fizica.ro/",
  },
  {
    key: "opening",
    label: "Deschidere",
    ctaLabel: "Incearca o simulare",
    ctaUrl: "https://puls-fizica.ro/simulari",
  },
  {
    key: "problem",
    label: "Problema",
    ctaLabel: "Vezi probleme BAC",
    ctaUrl: "https://puls-fizica.ro/probleme/bac",
  },
  {
    key: "ecosystem",
    label: "Ecosistem",
    ctaLabel: "Vezi simularile",
    ctaUrl: "https://puls-fizica.ro/simulari",
  },
  {
    key: "bac",
    label: "Pregatire BAC",
    ctaLabel: "Antreneaza-te pentru BAC",
    ctaUrl: "https://puls-fizica.ro/probleme/bac",
  },
  {
    key: "simulations",
    label: "Simulari",
    ctaLabel: "Intra in laborator",
    ctaUrl: "https://puls-fizica.ro/simulari",
  },
  {
    key: "nuclear",
    label: "Fizica nucleara",
    ctaLabel: "Simulare apa grea",
    ctaUrl: "https://puls-fizica.ro/simulare/apa-grea",
  },
  {
    key: "romania",
    label: "Poveste romaneasca",
    ctaLabel: "Proces apa grea",
    ctaUrl: "https://puls-fizica.ro/simulare/instalatie-schimb-izotopic",
  },
  {
    key: "elinp",
    label: "ELI-NP",
    ctaLabel: "ELI-NP Photon Sniper",
    ctaUrl: "https://puls-fizica.ro/simulare/eli-np-laser",
  },
  {
    key: "ai",
    label: "Asistent AI",
    ctaLabel: "Intreaba asistentul",
    ctaUrl: "https://puls-fizica.ro/asistent",
  },
  {
    key: "community",
    label: "Comunitate",
    ctaLabel: "Vezi comunitatea",
    ctaUrl: "https://puls-fizica.ro/comunitate",
  },
  {
    key: "closing",
    label: "Incheiere",
    ctaLabel: "Platforma live",
    ctaUrl: "https://puls-fizica.ro/",
  },
];

export const SLIDE_KEYS = SLIDES.map((slide) => slide.key);

export const getSlideMeta = (key: SlideKey) =>
  SLIDES.find((slide) => slide.key === key)!;
