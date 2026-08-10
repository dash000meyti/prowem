import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  events,
  getOrganizerById,
  heroMedia,
  resolveMedia,
} from "@/data";
import { sportLabel } from "@/lib/utils";

export default function EventsIndexPage() {
  return (
    <div>
      <PhotoBackground
        src={heroMedia.bundesliga}
        alt="Events atmosphere"
        priority
        scrim="heavy"
        className="min-h-[52vh] border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange">
              Events
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Competitions on one platform.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Each league is a branded digital destination — football, socca, and
              Dota 2 — powered by the same PROWEM data layer.
            </p>
          </FadeIn>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"
      >
        <SectionHeader
          eyebrow="Directory"
          title="All events"
          description={`${events.length} live properties. Pick a competition to enter its branded home.`}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event, index) => {
            const organizer = getOrganizerById(event.organizerId);
            const image = resolveMedia(event.theme.heroImage, "stadiumLights");
            return (
              <FadeIn key={event.id} delay={index * 0.06}>
                <Link href={`/events/${event.slug}`} className="group block h-full">
                  <GlassPanel className="flex h-full flex-col overflow-hidden transition">
                    <div className="relative h-44 overflow-hidden">
                      <MediaImage src={image} alt={event.name} sizes="480px" />
                      <div className="absolute inset-0 photo-scrim" />
                      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                        <span
                          className="rounded-sm px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                          style={{
                            color: event.theme.primary,
                            backgroundColor: `${event.theme.primary}22`,
                          }}
                        >
                          {sportLabel(event.sport)}
                        </span>
                      </div>
                      <p className="absolute bottom-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] text-muted">
                        {event.city} · {event.country}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                        style={{ color: event.theme.primary }}
                      >
                        {event.shortName}
                        {organizer ? ` · ${organizer.shortName}` : ""}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-orange">
                        {event.name}
                      </h2>
                      <p className="mt-2 text-sm text-muted">{event.tagline}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                        {event.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-muted">
                          {event.teamCount} teams
                        </p>
                        <p className="text-xs uppercase tracking-[0.16em] text-orange">
                          Enter →
                        </p>
                      </div>
                    </div>
                  </GlassPanel>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </SectionShell>
    </div>
  );
}
