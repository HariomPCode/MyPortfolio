import type { MetadataRoute } from "next";
import { projects, hasCaseStudy } from "@/lib/data";
import { siteUrl } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []; // No domain configured yet.
  const paths = ["", "/about", "/projects", ...projects.filter(hasCaseStudy).map((p) => `/projects/${p.slug}`)];
  return paths.map((p) => ({ url: `${siteUrl}${p}` }));
}
