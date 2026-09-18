"use client";

import { useState } from "react";
import { Cloud, Mail, Newspaper, TrendingUp } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

const ERAS = [
  { id: "1995", label: "1995" },
  { id: "1998", label: "1998" },
  { id: "2003", label: "2003" },
  { id: "today", label: "Today" },
] as const;
type YahooEra = (typeof ERAS)[number]["id"];

const NOTES: Record<YahooEra, string> = {
  "1995": "It started in 1994 as \"Jerry and David's Guide to the World Wide Web\" — a hand-sorted list of links two Stanford students kept because they couldn't find anything otherwise.",
  "1998": "By 1998 the directory had a name, a logo, and a search box, but browsing the category tree was still how most people actually found things.",
  "2003": "The early-2000s portal model crammed Mail, Weather, Finance, Games and more onto one homepage — the theory being you'd never need to leave.",
  today: "As search and social took over the portal's old job, Yahoo's own homepage shrank back down toward something much closer to where it started.",
};

const CATEGORIES = ["Arts", "Business", "Computers", "Education", "Entertainment", "Government", "News", "Recreation", "Reference", "Regional", "Science", "Society"];

export function YahooReconstruction() {
  const [era, setEra] = useState<YahooEra>("1998");

  return (
    <div className="relative min-h-full bg-white font-era-sys text-[#1a1a1a]">
      <ReconstructionBadge label={`Yahoo, ${era === "today" ? "today" : era}`} />

      <header className="border-b border-neutral-200 px-4 pt-16 pb-4 text-center sm:px-8 sm:pt-20">
        {era === "1995" ? (
          <p className="text-lg font-bold text-[#5B0BA1]">Jerry and David&apos;s Guide to the World Wide Web</p>
        ) : (
          <p className="text-3xl font-extrabold italic tracking-tight" style={{ color: "#7B0099" }}>
            YAHOO!
          </p>
        )}
        <div className="mt-4 flex justify-center">
          <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as YahooEra)} accent="#7B0099" />
        </div>
        {era !== "1995" && (
          <div className="mx-auto mt-4 flex max-w-sm items-center gap-2">
            <input
              aria-label="Search Yahoo"
              className="h-8 flex-1 rounded-sm border border-neutral-400 px-2 text-sm focus:outline-none"
            />
            <button className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs">
              Search
            </button>
          </div>
        )}
      </header>

      {era === "1995" && (
        <div className="mx-auto max-w-md px-4 py-8">
          <ul className="space-y-1 text-sm" style={{ color: "#0000EE" }}>
            {CATEGORIES.map((c) => (
              <li key={c}>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">
                  {c}/
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {era === "1998" && (
        <div className="mx-auto max-w-xl px-4 py-6">
          <div className="grid grid-cols-3 gap-3 text-center text-xs sm:grid-cols-4" style={{ color: "#0000EE" }}>
            {CATEGORIES.map((c) => (
              <a key={c} href="#" onClick={(e) => e.preventDefault()} className="rounded-sm border border-neutral-200 py-2 hover:bg-neutral-50 hover:underline">
                {c}
              </a>
            ))}
          </div>
          <div className="mt-5 border-t border-neutral-200 pt-3 text-xs text-neutral-500">
            <p className="font-bold text-neutral-700">In the News</p>
            <p className="mt-1">Web directories are having a moment — everyone wants one.</p>
          </div>
        </div>
      )}

      {era === "2003" && (
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-4">
          {[
            { icon: Mail, label: "Mail", detail: "12 unread" },
            { icon: Cloud, label: "Weather", detail: "Uyo — 29°C" },
            { icon: TrendingUp, label: "Finance", detail: "NASDAQ +0.8%" },
            { icon: Newspaper, label: "News", detail: "Top headlines" },
          ].map((mod) => (
            <div key={mod.label} className="rounded-sm border border-neutral-200 bg-neutral-50 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-neutral-700">
                <mod.icon size={13} style={{ color: "#7B0099" }} /> {mod.label}
              </div>
              <p className="mt-1 text-neutral-500">{mod.detail}</p>
            </div>
          ))}
          <div className="col-span-2 rounded-sm border border-dashed border-neutral-300 p-3 text-center text-[10px] text-neutral-400 sm:col-span-4">
            advertisement
          </div>
        </div>
      )}

      {era === "today" && (
        <div className="mx-auto max-w-lg px-4 py-8 text-center">
          <Newspaper size={26} className="mx-auto text-neutral-300" />
          <p className="mt-3 text-sm text-neutral-500">A quieter homepage — mostly news, mostly mail.</p>
        </div>
      )}

      <p className="mx-auto max-w-md px-4 pb-8 pt-4 text-center text-xs leading-relaxed text-neutral-400">
        {NOTES[era]}
      </p>
    </div>
  );
}
