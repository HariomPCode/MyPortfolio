# Hariom Pandey: Digital Engineer Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3.4 · Framer Motion · Lucide · Zod. All content lives in JSON; there is no database or CMS.
Pinned versions are in `package.json` (Next 15.5.4, React 19.1.1, Zod 4.1.11, framer-motion 12.23.22). `motion-dom` is pinned through `overrides` because newer releases break framer-motion 12.23.22.

## Run it
Prerequisite: Node.js 20+ (tested on 22).
```bash
npm install
npm run dev          # http://localhost:3000
npm run validate     # check all JSON + referenced files
npm test             # schema tests (duplicates, bad URLs, empty data)
npm run typecheck && npm run lint
npm run build && npm start
```
`npm run build` runs validation first, so a bad JSON edit stops the build with a readable message.

## Who owns what
| File | Controls |
|---|---|
| `src/data/site.json` | Name, headline, intro, email, social links, `resumeUrl`, `siteUrl`, nav, button labels |
| `src/data/projects.json` | Every project and case study |
| `src/data/experience.json` / `skills.json` / `education.json` / `achievements.json` / `open-source.json` | Their sections |
| `src/data/leetcode-snapshot.json` | Dated fallback snapshot for LeetCode activity |
| `src/app/globals.css` | Theme colors and fonts (CSS variables) |
| `src/lib/validation/schemas.ts` | Zod schemas (the allowed fields) |
| `public/resume.pdf`, `public/images/` | Résumé, screenshots, and hero portrait (`portrait.jpg`) |

## Projects
**Add:** append a record to `src/data/projects.json` (copy Tasky as a template). Required: `id`, `slug` (lowercase-with-hyphens), `name`, `description`, `status` (`planned`, `in-development`, `prototype`, `completed`, `archived`). Everything else is optional; missing links, images, or case study are simply not shown. Run `npm run validate`, then deploy.
**Remove:** delete its record. **Reorder:** change `order` (lower first). **Feature / unfeature:** `"featured": true/false`. If nothing is featured, the homepage shows all projects.
**Case study:** add a `caseStudy` object (fields: `problem`, `users`, `contribution`, `features`, `architecture{summary,steps}`, `decisions`, `challenges`, `testing`, `outcomes`, `limitations`). Only fields you fill in render. A project without a case study has no detail page.
**Screenshots:** put files in `public/images/projects/` and add
`"images": [{ "src": "/images/projects/koder-1.png", "alt": "What the screenshot shows", "width": 1600, "height": 1000 }]`. Without an image a plain labelled placeholder is shown.
Content is bundled at build time: **redeploy after every JSON change.**

## Open Source
Curated organization-level open-source overview records live in `src/data/open-source.json`. Required fields: `id`, `name`, `handle`, `url`, `avatar` (pointing to `public/images/orgs/`), and `contributions` (verified count). Validated on build via `scripts/validate-content.ts` and automated unit tests. Official GitHub avatars are stored in `public/images/orgs/`.

## Résumé & Portrait
- **Résumé:** Replace `public/resume.pdf` keeping the filename, redeploy, then open `https://YOUR_DOMAIN/resume.pdf`. Every button reads `resumeUrl` from `site.json`.
- **Hero portrait:** Place your portrait photograph at `public/images/portrait.jpg`. The hero section automatically displays it with cinematic edge-blending gradients and atmospheric lighting. Until provided, a subtle architectural silhouette acts as a placeholder.

## Activity Integrations (GitHub & LeetCode)
- **GitHub Activity (`GITHUB_TOKEN` optional):** A GitHub Personal Access Token used server-side to query the official GitHub GraphQL API for public contribution activity. Cached with Next.js ISR (24-hour revalidation). If omitted or rate-limited, renders an accessible profile link card to `@HariomPCode`.
- **LeetCode Activity:** Server-side fetch from the LeetCode GraphQL API with a 5-second timeout and 24-hour ISR cache. If the live query fails or is blocked by cloud bot protection, automatically falls back to `src/data/leetcode-snapshot.json`. If the snapshot is older than 90 days, metrics are hidden and a clean profile card is shown.

## Environment Variables
Create a `.env.local` file for local development (optional; the portfolio runs with full fallbacks if omitted):
- `GITHUB_TOKEN`: (Optional) GitHub Personal Access Token with public user read access to fetch live contribution graphs via the GitHub GraphQL API. If omitted or rate-limited, the UI falls back to an accessible profile badge.
- `NEXT_PUBLIC_SITE_URL`: (Optional) Canonical production URL (e.g. `https://yourdomain.com`). Can also be set directly as `siteUrl` in `src/data/site.json`. When configured, Next.js sitemap, robots.txt, canonical link tags, and Open Graph metadata base activate automatically.

## Other edits
- **Accent color:** `--accent` and `--accent-fg` in `src/app/globals.css` (one pair per theme). Keep 4.5:1 contrast with its text.
- **Social links:** `site.json` → `social`. An empty value hides that link.
- **Domain:** set `siteUrl` in `site.json` or configure `NEXT_PUBLIC_SITE_URL`. Sitemap, robots sitemap line, and metadata base activate once set.
- **Fonts:** system font stacks (no network fetch). Change `--font-display` / `--font-body` in `globals.css`, or use `next/font`.

## Deploy to Vercel
1. Push the repository to GitHub.
2. In the Vercel Dashboard, import the `MyPortfolio` repository.
3. Next.js 15 App Router is automatically detected with build command `npm run build` and output directory `.next`.
4. (Optional) Set environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SITE_URL` = your production domain (or Vercel automatically sets `VERCEL_PROJECT_PRODUCTION_URL`)
   - `GITHUB_TOKEN` = your GitHub token
5. Deploy. Vercel automatically runs the pre-build content validation before compiling.

## Structure
`src/app` routes · `src/components/{layout,sections,projects,ui,github,leetcode}` · `src/lib/data` loader (validates on import) · `src/lib/validation` schemas · `src/lib/config` shared constants · `scripts/validate-content.ts` · `tests/`.

## Content to confirm
See `CONTENT-NOTES.md`.
