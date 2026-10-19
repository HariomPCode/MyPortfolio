import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { openSourceOrgs, site } from "@/lib/data";

export function OpenSourceSection() {
  const githubUrl = site.social.github || "https://github.com/HariomPCode";

  return (
    <Section
      id="open-source"
      title="Open Source"
      intro="Organizations and open-source projects with authored code contributions."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-muted">
            Overview of repositories and organizations with authored and peer-reviewed pull requests.
          </p>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn py-1.5 px-3 text-xs"
          >
            <Github size={14} aria-hidden />
            <span>View GitHub</span>
            <ExternalLink size={12} aria-hidden />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {openSourceOrgs.map((org) => {
            const count = org.contributions ?? org.contributionCount ?? 1;
            const countLabel = org.statusLabel ?? `${count} ${count === 1 ? "contribution" : "contributions"}`;

            return (
              <div
                key={org.id}
                className="group relative flex flex-col justify-between gap-3 rounded-lg border border-line bg-surface/40 p-4 transition-all hover:border-accent/60 hover:bg-surface/70"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
                      <Image
                        src={org.avatar}
                        alt=""
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={org.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate font-medium text-fg text-base hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                        >
                          {org.name}
                        </a>
                        <ExternalLink
                          size={13}
                          className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-accent"
                          aria-hidden
                        />
                        <span className="sr-only"> (opens {org.name} on GitHub in new tab)</span>
                      </div>
                      <p className="truncate font-mono text-xs text-muted">
                        @{org.handle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-medium text-accent">
                      {countLabel}
                    </span>
                  </div>
                </div>

                {org.pullRequests && org.pullRequests.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line/60">
                    <span className="font-mono text-[11px] text-muted">PRs:</span>
                    {org.pullRequests.map((pr) => (
                      <a
                        key={pr.url}
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-accent transition-colors underline decoration-line hover:decoration-accent underline-offset-2"
                      >
                        <span>#{pr.number}</span>
                        <ExternalLink size={10} aria-hidden />
                        <span className="sr-only"> (opens pull request #{pr.number} on GitHub in new tab)</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
