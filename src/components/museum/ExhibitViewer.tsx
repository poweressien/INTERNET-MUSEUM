"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { getExhibitById } from "@/data/exhibits";
import { RECONSTRUCTIONS } from "@/reconstructions";
import { useSound } from "@/lib/useSound";

interface ExhibitViewerProps {
  exhibitId: string | null;
  onClose: () => void;
  onFindEasterEgg: () => void;
}

export function ExhibitViewer({ exhibitId, onClose, onFindEasterEgg }: ExhibitViewerProps) {
  const { play } = useSound();
  const exhibit = exhibitId ? getExhibitById(exhibitId) : undefined;
  const Reconstruction = exhibitId ? RECONSTRUCTIONS[exhibitId] : undefined;

  useEffect(() => {
    if (!exhibitId) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [exhibitId, onClose]);

  return (
    <AnimatePresence>
      {exhibit && Reconstruction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-shell-ink"
          role="dialog"
          aria-modal="true"
          aria-label={`${exhibit.name} exhibit reconstruction`}
        >
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-shell-line bg-shell-ink px-4 sm:px-6">
            <div className="flex items-baseline gap-2 overflow-hidden">
              <span className="truncate font-display text-sm font-semibold text-shell-paper">
                {exhibit.name}
              </span>
              <span className="hidden font-display text-xs text-shell-paper/45 sm:inline">
                {exhibit.eraLabel}
              </span>
            </div>
            <button
              onClick={() => {
                play("click");
                onClose();
              }}
              className="focus-ring flex items-center gap-1.5 rounded-sm px-2 py-1 font-display text-xs text-shell-paper/70 transition-colors hover:text-shell-paper"
              aria-label="Close exhibit and return to the museum"
            >
              <X size={16} />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="min-h-0 flex-1 overflow-y-auto"
          >
            <Reconstruction onFindEasterEgg={onFindEasterEgg} />
          </motion.div>

          <div className="shrink-0 border-t border-shell-line bg-shell-ink px-4 py-2 text-center text-[10px] leading-relaxed text-shell-paper/35 sm:px-6">
            Original museum recreation for educational and archival purposes — not affiliated with or
            endorsed by {exhibit.name}.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
