import { EventNavigation } from "@/components/event/EventNavigation";
import { BrandScope } from "@/components/theme/BrandScope";
import { getEventBySlug } from "@/data";
import { eventTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export default function EventLayout({ children }: { children: ReactNode }) {
  const event = getEventBySlug("nova-cup-2026")!;
  const theme = eventTheme(event);

  return (
    <BrandScope theme={theme} className="min-h-full">
      <EventNavigation />
      {children}
    </BrandScope>
  );
}
