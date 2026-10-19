import React from "react";
import type { Project } from "@/types";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 className="font-display text-xl text-fg">{title}</h2>
      <div className="max-w-prose space-y-4 text-muted [&_strong]:text-fg leading-relaxed">
        {children}
      </div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

// Renders data-driven case-study sections from projects.json.
export function CaseStudy({ project }: { project: Project }) {
  const c = project.caseStudy;
  if (!c) return null;

  return (
    <div>
      {c.problem && (
        <Block title="Problem & context">
          <p className="text-sm leading-relaxed">{c.problem}</p>
        </Block>
      )}

      {c.users && (
        <Block title="Target users">
          <p className="text-sm leading-relaxed">{c.users}</p>
        </Block>
      )}

      {c.contribution && (
        <Block title="My contribution">
          <p className="text-sm leading-relaxed">{c.contribution}</p>
        </Block>
      )}

      {c.features?.length ? (
        <Block title="Core capabilities">
          <List items={c.features} />
        </Block>
      ) : null}

      {c.architecture && (
        <Block title="Architecture & data flow">
          <p className="text-sm leading-relaxed">{c.architecture.summary}</p>

          {c.architecture.components?.length ? (
            <div className="mt-6 space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                System components
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {c.architecture.components.map((comp) => (
                  <div
                    key={comp.name}
                    className="rounded-lg border border-line bg-surface/40 p-4 transition-colors hover:border-line/80 hover:bg-surface/70"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-fg text-sm">{comp.name}</h4>
                      {comp.tech && (
                        <span className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-accent">
                          {comp.tech}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-muted leading-relaxed">
                      {comp.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {c.architecture.steps?.length ? (
            <div className="mt-6 space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                Execution lifecycle
              </h3>
              <ol className="list-decimal space-y-3 pl-5 text-sm">
                {c.architecture.steps.map((s) => (
                  <li key={s} className="leading-relaxed pl-1">
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </Block>
      )}

      {c.decisions?.length ? (
        <Block title="Technical decisions">
          <div className="space-y-3.5">
            {c.decisions.map((d) => (
              <div
                key={d.title}
                className="rounded-lg border border-line bg-surface/30 p-4 space-y-1.5"
              >
                <h3 className="font-medium text-fg text-sm">{d.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </Block>
      ) : null}

      {c.challenges?.length ? (
        <Block title="Challenges & solutions">
          <div className="space-y-3.5">
            {c.challenges.map((d) => (
              <div
                key={d.challenge}
                className="rounded-lg border border-line bg-surface/30 p-4 space-y-1.5"
              >
                <h3 className="font-medium text-fg text-sm">{d.challenge}</h3>
                <p className="text-sm text-muted leading-relaxed">{d.solution}</p>
              </div>
            ))}
          </div>
        </Block>
      ) : null}

      {c.testing?.length ? (
        <Block title="Testing strategy">
          <List items={c.testing} />
        </Block>
      ) : null}

      {c.outcomes?.length ? (
        <Block title="Verified outcomes">
          <List items={c.outcomes} />
        </Block>
      ) : null}

      {c.limitations?.length ? (
        <Block title="Trade-offs & limitations">
          <List items={c.limitations} />
        </Block>
      ) : null}
    </div>
  );
}
