import assert from "node:assert/strict";
import { projectsSchema, projectSchema, achievementsSchema, achievementSchema } from "../src/lib/validation/schemas";
import projects from "../src/data/projects.json";
import achievements from "../src/data/achievements.json";

const base = { id: "x", slug: "x", name: "X", description: "d", status: "completed" };
assert.ok(projectsSchema.safeParse(projects).success, "shipped projects are valid");
assert.ok(projectsSchema.safeParse([]).success, "empty dataset is valid");
assert.ok(projectSchema.safeParse(base).success, "optional fields may be missing");
assert.ok(!projectsSchema.safeParse([base, { ...base, id: "y" }]).success, "duplicate slug rejected");
assert.ok(!projectsSchema.safeParse([base, { ...base, slug: "y" }]).success, "duplicate id rejected");
assert.ok(!projectSchema.safeParse({ ...base, links: { github: "not a url" } }).success, "malformed URL rejected");
assert.ok(!projectSchema.safeParse({ ...base, slug: "Bad Slug" }).success, "bad slug rejected");

// Achievements validation
assert.ok(achievementsSchema.safeParse(achievements).success, "all four shipped achievement records are valid");
assert.strictEqual(achievements.length, 4, "exactly four achievement records exist");

// Each supported category passes validation
const supportedCategories = ["Open source", "Competitions", "Problem solving"] as const;
for (const cat of supportedCategories) {
  assert.ok(
    achievementSchema.safeParse({ id: "test", title: "Test Title", detail: "Test Detail", category: cat }).success,
    `supported category "${cat}" is valid`
  );
}

// Unsupported category fails validation
assert.ok(
  !achievementSchema.safeParse({ id: "test", title: "Test Title", detail: "Test Detail", category: "Hackathon" }).success,
  "unsupported category 'Hackathon' is rejected"
);

// Optional URLs and absent metadata are handled correctly
assert.ok(
  achievementSchema.safeParse({ id: "test", title: "Test Title", detail: "Test Detail", category: "Competitions" }).success,
  "omitted URL is valid"
);
assert.ok(
  achievementSchema.safeParse({ id: "test", title: "Test Title", detail: "Test Detail", category: "Competitions", url: "" }).success,
  "empty string URL is valid"
);
assert.ok(
  achievementSchema.safeParse({ id: "test", title: "Test Title", detail: "Test Detail", category: "Open source", url: "https://github.com" }).success,
  "valid HTTPS URL is accepted"
);
assert.ok(
  !achievementSchema.safeParse({ id: "test", title: "Test Title", detail: "Test Detail", category: "Open source", url: "not-a-url" }).success,
  "malformed URL is rejected"
);

console.log("All content tests passed.");

