import { Github, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { GitHubHeatmap } from "@/components/github/GitHubHeatmap";
import { getGitHubContributions } from "@/lib/github/contributions";
import { site } from "@/lib/data";

function formatUpdateDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return isoString;
  }
}

export async function GitHubSection() {
  const githubUrl = site.social.github || "https://github.com/HariomPCode";
  const username = "HariomPCode";
  const result = await getGitHubContributions(username);

  return (
    <Section
      id="github"
      title="GitHub activity"
      intro="Contributions across open-source and personal repositories over the past year."
    >
      {result.success ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
            <p className="text-base text-fg">
              <span className="font-display text-2xl sm:text-3xl font-medium text-fg">
                {result.data.totalContributions}
              </span>{" "}
              <span className="text-muted">contributions in the last year</span>
            </p>
            <span className="font-mono text-xs text-muted">
              Updated {formatUpdateDate(result.data.updatedAt)}
            </span>
          </div>

          <GitHubHeatmap data={result.data} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Github size={16} aria-hidden />
              <span>View @{username} on GitHub</span>
              <ExternalLink size={14} aria-hidden />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <span className="font-mono text-xs text-muted">
              Official GitHub GraphQL API
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-surface/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-fg">Public contributions</h3>
              <p className="max-w-prose text-sm text-muted">
                Contributions are tracked on GitHub across open-source pull
                requests and personal projects.
              </p>
            </div>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0"
            >
              <Github size={16} aria-hidden />
              <span>View @{username} on GitHub</span>
              <ExternalLink size={14} aria-hidden />
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      )}
    </Section>
  );
}
