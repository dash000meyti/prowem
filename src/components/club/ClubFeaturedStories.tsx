import Link from "next/link";
import type { NewsArticle } from "@/types";
import { MediaImage } from "@/components/media/MediaImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { resolveMedia } from "@/data/media";

export function ClubFeaturedStories({
  articles,
  newsHref,
}: {
  articles: NewsArticle[];
  newsHref?: string;
}) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;
  const side = rest.slice(0, 2);
  const moreHref = newsHref ?? "#";

  return (
    <section>
      <SectionHeader
        eyebrow="Stories"
        title="From the club"
        description="Wins, previews and multi-arena moments — one editorial feed."
        action={
          newsHref ? (
            <Button href={newsHref} variant="outline" size="sm">
              All news
            </Button>
          ) : null
        }
      />
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Link
          href={moreHref}
          className="group relative block min-h-[320px] overflow-hidden lg:col-span-7 lg:min-h-[420px]"
        >
          <MediaImage
            src={resolveMedia(featured.imageTone, "crowdOrange")}
            alt={featured.title}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
              {featured.category}
            </p>
            <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-foreground md:text-4xl">
              {featured.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">
              {featured.excerpt}
            </p>
            <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition group-hover:text-brand">
              Read more
            </span>
          </div>
        </Link>

        <div className="flex flex-col gap-4 lg:col-span-5">
          {side.map((article) => (
            <Link
              key={article.id}
              href={moreHref}
              className="group relative block min-h-[190px] flex-1 overflow-hidden"
            >
              <MediaImage
                src={resolveMedia(article.imageTone, "footballAction")}
                alt={article.title}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                  {article.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
                  {article.title}
                </h3>
                <span className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted transition group-hover:text-brand">
                  Read more
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
