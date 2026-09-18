"use client";

import type { CSSProperties, ReactNode } from "react";
import type { EraTheme } from "@/types";
import { fontClassFor, getContrastText, hasEffect, radiusClass } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface EraButtonProps {
  theme: EraTheme;
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export function EraButton({
  theme,
  children,
  variant = "primary",
  onClick,
  className,
  type = "button",
}: EraButtonProps) {
  const glossy = hasEffect(theme, "glossy");
  const glass = hasEffect(theme, "glass");
  const isPrimary = variant === "primary";

  const style: CSSProperties = isPrimary
    ? {
        backgroundColor: theme.colors.accent,
        color: getContrastText(theme.colors.accent),
        borderColor: theme.colors.accent,
      }
    : {
        backgroundColor: "transparent",
        color: theme.colors.foreground,
        borderColor: theme.colors.border,
      };

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={cn(
        "focus-ring relative overflow-hidden border px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0",
        radiusClass(theme.radius),
        fontClassFor(theme.font.body),
        glossy && "shadow-glossy",
        glass && "backdrop-blur-md",
        !glossy && theme.shadow === "bevel" && "shadow-bevel",
        !glossy && theme.shadow === "glow" && "shadow-glow",
        !glossy && theme.shadow === "soft" && "shadow-lg shadow-black/20",
        className
      )}
    >
      {glossy && isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent"
        />
      )}
      <span className="relative">{children}</span>
    </button>
  );
}

interface EraPanelProps {
  theme: EraTheme;
  children: ReactNode;
  className?: string;
}

export function EraPanel({ theme, children, className }: EraPanelProps) {
  const glass = hasEffect(theme, "glass");
  const glossy = hasEffect(theme, "glossy");
  const style: CSSProperties = {
    backgroundColor: glass ? `${theme.colors.surface}CC` : theme.colors.surface,
    color: theme.colors.foreground,
    borderColor: theme.colors.border,
  };

  return (
    <div
      style={style}
      className={cn(
        "border transition-colors duration-700",
        radiusClass(theme.radius),
        theme.shadow === "glow" && "shadow-glow",
        theme.shadow === "soft" && "shadow-xl shadow-black/20",
        theme.shadow === "bevel" && "shadow-bevel",
        glossy && "shadow-glossy",
        glass && "backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
