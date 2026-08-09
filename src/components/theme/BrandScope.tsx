import { brandStyleVars, type BrandTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export function BrandScope({
  theme,
  children,
  className,
}: {
  theme: BrandTheme;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-brand={theme.scope}
      data-brand-label={theme.label}
      className={className}
      style={brandStyleVars(theme)}
    >
      {children}
    </div>
  );
}
