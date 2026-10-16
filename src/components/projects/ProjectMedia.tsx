import Image from "next/image";
import type { Project } from "@/types";
// Real screenshot when one exists; otherwise a plain, clearly labelled placeholder (no invented UI).
export function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  const img = project.images[0];
  if (img) return <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority={priority} sizes="(min-width:1024px) 640px, 100vw" className="h-auto w-full rounded-md border border-line" />;
  return (
    <div role="img" aria-label={`${project.name}: no screenshot added yet`} className="flex aspect-[16/10] w-full flex-col justify-between rounded-md border border-dashed border-line bg-surface p-5">
      <span className="font-mono text-xs text-muted">{project.category ?? "Project"}</span>
      <span className="font-display text-4xl tracking-tight text-muted">{project.name}</span>
    </div>
  );
}
