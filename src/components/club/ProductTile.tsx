import Link from "next/link";
import type { Product } from "@/types";
import { MediaImage } from "@/components/media/MediaImage";
import { resolveMedia } from "@/data/media";

export function ProductTile({
  product,
  href = "/fans/shop",
}: {
  product: Product;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden border border-border bg-bg-1 transition hover:border-[var(--glass-border-strong)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-2">
        <MediaImage
          src={resolveMedia(product.image, "jerseyDetail")}
          alt={product.name}
          sizes="(max-width: 640px) 50vw, 25vw"
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        {product.limited ? (
          <span className="absolute left-3 top-3 z-10 bg-bg-0/80 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-brand">
            Limited
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {product.category}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight transition group-hover:text-brand">
          {product.name}
        </h3>
        <p className="mt-auto pt-4 text-lg font-semibold tabular-nums text-brand">
          €{product.price}
        </p>
      </div>
    </Link>
  );
}
