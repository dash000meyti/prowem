import { Bracket } from "@/components/match/Bracket";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { bracket, getEventBySlug } from "@/data";
import { notFound } from "next/navigation";

export default function EventBracketPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Knockout"
        title="Tournament bracket"
        description="Quarter-finals through the final — every path still drawn under the NOVA lights."
      />
      <Bracket items={bracket} />
    </div>
  );
}
