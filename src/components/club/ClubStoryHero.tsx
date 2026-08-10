import { Button } from "@/components/ui/Button";
import { FollowButton } from "@/components/fan/FollowButton";
import { Crest } from "@/components/media/Crest";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { resolveMedia } from "@/data/media";
import type { Club } from "@/types";

export function ClubStoryHero({
  club,
  eyebrow,
  primaryCta,
}: {
  club: Club;
  eyebrow: string;
  primaryCta: { href: string; label: string };
}) {
  const cover = resolveMedia(
    club.theme.coverImage ?? club.theme.heroImage,
    "footballAction",
  );

  return (
    <PhotoBackground
      src={cover}
      alt={`${club.name} cover`}
      priority
      scrim="heavy"
      className="min-h-[78vh] border-b border-border"
    >
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24">
        <div className="mb-6 md:mb-8">
          <Crest slug={club.slug} name={club.name} size={128} />
        </div>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.36em] text-brand">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          {club.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-foreground/85 md:text-xl">
          {club.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
          <FollowButton kind="club" id={club.id} label={club.name} />
          <Button href="/fans" variant="ghost">
            Fan hub
          </Button>
        </div>
        <p className="sr-only">{club.description}</p>
      </div>
    </PhotoBackground>
  );
}
