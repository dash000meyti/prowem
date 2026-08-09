import { HomeHero } from "@/components/marketing/HomeHero";
import { AudienceIntro } from "@/components/marketing/AudienceIntro";
import { ServiceFeature } from "@/components/marketing/ServiceFeature";
import { PlatformCtaBand } from "@/components/marketing/PlatformCtaBand";
import { mediaCatalog } from "@/data";

const services = [
  {
    id: "event-platform",
    index: "01 — Event",
    title: "Stage competitions with clarity.",
    body: "Run tournaments end to end — fixtures, standings, news and live data under a branded destination.",
    points: [
      "Sport-agnostic leagues and cups",
      "Schedules, tables, brackets and stats",
      "Your competition. Your identity.",
    ],
    image: mediaCatalog.stadiumLights,
    imageAlt: "Stadium lights over a competition venue",
    theme: "ember" as const,
    reverse: false,
  },
  {
    id: "club-platform",
    index: "02 — Club",
    title: "Make the club the center.",
    body: "A digital headquarters for multi-sport teams, player stories and a lasting fan community.",
    points: [
      "Club identity and multi-team structure",
      "Players, news and sport destinations",
      "Fan club with missions and belonging",
    ],
    image: mediaCatalog.jerseyDetail,
    imageAlt: "Club jersey detail close-up",
    theme: "steel" as const,
    reverse: true,
  },
  {
    id: "matchday-platform",
    index: "03 — Matchday",
    title: "From stream to story — automatically.",
    body: "Live data, automated reports, and social stories from the same match layer.",
    points: [
      "Streaming connected to live scores",
      "Automated match reporting",
      "Post-match stories from real data",
    ],
    image: mediaCatalog.nightMatch,
    imageAlt: "Night match under stadium lights",
    theme: "night" as const,
    reverse: false,
  },
  {
    id: "consulting",
    index: "04 — Consulting",
    title: "Shape better sports events.",
    body: "Design formats, journeys and operations that make every competition sharper.",
    points: [
      "Event structure and fan journeys",
      "Premium branded experience design",
      "Before, during and after matchday",
    ],
    image: mediaCatalog.celebration,
    imageAlt: "Celebration atmosphere after a sports moment",
    theme: "amber" as const,
    reverse: true,
  },
];

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <div className="marketing-canvas">
        <AudienceIntro />
        <div className="mx-auto max-w-5xl px-4 pb-4 pt-6 md:px-6">
          <p className="text-center text-[11px] uppercase tracking-[0.28em] text-orange/80">
            Services
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-center text-3xl font-semibold tracking-tight md:text-4xl">
            Infrastructure for modern sports.
          </h2>
        </div>
        {services.map((service) => (
          <ServiceFeature key={service.id} {...service} />
        ))}
        <PlatformCtaBand />
      </div>
    </div>
  );
}
