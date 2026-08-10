import { MatchCenterClient } from "@/components/match/MatchCenterClient";
import { BrandScope } from "@/components/theme/BrandScope";
import {
  getEventBySlug,
  getFeaturedMatch,
  getNewsById,
  getVideoById,
} from "@/data";
import { matchTheme } from "@/lib/theme";

export default function NexusVsBerlinMatchPage() {
  const match = getFeaturedMatch();
  const event = getEventBySlug("bundesliga")!;
  const relatedNews = match.newsIds
    .map((id) => getNewsById(id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));
  const relatedVideos = [
    ...new Set([...match.videoIds, ...match.highlightIds]),
  ]
    .map((id) => getVideoById(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <BrandScope theme={matchTheme(event)} className="min-h-full">
      <MatchCenterClient
        relatedNews={relatedNews}
        relatedVideos={relatedVideos}
      />
    </BrandScope>
  );
}
