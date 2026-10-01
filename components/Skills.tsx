"use client";
import { useEffect, useState } from "react";
import { skillDomains, stackGroups } from "@/content/skills";
import { evidence } from "@/lib/evidence";
import { hue } from "@/lib/hue";
import type { Skill } from "@/lib/types";

/**
 * The tech stack. By default: one row per domain, only skills used in real work on this site.
 * "Show everything" opens the full list (including CV-only skills) with a filter.
 */
export default function Skills() {
  const [selected, setSelected] = useState<{ name: string; ids: string[] } | null>(null);
  const [full, setFull] = useState(false);
  const [q, setQ] = useState("");
  const refs = selected ? selected.ids.map(evidence).filter(Boolean) : [];

  // The hero's orbiting badges send a skill name here: open the full list filtered to it
  useEffect(() => {
    const on = (e: Event) => {
      setQ((e as CustomEvent<string>).detail);
      setFull(true);
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("skill-search", on);
    return () => window.removeEventListener("skill-search", on);
  }, []);

  const total = skillDomains.reduce((n, d) => n + d.skills.length, 0);
  const needle = q.trim().toLowerCase();
  const visible = skillDomains
    .map((d, i) => ({ d, i, skills: d.skills.filter((s) => !needle || s.name.toLowerCase().includes(needle)) }))
    .filter((x) => x.skills.length > 0);

  const chip = (s: Skill) => {
    if (!s.evidence?.length) return <span className="chip border-dashed text-faint">{s.name}</span>;
    const active = selected?.name === s.name;
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={() => setSelected(active ? null : { name: s.name, ids: s.evidence! })}
        className={`chip gap-1.5 transition-all hover:-translate-y-0.5 ${active ? "h-border h-soft text-ink" : "h-chip"}`}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full h-bg" />
        {s.name}
      </button>
    );
  };

  return (
    <div>
      <div
        aria-live="polite"
        className="mb-5 flex min-h-[3.25rem] flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem]"
      >
        {selected ? (
          <>
            <span><span className="font-medium">{selected.name}</span> <span className="text-muted">was used in</span></span>
            {refs.map((r) => (
              <a key={r!.id} href={r!.href} className="chip border-accent/50 text-ink transition-transform hover:-translate-y-0.5 hover:border-accent">
                {r!.label}<span className="ml-1.5 text-faint">{r!.kind === "project" ? "project" : "role"}</span>
              </a>
            ))}
            <button type="button" onClick={() => setSelected(null)} className="ml-auto text-[0.875rem] text-muted underline underline-offset-4 hover:text-ink">Clear</button>
          </>
        ) : (
          <span className="text-muted">Select a skill to see the role or project where I used it.</span>
        )}
      </div>

      {!full ? (
        <>
          <ul data-reveal className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/60">
            {stackGroups.map((g, i) => {
              // merge the group's domains, keep only skills with evidence, drop duplicates
              const seen = new Set<string>();
              const proven = g.from.flatMap((t) => skillDomains.find((d) => d.title === t)?.skills ?? [])
                .filter((s) => s.evidence?.length && !seen.has(s.name) && seen.add(s.name));
              if (proven.length === 0) return null;
              return (
                <li key={g.title} style={hue(g.hue)} className="grid gap-3 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:items-baseline sm:gap-6 sm:px-6">
                  <h3 id={`skills-${i}`} className="flex items-center gap-2 font-semibold">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full h-bg" />{g.title}
                  </h3>
                  <ul className="flex flex-wrap gap-1.5" aria-labelledby={`skills-${i}`}>
                    {proven.map((s) => <li key={s.name}>{chip(s)}</li>)}
                  </ul>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={() => setFull(true)} className="mt-4 text-[0.9375rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-ink">
            Show everything on my CV ({total} skills, including ones not yet used in a project here)
          </button>
        </>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <label className="flex min-w-[16rem] flex-1 items-center gap-2 rounded-xl border border-line bg-bg/60 px-3.5 transition-colors focus-within:border-accent/60 sm:max-w-md">
              <span className="shrink-0 whitespace-nowrap font-mono text-[0.875rem] text-mint" aria-hidden="true">filter</span>
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); }}
                placeholder="python, rag, sql…"
                aria-label="Filter skills"
                className="h-11 w-full bg-transparent font-mono text-[0.875rem] text-ink outline-none placeholder:text-faint"
              />
            </label>
            <button type="button" onClick={() => { setFull(false); setQ(""); }} className="rounded-xl border border-line px-3.5 py-2.5 text-[0.875rem] text-muted hover:text-ink">
              ← Back to the short list
            </button>
            <p className="text-[0.8125rem] text-faint">Dashed skills are listed on my CV but not linked to a project here.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map(({ d, i, skills }, k) => {
              const last = k === visible.length - 1;
              const span = last ? `${visible.length % 2 === 1 ? "sm:col-span-2" : ""} ${visible.length % 3 === 1 ? "lg:col-span-3" : visible.length % 3 === 2 ? "lg:col-span-2" : ""}` : "";
              return (
                <section key={d.title} style={hue(d.hue)} aria-labelledby={`skills-full-${i}`} className={span}>
                  <div className="card h-full p-5">
                    <h3 id={`skills-full-${i}`} className="font-semibold">{d.title}</h3>
                    <p className="mt-1 text-[0.875rem] text-faint">{d.blurb}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">{skills.map((s) => <li key={s.name}>{chip(s)}</li>)}</ul>
                  </div>
                </section>
              );
            })}
          </div>
          {needle && visible.length === 0 && <p className="mt-4 text-[0.9375rem] text-muted">No match for &ldquo;{q}&rdquo;.</p>}
        </>
      )}
    </div>
  );
}
