import type { Metadata } from "next";
import {
  AboutSection,
  AchievementsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections/Sections";
import { site } from "@/lib/data";
import { siteUrl } from "@/lib/config";
export const metadata: Metadata = {
  title: "About",
  description: `Background, education, and experience of ${site.name}.`,
  alternates: siteUrl ? { canonical: "/about" } : undefined,
};
export default function About() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="wrap">
          <h1 className="max-w-3xl font-display text-4xl tracking-tight sm:text-6xl">
            About
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            I&apos;m a B.E. student in Artificial Intelligence and Machine Learning
            at the Universal College of Engineering associated to University of
            Mumbai, building backend and full-stack systems.
          </p>
        </div>
      </section>
      <ExperienceSection />
      <AboutSection full />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
