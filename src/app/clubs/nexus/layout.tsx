import { ClubNavigation } from "@/components/layout/ContextualNav";
import type { ReactNode } from "react";

export default function ClubLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={
        {
          "--club-primary": "#00C2A8",
          "--club-secondary": "#0A1214",
        } as React.CSSProperties
      }
    >
      <ClubNavigation multiTeam />
      {children}
    </div>
  );
}
