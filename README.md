# Astralis

Astralis is an interactive astronomy encyclopedia and cosmic atlas. It brings together concise facts, vivid imagery, search, filters, comparison tools, mission tracking, community pages, and a Research AI experience for exploring planets, stars, galaxies, black holes, nebulae, meteors, and active space missions.

## Features

- Browse a curated atlas of astronomical bodies and phenomena.
- Search and filter objects by category.
- Open rich detail pages with key stats, images, summaries, and related facts.
- Compare celestial objects side by side.
- Explore active and upcoming space missions.
- Use the Research AI route for astronomy questions and guided exploration.
- Community/forum routes for discussion-oriented experiences.
- Image fallback handling for Wikimedia and external astronomy media.

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router and TanStack Start
- Tailwind CSS
- Supabase
- Cloudflare/Vite tooling
- Radix UI and shadcn-style components

## Getting Started

### Prerequisites

- Node.js 22 or newer is recommended.
- npm is supported through the included `package-lock.json`.
- A Supabase project is needed for auth and server-side data features.

### Installation

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill in the Supabase values in `.env`. The `LOVABLE_API_KEY` value is optional unless you want the Research AI endpoint to work locally.

### Development

```bash
npm run dev
```

The app usually runs at:

```text
http://127.0.0.1:8080/
```

### Build

```bash
npm run build
```

On memory-constrained Windows environments, use:

```cmd
set NODE_OPTIONS=--max-old-space-size=4096&& npm.cmd run build
```

### Preview

```bash
npm run preview
```

### Lint and Format

```bash
npm run lint
npm run format
```

## Environment Variables

| Name | Required | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_PROJECT_ID` | Yes | Supabase project identifier used by client tooling. |
| `VITE_SUPABASE_URL` | Yes | Browser-safe Supabase project URL. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Browser-safe Supabase publishable/anon key. |
| `SUPABASE_URL` | Yes | Server-side Supabase project URL. |
| `SUPABASE_PUBLISHABLE_KEY` | Yes | Server-side Supabase publishable/anon key. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional locally, required for privileged server flows | Supabase service role key. Keep this secret. |
| `LOVABLE_API_KEY` | Optional | Enables the Research AI chat endpoint. Keep this secret. |

Never commit `.env`, service role keys, API keys, or other secrets.

## Project Structure

```text
src/
  components/          Shared UI and app components
  data/                Astronomy and mission data
  integrations/        Supabase and Lovable integrations
  lib/                 Shared utilities and storage helpers
  routes/              TanStack Router pages and API routes
public/                Static public assets
supabase/              Supabase configuration and migrations
.github/              GitHub issue templates, PR template, and CI
```

## Data and Image Attribution

Astralis uses astronomy facts and image links from public space-science sources, including Wikimedia Commons and agency-provided mission imagery. When adding new entries, prefer stable, attributable, public-domain or openly licensed sources, and include source context in pull requests when practical.

## Contributing

Contributions are welcome. Good first contributions include fixing facts, improving image links, adding missing astronomy entries, polishing accessibility, improving mobile layouts, and expanding mission coverage.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Security

Please do not open public issues for secrets, auth bypasses, or exploitable vulnerabilities. See [SECURITY.md](SECURITY.md) for responsible disclosure guidance.

## License

This project is released under the [MIT License](LICENSE).
