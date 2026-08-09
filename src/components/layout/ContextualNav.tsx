"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const clubLinks = [
  { href: "/clubs/nexus", label: "Home", exact: true },
  { href: "/clubs/nexus/teams", label: "Teams" },
  { href: "/clubs/nexus/teams/football", label: "Football" },
  { href: "/clubs/nexus/teams/socca", label: "Socca" },
  { href: "/clubs/nexus/teams/dota2", label: "Dota 2" },
];

const fanLinks = [
  { href: "/fans", label: "Dashboard", exact: true },
  { href: "/fans/profile", label: "Profile" },
  { href: "/fans/missions", label: "Missions" },
  { href: "/fans/rewards", label: "Rewards" },
  { href: "/fans/passport", label: "Passport" },
  { href: "/fans/shop", label: "Shop" },
];

export function ClubNavigation({ multiTeam = true }: { multiTeam?: boolean }) {
  const pathname = usePathname();
  const links = multiTeam
    ? clubLinks
    : clubLinks.filter((l) => l.label !== "Teams");

  return (
    <div className="border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
        <span className="mr-2 shrink-0 text-xs font-semibold tracking-[0.2em] text-brand">
          NEXUS
        </span>
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname === link.href ||
              (link.href !== "/clubs/nexus/teams" &&
                pathname.startsWith(link.href));
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
