import Link from "next/link";
import { Mail, GitPullRequest, Trophy, Code2, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AchievementItem } from "@/components/achievements/AchievementItem";
import { TechBadge } from "@/components/ui/TechBadge";
import { featuredProjects, projects, skills, experience, education, achievements, site } from "@/lib/data";
import { socialLinks } from "@/lib/config";

export { OpenSourceSection } from "./OpenSourceSection";
export { GitHubSection } from "./GitHubSection";
export { LeetCodeSection } from "./LeetCodeSection";

export function EmptyProjects() {
  return <p className="text-muted">Projects will appear here once they are added to <code className="font-mono text-sm">src/data/projects.json</code>.</p>;
}

export function WorkSection() {
  const list = featuredProjects();
  return (
    <Section id="work" title="Selected work" intro="Source code is linked for every project so the claims can be checked.">
      {list.length === 0 ? <EmptyProjects /> : (
        <div className="space-y-14">
          {list.map((p, i) => <ProjectCard key={p.id} project={p} variant={i === 0 ? "lead" : "row"} />)}
          {projects.length > list.length && <Link href="/projects" className="btn">All projects</Link>}
        </div>
      )}
    </Section>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" title="Technical strengths" intro="Each skill shows where it was used, not a self-rating.">
      <dl className="divide-y divide-line border-y border-line">
        {skills.map((g) => (
          <div key={g.category} className="grid gap-2 py-5 sm:grid-cols-[14rem_1fr]">
            <dt className="font-medium">{g.category}{g.note && <span className="block text-sm font-normal text-muted">{g.note}</span>}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s.name}>
                    <TechBadge name={s.name} level={s.level} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {experience.map((e) => (
          <li key={e.id}>
            <h3 className="text-xl font-medium">{e.role}</h3>
            <p className="text-muted">{e.organization}{e.location ? `, ${e.location}` : ""} · {e.start} to {e.end}</p>
            <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 text-muted">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AboutSection({ full = false }: { full?: boolean }) {
  return (
    <Section id="about" title="Education">
      <div className="space-y-6">
        {education.map((e) => (
          <div key={e.id}>
            <h3 className="text-xl font-medium">{e.degree}</h3>
            <p className="text-muted">{e.institution} · {e.start} to {e.end}</p>
            {e.detail && <p className="mt-2 max-w-prose text-muted">{e.detail}</p>}
          </div>
        ))}
        {!full && <Link href="/about" className="btn">More about me</Link>}
      </div>
    </Section>
  );
}

const ACHIEVEMENT_CATEGORIES = [
  { key: "Open source", label: "Open source", icon: GitPullRequest },
  { key: "Competitions", label: "Competitions", icon: Trophy },
  { key: "Problem solving", label: "Problem solving", icon: Code2 },
] as const;

export function AchievementsSection() {
  const groups = ACHIEVEMENT_CATEGORIES.map((c) => ({
    ...c,
    items: achievements.filter((a) => a.category === c.key),
  })).filter((g) => g.items.length > 0);

  return (
    <Section id="achievements" title="Achievements">
      <div className="space-y-10">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <div key={group.key} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-line pb-2 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                <Icon size={15} className="text-accent" aria-hidden />
                <h3>{group.label}</h3>
              </div>
              <ul className="divide-y divide-line">
                {group.items.map((a) => (
                  <AchievementItem key={a.id} achievement={a} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" title="Contact" intro={site.availability}>
      <p className="font-display text-3xl sm:text-4xl"><a href={`mailto:${site.email}`} className="underline decoration-accent underline-offset-4 hover:text-accent break-all">{site.email}</a></p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className="btn btn-primary"><Mail size={16} aria-hidden />Email me</a>
        {socialLinks.map((l) => <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className="btn">{l.label}<span className="sr-only"> (opens in new tab)</span></a>)}
        <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn"><FileText size={16} aria-hidden />{site.labels.viewResume}<span className="sr-only"> (opens in new tab)</span></a>
      </div>
    </Section>
  );
}
