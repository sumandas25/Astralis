/**
 * Rewrite existing Wikimedia Commons thumbnail URLs to a requested size.
 *
 * Full-size Wikimedia file URLs are left unchanged. Many small Commons files do
 * not support larger generated thumb sizes, and those failed image responses can
 * leave cards stuck on the placeholder.
 */
export function resizeWikimedia(src: string, width: number): string {
  if (!src) return src;
  // Wikimedia no longer generates every arbitrary thumbnail width. Requesting
  // unsupported sizes returns a 400 HTML page, which browsers block as an image.
  const allowedWidths = [120, 250, 330, 500, 960, 1280, 1920];
  const target = Math.max(1, Math.round(width));
  const w = allowedWidths.find((candidate) => candidate >= target) ?? allowedWidths.at(-1)!;

  try {
    const cleanSrc = src.split("?")[0];

    if (/upload\.wikimedia\.org\/.+\/thumb\//.test(cleanSrc)) {
      return cleanSrc.replace(/\/(\d+)px-([^/]+)$/, `/${w}px-$2`);
    }

    const m = cleanSrc.match(
      /^(https?:\/\/upload\.wikimedia\.org\/wikipedia\/[^/]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^/?#]+)$/i,
    );
    if (m) {
      const [, base, a, b, file] = m;
      const ext = (file.split(".").pop() || "").toLowerCase();
      if (ext === "tif" || ext === "tiff" || ext === "svg" || ext === "pdf") {
        return `${base}/thumb/${a}/${b}/${file}/${w}px-${file}.jpg`;
      }
    }
  } catch {
    /* fall through */
  }

  return src;
}

/** Best-effort URL slimming for any supported CDN. Currently only Wikimedia. */
export function optimizedImage(src: string, width: number): string {
  return resizeWikimedia(src, width);
}
