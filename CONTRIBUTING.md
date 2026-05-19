# Contributing to Astralis

Thanks for helping improve Astralis. This project works best when contributions are factual, well sourced, and easy to review.

## Ways to Contribute

- Fix incorrect or outdated astronomy facts.
- Add missing celestial objects, missions, or categories.
- Replace broken or low-quality image links.
- Improve accessibility, keyboard navigation, and responsive behavior.
- Improve performance, error handling, or test coverage.
- Clarify documentation.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill in the required Supabase values in `.env`. Do not commit secrets.

## Branch and Preview Workflow

Astralis uses `main` for production and `develop` for shared development.

| Branch type                    | Purpose                                                  | Deployment                                                      |
| ------------------------------ | -------------------------------------------------------- | --------------------------------------------------------------- |
| `main`                         | Stable production code                                   | https://astralis-ten.vercel.app/                                |
| `develop`                      | Reviewed changes waiting for the next production release | https://astralis-git-develop-sumandas25s-projects.vercel.app/   |
| `feature/*`, `fix/*`, `docs/*` | Contributor work branches                                | Vercel creates a unique preview URL after the branch is pushed. |

Create contribution branches from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

Open pull requests back into `develop`, not `main`. After a feature branch is pushed, copy the Vercel preview URL from the Vercel deployment or GitHub checks and include it in the pull request.

## Pull Request Checklist

- Keep changes focused on one topic.
- Include source links or notes for new astronomy facts and mission updates.
- Run `npm run lint` before submitting when possible.
- Run `npm run build` for UI, routing, or data changes when possible.
- Add screenshots for visual changes.
- Include the Vercel preview URL for your feature branch when available.
- Explain any environment or migration requirements.

## Data Guidelines

- Prefer reputable space-science sources such as NASA, ESA, ISRO, JAXA, CNSA, observatory releases, peer-reviewed references, or Wikimedia Commons pages with clear provenance.
- Use stable image URLs when possible.
- Avoid adding copyrighted media unless the license permits reuse.
- Keep descriptions concise, neutral, and encyclopedia-like.

## Code Style

- Follow the existing TypeScript and React patterns.
- Keep components focused and readable.
- Prefer existing UI primitives in `src/components/ui`.
- Avoid unrelated refactors in feature or data pull requests.

## Community Standards

Be respectful, curious, and constructive. Astralis is about making space knowledge easier to explore, and the project should feel welcoming to beginners and experienced contributors alike.
