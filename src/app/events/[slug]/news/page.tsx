import { NewsCard } from "@/components/event/NewsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getNewsByEventId } from "@/data";
import { notFound } from "next/navigation";

export default async function EventNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const articles = getNewsByEventId(event.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Editorial"
        title="News"
        description="Match reports, city stories, and the voices behind Bundesliga 2026."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
