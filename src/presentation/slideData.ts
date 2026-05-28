export type SlideKey =
  | "splash"
  | "opening"
  | "traction"
  | "problem"
  | "ecosystem"
  | "resurse"
  | "bac"
  | "simulations"
  | "nuclear"
  | "romania"
  | "icsi"
  | "elinp"
  | "ai"
  | "community"
  | "clase"
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
    ctaLabel: "Intra pe platforma",
    ctaUrl: "https://puls-fizica.ro/",
  },
  {
    key: "traction",
    label: "Cum am ajuns aici",
    ctaLabel: "Vezi platforma live",
    ctaUrl: "https://puls-fizica.ro/",
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
    key: "resurse",
    label: "Resurse",
    ctaLabel: "Exploreaza resursele",
    ctaUrl: "https://puls-fizica.ro/resurse",
  },
  {
    key: "bac",
    label: "Pregatire BAC",
    ctaLabel: "Antreneaza-te pentru BAC",
    ctaUrl: "https://puls-fizica.ro/probleme/bac",
  },
  // {
  //   key: "simulations",
  //   label: "Simulari",
  //   ctaLabel: "Intra in laborator",
  //   ctaUrl: "https://puls-fizica.ro/simulari",
  // },
  {
    key: "nuclear",
    label: "Fizica nucleara",
    ctaLabel: "Simulari fizica nucleara",
    ctaUrl: "https://puls-fizica.ro/simulari?category=fizica+nucleara",
  },
  {
    key: "romania",
    label: "Poveste romaneasca",
    ctaLabel: "Proces apa grea",
    ctaUrl: "https://puls-fizica.ro/simulare/instalatie-schimb-izotopic",
  },
  {
    key: "icsi",
    label: "ICSI · Electromagnetism",
    ctaLabel: "Simulari electromagnetism",
    ctaUrl: "https://puls-fizica.ro/simulari?category=electromagnetism",
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
    key: "clase",
    label: "Clase si teme",
    ctaLabel: "Spatiu profesor",
    ctaUrl: "https://puls-fizica.ro/profesor",
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
