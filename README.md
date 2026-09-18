# Internet Museum

A time machine through the history of the web — an interactive digital museum built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Pick a year on the timeline and the entire interface — colors, type, density, shadows, borders, even the cursor — re-themes to match that moment in web history.

## Quick start

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Node 18+ recommended.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npm run typecheck  # tsc --noEmit
```

This has been built and verified with `npm run build` and `tsc --noEmit` — both pass clean with zero errors, and `npm run lint` reports no warnings.

## What's here

- **Museum lobby** — cinematic hero with a single orchestrated entrance sequence, ambient particles, and floating UI fragments hinting at different eras.
- **Interactive timeline** — 1995 / 2000 / 2004 / 2007 / 2010 / 2015 / 2020 / 2026, each a fully-specified `EraTheme` (colors, fonts, radius, shadow, density, cursor, effects). Selecting a year animates a full re-theme of the showcase panel and triggers a brief full-viewport transition flash.
- **10 exhibits, each spanning several real versions** — not a single frozen year. Google (1998 → 2002 → 2010 → today), Facebook (2004 Harvard-only → 2008 Wall era → 2011 Timeline → the 2011 feature-phone version built on Snaptu, reached through Opera Mini, that was how much of Africa and Asia first used Facebook), Twitter (2006 SMS-only → 2007 SXSW → 2012 → 2017's 280 characters), YouTube (2005 launch → 2006 five-star ratings → 2011 flat redesign → 2017 Material/dark mode), MySpace (2004 → 2006 peak chaos → the 2013 Justin Timberlake-era relaunch that looked nothing like it), GeoCities (1996 → 1999 post-Yahoo), Gmail (2004 invite-only launch → 2008 Talk sidebar → 2013 inbox tabs → today's Material look), Yahoo (1995's hand-sorted directory → 1998 → the crowded 2003 portal → today's much quieter homepage), iPhone (2007 → 2026), and Android (2008 → 2026) — each with a year switcher and genuinely different layouts per era, not palette swaps.
- **The Lost Internet** — 10 platforms that disappeared or were transformed beyond recognition (MySpace, Orkut, Friendster, Vine, Google+, Google Reader, GeoCities, Google Wave, MSN Messenger, Yahoo Messenger), with real launch/peak/shutdown history.
- **Design Archive** — Web 1.0, Web 2.0, Flat, Material, Glassmorphism, and AI-era aesthetics, with a live demo panel that borrows real theme tokens from the closest era.
- **Museum Passport** — localStorage-backed visit tracking and 5 unlockable badges (Web Archaeologist, Dot-Com Survivor, Social Archaeologist, Old School, 2007 Kid).
- **Easter eggs** — the Konami code (↑↑↓↓←→←→BA) and a genuinely hidden link both surface a secret "YOU FOUND THE LOST INTERNET" screen; clicking GeoCities' Under Construction banner triggers a fake old-school browser error; any broken/mistyped URL lands on a "404 INTERNET NOT FOUND" room instead of a generic error.
- **Sound** — real, working UI sound (clicks, transitions, unlocks), synthesized on the fly with the Web Audio API rather than sampled/licensed audio, so there's no copyright question. Off by default; toggle lives in the nav. Swapping in recorded audio later only means changing `playSound()`'s implementation in `src/lib/useSound.tsx` — the `useSound()` API calling code uses stays the same.
- **Light/dark shell toggle** — separate from era theming. The museum's own chrome (nav, lobby, cards, passport, Lost Internet, Design Archive) can run in dark or light, persisted to localStorage and applied before first paint (no flash). Era content and reconstructions never change with this toggle — a 1995 exhibit stays a 1995 exhibit either way. See `src/lib/useShellTheme.tsx`.
- Fully responsive (mobile timeline scrolls horizontally, nav collapses to a menu, exhibits go single-column, device frames scale down), keyboard-accessible (focus rings, `Escape` closes overlays, semantic landmarks), and `prefers-reduced-motion` is respected both globally (via Framer Motion's `MotionConfig`) and specifically (ambient particles and floating fragments skip entirely).

## Architecture

```
src/
  app/                    Next.js App Router entry (layout, page, globals.css, 404)
  components/museum/      UI: lobby, timeline, showcase, grid, viewer, passport, etc.
    effects/              Ambient decoration: particles, grid, floating fragments
  reconstructions/        One folder per exhibit's interactive reconstruction
    EraTabs.tsx            Shared year/version switcher used by every multi-era reconstruction
  data/                   eras.ts, exhibits.ts, badges.ts, historicalPlatforms.ts, designAesthetics.ts
  lib/                    theme.ts (era → CSS/Tailwind), usePassport, useSound, useKonamiCode, utils
  types/                  Shared TypeScript types
```

This is data-driven on purpose. To add something new, you shouldn't need to touch the rest of the app:

- **New exhibit**: add an entry to `src/data/exhibits.ts`, build a component in `src/reconstructions/<id>/`, and register it in `src/reconstructions/index.tsx`. It automatically appears in the grid, the passport checklist, and (if its year is 2007) the "2007 Kid" badge check.
- **New era**: add an `EraTheme` object to `src/data/eras.ts` (`ERAS` array) and it appears on the timeline automatically.
- **New Lost Internet platform**: add to `src/data/historicalPlatforms.ts`. Tag it `category: "social"` and it's automatically counted toward the Social Archaeologist badge.
- **New badge**: add a `{ id, name, description, check }` object to `src/data/badges.ts`; `check` receives the current `PassportState` and returns a boolean.

### The era theme engine

`src/types/index.ts` defines `EraTheme`; `src/data/eras.ts` has the 8 instances; `src/lib/theme.ts` turns one into CSS custom properties (`eraCssVars`) and Tailwind class names (`radiusClass`, `shadowClassFor`, `fontClassFor`, `getContrastText`). Components apply the CSS variables inline on a wrapper and reference them via Tailwind arbitrary values (`bg-[var(--era-bg)]`), so swapping the active era is just swapping which object is passed down — no component needs a rewrite.

### A few deliberate calls worth knowing about

- **No custom Google Fonts** — the museum's own shell chrome (nav, passport, lobby) pairs a native system sans (`font-display`) with a Georgia-led serif (`font-curator`) instead of `next/font/google`. This avoids a build-time dependency on fetching remote font files (which fails outright on restricted networks/CI) and keeps the bundle lighter. Individual eras inside exhibits use their own period-accurate system stacks (Times/Georgia for 1995, Verdana for 2000, Trebuchet for 2004–2007) — which is also just historically accurate, since custom webfonts didn't really exist yet.
- **No photographic/screenshot assets** — every visual, including the exhibit preview thumbnails and both device frames, is built from CSS, SVG and Lucide icons. This sidesteps any copyright question around scraping real screenshots or logos, keeps the repo tiny, and — per the brief — these are explicitly reconstructions, not copies (each carries an on-screen "Museum reconstruction" placard and a footer disclaimer).
- **Single-page app-shell, not per-exhibit routes** — exhibits open as a full-screen client-side overlay rather than a `/exhibit/[id]` route, so the "time travel" transition stays fluid and stateful. Reconstructions are still code-split via `next/dynamic`, so none of that code ships in the initial bundle.
- **Lost Internet cards get a lighter treatment than the 8 main exhibits** — MySpace and GeoCities are full interactive reconstructions (and are cross-linked from their Lost Internet cards); the other 8 platforms get rich historical data cards rather than a from-scratch interactive rebuild of, say, Google Wave. Happy to build any of them out further on request.

## Deploying

This is a standard Next.js app — it deploys as-is to Vercel (`vercel deploy`) or any Node hosting that runs `next build && next start`.

## A note on the reconstructions

Every exhibit is an original recreation built from scratch for this project — original markup, original styling, invented sample content (no real usernames/posts) — not a copy of any live or archived site. Each one is labeled on-screen as a museum reconstruction and is not affiliated with, endorsed by, or representing the companies it references.
