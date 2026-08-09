"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { mediaCatalog } from "@/data";

const ease = [0.22, 1, 0.36, 1] as const;

export function PlatformCtaBand() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src={mediaCatalog.crowdOrange}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.45)_0%,rgba(8,9,11,0.55)_50%,rgba(8,9,11,0.7)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,90,31,0.28),transparent_55%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
        >
          <GlassPanel variant="marketing" className="px-7 py-12 text-center md:px-12 md:py-16">
            <p className="text-xs uppercase tracking-[0.28em] text-orange">
              See the platform
            </p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Experience how organizers and clubs run on{" "}
              <span className="text-orange">PROWEM</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Step into live event and club destinations powered by the same
              infrastructure — branded, connected, matchday-ready.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/events" size="lg" className="rounded-xl shadow-brand">
                Explore events
              </Button>
              <Button href="/clubs" variant="outline" size="lg" className="rounded-xl">
                Explore clubs
              </Button>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
