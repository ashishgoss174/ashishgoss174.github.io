"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { kindLabel } from "@/content/flows";
import { systems } from "@/content/systems";
import { achieve } from "@/lib/achievements";
import { evidence } from "@/lib/evidence";
import { reducedMotion } from "@/lib/fx";

const legend: [keyof typeof kindLabel, string][] = [
  ["model", "Violet border"],
  ["guard", "Dashed pink border"],
  ["store", "Amber underline"],
  ["retrieval", "Thick cyan left edge"],
  ["output", "Green tint"],
];

export default function SystemExplorer() {
  const [sys, setSys] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [packetTop, setPacketTop] = useState<number | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const s = systems[sys];
  const current = s.steps[step];
  const src = evidence(s.source);

  // Auto-advance while the pipeline is "running"
  useEffect(() => {
    if (!playing) return;
    if (step >= s.steps.length - 1) {
      achieve("operator");
      const t = window.setTimeout(() => setPlaying(false), 1200);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStep((v) => v + 1), reducedMotion() ? 2000 : 1500);
    return () => window.clearTimeout(t);
  }, [playing, step, s.steps.length]);

  // Move the glowing packet to the active stage
  useLayoutEffect(() => {
    const ol = listRef.current;
    const btn = ol?.querySelectorAll<HTMLElement>("button")[step];
    if (ol && btn) setPacketTop(btn.offsetTop + btn.offsetHeight / 2);
  }, [step, sys]);

  const pick = (i: number) => { setSys(i); setStep(0); setPlaying(false); };
  const run = () => { if (playing) { setPlaying(false); return; } setStep(0); setPlaying(true); };

  return (
    <div data-reveal>
      <div role="group" aria-label="Choose a system" className="flex flex-wrap gap-2">
        {systems.map((x, i) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={i === sys}
            onClick={() => pick(i)}
            className={`rounded-full border px-4 py-2 text-[0.9375rem] transition-all ${i === sys ? "border-transparent bg-gradient-to-r from-accent/20 to-grape/20 text-ink ring-1 ring-accent/60" : "border-line text-muted hover:border-line-strong hover:text-ink"}`}
          >
            {x.title}
          </button>
        ))}
      </div>

      <div data-glow className="card mt-6 grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_1fr]" style={{ ["--h" as string]: "var(--accent)" }}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-prose text-muted">{s.summary}</p>
          </div>
          <button type="button" onClick={run} className="btn btn-primary mt-4 py-2 text-[0.875rem]" aria-pressed={playing}>
            {playing ? "■ Stop" : "▶ Run pipeline"}
          </button>
          <div className="relative mt-6">
            {packetTop !== null && (
              <span aria-hidden="true" className="packet z-10" data-kind={current.kind} style={{ top: packetTop }} />
            )}
            <ol ref={listRef} aria-label={`${s.title} stages`}>
              {s.steps.map((st, i) => (
                <li key={`${s.id}-${i}`} className="relative pb-2.5 last:pb-0" data-kind={st.kind}>
                  {i < s.steps.length - 1 && (
                    <span aria-hidden="true" className={`absolute left-[1.2rem] top-full h-2.5 w-[2px] -translate-x-1/2 -translate-y-2.5 transition-colors ${i < step ? "bg-accent" : "bg-line-strong"}`} />
                  )}
                  <button
                    type="button"
                    aria-pressed={i === step}
                    onClick={() => { setStep(i); setPlaying(false); }}
                    className={`node flex w-full items-center justify-between gap-3 pl-10 text-left transition-all duration-300 ${i === step ? "translate-x-1 ring-1 ring-[rgb(var(--h))] shadow-[0_0_30px_-8px_rgb(var(--h)/0.7)]" : i < step ? "opacity-90" : "opacity-70 hover:opacity-100"}`}
                    data-kind={st.kind}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`font-mono text-[0.75rem] ${i <= step ? "text-accent" : "text-faint"}`}>{i < step ? "✓" : i + 1}</span>
                      <span className="text-[0.9375rem] font-medium">{st.label}</span>
                    </span>
                    <span className="kind-tag">{kindLabel[st.kind]}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div aria-live="polite" className="rounded-xl border bg-bg/60 p-5 transition-colors h-border" data-kind={current.kind}>
            <div className="flex items-center justify-between gap-3">
              <p className="kind-tag" data-kind={current.kind}>Stage {step + 1} of {s.steps.length} · {kindLabel[current.kind]}</p>
              <div className="flex gap-1" aria-hidden="true">
                {s.steps.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-5 bg-accent" : i < step ? "w-1.5 bg-accent/60" : "w-1.5 bg-line-strong"}`} />)}
              </div>
            </div>
            <h3 className="mt-3 text-[1.375rem] font-semibold tracking-[-0.015em]">{current.label}</h3>
            <p className="mt-3 text-muted">{current.detail}</p>
            <div className="mt-5 flex gap-2">
              <button type="button" className="btn btn-quiet py-1.5 text-[0.875rem]" disabled={step === 0} onClick={() => { setPlaying(false); setStep((v) => Math.max(0, v - 1)); }}>
                ← Previous
              </button>
              <button type="button" className="btn btn-quiet py-1.5 text-[0.875rem]" disabled={step === s.steps.length - 1} onClick={() => { setPlaying(false); setStep((v) => Math.min(s.steps.length - 1, v + 1)); }}>
                Next →
              </button>
            </div>
          </div>
          {src && (
            <p className="mt-4 text-[0.9375rem] text-muted">
              Built for <a href={src.href} className="link">{src.label}</a>.
            </p>
          )}
          <dl className="mt-6 grid gap-x-5 gap-y-1.5 text-[0.8125rem] text-faint sm:grid-cols-2">
            {legend.map(([k, v]) => (
              <div key={k} data-kind={k} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full h-bg" />
                <dt className="inline h-text">{kindLabel[k]}:</dt><dd className="inline">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
