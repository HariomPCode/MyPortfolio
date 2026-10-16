import Link from "next/link";
import { ArrowDown, FileText } from "lucide-react";
import { site } from "@/lib/data";
import { HeroReveal } from "@/components/ui/Motion";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="py-20 sm:py-32">
      <div className="wrap">
        <HeroReveal>
          <p className="mb-6 font-mono text-sm text-muted">
            {site.name}
            {site.location ? `, ${site.location}` : ""}
          </p>
          <h1
            id="hero-title"
            className="max-w-4xl font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {site.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted">{site.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#work" className="btn btn-primary">
              <ArrowDown size={16} aria-hidden />
              {site.labels.viewWork}
            </Link>
            <a href={site.resumeUrl} className="btn">
              <FileText size={16} aria-hidden />
              {site.labels.viewResume}
            </a>
          </div>
        </HeroReveal>
      </div>
    </section>
  );
}
