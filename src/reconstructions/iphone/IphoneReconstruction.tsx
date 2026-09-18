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
  Clock,
  StickyNote,
  Compass,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { cn } from "@/lib/utils";

const YEARS = [2007, 2010, 2015, 2020, 2026] as const;
type IphoneYear = (typeof YEARS)[number];

const YEAR_CONFIG: Record<
  IphoneYear,
  { label: string; wallpaper: string; iconRadius: string; gestureNav: boolean; note: string }
> = {
  2007: {
    label: "Original iPhone · iPhone OS 1",
    wallpaper: "linear-gradient(160deg,#1c1c1e,#000000)",
    iconRadius: "rounded-[9px]",
    gestureNav: false,
    note: "No App Store yet — third-party software only existed as bookmarked web apps.",
  },
  2010: {
    label: "iPhone 4 · iOS 4",
    wallpaper: "linear-gradient(160deg,#2b2d42,#12131c)",
    iconRadius: "rounded-[10px]",
    gestureNav: false,
    note: "iOS 4 introduced folders, so a home screen could finally hold more than 11 pages of icons.",
  },
  2015: {
    label: "iPhone 6 · iOS 9",
    wallpaper: "linear-gradient(160deg,#3a6fd8,#1c3f8f)",
    iconRadius: "rounded-[11px]",
    gestureNav: false,
    note: "After the iOS 7 redesign, gloss and texture were stripped out in favor of flat colour.",
  },
  2020: {
    label: "iPhone 12 · iOS 14",
    wallpaper: "linear-gradient(160deg,#6a3fd8,#241a4d)",
    iconRadius: "rounded-[13px]",
    gestureNav: true,
    note: "Widgets reach the home screen for the first time, alongside a fully gesture-driven interface.",
  },
  2026: {
    label: "Speculative · adaptive OS",
    wallpaper: "linear-gradient(160deg,#0b3a3f,#030a0c)",
    iconRadius: "rounded-[16px]",
    gestureNav: true,
    note: "Speculative — the museum's best guess at where adaptive, AI-assisted interfaces are headed.",
  },
};

const APPS = [
  { icon: Phone, name: "Phone", color: "#3FCB5D" },
  { icon: Mail, name: "Mail", color: "#4C9EF0" },
  { icon: Compass, name: "Browser", color: "#3B78C2" },
  { icon: MessageCircle, name: "Messages", color: "#3FCB5D" },
  { icon: Camera, name: "Camera", color: "#8A8A8E" },
  { icon: ImageIcon, name: "Photos", color: "#E0A930" },
  { icon: Music, name: "Music", color: "#D6529A" },
  { icon: Calendar, name: "Calendar", color: "#DE4B4B" },
  { icon: MapPin, name: "Maps", color: "#3FCB5D" },
  { icon: StickyNote, name: "Notes", color: "#E0C230" },
  { icon: Clock, name: "Clock", color: "#2B2B2B" },
  { icon: Settings, name: "Settings", color: "#8A8A8E" },
];

function SignalBars() {
  return (
    <div className="flex items-end gap-[1.5px]" aria-hidden>
      {[3, 5, 7, 9].map((h, i) => (
        <span key={i} className="w-[2.5px] rounded-[1px] bg-white" style={{ height: h }} />
      ))}
    </div>
  );
}

export function IphoneReconstruction() {
  const [year, setYear] = useState<IphoneYear>(2007);
  const config = YEAR_CONFIG[year];

  return (
    <div className="relative flex min-h-full flex-col items-center bg-[#111213] px-4 py-10 font-era-geometric text-white sm:py-14">
      <ReconstructionBadge label="iPhone" />

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              year === y ? "border-white bg-white text-black" : "border-white/25 text-white/60 hover:text-white"
            )}
            aria-pressed={year === y}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="relative w-[280px] rounded-[2.75rem] border-[6px] border-[#2b2b2b] bg-black p-2 shadow-2xl">
        <div
          className="relative h-[540px] w-full overflow-hidden rounded-[2.1rem]"
          style={{ background: config.wallpaper }}
        >
          <div className="flex items-center justify-between px-5 pt-2.5 text-[11px] font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <SignalBars />
              <Wifi size={12} />
              <BatteryFull size={14} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-x-3 gap-y-4 px-5">
            {APPS.map((app) => (
              <div key={app.name} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center text-white shadow-md",
                    config.iconRadius
                  )}
                  style={{ backgroundColor: app.color }}
                >
                  <app.icon size={22} />
                </div>
                <span className="text-[9px] text-white/85">{app.name}</span>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "absolute inset-x-3 flex items-center justify-around rounded-2xl bg-white/10 py-2.5 backdrop-blur-md",
              config.gestureNav ? "bottom-6" : "bottom-3"
            )}
          >
            {APPS.slice(0, 4).map((app) => (
              <div
                key={`dock-${app.name}`}
                className={cn("flex h-10 w-10 items-center justify-center text-white", config.iconRadius)}
                style={{ backgroundColor: app.color }}
              >
                <app.icon size={18} />
              </div>
            ))}
          </div>

          {config.gestureNav && (
            <div className="absolute bottom-1.5 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/70" />
          )}
        </div>

        {!config.gestureNav && (
          <div className="mx-auto mt-1.5 h-9 w-9 rounded-full border-2 border-[#3a3a3a]" aria-hidden />
        )}
      </div>

      <div className="mt-6 max-w-sm text-center">
        <p className="font-display text-sm font-semibold text-white/90">{config.label}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-white/50">{config.note}</p>
      </div>
    </div>
  );
}
