import { NewsCard } from "@/components/event/NewsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getClubBySlug,
  getNewsByClubId,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const articles = getNewsByClubId(club.id)
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeader
        eyebrow="Editorial"
        title="News"
        description={`Stories, previews and Matchday reports from ${club.name}.`}
      />
      {articles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No club stories published yet.</p>
      )}
    </div>
  );
}
