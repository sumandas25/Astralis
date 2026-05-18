export const SITE_URL = "https://stardust-atlas-explorer.lovable.app";

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return `${SITE_URL}${path}`;
}
