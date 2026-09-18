import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Museum-vitrine style corner marks, used to frame exhibit/artifact cards. */
export function CornerBrackets({
  color = "#C9A24B",
  size = 14,
  inset = 0,
}: {
  color?: string;
  size?: number;
  inset?: number;
}) {
  const base: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: color,
    borderStyle: "solid",
  };
  return (
    <div aria-hidden className="pointer-events-none absolute" style={{ inset }}>
      <span style={{ ...base, top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...base, top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }} />
      <span style={{ ...base, bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }} />
      <span style={{ ...base, bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }} />
    </div>
  );
}

/** Small catalog-style label, e.g. "EXHIBIT N°04". Sequence numbering only —
 *  used because the exhibits genuinely are a numbered catalog. */
export function PlaqueLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-display text-[0.65rem] font-medium uppercase tracking-[0.18em] text-shell-brass",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <PlaqueLabel className="mb-3">{eyebrow}</PlaqueLabel>}
      <h2 className="font-display text-3xl font-semibold text-shell-paper sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 font-curator text-base leading-relaxed text-shell-paper/70 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
