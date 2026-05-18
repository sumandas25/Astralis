import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Astralis — An Interactive Cosmic Atlas" },
      { name: "description", content: "Explore planets, moons, stars, galaxies, black holes, nebulae and meteors with high-resolution NASA imagery and interesting facts." },
      { name: "author", content: "Astralis" },
      { property: "og:title", content: "Astralis — An Interactive Cosmic Atlas" },
      { property: "og:description", content: "Explore planets, moons, stars, galaxies, black holes, nebulae and meteors with high-resolution NASA imagery and interesting facts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Astralis — An Interactive Cosmic Atlas" },
      { name: "twitter:description", content: "Explore planets, moons, stars, galaxies, black holes, nebulae and meteors with high-resolution NASA imagery and interesting facts." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4dHeSXU0Gnai8Fnh5Peg2cSOby43/social-images/social-1779112439192-WhatsApp_Image_2026-05-18_at_7.24.06_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/4dHeSXU0Gnai8Fnh5Peg2cSOby43/social-images/social-1779112439192-WhatsApp_Image_2026-05-18_at_7.24.06_PM.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen bg-cosmic">
        <div className="pointer-events-none fixed inset-0 starfield opacity-60" aria-hidden />
        <div className="relative">
          <SiteHeader />
          <Outlet />
          <footer className="mt-24 border-t border-border/40 py-10 text-center text-xs text-muted-foreground">
            Imagery courtesy of NASA, ESA, ESO &amp; Hubble. Astralis &mdash; built for the curious.
          </footer>
        </div>
      </div>
    </QueryClientProvider>
  );
}
