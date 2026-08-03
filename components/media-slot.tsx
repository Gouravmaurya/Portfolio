import type { MediaAsset } from "@/types/content";

export function MediaSlot({ asset, className = "", index }: { asset: MediaAsset; className?: string; index?: number }) {
  if (asset.status === "verified" && asset.src) {
    return <figure className={`media-slot verified ${className}`}><img src={asset.src} alt={asset.alt} /><figcaption>{asset.caption}</figcaption></figure>;
  }
  return <figure className={`media-slot placeholder ratio-${asset.aspectRatio.replace(":", "-")} ${className}`} aria-label={asset.alt}>
    <div className="slot-grid" aria-hidden="true"><i /><i /><i /><i /></div>
    <div className="slot-meta"><span>{index !== undefined ? String(index + 1).padStart(2, "0") : "MEDIA"}</span><span>{asset.aspectRatio}</span></div>
    <figcaption>{asset.caption ?? "MEDIA / TO BE REPLACED"}</figcaption>
  </figure>;
}
