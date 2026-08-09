"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";

const ease = [0.22, 1, 0.36, 1] as const;

export function PlatformCtaBand() {
  return (
    <section className="relative px-4 py-20 md:px-6 md:py-28">
      <div className="marketing-theme-heat pointer-events-none absolute inset-0" aria-hidden />
      <motion.div
        className="relative z-10 mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
      >
        <GlassPanel variant="marketing" className="px-7 py-12 text-center md:px-12 md:py-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-orange">
            See the platform
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Experience how organizers and clubs run on{" "}
            <span className="text-orange">PROWEM</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Live event and club destinations on one infrastructure — branded,
            connected, matchday-ready.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/events" size="lg" className="rounded-xl shadow-brand">
              Explore events
            </Button>
            <Button href="/clubs" variant="outline" size="lg" className="rounded-xl">
              Explore clubs
            </Button>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
