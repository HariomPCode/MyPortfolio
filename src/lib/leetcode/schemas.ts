import { z } from "zod";

export const leetCodeAcSubmissionSchema = z.object({
  difficulty: z.string(),
  count: z.number().int().nonnegative(),
});

export const leetCodeSubmitStatsSchema = z.object({
  acSubmissionNum: z.array(leetCodeAcSubmissionSchema),
});

export const leetCodeUserCalendarSchema = z.object({
  activeYears: z.array(z.number().int()).optional(),
  streak: z.number().int().nonnegative(),
  totalActiveDays: z.number().int().nonnegative(),
  submissionCalendar: z.string(),
});

export const leetCodeUserContestRankingSchema = z.object({
  attendedContestsCount: z.number().int().nonnegative(),
  rating: z.number(),
  globalRanking: z.number().int().nonnegative(),
  totalParticipants: z.number().int().nonnegative(),
  topPercentage: z.number(),
});

export const leetCodeLiveResponseSchema = z.object({
  data: z
    .object({
      matchedUser: z
        .object({
          username: z.string(),
          submitStatsGlobal: leetCodeSubmitStatsSchema.optional(),
          userCalendar: leetCodeUserCalendarSchema.optional(),
        })
        .nullable()
        .optional(),
      userContestRanking: leetCodeUserContestRankingSchema
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

export const leetCodeSnapshotSchema = z.object({
  username: z.string(),
  verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  solved: z.object({
    total: z.number().int().nonnegative(),
    easy: z.number().int().nonnegative(),
    medium: z.number().int().nonnegative(),
    hard: z.number().int().nonnegative(),
  }),
  contest: z
    .object({
      rating: z.number(),
      globalRanking: z.number().int().nonnegative(),
      totalParticipants: z.number().int().nonnegative(),
      topPercentage: z.number(),
      attendedContestsCount: z.number().int().nonnegative(),
    })
    .optional(),
  calendar: z.object({
    streak: z.number().int().nonnegative(),
    totalActiveDays: z.number().int().nonnegative(),
    submissionCalendar: z.string(),
  }),
});

export type LeetCodeLiveResponse = z.infer<typeof leetCodeLiveResponseSchema>;
export type LeetCodeSnapshot = z.infer<typeof leetCodeSnapshotSchema>;
