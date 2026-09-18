"use client";

import { useCallback, useEffect, useState } from "react";
import { BADGES } from "@/data/badges";
import type { PassportState } from "@/types";

const STORAGE_KEY = "internet-museum:passport:v1";

const EMPTY_STATE: PassportState = {
  visitedExhibits: [],
  visitedLostPlatforms: [],
  visitedEras: [],
  unlockedBadges: [],
};

function loadState(): PassportState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<PassportState>;
    return {
      visitedExhibits: Array.isArray(parsed.visitedExhibits) ? parsed.visitedExhibits : [],
      visitedLostPlatforms: Array.isArray(parsed.visitedLostPlatforms) ? parsed.visitedLostPlatforms : [],
      visitedEras: Array.isArray(parsed.visitedEras) ? parsed.visitedEras : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function saveState(state: PassportState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing, storage full, etc.) — fail silently.
  }
}

export function usePassport() {
  const [state, setState] = useState<PassportState>(EMPTY_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState<string[]>([]);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  const applyAndCheckBadges = useCallback((updater: (prev: PassportState) => PassportState) => {
    setState((prev) => {
      const next = updater(prev);
      if (next === prev) return prev;
      const newlyUnlocked = BADGES.filter(
        (b) => !next.unlockedBadges.includes(b.id) && b.check(next)
      ).map((b) => b.id);
      const finalState: PassportState = {
        ...next,
        unlockedBadges: [...next.unlockedBadges, ...newlyUnlocked],
      };
      if (newlyUnlocked.length > 0) {
        setJustUnlocked((q) => [...q, ...newlyUnlocked]);
      }
      saveState(finalState);
      return finalState;
    });
  }, []);

  const visitExhibit = useCallback(
    (id: string) => {
      applyAndCheckBadges((prev) =>
        prev.visitedExhibits.includes(id)
          ? prev
          : { ...prev, visitedExhibits: [...prev.visitedExhibits, id] }
      );
    },
    [applyAndCheckBadges]
  );

  const visitLostPlatform = useCallback(
    (id: string) => {
      applyAndCheckBadges((prev) =>
        prev.visitedLostPlatforms.includes(id)
          ? prev
          : { ...prev, visitedLostPlatforms: [...prev.visitedLostPlatforms, id] }
      );
    },
    [applyAndCheckBadges]
  );

  const visitEra = useCallback(
    (year: number) => {
      applyAndCheckBadges((prev) =>
        prev.visitedEras.includes(year) ? prev : { ...prev, visitedEras: [...prev.visitedEras, year] }
      );
    },
    [applyAndCheckBadges]
  );

  const dismissUnlock = useCallback((id: string) => {
    setJustUnlocked((q) => q.filter((b) => b !== id));
  }, []);

  return { state, hydrated, visitExhibit, visitLostPlatform, visitEra, justUnlocked, dismissUnlock };
}
