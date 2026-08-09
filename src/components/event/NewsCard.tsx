import type { NewsArticle } from "@/types";
import { VisualPanel } from "@/components/ui/VisualPanel";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group overflow-hidden border border-border bg-bg-1 transition hover:border-border-strong">
      <VisualPanel tone={article.imageTone} className="h-40 rounded-none border-0">
        <div className="flex h-full items-end p-4">
          <span className="text-[10px] uppercase tracking-[0.18em] text-orange">
            {article.category}
          </span>
        </div>
      </VisualPanel>
      <div className="p-5">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-orange">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted">
          {article.author} · {article.publishedAt.slice(0, 10)}
        </p>
      </div>
    </article>
  );
}
