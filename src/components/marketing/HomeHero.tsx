"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { heroMedia } from "@/data";

const ease = [0.22, 1, 0.36, 1] as const;

const lines = ["Run Sports.", "Build Communities.", "Create Experiences."];

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-border">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={heroMedia.home}
          alt="Stadium night atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.25)_0%,rgba(8,9,11,0.35)_35%,rgba(8,9,11,0.72)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,90,31,0.22),transparent_50%),radial-gradient(ellipse_at_85%_70%,rgba(255,90,31,0.1),transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 md:px-6 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <GlassPanel variant="marketing" className="p-7 md:p-10 lg:p-12">
            <motion.p
              className="text-sm font-semibold tracking-[0.48em] text-orange md:text-base"
              initial={{ opacity: 0, letterSpacing: "0.7em", y: 10 }}
              animate={{ opacity: 1, letterSpacing: "0.48em", y: 0 }}
              transition={{ duration: 1, ease }}
            >
              PROWEM
            </motion.p>

            <h1 className="mt-5 max-w-5xl">
              {lines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-[5.5rem]"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.18 + i * 0.12,
                      ease,
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease }}
            >
              Digital infrastructure for event organizers and clubs — from live
              competitions to fan communities on one data layer.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.74, ease }}
            >
              <Button href="#event-platform" size="lg" className="rounded-xl shadow-brand">
                For organizers
              </Button>
              <Button href="#club-platform" variant="outline" size="lg" className="rounded-xl">
                For clubs
              </Button>
            </motion.div>
          </GlassPanel>
        </motion.div>

        <motion.div
          className="mt-6 flex items-center gap-3 px-1 text-[10px] uppercase tracking-[0.28em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span className="relative flex h-8 w-px overflow-hidden bg-white/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-orange"
              animate={{ y: [0, 20, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
