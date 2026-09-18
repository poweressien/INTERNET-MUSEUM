"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { EXHIBITS } from "@/data/exhibits";
import { BADGES } from "@/data/badges";
import { Badge } from "./Badge";
import type { PassportState } from "@/types";
import { cn } from "@/lib/utils";

interface MuseumPassportProps {
  open: boolean;
  onClose: () => void;
  state: PassportState;
}

export function MuseumPassport({ open, onClose, state }: MuseumPassportProps) {
  const visitedCount = state.visitedExhibits.length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label="Museum passport"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-shell-line bg-shell-ink"
          >
            <div className="flex items-center justify-between border-b border-shell-line px-5 py-4">
              <div>
                <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-shell-brass">
                  Internet Museum
                </p>
                <h2 className="font-display text-lg font-semibold text-shell-paper">Passport</h2>
              </div>
              <button
                onClick={onClose}
                className="focus-ring rounded-sm p-1.5 text-shell-paper/60 transition-colors hover:text-shell-paper"
                aria-label="Close passport"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <p className="font-curator text-sm text-shell-paper/60">
                {visitedCount} of {EXHIBITS.length} exhibits visited
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-shell-line">
                <motion.div
                  className="h-full bg-shell-brass"
                  animate={{ width: `${(visitedCount / EXHIBITS.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <ul className="mt-5 space-y-2">
                {EXHIBITS.map((exhibit) => {
                  const visited = state.visitedExhibits.includes(exhibit.id);
                  return (
                    <li key={exhibit.id} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border",
                          visited ? "border-shell-brass bg-shell-brass text-shell-ink" : "border-shell-line"
                        )}
                        aria-hidden
                      >
                        {visited && <Check size={11} strokeWidth={3} />}
                      </span>
                      <span className={visited ? "text-shell-paper" : "text-shell-paper/40"}>
                        {exhibit.name} <span className="text-shell-paper/35">{exhibit.eraLabel}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <h3 className="mt-8 font-display text-xs font-bold uppercase tracking-wide text-shell-paper/50">
                Badges ({state.unlockedBadges.length}/{BADGES.length})
              </h3>
              <div className="mt-3 space-y-2">
                {BADGES.map((badge) => (
                  <Badge key={badge.id} badge={badge} unlocked={state.unlockedBadges.includes(badge.id)} />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
