import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  leetCodeLiveResponseSchema,
  leetCodeSnapshotSchema,
  type LeetCodeSnapshot,
} from "./schemas";

export interface LeetCodeDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface LeetCodeWeek {
  days: LeetCodeDay[];
}

export interface LeetCodeActivityData {
  username: string;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  contest?: {
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    attendedContestsCount: number;
  };
  streak: number;
  totalActiveDays: number;
  weeks: LeetCodeWeek[];
  updatedAt: string;
  verifiedAt?: string;
  isSnapshot: boolean;
}

export type LeetCodeActivityResult =
  | { success: true; data: LeetCodeActivityData }
  | {
      success: false;
      reason:
        | "network_error"
        | "api_error"
        | "rate_limited"
        | "invalid_response"
        | "stale_snapshot"
        | "snapshot_missing";
      profileUrl: string;
    };

export function mapLeetCodeLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function isSnapshotStale(
  verifiedAt: string,
  maxDays = 90,
  now = new Date()
): boolean {
  try {
    const verifiedDate = new Date(`${verifiedAt}T00:00:00Z`);
    const time = verifiedDate.getTime();
    if (Number.isNaN(time)) return true;
    const diffMs = now.getTime() - time;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays > maxDays;
  } catch {
    return true;
  }
}

export function buildLeetCodeWeeks(
  submissionCalendarJson: string,
  refDate = new Date()
): LeetCodeWeek[] {
  const calendarMap = new Map<string, number>();
  try {
    const parsed =
      typeof submissionCalendarJson === "string"
        ? JSON.parse(submissionCalendarJson)
        : submissionCalendarJson;
    if (parsed && typeof parsed === "object") {
      for (const [tsStr, count] of Object.entries(parsed)) {
        const tsSec = Number(tsStr);
        if (!Number.isNaN(tsSec) && typeof count === "number") {
          const d = new Date(tsSec * 1000);
          const dateStr = d.toISOString().slice(0, 10);
          calendarMap.set(dateStr, count);
        }
      }
    }
  } catch {
    return [];
  }

  const endDate = new Date(
    Date.UTC(
      refDate.getUTCFullYear(),
      refDate.getUTCMonth(),
      refDate.getUTCDate()
    )
  );
  const endDayOfWeek = endDate.getUTCDay(); // 0..6 (0 = Sun, 6 = Sat)
  const daysUntilSaturday = (6 - endDayOfWeek + 7) % 7;
  endDate.setUTCDate(endDate.getUTCDate() + daysUntilSaturday);

  const startDate = new Date(endDate);
  startDate.setUTCDate(endDate.getUTCDate() - 364 + 1); // 364 days = 52 weeks * 7

  const weeks: LeetCodeWeek[] = [];
  const currentDay = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const days: LeetCodeDay[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = currentDay.toISOString().slice(0, 10);
      const count = calendarMap.get(dateStr) ?? 0;
      days.push({
        date: dateStr,
        count,
        level: mapLeetCodeLevel(count),
      });
      currentDay.setUTCDate(currentDay.getUTCDate() + 1);
    }
    weeks.push({ days });
  }

  return weeks;
}

export function parseLeetCodeLiveResponse(
  json: unknown,
  username: string
): LeetCodeActivityResult {
  const profileUrl = `https://leetcode.com/u/${username}/`;
  const parsed = leetCodeLiveResponseSchema.safeParse(json);
  if (!parsed.success) {
    return { success: false, reason: "invalid_response", profileUrl };
  }

  if (parsed.data.errors && parsed.data.errors.length > 0) {
    const isRateLimited = parsed.data.errors.some((e) =>
      /rate limit/i.test(e.message)
    );
    return {
      success: false,
      reason: isRateLimited ? "rate_limited" : "api_error",
      profileUrl,
    };
  }

  const matchedUser = parsed.data.data?.matchedUser;
  if (
    !matchedUser ||
    !matchedUser.submitStatsGlobal ||
    !matchedUser.userCalendar
  ) {
    return { success: false, reason: "invalid_response", profileUrl };
  }

  const subs = matchedUser.submitStatsGlobal?.acSubmissionNum ?? [];
  const getSub = (diff: string) =>
    subs.find((s) => s.difficulty === diff)?.count ?? 0;

  const total = getSub("All");
  const easy = getSub("Easy");
  const medium = getSub("Medium");
  const hard = getSub("Hard");

  const calendar = matchedUser.userCalendar;
  const streak = calendar?.streak ?? 0;
  const totalActiveDays = calendar?.totalActiveDays ?? 0;
  const submissionCalendar = calendar?.submissionCalendar ?? "{}";
  const weeks = buildLeetCodeWeeks(submissionCalendar);

  const contest = parsed.data.data?.userContestRanking;

  return {
    success: true,
    data: {
      username: matchedUser.username || username,
      solved: { total, easy, medium, hard },
      contest: contest
        ? {
            rating: Math.round(contest.rating),
            globalRanking: contest.globalRanking,
            totalParticipants: contest.totalParticipants,
            topPercentage: contest.topPercentage,
            attendedContestsCount: contest.attendedContestsCount,
          }
        : undefined,
      streak,
      totalActiveDays,
      weeks,
      updatedAt: new Date().toISOString(),
      isSnapshot: false,
    },
  };
}

export function loadSnapshotFallback(
  username: string,
  now = new Date()
): LeetCodeActivityResult {
  const profileUrl = `https://leetcode.com/u/${username}/`;
  try {
    const filePath = join(process.cwd(), "src/data/leetcode-snapshot.json");
    if (!existsSync(filePath)) {
      return { success: false, reason: "snapshot_missing", profileUrl };
    }
    const raw = readFileSync(filePath, "utf8");
    const parsed = leetCodeSnapshotSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      return { success: false, reason: "invalid_response", profileUrl };
    }
    const snapshot: LeetCodeSnapshot = parsed.data;

    // Check 90-day stale data rule
    if (isSnapshotStale(snapshot.verifiedAt, 90, now)) {
      return { success: false, reason: "stale_snapshot", profileUrl };
    }

    const weeks = buildLeetCodeWeeks(
      snapshot.calendar.submissionCalendar,
      new Date(`${snapshot.verifiedAt}T12:00:00Z`)
    );

    return {
      success: true,
      data: {
        username: snapshot.username,
        solved: snapshot.solved,
        contest: snapshot.contest,
        streak: snapshot.calendar.streak,
        totalActiveDays: snapshot.calendar.totalActiveDays,
        weeks,
        updatedAt: snapshot.verifiedAt,
        verifiedAt: snapshot.verifiedAt,
        isSnapshot: true,
      },
    };
  } catch {
    return { success: false, reason: "snapshot_missing", profileUrl };
  }
}

export async function getLeetCodeData(
  username = "E1Yjtr5hFH"
): Promise<LeetCodeActivityResult> {
  if (typeof window !== "undefined") {
    throw new Error("getLeetCodeData must only be called on the server");
  }

  const query = `
    query getLeetCodeUserData($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
    }
  `;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0",
      },
      body: JSON.stringify({ query, variables: { username } }),
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return loadSnapshotFallback(username);
    }

    const json = await res.json();
    const parsed = parseLeetCodeLiveResponse(json, username);
    if (!parsed.success) {
      return loadSnapshotFallback(username);
    }

    return parsed;
  } catch {
    return loadSnapshotFallback(username);
  }
}
