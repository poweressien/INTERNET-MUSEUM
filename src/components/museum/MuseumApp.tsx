"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ERAS, getEraByYear } from "@/data/eras";
import type { MuseumView } from "@/types";
import { usePassport } from "@/lib/usePassport";
import { useSound } from "@/lib/useSound";
import { Navigation } from "./Navigation";
import { MuseumLobby } from "./MuseumLobby";
import { Timeline } from "./Timeline";
import { EraShowcase } from "./EraShowcase";
import { ExhibitGrid } from "./ExhibitGrid";
import { ExhibitViewer } from "./ExhibitViewer";
import { MuseumPassport } from "./MuseumPassport";
import { LostInternet } from "./LostInternet";
import { DesignArchive } from "./DesignArchive";
import { EasterEggs } from "./EasterEggs";

const DEFAULT_YEAR = 2007;

export function MuseumApp() {
  const [view, setView] = useState<MuseumView>("lobby");
  const [activeYear, setActiveYear] = useState<number>(DEFAULT_YEAR);
  const [transitionKey, setTransitionKey] = useState(0);
  const [exhibitId, setExhibitId] = useState<string | null>(null);
  const [passportOpen, setPassportOpen] = useState(false);
  const [browserErrorOpen, setBrowserErrorOpen] = useState(false);

  const { play } = useSound();
  const prefersReducedMotion = useReducedMotion();
  const { state: passportState, visitExhibit, visitLostPlatform, visitEra } = usePassport();

  const activeTheme = getEraByYear(activeYear) ?? ERAS[3];

  const handleSelectYear = useCallback(
    (year: number) => {
      if (year === activeYear) return;
      setActiveYear(year);
      setTransitionKey((k) => k + 1);
      visitEra(year);
    },
    [activeYear, visitEra]
  );

  const handleOpenExhibit = useCallback(
    (id: string) => {
      play("click");
      setExhibitId(id);
      visitExhibit(id);
    },
    [play, visitExhibit]
  );

  const handleNavigate = useCallback((next: MuseumView) => {
    setView(next);
    window.scrollTo(0, 0);
  }, []);

  const handleEnterMuseum = useCallback(() => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleJumpTo2007 = useCallback(() => {
    handleSelectYear(2007);
    setTimeout(() => {
      document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [handleSelectYear]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-shell-ink">
      <Navigation
        activeView={view}
        onNavigate={handleNavigate}
        onOpenPassport={() => setPassportOpen(true)}
        badgeCount={passportState.unlockedBadges.length}
      />

      <AnimatePresence mode="wait">
        {view === "lobby" && (
          <motion.main
            key="lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MuseumLobby onEnter={handleEnterMuseum} onJumpTo2007={handleJumpTo2007} />

            <div id="timeline" className="scroll-mt-16 bg-shell-ink pt-14">
              <Timeline activeYear={activeYear} onSelectYear={handleSelectYear} />
              <EraShowcase theme={activeTheme} />
            </div>

            <ExhibitGrid visitedIds={passportState.visitedExhibits} onOpenExhibit={handleOpenExhibit} />
          </motion.main>
        )}

        {view === "lost-internet" && (
          <motion.main
            key="lost-internet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-16"
          >
            <LostInternet
              visitedIds={passportState.visitedLostPlatforms}
              onVisit={visitLostPlatform}
              onOpenExhibit={handleOpenExhibit}
            />
          </motion.main>
        )}

        {view === "design-archive" && (
          <motion.main
            key="design-archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-16"
          >
            <DesignArchive />
          </motion.main>
        )}
      </AnimatePresence>

      <footer className="border-t border-shell-line/60 px-4 py-8 text-center sm:px-6">
        <p className="font-display text-xs text-shell-paper/35">
          Internet Museum — an original, fan-made archive built for education and nostalgia. Every
          reconstruction is an independent recreation, not affiliated with the companies it references.
        </p>
      </footer>

      <ExhibitViewer
        exhibitId={exhibitId}
        onClose={() => setExhibitId(null)}
        onFindEasterEgg={() => setBrowserErrorOpen(true)}
      />

      <MuseumPassport open={passportOpen} onClose={() => setPassportOpen(false)} state={passportState} />

      <EasterEggs browserErrorOpen={browserErrorOpen} onCloseBrowserError={() => setBrowserErrorOpen(false)} />

      {!prefersReducedMotion && transitionKey > 0 && (
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0] }}
          transition={{ duration: 0.7, times: [0, 0.3, 1], ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[70]"
          style={{ backgroundColor: activeTheme.colors.accent }}
          aria-hidden
        />
      )}
    </div>
    </MotionConfig>
  );
}
