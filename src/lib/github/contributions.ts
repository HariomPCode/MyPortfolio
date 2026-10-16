import { gitHubGraphQLResponseSchema } from "./schemas";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GitHubActivityData {
  username: string;
  totalContributions: number;
  weeks: ContributionWeek[];
  updatedAt: string;
}

export type GitHubActivityResult =
  | { success: true; data: GitHubActivityData }
  | {
      success: false;
      reason:
        | "no_token"
        | "network_error"
        | "api_error"
        | "rate_limited"
        | "invalid_response";
    };

function mapContributionLevel(
  count: number,
  levelString?: string
): 0 | 1 | 2 | 3 | 4 {
  if (levelString) {
    switch (levelString) {
      case "NONE":
        return 0;
      case "FIRST_QUARTILE":
        return 1;
      case "SECOND_QUARTILE":
        return 2;
      case "THIRD_QUARTILE":
        return 3;
      case "FOURTH_QUARTILE":
        return 4;
    }
  }
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function parseGitHubContributions(
  json: unknown,
  username: string
): GitHubActivityResult {
  const parsed = gitHubGraphQLResponseSchema.safeParse(json);
  if (!parsed.success) {
    return { success: false, reason: "invalid_response" };
  }

  if (parsed.data.errors && parsed.data.errors.length > 0) {
    const isRateLimited = parsed.data.errors.some((e) =>
      /rate limit/i.test(e.message)
    );
    return {
      success: false,
      reason: isRateLimited ? "rate_limited" : "api_error",
    };
  }

  const calendar =
    parsed.data.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    return { success: false, reason: "invalid_response" };
  }

  const weeks: ContributionWeek[] = calendar.weeks.map((w) => ({
    days: w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: mapContributionLevel(d.contributionCount, d.contributionLevel),
    })),
  }));

  return {
    success: true,
    data: {
      username,
      totalContributions: calendar.totalContributions,
      weeks,
      updatedAt: new Date().toISOString(),
    },
  };
}

export async function getGitHubContributions(
  username = "HariomPCode"
): Promise<GitHubActivityResult> {
  if (typeof window !== "undefined") {
    throw new Error("getGitHubContributions must only be called on the server");
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { success: false, reason: "no_token" };
  }

  const query = `
    query getContributionCalendar($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
                weekday
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "hariom-portfolio",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 86400 },
    });

    if (res.status === 401 || res.status === 403) {
      const isRateLimited = res.headers.get("x-ratelimit-remaining") === "0";
      return {
        success: false,
        reason: isRateLimited ? "rate_limited" : "api_error",
      };
    }

    if (!res.ok) {
      return { success: false, reason: "api_error" };
    }

    const json = await res.json();
    return parseGitHubContributions(json, username);
  } catch {
    return { success: false, reason: "network_error" };
  }
}
