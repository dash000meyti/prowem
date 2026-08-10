import { ProductTile } from "@/components/club/ProductTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getClubBySlug,
  getProductsByClubId,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const products = getProductsByClubId(club.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeader
        eyebrow="Merch"
        title={`Shop ${club.name}`}
        description="Official kits, scarves, balls and apparel for the stands and the stage."
      />
      {products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              href={`/clubs/${slug}/shop`}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No club merch listed yet.</p>
      )}
    </div>
  );
}
