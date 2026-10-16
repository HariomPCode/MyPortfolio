import Link from "next/link";
export default function NotFound() {
  return <section className="py-24"><div className="wrap"><h1 className="font-display text-4xl">Page not found</h1><p className="mt-4 text-muted">That address does not match a page or project.</p><Link href="/projects" className="btn mt-8">Browse projects</Link></div></section>;
}
