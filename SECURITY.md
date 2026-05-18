# Security Policy

## Supported Versions

Astralis is currently maintained from the default branch.

## Reporting a Vulnerability

Please do not publish security vulnerabilities in public issues.

If you find a vulnerability involving authentication, Supabase access, server routes, leaked secrets, dependency supply chain risk, or the Research AI endpoint, report it privately to the project maintainer.

Include:

- A short description of the issue.
- Steps to reproduce.
- Affected routes, files, or configuration.
- Any proof of concept that is safe to share.
- Suggested fixes, if you have them.

## Secret Handling

Never commit `.env`, Supabase service role keys, API keys, Wrangler secrets, or production credentials. Use `.env.example` for placeholder configuration only.
