import { AwardCard, LegendCard } from "@/components/event/AwardLegendCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAwardsByEventId,
  getEventBySlug,
  legends,
} from "@/data";
import { notFound } from "next/navigation";

const historyBySlug: Record<
  string,
  {
    title: string;
    description: string;
    chapters: { year: string; title: string; body: string }[];
  }
> = {
  bundesliga: {
    title: "Bundesliga history",
    description:
      "Germany's top flight — decades of Matchdays, rivalries, and Der Klassiker nights.",
    chapters: [
      {
        year: "1963",
        title: "The league begins",
        body: "The Bundesliga launches as Germany's unified professional top division, reshaping club football across the country.",
      },
      {
        year: "1970s",
        title: "European glory",
        body: "German clubs — led by Bayern Munich — dominate European nights while the league's identity hardens at home.",
      },
      {
        year: "2000s",
        title: "Global stage",
        body: "Broadcast reach expands. Der Klassiker becomes a worldwide appointment as Dortmund's Yellow Wall defines atmosphere.",
      },
      {
        year: "2025/26",
        title: "This season",
        body: "Bayern chase another title. Dortmund push from the Yellow Wall. Werder fight for mid-table steel on the Weser.",
      },
    ],
  },
  "socca-austria-pro": {
    title: "Socca Austria Pro League",
    description:
      "Vienna's cage competition under Socca Austria — intensity, tempo, and club brands.",
    chapters: [
      {
        year: "2018",
        title: "Pro structure forms",
        body: "Socca Austria organises a professional pathway for cage football with Vienna as the competitive hub.",
      },
      {
        year: "2024/25",
        title: "European club brands",
        body: "Bayern, Dortmund, Werder and Lorient field socca sides alongside Vienna's Meridians, Iron and Pulse.",
      },
    ],
  },
  "the-international": {
    title: "The International",
    description:
      "Dota 2's world championship — the Aegis, the main stage, and the season's defining series.",
    chapters: [
      {
        year: "2011",
        title: "TI is born",
        body: "Valve crowns the first International champions and establishes the template for modern esports spectacle.",
      },
      {
        year: "TI13",
        title: "Copenhagen stage",
        body: "Royal Arena hosts upper-bracket wars — including Bayern Dota 2 vs Dortmund Dota 2 — en route to the Grand Final.",
      },
    ],
  },
};

export default async function EventHeritagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const pack = historyBySlug[slug] ?? {
    title: `${event.name} history`,
    description: event.description,
    chapters: [
      {
        year: event.startDate.slice(0, 4),
        title: "Current cycle",
        body: event.description,
      },
    ],
  };

  const awards = getAwardsByEventId(event.id);
  const eventLegends = legends.filter((l) => l.eventId === event.id);
  const displayLegends =
    eventLegends.length > 0 ? eventLegends : legends.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 md:px-6">
      <section>
        <SectionHeader
          eyebrow="Heritage"
          title={pack.title}
          description={pack.description}
        />
        <div className="space-y-8">
          {pack.chapters.map((chapter) => (
            <article
              key={chapter.year + chapter.title}
              className="border-b border-border pb-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-brand">
                {chapter.year}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{chapter.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                {chapter.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {awards.length > 0 ? (
        <section>
          <SectionHeader
            eyebrow="Honours"
            title="Awards"
            description="Titles and recognition from this competition cycle."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeader
          eyebrow="Legacy"
          title="Legends"
          description="Icons and nights that still shape how this event is remembered."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayLegends.map((legend) => (
            <LegendCard key={legend.id} legend={legend} />
          ))}
        </div>
      </section>
    </div>
  );
}
