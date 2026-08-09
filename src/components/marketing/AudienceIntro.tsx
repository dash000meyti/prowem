"use client";

import { motion } from "framer-motion";
import { MediaImage } from "@/components/media/MediaImage";
import { GlassPanel } from "@/components/media/GlassPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import { mediaCatalog } from "@/data";

const ease = [0.22, 1, 0.36, 1] as const;

const audiences = [
  {
    id: "organizers",
    number: "01",
    eyebrow: "For organizers",
    title: "Operate competitions that feel like destinations.",
    body: "Give every league, cup and digital tournament a branded home — schedules, standings, news and live data under your identity.",
    image: mediaCatalog.stadiumLights,
    alt: "Stadium lights before kickoff",
    href: "#event-platform",
  },
  {
    id: "clubs",
    number: "02",
    eyebrow: "For clubs",
    title: "Own the digital home for every team you field.",
    body: "Publish club identity, multi-sport teams, player profiles and a fan club experience that keeps supporters close to the badge.",
    image: mediaCatalog.footballAction,
    alt: "Football action on the pitch",
    href: "#club-platform",
  },
] as const;

export function AudienceIntro() {
  return (
    <SectionShell
      atmosphere="tint"
      className="border-b border-border"
      innerClassName="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease }}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-brand">
          Who we serve
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Built for the two engines of{" "}
          <span className="text-brand">modern sports</span>.
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {audiences.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.href}
            className="group block"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease }}
          >
            <GlassPanel
              variant="marketing"
              className="flex h-full min-h-[460px] flex-col md:min-h-[520px]"
            >
              <div className="relative m-3 mb-0 aspect-16/10 overflow-hidden rounded-[18px] md:m-4 md:mb-0">
                <MediaImage
                  src={item.image}
                  alt={item.alt}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="transition duration-[1.1s] ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,9,11,0.55)_100%)]"
                  aria-hidden
                />
                <span className="absolute right-4 top-4 text-3xl font-semibold tabular-nums text-white/40 md:text-4xl">
                  {item.number}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5 md:p-8 md:pt-6">
                <p className="text-[11px] uppercase tracking-[0.24em] text-orange">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted md:text-[15px]">
                  {item.body}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-orange transition group-hover:gap-3">
                  Explore services
                  <span aria-hidden>→</span>
                </p>
              </div>
            </GlassPanel>
          </motion.a>
        ))}
      </div>
    </SectionShell>
  );
}
