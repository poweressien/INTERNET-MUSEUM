"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

const ERAS = [
  { id: "2004", label: "2004" },
  { id: "2008", label: "2008" },
  { id: "2011", label: "2011" },
  { id: "feature-phone", label: "Feature Phone" },
] as const;
type FacebookEra = (typeof ERAS)[number]["id"];

const LABELS: Record<FacebookEra, string> = {
  "2004": "2004",
  "2008": "2008",
  "2011": "2011",
  "feature-phone": "feature phone, c. 2011",
};

const NOTES: Record<FacebookEra, string> = {
  "2004":
    "\"Thefacebook\" — Harvard-only at launch in February 2004, browsable by class year, house and concentration.",
  "2008":
    "The Wall, News Feed (2006) and the Facebook Platform (2007) are all in place — the shape most people picture.",
  "2011":
    "September 2011's Timeline redesign turns the profile into a scrapbook: a cover photo up top, life events running down the page.",
  "feature-phone":
    "\"Facebook for Every Phone\" (built on Snaptu, which Facebook acquired in 2011) and free access via partners like Opera Mini brought Facebook to basic phones across Africa, Asia and Latin America — for millions of people, this was Facebook.",
};

const FRIENDS = [
  "Alex Morgan",
  "Jamie Lee",
  "Sam Rivera",
  "Casey Kim",
  "Taylor Reed",
  "Jordan Blake",
  "Morgan Cole",
  "Drew Ellis",
];

interface WallPost {
  author: string;
  time: string;
  text: string;
}

const INITIAL_POSTS: WallPost[] = [
  { author: "Jamie Lee", time: "2 hours ago", text: "just added the new Scrabulous app — someone play me!" },
  { author: "Sam Rivera", time: "yesterday at 11:42pm", text: "can't believe the Platform just launched, so many new apps to try" },
  { author: "Casey Kim", time: "3 days ago", text: "happy birthday!! hope it's a good one :)" },
];

const TIMELINE_EVENTS = [
  { year: "2011", text: "Alex updated their profile to the new Timeline design." },
  { year: "2009", text: "Alex became friends with Jamie Lee." },
  { year: "2007", text: "Alex joined the Uyo Alum network." },
];

export function FacebookReconstruction() {
  const [era, setEra] = useState<FacebookEra>("2008");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [draft, setDraft] = useState("");

  function handleShare() {
    if (!draft.trim()) return;
    setPosts((prev) => [{ author: "Alex Morgan", time: "just now", text: draft.trim() }, ...prev]);
    setDraft("");
  }

  return (
    <div className="relative min-h-full bg-[#DCEBFB] pb-16 font-era-trebuchet text-[#1B2A3F]">
      <ReconstructionBadge label={`Facebook, ${LABELS[era]}`} />

      <div className="border-b border-[#B7CFEA] bg-white/70 px-4 pb-3 pt-16 sm:pt-20">
        <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as FacebookEra)} accent="#3B5998" />
      </div>

      {era === "2004" && (
        <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
          <div className="border-b-2 border-[#3B5998] pb-3">
            <span className="text-2xl font-bold text-[#3B5998]">thefacebook</span>
            <p className="mt-1 text-[11px] text-neutral-500">a Mark Zuckerberg production</p>
          </div>
          <p className="mx-auto mt-4 max-w-sm text-sm text-neutral-600">
            Thefacebook is an online directory that connects people through social networks at colleges.
          </p>
          <div className="mx-auto mt-6 max-w-xs rounded-sm border border-neutral-300 bg-[#F7F7F7] p-4 text-left">
            <p className="text-xs font-bold text-neutral-500">Browse Harvard University:</p>
            <ul className="mt-1.5 space-y-1 text-xs text-[#3B5998]">
              <li className="hover:underline">By class year</li>
              <li className="hover:underline">By concentration</li>
              <li className="hover:underline">By house</li>
            </ul>
          </div>
          <div className="mx-auto mt-5 flex max-w-xs items-center gap-3 rounded-sm border border-neutral-300 bg-white p-3 text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-neutral-300 text-neutral-400">
              <UserRound size={26} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#3B5998]">Alex Morgan</p>
              <p className="text-xs text-neutral-500">Harvard &apos;07</p>
              <p className="text-xs text-neutral-500">Economics</p>
            </div>
          </div>
          <button className="mt-5 rounded-sm border border-neutral-400 bg-[#E9E9E9] px-4 py-1 text-xs hover:bg-neutral-200">
            Poke
          </button>
        </div>
      )}

      {era === "2008" && (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 px-4 pt-5 sm:grid-cols-[190px_1fr_180px] sm:px-6">
          <div className="h-fit rounded-sm border border-[#B7CFEA] bg-white p-3 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-sm border border-[#B7CFEA] bg-[#EFF6FE]">
              <UserRound size={44} className="text-[#5D7392]" />
            </div>
            <p className="mt-2 text-sm font-bold">Alex Morgan</p>
            <p className="text-xs text-[#5D7392]">Uyo Metropolitan University</p>
            <dl className="mt-3 space-y-1 text-left text-[11px] text-[#3B4A63]">
              <div>
                <dt className="inline font-bold">Networks: </dt>
                <dd className="inline">Uyo Alum</dd>
              </div>
              <div>
                <dt className="inline font-bold">Birthday: </dt>
                <dd className="inline">March 14</dd>
              </div>
              <div>
                <dt className="inline font-bold">Status: </dt>
                <dd className="inline">it&apos;s complicated</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-sm border border-[#B7CFEA] bg-white p-3">
            <h2 className="border-b border-[#DCEBFB] pb-2 text-sm font-bold text-[#3B5998]">Wall</h2>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Alex is..."
              rows={2}
              className="mt-2 w-full resize-none rounded-sm border border-[#B7CFEA] p-2 text-sm focus:outline-none"
            />
            <div className="mt-1 flex justify-end">
              <button
                onClick={handleShare}
                className="rounded-sm border border-[#8FA9CE] bg-gradient-to-b from-[#F7FAFD] to-[#DCE7F5] px-3 py-1 text-xs font-medium text-[#1B2A3F] shadow-glossy"
              >
                Share
              </button>
            </div>
            <ul className="mt-4 divide-y divide-[#EFF3FA]">
              {posts.map((post, i) => (
                <li key={i} className="flex gap-2 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-[#EFF6FE] text-[#5D7392]">
                    <UserRound size={16} />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-bold text-[#3B5998]">{post.author}</span> {post.text}
                    </p>
                    <p className="mt-1 text-[11px] text-[#8DA0BD]">{post.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-fit rounded-sm border border-[#B7CFEA] bg-white p-3">
            <h2 className="border-b border-[#DCEBFB] pb-2 text-sm font-bold text-[#3B5998]">
              Friends ({FRIENDS.length})
            </h2>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {FRIENDS.map((name) => (
                <div key={name} className="text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-sm border border-[#DCEBFB] bg-[#EFF6FE] text-[#5D7392]">
                    <UserRound size={20} />
                  </div>
                  <p className="mt-1 truncate text-[10px] leading-tight">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {era === "2011" && (
        <div className="mx-auto max-w-2xl px-4 pt-5">
          <div className="h-28 rounded-t-sm bg-gradient-to-r from-[#5D7BB5] to-[#93AEDD] sm:h-36" />
          <div className="relative -mt-9 flex items-end gap-3 px-3">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border-4 border-white bg-[#EFF6FE] text-[#5D7392] shadow-md sm:h-24 sm:w-24">
              <UserRound size={38} />
            </div>
            <div className="pb-1">
              <p className="text-xl font-bold text-[#1B2A3F]">Alex Morgan</p>
              <p className="text-xs text-[#5D7392]">142 friends</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr]">
            <div className="h-fit rounded-sm border border-[#B7CFEA] bg-white p-3">
              <h3 className="text-xs font-bold uppercase tracking-wide text-[#5D7392]">About</h3>
              <ul className="mt-2 space-y-1.5 text-xs text-[#3B4A63]">
                <li>Studied Economics at Harvard</li>
                <li>Lives in Uyo, Nigeria</li>
                <li>From Lagos, Nigeria</li>
              </ul>
            </div>
            <div className="space-y-3">
              {TIMELINE_EVENTS.map((ev) => (
                <div key={ev.year} className="rounded-sm border border-[#B7CFEA] bg-white p-3">
                  <p className="text-xs font-bold text-[#5D7392]">{ev.year}</p>
                  <p className="mt-1 text-sm text-[#1B2A3F]">{ev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {era === "feature-phone" && (
        <div className="flex flex-col items-center px-4 py-10">
          <div className="w-full max-w-[230px] border border-neutral-700 bg-[#EDEDED] font-era-sys text-[11px] text-black shadow-lg">
            <div className="bg-[#3B5998] px-2 py-1.5 text-center text-xs font-bold text-white">facebook</div>
            <div className="border-b border-neutral-300 bg-white px-2 py-1 text-center text-[9px] text-neutral-500">
              0.facebook.com &middot; via Opera Mini
            </div>
            <ul className="divide-y divide-neutral-300 bg-white">
              <li className="px-2 py-2">
                <p className="font-bold">Jamie Lee</p>
                <p>shared a photo.</p>
                <div className="mt-1 h-10 w-14 bg-neutral-300" aria-hidden />
                <p className="mt-1 text-neutral-500">2 people like this &middot; 14m</p>
              </li>
              <li className="px-2 py-2">
                <p className="font-bold">Sam Rivera</p>
                <p>on my way, be there in 10 mins</p>
                <p className="mt-1 text-neutral-500">1h</p>
              </li>
              <li className="px-2 py-2 text-[#3B5998]">3 new notifications</li>
            </ul>
            <div className="flex justify-around border-t border-neutral-400 bg-[#E5E5E5] py-1.5 text-center text-[8px] font-bold leading-tight text-[#3B5998]">
              <span>News
                <br />Feed</span>
              <span>Requests</span>
              <span>Messages</span>
              <span>More</span>
            </div>
          </div>
        </div>
      )}

      <p className="mx-auto mt-8 max-w-lg px-4 text-center text-xs leading-relaxed text-[#3B4A63]/60">
        {NOTES[era]}
      </p>
    </div>
  );
}
