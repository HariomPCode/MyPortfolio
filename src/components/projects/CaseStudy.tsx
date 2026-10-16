import type { Project } from "@/types";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="grid gap-3 border-t border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10"><h2 className="font-display text-xl">{title}</h2><div className="max-w-prose space-y-3 text-muted [&_strong]:text-fg">{children}</div></section>;
}
const List = ({ items }: { items: string[] }) => <ul className="list-disc space-y-2 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

// Renders only the case-study fields that exist in projects.json.
export function CaseStudy({ project }: { project: Project }) {
  const c = project.caseStudy; if (!c) return null;
  return (
    <div>
      {c.problem && <Block title="Problem"><p>{c.problem}</p></Block>}
      {c.users && <Block title="Intended users"><p>{c.users}</p></Block>}
      {c.contribution && <Block title="My contribution"><p>{c.contribution}</p></Block>}
      {c.features?.length ? <Block title="What it does"><List items={c.features} /></Block> : null}
      {c.architecture && <Block title="Architecture and data flow"><p>{c.architecture.summary}</p>{c.architecture.steps?.length ? <ol className="list-decimal space-y-2 pl-5">{c.architecture.steps.map((s) => <li key={s}>{s}</li>)}</ol> : null}</Block>}
      {c.decisions?.length ? <Block title="Technical decisions">{c.decisions.map((d) => <p key={d.title}><strong>{d.title}.</strong> {d.body}</p>)}</Block> : null}
      {c.challenges?.length ? <Block title="Challenges and solutions">{c.challenges.map((d) => <p key={d.challenge}><strong>{d.challenge}.</strong> {d.solution}</p>)}</Block> : null}
      {c.testing?.length ? <Block title="Testing"><List items={c.testing} /></Block> : null}
      {c.outcomes?.length ? <Block title="Verified outcomes"><List items={c.outcomes} /></Block> : null}
      {c.limitations?.length ? <Block title="Limitations"><List items={c.limitations} /></Block> : null}
    </div>
  );
}
