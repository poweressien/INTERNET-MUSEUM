"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Fragment {
  id: number;
  top: string;
  left: string;
  rotate: number;
  delay: number;
  w: number;
  h: number;
  face: "bevel" | "glass" | "glossy" | "flat";
}

const FRAGMENTS: Fragment[] = [
  { id: 1, top: "14%", left: "7%", rotate: -8, delay: 0, w: 130, h: 32, face: "bevel" },
  { id: 2, top: "66%", left: "10%", rotate: 6, delay: 1.1, w: 84, h: 84, face: "glass" },
  { id: 3, top: "20%", left: "83%", rotate: 9, delay: 0.6, w: 140, h: 38, face: "glossy" },
  { id: 4, top: "70%", left: "80%", rotate: -6, delay: 1.7, w: 64, h: 64, face: "flat" },
];

export function FloatingFragments() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {FRAGMENTS.map((f) => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{ top: f.top, left: f.left, width: f.w, height: f.h }}
          initial={{ opacity: 0, y: 0, rotate: f.rotate }}
          animate={{ opacity: 0.55, y: [0, -14, 0], rotate: f.rotate }}
          transition={{
            opacity: { duration: 1.2, delay: 0.8 + f.delay },
            y: { duration: 7 + f.delay, repeat: Infinity, ease: "easeInOut", delay: f.delay },
          }}
        >
          <FragmentFace face={f.face} />
        </motion.div>
      ))}
    </div>
  );
}

function FragmentFace({ face }: { face: Fragment["face"] }) {
  if (face === "bevel") {
    return <div className="h-full w-full rounded-sm border border-black/40 bg-[#c0c0c0] shadow-bevel" />;
  }
  if (face === "glass") {
    return <div className="h-full w-full rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md" />;
  }
  if (face === "glossy") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-full border border-blue-200/40 bg-gradient-to-b from-[#5FA9E8] to-[#3B5998] shadow-glossy">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    );
  }
  return <div className="h-full w-full rounded-md bg-[#2979FF]/70" />;
}
