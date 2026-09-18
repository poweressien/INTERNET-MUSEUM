"use client";

import { EXHIBITS } from "@/data/exhibits";
import { ExhibitCard } from "./ExhibitCard";
import { SectionHeading } from "./primitives";

interface ExhibitGridProps {
  visitedIds: string[];
  onOpenExhibit: (id: string) => void;
}

export function ExhibitGrid({ visitedIds, onOpenExhibit }: ExhibitGridProps) {
  return (
    <section id="exhibits" className="bg-shell-ink px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Main Gallery"
          title="The exhibits"
          description="Eight artifacts from the web's history — most rebuilt across several of their real versions, from launch through redesign to reinvention, with a year switcher inside each one, not just a single frozen screenshot."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXHIBITS.map((exhibit, i) => (
            <ExhibitCard
              key={exhibit.id}
              exhibit={exhibit}
              index={i}
              visited={visitedIds.includes(exhibit.id)}
              onOpen={onOpenExhibit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
