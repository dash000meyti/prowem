import { MatchStageDetail } from "@/components/match/MatchStageDetail";
import { BrandScope } from "@/components/theme/BrandScope";
import {
  getEventBySlug,
  getMatchBySlug,
  getNewsById,
  getTeamById,
  getVideoById,
} from "@/data";
import { matchTheme } from "@/lib/theme";
import { notFound, redirect } from "next/navigation";

export default async function MatchBySlugPage({
  params,
}: {
  params: Promise<{ eventSlug: string; matchSlug: string }>;
}) {
  const { eventSlug, matchSlug } = await params;

  // Preserve the interactive Goal demo route
  if (eventSlug === "bundesliga" && matchSlug === "bayern-vs-dortmund") {
    redirect("/matches/bundesliga/bayern-vs-dortmund");
  }

  const event = getEventBySlug(eventSlug);
  const match = getMatchBySlug(matchSlug);
  if (!event || !match || match.eventId !== event.id) notFound();

  const home = getTeamById(match.homeTeamId);
  const away = getTeamById(match.awayTeamId);
  if (!home || !away) notFound();

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
      <MatchStageDetail
        match={match}
        home={home}
        away={away}
        relatedNews={relatedNews}
        relatedVideos={relatedVideos}
      />
    </BrandScope>
  );
}
