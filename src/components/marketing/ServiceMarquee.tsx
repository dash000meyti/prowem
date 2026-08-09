"use client";

import { motion } from "framer-motion";

const phrases = [
  "Event infrastructure",
  "Club destinations",
  "Matchday automation",
  "Live data",
  "Fan communities",
  "Consulting & design",
  "Multi-sport ready",
  "One data layer",
];

export function ServiceMarquee() {
  const loop = [...phrases, ...phrases];

  return (
    <section className="relative border-b border-border px-4 py-5 md:px-6" aria-hidden>
      <div className="glass-panel-marketing relative mx-auto max-w-7xl overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[rgba(10,14,22,0.7)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[rgba(10,14,22,0.7)] to-transparent" />
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {loop.map((phrase, i) => (
            <span
              key={`${phrase}-${i}`}
              className="flex items-center gap-10 text-sm uppercase tracking-[0.28em] text-muted/80"
            >
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-orange" />
              {phrase}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
