import { MatchCenterClient } from "@/components/match/MatchCenterClient";
import {
  getFeaturedMatch,
  getNewsById,
  getVideoById,
} from "@/data";

export default function NexusVsBerlinMatchPage() {
  const match = getFeaturedMatch();
  const relatedNews = match.newsIds
    .map((id) => getNewsById(id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));
  const relatedVideos = [
    ...new Set([...match.videoIds, ...match.highlightIds]),
  ]
    .map((id) => getVideoById(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  return (
    <MatchCenterClient
      relatedNews={relatedNews}
      relatedVideos={relatedVideos}
    />
  );
}
