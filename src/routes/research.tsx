import { createFileRoute, Link, Outlet, useNavigate, useParams, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, MessageSquare, Telescope } from "lucide-react";
import { createThreadId, loadThreads, saveThreads, type ResearchThread } from "@/lib/research-storage";
import researchBot from "@/assets/research-bot.png";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — Astralis" },
      { name: "description", content: "AI-powered astronomy research chatbot with links to journals, arXiv and NASA ADS publications." },
      { property: "og:title", content: "Research Assistant — Astralis" },
      { property: "og:description", content: "Chat with an astronomy research AI. Cite arXiv, NASA ADS, and peer-reviewed papers." },
      { property: "og:url", content: "https://stardust-atlas-explorer.lovable.app/research" },
    ],
  }),
  component: ResearchLayout,
});

function ResearchLayout() {
  const navigate = useNavigate();
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [threads, setThreads] = useState<ResearchThread[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Active threadId from URL match (child route /research/$threadId)
  const activeId = useMemo(() => {
    const m = pathname.match(/^\/research\/([^/]+)/);
    return m?.[1] ?? null;
  }, [pathname]);

  // Hydrate from localStorage once; refresh on route changes so child writes propagate
  useEffect(() => {
    setThreads(loadThreads());
    setHydrated(true);
  }, [pathname]);

  function newThread() {
    const id = createThreadId();
    const t: ResearchThread = { id, title: "New conversation", updatedAt: Date.now(), messages: [] };
    const next = [t, ...loadThreads()];
    saveThreads(next);
    setThreads(next);
    navigate({ to: "/research/$threadId", params: { threadId: id } });
  }

  function deleteThread(id: string) {
    const next = loadThreads().filter((t) => t.id !== id);
    saveThreads(next);
    setThreads(next);
    if (id === activeId) {
      if (next.length > 0) {
        navigate({ to: "/research/$threadId", params: { threadId: next[0].id } });
      } else {
        navigate({ to: "/research" });
      }
    } else {
      router.invalidate();
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-4 px-3 py-6 sm:px-6 lg:gap-6">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-20 rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur">
          <div className="mb-3 flex items-center gap-2 px-1">
            <img src={researchBot} alt="" width={28} height={28} className="rounded-full" />
            <div className="leading-tight">
              <div className="text-xs font-semibold">Research AI</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Astralis</div>
            </div>
          </div>

          <button
            onClick={newThread}
            className="mb-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-aurora px-3 py-2 text-xs font-medium text-primary-foreground glow"
          >
            <Plus className="h-3.5 w-3.5" /> New conversation
          </button>

          <div className="px-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">History</div>
          <div className="mt-2 max-h-[60vh] space-y-1 overflow-y-auto pr-1">
            {!hydrated ? null : threads.length === 0 ? (
              <div className="px-2 py-6 text-center text-xs text-muted-foreground">
                No conversations yet.
              </div>
            ) : (
              threads.map((t) => {
                const active = t.id === activeId;
                return (
                  <div
                    key={t.id}
                    className={
                      "group flex items-center gap-1 rounded-lg border px-2 py-1.5 text-left transition-colors " +
                      (active
                        ? "border-accent/60 bg-accent/10"
                        : "border-transparent hover:border-border hover:bg-muted/40")
                    }
                  >
                    <Link
                      to="/research/$threadId"
                      params={{ threadId: t.id }}
                      className="flex min-w-0 flex-1 items-center gap-2 text-xs text-foreground"
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{t.title}</span>
                    </Link>
                    <button
                      onClick={() => deleteThread(t.id)}
                      className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100"
                      aria-label="Delete conversation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex w-full min-w-0 flex-col">
        <div className="mb-3 flex items-center justify-between gap-2 md:hidden">
          <div className="flex items-center gap-2">
            <img src={researchBot} alt="" width={24} height={24} className="rounded-full" />
            <span className="text-sm font-semibold">Research AI</span>
          </div>
          <div className="flex items-center gap-2">
            {threads.length > 0 && (
              <select
                value={activeId ?? ""}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v) navigate({ to: "/research/$threadId", params: { threadId: v } });
                }}
                className="max-w-[180px] truncate rounded-md border border-border bg-card/60 px-2 py-1 text-xs"
              >
                <option value="" disabled>Conversations…</option>
                {threads.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            )}
            <button
              onClick={newThread}
              className="inline-flex items-center gap-1 rounded-md bg-aurora px-2.5 py-1.5 text-xs font-medium text-primary-foreground"
            >
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </div>
        </div>

        <Outlet />

        {!activeId && hydrated && (
          <EmptyHero onStart={newThread} />
        )}
      </div>
    </div>
  );
}

function EmptyHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur sm:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <img src={researchBot} alt="" width={72} height={72} className="mx-auto mb-4" />
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Telescope className="h-3 w-3 text-accent" /> AI Research Assistant
        </div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Ask anything about the <span className="text-gradient">cosmos</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Get cited answers about planets, black holes, missions and theory — with links to arXiv,
          NASA ADS and peer-reviewed journals.
        </p>
        <button
          onClick={onStart}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-primary-foreground glow"
        >
          <Plus className="h-4 w-4" /> Start a new conversation
        </button>
        <div className="mt-8 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
          {[
            "Latest evidence for the Hubble tension",
            "What's the chemistry of Titan's lakes?",
            "Recent JWST findings on early galaxies",
            "Mechanisms behind fast radio bursts",
          ].map((s) => (
            <div key={s} className="rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-xs text-muted-foreground">
              "{s}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { useParams };
