import { EventNavigation } from "@/components/event/EventNavigation";
import type { ReactNode } from "react";

export default function EventLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={
        {
          "--event-primary": "#FF5A1F",
          "--event-secondary": "#0D0F12",
          "--event-accent": "#F5F5F2",
        } as React.CSSProperties
      }
    >
      <EventNavigation />
      {children}
    </div>
  );
}
