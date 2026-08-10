import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  getFeaturedClubs,
  getTeamsByClubId,
  heroMedia,
  resolveMedia,
} from "@/data";
import { sportLabel } from "@/lib/utils";

export default function ClubsIndexPage() {
  const featured = getFeaturedClubs();

  return (
    <div>
      <PhotoBackground
        src={heroMedia.bayern}
        alt="Clubs atmosphere"
        priority
        scrim="heavy"
        className="min-h-[52vh] border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange">
              Clubs
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Digital homes for sports organisations.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Featured clubs with independent brand identity — multi-sport where
              it fits, single-team where it does not.
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
          title="Featured clubs"
          description={`${featured.length} club destinations. Same infrastructure, distinct identities.`}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((club, index) => {
            const teams = getTeamsByClubId(club.id);
            const image = resolveMedia(
              club.theme.coverImage ?? club.theme.heroImage,
              "footballAction",
            );
            return (
              <FadeIn key={club.id} delay={index * 0.06}>
                <Link href={`/clubs/${club.slug}`} className="group block h-full">
                  <GlassPanel className="flex h-full flex-col overflow-hidden transition">
                    <div className="relative h-52 overflow-hidden">
                      <MediaImage src={image} alt={club.name} sizes="640px" />
                      <div className="absolute inset-0 photo-scrim-heavy" />
                      <div className="absolute bottom-4 left-4 z-10 flex items-end gap-3">
                        <Crest slug={club.slug} name={club.name} size={56} />
                        <div>
                          <p
                            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                            style={{ color: club.theme.primary }}
                          >
                            {club.shortName} · Est. {club.founded}
                          </p>
                          <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                            {club.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <p className="text-sm text-muted">{club.tagline}</p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                        {club.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {teams.map((team) => (
                          <span
                            key={team.id}
                            className="rounded-sm border border-border px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted"
                          >
                            {sportLabel(team.sport)}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <p className="text-xs uppercase tracking-[0.14em] text-muted">
                          {club.city}, {club.country}
                        </p>
                        <p className="text-xs uppercase tracking-[0.16em] text-orange">
                          Open club →
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
