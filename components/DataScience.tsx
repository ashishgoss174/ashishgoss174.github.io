"use client";
import { useState } from "react";
import { workflow } from "@/content/datascience";
import { certifications } from "@/content/education";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillDomains } from "@/content/skills";
import { journey } from "@/content/story";
import { achieve } from "@/lib/achievements";
import { evidence } from "@/lib/evidence";
import { hue } from "@/lib/hue";
import Section from "./Section";

// ---------- data, computed from the content files ----------
const shortDate = (d: string) => (/now/i.test(d) ? "Now" : /grade/i.test(d) ? "Gr 11" : d.replace(/^(\w{3}) (\d{2})(\d{2}).*/, "$1 '$3"));
const seen = new Set<string>();
const growth = journey.map((c) => {
  const added = c.unlocked.filter((u) => !seen.has(u));
  added.forEach((u) => seen.add(u));
  return { label: shortDate(c.date), title: c.title, added, total: seen.size };
});
const domains = skillDomains.map((d) => ({
  title: d.title,
  proven: d.skills.filter((s) => s.evidence?.length).length,
  listed: d.skills.filter((s) => !s.evidence?.length).length,
}));
const certYears = certifications.reduce<Record<string, number>>((m, c) => { const y = c.date.slice(-4); m[y] = (m[y] ?? 0) + 1; return m; }, {});
const skillsTotal = domains.reduce((s, d) => s + d.proven + d.listed, 0);
const provenTotal = domains.reduce((s, d) => s + d.proven, 0);

const describe: [string, string][] = [
  ["internships (AI/data)", String(experience.length)],
  ["projects", String(projects.length)],
  ["story chapters", String(journey.length)],
  ["skills listed", String(skillsTotal)],
  ["skills proven in work", `${provenTotal} (${Math.round((provenTotal / skillsTotal) * 100)}%)`],
  ["certifications", Object.entries(certYears).sort().map(([y, n]) => `${y}: ${n}`).join(" · ")],
  ["countries worked with", "2 (India, Germany)"],
];

// ---------- chart 1: cumulative skills, step area ----------
function GrowthChart() {
  const [hover, setHover] = useState<number | null>(null);
  const W = 600, H = 250, L = 34, R = 12, T = 16, B = 34;
  const max = Math.ceil(growth[growth.length - 1].total / 10) * 10;
  const x = (i: number) => L + (i * (W - L - R)) / (growth.length - 1);
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  const line = growth.map((g, i) => `${i ? "L" : "M"}${x(i)},${y(g.total)}`).join(" ");
  const area = `${line} L${x(growth.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
  const h = hover !== null ? growth[hover] : null;

  return (
    <figure className="card p-5">
      <figcaption>
        <p className="font-medium">Skills unlocked, chapter by chapter</p>
        <p className="text-[0.8125rem] text-faint">Cumulative count of new skills in each journey chapter</p>
      </figcaption>
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Line chart: skills grow from ${growth[0].total} to ${growth[growth.length - 1].total} across ${growth.length} chapters`}
          onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id="growth-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgb(var(--chart-1))" stopOpacity="0.28" />
              <stop offset="1" stopColor="rgb(var(--chart-1))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, max / 2, max].map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="rgb(var(--line))" strokeWidth="1" />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="rgb(var(--faint))" className="font-mono">{v}</text>
            </g>
          ))}
          <path d={area} fill="url(#growth-fill)" />
          <path d={line} fill="none" stroke="rgb(var(--chart-1))" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={y(0)} stroke="rgb(var(--muted))" strokeDasharray="3 3" strokeWidth="1" />}
          {growth.map((g, i) => (
            <g key={i}>
              <circle cx={x(i)} cy={y(g.total)} r={hover === i ? 6 : 4} fill="rgb(var(--chart-1))" stroke="rgb(var(--surface))" strokeWidth="2" />
              <text x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fill={hover === i ? "rgb(var(--ink))" : "rgb(var(--faint))"} className="font-mono">{g.label}</text>
              <rect x={x(i) - (W - L - R) / (growth.length - 1) / 2} y={T} width={(W - L - R) / (growth.length - 1)} height={H - T - B + 20} fill="transparent"
                onMouseEnter={() => { setHover(i); achieve("analyst"); }} />
            </g>
          ))}
          <text x={x(growth.length - 1) - 8} y={y(growth[growth.length - 1].total) - 10} textAnchor="end" fontSize="12" fill="rgb(var(--ink))" fontWeight="600">{growth[growth.length - 1].total} skills</text>
        </svg>
        {h && (
          <div className="pointer-events-none absolute top-2 z-10 w-56 rounded-lg border border-line-strong bg-raised/95 p-3 text-[0.8125rem] shadow-xl backdrop-blur"
            style={{ left: `clamp(0px, calc(${(x(hover!) / W) * 100}% - 7rem), calc(100% - 14rem))` }}>
            <p className="font-medium text-ink">{h.title}</p>
            <p className="text-muted">Total: <span className="font-mono text-ink">{h.total}</span> · new: <span className="font-mono text-ink">{h.added.length}</span></p>
            {h.added.length > 0 && <p className="mt-1 text-faint">+ {h.added.join(", ")}</p>}
          </div>
        )}
      </div>
      <details className="mt-2 text-[0.8125rem]">
        <summary className="text-muted hover:text-ink">View as table</summary>
        <table className="mt-2 w-full text-left">
          <thead className="text-faint"><tr><th className="py-1 font-normal">Chapter</th><th className="font-normal">New</th><th className="font-normal">Total</th></tr></thead>
          <tbody>{growth.map((g) => <tr key={g.title} className="border-t border-line"><td className="py-1">{g.title}</td><td className="font-mono">{g.added.length}</td><td className="font-mono">{g.total}</td></tr>)}</tbody>
        </table>
      </details>
    </figure>
  );
}

// ---------- chart 2: proven vs listed skills per domain, stacked bars ----------
function DomainChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...domains.map((d) => d.proven + d.listed));
  return (
    <figure className="card p-5">
      <figcaption className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium">Where the skills are backed by real work</p>
          <p className="text-[0.8125rem] text-faint">Skills per domain, split by whether a project or role on this site used them</p>
        </div>
        <ul className="flex gap-4 text-[0.8125rem] text-muted" aria-label="Legend">
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[rgb(var(--chart-1))]" aria-hidden="true" />used in work</li>
          <li className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[rgb(var(--chart-2))]" aria-hidden="true" />listed on CV</li>
        </ul>
      </figcaption>
      <ul className="mt-4 space-y-2.5" onMouseLeave={() => setHover(null)}>
        {domains.map((d, i) => (
          <li key={d.title} className="relative grid grid-cols-[9.5rem_1fr_3rem] items-center gap-3 text-[0.8125rem] sm:grid-cols-[12rem_1fr_3rem]"
            onMouseEnter={() => { setHover(i); achieve("analyst"); }}>
            <span className={`truncate ${hover === i ? "text-ink" : "text-muted"}`}>{d.title}</span>
            <span className="flex h-3.5 gap-[2px]" aria-hidden="true">
              <span className="rounded-l-[4px] bg-[rgb(var(--chart-1))] transition-opacity" style={{ width: `${(d.proven / max) * 100}%`, opacity: hover === null || hover === i ? 1 : 0.4 }} />
              <span className="rounded-r-[4px] bg-[rgb(var(--chart-2))] transition-opacity" style={{ width: `${(d.listed / max) * 100}%`, opacity: hover === null || hover === i ? 1 : 0.4 }} />
            </span>
            <span className="text-right font-mono text-ink">{d.proven}/{d.proven + d.listed}</span>
            {hover === i && (
              <span className="pointer-events-none absolute -top-9 left-[10rem] z-10 whitespace-nowrap rounded-lg border border-line-strong bg-raised/95 px-2.5 py-1.5 text-ink shadow-xl sm:left-[13rem]">
                {d.proven} used in work · {d.listed} listed on CV
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="sr-only">{domains.map((d) => `${d.title}: ${d.proven} used in work, ${d.listed} listed`).join(". ")}</p>
    </figure>
  );
}

export default function DataScience() {
  return (
    <Section
      id="data-science"
      eyebrow="the data scientist side"
      hue="mint"
      title="How I work with data"
      lede="Before any model, there's a question and a messy dataset. This is the workflow I follow, written as a notebook. Each cell's output is where I actually did it. Open any cell, or run them all."
    >
      <Notebook />
      <div className="mt-14" data-reveal>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-[1.375rem] font-semibold tracking-[-0.015em]">My career, as a dataset</h3>
          <p className="font-mono text-[0.75rem] text-faint">computed live from this site&apos;s content files</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <GrowthChart />
          <div className="space-y-5">
            <figure className="card overflow-hidden">
              <figcaption className="border-b border-line px-5 py-2.5 font-mono text-[0.8125rem] text-muted"><span className="text-mint">In [8]:</span> career.describe()</figcaption>
              <table className="w-full font-mono text-[0.8125rem]">
                <tbody>
                  {describe.map(([k, v]) => (
                    <tr key={k} className="border-b border-line/60 last:border-0">
                      <th scope="row" className="px-5 py-2 text-left font-normal text-faint">{k}</th>
                      <td className="px-5 py-2 text-right text-ink">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
        </div>
        <div className="mt-5"><DomainChart /></div>
      </div>
    </Section>
  );
}

function Notebook() {
  // Every cell starts open so the content is readable without JavaScript; "Run all" replays them
  const [open, setOpen] = useState<Set<number>>(() => new Set(workflow.map((_, i) => i)));
  const [running, setRunning] = useState<number | null>(null);
  const toggle = (i: number) => setOpen((s) => {
    const n = new Set(s);
    if (n.has(i)) n.delete(i); else n.add(i);
    return n;
  });
  const runAll = () => {
    setOpen(new Set());
    workflow.forEach((_, i) => window.setTimeout(() => {
      setRunning(i);
      setOpen((s) => new Set(s).add(i));
      if (i === workflow.length - 1) window.setTimeout(() => setRunning(null), 600);
    }, 450 * i));
  };

  return (
    <div data-reveal className="overflow-hidden rounded-2xl border border-line-strong/70 bg-bg/60">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[0.8125rem] text-muted">
          <span aria-hidden="true" className="text-sun">◆</span> how_i_work_with_data.ipynb
        </span>
        <button type="button" onClick={runAll} className="btn btn-quiet py-1.5 text-[0.8125rem]">▶▶ Run all cells</button>
      </div>
      <ol className="divide-y divide-line/70">
        {workflow.map((w, i) => {
          const isOpen = open.has(i);
          return (
            <li key={w.step} style={hue(w.hue)} className="relative">
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-[3px] transition-colors ${isOpen ? "h-bg" : "bg-transparent"}`} />
              <button type="button" aria-expanded={isOpen} onClick={() => toggle(i)} className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface/60 sm:gap-4">
                <span className="w-14 shrink-0 pt-0.5 font-mono text-[0.75rem] text-faint">In [{running === i ? "*" : isOpen ? i + 1 : " "}]:</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-medium">{w.step}</span>
                    {w.growing && <span className="rounded-full bg-sun/10 px-2 py-0.5 font-mono text-[0.6875rem] text-sun">still levelling up</span>}
                  </span>
                  <code className="mt-1 block overflow-x-auto whitespace-pre font-mono text-[0.8125rem] h-text">{w.code}</code>
                </span>
              </button>
              {isOpen && (
                <div className="flex gap-3 px-4 pb-4 sm:gap-4">
                  <span className="w-14 shrink-0 font-mono text-[0.75rem] text-faint">Out[{i + 1}]:</span>
                  <div className="min-w-0 flex-1">
                    <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink/85">{w.out}</p>
                    {w.refs.length > 0 && (
                      <p className="mt-2 flex flex-wrap gap-1.5">
                        {w.refs.map((r) => <a key={r.id} href={evidence(r.id)?.href ?? "#"} className="chip h-chip hover:-translate-y-0.5">{r.label} →</a>)}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
