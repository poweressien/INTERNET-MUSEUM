"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { LOST_PLATFORMS } from "@/data/historicalPlatforms";
import type { LostPlatform } from "@/types";
import { SectionHeading, PlaqueLabel } from "./primitives";

interface LostInternetProps {
  visitedIds: string[];
  onVisit: (id: string) => void;
  onOpenExhibit: (id: string) => void;
}

const CATEGORY_LABEL: Record<LostPlatform["category"], string> = {
  social: "Social network",
  productivity: "Productivity",
  messaging: "Messaging",
  "personal-web": "Personal web",
};

export function LostInternet({ visitedIds, onVisit, onOpenExhibit }: LostInternetProps) {
  return (
    <section className="relative bg-shell-ink px-4 py-20 transition-colors duration-500 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, rgba(76,140,134,0.08), transparent 45%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Digital Archaeology"
          title="The Lost Internet"
          description="Platforms that disappeared, shut down, or were transformed beyond recognition — preserved here the way they were at their peak."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOST_PLATFORMS.map((platform, i) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              onViewportEnter={() => onVisit(platform.id)}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.24) }}
              className="flex flex-col border border-shell-line bg-shell-surface/50 p-4 transition-colors duration-500"
            >
              <div className="flex items-center justify-between">
                <PlaqueLabel className="text-shell-verdigris">
                  {CATEGORY_LABEL[platform.category]}
                </PlaqueLabel>
                {visitedIds.includes(platform.id) && (
                  <span className="text-[10px] font-medium text-shell-verdigris">Catalogued</span>
                )}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-shell-paper">{platform.name}</h3>
              <p className="mt-0.5 font-display text-xs text-shell-paper/40">
                {platform.launchYear}–{platform.shutdownYear ?? "transformed"} · peak {platform.peakPeriod}
              </p>
              <p className="mt-3 font-curator text-sm leading-relaxed text-shell-paper/65">
                {platform.whatItWas}
              </p>
              <p className="mt-2 font-curator text-sm italic leading-relaxed text-shell-paper/45">
                {platform.whyItMattered}
              </p>

              {platform.fullReconstructionId && (
                <button
                  onClick={() => onOpenExhibit(platform.fullReconstructionId!)}
                  className="focus-ring mt-4 flex items-center gap-1.5 self-start font-display text-xs font-semibold text-shell-brass hover:underline"
                >
                  Visit the full reconstruction <ExternalLink size={12} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
