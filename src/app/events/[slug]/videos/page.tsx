import { VideoCard } from "@/components/event/VideoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getVideosByEventId } from "@/data";
import { notFound } from "next/navigation";

export default async function EventVideosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const videos = getVideosByEventId(event.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Watch"
        title="Videos"
        description="Highlights, atmospheres, and the clips that carry the festival beyond the stands."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
