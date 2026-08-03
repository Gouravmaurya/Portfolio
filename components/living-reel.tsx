import type { MediaAsset } from "@/types/content";
import { MediaSlot } from "./media-slot";

export function LivingReel({ frames, variant = "hero" }: { frames: MediaAsset[]; variant?: "hero" | "divider" | "final" }) {
  return <div className={`living-reel reel-${variant}`} aria-label="Selected project media reel"><div className="reel-track">{[...frames, ...frames].map((frame, index) => <MediaSlot asset={frame} index={index % frames.length} key={`${frame.id}-${index}`} className="reel-frame" />)}</div></div>;
}
