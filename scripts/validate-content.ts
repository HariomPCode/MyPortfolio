import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { siteSchema, projectsSchema, experienceSchema, skillsSchema, educationSchema, achievementsSchema } from "../src/lib/validation/schemas";

const root = process.cwd();
const load = (f: string) => JSON.parse(readFileSync(join(root, "src/data", f), "utf8"));
const checks: [string, import("zod").ZodType, string][] = [
  ["site.json", siteSchema, "site.json"], ["projects.json", projectsSchema, "projects.json"], ["experience.json", experienceSchema, "experience.json"],
  ["skills.json", skillsSchema, "skills.json"], ["education.json", educationSchema, "education.json"], ["achievements.json", achievementsSchema, "achievements.json"],
];
let failed = false;
for (const [name, schema, file] of checks) {
  const r = schema.safeParse(load(file));
  if (!r.success) { failed = true; console.error(`✗ ${name}`); r.error.issues.forEach((i) => console.error(`   ${i.path.join(".")}: ${i.message}`)); }
  else console.log(`✓ ${name}`);
}
const site = load("site.json");
const files = [site.resumeUrl, ...load("projects.json").flatMap((p: { images?: { src: string }[] }) => (p.images ?? []).map((i) => i.src))];
for (const f of files) if (f?.startsWith("/") && !existsSync(join(root, "public", f))) { failed = true; console.error(`✗ Missing file public${f}`); }
if (failed) process.exit(1);
console.log("Content is valid.");
