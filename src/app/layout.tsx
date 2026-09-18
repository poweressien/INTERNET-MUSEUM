import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { SoundProvider } from "@/lib/useSound";
import { ShellThemeProvider, SHELL_THEME_STORAGE_KEY } from "@/lib/useShellTheme";
import "./globals.css";

// Deliberately system font stacks rather than next/font/google: the museum's
// own "shell" chrome pairs a native sans (interface / wayfinding) with a
// classic Georgia-led serif (curatorial / descriptive text) — distinct
// voices without a build-time dependency on fetching remote font files.
// Individual eras inside exhibits use their own period-accurate stacks
// (see tailwind.config.ts and src/data/eras.ts).

export const metadata: Metadata = {
  title: "Internet Museum — A Time Machine Through the History of the Web",
  description:
    "A living archive of the web that once was. Travel through decades of websites, interfaces, platforms and digital culture.",
};

export const viewport: Viewport = {
  themeColor: "#100E0C",
  width: "device-width",
  initialScale: 1,
};

// Runs before hydration so the light/dark shell choice applies with no
// flash of the wrong theme on load.
const THEME_INIT_SCRIPT = `
try {
  var stored = localStorage.getItem('${SHELL_THEME_STORAGE_KEY}');
  var theme = stored === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className="font-display antialiased bg-shell-ink text-shell-paper">
        <SoundProvider>
          <ShellThemeProvider>{children}</ShellThemeProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
