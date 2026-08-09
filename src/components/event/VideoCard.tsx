import type { VideoItem } from "@/types";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { resolveMedia } from "@/data/media";
import { Play } from "lucide-react";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <GlassPanel as="article" className="overflow-hidden">
      <div className="relative h-44">
        <MediaImage
          src={resolveMedia(video.imageTone, "footballKick")}
          alt={video.title}
          sizes="400px"
        />
        <div className="absolute inset-0 photo-scrim-light" />
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-orange">
            <Play className="h-4 w-4 fill-current" />
          </span>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted">
            <span>{video.duration}</span>
            <span>{video.views} views</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[10px] uppercase tracking-[0.16em] text-orange">
          {video.category}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug">{video.title}</h3>
      </div>
    </GlassPanel>
  );
}
