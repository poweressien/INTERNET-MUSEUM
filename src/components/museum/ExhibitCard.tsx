"use client";

import { useRef } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Exhibit } from "@/types";
import { CornerBrackets, PlaqueLabel } from "./primitives";
import { useSound } from "@/lib/useSound";

interface ExhibitCardProps {
  exhibit: Exhibit;
  index: number;
  visited: boolean;
  onOpen: (id: string) => void;
}

export function ExhibitCard({ exhibit, index, visited, onOpen }: ExhibitCardProps) {
  const { play } = useSound();
  const rotateXMv = useMotionValue(0);
  const rotateYMv = useMotionValue(0);
  const rotateX = useSpring(rotateXMv, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rotateYMv, { stiffness: 220, damping: 22 });

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateYMv.set((px - 0.5) * 8);
    rotateXMv.set((0.5 - py) * 8);
  }
  function handleMouseLeave() {
    rotateXMv.set(0);
    rotateYMv.set(0);
  }

  const glowStyle = { "--glow-color": exhibit.accent } as CSSProperties;

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        play("click");
        onOpen(exhibit.id);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900, ...glowStyle }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="focus-ring group relative flex flex-col overflow-hidden rounded-sm border border-shell-line bg-shell-surface p-4 text-left shadow-plaque transition-shadow duration-300 hover:shadow-glow"
      aria-label={`Open the ${exhibit.name} exhibit, ${exhibit.eraLabel}`}
    >
      <CornerBrackets color={`${exhibit.accent}99`} size={12} inset={6} />

      <div className="mb-3 flex items-center justify-between">
        <PlaqueLabel>
          N&deg;{String(index + 1).padStart(2, "0")} &middot; {exhibit.eraLabel}
        </PlaqueLabel>
        {visited && (
          <span className="flex items-center gap-1 text-shell-verdigris" aria-label="Visited">
            <CheckCircle2 size={13} />
          </span>
        )}
      </div>

      <ExhibitPreview exhibit={exhibit} />

      <h3 className="mt-4 font-display text-xl font-semibold text-shell-paper">{exhibit.name}</h3>
      <p className="mt-2 font-curator text-sm leading-relaxed text-shell-paper/60">
        {exhibit.shortDescription}
      </p>

      <div className="mt-4 flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wide text-shell-brass">
        Explore exhibit
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.button>
  );
}

function ExhibitPreview({ exhibit }: { exhibit: Exhibit }) {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-sm border border-shell-line/60 bg-shell-raised sm:h-36">
      <div className="flex h-6 items-center gap-1.5 border-b border-shell-line/60 bg-black/20 px-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-shell-paper/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-shell-paper/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-shell-paper/20" />
        <span className="ml-2 h-2 flex-1 rounded-full" style={{ backgroundColor: `${exhibit.accent}33` }} />
      </div>
      <div className="p-3">
        <PreviewContent exhibit={exhibit} />
      </div>
    </div>
  );
}

function PreviewContent({ exhibit }: { exhibit: Exhibit }) {
  const accent = exhibit.accent;

  switch (exhibit.id) {
    case "google": {
      const letters = ["#3B78C2", "#D64545", "#E0A930", "#3B78C2", "#3F9C5D", "#D64545"];
      return (
        <div className="flex h-20 flex-col items-center justify-center gap-2.5 bg-white">
          <div className="flex text-lg font-bold tracking-tight">
            {"Google".split("").map((l, i) => (
              <span key={i} style={{ color: letters[i] }}>
                {l}
              </span>
            ))}
          </div>
          <div className="h-4 w-24 rounded-full border border-neutral-300" />
        </div>
      );
    }
    case "geocities":
      return (
        <div
          className="relative h-20 overflow-hidden rounded-[2px]"
          style={{
            backgroundColor: "#c9c9f5",
            backgroundImage: "repeating-conic-gradient(#b8b8ef 0% 25%, #c9c9f5 0% 50%)",
            backgroundSize: "10px 10px",
          }}
        >
          <div className="absolute left-1.5 top-1.5 right-1.5 rounded-sm bg-white/90 px-1.5 py-1 text-center text-[7px] font-bold text-[#5B3FA0]">
            Welcome!!!
          </div>
          <div
            className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 bg-[#FFE24B] px-1.5 py-0.5 text-[6px] font-bold uppercase text-black"
            style={{ transform: "rotate(-3deg)" }}
          >
            Under Construction
          </div>
        </div>
      );
    case "myspace":
      return (
        <div className="flex h-20 flex-col justify-between bg-[#14101F] p-1.5">
          <div className="bg-gradient-to-r from-[#D6529A] via-[#E0A930] to-[#4C6FD1] bg-clip-text text-center text-[11px] font-extrabold italic text-transparent">
            xXx_Alex_xXx
          </div>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-[2px] bg-white/10" />
            ))}
          </div>
        </div>
      );
    case "youtube":
      return (
        <div className="flex h-20 flex-col justify-between">
          <div className="flex flex-1 items-center justify-center rounded-[2px] bg-neutral-900">
            <div className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <div className="h-1.5 w-16 rounded-full bg-neutral-300" />
            <span className="rounded-full bg-[#C23B3B] px-1.5 py-0.5 text-[6px] font-bold text-white">
              Subscribe
            </span>
          </div>
        </div>
      );
    case "facebook":
      return (
        <div className="h-20 overflow-hidden rounded-[2px] bg-[#DCEBFB]">
          <div className="h-4 bg-gradient-to-b from-[#6D8BC4] to-[#3B5998]" />
          <div className="m-1.5 space-y-1 rounded-[2px] bg-white p-1.5">
            <div className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 shrink-0 rounded-[1px] bg-[#EFF6FE]" />
              <span className="h-1 w-full rounded-full bg-[#3B5998]/30" />
            </div>
            <div className="h-1 w-4/5 rounded-full bg-neutral-200" />
            <div className="h-1 w-3/5 rounded-full bg-neutral-200" />
          </div>
        </div>
      );
    case "twitter":
      return (
        <div className="flex h-20 flex-col gap-1.5 rounded-[2px] bg-[#F5FAFC] p-1.5">
          <div className="rounded-sm border border-[#D2E8EF] bg-white px-1.5 py-1 text-[6px] text-[#8DA0BD]">
            What are you doing?
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="h-2 w-2 shrink-0 rounded-[1px] bg-[#DCEBFB]" />
              <span className="h-1 flex-1 rounded-full bg-[#5FA9E0]/25" />
            </div>
          ))}
        </div>
      );
    case "iphone":
      return (
        <div className="flex h-20 items-center justify-center bg-[#111213]">
          <div className="grid h-14 w-9 grid-cols-3 content-start gap-[3px] rounded-[6px] border border-white/25 p-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="aspect-square rounded-[1.5px]" style={{ backgroundColor: `${accent}${i % 2 === 0 ? "AA" : "55"}` }} />
            ))}
          </div>
        </div>
      );
    case "android":
      return (
        <div className="flex h-20 items-center justify-center bg-[#0f1210]">
          <div className="flex h-14 w-9 flex-col gap-1 rounded-[4px] border border-white/25 p-1">
            <span className="h-2.5 w-full rounded-[1.5px] bg-white/10" />
            <div className="grid flex-1 grid-cols-3 gap-[3px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="rounded-[1.5px]" style={{ backgroundColor: `${accent}${i % 2 === 0 ? "AA" : "55"}` }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "gmail":
      return (
        <div className="flex h-20 flex-col gap-1.5 bg-white p-1.5">
          <div className="flex items-baseline gap-2 text-[10px] font-bold">
            <span style={{ color: "#3B78C2" }}>G</span>
            <span style={{ color: "#D64545" }}>m</span>
            <span style={{ color: "#E0A930" }}>a</span>
            <span style={{ color: "#3B78C2" }}>i</span>
            <span style={{ color: "#3F9C5D" }}>l</span>
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-1.5 border-t border-neutral-100 pt-1.5 first:border-t-0 first:pt-0">
              <span className="h-1.5 w-1.5 shrink-0 rounded-[1px] border border-neutral-300" />
              <span className="h-1 flex-1 rounded-full bg-neutral-200" />
            </div>
          ))}
        </div>
      );
    case "yahoo":
      return (
        <div className="flex h-20 flex-col items-center justify-center gap-2 bg-white">
          <span className="text-sm font-extrabold italic" style={{ color: "#7B0099" }}>
            YAHOO!
          </span>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-1.5 w-3 rounded-[1px]" style={{ backgroundColor: "#7B009933" }} />
            ))}
          </div>
        </div>
      );
    default:
      return <GenericPreview exhibit={exhibit} />;
  }
}

/** Fallback preview for any future exhibit that doesn't have a bespoke mockup yet. */
function GenericPreview({ exhibit }: { exhibit: Exhibit }) {
  const accent = exhibit.accent;
  return (
    <div className="flex h-20 gap-2">
      <div className="h-full w-10 rounded-sm" style={{ backgroundColor: `${accent}30` }} />
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {[0.85, 0.65, 0.5].map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full"
            style={{ width: `${w * 100}%`, backgroundColor: `${accent}${i === 0 ? "55" : "28"}` }}
          />
        ))}
      </div>
    </div>
  );
}
