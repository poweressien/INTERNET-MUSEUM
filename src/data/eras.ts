import type { EraTheme } from "@/types";

// ---------------------------------------------------------------------------
// Eight eras. Each one is a small, historically-grounded design system:
// colors, type, radius, shadow, density, cursor and a set of effect flags
// that the theme engine turns into real CSS treatments.
// ---------------------------------------------------------------------------

export const ERAS: EraTheme[] = [
  {
    year: 1995,
    slug: "1995",
    name: "THE WORLD WIDE WEB",
    tagline: "Hypertext, table layouts, and the sound of a modem shaking hands.",
    description:
      "The web is text first. Pages are built from HTML tables, images are precious kilobytes, and every visited link quietly turns purple. Nobody has a screen wider than 800 pixels, and everybody says so.",
    colors: {
      background: "#C0C0C0",
      backgroundAlt: "#FFFFFF",
      surface: "#FFFFFF",
      foreground: "#000000",
      muted: "#4B4B4B",
      accent: "#0000EE",
      accentSecondary: "#CC0000",
      border: "#000000",
      link: "#0000EE",
      linkVisited: "#551A8B",
    },
    font: { heading: "era-retro", body: "era-retro" },
    radius: "none",
    shadow: "bevel",
    density: "dense",
    cursor: "default",
    effects: ["tiled-bg", "blink", "marquee"],
  },
  {
    year: 2000,
    slug: "2000",
    name: "THE DOT-COM BOOM",
    tagline: "Every company is a .com now, and every homepage has a mission statement.",
    description:
      "Venture money floods in and homepages grow ambitious: gradient banner headers, primitive nav bars, and a rush to look 'professional' in 800×600. Flash intros are starting to appear on sites that can afford them.",
    colors: {
      background: "#F3F6FB",
      backgroundAlt: "#FFFFFF",
      surface: "#FFFFFF",
      foreground: "#152238",
      muted: "#5A6B85",
      accent: "#1857B5",
      accentSecondary: "#E8A400",
      border: "#B9C6DC",
      link: "#1857B5",
      linkVisited: "#5B3FA0",
    },
    font: { heading: "era-sys", body: "era-sys" },
    radius: "sm",
    shadow: "bevel",
    density: "dense",
    cursor: "default",
    effects: ["gradient-badges"],
  },
  {
    year: 2004,
    slug: "2004",
    name: "THE SOCIAL WEB BEGINS",
    tagline: "Blogs, RSS feeds, and a hundred logos that say 'beta' underneath.",
    description:
      "Personal publishing goes mainstream. Sidebars fill with 'Powered by' badges and orange RSS icons, permalinks become a unit of identity, and half the internet's best products are still politely labelled beta.",
    colors: {
      background: "#FBFAF6",
      backgroundAlt: "#FFFFFF",
      surface: "#FFFFFF",
      foreground: "#2B2620",
      muted: "#736B5E",
      accent: "#D9730D",
      accentSecondary: "#3B6E8F",
      border: "#E3DDCF",
      link: "#3B6E8F",
      linkVisited: "#7A4F9E",
    },
    font: { heading: "era-trebuchet", body: "era-trebuchet" },
    radius: "md",
    shadow: "soft",
    density: "cozy",
    cursor: "default",
    effects: ["gradient-badges"],
  },
  {
    year: 2007,
    slug: "2007",
    name: "WEB 2.0",
    tagline: "Glossy, blue, and suddenly everyone has a profile.",
    description:
      "Interfaces turn glassy and tactile: gradient buttons with a highlight along the top, drop shadows on everything, rounded corners everywhere they'll fit. Social networks are colonizing daily life, and a phone just arrived that has no keyboard at all.",
    colors: {
      background: "#DCEBFB",
      backgroundAlt: "#EFF6FE",
      surface: "#FFFFFF",
      foreground: "#1B2A3F",
      muted: "#5D7392",
      accent: "#3B5998",
      accentSecondary: "#5FA9E8",
      border: "#B7CFEA",
      link: "#3B5998",
      linkVisited: "#3B5998",
    },
    font: { heading: "era-trebuchet", body: "era-trebuchet" },
    radius: "lg",
    shadow: "glossy",
    density: "dense",
    cursor: "default",
    effects: ["glossy", "gradient-badges", "scanlines"],
  },
  {
    year: 2010,
    slug: "2010",
    name: "THE APP ERA",
    tagline: "Skeuomorphism, home screens, and an app for everything.",
    description:
      "The smartphone reshapes software into icons on a grid. Interfaces borrow from the physical world — stitched leather, brushed metal, glass reflections — because touching a screen still feels like it needs to resemble touching something real.",
    colors: {
      background: "#1B1A22",
      backgroundAlt: "#252330",
      surface: "#2E2B3A",
      foreground: "#F3EFEA",
      muted: "#B4ADC4",
      accent: "#E1663D",
      accentSecondary: "#4FA8E0",
      border: "#3C384A",
      link: "#6FB6F1",
    },
    font: { heading: "era-geometric", body: "era-geometric" },
    radius: "xl",
    shadow: "soft",
    density: "cozy",
    cursor: "default",
    effects: ["skeuomorphic", "glossy"],
  },
  {
    year: 2015,
    slug: "2015",
    name: "FLAT & MATERIAL",
    tagline: "Shadows earn their keep, and gradients are briefly forbidden.",
    description:
      "A correction sweeps through design: gloss and texture are stripped away in favor of flat color and honest geometry. Google's Material Design gives flatness some physics back — a little paper, a little elevation, a lot of motion.",
    colors: {
      background: "#FAFAFA",
      backgroundAlt: "#F0F0F0",
      surface: "#FFFFFF",
      foreground: "#212121",
      muted: "#6B6B6B",
      accent: "#2979FF",
      accentSecondary: "#FF5252",
      border: "#E4E4E4",
      link: "#2979FF",
    },
    font: { heading: "era-geometric", body: "era-geometric" },
    radius: "sm",
    shadow: "soft",
    density: "cozy",
    cursor: "default",
    effects: ["flat-elevation"],
  },
  {
    year: 2020,
    slug: "2020",
    name: "GLASSMORPHISM",
    tagline: "Dark mode, frosted panels, and a soft neon glow behind everything.",
    description:
      "Interfaces go translucent: blurred glass panels float over gradient backdrops, borders glow faintly instead of casting shadows, and dark mode stops being a novelty and becomes the default.",
    colors: {
      background: "#0E1320",
      backgroundAlt: "#161D30",
      surface: "#1B2338",
      foreground: "#EDF1FB",
      muted: "#9AA6C4",
      accent: "#8B7CF6",
      accentSecondary: "#38D6C0",
      border: "#31406B",
      link: "#8FA6FF",
    },
    font: { heading: "era-geometric", body: "era-geometric" },
    radius: "xl",
    shadow: "glow",
    density: "cozy",
    cursor: "default",
    effects: ["glass", "grain"],
  },
  {
    year: 2026,
    slug: "2026",
    name: "THE AI ERA",
    tagline: "The interface starts talking back, and the chrome starts disappearing.",
    description:
      "Static screens give way to conversational, adaptive surfaces. Layouts assemble themselves around intent instead of navigation, ambient generative motion replaces static imagery, and the browser chrome itself starts to fade into the background.",
    colors: {
      background: "#07080A",
      backgroundAlt: "#0D0F13",
      surface: "#14161C",
      foreground: "#F2F3F6",
      muted: "#8D93A3",
      accent: "#7BD8FF",
      accentSecondary: "#C792FF",
      border: "#23262F",
      link: "#7BD8FF",
    },
    font: { heading: "era-future", body: "era-geometric" },
    radius: "xl",
    shadow: "glow",
    density: "sparse",
    cursor: "glow-dot",
    effects: ["glass", "particles", "grain"],
  },
];

export const DEFAULT_ERA_SLUG = "2007";

export function getEraBySlug(slug: string): EraTheme | undefined {
  return ERAS.find((e) => e.slug === slug);
}

export function getEraByYear(year: number): EraTheme | undefined {
  return ERAS.find((e) => e.year === year);
}
