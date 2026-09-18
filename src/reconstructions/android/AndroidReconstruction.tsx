"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Camera,
  Music,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Settings,
  MessageCircle,
  Chrome,
  Cloud,
  ChevronLeft,
  Circle,
  Square,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { cn } from "@/lib/utils";

const YEARS = [2008, 2011, 2014, 2021, 2026] as const;
type AndroidYear = (typeof YEARS)[number];

const YEAR_CONFIG: Record<
  AndroidYear,
  { label: string; wallpaper: string; iconRadius: string; gestureNav: boolean; note: string }
> = {
  2008: {
    label: "T-Mobile G1 · Android 1.0",
    wallpaper: "linear-gradient(160deg,#3a3f2e,#15170f)",
    iconRadius: "rounded-none",
    gestureNav: false,
    note: "The first commercial Android device — plain, utilitarian, and built around a keyboard and trackball.",
  },
  2011: {
    label: "Nexus S · Gingerbread",
    wallpaper: "linear-gradient(160deg,#1c2b3a,#0a1420)",
    iconRadius: "rounded-[6px]",
    gestureNav: false,
    note: "The 'Holo' era — dark, blue-accented, and Android's first attempt at a coherent design language.",
  },
  2014: {
    label: "Nexus 6 · Lollipop",
    wallpaper: "linear-gradient(160deg,#5b3fd8,#241a4d)",
    iconRadius: "rounded-[10px]",
    gestureNav: false,
    note: "Material Design launches: cards, elevation, and bold colour replace Holo's flat darkness.",
  },
  2021: {
    label: "Pixel 6 · Material You",
    wallpaper: "linear-gradient(160deg,#3f7d5c,#122019)",
    iconRadius: "rounded-[18px]",
    gestureNav: true,
    note: "Material You lets the whole interface recolour itself around your wallpaper.",
  },
  2026: {
    label: "Speculative · adaptive OS",
    wallpaper: "linear-gradient(160deg,#123a3a,#030d0d)",
    iconRadius: "rounded-[20px]",
    gestureNav: true,
    note: "Speculative — the museum's best guess at where adaptive, AI-assisted interfaces are headed.",
  },
};

const APPS = [
  { icon: Phone, name: "Phone", color: "#6BAA3C" },
  { icon: Mail, name: "Mail", color: "#4C9EF0" },
  { icon: Chrome, name: "Browser", color: "#DE4B4B" },
  { icon: MessageCircle, name: "Messages", color: "#6BAA3C" },
  { icon: Camera, name: "Camera", color: "#8A8A8E" },
  { icon: ImageIcon, name: "Gallery", color: "#E0A930" },
  { icon: Music, name: "Music", color: "#D6529A" },
  { icon: Calendar, name: "Calendar", color: "#4C9EF0" },
  { icon: MapPin, name: "Maps", color: "#6BAA3C" },
  { icon: Settings, name: "Settings", color: "#8A8A8E" },
];

export function AndroidReconstruction() {
  const [year, setYear] = useState<AndroidYear>(2008);
  const config = YEAR_CONFIG[year];

  return (
    <div className="relative flex min-h-full flex-col items-center bg-[#0f1210] px-4 py-10 font-era-geometric text-white sm:py-14">
      <ReconstructionBadge label="Android" />

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              year === y ? "border-[#6BAA3C] bg-[#6BAA3C] text-black" : "border-white/25 text-white/60 hover:text-white"
            )}
            aria-pressed={year === y}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="relative w-[280px] rounded-[1.75rem] border-[6px] border-[#26291f] bg-black p-2 shadow-2xl">
        <div
          className="relative h-[540px] w-full overflow-hidden rounded-[1.2rem]"
          style={{ background: config.wallpaper }}
        >
          <div className="flex items-center justify-between px-4 pt-2 text-[11px] font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi size={12} />
              <BatteryFull size={14} />
            </div>
          </div>
          <div className="mt-1 flex justify-center text-white/25">
            <div className="h-1 w-10 rounded-full bg-white/25" aria-hidden />
          </div>

          <div className="mx-4 mt-3 flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 backdrop-blur-sm">
            <Cloud size={20} className="text-white/80" />
            <div>
              <p className="text-sm font-semibold leading-none">27&deg;C</p>
              <p className="mt-1 text-[10px] text-white/60">Uyo &middot; Partly cloudy</p>
            </div>
            <p className="ml-auto font-display text-lg font-bold">9:41</p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-x-3 gap-y-4 px-5">
            {APPS.map((app) => (
              <div key={app.name} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center text-white shadow-md",
                    config.iconRadius
                  )}
                  style={{ backgroundColor: app.color }}
                >
                  <app.icon size={20} />
                </div>
                <span className="text-[9px] text-white/85">{app.name}</span>
              </div>
            ))}
          </div>

          {config.gestureNav ? (
            <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70" />
          ) : (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-around bg-black/40 py-2.5 backdrop-blur-sm">
              <ChevronLeft size={16} className="text-white/70" />
              <Circle size={14} className="text-white/70" />
              <Square size={13} className="text-white/70" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-sm text-center">
        <p className="font-display text-sm font-semibold text-white/90">{config.label}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-white/50">{config.note}</p>
      </div>
    </div>
  );
}
