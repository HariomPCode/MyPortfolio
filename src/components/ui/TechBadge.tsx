import React from "react";
import { TechIcon } from "./TechIcon";

export interface TechBadgeProps {
  name: string;
  level?: string;
  className?: string;
  showIcon?: boolean;
}

export function TechBadge({
  name,
  level,
  className = "",
  showIcon = true,
}: TechBadgeProps) {
  return (
    <span
      className={`tag inline-flex items-center gap-1.5 transition-colors hover:border-accent/40 ${className}`}
    >
      {showIcon && (
        <TechIcon name={name} size={13} className="shrink-0 text-muted" />
      )}
      <span className="font-medium text-fg">{name}</span>
      {level && (
        <>
          <span className="text-line" aria-hidden="true">
            ·
          </span>
          <span className="text-muted">{level}</span>
        </>
      )}
    </span>
  );
}
