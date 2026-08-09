import { ClubNavigation } from "@/components/layout/ContextualNav";
import { BrandScope } from "@/components/theme/BrandScope";
import { getClubBySlug, isFeaturedClub } from "@/data";
import { clubTheme } from "@/lib/theme";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export default async function ClubLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();
  const theme = clubTheme(club);
  const multiTeam = club.teamIds.length > 1;

  return (
    <BrandScope theme={theme} className="min-h-full">
      <ClubNavigation slug={slug} multiTeam={multiTeam} />
      {children}
    </BrandScope>
  );
}
