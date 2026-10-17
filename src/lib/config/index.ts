import { site } from "@/lib/data";

export const STATUS_LABELS = { planned: "Planned", "in-development": "In development", prototype: "Prototype", completed: "Completed", archived: "Archived" } as const;

// Production site URL determination:
// 1. Explicit siteUrl in site.json
// 2. Explicit NEXT_PUBLIC_SITE_URL environment variable
// 3. Vercel deployment production URL (VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL)
// 4. Fallback to empty string (canonical tags and sitemaps are skipped until domain is configured)
const vercelEnvUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const siteUrl = (
  site.siteUrl ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  vercelEnvUrl ||
  ""
).replace(/\/$/, "");
export const absoluteUrl = (path: string) => (siteUrl ? `${siteUrl}${path}` : path);

export const socialLinks = [
  { key: "github", label: "GitHub", href: site.social.github },
  { key: "linkedin", label: "LinkedIn", href: site.social.linkedin },
  { key: "leetcode", label: "LeetCode", href: site.social.leetcode },
].filter((l): l is { key: string; label: string; href: string } => !!l.href);
