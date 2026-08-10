"use client";

import { usePathname } from "next/navigation";
import { getEventBySlug } from "@/data";
import { PropertyNav, type PropertyNavItem } from "@/components/layout/PropertyNav";

/** Slim event IA — live lives under Matches; bracket/stats under Standings; heritage merges history/awards/legends */
const suffixes = [
  { path: "", label: "Home", exact: true },
  { path: "/matches", label: "Matches" },
  { path: "/standings", label: "Standings" },
  { path: "/teams", label: "Teams" },
  { path: "/news", label: "News" },
  { path: "/videos", label: "Videos" },
  { path: "/history", label: "Heritage" },
  { path: "/sponsors", label: "Sponsors" },
  { path: "/fan-zone", label: "Fan Zone" },
];

export function EventNavigation() {
  const pathname = usePathname();
  const slug = pathname.match(/^\/events\/([^/]+)/)?.[1] ?? "bundesliga";
  const event = getEventBySlug(slug);
  const base = `/events/${slug}`;

  const items: PropertyNavItem[] = suffixes.map((s) => ({
    href: `${base}${s.path}`,
    label: s.label,
    exact: s.exact,
  }));

  return (
    <PropertyNav brand={event?.shortName ?? slug.toUpperCase()} items={items} />
  );
}
