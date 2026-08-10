"use client";

import { sportLabel } from "@/lib/utils";
import { getClubBySlug, getTeamsByClubId } from "@/data";
import { PropertyNav, type PropertyNavItem } from "@/components/layout/PropertyNav";

const fanLinks: PropertyNavItem[] = [
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
  const club = getClubBySlug(slug);
  const teams = getTeamsByClubId(club?.id ?? "");
  const base = `/clubs/${slug}`;

  const items: PropertyNavItem[] = [
    { href: base, label: "Home", exact: true },
    ...(multiTeam
      ? [
          {
            href: `${base}/teams`,
            label: "Teams",
            children: teams.map((t) => ({
              href: `${base}/teams/${t.sport}`,
              label: sportLabel(t.sport),
            })),
          } satisfies PropertyNavItem,
        ]
      : []),
    { href: `${base}/news`, label: "News" },
    { href: `${base}/videos`, label: "Videos" },
    { href: `${base}/shop`, label: "Shop" },
    { href: `${base}/tickets`, label: "Tickets" },
    { href: `${base}/legends`, label: "Legends" },
    { href: `${base}/awards`, label: "Awards" },
    { href: `${base}/sponsors`, label: "Sponsors" },
    { href: `${base}/supporters`, label: "Supporters" },
  ];

  return (
    <PropertyNav
      brand={club?.shortName ?? slug.toUpperCase()}
      items={items}
    />
  );
}

export function FanNavigation() {
  return <PropertyNav brand="FAN" items={fanLinks} />;
}
