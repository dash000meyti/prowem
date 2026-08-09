"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getEventBySlug } from "@/data";

const suffixes = [
  { path: "", label: "Home", exact: true },
  { path: "/matches", label: "Matches" },
  { path: "/live", label: "Live" },
  { path: "/standings", label: "Standings" },
  { path: "/bracket", label: "Bracket" },
  { path: "/teams", label: "Teams" },
  { path: "/players", label: "Players" },
  { path: "/stats", label: "Stats" },
  { path: "/news", label: "News" },
  { path: "/videos", label: "Videos" },
  { path: "/history", label: "History" },
  { path: "/awards", label: "Awards" },
  { path: "/legends", label: "Legends" },
  { path: "/sponsors", label: "Sponsors" },
  { path: "/fan-zone", label: "Fan Zone" },
];

export function EventNavigation() {
  const pathname = usePathname();
  const slug = pathname.match(/^\/events\/([^/]+)/)?.[1] ?? "bundesliga";
  const event = getEventBySlug(slug);
  const base = `/events/${slug}`;
  const links = suffixes.map((s) => ({
    href: `${base}${s.path}`,
    label: s.label,
    exact: s.exact,
  }));

  return (
    <div className="border-b border-border bg-brand-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
        <span className="mr-2 shrink-0 text-xs font-semibold tracking-[0.2em] text-brand">
          {event?.shortName ?? slug.toUpperCase()}
        </span>
        {links.map((link) => {
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
