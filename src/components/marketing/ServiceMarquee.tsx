"use client";

import { motion } from "framer-motion";

const phrases = [
  "Event infrastructure",
  "Club destinations",
  "Matchday automation",
  "Live data",
  "Fan communities",
  "Consulting & design",
];

export function ServiceMarquee() {
  const loop = [...phrases, ...phrases];

  return (
    <div className="relative overflow-hidden border-y border-white/6 py-2.5 sm:py-4" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-[#08090b] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-[#08090b] to-transparent sm:w-20" />
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap sm:gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      >
        {loop.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-8 text-[10px] uppercase tracking-[0.28em] text-muted/55 sm:gap-12 sm:text-[11px] sm:tracking-[0.32em]"
          >
            <span className="inline-block h-1 w-1 rounded-full bg-orange/70" />
            {phrase}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
