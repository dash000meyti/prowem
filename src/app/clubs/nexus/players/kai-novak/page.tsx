import { Button } from "@/components/ui/Button";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { MediaImage } from "@/components/media/MediaImage";
import {
  getPlayerBySlug,
  getTeamById,
  getClubForTeam,
  heroMedia,
} from "@/data";
import { notFound } from "next/navigation";
import {
  Ruler,
  Weight,
  Shirt,
  Footprints,
  Flag,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function KaiNovakProfilePage() {
  const player = getPlayerBySlug("kai-novak");
  if (!player) notFound();
  const team = getTeamById(player.teamId)!;
  const club = getClubForTeam(team.id);

  const attributes = [
    { icon: Ruler, label: "Height", value: "182 cm" },
    { icon: Weight, label: "Weight", value: "76 kg" },
    { icon: Shirt, label: "Shirt #", value: String(player.number ?? 8) },
    { icon: Footprints, label: "Preferred foot", value: "Right" },
    { icon: Flag, label: "Nationality", value: player.nationality },
    { icon: TrendingUp, label: "Market value", value: "€18.4M" },
    { icon: Calendar, label: "Contract", value: "Jun 2028" },
    { icon: Calendar, label: "Joined", value: "Jul 2023" },
  ];

  const footerStats = [
    { label: "Matches", value: String(player.stats.appearances ?? 19) },
    { label: "Goals", value: String(player.stats.goals ?? 5) },
    { label: "Assists", value: String(player.stats.assists ?? 7) },
    {
      label: "Rating",
      value: player.rating?.toFixed(1) ?? "8.4",
      highlight: true,
    },
  ];

  return (
    <div>
      <PhotoBackground
        src={heroMedia.home}
        alt="Stadium night"
        priority
        scrim="heavy"
        className="min-h-screen border-b border-border"
      >
        <div className="mx-auto max-w-5xl space-y-5 px-4 py-14 md:px-6 md:py-20">
          <GlassPanel className="overflow-hidden p-0">
            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px] md:min-h-[420px]">
                <MediaImage
                  src={heroMedia.player}
                  alt={player.name}
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,9,11,0.85)] via-transparent to-transparent md:bg-gradient-to-r" />
                <div className="absolute bottom-4 left-4 z-10 md:hidden">
                  <p className="text-3xl font-semibold">{player.name}</p>
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]">
                  <Crest slug={team.slug} name={team.name} size={260} />
                </div>
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="hidden text-4xl font-semibold tracking-tight md:block">
                      {player.name}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Crest slug={team.slug} name={team.name} size={28} />
                      <p className="text-sm text-muted">
                        {club?.name ?? team.name}
                      </p>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">
                      Age {player.age} · {player.nationality} · {player.role} · #
                      {player.number}
                    </p>
                  </div>
                  <Button size="sm" className="shrink-0">
                    Follow
                  </Button>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {attributes.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 text-orange" />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[var(--glass-border)] pt-5 sm:grid-cols-4">
                  {footerStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                        {stat.label}
                      </p>
                      <p
                        className={`mt-1 text-xl font-semibold tabular-nums ${
                          stat.highlight ? "text-orange" : ""
                        }`}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-orange">
                  Season form
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  2025/26 · NOVA CUP
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted">{player.bio}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
              <GlassPanel variant="subtle" className="overflow-hidden p-0">
                <div className="relative aspect-[4/3]">
                  <MediaImage src={heroMedia.matchCenter} alt="Pitch map" />
                  <div className="absolute inset-0 bg-[rgba(8,9,11,0.45)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-40 w-28 rounded-sm border border-white/20 bg-[#0b3d2e]/40">
                      <span className="absolute left-1/2 top-[30%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-orange shadow-[0_0_12px_rgba(255,90,31,0.8)]" />
                      <span className="absolute left-[35%] top-[55%] h-2 w-2 rounded-full bg-orange/80" />
                      <span className="absolute left-[62%] top-[48%] h-2 w-2 rounded-full bg-orange/70" />
                    </div>
                  </div>
                </div>
              </GlassPanel>

              <GlassPanel variant="subtle" className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crest slug="nexus-fc" name="NEXUS FC" size={24} />
                    <span className="text-sm font-semibold">2</span>
                    <span className="text-muted">—</span>
                    <span className="text-sm font-semibold">1</span>
                    <Crest
                      slug="berlin-united"
                      name="Berlin United"
                      size={24}
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-orange">
                    Live SF
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="text-muted">Shot type:</span> Right foot
                  </p>
                  <p>
                    <span className="text-muted">Situation:</span> Open play
                  </p>
                  <p>
                    <span className="text-muted">xG:</span> 0.31
                  </p>
                  <p>
                    <span className="text-muted">Result:</span>{" "}
                    <span className="text-orange">
                      Goal · 12&apos; & 72&apos;
                    </span>
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/matches/nova-cup/nexus-vs-berlin-united">
                    Open Match Center
                  </Button>
                  <Button href="/clubs/nexus/teams/football" variant="outline">
                    NEXUS FC
                  </Button>
                </div>
              </GlassPanel>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>
    </div>
  );
}
