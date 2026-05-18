import { createFileRoute } from "@tanstack/react-router";
import { optimizedImage } from "@/lib/image-url";

const ALLOWED_HOSTS = new Set(["upload.wikimedia.org"]);

export const Route = createFileRoute("/api/public/image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestUrl = new URL(request.url);
        const rawSrc = requestUrl.searchParams.get("src") ?? "";
        const width = Number(requestUrl.searchParams.get("w") ?? "500");

        let src: URL;
        try {
          src = new URL(rawSrc);
        } catch {
          return new Response("Bad image URL", { status: 400 });
        }

        if (src.protocol !== "https:" || !ALLOWED_HOSTS.has(src.hostname)) {
          return new Response("Forbidden", { status: 403 });
        }

        const imageUrl = optimizedImage(src.toString(), Number.isFinite(width) ? width : 500);
        const upstream = await fetch(imageUrl, {
          headers: { "user-agent": "Astralis Cosmic Atlas image cache" },
        });
        const contentType = upstream.headers.get("content-type") ?? "";

        if (!upstream.ok || !contentType.startsWith("image/")) {
          return new Response("Image unavailable", { status: 502 });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "content-type": contentType,
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
