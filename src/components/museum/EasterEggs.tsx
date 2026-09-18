"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Radio } from "lucide-react";
import { useKonamiCode } from "@/lib/useKonamiCode";
import { useSound } from "@/lib/useSound";

interface EasterEggsProps {
  browserErrorOpen: boolean;
  onCloseBrowserError: () => void;
}

export function EasterEggs({ browserErrorOpen, onCloseBrowserError }: EasterEggsProps) {
  const [lostInternetOpen, setLostInternetOpen] = useState(false);
  const { play } = useSound();

  useKonamiCode(() => {
    play("unlock");
    setLostInternetOpen(true);
  });

  useEffect(() => {
    if (!lostInternetOpen && !browserErrorOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLostInternetOpen(false);
        onCloseBrowserError();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lostInternetOpen, browserErrorOpen, onCloseBrowserError]);

  return (
    <>
      {/* A genuinely hidden link — nearly invisible until focused or hovered.
          Try the Konami code too: ↑ ↑ ↓ ↓ ← → ← → B A */}
      <a
        href="#lost-internet-secret"
        onClick={(e) => {
          e.preventDefault();
          play("unlock");
          setLostInternetOpen(true);
        }}
        className="fixed bottom-1 left-1 z-30 rounded-sm px-1 text-[8px] text-shell-ink opacity-[0.03] transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-1 focus-visible:outline-shell-brass"
      >
        you found it
      </a>

      <AnimatePresence>
        {lostInternetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="effect-grain effect-scanlines fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black px-6 text-center"
            role="dialog"
            aria-modal="true"
            aria-label="Secret discovery"
            onClick={() => setLostInternetOpen(false)}
          >
            <Radio className="mb-6 text-shell-verdigris" size={40} aria-hidden />
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-3xl font-bold tracking-tight text-shell-verdigris sm:text-5xl"
            >
              YOU FOUND THE LOST INTERNET
            </motion.h2>
            <p className="mt-4 max-w-md font-curator text-sm text-white/60">
              Somewhere between GeoCities and dial-up, a piece of the old web is still quietly running.
              Nobody remembers exactly where.
            </p>
            <p className="mt-8 font-display text-xs uppercase tracking-widest text-white/30">
              Click anywhere, or press Escape, to return
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {browserErrorOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
            role="alertdialog"
            aria-modal="true"
            aria-label="Simulated browser error"
          >
            <div className="w-full max-w-sm border-2 border-black bg-[#ECE9D8] font-era-sys text-black shadow-2xl">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#0A246A] to-[#3A6EA5] px-2 py-1 text-xs font-bold text-white">
                <span>Fatal Exception — Museum Browser</span>
                <button
                  onClick={onCloseBrowserError}
                  className="rounded-sm px-1.5 hover:bg-red-600"
                  aria-label="Close error dialog"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 text-sm">
                <p className="font-bold">This page has performed an illegal operation and will be shut down.</p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                  Just kidding — you clicked the Under Construction sign. Some things never finish
                  loading. That was rather the point.
                </p>
                <div className="mt-4 text-right">
                  <button
                    onClick={onCloseBrowserError}
                    className="border border-neutral-500 bg-neutral-200 px-4 py-1 text-xs shadow-bevel hover:bg-neutral-300"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
