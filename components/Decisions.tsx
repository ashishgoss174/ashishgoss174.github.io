import { decisions } from "@/content/decisions";
import { hue } from "@/lib/hue";
import Section from "./Section";

export default function Decisions() {
  return (
    <Section
      id="decisions"
      eyebrow="engineering judgement"
      hue="accent"
      title="Selected engineering decisions"
      lede="Technologies change. The reasoning behind a design choice is what carries over."
    >
      <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/60">
        {decisions.map((d, i) => (
          <li key={d.decision} data-reveal style={hue(d.hue, { ["--delay" as string]: `${i * 50}ms` })}>
            <a href={d.href} className="group grid gap-2 px-5 py-5 transition-colors hover:bg-surface sm:grid-cols-[12rem_1fr_1.2fr] sm:gap-6 sm:px-6">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.1em] h-text">{d.where}</span>
              <span className="font-medium text-ink">{d.decision}</span>
              <span className="text-[0.9375rem] leading-snug text-muted">
                <span className="font-mono text-[0.75rem] text-faint">why → </span>{d.why}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
