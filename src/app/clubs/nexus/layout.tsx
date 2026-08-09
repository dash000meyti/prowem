import { ClubNavigation } from "@/components/layout/ContextualNav";
import { BrandScope } from "@/components/theme/BrandScope";
import { getClubBySlug } from "@/data";
import { clubTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export default function ClubLayout({ children }: { children: ReactNode }) {
  const club = getClubBySlug("nexus")!;
  const theme = clubTheme(club);

  return (
    <BrandScope theme={theme} className="min-h-full">
      <ClubNavigation multiTeam />
      {children}
    </BrandScope>
  );
}
