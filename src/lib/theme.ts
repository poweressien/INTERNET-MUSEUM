import type { CSSProperties } from "react";
import type { Density, EffectFlag, EraTheme, FontStack, Radius, ShadowStyle } from "@/types";

/** Turns an era's color tokens into CSS custom properties for inline style. */
export function eraCssVars(theme: EraTheme): CSSProperties {
  const vars: Record<string, string> = {
    "--era-bg": theme.colors.background,
    "--era-bg-alt": theme.colors.backgroundAlt,
    "--era-surface": theme.colors.surface,
    "--era-fg": theme.colors.foreground,
    "--era-muted": theme.colors.muted,
    "--era-accent": theme.colors.accent,
    "--era-accent-2": theme.colors.accentSecondary,
    "--era-border": theme.colors.border,
    "--era-link": theme.colors.link,
    "--era-link-visited": theme.colors.linkVisited ?? theme.colors.link,
    "--glow-color": theme.colors.accent,
  };
  return vars as unknown as CSSProperties;
}

const RADIUS_MAP: Record<Radius, string> = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  xl: "rounded-[1.75rem]",
  full: "rounded-full",
};
export const radiusClass = (r: Radius) => RADIUS_MAP[r];

const SHADOW_MAP: Record<ShadowStyle, string> = {
  none: "shadow-none",
  bevel: "shadow-bevel",
  glossy: "shadow-glossy",
  soft: "shadow-xl shadow-black/20",
  glow: "shadow-glow",
};
export const shadowClassFor = (s: ShadowStyle) => SHADOW_MAP[s];

const FONT_MAP: Record<FontStack, string> = {
  "era-retro": "font-era-retro",
  "era-sys": "font-era-sys",
  "era-trebuchet": "font-era-trebuchet",
  "era-geometric": "font-era-geometric",
  "era-future": "font-era-future",
};
export const fontClassFor = (f: FontStack) => FONT_MAP[f];

const DENSITY_GAP: Record<Density, string> = {
  sparse: "gap-8 md:gap-12",
  cozy: "gap-5 md:gap-7",
  dense: "gap-2 md:gap-3",
};
export const densityGapClass = (d: Density) => DENSITY_GAP[d];

const DENSITY_PADDING: Record<Density, string> = {
  sparse: "p-8 md:p-10",
  cozy: "p-5 md:p-6",
  dense: "p-3 md:p-4",
};
export const densityPaddingClass = (d: Density) => DENSITY_PADDING[d];

export function hasEffect(theme: EraTheme, flag: EffectFlag): boolean {
  return theme.effects.includes(flag);
}

/** Picks black or white text for a given background hex using perceived luminance. */
export function getContrastText(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#111111" : "#FFFFFF";
}

/** A readable label like "1995 · THE WORLD WIDE WEB" for chrome/headers. */
export function eraDisplayLabel(theme: EraTheme): string {
  return `${theme.year} — ${theme.name}`;
}
