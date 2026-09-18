"use client";

import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Smartphone } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

const ERAS = [
  { id: "2006", label: "2006" },
  { id: "2007", label: "2007" },
  { id: "2012", label: "2012" },
  { id: "2017", label: "2017+" },
] as const;
type TwEra = (typeof ERAS)[number]["id"];

const NOTES: Record<TwEra, string> = {
  "2006": "Twitter launched in July 2006 as an SMS-based status service — \"twttr\" — before the web page was even the main way in.",
  "2007": "SXSW 2007 was the breakout: attendees coordinated over Twitter in real time while two lobby screens ran the public feed nonstop.",
  "2012": "Profile header photos and a stats bar arrived in the 2012–2014 redesign, alongside inline photo previews in the timeline.",
  "2017": "In November 2017 the limit doubled to 280 characters, and the star \"favorite\" had already become a heart-shaped \"like\" in 2015.",
};

const CHAR_LIMIT_BY_ERA: Record<TwEra, number> = {
  "2006": 140,
  "2007": 140,
  "2012": 140,
  "2017": 280,
};

interface Tweet {
  time: string;
  text: string;
}

const TWEETS_2007: Tweet[] = [
  { time: "about 1 hour ago", text: "at SXSW and the whole lobby is just staring at a projector running this site" },
  { time: "3 hours ago", text: "trying to figure out how to reply to just one person without everyone seeing it" },
  { time: "yesterday", text: "is setting up an away message for the first time in years" },
];

const TWEETS_2012: Tweet[] = [
  { time: "14m", text: "new header photo, finally. profile feels like an actual page now" },
  { time: "2h", text: "the timeline scrolls so much smoother since the redesign" },
  { time: "1d", text: "can now see who retweeted what — huge for figuring out where things came from" },
];

const TWEETS_2017: Tweet[] = [
  { time: "3m", text: "280 characters and I still find a way to run out of room, impressive honestly" },
  { time: "1h", text: "threading a few tweets together to explain this properly \u2014 bear with me" },
  { time: "5h", text: "the like button turning into a heart still doesn't feel real, RIP the little gold star" },
];

export function TwitterReconstruction() {
  const [era, setEra] = useState<TwEra>("2007");
  const [draft, setDraft] = useState("");
  const [tweets2007, setTweets2007] = useState(TWEETS_2007);

  const limit = CHAR_LIMIT_BY_ERA[era];
  const remaining = limit - draft.length;

  function handleUpdate() {
    if (era !== "2007" || !draft.trim()) return;
    setTweets2007((prev) => [{ time: "just now", text: draft.trim() }, ...prev]);
    setDraft("");
  }

  return (
    <div className="relative min-h-full bg-[#F5FAFC] font-era-trebuchet text-[#1B2A3F]">
      <ReconstructionBadge label={`Twitter, ${era === "2017" ? "2017+" : era}`} />

      <header className="border-b border-[#D2E8EF] bg-white px-4 py-4 text-center sm:px-8">
        <span className="text-2xl font-bold lowercase tracking-tight text-[#5FA9E0]">twitter</span>
        <div className="mt-3">
          <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as TwEra)} accent="#5FA9E0" />
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 py-6 sm:px-0">
        {era === "2006" && (
          <div className="rounded-md border border-[#D2E8EF] bg-white p-5 text-center">
            <Smartphone size={28} className="mx-auto text-[#5FA9E0]" />
            <p className="mt-3 text-sm font-semibold">Updates are sent and received by SMS.</p>
            <p className="mt-1 text-xs text-[#5D7392]">No web timeline yet — just a phone number and a question.</p>
            <div className="mx-auto mt-4 max-w-[220px] rounded border border-dashed border-[#5FA9E0]/50 bg-[#F5FAFC] p-3 text-left text-xs">
              <p className="font-bold text-[#5FA9E0]">40404:</p>
              <p className="mt-1">alex_morgan: setting up my phone to text updates here. what is this thing</p>
            </div>
          </div>
        )}

        {era !== "2006" && (
          <div className="rounded-md border border-[#D2E8EF] bg-white p-3">
            <p className="text-sm font-medium text-[#5D7392]">
              {era === "2017" ? "What's happening?" : "What are you doing?"}
            </p>
            <textarea
              value={draft}
              maxLength={limit}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              className="mt-2 w-full resize-none rounded-sm border border-[#D2E8EF] p-2 text-sm focus:border-[#5FA9E0] focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-xs ${remaining < 0 ? "text-red-500" : "text-[#8DA0BD]"}`}>{remaining}</span>
              <button
                onClick={handleUpdate}
                className="rounded-sm bg-[#5FA9E0] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#4A93CB]"
              >
                {era === "2007" ? "update" : "Tweet"}
              </button>
            </div>
          </div>
        )}

        {(era === "2012" || era === "2017") && (
          <div className="mt-5 overflow-hidden rounded-md border border-[#D2E8EF] bg-white">
            <div className="h-16 bg-gradient-to-r from-[#5FA9E0] to-[#8DC7E8]" />
            <div className="flex items-end gap-3 px-3 pb-2 pt-0">
              <div className="-mt-6 h-12 w-12 rounded-full border-2 border-white bg-[#DCEBFB]" />
              <p className="pb-1 text-sm font-bold">alex_morgan</p>
            </div>
            <div className="flex justify-around border-t border-[#EEF6FA] py-2 text-center text-xs text-[#5D7392]">
              <div><p className="font-bold text-[#1B2A3F]">312</p><p>Tweets</p></div>
              <div><p className="font-bold text-[#1B2A3F]">61</p><p>Following</p></div>
              <div><p className="font-bold text-[#1B2A3F]">48</p><p>Followers</p></div>
            </div>
          </div>
        )}

        {era === "2007" && (
          <div className="mt-5 flex justify-around rounded-sm border border-[#D2E8EF] bg-white py-2 text-center text-xs text-[#5D7392]">
            <div><p className="font-bold text-[#1B2A3F]">alex_morgan</p><p>you</p></div>
            <div><p className="font-bold text-[#1B2A3F]">61</p><p>following</p></div>
            <div><p className="font-bold text-[#1B2A3F]">48</p><p>followers</p></div>
          </div>
        )}

        {era === "2007" && (
          <ul className="mt-5 space-y-4">
            {tweets2007.map((tweet, i) => (
              <li key={i} className="flex gap-2 border-b border-[#E5F1F5] pb-4">
                <div className="h-9 w-9 shrink-0 rounded-sm bg-[#DCEBFB]" aria-hidden />
                <div>
                  <p className="text-sm">
                    <span className="font-bold">alex_morgan</span> {tweet.text}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8DA0BD]">{tweet.time}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {(era === "2012" || era === "2017") && (
          <ul className="mt-4 space-y-4">
            {(era === "2012" ? TWEETS_2012 : TWEETS_2017).map((tweet, i) => (
              <li key={i} className="flex gap-2 border-b border-[#E5F1F5] pb-4">
                <div className="h-9 w-9 shrink-0 rounded-full bg-[#DCEBFB]" aria-hidden />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold">alex_morgan</span> {tweet.text}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8DA0BD]">{tweet.time}</p>
                  {era === "2017" && (
                    <div className="mt-2 flex items-center gap-5 text-[#8DA0BD]">
                      <MessageCircle size={13} />
                      <Repeat2 size={13} />
                      <Heart size={13} />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mx-auto max-w-md px-4 pb-8 text-center text-xs leading-relaxed text-[#5D7392]">
        {NOTES[era]}
      </p>
    </div>
  );
}
