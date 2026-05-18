import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageSquare, Plus, Users, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";

export const FORUM_CATEGORIES = [
  { id: "general", label: "General" },
  { id: "planets", label: "Planets" },
  { id: "moons", label: "Moons" },
  { id: "stars", label: "Stars" },
  { id: "galaxies", label: "Galaxies" },
  { id: "black-holes", label: "Black holes" },
  { id: "nebulae", label: "Nebulae" },
  { id: "meteors", label: "Meteors" },
  { id: "missions", label: "Missions" },
  { id: "research", label: "Research & papers" },
] as const;

interface TopicRow {
  id: string;
  title: string;
  body: string;
  category: string;
  created_at: string;
  user_id: string;
  author: string;
  reply_count: number;
}

export const Route = createFileRoute("/forum/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://stardust-atlas-explorer.lovable.app/forum" }],
  }),
  component: ForumIndex,
});

function ForumIndex() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<TopicRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  async function load() {
    setLoading(true);
    const { data: topicsData } = await supabase
      .from("forum_topics")
      .select("id, title, body, category, created_at, user_id")
      .order("created_at", { ascending: false });
    if (!topicsData) {
      setTopics([]);
      setLoading(false);
      return;
    }
    const userIds = [...new Set(topicsData.map((t) => t.user_id))];
    const topicIds = topicsData.map((t) => t.id);
    const [{ data: profiles }, { data: replies }] = await Promise.all([
      supabase.from("profiles").select("user_id, username").in("user_id", userIds),
      supabase.from("forum_replies").select("topic_id").in("topic_id", topicIds),
    ]);
    const nameMap = new Map((profiles ?? []).map((p) => [p.user_id, p.username]));
    const countMap = new Map<string, number>();
    (replies ?? []).forEach((r) => countMap.set(r.topic_id, (countMap.get(r.topic_id) ?? 0) + 1));
    setTopics(
      topicsData.map((t) => ({
        ...t,
        author: nameMap.get(t.user_id) ?? "user",
        reply_count: countMap.get(t.id) ?? 0,
      })),
    );
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const visible = filter === "all" ? topics : topics.filter((t) => t.category === filter);

  return (
    <>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-accent">Community</div>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">Forum</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Sign in to post under your handle. Browse without an account — your identity stays
            attached to every topic and reply.
          </p>
        </div>
        {user ? (
          <button
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-aurora px-4 py-2 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            <Plus className="h-4 w-4" /> {creating ? "Close" : "New topic"}
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-aurora px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <LogIn className="h-4 w-4" /> Sign in to post
          </Link>
        )}
      </header>

      {user && profile && (
        <div className="mb-5 text-xs text-muted-foreground">
          Posting as <span className="font-medium text-accent">@{profile.username}</span>
        </div>
      )}

      {creating && user && (
        <NewTopicForm
          onCreate={(id) => {
            setCreating(false);
            navigate({ to: "/forum/$topicId", params: { topicId: id } });
          }}
        />
      )}

      <div className="mb-5 flex flex-wrap gap-1.5">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </Chip>
        {FORUM_CATEGORIES.map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center text-sm text-muted-foreground">
          Loading topics…
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center text-sm text-muted-foreground">
          No topics here yet. Start the conversation.
        </div>
      ) : (
        <ul className="grid gap-3">
          {visible.map((t) => (
            <li key={t.id}>
              <Link
                to="/forum/$topicId"
                params={{ topicId: t.id }}
                className="group flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60"
              >
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
                    {labelFor(t.category)}
                  </span>
                  <span>·</span>
                  <span className="text-foreground">@{t.author}</span>
                  <span>·</span>
                  <span>{formatRelative(t.created_at)}</span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-accent">
                  {t.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{t.body}</p>
                <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground/80">
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> {t.reply_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> 1+
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function NewTopicForm({ onCreate }: { onCreate: (id: string) => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [cat, setCat] = useState("general");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    setErr(null);
    const { data, error } = await supabase
      .from("forum_topics")
      .insert({ title: title.trim(), body: body.trim(), category: cat, user_id: user.id })
      .select("id")
      .single();
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    if (data) onCreate(data.id);
  }

  return (
    <form
      onSubmit={submit}
      className="mb-8 grid gap-3 rounded-2xl border border-accent/30 bg-card/70 p-5"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Topic title"
          className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
          required
          maxLength={140}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
        >
          {FORUM_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="What's on your mind?"
        rows={5}
        className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
        required
      />
      {err && <p className="text-xs text-destructive">{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="self-end rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {busy ? "Posting…" : "Post topic"}
      </button>
    </form>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 text-xs transition-colors " +
        (active
          ? "border-accent/60 bg-accent/15 text-accent"
          : "border-border bg-card/40 text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

function labelFor(id: string) {
  return FORUM_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}
