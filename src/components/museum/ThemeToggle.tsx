"use client";

import { Moon, Sun } from "lucide-react";
import { useShellTheme } from "@/lib/useShellTheme";
import { useSound } from "@/lib/useSound";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useShellTheme();
  const { play } = useSound();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => {
        play("click");
        toggle();
      }}
      className={cn(
        "focus-ring rounded-sm p-2 text-shell-paper/65 transition-colors hover:text-shell-paper",
        className
      )}
      aria-label={isDark ? "Switch the museum to light mode" : "Switch the museum to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
