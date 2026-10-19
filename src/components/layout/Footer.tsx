import { site } from "@/lib/data";
import { socialLinks } from "@/lib/config";
export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-3">
        <p>{site.name}{site.location ? `, ${site.location}` : ""}</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {socialLinks.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center py-2 hover:text-fg transition-colors"
              >
                {l.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center py-2 hover:text-fg transition-colors"
            >
              Résumé
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
