import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Astralis" },
      { name: "description", content: "Set a new password for your Astralis account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase auto-exchanges the recovery link into a session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (password.length < 6) return setErr("Password must be at least 6 characters.");
    if (password !== confirm) return setErr("Passwords don't match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return setErr(error.message);
    setMsg("Password updated. Redirecting…");
    setTimeout(() => navigate({ to: "/forum" }), 1200);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <Link
        to="/login"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
      <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
        <h1 className="font-display text-2xl font-semibold">Set a new password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ready
            ? "Choose a strong password you haven't used before."
            : "Verifying your recovery link…"}
        </p>
        <form onSubmit={submit} className="mt-5 grid gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            disabled={!ready}
            className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70 disabled:opacity-50"
            required
            minLength={6}
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            disabled={!ready}
            className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70 disabled:opacity-50"
            required
            minLength={6}
          />
          {err && <p className="text-xs text-destructive">{err}</p>}
          {msg && <p className="text-xs text-emerald-400">{msg}</p>}
          <button
            type="submit"
            disabled={!ready || busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            <KeyRound className="h-4 w-4" />
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}
