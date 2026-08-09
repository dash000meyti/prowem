import { EventNavigation } from "@/components/event/EventNavigation";
import { BrandScope } from "@/components/theme/BrandScope";
import { getEventBySlug } from "@/data";
import { eventTheme } from "@/lib/theme";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export default async function EventLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();
  const theme = eventTheme(event);

  return (
    <BrandScope theme={theme} className="min-h-full">
      <EventNavigation />
      {children}
    </BrandScope>
  );
}
