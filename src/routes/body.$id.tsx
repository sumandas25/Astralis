import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { bodies, categories, getBody } from "@/data/cosmos";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Compass,
  ExternalLink,
  Microscope,
  Rocket,
  Sparkles,
  Tag,
} from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { buildResearchLinks } from "@/lib/research-links";

export const Route = createFileRoute("/body/$id")({
  beforeLoad: ({ params }) => {
    if (!getBody(params.id)) throw notFound();
  },
  head: ({ params }) => {
    const b = getBody(params.id);
    const url = `https://stardust-atlas-explorer.lovable.app/body/${params.id}`;
    const title = `${b?.name ?? "Unknown"} — Astralis`;
    const desc = b?.tagline ?? "";
    const jsonLd = b
      ? {
          "@context": "https://schema.org",
          "@type": "Thing",
          name: b.name,
          description: b.description,
          image: b.image,
          url,
        }
      : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(b?.image ? [{ property: "og:image", content: b.image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: jsonLd ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] : [],
    };
  },
  component: BodyPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Body not found</h1>
      <Link to="/" className="mt-6 inline-block text-accent underline">
        Back to home
      </Link>
    </div>
  ),
});

function BodyPage() {
  const { id } = Route.useParams();
  const body = getBody(id)!;
  const cat = categories.find((c) => c.id === body.category)!;

  // Related: same category, exclude self, max 3
  const related = bodies
    .filter((b) => b.category === body.category && b.id !== body.id)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        to="/category/$category"
        params={{ category: body.category }}
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {cat.label}
      </Link>

      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-secondary shadow-[0_30px_80px_-20px_oklch(0_0_0/0.7)]">
          <div className="relative aspect-square sm:aspect-[4/3]">
            <SafeImage
              src={body.image}
              alt={body.name}
              targetWidth={960}
              priority
              className="object-cover animate-float"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: body.color }} />
              {cat.label}
            </span>
          </div>
        </div>

        <div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {body.name}
          </h1>
          <p className="mt-4 text-lg text-accent">{body.tagline}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{body.description}</p>
          <p className="mt-6 text-xs text-muted-foreground/70">Image: {body.imageCredit}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="mt-16">
        <h2 className="mb-5 font-display text-xl font-semibold">Vital statistics</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {body.stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-accent/50"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-2 font-display text-lg font-medium">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FACTS */}
      <section className="mt-16">
        <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
          <Sparkles className="h-4 w-4 text-accent" /> Did you know
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {body.facts.map((f, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5"
            >
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl"
                style={{ background: "var(--gradient-aurora)" }}
              />
              <p className="relative text-sm leading-relaxed text-foreground/90">{f}</p>
              <div className="relative mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Fact 0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEEP DIVE */}
      {body.extras && (
        <section className="mt-16">
          <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
            <BookOpen className="h-4 w-4 text-accent" /> Deep dive
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {body.extras.classification && (
              <DeepCard icon={<Tag className="h-3.5 w-3.5 text-accent" />} title="Classification">
                {body.extras.classification}
              </DeepCard>
            )}
            {body.extras.composition && (
              <DeepCard
                icon={<Microscope className="h-3.5 w-3.5 text-accent" />}
                title="Composition"
              >
                {body.extras.composition}
              </DeepCard>
            )}
            {body.extras.discovery && (
              <DeepCard icon={<Compass className="h-3.5 w-3.5 text-accent" />} title="Discovery">
                {body.extras.discovery}
              </DeepCard>
            )}
            {body.extras.nameOrigin && (
              <DeepCard icon={<BookOpen className="h-3.5 w-3.5 text-accent" />} title="Name origin">
                {body.extras.nameOrigin}
              </DeepCard>
            )}
            {body.extras.history && (
              <DeepCard icon={<BookOpen className="h-3.5 w-3.5 text-accent" />} title="History">
                {body.extras.history}
              </DeepCard>
            )}
            {body.extras.notableMissions && body.extras.notableMissions.length > 0 && (
              <DeepCard
                icon={<Rocket className="h-3.5 w-3.5 text-accent" />}
                title="Notable missions"
              >
                <ul className="space-y-1">
                  {body.extras.notableMissions.map((m) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </DeepCard>
            )}
          </div>
        </section>
      )}

      {/* RESEARCH & PUBLICATIONS */}
      <section className="mt-16">
        <h2 className="mb-2 flex items-center gap-2 font-display text-xl font-semibold">
          <BookOpen className="h-4 w-4 text-accent" /> Research &amp; publications
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Jump straight into peer-reviewed papers, preprints and authoritative references for{" "}
          <span className="text-foreground">{body.name}</span>.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {buildResearchLinks(body.name).map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card"
            >
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-semibold">{r.venue}</div>
                <div className="text-xs text-muted-foreground">{r.description}</div>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground/70">
          Tip: ask the Research AI for a curated reading list →{" "}
          <Link to="/research" className="text-accent hover:underline">
            /research
          </Link>
        </p>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">More {cat.label.toLowerCase()}</h2>
            <Link
              to="/category/$category"
              params={{ category: body.category }}
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              See all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((b) => (
              <Link
                key={b.id}
                to="/body/$id"
                params={{ id: b.id }}
                className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-accent/60"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <SafeImage
                    src={b.image}
                    alt={b.name}
                    targetWidth={250}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-semibold">{b.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{b.tagline}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function DeepCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-5">
      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {icon} {title}
      </div>
      <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}
