import siteJson from "@/data/site.json";
import projectsJson from "@/data/projects.json";
import experienceJson from "@/data/experience.json";
import skillsJson from "@/data/skills.json";
import educationJson from "@/data/education.json";
import achievementsJson from "@/data/achievements.json";
import { siteSchema, projectsSchema, experienceSchema, skillsSchema, educationSchema, achievementsSchema } from "@/lib/validation/schemas";

// Parsing here means a malformed JSON edit fails the build with a readable error.
export const site = siteSchema.parse(siteJson);
export const projects = projectsSchema.parse(projectsJson).sort((a, b) => a.order - b.order);
export const experience = experienceSchema.parse(experienceJson);
export const skills = skillsSchema.parse(skillsJson);
export const education = educationSchema.parse(educationJson);
export const achievements = achievementsSchema.parse(achievementsJson);

export const featuredProjects = () => { const f = projects.filter((p) => p.featured); return f.length ? f : projects; };
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const hasCaseStudy = (p: { caseStudy?: object }) => !!p.caseStudy && Object.keys(p.caseStudy).length > 0;
