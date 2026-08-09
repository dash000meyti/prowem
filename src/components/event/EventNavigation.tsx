"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const eventLinks = [
  { href: "/events/nova-cup-2026", label: "Home", exact: true },
  { href: "/events/nova-cup-2026/matches", label: "Matches" },
  { href: "/events/nova-cup-2026/live", label: "Live" },
  { href: "/events/nova-cup-2026/standings", label: "Standings" },
  { href: "/events/nova-cup-2026/bracket", label: "Bracket" },
  { href: "/events/nova-cup-2026/teams", label: "Teams" },
  { href: "/events/nova-cup-2026/players", label: "Players" },
  { href: "/events/nova-cup-2026/stats", label: "Stats" },
  { href: "/events/nova-cup-2026/news", label: "News" },
  { href: "/events/nova-cup-2026/videos", label: "Videos" },
  { href: "/events/nova-cup-2026/history", label: "History" },
  { href: "/events/nova-cup-2026/awards", label: "Awards" },
  { href: "/events/nova-cup-2026/legends", label: "Legends" },
  { href: "/events/nova-cup-2026/sponsors", label: "Sponsors" },
  { href: "/events/nova-cup-2026/fan-zone", label: "Fan Zone" },
];

export function EventNavigation() {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
        <span className="mr-2 shrink-0 text-xs font-semibold tracking-[0.2em] text-brand">
          NOVA CUP
        </span>
        {eventLinks.map((link) => {
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
