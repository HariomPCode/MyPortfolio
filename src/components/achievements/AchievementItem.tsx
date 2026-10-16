import { ExternalLink } from "lucide-react";
import type { Achievement } from "@/types";

export function AchievementItem({ achievement }: { achievement: Achievement }) {
  const { title, detail, url } = achievement;

  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <h4 className="font-medium text-fg">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-baseline gap-1.5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>{title}</span>
            <ExternalLink size={13} className="shrink-0 self-center text-muted" aria-hidden />
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        ) : (
          title
        )}
      </h4>
      <p className="mt-1 max-w-prose text-muted">{detail}</p>
    </li>
  );
}
