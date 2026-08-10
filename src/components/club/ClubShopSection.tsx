import Link from "next/link";
import type { Product } from "@/types";
import { MediaImage } from "@/components/media/MediaImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductTile } from "@/components/club/ProductTile";
import { resolveMedia } from "@/data/media";

const CATEGORY_ORDER = [
  "Jerseys",
  "Scarves",
  "Equipment",
  "Apparel",
  "Caps",
] as const;

function sortShopProducts(items: Product[]) {
  return [...items].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(
      a.category as (typeof CATEGORY_ORDER)[number],
    );
    const bi = CATEGORY_ORDER.indexOf(
      b.category as (typeof CATEGORY_ORDER)[number],
    );
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export function ClubShopSection({
  clubName,
  products,
  shopHref = "/fans/shop",
}: {
  clubName: string;
  products: Product[];
  shopHref?: string;
}) {
  if (products.length === 0) return null;

  const sorted = sortShopProducts(products);
  const featured =
    sorted.find((p) => p.category === "Jerseys") ?? sorted[0];
  const grid = sorted.filter((p) => p.id !== featured.id).slice(0, 4);

  return (
    <section>
      <SectionHeader
        eyebrow="Merch"
        title={`Shop ${clubName}`}
        description="Jerseys, scarves, match balls and apparel — gear for every arena."
        action={
          <Button href={shopHref} variant="outline" size="sm">
            See the whole shop
          </Button>
        }
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {["All", "Jerseys", "Scarves", "Balls", "Apparel"].map((label) => (
          <span
            key={label}
            className="border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Link
          href={shopHref}
          className="group relative block min-h-[360px] overflow-hidden lg:col-span-5"
        >
          <MediaImage
            src={resolveMedia(featured.image, "jerseyDetail")}
            alt={featured.name}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
              Featured kit
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {featured.name}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              {featured.description}
            </p>
            <p className="mt-5 text-2xl font-semibold tabular-nums text-brand">
              €{featured.price}
            </p>
            <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition group-hover:text-brand">
              Shop now
            </span>
          </div>
        </Link>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {grid.map((product) => (
            <ProductTile key={product.id} product={product} href={shopHref} />
          ))}
        </div>
      </div>
    </section>
  );
}
