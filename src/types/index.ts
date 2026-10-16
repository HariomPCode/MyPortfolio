import type { z } from "zod";
import type { projectSchema, siteSchema, experienceSchema, skillsSchema, educationSchema, achievementsSchema, achievementCategory } from "@/lib/validation/schemas";
export type Project = z.infer<typeof projectSchema>;
export type Site = z.infer<typeof siteSchema>;
export type Experience = z.infer<typeof experienceSchema>[number];
export type SkillGroup = z.infer<typeof skillsSchema>[number];
export type Education = z.infer<typeof educationSchema>[number];
export type Achievement = z.infer<typeof achievementsSchema>[number];
export type AchievementCategory = z.infer<typeof achievementCategory>;
