import { FanNavigation } from "@/components/layout/ContextualNav";
import type { ReactNode } from "react";

export default function FansLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <FanNavigation />
      {children}
    </div>
  );
}
