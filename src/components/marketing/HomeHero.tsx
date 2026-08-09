"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { heroMedia } from "@/data";

import { TypewriterRotate } from "@/components/marketing/TypewriterRotate";

const ease = [0.22, 1, 0.36, 1] as const;

const modules = [
  { label: "Event", href: "#event-platform" },
  { label: "Club", href: "#club-platform" },
  { label: "Matchday", href: "#matchday-platform" },
  { label: "Consulting", href: "#consulting" },
];

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
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.35)_0%,rgba(8,9,11,0.48)_40%,rgba(8,9,11,0.78)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,90,31,0.18),transparent_50%),radial-gradient(ellipse_at_85%_70%,rgba(255,90,31,0.08),transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 md:px-6 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <GlassPanel
            variant="display"
            className="relative p-0 md:p-0"
          >
            {/* Display chrome — status bar */}
            <div className="relative z-[1] flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3 md:px-8 md:py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-orange shadow-[0_0_10px_rgba(255,90,31,0.7)]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
                  Platform console
                </p>
              </div>
              <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-muted">
                <span className="hidden sm:inline">One data source</span>
                <span className="inline-flex items-center gap-1.5 text-orange">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
                  </span>
                  Live
                </span>
              </div>
            </div>

            <div className="relative z-[1] px-5 py-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
              <motion.p
                className="text-sm font-semibold tracking-[0.48em] text-orange md:text-base"
                initial={{ opacity: 0, letterSpacing: "0.7em", y: 10 }}
                animate={{ opacity: 1, letterSpacing: "0.48em", y: 0 }}
                transition={{ duration: 1, ease }}
              >
                PROWEM
              </motion.p>

              <h1 className="mt-5 max-w-5xl">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-[5.5rem]"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.18, ease }}
                  >
                    Run Sports.
                  </motion.span>
                </span>
                <span className="mt-1 block min-h-[1.05em] overflow-hidden md:mt-2">
                  <motion.span
                    className="block text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl lg:text-[5.5rem]"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.32, ease }}
                  >
                    <TypewriterRotate />
                  </motion.span>
                </span>
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
                <Button
                  href="#event-platform"
                  size="lg"
                  className="rounded-xl shadow-brand"
                >
                  For organizers
                </Button>
                <Button
                  href="#club-platform"
                  variant="outline"
                  size="lg"
                  className="rounded-xl"
                >
                  For clubs
                </Button>
              </motion.div>
            </div>

            {/* Display chrome — module strip */}
            <motion.div
              className="relative z-[1] grid grid-cols-2 border-t border-white/[0.08] sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              {modules.map((mod, i) => (
                <a
                  key={mod.label}
                  href={mod.href}
                  className="group flex items-center justify-between gap-2 border-white/[0.06] px-5 py-3.5 text-[10px] uppercase tracking-[0.2em] text-muted transition hover:bg-white/[0.03] hover:text-foreground max-sm:border-b max-sm:odd:border-r max-sm:[&:nth-child(n+3)]:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <span>
                    <span className="mr-2 text-orange/70">0{i + 1}</span>
                    {mod.label}
                  </span>
                  <span className="text-orange opacity-0 transition group-hover:opacity-100">
                    →
                  </span>
                </a>
              ))}
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
