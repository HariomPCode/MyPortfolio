import { z } from "zod";

export const gitHubContributionDaySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  contributionCount: z.number().int().nonnegative(),
  contributionLevel: z.enum([
    "NONE",
    "FIRST_QUARTILE",
    "SECOND_QUARTILE",
    "THIRD_QUARTILE",
    "FOURTH_QUARTILE",
  ]).optional(),
  weekday: z.number().int().min(0).max(6).optional(),
});

export const gitHubContributionWeekSchema = z.object({
  contributionDays: z.array(gitHubContributionDaySchema),
});

export const gitHubCalendarSchema = z.object({
  totalContributions: z.number().int().nonnegative(),
  weeks: z.array(gitHubContributionWeekSchema),
});

export const gitHubGraphQLResponseSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: gitHubCalendarSchema,
      }),
    }).nullable(),
  }).optional(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

export type GitHubGraphQLResponse = z.infer<typeof gitHubGraphQLResponseSchema>;
