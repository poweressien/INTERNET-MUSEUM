"use client";

import { useState } from "react";
import { getEraBySlug } from "@/data/eras";
import { DESIGN_AESTHETICS } from "@/data/designAesthetics";
import { SectionHeading } from "./primitives";
import { EraButton, EraPanel } from "./EraPrimitives";
import { eraCssVars, fontClassFor, hasEffect } from "@/lib/theme";
import { useSound } from "@/lib/useSound";
import { cn } from "@/lib/utils";

export function DesignArchive() {
  const [activeId, setActiveId] = useState(DESIGN_AESTHETICS[0].id);
  const { play } = useSound();
  const active = DESIGN_AESTHETICS.find((a) => a.id === activeId) ?? DESIGN_AESTHETICS[0];
  const theme = getEraBySlug(active.themeRef) ?? getEraBySlug("2007")!;

  return (
    <section className="bg-shell-ink px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Style History"
          title="Design Archive"
          description="Six aesthetics that defined how the web has looked and felt — pick one to see the museum borrow its visual language."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {DESIGN_AESTHETICS.map((aesthetic) => (
            <button
              key={aesthetic.id}
              onClick={() => {
                play("click");
                setActiveId(aesthetic.id);
              }}
              className={cn(
                "focus-ring rounded-full border px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide transition-colors",
                aesthetic.id === activeId
                  ? "border-shell-brass bg-shell-brass text-shell-ink"
                  : "border-shell-line text-shell-paper/60 hover:text-shell-paper"
              )}
              aria-pressed={aesthetic.id === activeId}
            >
              {aesthetic.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-display text-sm font-semibold text-shell-brass">{active.years}</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-shell-paper">{active.name}</h3>
            <p className="mt-3 font-curator text-base leading-relaxed text-shell-paper/65">
              {active.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {active.traits.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full border border-shell-line px-3 py-1 text-xs text-shell-paper/60"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{ ...eraCssVars(theme), backgroundColor: "var(--era-bg)" }}
            className={cn(
              "relative overflow-hidden rounded-sm border border-shell-line p-8 transition-colors duration-700",
              hasEffect(theme, "tiled-bg") && "effect-tiled-bg",
              hasEffect(theme, "scanlines") && "effect-scanlines",
              hasEffect(theme, "grain") && "effect-grain"
            )}
          >
            <div className="relative z-10 flex flex-col items-start gap-4">
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide",
                  fontClassFor(theme.font.body)
                )}
                style={{ color: "var(--era-muted)" }}
              >
                Live style demo
              </span>
              <EraPanel theme={theme} className="w-full p-4">
                <p
                  className={cn("text-sm font-semibold", fontClassFor(theme.font.heading))}
                  style={{ color: "var(--era-fg)" }}
                >
                  A card, in this aesthetic
                </p>
                <p
                  className={cn("mt-1 text-xs", fontClassFor(theme.font.body))}
                  style={{ color: "var(--era-muted)" }}
                >
                  Typography, radius and shadow all follow {active.name.toLowerCase()}.
                </p>
              </EraPanel>
              <EraButton theme={theme} variant="primary">
                Sample button
              </EraButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
