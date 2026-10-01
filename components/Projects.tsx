"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notes } from "@/content/notes";
import { projects } from "@/content/projects";
import { achieve } from "@/lib/achievements";
import { hue } from "@/lib/hue";
import type { Project } from "@/lib/types";
import FlowList from "./FlowList";
import FlowStrip from "./FlowStrip";
import { CloseIcon, ExternalIcon, GitHubIcon } from "./Icons";

function ProjectLinks({ p }: { p: Project }) {
  const note = notes.find((n) => n.about === p.id);
  const write = note && (
    <Link href={`/notes/${note.slug}/`} className="btn btn-quiet py-2 text-[0.875rem]">Write-up</Link>
  );
  if (p.links.length === 0) return <>{write}<span className="font-mono text-[0.8125rem] text-faint">// code not public yet</span></>;
  return (
    <>
      {write}
      {p.links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-quiet py-2 text-[0.875rem]"
          aria-label={`${l.label} for ${p.name} (opens in new tab)`}>
          {l.label === "GitHub" ? <GitHubIcon /> : <ExternalIcon />}
          {l.label}
        </a>
      ))}
    </>
  );
}

function Card({ p, n, onOpen }: { p: Project; n: number; onOpen: () => void }) {
  const live = p.links.some((l) => l.label === "Live demo");
  return (
    <div data-reveal style={hue(p.hue, { ["--delay" as string]: `${n * 60}ms` })} className="h-full">
      <article
        id={`project-${p.id}`}
        data-glow
        data-tilt
        className={`targetable card relative flex h-full flex-col overflow-hidden ${p.featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-3xl h-bg" />
        <div className="relative flex items-center justify-between gap-3">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] h-text">{p.category}</p>
          <span className="font-mono text-[0.75rem] text-faint">{String(n + 1).padStart(2, "0")}</span>
        </div>
        <h3 className={`relative mt-2 font-semibold tracking-[-0.02em] ${p.featured ? "text-[1.75rem]" : "text-[1.3125rem]"}`}>
          {p.name}
          {live && <span className="ml-2 inline-flex translate-y-[-3px] items-center gap-1.5 rounded-full bg-mint/10 px-2 py-0.5 align-middle font-mono text-[0.6875rem] font-normal text-mint"><span className="live-dot !h-1.5 !w-1.5" aria-hidden="true" />live</span>}
        </h3>
        <p className="relative mt-1 text-[0.8125rem] text-faint">{p.context}</p>

        <dl className="relative mt-4 space-y-2.5 text-[0.9375rem] leading-snug">
          <div><dt className="inline font-medium text-ink">Problem. </dt><dd className="inline text-muted">{p.problem}</dd></div>
          <div><dt className="inline font-medium text-ink">Solution. </dt><dd className="inline text-muted">{p.solution}</dd></div>
        </dl>

        <div className="relative mt-5 rounded-xl border border-line bg-bg/60 p-3">
          <FlowStrip steps={p.flow} label={`${p.name} architecture`} />
        </div>

        {p.featured && (
          <p className="relative mt-4 border-l-2 pl-3 text-[0.9375rem] leading-snug text-muted h-border">
            <span className="font-medium text-ink">Key decision. </span>{p.decisions[0]}
          </p>
        )}

        <ul className="relative mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.stack.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>

        <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6">
          <button type="button" onClick={onOpen} className="btn btn-primary py-2 text-[0.875rem]" aria-haspopup="dialog">
            Read case study →
          </button>
          <ProjectLinks p={p} />
        </div>
      </article>
    </div>
  );
}

function Detail({ p }: { p: Project }) {
  const block = "border-t border-line pt-6";
  const h = "flex items-center gap-2 text-[1rem] font-semibold";
  const dot = <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full h-bg" />;
  return (
    <div className="space-y-6">
      <section><h3 className={h}>{dot}Problem</h3><p className="mt-2 text-muted">{p.problem}</p></section>
      <section className={block}><h3 className={h}>{dot}Approach</h3><p className="mt-2 text-muted">{p.solution}</p></section>
      <section className={block}><h3 className={`${h} mb-4`}>{dot}Architecture</h3><FlowList steps={p.flow} /></section>
      <section className={block}>
        <h3 className={h}>{dot}Technology</h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">{p.stack.map((t) => <li key={t} className="chip h-chip">{t}</li>)}</ul>
      </section>
      <section className={block}>
        <h3 className={h}>{dot}Engineering decisions</h3>
        <ol className="mt-3 space-y-3">
          {p.decisions.map((d, i) => (
            <li key={d} className="flex gap-3 text-muted">
              <span className="font-mono text-[0.8125rem] h-text">{String(i + 1).padStart(2, "0")}</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className={block}>
        <h3 className={h}>{dot}Result and current state</h3>
        <p className="mt-2 text-muted">{p.status}</p>
        {p.note && <p className="mt-2 text-[0.9375rem] text-faint">{p.note}</p>}
      </section>
      <section className={block}>
        <h3 className={h}>{dot}What I learned</h3>
        <p className="mt-2 rounded-xl border p-4 text-ink/90 h-border h-soft">{p.learned}</p>
      </section>
      <div className="flex flex-wrap gap-2 border-t border-line pt-6"><ProjectLinks p={p} /></div>
    </div>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured && !p.compact);
  const small = projects.filter((p) => p.compact);
  const openProject = (p: Project) => {
    opener.current = document.activeElement as HTMLElement;
    setOpen(p);
    achieve("reader");
  };

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => <Card key={p.id} p={p} n={i} onOpen={() => openProject(p)} />)}
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {rest.map((p, i) => <Card key={p.id} p={p} n={featured.length + i} onOpen={() => openProject(p)} />)}
      </div>
      {small.map((p, i) => (
        <div key={p.id} id={`project-${p.id}`} data-reveal style={hue(p.hue)}
          className="targetable card mt-5 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] h-text">
              {String(featured.length + rest.length + i + 1).padStart(2, "0")} · {p.category} · {p.context}
            </p>
            <p className="mt-1"><span className="font-semibold">{p.name}</span> <span className="text-muted">· {p.solution}</span></p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button type="button" onClick={() => openProject(p)} className="btn btn-quiet py-1.5 text-[0.875rem]" aria-haspopup="dialog">Case study</button>
            <ProjectLinks p={p} />
          </div>
        </div>
      ))}

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="case-title"
        style={open ? hue(open.hue) : undefined}
        onClose={() => { setOpen(null); opener.current?.focus(); }}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
      >
        {open && (
          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface/95 px-5 py-4 backdrop-blur sm:px-8">
              <div>
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] h-text">{open.category}</p>
                <h2 id="case-title" className="text-[1.625rem] font-semibold tracking-[-0.02em]">{open.name}</h2>
                <p className="text-[0.8125rem] text-faint">{open.context}</p>
              </div>
              <button type="button" onClick={() => setOpen(null)} className="rounded-md p-2 text-muted transition-transform hover:rotate-90 hover:text-ink" aria-label="Close case study">
                <CloseIcon />
              </button>
            </div>
            <div className="px-5 py-6 text-[0.9375rem] leading-relaxed sm:px-8 sm:py-8">
              <Detail p={open} />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
