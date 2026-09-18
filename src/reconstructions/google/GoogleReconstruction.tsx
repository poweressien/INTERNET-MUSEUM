"use client";

import { useState } from "react";
import { Camera, Mic, Search } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

const LETTER_COLORS = ["#3B78C2", "#D64545", "#E0A930", "#3B78C2", "#3F9C5D", "#D64545"];

const ERAS = [
  { id: "1998", label: "1998" },
  { id: "2002", label: "2002" },
  { id: "2010", label: "2010" },
  { id: "today", label: "Today" },
] as const;
type GoogleEra = (typeof ERAS)[number]["id"];

const NOTES: Record<GoogleEra, string> = {
  "1998": "Launch homepage — one box, almost nothing else. 25 million pages indexed, the entire web at the time.",
  "2002": "Image Search (2001) and Groups (via the Deja News acquisition, 2001) added their own tabs above the box.",
  "2010": "A black utility bar spans the top for the first time, and Google Instant starts predicting your query as you type.",
  today: "A rounded search pill with voice and visual search, an account avatar, and an apps grid — the search box became an assistant.",
};

function Wordmark({ size = "text-6xl sm:text-7xl" }: { size?: string }) {
  return (
    <div className={`flex select-none items-baseline ${size} tracking-tight`}>
      {"Google".split("").map((letter, i) => (
        <span key={i} style={{ color: LETTER_COLORS[i] }}>
          {letter}
        </span>
      ))}
    </div>
  );
}

export function GoogleReconstruction() {
  const [era, setEra] = useState<GoogleEra>("1998");
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex min-h-full flex-col items-center bg-white px-4 pb-10 pt-24 font-era-retro text-black sm:pt-28">
      <ReconstructionBadge label={`Google, ${era === "today" ? "today" : era}`} />

      <div className="w-full">
        <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as GoogleEra)} accent="#3B78C2" />
      </div>

      {era === "today" && (
        <div className="mt-4 flex w-full items-center justify-end gap-4 px-4 text-xs text-neutral-500 sm:px-10">
          <span>Gmail</span>
          <span>Images</span>
          <div className="grid h-6 w-6 grid-cols-3 gap-[2px]" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-neutral-400" />
            ))}
          </div>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#3B78C2] to-[#3F9C5D]" />
        </div>
      )}

      {era === "2010" && (
        <div className="mt-4 flex w-full items-center gap-5 bg-[#2D2D2D] px-6 py-2 text-xs text-white/90">
          <span className="border-b-2 border-white pb-1">Web</span>
          <span>Images</span>
          <span>Videos</span>
          <span>Maps</span>
          <span>News</span>
          <span>Shopping</span>
          <span>Gmail</span>
          <span>more ▾</span>
          <span className="ml-auto">Sign in</span>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center">
        <Wordmark />

        {era === "2002" && (
          <div className="mt-4 flex gap-4 text-sm" style={{ color: "#3B78C2" }}>
            <span className="border-b-2 border-[#3B78C2] pb-0.5 font-medium text-black">Web</span>
            <span className="hover:underline">Images</span>
            <span className="hover:underline">Groups</span>
            <span className="hover:underline">Directory</span>
          </div>
        )}

        <div className="relative mt-6 w-full max-w-md px-2">
          {era === "today" ? (
            <div className="flex h-11 items-center gap-3 rounded-full border border-neutral-300 px-4 shadow-[0_1px_6px_rgba(32,33,36,0.18)]">
              <Search size={16} className="text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
                className="h-full flex-1 border-none text-sm outline-none"
              />
              <Mic size={16} className="text-[#3B78C2]" />
              <Camera size={16} className="text-[#3B78C2]" />
            </div>
          ) : (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
              className="h-9 w-full rounded-sm border border-neutral-400 px-3 text-base shadow-[1px_1px_0_rgba(0,0,0,0.08)] focus:border-blue-500 focus:outline-none"
            />
          )}
          {era === "2010" && query && (
            <ul className="absolute inset-x-2 top-full mt-1 rounded-b-sm border border-t-0 border-neutral-300 bg-white text-left text-sm shadow-md">
              {[`${query} definition`, `${query} news`, `${query} near me`].map((s) => (
                <li key={s} className="px-3 py-1.5 text-neutral-600 hover:bg-neutral-100">
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            className={
              era === "today"
                ? "rounded-md bg-neutral-100 px-4 py-1.5 text-sm text-neutral-700 hover:shadow-sm"
                : "rounded-sm border border-neutral-300 bg-neutral-100 px-4 py-1.5 text-sm text-neutral-800 hover:border-neutral-400 active:bg-neutral-200"
            }
          >
            Google Search
          </button>
          <button
            className={
              era === "today"
                ? "rounded-md bg-neutral-100 px-4 py-1.5 text-sm text-neutral-700 hover:shadow-sm"
                : "rounded-sm border border-neutral-300 bg-neutral-100 px-4 py-1.5 text-sm text-neutral-800 hover:border-neutral-400 active:bg-neutral-200"
            }
          >
            I&apos;m Feeling Lucky
          </button>
        </div>

        {era === "1998" && (
          <nav className="mt-16 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs">
            <a className="hover:underline" style={{ color: "#0000EE" }} href="#" onClick={(e) => e.preventDefault()}>
              About Google
            </a>
            <a className="hover:underline" style={{ color: "#0000EE" }} href="#" onClick={(e) => e.preventDefault()}>
              Advertising Programs
            </a>
            <a className="hover:underline" style={{ color: "#0000EE" }} href="#" onClick={(e) => e.preventDefault()}>
              Business Solutions
            </a>
          </nav>
        )}
      </div>

      <p className="mt-6 max-w-md text-center text-xs leading-relaxed text-neutral-400">{NOTES[era]}</p>

      <p className="mt-6 text-center text-[11px] text-neutral-400">
        Museum reconstruction — not affiliated with Google LLC.
      </p>
    </div>
  );
}
