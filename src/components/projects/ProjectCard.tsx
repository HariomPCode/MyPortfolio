import Link from "next/link";
import { STATUS_LABELS } from "@/lib/config";
import { hasCaseStudy } from "@/lib/data";
import type { Project } from "@/types";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectLinks } from "./ProjectLinks";
import { TechBadge } from "@/components/ui/TechBadge";

// variant "lead" gives the first featured project a larger, two-column treatment; "row" is the compact form.
export function ProjectCard({ project, variant = "row" }: { project: Project; variant?: "lead" | "row" }) {
  const lead = variant === "lead";
  const title = hasCaseStudy(project)
    ? <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">{project.name}</Link> : project.name;
  return (
    <article className={lead ? "grid gap-8 lg:grid-cols-2 lg:items-center" : "grid gap-6 border-t border-line pt-10 md:grid-cols-[1fr_1.1fr]"}>
      <div className={lead ? "" : "md:order-2"}><ProjectMedia project={project} priority={lead} /></div>
      <div className="space-y-4">
        <p className="font-mono text-xs text-muted">{STATUS_LABELS[project.status]}{project.year ? `, ${project.year}` : ""}</p>
        {lead ? <h3 className="font-display text-4xl tracking-tight sm:text-5xl">{title}</h3> : <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{title}</h3>}
        {project.tagline && <p className="text-lg leading-snug font-medium text-fg/90">{project.tagline}</p>}
        <p className="max-w-prose text-muted leading-relaxed">{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.name}`}>
            {project.technologies.map((t) => (
              <li key={t}>
                <TechBadge name={t} />
              </li>
            ))}
          </ul>
        )}
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}
