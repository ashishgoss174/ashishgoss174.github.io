"use client";
import { useEffect, useState } from "react";
import { views } from "@/content/sections";
import { readView, setView, type View } from "@/lib/view";

/** "Viewing as: Everyone · Recruiter · Academic" — rearranges the page for each audience. */
export default function ViewSwitch() {
  const [view, setV] = useState<View>("all");
  useEffect(() => {
    setV(readView());
    const on = (e: Event) => setV((e as CustomEvent<View>).detail);
    window.addEventListener("viewchange", on);
    return () => window.removeEventListener("viewchange", on);
  }, []);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint" id="view-label">Viewing as</span>
      <div role="radiogroup" aria-labelledby="view-label" className="flex rounded-full border border-line-strong/70 bg-surface/70 p-1 backdrop-blur">
        {(Object.keys(views) as View[]).map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={view === v}
            title={views[v].blurb}
            onClick={() => {
              setView(v);
              // jump to the first section of the rearranged page
              if (v !== "all") requestAnimationFrame(() => document.getElementById("top")?.nextElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" }));
            }}
            className={`rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors ${view === v ? "bg-gradient-to-r from-accent/25 to-grape/25 text-ink ring-1 ring-accent/50" : "text-muted hover:text-ink"}`}
          >
            {views[v].label}
          </button>
        ))}
      </div>
      <span className="text-[0.8125rem] text-faint">{views[view].blurb}</span>
    </div>
  );
}
