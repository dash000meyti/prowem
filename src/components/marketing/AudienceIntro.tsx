"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/media/GlassPanel";

const ease = [0.22, 1, 0.36, 1] as const;

const audiences = [
  {
    id: "organizers",
    number: "01",
    eyebrow: "Organizers",
    title: "Competitions that feel like destinations.",
    body: "Branded homes for leagues and tournaments — schedules, standings, news and live data.",
    href: "#event-platform",
  },
  {
    id: "clubs",
    number: "02",
    eyebrow: "Clubs",
    title: "A digital home for every team you field.",
    body: "Club identity, multi-sport teams, players and a fan club that keeps supporters close.",
    href: "#club-platform",
  },
] as const;

export function AudienceIntro() {
  return (
    <section className="relative px-4 py-20 md:px-6 md:py-28">
      <div className="marketing-theme-ember pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-orange/90">
            Who we serve
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            Two engines. One infrastructure.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {audiences.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              className={
                index === 0
                  ? "marketing-card-glow marketing-card-glow--ember group block"
                  : "marketing-card-glow marketing-card-glow--steel group block"
              }
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.1, ease }}
            >
              <GlassPanel
                variant="marketing"
                className="h-full p-7 transition duration-500 group-hover:border-white/25 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-orange">
                    {item.eyebrow}
                  </p>
                  <span className="text-sm tabular-nums text-white/30">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight md:text-[1.75rem] md:leading-snug">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-orange/90 transition group-hover:tracking-[0.22em]">
                  Explore →
                </p>
              </GlassPanel>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
