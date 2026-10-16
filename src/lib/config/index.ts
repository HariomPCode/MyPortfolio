import { site } from "@/lib/data";

export const STATUS_LABELS = { planned: "Planned", "in-development": "In development", prototype: "Prototype", completed: "Completed", archived: "Archived" } as const;

// Falls back to NEXT_PUBLIC_SITE_URL, then to nothing (canonical URLs are skipped until a domain is set).
export const siteUrl = (site.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
export const absoluteUrl = (path: string) => (siteUrl ? `${siteUrl}${path}` : path);

export const socialLinks = [
  { key: "github", label: "GitHub", href: site.social.github },
  { key: "linkedin", label: "LinkedIn", href: site.social.linkedin },
  { key: "leetcode", label: "LeetCode", href: site.social.leetcode },
].filter((l): l is { key: string; label: string; href: string } => !!l.href);
