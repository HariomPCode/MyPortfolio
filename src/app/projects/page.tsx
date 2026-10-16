import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyProjects } from "@/components/sections/Sections";
export const metadata: Metadata = { title: "Projects", description: "All projects with source code and technical write-ups.", alternates: { canonical: "/projects" } };
export default function Projects() {
  return (
    <section className="py-16 sm:py-24"><div className="wrap">
      <h1 className="font-display text-4xl tracking-tight sm:text-6xl">Projects</h1>
      <div className="mt-12 space-y-14">{projects.length === 0 ? <EmptyProjects /> : projects.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
    </div></section>
  );
}
