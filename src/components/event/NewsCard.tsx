import type { NewsArticle } from "@/types";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { resolveMedia } from "@/data/media";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <GlassPanel
      as="article"
      className="group overflow-hidden transition"
    >
      <div className="relative h-40">
        <MediaImage
          src={resolveMedia(article.imageTone, "crowdOrange")}
          alt={article.title}
          sizes="400px"
        />
        <div className="absolute inset-0 photo-scrim-light" />
        <span className="absolute left-4 top-4 z-10 text-[10px] uppercase tracking-[0.18em] text-orange">
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-orange">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
          {article.author} · {article.publishedAt.slice(0, 10)}
        </p>
      </div>
    </GlassPanel>
  );
}
