import { Button } from "@/components/ui/Button";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { resolveMedia } from "@/data/media";

export function ClubCommunityBand({ clubName }: { clubName: string }) {
  return (
    <PhotoBackground
      src={resolveMedia("fansCommunity", "crowdOrange")}
      alt={`${clubName} fans`}
      scrim="heavy"
      className="min-h-[340px] border-y border-border"
    >
      <div className="mx-auto flex min-h-[340px] max-w-7xl flex-col justify-center px-4 py-16 md:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
          Fandom
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          Join our community
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          Missions, rewards and Matchday moments for {clubName} supporters —
          one fan layer across every arena.
        </p>
        <div className="mt-8">
          <Button href="/fans">Sign up</Button>
        </div>
      </div>
    </PhotoBackground>
  );
}
