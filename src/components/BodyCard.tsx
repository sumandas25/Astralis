import { Link } from "@tanstack/react-router";
import type { CelestialBody } from "@/data/cosmos";
import { ArrowUpRight } from "lucide-react";
import { SafeImage } from "./SafeImage";

export function BodyCard({ body, priority = false }: { body: CelestialBody; priority?: boolean }) {
  return (
    <Link
      to="/body/$id"
      params={{ id: body.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_20px_60px_-15px_var(--glow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <SafeImage
          src={body.image}
          alt={body.name}
          targetWidth={500}
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span
          className="absolute right-3 top-3 inline-flex h-2 w-2 rounded-full ring-4 ring-card/60"
          style={{ backgroundColor: body.color }}
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight">{body.name}</h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{body.tagline}</p>
        <span className="mt-auto pt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          {body.category.replace("-", " ")}
        </span>
      </div>
    </Link>
  );
}
