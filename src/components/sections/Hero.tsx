import Link from "next/link";
import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowDown, FileText } from "lucide-react";
import { site } from "@/lib/data";
import { HeroReveal } from "@/components/ui/Motion";

export function Hero() {
  const portraitRelativePath = "/images/portrait.jpg";
  const hasPortrait = existsSync(
    join(process.cwd(), "public", portraitRelativePath)
  );

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      {/* Cinematic Atmospheric Lighting (subtle blue highlights) */}
      <div
        className="pointer-events-none absolute right-[-5%] top-[12%] -z-10 h-[500px] w-[500px] rounded-full bg-accent/14 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[18%] bottom-[8%] -z-10 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[110px]"
        aria-hidden
      />

      {/* Cinematic Portrait / Visual Column on the Right */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-0 w-full lg:w-[48%] xl:w-[45%] select-none overflow-hidden"
        aria-hidden
      >
        {/* Soft edge blending gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgb(var(--bg))] via-[rgb(var(--bg))/80] to-transparent lg:via-[rgb(var(--bg))/40]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[rgb(var(--bg))] via-transparent to-[rgb(var(--bg))/70] lg:to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgb(var(--bg))] via-transparent to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[rgb(var(--bg))] to-transparent lg:w-16" />
        {/* Cinematic subtle color grading overlay to harmonize outdoor background with dark theme */}
        <div className="absolute inset-0 z-10 bg-accent/8 mix-blend-overlay" />
        <div className="absolute inset-0 z-10 bg-[rgb(var(--bg))/45] lg:hidden" />

        {/* Masked Portrait Container with horizontal gradient mask */}
        <div className="relative h-full w-full [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.1)_15%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.92)_75%,rgba(0,0,0,1)_100%)]">
          {hasPortrait ? (
            <Image
              src={portraitRelativePath}
              alt={site.name}
              fill
              priority
              sizes="(min-width: 1280px) 45vw, (min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top contrast-[1.06] brightness-[0.93] saturate-[0.88] opacity-30 transition-opacity duration-700 lg:opacity-85"
            />
          ) : (
            /* Atmospheric cinematic blueprint silhouette placeholder until portrait file is provided */
            <div className="relative flex h-full w-full items-center justify-center opacity-35 lg:opacity-65">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(var(--accent)/0.18),transparent_65%)]" />
              <svg
                viewBox="0 0 600 800"
                className="h-full w-full object-cover text-accent/25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="400"
                  cy="290"
                  r="130"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                />
                <circle
                  cx="400"
                  cy="290"
                  r="75"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M250 680 C 250 520, 320 440, 400 440 C 480 440, 550 520, 550 680"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="180"
                  y1="290"
                  x2="550"
                  y2="290"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                />
                <line
                  x1="400"
                  y1="80"
                  x2="400"
                  y2="720"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Main Hero Content (Left Side, High Contrast) */}
      <div className="wrap relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          <HeroReveal>
            <p className="mb-6 font-mono text-sm text-muted">
              {site.name}
              {site.location ? `, ${site.location}` : ""}
            </p>
            <h1
              id="hero-title"
              className="font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl text-fg"
            >
              {site.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
              {site.intro}
            </p>
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
      </div>
    </section>
  );
}
