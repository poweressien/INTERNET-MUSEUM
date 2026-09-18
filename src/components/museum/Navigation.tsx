"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookMarked, Menu, X } from "lucide-react";
import type { MuseumView } from "@/types";
import { useSound } from "@/lib/useSound";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeView: MuseumView;
  onNavigate: (view: MuseumView) => void;
  onOpenPassport: () => void;
  badgeCount: number;
}

const NAV_ITEMS: { view: MuseumView; label: string }[] = [
  { view: "lobby", label: "Exhibits" },
  { view: "lost-internet", label: "Lost Internet" },
  { view: "design-archive", label: "Design Archive" },
];

export function Navigation({ activeView, onNavigate, onOpenPassport, badgeCount }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { play } = useSound();

  const handleNavigate = (view: MuseumView) => {
    play("click");
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-shell-line/70 bg-shell-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavigate("lobby")}
          className="focus-ring flex items-center gap-2 rounded-sm"
          aria-label="Internet Museum — go to lobby"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-shell-brass/60 font-display text-xs font-bold text-shell-brass">
            IM
          </span>
          <span className="font-display text-sm font-semibold tracking-[0.14em] text-shell-paper">
            INTERNET MUSEUM
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Museum sections">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavigate(item.view)}
              className={cn(
                "focus-ring rounded-sm px-3 py-2 font-display text-sm transition-colors",
                activeView === item.view
                  ? "text-shell-brass"
                  : "text-shell-paper/65 hover:text-shell-paper"
              )}
              aria-current={activeView === item.view ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <SoundToggle />
          <button
            onClick={() => {
              play("click");
              onOpenPassport();
            }}
            className="focus-ring relative flex items-center gap-1.5 rounded-sm border border-shell-line px-2.5 py-1.5 text-shell-paper/80 transition-colors hover:border-shell-brass/60 hover:text-shell-paper"
            aria-label={`Open museum passport, ${badgeCount} badges unlocked`}
          >
            <BookMarked size={16} />
            <span className="hidden font-display text-xs sm:inline">Passport</span>
            {badgeCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-shell-brass text-[10px] font-bold text-shell-ink">
                {badgeCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="focus-ring rounded-sm p-2 text-shell-paper/80 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-shell-line/70 bg-shell-ink md:hidden"
            aria-label="Museum sections"
          >
            <div className="flex flex-col px-4 py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavigate(item.view)}
                  className={cn(
                    "focus-ring rounded-sm px-2 py-3 text-left font-display text-sm",
                    activeView === item.view ? "text-shell-brass" : "text-shell-paper/70"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
