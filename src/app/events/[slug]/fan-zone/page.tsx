import { EventFanZoneClient } from "@/components/fan/EventFanZoneClient";
import { getEventBySlug } from "@/data";
import { notFound } from "next/navigation";

export default async function EventFanZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return <EventFanZoneClient event={event} />;
}
