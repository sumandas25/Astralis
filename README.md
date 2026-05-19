# Astralis

Astralis is an interactive astronomy encyclopedia and cosmic atlas. It brings together concise facts, vivid imagery, search, filters, comparison tools, mission tracking, community pages, and a Research AI experience for exploring planets, stars, galaxies, black holes, nebulae, meteors, and active space missions.

## Live Demo

Astralis is deployed on Vercel:

[https://astralis-ten.vercel.app/](https://astralis-ten.vercel.app/)

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
- Nitro/Vercel deployment support
- Lovable/Cloudflare Vite tooling
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

Fill in the Supabase values in `.env`. To use the Research AI endpoint locally, add one server-side AI provider key such as `OPENAI_API_KEY` or `GEMINI_API_KEY`.

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

## Deployment

Astralis is ready for Vercel. Vercel automatically sets `VERCEL=1`, and the Vite config switches to Nitro's Vercel output while keeping the existing Lovable/Cloudflare build path for local and non-Vercel builds.

Recommended Vercel project settings:

| Setting          | Value                        |
| ---------------- | ---------------------------- |
| Framework preset | Other, or Vercel auto-detect |
| Install command  | `npm ci`                     |
| Build command    | `npm run build`              |
| Output directory | Leave blank                  |
| Node.js version  | 22.x                         |

Add the same environment variables listed below in Vercel Project Settings -> Environment Variables. For Research AI, choose one provider, for example `AI_PROVIDER=gemini` with `GEMINI_API_KEY`, or `AI_PROVIDER=openai` with `OPENAI_API_KEY`. Keep `SUPABASE_SERVICE_ROLE_KEY` and AI keys as server-side secrets only.

To test the Vercel build locally on Windows:

```cmd
set VERCEL=1&& set NODE_OPTIONS=--max-old-space-size=4096&& npm.cmd run build
```

### Supabase Google Sign-In

Google sign-in uses Supabase OAuth. In Supabase, enable the Google provider and configure Auth URL settings before using it in production.

Recommended Supabase Auth URL settings:

| Setting            | Value                                |
| ------------------ | ------------------------------------ |
| Site URL           | `https://astralis-ten.vercel.app`    |
| Redirect URL       | `https://astralis-ten.vercel.app/**` |
| Local redirect URL | `http://localhost:8080/**`           |

In Google Cloud, add the callback URL shown by Supabase for the Google provider, usually:

```text
https://<your-project-ref>.supabase.co/auth/v1/callback
```

### Lint and Format

```bash
npm run lint
npm run format
```

## Environment Variables

| Name                            | Required                                               | Purpose                                                                                                       |
| ------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `VITE_SUPABASE_PROJECT_ID`      | Yes                                                    | Supabase project identifier used by client tooling.                                                           |
| `VITE_SUPABASE_URL`             | Yes                                                    | Browser-safe Supabase project URL.                                                                            |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes                                                    | Browser-safe Supabase publishable/anon key.                                                                   |
| `SUPABASE_URL`                  | Yes                                                    | Server-side Supabase project URL.                                                                             |
| `SUPABASE_PUBLISHABLE_KEY`      | Yes                                                    | Server-side Supabase publishable/anon key.                                                                    |
| `SUPABASE_SERVICE_ROLE_KEY`     | Optional locally, required for privileged server flows | Supabase service role key. Keep this secret.                                                                  |
| `AI_PROVIDER`                   | Optional                                               | Selects `openai`, `gemini`, `lovable`, or `custom`. If omitted, Astralis picks the first configured provider. |
| `OPENAI_API_KEY`                | Optional                                               | Enables Research AI through OpenAI. Keep this secret.                                                         |
| `OPENAI_MODEL`                  | Optional                                               | OpenAI model name. Defaults to `gpt-4o-mini`.                                                                 |
| `GEMINI_API_KEY`                | Optional                                               | Enables Research AI through Gemini's OpenAI-compatible endpoint. Keep this secret.                            |
| `GEMINI_MODEL`                  | Optional                                               | Gemini model name. Defaults to `gemini-2.5-flash`.                                                            |
| `LOVABLE_API_KEY`               | Optional                                               | Enables Research AI through Lovable AI Gateway. Keep this secret.                                             |
| `LOVABLE_MODEL`                 | Optional                                               | Lovable gateway model. Defaults to `google/gemini-3-flash-preview`.                                           |
| `AI_API_KEY`                    | Optional                                               | API key for any OpenAI-compatible provider. Requires `AI_BASE_URL`. Keep this secret.                         |
| `AI_BASE_URL`                   | Optional                                               | Base URL for a custom OpenAI-compatible provider.                                                             |
| `AI_MODEL`                      | Optional                                               | Model for the custom OpenAI-compatible provider. Defaults to `gpt-4o-mini`.                                   |

Never commit `.env`, service role keys, API keys, or other secrets.

### Research AI Provider Setup

Research AI runs through the server route at `/api/chat`, so provider keys stay on the server and are never exposed to the browser. For local development, each contributor should copy `.env.example` to `.env` and add their own key for one provider.

Minimal OpenAI setup:

```bash
AI_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
```

Minimal Gemini setup:

```bash
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
```

For production hosting, add these as encrypted environment variables or secrets in your hosting dashboard.

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
