"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { ServiceMarquee } from "@/components/marketing/ServiceMarquee";
import { TypewriterRotate } from "@/components/marketing/TypewriterRotate";
import { heroMedia } from "@/data";

const ease = [0.22, 1, 0.36, 1] as const;

const modules = [
  { label: "Event", href: "#event-platform" },
  { label: "Club", href: "#club-platform" },
  { label: "Matchday", href: "#matchday-platform" },
  { label: "Consulting", href: "#consulting" },
];

export function HomeHero() {
  return (
    <section className="relative flex h-[calc(100svh-4rem)] flex-col overflow-hidden border-b border-border">
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
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.35)_0%,rgba(8,9,11,0.48)_40%,rgba(8,9,11,0.82)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,90,31,0.18),transparent_50%),radial-gradient(ellipse_at_85%_70%,rgba(255,90,31,0.08),transparent_45%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center px-4 py-5 md:px-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <GlassPanel variant="display" className="relative p-0 md:p-0">
            {/* Display chrome — status bar */}
            <div className="relative z-[1] flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-2.5 md:gap-4 md:px-8 md:py-3.5">
              <div className="flex items-center gap-2.5 md:gap-3">
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

            <div className="relative z-[1] px-4 py-5 sm:px-5 sm:py-7 md:px-10 md:py-10 lg:px-12 lg:py-12">
              <motion.p
                className="text-xs font-semibold tracking-[0.4em] text-orange sm:text-sm sm:tracking-[0.48em] md:text-base"
                initial={{ opacity: 0, letterSpacing: "0.7em", y: 10 }}
                animate={{ opacity: 1, letterSpacing: "0.48em", y: 0 }}
                transition={{ duration: 1, ease }}
              >
                PROWEM
              </motion.p>

              <h1 className="mt-3 max-w-5xl sm:mt-5">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-[2rem] font-semibold leading-[1.02] tracking-tight sm:text-4xl md:text-6xl lg:text-[5.5rem] lg:leading-[0.98]"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.18, ease }}
                  >
                    Run Sports.
                  </motion.span>
                </span>
                <span className="mt-0.5 block min-h-[1.1em] overflow-hidden sm:mt-1 md:mt-2">
                  <motion.span
                    className="block text-[2rem] font-semibold leading-[1.02] tracking-tight sm:text-4xl md:text-6xl lg:text-[5.5rem] lg:leading-[0.98]"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.32, ease }}
                  >
                    <TypewriterRotate />
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-7 sm:text-base md:text-lg"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62, ease }}
              >
                Digital infrastructure for event organizers and clubs — from live
                competitions to fan communities on one data layer.
              </motion.p>

              <motion.div
                className="mt-5 flex gap-2.5 sm:mt-9 sm:flex-wrap sm:gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.74, ease }}
              >
                <Button
                  href="#event-platform"
                  size="md"
                  className="min-w-0 flex-1 rounded-xl shadow-brand sm:flex-none sm:px-7 md:h-12 md:text-base"
                >
                  For organizers
                </Button>
                <Button
                  href="#club-platform"
                  variant="outline"
                  size="md"
                  className="min-w-0 flex-1 rounded-xl sm:flex-none sm:px-7 md:h-12 md:text-base"
                >
                  For clubs
                </Button>
              </motion.div>

              <motion.div
                className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-muted sm:mt-7"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <span className="relative flex h-6 w-px overflow-hidden bg-white/15 sm:h-8">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-3 bg-orange"
                    animate={{ y: [0, 20, 0], opacity: [1, 0.2, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
                Scroll to explore
              </motion.div>
            </div>

            {/* Module strip — single row always (avoids tall 2×2 grid on mobile) */}
            <motion.div
              className="relative z-[1] flex border-t border-white/[0.08] overflow-x-auto sm:grid sm:grid-cols-4 sm:overflow-visible"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              {modules.map((mod, i) => (
                <a
                  key={mod.label}
                  href={mod.href}
                  className="group flex shrink-0 items-center justify-between gap-2 border-white/[0.06] px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] text-muted transition hover:bg-white/[0.03] hover:text-foreground sm:justify-between sm:border-r sm:px-5 sm:py-3.5 sm:tracking-[0.2em] sm:last:border-r-0"
                >
                  <span>
                    <span className="mr-2 text-orange/70">0{i + 1}</span>
                    {mod.label}
                  </span>
                  <span className="hidden text-orange opacity-0 transition group-hover:opacity-100 sm:inline">
                    →
                  </span>
                </a>
              ))}
            </motion.div>
          </GlassPanel>
        </motion.div>
      </div>

      <div className="relative z-10 shrink-0 bg-[#08090b]/90 backdrop-blur-sm">
        <ServiceMarquee />
      </div>
    </section>
  );
}
