import { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { optimizedImage } from "@/lib/image-url";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Optional fallback URL to try before showing the gradient placeholder. */
  fallbackSrc?: string;
  /** Target render width in CSS px (used to slim CDN thumbnails). Defaults to 640. */
  targetWidth?: number;
  /** If true, eager-load + high fetchpriority for above-the-fold imagery. */
  priority?: boolean;
}

/**
 * Image with graceful degradation + perf hints:
 *  - rewrites Wikimedia thumbs to a sensible width (smaller payloads)
 *  - lazy-loads by default, async decoding
 *  - shows an animated gradient placeholder while loading
 *  - falls back to fallbackSrc, then a styled placeholder, so layout never breaks
 */
export function SafeImage({
  src,
  alt,
  fallbackSrc,
  targetWidth = 640,
  priority = false,
  className,
  onLoad,
  onError,
  ...rest
}: SafeImageProps) {
  const sources = useMemo(() => {
    const candidates = [
      optimizedImage(src, targetWidth),
      src,
      fallbackSrc ? optimizedImage(fallbackSrc, targetWidth) : undefined,
      fallbackSrc,
    ].filter(Boolean) as string[];

    return Array.from(new Set(candidates));
  }, [fallbackSrc, src, targetWidth]);
  const [loaded, setLoaded] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [errored, setErrored] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const currentSrc = sources[sourceIndex] ?? src;

  useEffect(() => {
    setSourceIndex(0);
    setLoaded(false);
    setErrored(false);
  }, [sources]);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [currentSrc]);

  return (
    <div className="relative h-full w-full">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          loaded && !errored ? "opacity-0" : "opacity-100",
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.32 0.08 280) 0%, oklch(0.18 0.04 270) 50%, oklch(0.12 0.02 260) 100%)",
        }}
        aria-hidden
      >
        <div className="absolute inset-0 animate-pulse opacity-40 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {!errored && (
        <img
          {...rest}
          ref={imageRef}
          src={currentSrc}
          alt={alt}
          loading={rest.loading ?? (priority ? "eager" : "lazy")}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          referrerPolicy="origin"
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
          onError={(e) => {
            if (sourceIndex < sources.length - 1) {
              setSourceIndex((index) => index + 1);
              setLoaded(false);
            } else {
              setErrored(true);
            }
            onError?.(e);
          }}
          className={cn(
            "h-full w-full transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      )}

      {errored && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
