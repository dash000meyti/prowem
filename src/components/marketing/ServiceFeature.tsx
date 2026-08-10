"use client";

import { motion } from "framer-motion";
import { MediaImage } from "@/components/media/MediaImage";
import { GlassPanel } from "@/components/media/GlassPanel";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export type ServiceTheme = "ember" | "steel" | "amber" | "night";

const themeClass: Record<ServiceTheme, string> = {
  ember: "marketing-theme-ember",
  steel: "marketing-theme-steel",
  amber: "marketing-theme-amber",
  night: "marketing-theme-night",
};

const glowClass: Record<ServiceTheme, string> = {
  ember: "marketing-card-glow marketing-card-glow--ember",
  steel: "marketing-card-glow marketing-card-glow--steel",
  amber: "marketing-card-glow marketing-card-glow--amber",
  night: "marketing-card-glow marketing-card-glow--night",
};

export type ServiceFeatureProps = {
  id: string;
  index: string;
  title: string;
  body: string;
  points: string[];
  image: string;
  imageAlt: string;
  theme?: ServiceTheme;
  reverse?: boolean;
};

export function ServiceFeature({
  id,
  index,
  title,
  body,
  points,
  image,
  imageAlt,
  theme = "ember",
  reverse = false,
}: ServiceFeatureProps) {
  return (
    <section id={id} className="relative scroll-mt-20 px-4 py-8 md:px-6 md:py-10">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-90",
          themeClass[theme],
        )}
        aria-hidden
      />
      <motion.div
        className={cn("relative z-10 mx-auto max-w-5xl", glowClass[theme])}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
      >
        <GlassPanel variant="marketing" className="p-3 md:p-4">
          <div
            className={cn(
              "grid items-center gap-5 md:gap-6 lg:grid-cols-[1.15fr_0.85fr]",
              reverse && "lg:grid-cols-[0.85fr_1.15fr] lg:[&>*:first-child]:order-2",
            )}
          >
            <div className="p-5 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-orange">
                {index}
              </p>
              <h2 className="mt-4 max-w-lg text-2xl font-semibold tracking-tight md:text-4xl md:leading-[1.1]">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
                {body}
              </p>
              <ul className="mt-7 space-y-2.5">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/85"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-orange"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-5/4 overflow-hidden rounded-[18px] md:aspect-auto md:min-h-[280px] md:h-full">
              <MediaImage
                src={image}
                alt={imageAlt}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,9,11,0.45),transparent_55%)]"
                aria-hidden
              />
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}
