import { MissionCard } from "@/components/fan/MissionCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { missions } from "@/data";

export default function FanMissionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader
        eyebrow="Engage"
        title="Missions"
        description="Watch, predict, quiz, attend and partner challenges — complete them for XP."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </div>
  );
}
