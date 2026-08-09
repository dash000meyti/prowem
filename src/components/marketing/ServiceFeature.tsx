"use client";

import { motion } from "framer-motion";
import { MediaImage } from "@/components/media/MediaImage";
import { GlassPanel } from "@/components/media/GlassPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import type { Atmosphere } from "@/components/layout/SectionShell";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export type ServiceFeatureProps = {
  id: string;
  index: string;
  indexShort: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  imageAlt: string;
  atmosphere?: Atmosphere;
  reverse?: boolean;
};

export function ServiceFeature({
  id,
  index,
  indexShort,
  title,
  body,
  points,
  image,
  imageAlt,
  atmosphere = "plain",
  reverse = false,
}: ServiceFeatureProps) {
  return (
    <SectionShell
      id={id}
      atmosphere={atmosphere}
      className="border-b border-border scroll-mt-20"
      innerClassName="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32"
    >
      <span
        className="pointer-events-none absolute -top-6 right-4 select-none text-[8rem] font-semibold leading-none text-white/[0.035] md:right-8 md:text-[12rem]"
        aria-hidden
      >
        {indexShort}
      </span>

      <div
        className={cn(
          "grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
        >
          <GlassPanel variant="marketing" className="h-full p-7 md:p-10">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-orange" aria-hidden />
              <p className="text-[11px] uppercase tracking-[0.24em] text-brand">
                {index}
              </p>
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              {title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              {body}
            </p>
            <ul className="mt-8 space-y-3">
              {points.map((point, i) => (
                <motion.li
                  key={point}
                  className="rounded-[14px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-foreground/90 backdrop-blur-sm md:text-[15px]"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease }}
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </GlassPanel>
        </motion.div>

        <motion.div
          className="group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <GlassPanel variant="marketing" className="h-full p-3 md:p-4">
            <div className="relative aspect-4/5 overflow-hidden rounded-[18px] md:aspect-4/3 md:min-h-full">
              <MediaImage
                src={image}
                alt={imageAlt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="transition duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(8,9,11,0.25)_0%,transparent_45%,rgba(255,90,31,0.14)_100%)]"
                aria-hidden
              />
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </SectionShell>
  );
}
