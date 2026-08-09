"use client";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { useDemo } from "@/context/DemoProvider";

export function SocialPostPreview() {
  const { socialPosts } = useDemo();
  const post = socialPosts[0];

  if (!post) {
    return (
      <GlassPanel
        variant="subtle"
        className="border-dashed p-6 text-sm text-muted"
      >
        Trigger a live goal to generate social content from match data.
      </GlassPanel>
    );
  }

  return (
    <GlassPanel as="article" className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.16em] text-orange">
          {post.platform} draft
        </span>
        <span className="text-xs text-muted">{post.minute}&apos;</span>
      </div>
      <GlassPanel variant="strong" className="overflow-hidden p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-orange">
          {post.headline}
        </p>
        <p className="mt-3 text-xl font-semibold">{post.body}</p>
        <p className="mt-4 text-sm text-muted">{post.scoreLine}</p>
      </GlassPanel>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary">
          Edit
        </Button>
        <Button size="sm">Publish</Button>
        <Button size="sm" variant="outline">
          Schedule
        </Button>
      </div>
    </GlassPanel>
  );
}
