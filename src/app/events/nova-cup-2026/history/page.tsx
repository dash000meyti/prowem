import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug } from "@/data";
import { notFound } from "next/navigation";

const chapters = [
  {
    year: "2022",
    title: "The inaugural night",
    body: "Sixteen clubs arrived in Berlin under a new mark — NOVA. The first final night at Olympiastadion District proved the idea: a short festival, high stakes, and a city that treated knockout football like theatre.",
  },
  {
    year: "2023",
    title: "Identity locks in",
    body: "Year two sharpened the brand. Orange under floodlights, tighter editorial, and a bracket that rewarded courage. Clubs began building seasons around four June nights in the capital.",
  },
  {
    year: "2024",
    title: "The district expands",
    body: "Venues across the Olympiastadion District synchronized into one matchday rhythm. Fan missions, partner challenges, and live storytelling turned spectators into participants.",
  },
  {
    year: "2025",
    title: "Marco Vesa’s Golden Boot",
    body: "Last cycle crowned finishers and storytellers alike — Golden Boot to Marco Vesa, Player of the Tournament to Leon Hartmann, and an Iron Wall for Stockholm Iron. The festival left Berlin louder than it found it.",
  },
  {
    year: "2026",
    title: "This week’s stage",
    body: "NOVA CUP returns with sixteen teams, four days, and a semi-final night already writing its own chapter. NEXUS FC and Berlin United share the capital’s attention while the rest of Europe watches the bracket tighten.",
  },
];

export default function EventHistoryPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Archive"
        title="NOVA CUP history"
        description="From the inaugural final night to this week’s knockout theatre — the festival that turned Berlin into a four-day football capital."
      />

      <div className="mb-14 max-w-3xl space-y-5 text-base leading-relaxed text-muted">
        <p>
          NOVA CUP was never meant to feel like another calendar fixture. It was
          built as a festival: short, loud, and precise — sixteen elite clubs,
          one city identity, and a data spine that feeds every surface from the
          bracket wall to the fan passport.
        </p>
        <p>
          Each June, Berlin becomes the stage. Matches spill across the
          Olympiastadion District. Clubs arrive with their own colours, then
          compete under a shared orange pulse. The result is not a league echo —
          it is sports media with a heartbeat.
        </p>
      </div>

      <ol className="space-y-0 border-l border-border pl-6 md:pl-8">
        {chapters.map((chapter) => (
          <li key={chapter.year} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-orange md:-left-[2.15rem]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
              {chapter.year}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              {chapter.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {chapter.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
