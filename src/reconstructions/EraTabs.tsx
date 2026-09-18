"use client";

import { getContrastText } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface EraTabsProps {
  eras: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  accent: string;
  variant?: "light" | "dark";
}

/** Shared version/year switcher used inside reconstructions that have more
 *  than one historical layout (Google, Facebook, Twitter, YouTube, MySpace). */
export function EraTabs({ eras, activeId, onChange, accent, variant = "light" }: EraTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Choose a year">
      {eras.map((era) => {
        const active = era.id === activeId;
        return (
          <button
            key={era.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(era.id)}
            style={
              active
                ? { backgroundColor: accent, color: getContrastText(accent), borderColor: accent }
                : undefined
            }
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              !active && variant === "light" && "border-black/15 text-black/50 hover:text-black/80",
              !active && variant === "dark" && "border-white/20 text-white/50 hover:text-white/80"
            )}
          >
            {era.label}
          </button>
        );
      })}
    </div>
  );
}
