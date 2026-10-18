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
assert.ok(achievementsSchema.safeParse(achievements).success, "shipped achievement records are valid");
assert.ok(achievements.length > 0, "achievement records exist");

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

// Open Source Organizations validation
import { openSourceOrgsSchema, openSourceOrgSchema } from "../src/lib/validation/schemas";
import openSourceContributions from "../src/data/open-source.json";

assert.ok(openSourceOrgsSchema.safeParse(openSourceContributions).success, "shipped open source organizations are valid");
assert.strictEqual(openSourceContributions.length, 4, "exactly four open source organizations exist");

const [careerOps, financeFlash, onyx, veridion] = openSourceContributions;

assert.strictEqual(careerOps.id, "career-ops");
assert.strictEqual(careerOps.name, "Career Ops");
assert.strictEqual(careerOps.handle, "career-ops-hq");
assert.strictEqual(careerOps.url, "https://github.com/career-ops-hq");
assert.strictEqual(careerOps.avatar, "/images/orgs/career-ops.png");
assert.strictEqual(careerOps.contributions, 3);
assert.strictEqual(careerOps.status, "merged");

assert.strictEqual(financeFlash.id, "finance-flash");
assert.strictEqual(financeFlash.name, "FinanceFlash");
assert.strictEqual(financeFlash.handle, "FinanceFlash");
assert.strictEqual(financeFlash.url, "https://github.com/FinanceFlash");
assert.strictEqual(financeFlash.avatar, "/images/orgs/finance-flash.png");
assert.strictEqual(financeFlash.contributions, 2);
assert.strictEqual(financeFlash.status, "open");

assert.strictEqual(onyx.id, "onyx");
assert.strictEqual(onyx.name, "Onyx");
assert.strictEqual(onyx.handle, "onyx-dot-app");
assert.strictEqual(onyx.url, "https://github.com/onyx-dot-app");
assert.strictEqual(onyx.avatar, "/images/orgs/onyx.jpg");
assert.strictEqual(onyx.contributions, 1);
assert.strictEqual(onyx.status, "open");

assert.strictEqual(veridion.id, "veridion-labs");
assert.strictEqual(veridion.name, "VeridionLabs");
assert.strictEqual(veridion.handle, "VeridionLabs");
assert.strictEqual(veridion.url, "https://github.com/VeridionLabs");
assert.strictEqual(veridion.avatar, "/images/orgs/veridion-labs.png");
assert.strictEqual(veridion.contributions, 1);
assert.strictEqual(veridion.status, "unmerged");

// Malformed open source organization payloads are rejected
assert.ok(!openSourceOrgSchema.safeParse({ ...careerOps, url: "not-a-url" }).success, "invalid org URL rejected");
assert.ok(!openSourceOrgSchema.safeParse({ ...careerOps, avatar: "images/no-slash.png" }).success, "relative avatar without leading slash rejected");
assert.ok(!openSourceOrgSchema.safeParse({ ...careerOps, contributions: 0 }).success, "zero contribution count rejected");
assert.ok(!openSourceOrgSchema.safeParse({ ...careerOps, contributions: -1 }).success, "negative contribution count rejected");
// Hero portrait validation
import { existsSync } from "node:fs";
assert.ok(existsSync("public/images/portrait.jpg"), "hero portrait file exists at public/images/portrait.jpg");

// TechIcon and TechBadge validation
import { TechIcon } from "../src/components/ui/TechIcon";
import { TechBadge } from "../src/components/ui/TechBadge";
import skills from "../src/data/skills.json";

const allTechnologies = [
  ...skills.flatMap((g) => g.items.map((i) => i.name)),
  ...projects.flatMap((p) => p.technologies),
];
assert.ok(allTechnologies.length > 0, "technologies exist in skills and projects");
for (const tech of allTechnologies) {
  const icon = TechIcon({ name: tech, size: 14 });
  assert.ok(icon, `icon renders for technology: ${tech}`);
  const badge = TechBadge({ name: tech });
  assert.ok(badge, `badge renders for technology: ${tech}`);
}

// Graceful fallback for unknown technologies
const fallbackIcon = TechIcon({ name: "unknown-tech-test" });
assert.ok(fallbackIcon, "fallback icon renders for unknown technology");

// ProjectCard and ProjectMedia validation
import { ProjectCard } from "../src/components/projects/ProjectCard";
import { ProjectMedia } from "../src/components/projects/ProjectMedia";

const parsedProjects = projectsSchema.parse(projects);
for (const p of parsedProjects) {
  const card = ProjectCard({ project: p });
  assert.ok(card, `ProjectCard renders for ${p.id}`);
  const media = ProjectMedia({ project: p });
  assert.ok(media, `ProjectMedia renders for ${p.id}`);
}

import { parseGitHubContributions, getGitHubContributions } from "../src/lib/github/contributions";

const validMockResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 142,
          weeks: [
            {
              contributionDays: [
                { date: "2025-10-15", contributionCount: 0, contributionLevel: "NONE", weekday: 0 },
                { date: "2025-10-16", contributionCount: 2, contributionLevel: "FIRST_QUARTILE", weekday: 1 },
                { date: "2025-10-17", contributionCount: 5, contributionLevel: "SECOND_QUARTILE", weekday: 2 },
                { date: "2025-10-18", contributionCount: 8, contributionLevel: "THIRD_QUARTILE", weekday: 3 },
                { date: "2025-10-19", contributionCount: 12, contributionLevel: "FOURTH_QUARTILE", weekday: 4 },
              ],
            },
          ],
        },
      },
    },
  },
};

// 1. Valid response parsing
const parsedValid = parseGitHubContributions(validMockResponse, "HariomPCode");
assert.strictEqual(parsedValid.success, true, "valid mock response parses successfully");
if (parsedValid.success) {
  assert.strictEqual(parsedValid.data.username, "HariomPCode");
  assert.strictEqual(parsedValid.data.totalContributions, 142);
  assert.strictEqual(parsedValid.data.weeks.length, 1);
  assert.strictEqual(parsedValid.data.weeks[0].days.length, 5);
  assert.strictEqual(parsedValid.data.weeks[0].days[0].level, 0);
  assert.strictEqual(parsedValid.data.weeks[0].days[1].level, 1);
  assert.strictEqual(parsedValid.data.weeks[0].days[2].level, 2);
  assert.strictEqual(parsedValid.data.weeks[0].days[3].level, 3);
  assert.strictEqual(parsedValid.data.weeks[0].days[4].level, 4);
  assert.ok(new Date(parsedValid.data.updatedAt).getTime() > 0, "updatedAt is a valid timestamp");
}

// 2. Malformed responses
const malformedCases = [
  {},
  { data: {} },
  { data: { user: null } },
  { data: { user: { contributionsCollection: { contributionCalendar: { totalContributions: "not-a-number", weeks: [] } } } } },
  { data: { user: { contributionsCollection: { contributionCalendar: { totalContributions: 10, weeks: [{ contributionDays: [{ date: "invalid-date", contributionCount: 1 }] }] } } } } },
];
for (const bad of malformedCases) {
  const parsedBad = parseGitHubContributions(bad, "HariomPCode");
  assert.strictEqual(parsedBad.success, false, "malformed payload rejected");
  if (!parsedBad.success) {
    assert.strictEqual(parsedBad.reason, "invalid_response");
  }
}

// 3. API errors (rate limiting and general errors)
const rateLimitError = {
  data: { user: null },
  errors: [{ message: "API rate limit exceeded for user ID" }],
};
const parsedRateLimit = parseGitHubContributions(rateLimitError, "HariomPCode");
assert.strictEqual(parsedRateLimit.success, false);
if (!parsedRateLimit.success) {
  assert.strictEqual(parsedRateLimit.reason, "rate_limited");
}

const genericApiError = {
  data: { user: null },
  errors: [{ message: "Could not resolve to a User with the login of 'unknown'" }],
};
const parsedGenericError = parseGitHubContributions(genericApiError, "unknown");
assert.strictEqual(parsedGenericError.success, false);
if (!parsedGenericError.success) {
  assert.strictEqual(parsedGenericError.reason, "api_error");
}

// 4. Missing token behavior
async function testMissingToken() {
  const prevToken = process.env.GITHUB_TOKEN;
  delete process.env.GITHUB_TOKEN;
  const missingTokenResult = await getGitHubContributions("HariomPCode");
  assert.strictEqual(missingTokenResult.success, false);
  if (!missingTokenResult.success) {
    assert.strictEqual(missingTokenResult.reason, "no_token");
  }
  if (prevToken) process.env.GITHUB_TOKEN = prevToken;
}

// 5. LeetCode activity tests
import {
  parseLeetCodeLiveResponse,
  loadSnapshotFallback,
  isSnapshotStale,
  buildLeetCodeWeeks,
  getLeetCodeData,
} from "../src/lib/leetcode/contributions";
import { leetCodeSnapshotSchema } from "../src/lib/leetcode/schemas";
import leetCodeSnapshotData from "../src/data/leetcode-snapshot.json";

// Snapshot schema validation
assert.ok(
  leetCodeSnapshotSchema.safeParse(leetCodeSnapshotData).success,
  "shipped leetcode-snapshot.json conforms to schema"
);
assert.strictEqual(leetCodeSnapshotData.username, "E1Yjtr5hFH");
assert.strictEqual(leetCodeSnapshotData.verifiedAt, "2026-10-16");
assert.strictEqual(leetCodeSnapshotData.solved.total, 640);
assert.ok(
  !leetCodeSnapshotSchema.safeParse({
    ...leetCodeSnapshotData,
    verifiedAt: "not-a-date",
  }).success,
  "invalid verifiedAt date rejected"
);

// 90-day stale data rule tests
const refDate = new Date("2026-10-16T12:00:00Z");
assert.strictEqual(
  isSnapshotStale("2026-10-16", 90, refDate),
  false,
  "same day snapshot is fresh"
);
assert.strictEqual(
  isSnapshotStale("2026-08-01", 90, refDate),
  false,
  "76-day old snapshot is fresh (<= 90 days)"
);
assert.strictEqual(
  isSnapshotStale("2026-07-01", 90, refDate),
  true,
  "107-day old snapshot is stale (> 90 days)"
);
assert.strictEqual(
  isSnapshotStale("invalid-date-string", 90, refDate),
  true,
  "malformed verifiedAt date treated as stale"
);

// Valid live response parsing
const validLeetCodeLiveMock = {
  data: {
    matchedUser: {
      username: "E1Yjtr5hFH",
      submitStatsGlobal: {
        acSubmissionNum: [
          { difficulty: "All", count: 640 },
          { difficulty: "Easy", count: 207 },
          { difficulty: "Medium", count: 323 },
          { difficulty: "Hard", count: 110 },
        ],
      },
      userCalendar: {
        activeYears: [2024, 2025, 2026],
        streak: 284,
        totalActiveDays: 362,
        submissionCalendar: JSON.stringify({
          1760572800: 1,
          1760659200: 2,
        }),
      },
    },
    userContestRanking: {
      attendedContestsCount: 17,
      rating: 1685.71,
      globalRanking: 133669,
      totalParticipants: 888637,
      topPercentage: 15.29,
    },
  },
};

const parsedLive = parseLeetCodeLiveResponse(
  validLeetCodeLiveMock,
  "E1Yjtr5hFH"
);
assert.strictEqual(
  parsedLive.success,
  true,
  "valid live mock response parses successfully"
);
if (parsedLive.success) {
  assert.strictEqual(parsedLive.data.username, "E1Yjtr5hFH");
  assert.strictEqual(parsedLive.data.solved.total, 640);
  assert.strictEqual(parsedLive.data.solved.easy, 207);
  assert.strictEqual(parsedLive.data.solved.medium, 323);
  assert.strictEqual(parsedLive.data.solved.hard, 110);
  assert.strictEqual(parsedLive.data.contest?.rating, 1686);
  assert.strictEqual(parsedLive.data.contest?.globalRanking, 133669);
  assert.strictEqual(parsedLive.data.streak, 284);
  assert.strictEqual(parsedLive.data.totalActiveDays, 362);
  assert.strictEqual(parsedLive.data.weeks.length, 52);
  assert.strictEqual(parsedLive.data.isSnapshot, false);
}

// Malformed live responses
const malformedLeetCodeCases = [
  {},
  { data: {} },
  { data: { matchedUser: null } },
  { data: { matchedUser: { username: "x" } } },
];
for (const bad of malformedLeetCodeCases) {
  const parsedBad = parseLeetCodeLiveResponse(bad, "E1Yjtr5hFH");
  assert.strictEqual(parsedBad.success, false, "malformed payload rejected");
  if (!parsedBad.success) {
    assert.strictEqual(parsedBad.reason, "invalid_response");
    assert.strictEqual(
      parsedBad.profileUrl,
      "https://leetcode.com/u/E1Yjtr5hFH/"
    );
  }
}

// API-level errors
const leetCodeRateLimit = {
  data: null,
  errors: [{ message: "Too many requests. Rate limit exceeded." }],
};
const parsedLcRateLimit = parseLeetCodeLiveResponse(
  leetCodeRateLimit,
  "E1Yjtr5hFH"
);
assert.strictEqual(parsedLcRateLimit.success, false);
if (!parsedLcRateLimit.success) {
  assert.strictEqual(parsedLcRateLimit.reason, "rate_limited");
}

const leetCodeUserNotFound = {
  data: { matchedUser: null },
  errors: [{ message: "That user does not exist." }],
};
const parsedLcNotFound = parseLeetCodeLiveResponse(
  leetCodeUserNotFound,
  "unknown_user"
);
assert.strictEqual(parsedLcNotFound.success, false);
if (!parsedLcNotFound.success) {
  assert.strictEqual(parsedLcNotFound.reason, "api_error");
}

// Snapshot fallback loader
const fallbackFresh = loadSnapshotFallback("E1Yjtr5hFH", refDate);
assert.strictEqual(
  fallbackFresh.success,
  true,
  "fresh snapshot fallback loads successfully"
);
if (fallbackFresh.success) {
  assert.strictEqual(fallbackFresh.data.isSnapshot, true);
  assert.strictEqual(fallbackFresh.data.solved.total, 640);
  assert.strictEqual(fallbackFresh.data.verifiedAt, "2026-10-16");
  assert.strictEqual(fallbackFresh.data.weeks.length, 52);
}

const fallbackStale = loadSnapshotFallback(
  "E1Yjtr5hFH",
  new Date("2027-02-01T12:00:00Z")
);
assert.strictEqual(
  fallbackStale.success,
  false,
  "stale snapshot is rejected by 90-day rule"
);
if (!fallbackStale.success) {
  assert.strictEqual(fallbackStale.reason, "stale_snapshot");
  assert.strictEqual(
    fallbackStale.profileUrl,
    "https://leetcode.com/u/E1Yjtr5hFH/"
  );
}

// Calendar builder handles empty/malformed calendar strings gracefully
assert.strictEqual(buildLeetCodeWeeks("").length, 0);
assert.strictEqual(buildLeetCodeWeeks("{ invalid json }").length, 0);
assert.strictEqual(buildLeetCodeWeeks("{}").length, 52);

async function runAllAsyncTests() {
  await testMissingToken();

  // Test getLeetCodeData with deterministic mock fetch responses
  const originalFetch = globalThis.fetch;
  try {
    // 1. Live path success with fixture mock
    globalThis.fetch = async () =>
      new Response(JSON.stringify(validLeetCodeLiveMock), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    const liveResult = await getLeetCodeData("E1Yjtr5hFH");
    assert.strictEqual(
      liveResult.success,
      true,
      "getLeetCodeData returns data via mocked live fetch"
    );
    if (liveResult.success) {
      assert.strictEqual(liveResult.data.isSnapshot, false);
      assert.strictEqual(liveResult.data.solved.total, 640);
      assert.strictEqual(liveResult.data.weeks.length, 52);
    }

    // 2. Snapshot fallback on network failure
    globalThis.fetch = async () => {
      throw new Error("Simulated network failure");
    };
    const fallbackResult = await getLeetCodeData("E1Yjtr5hFH");
    assert.strictEqual(
      fallbackResult.success,
      true,
      "getLeetCodeData falls back to snapshot on fetch failure"
    );
    if (fallbackResult.success) {
      assert.strictEqual(fallbackResult.data.isSnapshot, true);
      assert.strictEqual(fallbackResult.data.username, "E1Yjtr5hFH");
      assert.strictEqual(fallbackResult.data.weeks.length, 52);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
}

runAllAsyncTests()
  .then(() => {
    console.log("All content, open-source, GitHub, and LeetCode tests passed.");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });


