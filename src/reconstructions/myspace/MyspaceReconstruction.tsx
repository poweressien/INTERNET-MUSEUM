"use client";

import { useState } from "react";
import { Pause, Play, UserRound } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";
import { useSound } from "@/lib/useSound";

const ERAS = [
  { id: "2004", label: "2004" },
  { id: "2006", label: "2006" },
  { id: "2013", label: "2013" },
] as const;
type MsEra = (typeof ERAS)[number]["id"];

const NOTES: Record<MsEra, string> = {
  "2004": "In its first year, profiles were still fairly plain — full CSS customization is what made the next couple of years so chaotic.",
  "2006": "By 2006 MySpace was briefly the most-visited site in the US, and profile pages had become an arms race of glitter text and autoplay music.",
  "2013": "After Justin Timberlake and Specific Media bought the struggling site in 2011, the 2013 relaunch abandoned customization entirely for a sleek, music-first, almost Pinterest-like design.",
};

const TOP_8 = ["xXShadowXx", "glitter_babe", "punkrock_sam", "moonlight22", "the_real_jc", "skaterboi", "emoqueen", "cool_kid_99"];

const COMMENTS = [
  { author: "glitter_babe", color: "#D6529A", font: "font-era-trebuchet", text: "omg your page is soooo cute!! <3<3" },
  { author: "punkrock_sam", color: "#3F9C5D", font: "font-era-retro", text: "haha last night was wild, comment me back" },
  { author: "xXShadowXx", color: "#4C6FD1", font: "font-era-sys", text: "thanks for the add, we should hang out sometime" },
];

function EarlyEra() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-6">
      <div className="rounded border border-[#B9C6E0] bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded border border-[#B9C6E0] bg-[#EEF2FB] text-[#5D7392]">
            <UserRound size={30} />
          </div>
          <div>
            <p className="font-bold text-[#22346B]">Alex, 22</p>
            <p className="text-xs text-[#5D7392]">Uyo, Nigeria</p>
          </div>
        </div>
        <h2 className="mt-4 text-sm font-bold text-[#22346B]">About Me</h2>
        <p className="mt-1 text-sm text-[#333]">just here to meet people and keep in touch with friends from school.</p>
        <h2 className="mt-4 text-sm font-bold text-[#22346B]">Friends</h2>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {TOP_8.slice(0, 4).map((name) => (
            <div key={name} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded border border-[#DCE3F2] bg-[#EEF2FB] text-[#5D7392]">
                <UserRound size={16} />
              </div>
              <p className="mt-1 truncate text-[9px] text-[#5D7392]">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChaosEra() {
  const [playing, setPlaying] = useState(false);
  const { play } = useSound();

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 pt-5 sm:grid-cols-[220px_1fr] sm:px-6">
      <div className="space-y-4">
        <div className="rounded border-2 border-[#D6529A] bg-[#14101F] p-3">
          <div className="flex h-32 items-center justify-center rounded border border-white/10 bg-[#1E1830]">
            <UserRound size={52} className="text-[#8A7FB5]" />
          </div>
          <p className="mt-2 text-center text-sm font-bold text-[#E0A930]">Alex, 22</p>
          <p className="text-center text-xs text-[#8A7FB5]">Uyo, Nigeria</p>
          <p className="mt-1 text-center text-xs text-[#4CD9C0]">Mood: nostalgic ✧</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-[#4CD9C0]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4CD9C0]" /> Online Now!
          </p>
        </div>

        <div className="rounded border-2 border-[#4C6FD1] bg-[#14101F] p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#4C6FD1]">Now Playing</p>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={() => {
                play(playing ? "click" : "unlock");
                setPlaying((p) => !p);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4C6FD1] text-white"
              aria-label={playing ? "Pause profile song" : "Play profile song"}
            >
              {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            <p className="text-xs italic text-[#B9B0DD]">
              {playing ? "♪ now playing — an original chiptune, synthesized live ♪" : "profile song, paused"}
            </p>
          </div>
        </div>

        <div className="rounded border-2 border-[#E0A930] bg-[#14101F] p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[#E0A930]">Alex&apos;s Top 8</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {TOP_8.map((name) => (
              <div key={name} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-[#1E1830] text-[#8A7FB5]">
                  <UserRound size={18} />
                </div>
                <p className="mt-1 truncate text-[9px] text-[#B9B0DD]">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded border-2 border-white/10 bg-[#14101F] p-4">
          <h2 className="text-sm font-bold text-[#D6529A]">About Me</h2>
          <p className="mt-1 text-sm leading-relaxed text-[#CFC7EA]">
            heyyy welcome to my page! into music, hanging with friends, and making this profile look as
            extra as possible lol. add me if we know each other!!
          </p>
          <h2 className="mt-4 text-sm font-bold text-[#4C6FD1]">Who I&apos;d Like to Meet</h2>
          <p className="mt-1 text-sm leading-relaxed text-[#CFC7EA]">
            anyone who still remembers dial-up and doesn&apos;t take life too seriously.
          </p>
        </div>

        <div className="rounded border-2 border-white/10 bg-[#14101F] p-4">
          <h2 className="text-sm font-bold text-[#E0A930]">Comments ({COMMENTS.length})</h2>
          <ul className="mt-3 space-y-3">
            {COMMENTS.map((c, i) => (
              <li key={i} className="border-b border-white/10 pb-3">
                <p className={`${c.font} text-sm font-bold`} style={{ color: c.color }}>{c.author}</p>
                <p className={`${c.font} mt-0.5 text-sm text-[#CFC7EA]`}>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RelaunchEra() {
  return (
    <div className="bg-[#0A0A0C] text-white">
      <div className="flex h-64 flex-col items-center justify-end bg-gradient-to-b from-[#2a2a35] to-[#0A0A0C] px-4 pb-6 text-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#8B7CF6] to-[#4C6FD1]" />
        <p className="mt-3 font-display text-xl font-semibold">Alex Morgan</p>
        <p className="text-xs uppercase tracking-widest text-white/40">Artist &middot; Uyo</p>
      </div>
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-4">
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
          <Play size={14} fill="currentColor" />
        </button>
        <div className="h-1 flex-1 rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-white/70" />
        </div>
        <span className="text-[10px] text-white/40">1:12 / 3:40</span>
      </div>
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-4 pb-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-square rounded-md bg-gradient-to-br from-white/10 to-white/[0.02]" />
        ))}
      </div>
    </div>
  );
}

export function MyspaceReconstruction() {
  const [era, setEra] = useState<MsEra>("2006");
  const dark = era !== "2004";

  return (
    <div className={dark ? "relative min-h-full bg-[#0B0B14] pb-16 font-era-trebuchet text-[#E9E4F5]" : "relative min-h-full bg-[#EEF2FB] pb-16 font-era-trebuchet text-[#22346B]"}>
      <ReconstructionBadge label={`MySpace, ${era}`} />

      {era === "2006" && (
        <div
          className="h-2 w-full"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #D6529A 0 12px, #4C6FD1 12px 24px)" }}
          aria-hidden
        />
      )}

      <header className={era === "2004" ? "border-b border-[#B9C6E0] bg-white px-4 py-3 text-center sm:px-8" : "border-b border-white/10 bg-[#14101F] px-4 py-3 text-center sm:px-8"}>
        {era === "2006" ? (
          <span
            className="bg-gradient-to-r from-[#D6529A] via-[#E0A930] to-[#4C6FD1] bg-clip-text text-2xl font-extrabold italic text-transparent"
            style={{ fontFamily: "Georgia, serif" }}
          >
            xXx_Alex&apos;s Space_xXx
          </span>
        ) : (
          <span className={era === "2004" ? "text-xl font-bold text-[#22346B]" : "font-display text-xl font-semibold tracking-wide text-white"}>
            myspace
          </span>
        )}
        <div className="mt-3">
          <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as MsEra)} accent="#D6529A" variant={era === "2004" ? "light" : "dark"} />
        </div>
      </header>

      {era === "2004" && <EarlyEra />}
      {era === "2006" && <ChaosEra />}
      {era === "2013" && <RelaunchEra />}

      <p className={era === "2004" ? "mx-auto mt-8 max-w-md px-4 text-center text-xs leading-relaxed text-[#5D7392]" : "mx-auto mt-8 max-w-md px-4 text-center text-xs leading-relaxed text-white/40"}>
        {NOTES[era]}
      </p>
    </div>
  );
}
