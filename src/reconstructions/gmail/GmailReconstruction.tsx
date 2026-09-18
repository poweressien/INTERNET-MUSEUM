"use client";

import { useState } from "react";
import { Calendar, CheckSquare, MessageCircle, Search, SquarePen, StickyNote, Star } from "lucide-react";
import { ReconstructionBadge } from "../ReconstructionBadge";
import { EraTabs } from "../EraTabs";

const ERAS = [
  { id: "2004", label: "2004" },
  { id: "2008", label: "2008" },
  { id: "2013", label: "2013" },
  { id: "today", label: "Today" },
] as const;
type GmailEra = (typeof ERAS)[number]["id"];

const NOTES: Record<GmailEra, string> = {
  "2004": "Launched April 1, 2004 with roughly 500x the storage of Hotmail — enough that plenty of people assumed the announcement itself was an April Fools' joke.",
  "2008": "Google Talk moved into the sidebar in 2006, turning an inbox into somewhere you'd also just leave open to chat.",
  "2013": "Inbox category tabs — Primary, Social, Promotions — reorganized everyone's mail for them in 2013, sorting before you ever opened it.",
  today: "The 2018 Material redesign rounded everything off and added a side rail for Calendar, Keep and Tasks without leaving your inbox.",
};

interface MailRow {
  from: string;
  subject: string;
  preview: string;
  time: string;
  starred?: boolean;
}

const INBOX_2004: MailRow[] = [
  { from: "Google Team", subject: "Welcome to Gmail", preview: "You now have 1,000+ MB of storage...", time: "9:14am" },
  { from: "Jamie Lee", subject: "invite?", preview: "heard you got in, can you send me one", time: "8:02am" },
];

const INBOX_MODERN: MailRow[] = [
  { from: "Team Drive", subject: "Weekly summary", preview: "3 files were shared with you this week", time: "10:41am", starred: true },
  { from: "Jamie Lee", subject: "re: catch up?", preview: "works for me, sending an invite now", time: "9:15am" },
  { from: "Newsletter", subject: "This week in web history", preview: "the museum just added two new exhibits...", time: "Yesterday" },
];

export function GmailReconstruction() {
  const [era, setEra] = useState<GmailEra>("2004");
  const isModern = era === "2013" || era === "today";
  const rows = era === "2004" || era === "2008" ? INBOX_2004 : INBOX_MODERN;

  return (
    <div className="relative min-h-full bg-white font-era-sys text-[#1a1a1a]">
      <ReconstructionBadge label={`Gmail, ${era === "today" ? "today" : era}`} />

      <header className="flex flex-col gap-3 border-b border-neutral-200 px-4 pt-4 sm:px-8">
        <div className="flex items-center justify-between">
          <span className="flex items-baseline text-xl font-bold tracking-tight">
            <span style={{ color: "#3B78C2" }}>G</span>
            <span style={{ color: "#D64545" }}>m</span>
            <span style={{ color: "#E0A930" }}>a</span>
            <span style={{ color: "#3B78C2" }}>i</span>
            <span style={{ color: "#3F9C5D" }}>l</span>
          </span>
          {era === "2004" && (
            <span className="rounded-sm border border-neutral-300 bg-neutral-50 px-2 py-1 text-[10px] text-neutral-500">
              Invite-only &middot; 1,000+ MB free
            </span>
          )}
          {isModern && (
            <div className="flex w-full max-w-xs items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-500 sm:max-w-sm">
              <Search size={13} /> Search mail
            </div>
          )}
        </div>
        <div className="pb-3">
          <EraTabs eras={[...ERAS]} activeId={era} onChange={(id) => setEra(id as GmailEra)} accent="#D64545" />
        </div>
      </header>

      <div className="mx-auto flex max-w-3xl gap-4 px-4 py-4 sm:px-8">
        <aside className="hidden w-32 shrink-0 flex-col gap-1 text-xs text-neutral-600 sm:flex">
          <button className="mb-2 flex items-center gap-1.5 self-start rounded-full bg-[#D64545] px-3 py-1.5 text-[11px] font-semibold text-white">
            <SquarePen size={12} /> Compose
          </button>
          <span className="rounded-sm bg-red-50 px-2 py-1 font-semibold text-[#D64545]">Inbox</span>
          <span className="px-2 py-1">Starred</span>
          <span className="px-2 py-1">Sent</span>
          <span className="px-2 py-1">Drafts</span>
        </aside>

        <div className="flex-1">
          {era === "2013" && (
            <div className="mb-2 flex gap-4 border-b border-neutral-200 text-xs font-medium text-neutral-500">
              <span className="border-b-2 border-[#D64545] pb-2 text-[#D64545]">Primary</span>
              <span className="pb-2">Social</span>
              <span className="pb-2">Promotions</span>
            </div>
          )}
          <ul className="divide-y divide-neutral-100 rounded-sm border border-neutral-200">
            {rows.map((row, i) => (
              <li key={i} className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-neutral-50">
                {isModern ? (
                  <Star size={14} className={row.starred ? "text-[#E0A930]" : "text-neutral-300"} fill={row.starred ? "currentColor" : "none"} />
                ) : (
                  <span className="h-3 w-3 rounded-sm border border-neutral-300" />
                )}
                <span className="w-24 shrink-0 truncate font-semibold">{row.from}</span>
                <span className="flex-1 truncate text-neutral-600">
                  <span className="font-medium text-neutral-800">{row.subject}</span> — {row.preview}
                </span>
                <span className="shrink-0 text-[11px] text-neutral-400">{row.time}</span>
              </li>
            ))}
          </ul>

          {era === "2008" && (
            <div className="mt-4 flex items-center gap-2 rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
              <MessageCircle size={13} className="text-[#3F9C5D]" />
              Chat — Jamie Lee <span className="h-1.5 w-1.5 rounded-full bg-[#3F9C5D]" /> online
            </div>
          )}
        </div>

        {era === "today" && (
          <aside className="hidden w-10 shrink-0 flex-col items-center gap-4 pt-1 text-neutral-400 sm:flex">
            <Calendar size={18} />
            <StickyNote size={18} />
            <CheckSquare size={18} />
          </aside>
        )}
      </div>

      <p className="mx-auto max-w-md px-4 pb-8 text-center text-xs leading-relaxed text-neutral-400">
        {NOTES[era]}
      </p>
    </div>
  );
}
