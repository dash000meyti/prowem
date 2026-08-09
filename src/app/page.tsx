import { HomeHero } from "@/components/marketing/HomeHero";
import { AudienceIntro } from "@/components/marketing/AudienceIntro";
import { ServiceMarquee } from "@/components/marketing/ServiceMarquee";
import { ServiceFeature } from "@/components/marketing/ServiceFeature";
import { PlatformCtaBand } from "@/components/marketing/PlatformCtaBand";
import { mediaCatalog } from "@/data";

const services = [
  {
    id: "event-platform",
    index: "01 — Event infrastructure",
    indexShort: "01",
    title: "Stage sports and digital competitions with clarity.",
    body: "Run tournaments and leagues end to end — publish fixtures, standings, news and live data under a branded event destination fans recognize instantly.",
    points: [
      "Operate football, socca, esports and more on one sport-agnostic layer",
      "Publish schedules, tables, brackets, stats and editorial content",
      "Own a branded digital home for every competition you run",
    ],
    image: mediaCatalog.stadiumLights,
    imageAlt: "Stadium lights over a competition venue",
    atmosphere: "contrast" as const,
    reverse: false,
  },
  {
    id: "club-platform",
    index: "02 — Club infrastructure",
    indexShort: "02",
    title: "Make the club the center of every team and fan.",
    body: "Give clubs a digital headquarters for multi-sport teams, player stories and a fan club that turns supporters into a lasting community.",
    points: [
      "Present club identity, history and multi-team structures in one place",
      "Surface player profiles, news and team destinations by sport",
      "Activate a fan club with missions, rewards and belonging",
    ],
    image: mediaCatalog.jerseyDetail,
    imageAlt: "Club jersey detail close-up",
    atmosphere: "tint" as const,
    reverse: true,
  },
  {
    id: "matchday-platform",
    index: "03 — Matchday infrastructure",
    indexShort: "03",
    title: "From stream to story — automatically.",
    body: "Capture the match, push live information, generate match reports as the game unfolds, and ship social stories from the same data the moment the whistle blows.",
    points: [
      "Connect filming and streaming with live scores, stats and timelines",
      "Automate live match reporting from a single data event",
      "Produce post-match social stories grounded in real match data",
    ],
    image: mediaCatalog.nightMatch,
    imageAlt: "Night match under stadium lights",
    atmosphere: "mesh" as const,
    reverse: false,
  },
  {
    id: "consulting",
    index: "04 — Consulting & design",
    indexShort: "04",
    title: "Shape better sports events from the ground up.",
    body: "Partner with PROWEM to design formats, digital journeys and operational improvements that make every competition sharper for organizers, clubs and fans.",
    points: [
      "Advise on event structure, fan journeys and digital touchpoints",
      "Design branded experiences that feel premium on every screen",
      "Improve how competitions run — before, during and after matchday",
    ],
    image: mediaCatalog.celebration,
    imageAlt: "Celebration atmosphere after a sports moment",
    atmosphere: "contrast" as const,
    reverse: true,
  },
];

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <ServiceMarquee />
      <AudienceIntro />
      {services.map((service) => (
        <ServiceFeature key={service.id} {...service} />
      ))}
      <PlatformCtaBand />
    </div>
  );
}
