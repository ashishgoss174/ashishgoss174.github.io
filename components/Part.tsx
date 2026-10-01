import { parts, sectionNumber } from "@/content/sections";

const labels: Record<string, string> = {
  about: "About", numbers: "By the numbers", journey: "Journey", experience: "Experience", words: "In their words",
  projects: "Projects", systems: "Systems", "data-science": "Data science", ask: "Ask my portfolio", "models-to-systems": "Models to systems",
  skills: "Skills", education: "Education", interests: "Interests", notes: "Notes", contact: "Contact",
};

/** The divider that opens each part of the page, with a clickable table of its sections. */
export default function Part({ id }: { id: (typeof parts)[number]["id"] }) {
  const p = parts.find((x) => x.id === id)!;
  return (
    <div className="relative border-t border-line/60" aria-label={`Part ${p.numeral}: ${p.title}`} role="group">
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
          {p.sections.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="transition-colors hover:text-ink"><span className="text-faint">{sectionNumber(s)}</span> {labels[s]}</a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
