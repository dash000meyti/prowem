import Link from "next/link";
import type { Team } from "@/types";
import { Crest } from "@/components/media/Crest";
import { MediaImage } from "@/components/media/MediaImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sportLabel } from "@/lib/utils";
import { resolveMedia } from "@/data/media";

function teamThumb(sport: Team["sport"]) {
  if (sport === "dota2") return resolveMedia("esportsStage");
  if (sport === "socca") return resolveMedia("soccaCage");
  return resolveMedia("footballAction");
}

export function ClubTeamsShowcase({
  teams,
  clubSlug,
  allTeamsHref,
}: {
  teams: Team[];
  clubSlug: string;
  allTeamsHref: string;
}) {
  return (
    <section>
      <SectionHeader
        eyebrow="Teams"
        title="One club. Multiple arenas."
        description="Football, cage and stage — fielded under one crest."
        action={
          <Button href={allTeamsHref} variant="outline" size="sm">
            All teams
          </Button>
        }
      />
      <div
        className={`grid gap-4 ${
          teams.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/clubs/${clubSlug}/teams/${team.sport}`}
            className="group relative block min-h-[280px] overflow-hidden md:min-h-[340px]"
          >
            <MediaImage
              src={teamThumb(team.sport)}
              alt={team.name}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/40 to-bg-0/10" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <Crest slug={team.slug} name={team.name} size={52} />
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                {sportLabel(team.sport)}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground transition group-hover:text-brand">
                {team.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{team.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
