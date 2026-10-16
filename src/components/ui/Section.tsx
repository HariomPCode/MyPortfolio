export function Section({ id, title, intro, children }: { id?: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="border-t border-line py-16 sm:py-24">
      <div className="wrap grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
        <div><h2 id={id ? `${id}-title` : undefined} className="h2">{title}</h2>{intro && <p className="mt-3 max-w-xs text-sm text-muted">{intro}</p>}</div>
        <div>{children}</div>
      </div>
    </section>
  );
}
