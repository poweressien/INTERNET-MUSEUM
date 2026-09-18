"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { EraTheme } from "@/types";
import { eraCssVars, fontClassFor, hasEffect } from "@/lib/theme";
import { EraButton } from "./EraPrimitives";
import { useSound } from "@/lib/useSound";
import { cn } from "@/lib/utils";

interface EraShowcaseProps {
  theme: EraTheme;
}

export function EraShowcase({ theme }: EraShowcaseProps) {
  const { play } = useSound();

  return (
    <section
      style={{ ...eraCssVars(theme), backgroundColor: "var(--era-bg)", color: "var(--era-fg)" }}
      className={cn(
        "relative overflow-hidden px-4 py-16 transition-colors duration-700 sm:px-6 sm:py-24",
        hasEffect(theme, "tiled-bg") && "effect-tiled-bg",
        hasEffect(theme, "scanlines") && "effect-scanlines",
        hasEffect(theme, "grain") && "effect-grain"
      )}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <p
              className={cn("text-sm font-medium uppercase tracking-[0.3em]", fontClassFor(theme.font.body))}
              style={{ color: "var(--era-accent)" }}
            >
              {theme.year}
            </p>
            <h2
              className={cn(
                "mt-4 text-4xl font-bold sm:text-5xl md:text-6xl",
                fontClassFor(theme.font.heading)
              )}
            >
              {theme.name}
            </h2>
            <p
              className={cn("mx-auto mt-6 max-w-2xl text-lg italic sm:text-xl", fontClassFor(theme.font.body))}
              style={{ color: "var(--era-muted)" }}
            >
              &ldquo;{theme.tagline}&rdquo;
            </p>
            <p
              className={cn(
                "mx-auto mt-5 max-w-2xl text-sm leading-relaxed opacity-85 sm:text-base",
                fontClassFor(theme.font.body)
              )}
            >
              {theme.description}
            </p>
            <div className="mt-8 flex justify-center">
              <EraButton
                theme={theme}
                variant="primary"
                onClick={() => {
                  play("click");
                  document.getElementById("exhibits")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Browse {theme.year} exhibits
              </EraButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
