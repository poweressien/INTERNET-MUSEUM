"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

export type SoundId = "click" | "hover" | "transition" | "unlock";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (id: SoundId) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

/**
 * All sounds here are synthesized at runtime with the Web Audio API —
 * short original tones, not sampled or licensed audio. This keeps the
 * project free of any copyright risk while still giving real, working
 * sound. Swapping in recorded audio files later just means changing
 * the implementation of `play()`; the `useSound()` API stays the same.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (typeof AudioContext === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (id: SoundId) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      switch (id) {
        case "click":
          osc.type = "square";
          osc.frequency.setValueAtTime(720, now);
          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.07);
          break;
        case "hover":
          osc.type = "sine";
          osc.frequency.setValueAtTime(950, now);
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
        case "transition":
          osc.type = "sine";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(660, now + 0.35);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.42);
          break;
        case "unlock":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.setValueAtTime(660, now + 0.09);
          osc.frequency.setValueAtTime(880, now + 0.18);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
      }
    },
    [enabled, getCtx]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        const ctx = getCtx();
        if (ctx && ctx.state === "suspended") void ctx.resume();
      }
      return next;
    });
  }, [getCtx]);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    return { enabled: false, toggle: () => {}, play: () => {} };
  }
  return ctx;
}
