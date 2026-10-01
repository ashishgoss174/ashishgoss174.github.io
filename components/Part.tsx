import { labels, parts } from "@/content/sections";

/** The divider that opens each part of the page, with a clickable table of its sections. */
export default function Part({ id, sections }: { id: string; sections: string[] }) {
  const p = parts[id];
  if (!p) return null;
  return (
    <div className="relative border-t border-line/60" role="group" aria-label={`Part ${p.numeral}: ${p.title}`}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-grape/60 to-transparent" />
      <div className="container-page flex flex-col gap-5 pb-2 pt-14 sm:flex-row sm:items-end sm:justify-between sm:pt-20">
        <div className="flex items-end gap-5">
          <span aria-hidden="true" className="grad-text font-mono text-[3.5rem] font-semibold leading-[0.85] sm:text-[4.5rem]">{p.numeral}</span>
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-faint">Part {p.numeral}</p>
            <p className="text-[1.5rem] font-semibold leading-tight tracking-[-0.015em] sm:text-[1.75rem]">{p.title}</p>
          </div>
        </div>
        <ol className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[0.8125rem] text-muted">
          {sections.map((s) => (
            <li key={s}><a href={`#${s}`} className="transition-colors hover:text-ink">{labels[s] ?? s}</a></li>
          ))}
        </ol>
      </div>
    </div>
  );
}
