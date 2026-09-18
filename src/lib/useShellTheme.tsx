"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ShellTheme = "dark" | "light";
export const SHELL_THEME_STORAGE_KEY = "internet-museum:shell-theme";

interface ShellThemeContextValue {
  theme: ShellTheme;
  toggle: () => void;
}

const ShellThemeContext = createContext<ShellThemeContextValue | null>(null);

/**
 * The museum's own chrome (nav, lobby, cards, passport, archive sections)
 * can run in dark or light. This is separate from era theming — a 1995
 * exhibit stays a 1995 exhibit regardless of this toggle. A tiny
 * beforeInteractive script in the root layout sets the data-theme
 * attribute before paint so there's no flash; this provider just syncs
 * React state to that and persists future changes.
 */
export function ShellThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ShellTheme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(SHELL_THEME_STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable — theme still applies for this session
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ShellThemeContext.Provider value={value}>{children}</ShellThemeContext.Provider>;
}

export function useShellTheme(): ShellThemeContextValue {
  const ctx = useContext(ShellThemeContext);
  if (!ctx) return { theme: "dark", toggle: () => {} };
  return ctx;
}
