import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  Telescope,
  X,
  Rocket,
  Sparkles,
  GitCompareArrows,
  MessagesSquare,
  LogIn,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Compass,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/cosmos";
import { useAuth, signOut } from "@/lib/use-auth";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<null | "explore" | "community">(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu(null);
    }
    if (menu) {
      document.addEventListener("mousedown", onDown);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const exploreActive = pathname.startsWith("/category/");
  const communityActive =
    pathname === "/compare" || pathname.startsWith("/forum") || pathname === "/missions";

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-aurora glow">
            <Telescope className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight">Astralis</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Cosmic Atlas
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav ref={menuRef} className="hidden items-center gap-1 md:flex">
          {/* Explore dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenu(menu === "explore" ? null : "explore")}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors " +
                (exploreActive || menu === "explore"
                  ? "bg-primary/20 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground")
              }
              aria-haspopup="menu"
              aria-expanded={menu === "explore"}
            >
              <Compass className="h-3.5 w-3.5" /> Explore
              <ChevronDown
                className={
                  "h-3.5 w-3.5 transition-transform " + (menu === "explore" ? "rotate-180" : "")
                }
              />
            </button>
            {menu === "explore" && (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                  Browse by category
                </div>
                <div className="grid">
                  {categories.map((c) => {
                    const active = pathname === `/category/${c.id}`;
                    return (
                      <Link
                        key={c.id}
                        to="/category/$category"
                        params={{ category: c.id }}
                        className={
                          "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors " +
                          (active ? "bg-primary/15 text-foreground" : "hover:bg-muted")
                        }
                      >
                        <span className="mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <span className="flex-1">
                          <span className="block font-medium leading-tight">{c.label}</span>
                          <span className="block text-xs text-muted-foreground">{c.blurb}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Community dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenu(menu === "community" ? null : "community")}
              className={
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors " +
                (communityActive || menu === "community"
                  ? "bg-primary/20 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground")
              }
              aria-haspopup="menu"
              aria-expanded={menu === "community"}
            >
              <Users className="h-3.5 w-3.5" /> Community
              <ChevronDown
                className={
                  "h-3.5 w-3.5 transition-transform " + (menu === "community" ? "rotate-180" : "")
                }
              />
            </button>
            {menu === "community" && (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <Link
                  to="/compare"
                  className={
                    "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors " +
                    (pathname === "/compare" ? "bg-primary/15" : "hover:bg-muted")
                  }
                >
                  <GitCompareArrows className="mt-0.5 h-4 w-4 text-accent" />
                  <span>
                    <span className="block font-medium leading-tight">Compare bodies</span>
                    <span className="block text-xs text-muted-foreground">
                      Stack any two celestial objects side-by-side.
                    </span>
                  </span>
                </Link>
                <Link
                  to="/forum"
                  className={
                    "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors " +
                    (pathname.startsWith("/forum") ? "bg-primary/15" : "hover:bg-muted")
                  }
                >
                  <MessagesSquare className="mt-0.5 h-4 w-4 text-accent" />
                  <span>
                    <span className="block font-medium leading-tight">Forum</span>
                    <span className="block text-xs text-muted-foreground">
                      Join discussions with fellow explorers.
                    </span>
                  </span>
                </Link>
                <Link
                  to="/missions"
                  className={
                    "flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors " +
                    (pathname === "/missions" ? "bg-primary/15" : "hover:bg-muted")
                  }
                >
                  <Rocket className="mt-0.5 h-4 w-4 text-accent" />
                  <span>
                    <span className="block font-medium leading-tight">Live missions</span>
                    <span className="block text-xs text-muted-foreground">
                      Track active space exploration in real time.
                    </span>
                  </span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/research"
            className={
              "ml-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors " +
              (pathname.startsWith("/research")
                ? "bg-aurora text-primary-foreground"
                : "border border-accent/40 text-foreground hover:bg-accent/15")
            }
          >
            <Sparkles className="h-3.5 w-3.5" /> Research AI
          </Link>
          {user ? (
            <div className="ml-2 flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs">
              <UserIcon className="h-3.5 w-3.5 text-accent" />
              <span className="font-medium">@{profile?.username ?? "you"}</span>
              <button
                onClick={() => signOut()}
                className="ml-1 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogIn className="h-3.5 w-3.5" /> <span className="hidden lg:inline">Sign in</span>
            </Link>
          )}
        </nav>

        {/* Mobile trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border bg-card/40 px-2.5 py-1 text-xs">
              <UserIcon className="h-3 w-3 text-accent" /> @{profile?.username ?? "you"}
            </span>
          ) : null}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={
          "fixed inset-x-0 top-16 z-30 origin-top overflow-y-auto border-b border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden " +
          (open ? "max-h-[calc(100vh-4rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0")
        }
      >
        <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
          {user ? (
            <div className="mb-2 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm">
              <span className="inline-flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-accent" /> @{profile?.username ?? "you"}
              </span>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="mb-2 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm font-medium"
            >
              <span className="inline-flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Sign in
              </span>
            </Link>
          )}
          <Link
            to="/research"
            className={
              "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors " +
              (pathname.startsWith("/research")
                ? "bg-aurora text-primary-foreground"
                : "border border-accent/30 bg-accent/5 text-foreground")
            }
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Research AI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Ask</span>
          </Link>
          <Link
            to="/missions"
            className={
              "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors " +
              (pathname === "/missions"
                ? "bg-aurora text-primary-foreground"
                : "border border-accent/30 bg-accent/5 text-foreground")
            }
          >
            <span className="inline-flex items-center gap-2">
              <Rocket className="h-4 w-4" /> Live Missions
            </span>
          </Link>
          <Link
            to="/compare"
            className={
              "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors " +
              (pathname === "/compare"
                ? "bg-primary/20 text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
          >
            <span className="inline-flex items-center gap-2">
              <GitCompareArrows className="h-4 w-4" /> Compare bodies
            </span>
          </Link>
          <Link
            to="/forum"
            className={
              "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors " +
              (pathname.startsWith("/forum")
                ? "bg-primary/20 text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
          >
            <span className="inline-flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" /> Community forum
            </span>
          </Link>
          <div className="pt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 px-2">
            Categories
          </div>
          {categories.map((c) => {
            const active = pathname === `/category/${c.id}`;
            return (
              <Link
                key={c.id}
                to="/category/$category"
                params={{ category: c.id }}
                className={
                  "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors " +
                  (active
                    ? "bg-primary/20 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground")
                }
              >
                <span>{c.label}</span>
                <span className="text-[10px] text-muted-foreground/70">{c.blurb}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
