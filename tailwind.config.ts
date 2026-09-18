import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        shell: {
          ink: "rgb(var(--shell-ink) / <alpha-value>)",
          surface: "rgb(var(--shell-surface) / <alpha-value>)",
          raised: "rgb(var(--shell-raised) / <alpha-value>)",
          line: "rgb(var(--shell-line) / <alpha-value>)",
          paper: "rgb(var(--shell-paper) / <alpha-value>)",
          brass: "rgb(var(--shell-brass) / <alpha-value>)",
          "brass-bright": "rgb(var(--shell-brass-bright) / <alpha-value>)",
          verdigris: "rgb(var(--shell-verdigris) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Shell identity — native system stacks, no remote font fetch required.
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        curator: ["Georgia", "Cambria", "Times New Roman", "serif"],
        // Period-accurate era stacks — intentionally system fonts, not webfonts,
        // because that is historically what those eras actually used.
        "era-retro": ["Georgia", "Times New Roman", "serif"],
        "era-sys": ["Verdana", "Geneva", "Arial", "sans-serif"],
        "era-trebuchet": ["Trebuchet MS", "Verdana", "Arial", "sans-serif"],
        "era-geometric": ["-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        "era-future": ["-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        bevel: "inset -1px -1px 0 #6e6e6e, inset 1px 1px 0 #fefefe, inset -2px -2px 0 #3a3a3a, inset 2px 2px 0 #d8d8d8",
        glossy: "0 1px 0 rgba(255,255,255,.65) inset, 0 10px 24px -10px rgba(0,0,0,.45)",
        plaque: "0 1px 0 rgba(244,237,225,0.06) inset, 0 12px 30px -16px rgba(0,0,0,0.7)",
        glow: "0 0 60px -12px var(--glow-color, #C9A24B)",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        marquee: { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-50%)" } },
        scanline: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-1%, -2%)" },
          "30%": { transform: "translate(1%, 2%)" },
          "50%": { transform: "translate(-2%, 1%)" },
          "70%": { transform: "translate(2%, -1%)" },
          "90%": { transform: "translate(-1%, 2%)" },
        },
        "pulse-soft": { "0%, 100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        blink: "blink 1.1s steps(1) infinite",
        marquee: "marquee 18s linear infinite",
        scanline: "scanline 6s linear infinite",
        grain: "grain 1.1s steps(4) infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
