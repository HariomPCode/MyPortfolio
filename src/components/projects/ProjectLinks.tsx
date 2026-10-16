import { Github, ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";
import { site, hasCaseStudy } from "@/lib/data";
import type { Project } from "@/types";
export function ProjectLinks({ project, showCase = true }: { project: Project; showCase?: boolean }) {
  const { github, live } = project.links;
  return (
    <div className="flex flex-wrap gap-3">
      {showCase && hasCaseStudy(project) && <Link href={`/projects/${project.slug}`} className="btn btn-primary"><BookOpen size={16} aria-hidden />Case study<span className="sr-only"> for {project.name}</span></Link>}
      {github && <a href={github} target="_blank" rel="noopener noreferrer" className="btn"><Github size={16} aria-hidden />{site.labels.source}<span className="sr-only"> for {project.name}</span></a>}
      {live && <a href={live} target="_blank" rel="noopener noreferrer" className="btn"><ExternalLink size={16} aria-hidden />{site.labels.live}<span className="sr-only"> of {project.name}</span></a>}
    </div>
  );
}
