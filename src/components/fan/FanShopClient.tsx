"use client";

import { ProductTile } from "@/components/club/ProductTile";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import { getClubById, getProductsForFan, resolveMedia } from "@/data";
import { useDemo } from "@/context/DemoProvider";

function productHref(clubId?: string) {
  if (!clubId) return "/fans/shop";
  const club = getClubById(clubId);
  return club ? `/clubs/${club.slug}/shop` : "/fans/shop";
}

export function FanShopClient() {
  const { follows } = useDemo();
  const { forYou, discover } = getProductsForFan(follows);

  return (
    <div>
      <PhotoBackground
        src={resolveMedia("shopJerseyRed", "jerseyDetail")}
        alt="Fan shop"
        scrim="heavy"
        className="min-h-[44vh] border-b border-border"
      >
        <div className="mx-auto flex min-h-[44vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-20 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Merch
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Fan Shop
          </h1>
          <p className="mt-4 max-w-xl text-base text-foreground/85">
            Kits and drops from the clubs and events you follow — plus Discover
            across the wider PROWEM arena.
          </p>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="mesh"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6"
      >
        <section>
          <SectionHeader
            eyebrow="For you"
            title="From your follows"
            description={
              forYou.length
                ? `${forYou.length} products matched to clubs and events you track.`
                : "Follow a club or event to unlock a personalised rail."
            }
            action={
              <Button href="/fans/profile" variant="ghost" size="sm">
                Following
              </Button>
            }
          />
          {forYou.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {forYou.map((product) => (
                <ProductTile
                  key={product.id}
                  product={product}
                  href={productHref(product.clubId)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              No matched merch yet — explore Discover below or follow Bayern /
              Dortmund from a club page.
            </p>
          )}
        </section>

        <section>
          <SectionHeader
            eyebrow="Discover"
            title="Across the arena"
            description="Everything else in the PROWEM merch layer."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {discover.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                href={productHref(product.clubId)}
              />
            ))}
          </div>
        </section>
      </SectionShell>
    </div>
  );
}
