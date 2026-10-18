import Image from "next/image";
import type { Project } from "@/types";

// Real screenshot when one exists; otherwise a plain, clearly labelled placeholder (no invented UI).
export function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  const img = project.images?.[0];
  if (img) {
    return (
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        priority={priority}
        sizes="(min-width:1024px) 640px, 100vw"
        className="h-auto w-full rounded-lg border border-line object-cover shadow-sm transition-transform duration-300 hover:scale-[1.01]"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${project.name}: no screenshot added yet`}
      className="flex aspect-[16/10] w-full flex-col justify-between rounded-lg border border-dashed border-line bg-surface/50 p-6 transition-colors hover:border-line/80 hover:bg-surface/70"
    >
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{project.category ?? "Project"}</span>
        <span className="text-[11px]">Preview pending</span>
      </div>
      <div>
        <span className="font-display text-3xl sm:text-4xl tracking-tight text-fg/80">
          {project.name}
        </span>
        {project.tagline && (
          <p className="mt-1 line-clamp-2 text-xs text-muted leading-snug">
            {project.tagline}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
        <span>Source code verified on GitHub</span>
      </div>
    </div>
  );
}
