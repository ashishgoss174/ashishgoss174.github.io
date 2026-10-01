"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { achieve } from "@/lib/achievements";
import { confetti, copyText, toast, toggleTheme } from "@/lib/fx";
import { asset } from "@/lib/paths";
import { openAchievements } from "./Achievements";
import { openRecruiter } from "./RecruiterMode";

type Cmd = { id: string; group: string; label: string; hint?: string; run: () => void; secret?: boolean };

const go = (hash: string) => () => {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", hash);
};
const open = (href: string) => () => window.open(href, "_blank", "noopener,noreferrer");

export const openPalette = () => window.dispatchEvent(new Event("open-palette"));

/** A keyboard-first launcher: Ctrl/⌘ + K or "/" opens it. Also where the secrets live. */
export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const cmds = useMemo<Cmd[]>(() => {
    const list: Cmd[] = [
      { id: "about", group: "Go to", label: "About", run: go("#about") },
      { id: "journey", group: "Go to", label: "The journey", hint: "the whole story", run: go("#journey") },
      { id: "experience", group: "Go to", label: "Experience", run: go("#experience") },
      { id: "projects", group: "Go to", label: "Projects", run: go("#projects") },
      { id: "systems", group: "Go to", label: "Systems I've built", run: go("#systems") },
      { id: "ds", group: "Go to", label: "Data science: how I work with data", run: go("#data-science") },
      { id: "words", group: "Go to", label: "What people said", run: go("#words") },
      { id: "skills", group: "Go to", label: "Skills", run: go("#skills") },
      { id: "education", group: "Go to", label: "Education & certifications", run: go("#education") },
      { id: "interests", group: "Go to", label: "Research interests", run: go("#interests") },
      { id: "contact", group: "Go to", label: "Contact", run: go("#contact") },
      ...projects.map((p) => ({ id: `p-${p.id}`, group: "Projects", label: p.name, hint: p.category, run: go(`#project-${p.id}`) })),
      ...notes.map((n) => ({ id: `n-${n.slug}`, group: "Notes", label: n.title, hint: `${n.readMinutes} min read`, run: () => { window.location.href = asset(`/notes/${n.slug}/`); } })),
      { id: "tldr", group: "Actions", label: "Open the 30-second view", hint: "for recruiters", run: openRecruiter },
      { id: "ask", group: "Actions", label: "Ask my portfolio a question", hint: "BM25 search", run: () => window.dispatchEvent(new Event("focus-ask")) },
      { id: "trophies", group: "Actions", label: "Show achievements", run: openAchievements },
      { id: "theme", group: "Actions", label: "Toggle light / dark theme", run: toggleTheme },
      { id: "confetti", group: "Actions", label: "Celebrate", hint: "why not", run: () => confetti() },
    ];
    if (site.email) list.push({ id: "email", group: "Actions", label: "Copy email address", hint: site.email, run: () => copyText(site.email, `Copied ${site.email}`) });
    if (site.resume) list.push({ id: "resume", group: "Actions", label: "Download resume (PDF)", run: () => {
      const a = document.createElement("a"); a.href = asset(site.resume); a.download = ""; a.click();
    } });
    if (site.github) list.push({ id: "gh", group: "Links", label: "Open GitHub", run: open(site.github) });
    if (site.linkedin) list.push({ id: "li", group: "Links", label: "Open LinkedIn", run: open(site.linkedin) });
    list.push({
      id: "hire", group: "Secret", label: "sudo hire ashish", secret: true,
      run: () => {
        confetti(); toast("Permission granted ✔ Let's talk: " + site.email, 5000);
        window.setTimeout(go("#contact"), 400); window.setTimeout(() => achieve("secret"), 2500);
      },
    });
    return list;
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cmds.filter((c) => !c.secret);
    const showSecret = /sudo|hire/.test(s);
    return cmds.filter((c) => (!c.secret || showSecret) && (c.label + " " + (c.hint ?? "") + " " + c.group).toLowerCase().includes(s.replace(/^sudo\s*/, "") || s));
  }, [q, cmds]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName) || (e.target as HTMLElement)?.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-palette", onOpen); };
  }, []);

  useEffect(() => {
    if (isOpen) {
      achieve("power");
      opener.current = document.activeElement as HTMLElement;
      setQ(""); setI(0);
      requestAnimationFrame(() => input.current?.focus());
    } else {
      opener.current?.focus?.();
    }
  }, [isOpen]);

  useEffect(() => setI(0), [q]);

  if (!isOpen) return null;

  const run = (c?: Cmd) => { if (!c) return; setOpen(false); window.setTimeout(c.run, 30); };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(results.length - 1, v + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); run(results[i]); }
  };

  let lastGroup = "";
  return (
    <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="palette mx-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_120px_-30px_rgb(var(--grape)/0.55)]"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-accent" aria-hidden="true">❯</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={results[i] ? `cmd-${results[i].id}` : undefined}
            className="h-14 w-full bg-transparent font-mono text-[0.9375rem] text-ink outline-none placeholder:text-faint"
          />
          <span className="kbd">esc</span>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-[0.9375rem] text-muted">No match. Maybe try <span className="font-mono text-rose">sudo</span>…</li>}
          {results.map((c, idx) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {header && <p className="px-3 pb-1 pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">{header}</p>}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={idx === i}
                  onMouseEnter={() => setI(idx)}
                  onClick={() => run(c)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] ${idx === i ? "bg-accent/10 text-ink" : "text-muted"} ${c.secret ? "font-mono text-rose" : ""}`}
                >
                  <span>{c.label}</span>
                  {c.hint && <span className="truncate text-[0.8125rem] text-faint">{c.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-[0.75rem] text-faint">
          <span className="flex items-center gap-1.5"><span className="kbd">↑</span><span className="kbd">↓</span> move <span className="kbd">↵</span> run</span>
          <span className="font-mono">psst: try <span className="text-rose">sudo</span></span>
        </div>
      </div>
    </div>
  );
}
