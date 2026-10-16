import { Hero } from "@/components/sections/Hero";
import {
  WorkSection,
  SkillsSection,
  ExperienceSection,
  AboutSection,
  AchievementsSection,
  ContactSection,
} from "@/components/sections/Sections";
export default function Home() {
  return (
    <>
      <Hero />
      <WorkSection />
      <SkillsSection />
      <ExperienceSection />
      <AboutSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
