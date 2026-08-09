import type { VideoItem } from "@/types";
import { VisualPanel } from "@/components/ui/VisualPanel";
import { Play } from "lucide-react";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="overflow-hidden border border-border bg-bg-1">
      <VisualPanel tone={video.imageTone} className="h-44 rounded-none border-0">
        <div className="flex h-full flex-col justify-between p-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-orange">
            <Play className="h-4 w-4 fill-current" />
          </span>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>{video.duration}</span>
            <span>{video.views} views</span>
          </div>
        </div>
      </VisualPanel>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-orange">
          {video.category}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug">{video.title}</h3>
      </div>
    </article>
  );
}
