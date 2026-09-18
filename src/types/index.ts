// ---------------------------------------------------------------------------
// Internet Museum — shared types
// ---------------------------------------------------------------------------

export type EffectFlag =
  | "tiled-bg"
  | "scanlines"
  | "grain"
  | "glossy"
  | "glass"
  | "particles"
  | "marquee"
  | "blink"
  | "skeuomorphic"
  | "flat-elevation"
  | "gradient-badges";

export type FontStack =
  | "era-retro" // Georgia / Times — Web 1.0
  | "era-sys" // Verdana / Arial — dot-com
  | "era-trebuchet" // Trebuchet MS — Web 2.0 / social
  | "era-geometric" // clean modern grotesk — flat / material
  | "era-future"; // display grotesk — glass / AI

export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ShadowStyle = "none" | "bevel" | "glossy" | "soft" | "glow";
export type Density = "sparse" | "cozy" | "dense";
export type CursorStyle = "default" | "crosshair" | "pointer-chunky" | "glow-dot";

export interface EraTheme {
  year: number;
  slug: string;
  /** Short era name, e.g. "WEB 2.0" */
  name: string;
  /** One-line tagline in the museum's curatorial voice */
  tagline: string;
  /** Longer curatorial description, 2–3 sentences */
  description: string;
  colors: {
    background: string;
    backgroundAlt: string;
    surface: string;
    foreground: string;
    muted: string;
    accent: string;
    accentSecondary: string;
    border: string;
    link: string;
    linkVisited?: string;
  };
  font: {
    heading: FontStack;
    body: FontStack;
  };
  radius: Radius;
  shadow: ShadowStyle;
  density: Density;
  cursor: CursorStyle;
  effects: EffectFlag[];
}

export type ExhibitCategory =
  | "search"
  | "social"
  | "video"
  | "microblogging"
  | "personal-web"
  | "mobile-os"
  | "webmail"
  | "portal";

export interface Exhibit {
  id: string;
  name: string;
  year: number;
  eraLabel: string;
  category: ExhibitCategory;
  shortDescription: string;
  historicalContext: string;
  status: "reconstructed" | "archived";
  accent: string;
  hasReconstruction: boolean;
}

export type LostPlatformCategory = "social" | "productivity" | "messaging" | "personal-web";

export interface LostPlatform {
  id: string;
  name: string;
  launchYear: number;
  peakPeriod: string;
  shutdownYear: number | null;
  whatItWas: string;
  whyItMattered: string;
  category: LostPlatformCategory;
  fullReconstructionId?: string; // links to an Exhibit id when a full reconstruction exists
}

export interface DesignAesthetic {
  id: string;
  name: string;
  years: string;
  description: string;
  traits: string[];
  themeRef: string; // slug of the closest EraTheme to borrow tokens from
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  check: (state: PassportState) => boolean;
}

export interface PassportState {
  visitedExhibits: string[];
  visitedLostPlatforms: string[];
  visitedEras: number[];
  unlockedBadges: string[];
}

/** The museum's top-level "wings" — switched by the persistent nav. */
export type MuseumView = "lobby" | "lost-internet" | "design-archive";
