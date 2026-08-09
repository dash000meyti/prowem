import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { VisualPanel } from "@/components/ui/VisualPanel";
import { getFeaturedMatch, getTeamById } from "@/data";

const paths = [
  {
    title: "Run an Event",
    subtext: "Create, operate and publish your competition from one platform.",
    cta: "Explore Event Platform",
    href: "/events/nova-cup-2026",
  },
  {
    title: "Build a Club",
    subtext: "Build the digital home for your club, teams and players.",
    cta: "Explore Club Platform",
    href: "/clubs/nexus",
  },
  {
    title: "Engage Your Fans",
    subtext: "Turn followers into an active fan community.",
    cta: "Explore Fan Experience",
    href: "/fans",
  },
  {
    title: "Experience the Match",
    subtext:
      "Live scores, stats, video and content — all from one match data layer.",
    cta: "Enter Match Center",
    href: "/matches/nova-cup/nexus-vs-berlin-united",
  },
];

export default function HomePage() {
  const match = getFeaturedMatch();
  const home = getTeamById(match.homeTeamId)!;
  const away = getTeamById(match.awayTeamId)!;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,90,31,0.18),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,90,31,0.08),transparent_35%),linear-gradient(180deg,#0d0f12_0%,#08090b_100%)]" />
        <div className="absolute inset-0 editorial-grid opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
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
            <VisualPanel tone="ember" className="p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  NOVA CUP · Semi Final
                </p>
                <LiveIndicator />
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <p className="text-lg font-semibold md:text-xl">{home.name}</p>
                <p className="text-4xl font-semibold tabular-nums text-orange md:text-5xl">
                  {match.homeScore}
                  <span className="mx-2 text-muted">—</span>
                  {match.awayScore}
                </p>
                <p className="text-right text-lg font-semibold md:text-xl">
                  {away.name}
                </p>
              </div>
              <p className="mt-4 text-sm text-orange">{match.minute}&apos; · Live data core</p>
            </VisualPanel>
            <div className="grid grid-cols-2 gap-3">
              <VisualPanel tone="steel" className="p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  Player pulse
                </p>
                <p className="mt-3 text-2xl font-semibold">Kai Novak</p>
                <p className="text-sm text-muted">2 goals · 8.4 rating</p>
              </VisualPanel>
              <VisualPanel tone="forest" className="p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  Fan layer
                </p>
                <p className="mt-3 text-2xl font-semibold">Alex</p>
                <p className="text-sm text-muted">L18 · Super Fan</p>
              </VisualPanel>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-orange">
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
              className="group border border-border bg-bg-1 p-6 transition hover:border-orange/40 hover:bg-bg-2 md:p-8"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-2xl font-semibold group-hover:text-orange">
                {path.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                {path.subtext}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-orange">
                {path.cta} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-1/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6">
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
            <div key={item.title}>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
