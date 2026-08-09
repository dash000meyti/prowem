import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/data";

export default function FanShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader
        eyebrow="Merch"
        title="Fan Shop"
        description="Official kits, scarves and limited drops from Bayern and Bundesliga."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col border border-border bg-bg-1 p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                {product.category}
              </p>
              {product.limited ? (
                <span className="text-[10px] uppercase tracking-[0.14em] text-orange">
                  Limited
                </span>
              ) : null}
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="mt-2 flex-1 text-sm text-muted">
              {product.description}
            </p>
            <p className="mt-5 text-xl font-semibold tabular-nums text-orange">
              €{product.price}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
