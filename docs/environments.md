# Astralis Environments

Astralis uses Vercel deployments for production, shared development, and feature branch previews.

## Live URLs

| Environment         | Branch                         | URL                                                           | Purpose                                                            |
| ------------------- | ------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| Production          | `main`                         | https://astralis-ten.vercel.app/                              | Stable public site.                                                |
| Development Preview | `develop`                      | https://astralis-git-develop-sumandas25s-projects.vercel.app/ | Shared testing site for reviewed changes before production.        |
| Feature Preview     | `feature/*`, `fix/*`, `docs/*` | Unique Vercel URL per pushed branch                           | Review a contributor's exact branch before merging into `develop`. |

## Contributor Workflow

Create branches from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/short-description
```

Run local checks before opening a pull request:

```bash
npm install
npm run dev
npm run lint
npm run build
```

Open pull requests into `develop`, not `main`.

## Preview Deployment Workflow

When a feature branch is pushed to the repository, Vercel creates a Preview Deployment for that branch. The preview URL can be found in one of these places:

- Vercel project dashboard under Deployments
- GitHub commit checks
- GitHub pull request checks or comments

Add the feature preview URL to the pull request description so maintainers can test the change quickly.

## Promotion Flow

```text
feature branch
-> feature preview
-> pull request into develop
-> develop preview
-> merge develop into main
-> production
```

Do not commit `.env` files, API keys, Supabase service role keys, OAuth secrets, or other private configuration.
