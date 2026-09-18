"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

export function Particles({ count = 22, color = "#7BD8FF", className }: ParticlesProps) {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 20 + Math.random() * 80,
        size: 1 + Math.random() * 2.5,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 6,
      }))
    );
  }, [count]);

  if (prefersReducedMotion || !particles) return null;

  return (
    <div aria-hidden className={className ?? "pointer-events-none absolute inset-0 overflow-hidden"}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: [-8, -70] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
