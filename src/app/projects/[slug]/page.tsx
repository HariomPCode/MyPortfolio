import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, hasCaseStudy } from "@/lib/data";
import { STATUS_LABELS } from "@/lib/config";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { CaseStudy } from "@/components/projects/CaseStudy";

export const dynamicParams = false; // Unknown slugs return 404.
// Pages are generated from projects.json; no route list is maintained by hand.
export const generateStaticParams = () => projects.filter(hasCaseStudy).map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug); if (!p) return {};
  const description = p.tagline ?? p.description;
  return { title: p.name, description, alternates: { canonical: `/projects/${p.slug}` }, openGraph: { title: p.name, description, type: "article" } };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p || !hasCaseStudy(p)) notFound();
  return (
    <article className="py-16 sm:py-24"><div className="wrap">
      <Link href="/projects" className="text-sm text-muted hover:text-fg">Back to projects</Link>
      <p className="mt-8 font-mono text-xs text-muted">{STATUS_LABELS[p.status]}{p.year ? `, ${p.year}` : ""}{p.role ? ` · ${p.role}` : ""}</p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-7xl">{p.name}</h1>
      {p.tagline && <p className="mt-4 max-w-2xl text-xl">{p.tagline}</p>}
      <p className="mt-4 max-w-2xl text-muted">{p.description}</p>
      {p.technologies.length > 0 && <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">{p.technologies.map((t) => <li key={t} className="tag">{t}</li>)}</ul>}
      <div className="mt-6"><ProjectLinks project={p} showCase={false} /></div>
      <div className="mt-12 max-w-3xl"><ProjectMedia project={p} priority /></div>
      <div className="mt-12"><CaseStudy project={p} /></div>
    </div></article>
  );
}
