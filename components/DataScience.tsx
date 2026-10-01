"use client";
import { useState } from "react";
import { workflow } from "@/content/datascience";
import { achieve } from "@/lib/achievements";
import { evidence } from "@/lib/evidence";
import { hue } from "@/lib/hue";
import Section from "./Section";

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
      if (i === workflow.length - 1) window.setTimeout(() => { setRunning(null); achieve("analyst"); }, 600);
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
