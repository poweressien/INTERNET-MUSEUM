import { Lock } from "lucide-react";
import type { Badge as BadgeType } from "@/types";
import { cn } from "@/lib/utils";

interface BadgeProps {
  badge: BadgeType;
  unlocked: boolean;
}

export function Badge({ badge, unlocked }: BadgeProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-sm border p-3 transition-colors",
        unlocked ? "border-shell-brass/50 bg-shell-brass/10" : "border-shell-line bg-shell-surface/40"
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
          unlocked
            ? "border-shell-brass bg-shell-brass text-shell-ink"
            : "border-shell-line text-shell-paper/30"
        )}
        aria-hidden
      >
        {unlocked ? "✓" : <Lock size={13} />}
      </div>
      <div>
        <p
          className={cn(
            "font-display text-xs font-bold uppercase tracking-wide",
            unlocked ? "text-shell-brass" : "text-shell-paper/50"
          )}
        >
          {badge.name}
        </p>
        <p className="mt-0.5 text-xs text-shell-paper/50">{badge.description}</p>
      </div>
    </div>
  );
}
