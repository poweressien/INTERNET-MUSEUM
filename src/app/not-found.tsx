import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-shell-ink px-6 text-center">
      <p className="font-display text-xs uppercase tracking-[0.3em] text-shell-brass">Connection Lost</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-shell-paper sm:text-6xl">
        404 INTERNET NOT FOUND
      </h1>
      <p className="mt-5 max-w-md font-curator text-base text-shell-paper/60">
        You&apos;ve wandered off the edge of the archive — into a page that was never indexed, or never
        existed at all. Even museums have blank spots on the map.
      </p>
      <Link
        href="/"
        className="focus-ring mt-8 rounded-sm bg-shell-brass px-6 py-3 font-display text-sm font-semibold text-shell-ink transition-transform hover:-translate-y-0.5"
      >
        Return to the museum
      </Link>
    </main>
  );
}
