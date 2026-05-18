import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { createThreadId, loadThreads, saveThreads, type ResearchThread } from "@/lib/research-storage";

export const Route = createFileRoute("/research/")({
  head: () => ({
    links: [
      { rel: "canonical", href: "https://stardust-atlas-explorer.lovable.app/research" },
    ],
  }),
  component: ResearchIndex,
});

function ResearchIndex() {
  const navigate = useNavigate();
  useEffect(() => {
    const existing = loadThreads();
    if (existing.length > 0) {
      navigate({ to: "/research/$threadId", params: { threadId: existing[0].id }, replace: true });
      return;
    }
    const id = createThreadId();
    const t: ResearchThread = { id, title: "New conversation", updatedAt: Date.now(), messages: [] };
    saveThreads([t]);
    navigate({ to: "/research/$threadId", params: { threadId: id }, replace: true });
  }, [navigate]);
  return null;
}
