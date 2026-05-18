import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/forum")({
  head: () => ({
    meta: [
      { title: "Community forum — Astralis" },
      {
        name: "description",
        content: "Discuss astronomy, missions and research with the Astralis community.",
      },
      { property: "og:title", content: "Community forum — Astralis" },
      {
        property: "og:description",
        content: "Discuss astronomy, missions and research with the Astralis community.",
      },
      { property: "og:url", content: "https://stardust-atlas-explorer.lovable.app/forum" },
    ],
  }),
  component: ForumLayout,
});

function ForumLayout() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to atlas
      </Link>
      <Outlet />
    </main>
  );
}
