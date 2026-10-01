import { decisions } from "@/content/decisions";
import { hue } from "@/lib/hue";
import Section from "./Section";

/** The central idea of the portfolio: four properties of a dependable AI system, each shown through one decision. */
export default function Decisions() {
  return (
    <Section
      id="decisions"
      eyebrow="engineering decisions"
      hue="accent"
      title="What makes an AI system dependable?"
      lede="I've approached that question from four directions. Each is one engineering decision: what I decided, why, and what it made possible."
    >
      <ol className="grid gap-5 md:grid-cols-2">
        {decisions.map((d, i) => (
          <li key={d.property} data-reveal style={hue(d.hue, { ["--delay" as string]: `${i * 60}ms` })}>
            <a href={d.href} data-glow className="card group flex h-full flex-col p-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[1.5rem] font-semibold tracking-[-0.02em] h-text">{d.property}</span>
                <span className="font-mono text-[0.75rem] text-faint">{d.where}</span>
              </div>
              <dl className="mt-4 space-y-3 text-[0.9375rem] leading-snug">
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">Decision</dt>
                  <dd className="mt-0.5 font-medium text-ink">{d.decision}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">Why</dt>
                  <dd className="mt-0.5 text-muted">{d.why}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">Consequence</dt>
                  <dd className="mt-0.5 text-ink/90">{d.consequence}</dd>
                </div>
              </dl>
              <span aria-hidden="true" className="mt-4 font-mono text-[0.75rem] h-text transition-transform group-hover:translate-x-1">see the work →</span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
