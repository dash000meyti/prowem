import { redirect } from "next/navigation";

export default async function EventLegendsRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/events/${slug}/history`);
}
