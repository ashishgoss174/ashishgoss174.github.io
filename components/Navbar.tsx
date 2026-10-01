"use client";
import { useEffect, useRef, useState } from "react";
import { currentTheme, toggleTheme, type Theme } from "@/lib/fx";
import Achievements from "./Achievements";
import { openPalette } from "./CommandPalette";
import { openRecruiter } from "./RecruiterMode";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "./Icons";

const allLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#data-science", label: "How I work" },
  { href: "#interests", label: "Research" },
  { href: "#notes", label: "Writing" },
  { href: "#education", label: "Academic" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>("dark");
  const [active, setActive] = useState("");
  const [mac, setMac] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  // Links follow the current view: only sections that are on the page are listed
  const [links, setLinks] = useState(allLinks);
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    setThemeState(currentTheme());
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    const onTheme = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    window.addEventListener("themechange", onTheme);

    // Reading progress
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onView = () => requestAnimationFrame(() => setLayout((n) => n + 1));
    window.addEventListener("layoutchange", onView);

    return () => {
      window.removeEventListener("themechange", onTheme);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("layoutchange", onView);
    };
  }, []);

  // Which sections exist in this view, and which one is on screen
  useEffect(() => {
    const present = allLinks.filter((l) => document.querySelector(l.href));
    setLinks(present);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    present.forEach((l) => io.observe(document.querySelector(l.href)!));
    return () => io.disconnect();
  }, [layout]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sticky z-40 border-b border-line/60 bg-bg/70 backdrop-blur-xl"
      style={{ top: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center gap-2.5 font-semibold tracking-[-0.01em]" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent via-grape to-rose font-mono text-[0.8125rem] font-semibold text-bg transition-transform group-hover:rotate-6 group-hover:scale-105">
            AG
          </span>
          <span className="hidden whitespace-nowrap sm:inline xl:hidden 2xl:inline">{name}</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "true" : undefined}
                  className={`relative rounded-md px-2.5 py-1.5 text-[0.875rem] transition-colors ${active === l.href ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {l.label}
                  <span aria-hidden="true" className={`absolute inset-x-2.5 -bottom-0.5 h-px bg-gradient-to-r from-accent to-grape transition-opacity ${active === l.href ? "opacity-100" : "opacity-0"}`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openRecruiter}
            className="hidden items-center gap-1.5 whitespace-nowrap rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1.5 text-[0.8125rem] text-ink transition-colors hover:border-accent md:flex"
            title="Everything important on one screen"
          >
            <span aria-hidden="true">⏱</span> 30s view
          </button>
          <Achievements />
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-1.5 rounded-lg border border-line bg-surface/70 px-2 py-1.5 text-[0.8125rem] text-muted transition-colors hover:border-accent/50 hover:text-ink sm:flex"
            aria-label="Open command palette"
          >
            <span className="kbd">{mac ? "⌘" : "Ctrl"}</span><span className="kbd">K</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md p-2 text-muted transition-transform hover:rotate-12 hover:text-ink"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="rounded-md p-2 text-muted hover:text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
        <div ref={bar} className="h-full origin-left bg-gradient-to-r from-accent via-grape to-rose" style={{ transform: "scaleX(0)" }} />
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg xl:hidden">
          <ul className="container-page grid grid-cols-2 gap-1 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2.5 text-[0.9375rem] text-muted hover:bg-surface hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => { setOpen(false); openRecruiter(); }} className="w-full rounded-md px-2 py-2.5 text-left text-[0.9375rem] text-accent hover:bg-surface">
                ⏱ 30-second view
              </button>
            </li>
            <li>
              <button type="button" onClick={() => { setOpen(false); openPalette(); }} className="w-full rounded-md px-2 py-2.5 text-left font-mono text-[0.9375rem] text-accent hover:bg-surface">
                ❯ Commands
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
