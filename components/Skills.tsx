"use client";
import { useEffect, useState } from "react";
import { skillDomains } from "@/content/skills";
import { achieve } from "@/lib/achievements";
import { evidence } from "@/lib/evidence";
import { hue } from "@/lib/hue";

export default function Skills() {
  const [selected, setSelected] = useState<{ name: string; ids: string[] } | null>(null);
  const [q, setQ] = useState("");
  const [provenOnly, setProvenOnly] = useState(false);
  const refs = selected ? selected.ids.map(evidence).filter(Boolean) : [];

  // The hero's orbiting badges send a skill name here: filter to it and scroll into view
  useEffect(() => {
    const on = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setQ(name);
      setProvenOnly(false);
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth", block: "start" });
      achieve("grep");
    };
    window.addEventListener("skill-search", on);
    return () => window.removeEventListener("skill-search", on);
  }, []);
  const needle = q.trim().toLowerCase();
  const total = skillDomains.reduce((n, d) => n + d.skills.length, 0);
  const proven = skillDomains.reduce((n, d) => n + d.skills.filter((s) => s.evidence?.length).length, 0);
  const visible = skillDomains
    .map((d, i) => ({ d, i, skills: d.skills.filter((s) => (!needle || s.name.toLowerCase().includes(needle)) && (!provenOnly || s.evidence?.length)) }))
    .filter((x) => x.skills.length > 0);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label className="flex min-w-[16rem] flex-1 items-center gap-2 rounded-xl border border-line bg-bg/60 px-3.5 transition-colors focus-within:border-accent/60 sm:max-w-md">
          <span className="shrink-0 whitespace-nowrap font-mono text-[0.875rem] text-mint" aria-hidden="true">$ grep</span>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); if (e.target.value.trim().length > 1) achieve("grep"); }}
            placeholder="python, rag, sql…"
            aria-label="Filter skills"
            className="h-11 w-full bg-transparent font-mono text-[0.875rem] text-ink outline-none placeholder:text-faint"
          />
        </label>
        <button
          type="button"
          aria-pressed={provenOnly}
          onClick={() => setProvenOnly((v) => !v)}
          className={`rounded-xl border px-3.5 py-2.5 text-[0.875rem] transition-colors ${provenOnly ? "border-accent/60 bg-accent/10 text-ink" : "border-line text-muted hover:text-ink"}`}
        >
          <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-accent" />
          Only skills with proof on this page
        </button>
        <p className="font-mono text-[0.75rem] text-faint">{proven}/{total} linked to real work</p>
      </div>

      <div
        aria-live="polite"
        className="mb-6 flex min-h-[3.5rem] flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-line bg-surface px-4 py-3 text-[0.9375rem]"
      >
        {selected ? (
          <>
            <span><span className="font-medium">{selected.name}</span> <span className="text-muted">was used in</span></span>
            {refs.map((r) => (
              <a key={r!.id} href={r!.href} className="chip border-accent/50 text-ink transition-transform hover:-translate-y-0.5 hover:border-accent">
                {r!.label}<span className="ml-1.5 text-faint">{r!.kind === "project" ? "project" : "role"}</span>
              </a>
            ))}
            <button type="button" onClick={() => setSelected(null)} className="ml-auto text-[0.875rem] text-muted underline underline-offset-4 hover:text-ink">
              Clear
            </button>
          </>
        ) : (
          <span className="text-muted">
            Select a skill marked with a dot to see the project or role where I used it. Dashed ones are listed on my CV.
          </span>
        )}
      </div>

      <div data-reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ d, i, skills }, k) => {
          // The last card widens to fill its row, so the grid never ends with an orphan
          const last = k === visible.length - 1;
          const span = last ? `${visible.length % 2 === 1 ? "sm:col-span-2" : ""} ${visible.length % 3 === 1 ? "lg:col-span-3" : visible.length % 3 === 2 ? "lg:col-span-2" : ""}` : "";
          return (
            <section key={d.title} style={hue(d.hue)} aria-labelledby={`skills-${i}`} className={span}>
              <div data-glow className="card h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 id={`skills-${i}`} className="font-semibold">{d.title}</h3>
                  <span className="font-mono text-[0.75rem] h-text">{skills.length}</span>
                </div>
                <p className="mt-1 text-[0.875rem] text-faint">{d.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {skills.map((s) => {
                    const has = !!s.evidence?.length;
                    const active = selected?.name === s.name;
                    return (
                      <li key={s.name}>
                        {has ? (
                          <button
                            type="button"
                            aria-pressed={active}
                            onClick={() => setSelected(active ? null : { name: s.name, ids: s.evidence! })}
                            className={`chip gap-1.5 transition-all hover:-translate-y-0.5 ${active ? "h-border h-soft text-ink" : "h-chip"}`}
                          >
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full h-bg" />
                            {s.name}
                          </button>
                        ) : (
                          <span className="chip border-dashed text-faint">{s.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
      {needle && skillDomains.every((d) => !d.skills.some((s) => s.name.toLowerCase().includes(needle))) && (
        <p className="mt-4 font-mono text-[0.875rem] text-muted">grep: no match for &quot;{q}&quot;. Ask me, I might be learning it.</p>
      )}
    </div>
  );
}
