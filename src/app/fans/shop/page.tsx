import { ProductTile } from "@/components/club/ProductTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/data";

export default function FanShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader
        eyebrow="Merch"
        title="Fan Shop"
        description="Official kits, scarves and limited drops from Bayern, Dortmund and the wider PROWEM arena."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
