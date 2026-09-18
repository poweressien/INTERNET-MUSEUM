"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatedGrid } from "./effects/AnimatedGrid";
import { Particles } from "./effects/Particles";
import { FloatingFragments } from "./effects/FloatingFragments";
import { useSound } from "@/lib/useSound";

interface MuseumLobbyProps {
  onEnter: () => void;
  onJumpTo2007: () => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function MuseumLobby({ onEnter, onJumpTo2007 }: MuseumLobbyProps) {
  const { play } = useSound();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <AnimatedGrid />
        <Particles count={20} color="#C9A24B" />
        <FloatingFragments />
        <div className="absolute inset-0 bg-gradient-to-b from-shell-ink via-transparent to-shell-ink" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-4xl flex-col items-center"
      >
        <motion.span
          variants={rise}
          className="mb-6 font-display text-[0.7rem] font-medium uppercase tracking-[0.32em] text-shell-brass"
        >
          Est. 1991 — a living archive of the web
        </motion.span>

        <motion.h1
          variants={rise}
          className="font-display text-[3.4rem] font-semibold leading-[0.92] tracking-tight text-shell-paper sm:text-7xl md:text-8xl lg:text-[8rem]"
        >
          INTERNET
          <br />
          MUSEUM
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-7 max-w-xl font-curator text-xl italic text-shell-paper/85 sm:text-2xl"
        >
          A living archive of the web that once was.
        </motion.p>

        <motion.p
          variants={rise}
          className="mt-4 max-w-md font-curator text-sm leading-relaxed text-shell-paper/55 sm:text-base"
        >
          Travel through decades of websites, interfaces, platforms and digital culture.
        </motion.p>

        <motion.div variants={rise} className="mt-11 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              play("transition");
              onEnter();
            }}
            className="focus-ring group flex items-center gap-2 rounded-sm bg-shell-brass px-7 py-3.5 font-display text-sm font-semibold tracking-wide text-shell-ink transition-transform hover:-translate-y-0.5"
          >
            ENTER THE MUSEUM
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => {
              play("transition");
              onJumpTo2007();
            }}
            className="focus-ring rounded-sm border border-shell-line px-7 py-3.5 font-display text-sm font-medium text-shell-paper/80 transition-colors hover:border-shell-brass/60 hover:text-shell-paper"
          >
            JUMP TO 2007
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-shell-paper/50"
      >
        <span className="font-display text-[0.65rem] uppercase tracking-[0.25em]">Scroll to begin</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
