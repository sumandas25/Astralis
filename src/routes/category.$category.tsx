import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { byCategory, categories, type Category } from "@/data/cosmos";
import { BodyCard } from "@/components/BodyCard";
import { ArrowLeft } from "lucide-react";

const valid = new Set<Category>(categories.map((c) => c.id));

export const Route = createFileRoute("/category/$category")({
  beforeLoad: ({ params }) => {
    if (!valid.has(params.category as Category)) throw notFound();
  },
  head: ({ params }) => {
    const cat = categories.find((c) => c.id === params.category);
    const label = cat?.label ?? "Category";
    const desc = cat?.blurb ?? "Explore the cosmos.";
    const url = `https://stardust-atlas-explorer.lovable.app/category/${params.category}`;
    return {
      meta: [
        { title: `${label} — Astralis` },
        { name: "description", content: desc },
        { property: "og:title", content: `${label} — Astralis` },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Category not found</h1>
      <Link to="/" className="mt-6 inline-block text-accent underline">Back to home</Link>
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = categories.find((c) => c.id === category)!;
  const list = byCategory(category as Category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All categories
      </Link>
      <header className="mb-12 max-w-3xl">
        <div className="mb-3 text-[11px] uppercase tracking-[0.25em] text-accent">{cat.label}</div>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{cat.blurb}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {list.length} {list.length === 1 ? "entry" : "entries"} catalogued.
        </p>
      </header>

      {list.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <BodyCard key={b.id} body={b} />
          ))}
        </div>
      )}
    </main>
  );
}
