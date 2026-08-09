import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { MediaImage } from "@/components/media/MediaImage";
import { SectionShell } from "@/components/layout/SectionShell";
import { getFeaturedMatch, getTeamById, heroMedia, mediaCatalog } from "@/data";

const paths = [
  {
    title: "Run an Event",
    subtext: "Create, operate and publish your competition from one platform.",
    cta: "Explore Event Platform",
    href: "/events/nova-cup-2026",
    image: mediaCatalog.stadiumLights,
  },
  {
    title: "Build a Club",
    subtext: "Build the digital home for your club, teams and players.",
    cta: "Explore Club Platform",
    href: "/clubs/nexus",
    image: mediaCatalog.footballAction,
  },
  {
    title: "Engage Your Fans",
    subtext: "Turn followers into an active fan community.",
    cta: "Explore Fan Experience",
    href: "/fans",
    image: mediaCatalog.crowdOrange,
  },
  {
    title: "Experience the Match",
    subtext:
      "Live scores, stats, video and content — all from one match data layer.",
    cta: "Enter Match Center",
    href: "/matches/nova-cup/nexus-vs-berlin-united",
    image: mediaCatalog.pitchAerial,
  },
];

export default function HomePage() {
  const match = getFeaturedMatch();
  const home = getTeamById(match.homeTeamId)!;
  const away = getTeamById(match.awayTeamId)!;

  return (
    <div>
      <PhotoBackground
        src={heroMedia.home}
        alt="Stadium night atmosphere"
        priority
        scrim="heavy"
        className="min-h-[88vh] border-b border-border"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange">
              PROWEM
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Run Sports.
              <br />
              Build Communities.
              <br />
              Create Experiences.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              One platform for sports events, clubs, live matches and fans.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/events/nova-cup-2026" size="lg">
                Run an Event
              </Button>
              <Button href="/clubs/nexus" variant="outline" size="lg">
                Build a Club
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="space-y-4">
            <GlassPanel className="overflow-hidden p-5 md:p-6">
              <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.14]">
                <Crest slug={home.slug} name={home.name} size={140} />
              </div>
              <div className="relative mb-5 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  NOVA CUP · Semi Final
                </p>
                <LiveIndicator />
              </div>
              <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="flex items-center gap-2">
                  <Crest slug={home.slug} name={home.name} size={28} />
                  <p className="text-base font-semibold md:text-lg">{home.name}</p>
                </div>
                <p className="text-4xl font-semibold tabular-nums text-orange md:text-5xl">
                  {match.homeScore}
                  <span className="mx-2 text-muted">—</span>
                  {match.awayScore}
                </p>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-right text-base font-semibold md:text-lg">
                    {away.name}
                  </p>
                  <Crest slug={away.slug} name={away.name} size={28} />
                </div>
              </div>
              <p className="relative mt-4 text-sm text-orange">
                {match.minute}&apos; · Live data core
              </p>
            </GlassPanel>
            <div className="grid grid-cols-2 gap-3">
              <GlassPanel variant="subtle" className="overflow-hidden p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  Player pulse
                </p>
                <p className="mt-3 text-xl font-semibold">Kai Novak</p>
                <p className="text-sm text-muted">2 goals · 8.4 rating</p>
                <Link
                  href="/clubs/nexus/players/kai-novak"
                  className="mt-3 inline-block text-[11px] uppercase tracking-[0.14em] text-orange"
                >
                  Open profile →
                </Link>
              </GlassPanel>
              <GlassPanel variant="subtle" className="p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  Fan layer
                </p>
                <p className="mt-3 text-xl font-semibold">Alex</p>
                <p className="text-sm text-muted">L18 · Super Fan</p>
              </GlassPanel>
            </div>
          </FadeIn>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        className="border-b border-border"
        innerClassName="mx-auto max-w-7xl px-4 py-20 md:px-6"
      >
        <p className="text-xs uppercase tracking-[0.22em] text-brand">
          Four primary experiences
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          One data source. Many branded destinations.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {paths.map((path, index) => (
            <Link
              key={path.href}
              href={path.href}
              className="group relative min-h-[240px] overflow-hidden rounded-[18px] border border-[var(--glass-border)]"
            >
              <MediaImage src={path.image} alt={path.title} />
              <div className="absolute inset-0 photo-scrim-heavy" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold group-hover:text-brand">
                  {path.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {path.subtext}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-brand">
                  {path.cta} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        atmosphere="mesh"
        innerClassName="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <MediaImage src={mediaCatalog.footballKick} alt="" />
          <div className="absolute inset-0 bg-bg-0/80" />
        </div>
        {[
          {
            title: "Your competition. Your identity.",
            body: "Every event gets its own branded digital home — powered by the same platform.",
          },
          {
            title: "From live data to live content.",
            body: "A goal updates scores, tables, social drafts, video markers and fan XP together.",
          },
          {
            title: "Built for every sport.",
            body: "Football today. Dota 2 tonight. Architecture that stays sport-agnostic.",
          },
        ].map((item) => (
          <GlassPanel key={item.title} variant="subtle" className="relative p-6">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </GlassPanel>
        ))}
      </SectionShell>
    </div>
  );
}
