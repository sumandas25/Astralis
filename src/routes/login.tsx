import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/use-auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Astralis" },
      { name: "description", content: "Sign in or create an account to join the Astralis community forum." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/forum" });
  }, [user, loading, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const clean = username.trim().replace(/[^a-zA-Z0-9_]/g, "");
        if (clean.length < 3) throw new Error("Username must be 3+ characters (letters, numbers, _).");
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/forum`,
            data: { username: clean },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setInfo("Check your inbox — we sent a verification link to confirm your email before you can sign in.");
          return;
        }
        router.invalidate();
        navigate({ to: "/forum" });
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("If an account exists for that email, a password reset link is on its way.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (/email/i.test(error.message) && /confirm/i.test(error.message)) {
            throw new Error("Please verify your email first — check your inbox for the confirmation link.");
          }
          throw error;
        }
        router.invalidate();
        navigate({ to: "/forum" });
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function resendVerification() {
    if (!email) return setErr("Enter your email above first.");
    setErr(null);
    setInfo(null);
    setBusy(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/forum` },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setInfo("Verification email resent. Check your inbox.");
  }

  async function google() {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/forum`,
    });
    if (result.error) setErr(result.error.message);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <Link to="/forum" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to forum
      </Link>

      <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
        <h1 className="font-display text-2xl font-semibold">
          {mode === "signin" ? "Sign in" : mode === "signup" ? "Create your account" : "Reset your password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Welcome back, explorer."
            : mode === "signup"
              ? "Pick a handle — your username will appear on every post you make. We'll email you a verification link."
              : "Enter your email and we'll send you a link to set a new password."}
        </p>

        {mode !== "forgot" && (
          <>
            <button
              onClick={google}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/60"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.4-1.6 4.1-5.4 4.1-3.3 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.6 14.6 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.1 0-.6-.1-1-.2-1.5H12z"/>
              </svg>
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="h-px flex-1 bg-border/60" /> or <div className="h-px flex-1 bg-border/60" />
            </div>
          </>
        )}

        <form onSubmit={submit} className="mt-5 grid gap-3">
          {mode === "signup" && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (3-30, letters/numbers/_)"
              className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
              required
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9_]+"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
            required
          />
          {mode !== "forgot" && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-accent/70"
              required
              minLength={6}
            />
          )}
          {err && <p className="text-xs text-destructive">{err}</p>}
          {info && <p className="text-xs text-emerald-400">{info}</p>}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {mode === "signin" ? <LogIn className="h-4 w-4" /> : mode === "signup" ? <UserPlus className="h-4 w-4" /> : null}
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
          </button>
        </form>

        <div className="mt-4 grid gap-2 text-center text-xs text-muted-foreground">
          {mode === "signin" && (
            <>
              <button onClick={() => { setErr(null); setInfo(null); setMode("forgot"); }} className="hover:text-foreground">
                Forgot your password?
              </button>
              <button onClick={() => { setErr(null); setInfo(null); setMode("signup"); }} className="hover:text-foreground">
                New here? Create an account
              </button>
            </>
          )}
          {mode === "signup" && (
            <>
              <button onClick={resendVerification} className="hover:text-foreground" disabled={busy}>
                Didn't get the verification email? Resend it
              </button>
              <button onClick={() => { setErr(null); setInfo(null); setMode("signin"); }} className="hover:text-foreground">
                Already have an account? Sign in
              </button>
            </>
          )}
          {mode === "forgot" && (
            <button onClick={() => { setErr(null); setInfo(null); setMode("signin"); }} className="hover:text-foreground">
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
