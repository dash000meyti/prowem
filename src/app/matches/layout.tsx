import { BrandScope } from "@/components/theme/BrandScope";
import { platformTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export default function MatchesLayout({ children }: { children: ReactNode }) {
  return (
    <BrandScope theme={platformTheme()} className="min-h-full">
      {children}
    </BrandScope>
  );
}
