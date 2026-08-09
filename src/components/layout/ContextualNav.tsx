"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getClubBySlug, getTeamsByClubId } from "@/data";
import { sportLabel } from "@/lib/utils";

const fanLinks = [
  { href: "/fans", label: "Dashboard", exact: true },
  { href: "/fans/profile", label: "Profile" },
  { href: "/fans/missions", label: "Missions" },
  { href: "/fans/rewards", label: "Rewards" },
  { href: "/fans/passport", label: "Passport" },
  { href: "/fans/shop", label: "Shop" },
];

export function ClubNavigation({
  slug,
  multiTeam = true,
}: {
  slug: string;
  multiTeam?: boolean;
}) {
  const pathname = usePathname();
  const club = getClubBySlug(slug);
  const teams = getTeamsByClubId(club?.id ?? "");
  const base = `/clubs/${slug}`;

  const links = [
    { href: base, label: "Home", exact: true },
    ...(multiTeam
      ? [
          { href: `${base}/teams`, label: "Teams", exact: false },
          ...teams.map((t) => ({
            href: `${base}/teams/${t.sport}`,
            label: sportLabel(t.sport),
            exact: false,
          })),
        ]
      : []),
  ];

  return (
    <div className="border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
        <span className="mr-2 shrink-0 text-xs font-semibold tracking-[0.2em] text-brand">
          {club?.shortName ?? slug.toUpperCase()}
        </span>
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname === link.href ||
              (link.href !== `${base}/teams` && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground",
                active && "bg-brand-tint text-brand",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function FanNavigation() {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
        <span className="mr-2 shrink-0 text-xs font-semibold tracking-[0.2em] text-brand">
          FAN
        </span>
        {fanLinks.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground",
                active && "bg-brand-tint text-brand",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
