import { FanNavigation } from "@/components/layout/ContextualNav";
import { BrandScope } from "@/components/theme/BrandScope";
import { fanTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export default function FansLayout({ children }: { children: ReactNode }) {
  return (
    <BrandScope theme={fanTheme()} className="min-h-full">
      <FanNavigation />
      {children}
    </BrandScope>
  );
}
