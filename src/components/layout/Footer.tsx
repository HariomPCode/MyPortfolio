import { site } from "@/lib/data";
import { socialLinks } from "@/lib/config";
export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-3">
        <p>{site.name}{site.location ? `, ${site.location}` : ""}</p>
        <ul className="flex gap-5">
          {socialLinks.map((l) => <li key={l.key}><a href={l.href} rel="noopener noreferrer" target="_blank" className="hover:text-fg">{l.label}</a></li>)}
          <li><a href={site.resumeUrl} className="hover:text-fg">Résumé</a></li>
        </ul>
      </div>
    </footer>
  );
}
