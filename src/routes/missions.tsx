import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  missions,
  statusColor,
  statusLabel,
  type MissionStatus,
  type Mission,
} from "@/data/missions";
import { ArrowLeft, Calendar, Target, Radio, ExternalLink, BookOpen } from "lucide-react";
import { SafeImage } from "@/components/SafeImage";
import { wikipediaUrl, buildResearchLinks } from "@/lib/research-links";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Live Missions — Astralis" },
      {
        name: "description",
        content: "Latest cosmic and astronomical missions from NASA, ISRO, ESA, CNSA and more.",
      },
      { property: "og:title", content: "Live Missions — Astralis" },
      {
        property: "og:description",
        content: "Track the missions reshaping our understanding of the cosmos.",
      },
      { property: "og:url", content: "https://stardust-atlas-explorer.lovable.app/missions" },
    ],
    links: [{ rel: "canonical", href: "https://stardust-atlas-explorer.lovable.app/missions" }],
  }),
  component: MissionsPage,
});

type CountryTab = {
  id: string;
  label: string;
  flag: string;
};

const countryTabs: CountryTab[] = [
  { id: "All", label: "All", flag: "🛰️" },
  { id: "United States", label: "USA", flag: "🇺🇸" },
  { id: "India", label: "India", flag: "🇮🇳" },
  { id: "China", label: "China", flag: "🇨🇳" },
  { id: "European Union", label: "Europe", flag: "🇪🇺" },
  { id: "International", label: "Global", flag: "🌍" },
];

// Order in which status sections appear within a country
const statusOrder: MissionStatus[] = ["upcoming", "active", "cruise", "completed"];

const statusDescription: Record<MissionStatus, string> = {
  upcoming: "Planned launches and missions on the horizon",
  active: "Currently operating at their destination",
  cruise: "Spacecraft en route to their target",
  completed: "Missions whose primary goals have concluded",
};

function MissionsPage() {
  const [country, setCountry] = useState<string>("All");

  // Counts per country (drives badge numbers on tabs)
  const countsByCountry = useMemo(() => {
    const counts: Record<string, number> = { All: missions.length };
    for (const m of missions) counts[m.country] = (counts[m.country] ?? 0) + 1;
    return counts;
  }, []);

  const visibleMissions = useMemo(
    () => (country === "All" ? missions : missions.filter((m) => m.country === country)),
    [country],
  );

  // Group visible missions by status
  const grouped = useMemo(() => {
    const g: Record<MissionStatus, Mission[]> = {
      upcoming: [],
      active: [],
      cruise: [],
      completed: [],
    };
    for (const m of visibleMissions) g[m.status].push(m);
    return g;
  }, [visibleMissions]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>

      <header className="mb-10 max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Mission Control
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Humanity's <span className="text-gradient">live</span> exploration of the cosmos
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Pick a space agency below to see what they're launching next, what's flying now, and what
          they've already achieved.
        </p>
      </header>

      {/* COUNTRY TABS — primary navigation */}
      <div
        role="tablist"
        aria-label="Filter missions by country"
        className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:px-0 sm:overflow-visible"
      >
        {countryTabs.map((t) => {
          const active = country === t.id;
          const count = countsByCountry[t.id] ?? 0;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setCountry(t.id)}
              className={
                "group inline-flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium transition-all " +
                (active
                  ? "border-accent bg-accent/15 text-foreground shadow-[0_8px_30px_-12px_var(--glow)]"
                  : "border-border bg-card/40 text-muted-foreground hover:border-accent/40 hover:text-foreground")
              }
            >
              <span className="text-base leading-none">{t.flag}</span>
              <span>{t.label}</span>
              <span
                className={
                  "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums " +
                  (active ? "bg-accent/30 text-foreground" : "bg-muted text-muted-foreground")
                }
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* GROUPED SECTIONS — one section per status */}
      <div className="space-y-12">
        {statusOrder.map((s) => {
          const list = grouped[s];
          if (list.length === 0) return null;
          return (
            <section key={s} aria-labelledby={`section-${s}`}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden>
                    {s === "active" && (
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ backgroundColor: statusColor[s] }}
                      />
                    )}
                    <span
                      className="relative inline-flex h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: statusColor[s] }}
                    />
                  </span>
                  <h2
                    id={`section-${s}`}
                    className="font-display text-xl font-semibold sm:text-2xl"
                  >
                    {statusLabel[s]}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({list.length})
                    </span>
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">{statusDescription[s]}</p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {list.map((m) => (
                  <MissionCard key={m.id} mission={m} />
                ))}
              </div>
            </section>
          );
        })}

        {visibleMissions.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">
            No missions to show for this selection yet.
          </p>
        )}
      </div>
    </main>
  );
}

function MissionCard({ mission: m }: { mission: Mission }) {
  const wiki = wikipediaUrl(m.name);
  const ads = buildResearchLinks(m.name)[1].url; // NASA ADS
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_60px_-15px_var(--glow)]">
      <a
        href={wiki}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${m.name} on Wikipedia`}
        className="relative block aspect-[16/10] overflow-hidden bg-secondary"
      >
        <SafeImage
          src={m.image}
          alt={m.name}
          targetWidth={500}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] backdrop-blur">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: statusColor[m.status] }}
          />
          {statusLabel[m.status]}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-xs backdrop-blur">
          <span className="mr-1">{m.flag}</span>
          <span className="text-muted-foreground">{m.agency}</span>
        </div>
      </a>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{m.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{m.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-border/60 bg-background/40 p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <Target className="h-3 w-3" /> Target
            </div>
            <div className="mt-1 font-medium text-foreground">{m.target}</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/40 p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <Calendar className="h-3 w-3" /> Launched
            </div>
            <div className="mt-1 font-medium text-foreground">{m.launched}</div>
          </div>
        </div>

        <ul className="space-y-1.5">
          {m.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Radio className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-border/60 pt-3">
          <a
            href={wiki}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/10"
          >
            <ExternalLink className="h-3 w-3" /> Learn more
          </a>
          <a
            href={ads}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent/10"
          >
            <BookOpen className="h-3 w-3" /> Papers (NASA ADS)
          </a>
        </div>
      </div>
    </article>
  );
}
