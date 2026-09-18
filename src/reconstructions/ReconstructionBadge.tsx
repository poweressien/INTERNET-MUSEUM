export function ReconstructionBadge({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-sm border border-black/10 bg-white/95 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-wide text-neutral-700 shadow-sm sm:left-4 sm:top-4">
      Museum reconstruction — {label}
    </div>
  );
}
