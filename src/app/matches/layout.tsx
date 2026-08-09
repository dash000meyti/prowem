import { BrandScope } from "@/components/theme/BrandScope";
import { getEventBySlug } from "@/data";
import { matchTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export default function MatchesLayout({ children }: { children: ReactNode }) {
  const event = getEventBySlug("bundesliga")!;
  return (
    <BrandScope theme={matchTheme(event)} className="min-h-full">
      {children}
    </BrandScope>
  );
}
