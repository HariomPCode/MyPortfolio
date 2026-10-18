import React from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiRedux,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiGit,
  SiGoogle,
  SiClerk,
  SiPrisma,
} from "@icons-pack/react-simple-icons";
import {
  Coffee,
  Bot,
  Layers,
  KeyRound,
  ShieldCheck,
  Network,
  Database,
  Code2,
} from "lucide-react";

export interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechIcon({ name, size = 14, className = "" }: TechIconProps) {
  const key = name.toLowerCase().trim();

  // 1. Programming Languages
  if (key === "typescript" || key === "ts") {
    return (
      <SiTypescript
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "javascript" || key === "js") {
    return (
      <SiJavascript
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "python") {
    return (
      <SiPython
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "java") {
    // Java brand icon is absent in Simple Icons; using universal coffee cup generic icon
    return (
      <Coffee
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "sql") {
    // Generic SQL uses Database icon; PostgreSQL has its own dedicated brand logo
    return (
      <Database
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  // 2. Frontend Frameworks & Libraries
  if (key === "react") {
    return (
      <SiReact
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "next.js" || key === "nextjs") {
    return (
      <SiNextdotjs
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "tailwind css" || key === "tailwind") {
    return (
      <SiTailwindcss
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "redux" || key === "redux toolkit") {
    return (
      <SiRedux
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  // 3. Backend & APIs
  if (key === "node.js" || key === "nodejs") {
    return (
      <SiNodedotjs
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "express" || key === "express.js") {
    return (
      <SiExpress
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "rest apis" || key === "rest api" || key === "api") {
    return (
      <Network
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  // 4. Databases & Queues
  if (key === "mongodb") {
    return (
      <SiMongodb
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "postgresql" || key === "postgres") {
    return (
      <SiPostgresql
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "redis" || key === "redis / bullmq") {
    return (
      <SiRedis
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "bullmq") {
    return (
      <Layers
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "prisma") {
    return (
      <SiPrisma
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  // 5. Infrastructure & Tools
  if (key === "docker") {
    return (
      <SiDocker
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "git" || key === "git and pull requests") {
    return (
      <SiGit
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  // 6. AI, Authentication & Cloud
  if (key === "openai" || key === "openai api") {
    return (
      <Bot
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "google apis" || key === "google") {
    return (
      <SiGoogle
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "clerk") {
    return (
      <SiClerk
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "oauth 2.0" || key === "oauth") {
    return (
      <KeyRound
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }
  if (key === "jwt") {
    return (
      <ShieldCheck
        size={size}
        className={className}
        aria-hidden="true"
        focusable="false"
      />
    );
  }

  // Fallback for unmapped or generic technologies
  return (
    <Code2
      size={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}
