import type { ClubPatron } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShoppingBag, Trophy } from "lucide-react";

function formatEuros(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function PatronRow({
  patron,
  rank,
  detail,
}: {
  patron: ClubPatron;
  rank?: number;
  detail: string;
}) {
  return (
    <li className="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
      {rank != null ? (
        <span className="w-6 text-xs font-semibold tabular-nums text-brand">
          {rank}
        </span>
      ) : null}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-bg-2 text-xs font-semibold text-brand">
        {patron.name
          .split(" ")
          .map((p) => p[0])
          .slice(0, 2)
          .join("")}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{patron.name}</p>
        <p className="truncate text-xs text-muted">
          {patron.city}
          {detail ? ` · ${detail}` : ""}
        </p>
      </div>
    </li>
  );
}

export function ClubPatronsSection({
  clubName,
  topPatrons,
  recentShoppers,
}: {
  clubName: string;
  topPatrons: ClubPatron[];
  recentShoppers: ClubPatron[];
}) {
  if (topPatrons.length === 0 && recentShoppers.length === 0) return null;

  return (
    <section>
      <SectionHeader
        eyebrow="Community"
        title={`Supporters of ${clubName}`}
        description="Fans who fund the club through memberships, donations and shop purchases."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {topPatrons.length > 0 ? (
          <div className="border border-border bg-bg-1 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-brand" aria-hidden />
              <h3 className="text-sm font-semibold tracking-tight">
                Top 10 financial supporters
              </h3>
            </div>
            <ol className="m-0 list-none p-0">
              {topPatrons.map((patron, i) => (
                <PatronRow
                  key={patron.id}
                  patron={patron}
                  rank={i + 1}
                  detail={formatEuros(patron.totalContributed)}
                />
              ))}
            </ol>
          </div>
        ) : null}

        {recentShoppers.length > 0 ? (
          <div className="border border-border bg-bg-1 p-5">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-brand" aria-hidden />
              <h3 className="text-sm font-semibold tracking-tight">
                Latest shop buyers
              </h3>
            </div>
            <ul className="m-0 list-none p-0">
              {recentShoppers.map((patron) => (
                <PatronRow
                  key={`shop-${patron.id}`}
                  patron={patron}
                  detail={[
                    patron.lastPurchaseLabel,
                    patron.lastPurchaseAt
                      ? formatWhen(patron.lastPurchaseAt)
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
