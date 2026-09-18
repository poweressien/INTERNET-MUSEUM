import type { DesignAesthetic } from "@/types";

export const DESIGN_AESTHETICS: DesignAesthetic[] = [
  {
    id: "web1",
    name: "WEB 1.0",
    years: "1991–1999",
    description:
      "The web as a document, not a destination. Pages were built from HTML tables, blue was a promise you hadn't clicked yet, and nobody apologized for a tiled background.",
    traits: ["Serif typography", "Blue hyperlinks", "Table layouts", "Tiled backgrounds", "Hit counters", "Under-construction banners"],
    themeRef: "1995",
  },
  {
    id: "web2",
    name: "WEB 2.0",
    years: "2004–2009",
    description:
      "Interfaces turned glassy and tactile. Buttons got a highlight along the top like they were made of candy, corners rounded off, and every logo wanted a reflection underneath it.",
    traits: ["Glossy gradient buttons", "Drop shadows", "Rounded corners", "Reflections", "Badges & ribbons", "Beta labels"],
    themeRef: "2007",
  },
  {
    id: "flat",
    name: "FLAT DESIGN",
    years: "2012–2014",
    description:
      "A correction against a decade of gloss. Texture, gradient, and shadow were stripped out almost entirely, leaving flat color, simple shapes, and typography to do all the work.",
    traits: ["Solid color fills", "No gradients or shadows", "Simple geometric shapes", "Bold typography", "Minimal iconography"],
    themeRef: "2015",
  },
  {
    id: "material",
    name: "MATERIAL DESIGN",
    years: "2014–2018",
    description:
      "Google's answer to flat design's flatness problem: give the interface physics back. Surfaces became sheets of digital paper that could lift, cast a shadow, and move with intention.",
    traits: ["Card-based layout", "Elevation & shadow", "Meaningful motion", "Bold accent color", "Grid-based structure"],
    themeRef: "2015",
  },
  {
    id: "glass",
    name: "GLASSMORPHISM",
    years: "2019–2023",
    description:
      "Panels turned translucent, blurring whatever sat behind them. Borders stopped casting shadows and started glowing instead, and dark backgrounds became the default canvas.",
    traits: ["Background blur", "Transparency", "Glowing borders", "Dark backdrops", "Soft ambient gradients"],
    themeRef: "2020",
  },
  {
    id: "ai-era",
    name: "AI ERA",
    years: "2023–present",
    description:
      "The interface starts to disappear. Chat and voice replace menus, layouts assemble themselves around what you're trying to do, and static screens give way to something more like a conversation.",
    traits: ["Conversational interfaces", "Generative layouts", "Agentic UI", "Adaptive surfaces", "Minimal static chrome"],
    themeRef: "2026",
  },
];
