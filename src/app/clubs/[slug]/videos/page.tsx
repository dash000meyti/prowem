import { VideoCard } from "@/components/event/VideoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getClubBySlug,
  getVideosByClubId,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubVideosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const clubVideos = getVideosByClubId(club.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeader
        eyebrow="Video"
        title="Watch"
        description={`Highlights and club films from ${club.name}.`}
      />
      {clubVideos.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No videos published yet.</p>
      )}
    </div>
  );
}
