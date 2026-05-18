import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { bodies, categories, type Category } from "@/data/cosmos";
import { missions, statusColor, statusLabel } from "@/data/missions";
import { BodyCard } from "@/components/BodyCard";
import { ArrowRight, Rocket, Search, Sparkles, X } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astralis — Explore the Cosmos" },
      {
        name: "description",
        content:
          "An interactive atlas of planets, stars, galaxies, black holes, nebulae and meteors, plus live space missions.",
      },
      { property: "og:title", content: "Astralis — Explore the Cosmos" },
      {
        property: "og:description",
        content:
          "An interactive atlas of planets, stars, galaxies, black holes, nebulae and meteors, plus live space missions.",
      },
      { property: "og:url", content: "https://stardust-atlas-explorer.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://stardust-atlas-explorer.lovable.app/" }],
  }),
  component: Index,
});

type Filter = "all" | Category;

function Index() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bodies.filter((b) => {
      if (filter !== "all" && b.category !== filter) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.category.includes(q)
      );
    });
  }, [query, filter]);

  const featuredMissions = missions
    .filter((m) => m.status === "active" || m.status === "cruise")
    .slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="absolute left-1/2 top-10 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-aurora opacity-30 blur-3xl" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-accent" />
            An interactive cosmic atlas
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Wander the universe, <span className="text-gradient">one world at a time.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground sm:text-lg">
            From the cliffs of Mars to the event horizon of Sagittarius A*. Explore high-resolution
            imagery, vital stats, and the missions reshaping what we know about the cosmos.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-3 backdrop-blur-xl focus-within:border-accent">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search planets, stars, galaxies, black holes…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              aria-label="Search celestial bodies"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 glow"
            >
              <Sparkles className="h-4 w-4" /> Ask the Research AI
            </Link>
            <Link
              to="/missions"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-card"
            >
              <Rocket className="h-4 w-4" /> Live missions
            </Link>
            <Link
              to="/category/$category"
              params={{ category: "planets" }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-card"
            >
              Tour the planets <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Library
            </div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">The atlas</h2>
          </div>
          <div className="text-xs text-muted-foreground">
            {filtered.length} of {bodies.length}
          </div>
        </div>

        {/* Filter chips — horizontal scroll on mobile */}
        <div className="mb-6 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
              {c.label}
            </FilterChip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card/40 py-16 text-center text-sm text-muted-foreground">
            No matches for "<span className="text-foreground">{query}</span>".
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((b, index) => (
              <BodyCard key={b.id} body={b} priority={index < 4} />
            ))}
          </div>
        )}
      </section>

      {/* MISSIONS TEASER */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="rounded-3xl border border-border/60 bg-card/40 p-6 backdrop-blur sm:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Live Mission Feed
              </div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Humans &amp; robots, out there right now
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Track the latest missions from NASA, ISRO, ESA, CNSA and more — what they're doing,
                where they're going, what they've found.
              </p>
            </div>
            <Link
              to="/missions"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/20"
            >
              All missions <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featuredMissions.map((m) => (
              <Link
                key={m.id}
                to="/missions"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/40 transition-all hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={m.image}
                    alt={m.name}
                    targetWidth={500}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] backdrop-blur">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: statusColor[m.status] }}
                    />
                    {statusLabel[m.status]}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {m.flag} {m.agency} · {m.target}
                  </div>
                  <div className="mt-1 font-display text-base font-semibold">{m.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-all " +
        (active
          ? "border-accent bg-accent/15 text-foreground"
          : "border-border bg-card/40 text-muted-foreground hover:border-accent/40 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
