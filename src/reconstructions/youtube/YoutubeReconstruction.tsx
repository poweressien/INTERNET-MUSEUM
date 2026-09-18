"use client";

import { useState } from "react";
import { Moon, Play, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

const ERAS = [
  { id: "2005", label: "2005" },
  { id: "2006", label: "2006" },
  { id: "2011", label: "2011" },
  { id: "2017", label: "2017+" },
] as const;
type YtEra = (typeof ERAS)[number]["id"];

const NOTES: Record<YtEra, string> = {
  "2005": "YouTube launched in February 2005 with almost nothing around the player — no ratings, no related videos, just a link anyone could watch without downloading a file.",
  "2006": "By the time Google bought YouTube for $1.65B that October, it had five-star ratings, comments, and a related-videos sidebar.",
  "2011": "The 2011 \"Cosmic Panda\" redesign flattened the chrome and swapped five stars for a simple thumbs up / thumbs down.",
  "2017": "The 2017 Material redesign brought card-based layouts, a proper dark mode, and a much wider watch page.",
};

const RELATED = [
  "Guy skateboards into a pole (funny)",
  "How to whittle a spoon — part 1",
  "My cat plays the piano!!",
  "Behind the scenes: garage band practice",
];

function Logo({ beta = false }: { beta?: boolean }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-era-retro text-2xl font-bold italic tracking-tight text-[#C23B3B]">
        You<span className="text-neutral-800">Tube</span>
      </span>
      {beta && <span className="rounded-sm border border-neutral-300 px-1 text-[9px] text-neutral-400">BETA</span>}
    </span>
  );
}

export function YoutubeReconstruction() {
  const [era, setEra] = useState<YtEra>("2006");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [likeState, setLikeState] = useState<"like" | "dislike" | null>(null);
  const [comment, setComment] = useState("");
  const [darkPreview, setDarkPreview] = useState(false);

  const dark = era === "2017" && darkPreview;

  return (
    <div className={dark ? "relative min-h-full bg-[#0F0F0F] font-era-sys text-white" : "relative min-h-full bg-white font-era-sys text-[#1a1a1a]"}>
      <ReconstructionBadge label={`YouTube, ${era === "2017" ? "2017+" : era}`} />

      <header className={dark ? "flex h-14 items-center justify-between gap-3 border-b border-white/10 px-4 pt-2 sm:px-8" : "flex h-14 items-center justify-between gap-3 border-b border-neutral-200 px-4 pt-2 sm:px-8"}>
        <Logo beta={era === "2005"} />
        <div className="flex items-center gap-3">
          {era !== "2005" && <span className="hidden text-[11px] text-neutral-400 sm:inline">Broadcast Yourself&trade;</span>}
          {era === "2017" && (
            <button
              onClick={() => setDarkPreview((d) => !d)}
              className={dark ? "flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-[10px] text-white/80" : "flex items-center gap-1 rounded-full border border-neutral-300 px-2 py-1 text-[10px] text-neutral-600"}
              aria-pressed={dark}
            >
              <Moon size={11} /> Dark mode
            </button>
          )}
        </div>
      </header>

      {era === "2005" ? (
        <div className="mx-auto max-w-xl px-4 py-10 text-center">
          <div className="mx-auto flex aspect-video w-full max-w-sm items-center justify-center rounded-sm border border-neutral-300 bg-neutral-900">
            <Play size={30} className="text-white" fill="currentColor" />
          </div>
          <h1 className="mt-4 text-base font-bold">my dog chasing its tail.mov</h1>
          <p className="mt-1 text-xs text-neutral-400">uploaded by museumfan1998</p>
          <p className="mx-auto mt-6 max-w-xs text-xs leading-relaxed text-neutral-400">
            Tag a video, get a link, share it anywhere — no ratings, no comments, no channels yet. Just video, hosted.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_240px]">
            <div>
              <div className={dark ? "flex aspect-video w-full items-center justify-center rounded-sm bg-black" : "flex aspect-video w-full items-center justify-center rounded-sm border border-neutral-300 bg-neutral-900"}>
                <button
                  aria-label="Play video (reconstruction only, no video plays)"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                >
                  <Play size={28} fill="currentColor" />
                </button>
              </div>

              <h1 className="mt-3 text-lg font-bold">A Dog Riding a Skateboard (Compilation)</h1>
              <div className={dark ? "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50" : "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500"}>
                <span>142,038 views</span>
                <span>Uploaded by museumfan1998</span>
              </div>

              <div className={dark ? "mt-3 flex items-center gap-4 border-y border-white/10 py-2" : "mt-3 flex items-center gap-4 border-y border-neutral-200 py-2"}>
                {era === "2006" ? (
                  <>
                    <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Rate this video">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          role="radio"
                          aria-checked={rating === star}
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            size={18}
                            fill={(hoverRating || rating) >= star ? "#E0A930" : "none"}
                            className={(hoverRating || rating) >= star ? "text-[#E0A930]" : "text-neutral-300"}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-neutral-500">
                      {rating > 0 ? `You rated this ${rating}/5` : "4.2 average (1,204 votes)"}
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setLikeState((s) => (s === "like" ? null : "like"))}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${likeState === "like" ? "border-[#3B78C2] bg-[#3B78C2]/10 text-[#3B78C2]" : dark ? "border-white/20 text-white/70" : "border-neutral-300 text-neutral-600"}`}
                    >
                      <ThumbsUp size={13} /> 1.1K
                    </button>
                    <button
                      onClick={() => setLikeState((s) => (s === "dislike" ? null : "dislike"))}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${likeState === "dislike" ? "border-red-400 bg-red-400/10 text-red-400" : dark ? "border-white/20 text-white/70" : "border-neutral-300 text-neutral-600"}`}
                    >
                      <ThumbsDown size={13} /> 12
                    </button>
                  </>
                )}
                {era === "2011" && (
                  <button className="ml-auto rounded-sm border border-neutral-300 px-3 py-1 text-xs text-neutral-600">
                    Subscribe
                  </button>
                )}
                {era === "2017" && (
                  <button className="ml-auto rounded-full bg-[#C23B3B] px-4 py-1.5 text-xs font-semibold text-white">
                    Subscribe
                  </button>
                )}
              </div>

              <div className="mt-4">
                <h2 className={dark ? "text-sm font-bold text-white/70" : "text-sm font-bold text-neutral-700"}>Comments (3)</h2>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={2}
                  className={dark ? "mt-2 w-full resize-none rounded-sm border border-white/15 bg-white/5 p-2 text-sm text-white focus:border-[#C23B3B] focus:outline-none" : "mt-2 w-full resize-none rounded-sm border border-neutral-300 p-2 text-sm focus:border-[#C23B3B] focus:outline-none"}
                />
                <ul className="mt-3 space-y-3 text-sm">
                  <li><span className="font-bold text-[#3B78C2]">skatelife02</span> haha this made my whole week</li>
                  <li><span className="font-bold text-[#3B78C2]">retrowebfan</span> the quality on this upload is actually pretty good</li>
                  {comment && <li><span className="font-bold text-[#3B78C2]">you</span> {comment}</li>}
                </ul>
              </div>
            </div>

            <aside>
              <h2 className={dark ? "text-xs font-bold uppercase tracking-wide text-white/40" : "text-xs font-bold uppercase tracking-wide text-neutral-500"}>
                Related videos
              </h2>
              <ul className="mt-2 space-y-3">
                {RELATED.map((title) => (
                  <li key={title} className="flex gap-2">
                    <div className={dark ? "flex h-11 w-16 shrink-0 items-center justify-center rounded-sm bg-white/10 text-white/40" : "flex h-11 w-16 shrink-0 items-center justify-center rounded-sm bg-neutral-200 text-neutral-400"}>
                      <Play size={14} fill="currentColor" />
                    </div>
                    <p className={dark ? "text-xs leading-snug text-white/70" : "text-xs leading-snug text-neutral-700"}>{title}</p>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      )}

      <p className={dark ? "mx-auto max-w-lg px-4 pb-8 text-center text-xs leading-relaxed text-white/40" : "mx-auto max-w-lg px-4 pb-8 text-center text-xs leading-relaxed text-neutral-400"}>
        {NOTES[era]}
      </p>

      <div className="flex justify-center pb-6">
        <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as YtEra)} accent="#C23B3B" variant={dark ? "dark" : "light"} />
      </div>
    </div>
  );
}
