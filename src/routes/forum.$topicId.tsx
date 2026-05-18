import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquare, Send, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { formatRelative } from "./forum.index";

interface Topic {
  id: string;
  title: string;
  body: string;
  category: string;
  created_at: string;
  user_id: string;
  author: string;
}
interface Reply {
  id: string;
  body: string;
  created_at: string;
  user_id: string;
  author: string;
}

export const Route = createFileRoute("/forum/$topicId")({
  head: ({ params }) => {
    const url = `https://stardust-atlas-explorer.lovable.app/forum/${params.topicId}`;
    return {
      meta: [{ title: `Discussion — Astralis Forum` }, { name: "robots", content: "noindex" }],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { topicId } = Route.useParams();
  const { user, profile } = useAuth();
  const [topic, setTopic] = useState<Topic | null | undefined>(undefined);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data: t } = await supabase
      .from("forum_topics")
      .select("id, title, body, category, created_at, user_id")
      .eq("id", topicId)
      .maybeSingle();
    if (!t) {
      setTopic(null);
      return;
    }
    const { data: r } = await supabase
      .from("forum_replies")
      .select("id, body, created_at, user_id")
      .eq("topic_id", topicId)
      .order("created_at", { ascending: true });
    const userIds = [...new Set([t.user_id, ...(r ?? []).map((x) => x.user_id)])];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, username")
      .in("user_id", userIds);
    const nameMap = new Map((profiles ?? []).map((p) => [p.user_id, p.username]));
    setTopic({ ...t, author: nameMap.get(t.user_id) ?? "user" });
    setReplies((r ?? []).map((x) => ({ ...x, author: nameMap.get(x.user_id) ?? "user" })));
    if (typeof document !== "undefined") document.title = `${t.title} — Astralis Forum`;
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !body.trim()) return;
    setBusy(true);
    const { error } = await supabase
      .from("forum_replies")
      .insert({ topic_id: topicId, user_id: user.id, body: body.trim() });
    setBusy(false);
    if (!error) {
      setBody("");
      load();
    }
  }

  if (topic === undefined) return null;
  if (topic === null) {
    return (
      <div className="py-12 text-center">
        <h2 className="font-display text-2xl">Topic not found</h2>
        <Link to="/forum" className="mt-4 inline-block text-accent underline">
          Back to forum
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/forum"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All topics
      </Link>

      <article className="rounded-2xl border border-border/60 bg-card/60 p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
            {topic.category}
          </span>
          <span>·</span>
          <span className="text-foreground">@{topic.author}</span>
          <span>·</span>
          <span>{formatRelative(topic.created_at)}</span>
        </div>
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{topic.title}</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {topic.body}
        </p>
      </article>

      <section className="mt-8">
        <h3 className="mb-4 inline-flex items-center gap-2 font-display text-lg font-semibold">
          <MessageSquare className="h-4 w-4 text-accent" /> {replies.length} replies
        </h3>
        <ul className="space-y-3">
          {replies.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border/60 bg-card/40 p-4">
              <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="text-foreground">@{r.author}</span>
                <span>·</span>
                <span>{formatRelative(r.created_at)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {r.body}
              </p>
            </li>
          ))}
          {replies.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-6 text-center text-sm text-muted-foreground">
              No replies yet — be the first.
            </li>
          )}
        </ul>
      </section>

      {user ? (
        <form
          onSubmit={submit}
          className="mt-6 grid gap-3 rounded-2xl border border-accent/30 bg-card/70 p-5"
        >
          <div className="text-xs text-muted-foreground">
            Replying as{" "}
            <span className="font-medium text-accent">@{profile?.username ?? "you"}</span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a reply…"
            rows={4}
            className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="self-end inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {busy ? "Posting…" : "Post reply"}
          </button>
        </form>
      ) : (
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-border/60 bg-card/40 p-5 text-sm">
          <span className="text-muted-foreground">Sign in to join the discussion.</span>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-aurora px-4 py-2 text-xs font-medium text-primary-foreground"
          >
            <LogIn className="h-3.5 w-3.5" /> Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
