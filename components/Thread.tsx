import { thread } from "@/content/story";
import { hue } from "@/lib/hue";
import Section from "./Section";

/** The research-oriented thread: one question, five experiences that each answered part of it. */
export default function Thread() {
  return (
    <Section id="thread" eyebrow="research-oriented experience" hue="grape" title="The thread through my work">
      <blockquote data-reveal className="max-w-3xl border-l-2 border-grape/60 pl-5 text-[1.375rem] font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[1.625rem]">
        &ldquo;{thread.question}&rdquo;
      </blockquote>

      <ol className="mt-10 grid gap-4 md:grid-cols-5">
        {thread.stops.map((s, i) => (
          <li key={s.where} data-reveal className="relative" style={hue(s.hue, { ["--delay" as string]: `${i * 70}ms` })}>
            {i < thread.stops.length - 1 && (
              <span aria-hidden="true" className="absolute -right-3 top-8 z-10 hidden font-mono text-faint md:block">→</span>
            )}
            <a href={s.href} data-glow className="card group flex h-full flex-col p-5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] h-text">{String(i + 1).padStart(2, "0")} · {s.theme}</span>
              <span className="mt-2 font-semibold">{s.where}</span>
              <span className="mt-2 flex-1 text-[0.875rem] leading-snug text-muted">{s.line}</span>
              <span aria-hidden="true" className="mt-3 font-mono text-[0.75rem] h-text transition-transform group-hover:translate-x-1">evidence →</span>
            </a>
          </li>
        ))}
      </ol>

      <p data-reveal className="mt-8 max-w-prose text-[1rem] text-muted">
        {thread.next} <a href="#interests" className="link">Research directions</a>
      </p>
    </Section>
  );
}
