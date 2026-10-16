import { z } from "zod";

const optionalUrl = z.union([z.url(), z.literal("")]).optional();
const localOrUrl = z.string().min(1).refine((s) => s.startsWith("/") || /^https?:\/\//.test(s), "must start with / or http(s)://");
const text = z.string().min(1);

export const siteSchema = z.object({
  name: text, headline: text, intro: text,
  siteUrl: optionalUrl, email: z.email(), resumeUrl: localOrUrl, location: z.string().optional(), availability: z.string().optional(),
  social: z.object({ github: optionalUrl, linkedin: optionalUrl, leetcode: optionalUrl }),
  nav: z.array(z.object({ label: text, href: localOrUrl })),
  labels: z.object({ viewResume: text, viewWork: text, source: text, live: text }),
});

export const projectStatus = z.enum(["planned", "in-development", "prototype", "completed", "archived"]);

const caseStudySchema = z.object({
  problem: z.string().optional(), users: z.string().optional(), contribution: z.string().optional(),
  features: z.array(text).optional(),
  architecture: z.object({ summary: text, steps: z.array(text).optional() }).optional(),
  decisions: z.array(z.object({ title: text, body: text })).optional(),
  challenges: z.array(z.object({ challenge: text, solution: text })).optional(),
  testing: z.array(text).optional(), outcomes: z.array(text).optional(), limitations: z.array(text).optional(),
});

export const projectSchema = z.object({
  id: text,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase letters, numbers, hyphens"),
  name: text, tagline: z.string().optional(), description: text, category: z.string().optional(),
  status: projectStatus, featured: z.boolean().default(false), order: z.number().int().default(100),
  year: z.string().optional(), role: z.string().optional(),
  technologies: z.array(text).default([]),
  images: z.array(z.object({ src: z.string().startsWith("/"), alt: text, width: z.number().int().positive(), height: z.number().int().positive() })).default([]),
  links: z.object({ github: optionalUrl, live: optionalUrl }).default({}),
  caseStudy: caseStudySchema.optional(),
});

export const projectsSchema = z.array(projectSchema).superRefine((list, ctx) => {
  for (const key of ["id", "slug"] as const) {
    const seen = new Set<string>();
    list.forEach((p, i) => {
      if (seen.has(p[key])) ctx.addIssue({ code: "custom", message: `Duplicate ${key} "${p[key]}"`, path: [i, key] });
      seen.add(p[key]);
    });
  }
});

export const experienceSchema = z.array(z.object({ id: text, role: text, organization: text, location: z.string().optional(), start: text, end: text, points: z.array(text) }));
export const skillsSchema = z.array(z.object({ category: text, note: z.string().optional(), items: z.array(z.object({ name: text, level: text })) }));
export const educationSchema = z.array(z.object({ id: text, degree: text, institution: text, start: text, end: text, detail: z.string().optional() }));
export const achievementCategory = z.enum(["Open source", "Competitions", "Problem solving"]);
export const achievementSchema = z.object({ id: text, title: text, detail: text, category: achievementCategory, url: optionalUrl });
export const achievementsSchema = z.array(achievementSchema);
