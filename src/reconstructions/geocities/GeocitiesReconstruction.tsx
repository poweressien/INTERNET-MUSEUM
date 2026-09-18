"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

interface GeocitiesReconstructionProps {
  onFindEasterEgg?: () => void;
}

const ERAS = [
  { id: "1996", label: "1996" },
  { id: "1999", label: "1999" },
] as const;
type GcEra = (typeof ERAS)[number]["id"];

const NOTES: Record<GcEra, string> = {
  "1996": "GeoCities organized homepages into themed \"neighborhoods\" from early on — this is a simpler, less-decorated page, closer to what most people's first attempt looked like.",
  "1999": "Yahoo acquired GeoCities in 1999 for roughly $3.6 billion in stock, and Yahoo branding was added to every page — right as the site hit its all-time traffic peak.",
};

export function GeocitiesReconstruction({ onFindEasterEgg }: GeocitiesReconstructionProps) {
  const [era, setEra] = useState<GcEra>("1999");
  const [hits, setHits] = useState(era === "1996" ? 2140 : 48213);

  useEffect(() => {
    setHits(era === "1996" ? 2140 : 48213);
    const t = setTimeout(() => setHits((h) => h + 1), 400);
    return () => clearTimeout(t);
  }, [era]);

  return (
    <div
      className="relative min-h-full px-4 py-10 font-era-retro text-black sm:px-8"
      style={{
        backgroundColor: "#c9c9f5",
        backgroundImage: "repeating-conic-gradient(#b8b8ef 0% 25%, #c9c9f5 0% 50%)",
        backgroundSize: "24px 24px",
      }}
    >
      <ReconstructionBadge label={`GeoCities, ${era}`} />

      {era === "1999" && (
        <div className="mx-auto mb-2 flex max-w-2xl items-center gap-2 border-2 border-black bg-[#7B0099] px-3 py-1.5 text-xs font-bold text-white">
          <span>YAHOO! GeoCities</span>
          <span className="ml-auto font-normal opacity-80">now part of the Yahoo! network</span>
        </div>
      )}

      <div className="mx-auto max-w-2xl border-4 border-double border-[#5B3FA0] bg-white/95 p-5 pt-14 sm:pt-16">
        <div className="mb-4 flex justify-center">
          <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as GcEra)} accent="#5B3FA0" />
        </div>

        <h1 className="text-center text-3xl font-bold text-[#5B3FA0] text-blink">
          Welcome to Alex&apos;s Homepage!!!
        </h1>
        <p className="mt-1 text-center text-sm text-[#8A2BE2]">
          ~*~ SiliconValley / Neighborhood / {era === "1996" ? "812" : "4471"} ~*~
        </p>

        <hr className="my-4 border-t-2 border-dashed border-[#5B3FA0]" />

        <p className="text-sm leading-relaxed">
          Hi and welcome to my little corner of the web! This page is best viewed at{" "}
          <strong>800x600</strong> resolution with <strong>Netscape Navigator</strong>. Please sign my
          guestbook before you leave!! More updates coming soon, I promise :)
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onFindEasterEgg}
            className="flex items-center gap-1.5 border-2 border-black bg-[#FFE24B] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-black shadow-bevel"
            style={{ transform: "rotate(-2deg)" }}
          >
            <Sparkles size={12} /> Under Construction
          </button>
          <span className="border border-black bg-neutral-100 px-2 py-1 text-[10px] font-bold">
            Best Viewed In 800x600
          </span>
          <span className="border border-black bg-neutral-100 px-2 py-1 text-[10px] font-bold">Netscape Now!</span>
          {era === "1999" && (
            <span className="border border-black bg-neutral-100 px-2 py-1 text-[10px] font-bold">Web Ring &#8734;</span>
          )}
        </div>

        <div className="mt-5 flex flex-col items-center gap-1 text-xs">
          <span className="border border-black bg-black px-2 py-1 font-mono text-[#00FF66]">
            {String(hits).padStart(6, "0")}
          </span>
          <span className="text-neutral-500">visitors since {era === "1996" ? "1996" : "1997"}</span>
        </div>

        <p className="mt-5 text-center text-xs">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0000EE] underline">Sign my Guestbook</a>{" "}
          &middot;{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0000EE] underline">My Links Page</a>{" "}
          &middot;{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0000EE] underline">Email Me</a>
        </p>

        <p className="mt-6 text-center text-[11px] text-neutral-400">{NOTES[era]}</p>
      </div>
    </div>
  );
}
