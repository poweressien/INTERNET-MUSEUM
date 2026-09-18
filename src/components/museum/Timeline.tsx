"use client";

import { motion } from "framer-motion";
import { ERAS } from "@/data/eras";
import { useSound } from "@/lib/useSound";
import { cn } from "@/lib/utils";

interface TimelineProps {
  activeYear: number;
  onSelectYear: (year: number) => void;
}

export function Timeline({ activeYear, onSelectYear }: TimelineProps) {
  const { play } = useSound();

  return (
    <div
      className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto border-b border-shell-line/70 px-4 sm:justify-center sm:overflow-visible sm:px-0"
      role="tablist"
      aria-label="Select an internet era"
    >
      {ERAS.map((era) => {
        const active = era.year === activeYear;
        return (
          <button
            key={era.year}
            role="tab"
            aria-selected={active}
            onClick={() => {
              play("click");
              onSelectYear(era.year);
            }}
            className="focus-ring relative shrink-0 snap-center px-4 py-4 sm:px-7"
          >
            <span
              className={cn(
                "font-display text-base font-semibold tracking-tight transition-colors sm:text-lg",
                active ? "text-shell-brass" : "text-shell-paper/40 hover:text-shell-paper/75"
              )}
            >
              {era.year}
            </span>
            {active && (
              <motion.span
                layoutId="timeline-underline"
                className="absolute inset-x-3 bottom-0 h-[2px] bg-shell-brass"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
