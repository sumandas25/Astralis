import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { bodies, categories, type CelestialBody } from "@/data/cosmos";
import { SafeImage } from "@/components/SafeImage";
import { ArrowLeft, ArrowLeftRight, Shuffle, X } from "lucide-react";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare celestial bodies — Astralis" },
      {
        name: "description",
        content:
          "Place any two planets, moons, stars, galaxies or black holes side by side and compare their vital statistics.",
      },
      { property: "og:title", content: "Compare celestial bodies — Astralis" },
      {
        property: "og:description",
        content:
          "Place any two planets, moons, stars, galaxies or black holes side by side and compare their vital statistics.",
      },
      { property: "og:url", content: "https://stardust-atlas-explorer.lovable.app/compare" },
    ],
    links: [{ rel: "canonical", href: "https://stardust-atlas-explorer.lovable.app/compare" }],
  }),
  component: ComparePage,
});

function ComparePage() {
  const [leftId, setLeftId] = useState<string>("earth");
  const [rightId, setRightId] = useState<string>("mars");

  const left = bodies.find((b) => b.id === leftId);
  const right = bodies.find((b) => b.id === rightId);

  function shuffle() {
    const a = bodies[Math.floor(Math.random() * bodies.length)];
    let b = bodies[Math.floor(Math.random() * bodies.length)];
    if (b.id === a.id) b = bodies[(bodies.indexOf(b) + 1) % bodies.length];
    setLeftId(a.id);
    setRightId(b.id);
  }
  function swap() {
    setLeftId(rightId);
    setRightId(leftId);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to atlas
      </Link>

      <header className="mb-10 max-w-3xl">
        <div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-accent">Compare</div>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          Two worlds, side by side.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Pick any two objects in the atlas to compare diameters, distances, mass, temperatures and
          more.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <button
          onClick={swap}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm transition-colors hover:border-accent/60"
        >
          <ArrowLeftRight className="h-4 w-4" /> Swap
        </button>
        <button
          onClick={shuffle}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm transition-colors hover:border-accent/60"
        >
          <Shuffle className="h-4 w-4" /> Shuffle
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <BodyColumn body={left} value={leftId} onChange={setLeftId} side="A" />
        <BodyColumn body={right} value={rightId} onChange={setRightId} side="B" />
      </div>

      {left && right && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold">Stat-by-stat</h2>
          <StatGrid left={left} right={right} />
        </section>
      )}
    </main>
  );
}

function BodyColumn({
  body,
  value,
  onChange,
  side,
}: {
  body: CelestialBody | undefined;
  value: string;
  onChange: (id: string) => void;
  side: "A" | "B";
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/60">
      <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-background/40 px-4 py-3">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Body {side}
        </span>
        <Picker value={value} onChange={onChange} />
      </div>
      {body ? (
        <>
          <div className="relative aspect-[4/3] bg-secondary">
            <SafeImage src={body.image} alt={body.name} targetWidth={960} priority />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
            <span
              className="absolute right-3 top-3 inline-flex h-2.5 w-2.5 rounded-full ring-4 ring-card/60"
              style={{ backgroundColor: body.color }}
              aria-hidden
            />
          </div>
          <div className="p-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {body.category.replace("-", " ")}
            </div>
            <h3 className="mt-1 font-display text-2xl font-semibold">{body.name}</h3>
            <p className="mt-1 text-sm text-accent">{body.tagline}</p>
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{body.description}</p>
            <Link
              to="/body/$id"
              params={{ id: body.id }}
              className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              Full profile →
            </Link>
          </div>
        </>
      ) : (
        <div className="flex h-72 items-center justify-center text-sm text-muted-foreground">
          Choose a body.
        </div>
      )}
    </div>
  );
}

function Picker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-foreground outline-none transition-colors focus:border-accent/70"
    >
      {categories.map((c) => (
        <optgroup key={c.id} label={c.label}>
          {bodies
            .filter((b) => b.category === c.id)
            .map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
        </optgroup>
      ))}
    </select>
  );
}

function StatGrid({ left, right }: { left: CelestialBody; right: CelestialBody }) {
  // Union of stat labels, preserving order: left first, then any extra from right.
  const rows = useMemo(() => {
    const seen = new Set<string>();
    const out: { label: string; a?: string; b?: string }[] = [];
    for (const s of left.stats) {
      seen.add(s.label);
      out.push({
        label: s.label,
        a: s.value,
        b: right.stats.find((r) => r.label === s.label)?.value,
      });
    }
    for (const s of right.stats) {
      if (seen.has(s.label)) continue;
      out.push({ label: s.label, a: undefined, b: s.value });
    }
    return out;
  }, [left, right]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/60">
      <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] border-b border-border/60 bg-background/40 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:grid">
        <span>Metric</span>
        <span className="text-foreground">{left.name}</span>
        <span className="text-foreground">{right.name}</span>
      </div>
      <ul className="divide-y divide-border/40">
        {rows.map((r) => (
          <li
            key={r.label}
            className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:gap-3"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {r.label}
            </span>
            <span className="font-display text-base">
              <span className="text-muted-foreground sm:hidden">{left.name}: </span>
              {r.a ?? <Missing />}
            </span>
            <span className="font-display text-base">
              <span className="text-muted-foreground sm:hidden">{right.name}: </span>
              {r.b ?? <Missing />}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Missing() {
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground/60">
      <X className="h-3 w-3" /> n/a
    </span>
  );
}
