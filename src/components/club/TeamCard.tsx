import Link from "next/link";
import type { Team } from "@/types";
import { sportLabel } from "@/lib/utils";
import { getClubForTeam } from "@/data";

export function TeamCard({
  team,
  href,
}: {
  team: Team;
  href?: string;
}) {
  const club = getClubForTeam(team.id);
  const to = href ?? (club ? `/clubs/${club.slug}` : "#");

  return (
    <Link
      href={to}
      className="group block border border-border bg-bg-1 p-5 transition hover:border-border-strong hover:bg-bg-2"
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm text-sm font-semibold"
        style={{ background: `${team.color}22`, color: team.color }}
      >
        {team.shortName.slice(0, 3)}
      </div>
      <p className="text-lg font-semibold tracking-tight group-hover:text-orange">
        {team.name}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
        {sportLabel(team.sport)} · {team.city}
      </p>
    </Link>
  );
}
