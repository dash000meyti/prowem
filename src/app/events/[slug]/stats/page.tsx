import { redirect } from "next/navigation";

export default async function EventStatsRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/events/${slug}/standings`);
}
