"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/lib/useSound";
import { cn } from "@/lib/utils";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      className={cn(
        "focus-ring rounded-sm p-2 text-shell-paper/65 transition-colors hover:text-shell-paper",
        className
      )}
      aria-label={enabled ? "Mute museum sound" : "Unmute museum sound"}
      aria-pressed={enabled}
      title={enabled ? "Sound on" : "Sound off"}
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
