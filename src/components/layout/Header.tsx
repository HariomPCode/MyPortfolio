"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { site } from "@/lib/data";

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="wrap flex h-14 items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight">{site.name}</Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted md:flex">
          {site.nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-fg">{n.label}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" onClick={toggleTheme} aria-label="Toggle light and dark theme" className="rounded p-2 text-muted hover:text-fg">
            <Sun size={18} className="theme-sun" aria-hidden /><Moon size={18} className="theme-moon" aria-hidden />
          </button>
          <button type="button" className="rounded p-2 text-muted hover:text-fg md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="wrap flex flex-col border-t border-line pb-3 md:hidden">
          {site.nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-3 text-muted hover:text-fg">{n.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
