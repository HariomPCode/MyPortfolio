import { Hero } from "@/components/sections/Hero";
import {
  WorkSection,
  OpenSourceSection,
  SkillsSection,
  ExperienceSection,
  AboutSection,
  AchievementsSection,
  GitHubSection,
  LeetCodeSection,
  ContactSection,
} from "@/components/sections/Sections";
export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <OpenSourceSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      <AchievementsSection />
      <GitHubSection />
      <LeetCodeSection />
      <ContactSection />
    </>
  );
}
