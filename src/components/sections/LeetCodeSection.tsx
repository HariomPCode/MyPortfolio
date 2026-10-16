import { Code2, ExternalLink, Trophy } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { LeetCodeHeatmap } from "@/components/leetcode/LeetCodeHeatmap";
import { getLeetCodeData } from "@/lib/leetcode/contributions";
import { site } from "@/lib/data";

function formatUpdateDate(dateStr: string): string {
  try {
    const d = new Date(
      dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00Z`
    );
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export async function LeetCodeSection() {
  const profileUrl =
    site.social.leetcode || "https://leetcode.com/u/E1Yjtr5hFH/";
  const username = "E1Yjtr5hFH";
  const result = await getLeetCodeData(username);

  return (
    <Section
      id="leetcode"
      title="LeetCode activity"
      intro="Algorithmic problem-solving consistency, data structures practice, and contest participation."
    >
      {result.success ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
            <p className="text-base text-fg">
              <span className="font-display text-2xl sm:text-3xl font-medium text-fg">
                {result.data.solved.total}
              </span>{" "}
              <span className="text-muted">problems solved</span>
            </p>
            <span className="font-mono text-xs text-muted">
              {result.data.isSnapshot
                ? `Verified snapshot (${formatUpdateDate(
                    result.data.verifiedAt || result.data.updatedAt
                  )})`
                : `Updated live (${formatUpdateDate(result.data.updatedAt)})`}
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-line bg-surface/40 p-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted">
                Easy
              </div>
              <div className="mt-1 font-display text-lg font-medium text-fg">
                {result.data.solved.easy}
              </div>
            </div>
            <div className="rounded-lg border border-line bg-surface/40 p-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted">
                Medium
              </div>
              <div className="mt-1 font-display text-lg font-medium text-fg">
                {result.data.solved.medium}
              </div>
            </div>
            <div className="rounded-lg border border-line bg-surface/40 p-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted">
                Hard
              </div>
              <div className="mt-1 font-display text-lg font-medium text-fg">
                {result.data.solved.hard}
              </div>
            </div>
            <div className="rounded-lg border border-line bg-surface/40 p-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted flex items-center justify-between">
                <span>Contest rating</span>
                {result.data.contest && (
                  <Trophy size={13} className="text-accent" aria-hidden />
                )}
              </div>
              <div className="mt-1 font-display text-lg font-medium text-fg">
                {result.data.contest ? (
                  <>
                    {result.data.contest.rating}{" "}
                    <span className="text-xs font-normal font-mono text-muted">
                      (Top {result.data.contest.topPercentage}%)
                    </span>
                  </>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
            <span>
              Streak:{" "}
              <strong className="text-fg font-medium">
                {result.data.streak} days
              </strong>
            </span>
            <span>·</span>
            <span>
              Active days:{" "}
              <strong className="text-fg font-medium">
                {result.data.totalActiveDays}
              </strong>
            </span>
          </div>

          <LeetCodeHeatmap data={result.data} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Code2 size={16} aria-hidden />
              <span>View @{username} on LeetCode</span>
              <ExternalLink size={14} aria-hidden />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <span className="font-mono text-xs text-muted">
              {result.data.isSnapshot
                ? "Verified snapshot fallback"
                : "LeetCode GraphQL API"}
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-surface/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-fg">
                Algorithmic problem solving
              </h3>
              <p className="max-w-prose text-sm text-muted">
                Consistent practice across data structures, algorithms, and
                weekly contests on LeetCode.
              </p>
            </div>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0"
            >
              <Code2 size={16} aria-hidden />
              <span>View @{username} on LeetCode</span>
              <ExternalLink size={14} aria-hidden />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      )}
    </Section>
  );
}
