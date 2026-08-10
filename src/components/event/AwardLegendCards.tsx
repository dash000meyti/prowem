import type { Award, Legend } from "@/types";
import { MediaImage } from "@/components/media/MediaImage";
import { resolveMedia } from "@/data/media";

export function AwardCard({ award }: { award: Award }) {
  const src = resolveMedia(award.image, "trophyCup");

  return (
    <article className="grid min-h-[200px] overflow-hidden border border-border bg-bg-1 sm:grid-cols-[1fr_8.5rem]">
      <div className="flex flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-brand">
          {award.season}
        </p>
        <h3 className="mt-2 text-lg font-semibold">{award.name}</h3>
        <p className="mt-2 text-sm text-muted">{award.description}</p>
        <p className="mt-auto pt-4 text-sm font-medium">{award.winnerName}</p>
      </div>
      <div className="relative h-40 w-full sm:h-auto sm:min-h-full">
        <MediaImage
          src={src}
          alt=""
          sizes="(max-width: 640px) 100vw, 140px"
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-0/35 via-transparent to-transparent sm:bg-gradient-to-l sm:from-bg-0/45"
          aria-hidden
        />
      </div>
    </article>
  );
}

export function LegendCard({ legend }: { legend: Legend }) {
  const src = legend.image ?? resolveMedia("athletePortrait");

  return (
    <article className="grid min-h-[220px] overflow-hidden border border-border bg-gradient-to-br from-bg-2 to-bg-1 sm:grid-cols-[9.5rem_1fr]">
      <div className="relative h-56 w-full sm:h-auto sm:min-h-full">
        <MediaImage
          src={src}
          alt={legend.name}
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-0/40 via-transparent to-transparent sm:bg-gradient-to-r"
          aria-hidden
        />
      </div>
      <div className="flex flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {legend.era}
        </p>
        <h3 className="mt-2 text-xl font-semibold">{legend.name}</h3>
        <p className="mt-1 text-sm text-brand">{legend.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{legend.story}</p>
      </div>
    </article>
  );
}
