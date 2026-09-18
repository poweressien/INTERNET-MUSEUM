export function AnimatedGrid({
  className,
  color = "201,162,75",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 animate-grid-pan"}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(${color},0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(${color},0.07) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 75% 60% at 50% 10%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 10%, black 30%, transparent 100%)",
      }}
    />
  );
}
