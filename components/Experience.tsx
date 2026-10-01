import Link from "next/link";
import { experience } from "@/content/experience";
import { notes } from "@/content/notes";
import { projectById } from "@/content/projects";
import { hue } from "@/lib/hue";
import FlowList from "./FlowList";
import { ChevronIcon } from "./Icons";
import Section from "./Section";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="where I've worked"
      hue="mint"
      title="Experience"
      lede="Four AI and data internships, from medical imaging data to AI infrastructure. Open a role for the technical detail and architecture."
    >
      <ol className="relative space-y-5">
        {experience.map((r, idx) => {
          const project = r.project ? projectById(r.project) : undefined;
          return (
            <li key={r.id} id={`exp-${r.id}`} data-reveal className="targetable rounded-2xl" style={hue(r.hue, { ["--delay" as string]: `${idx * 60}ms` })}>
              <div data-glow className="card relative overflow-hidden p-5 sm:p-7">
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 h-bg opacity-80" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-[1.375rem] font-semibold tracking-[-0.015em]">
                      {r.company}
                      {idx === 0 && <span className="ml-2.5 inline-flex translate-y-[-2px] items-center gap-1.5 rounded-full bg-mint/10 px-2 py-0.5 align-middle font-mono text-[0.6875rem] font-normal text-mint"><span className="live-dot !h-1.5 !w-1.5" aria-hidden="true" />current</span>}
                    </h3>
                    <p className="mt-0.5 font-medium h-text">{r.role}</p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="font-mono text-[0.8125rem] text-ink/85">{r.period}</p>
                    <p className="text-[0.8125rem] text-faint">{r.location} · {r.mode}</p>
                  </div>
                </div>
                <p className="mt-1 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-faint">{r.sector}</p>
                <p className="mt-3 max-w-prose text-[1rem] text-ink/90">{r.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${r.company}`}>
                  {r.stack.map((t) => <li key={t} className="chip h-chip">{t}</li>)}
                </ul>

                <details className="group mt-5 rounded-xl border border-line bg-bg/50" open={idx === 0}>
                  <summary className="flex items-center gap-2 px-4 py-3 text-[0.9375rem] font-medium text-ink transition-colors hover:text-[rgb(var(--h))]">
                    <ChevronIcon className="chev h-text" />
                    What I worked on
                    <span className="ml-auto font-mono text-[0.75rem] font-normal text-faint">{r.highlights.length} highlight{r.highlights.length > 1 ? "s" : ""}</span>
                  </summary>
                  <div className="space-y-5 border-t border-line px-4 py-5 sm:px-5">
                    {r.highlights.map((h, i) => (
                      <div key={h.title} className="flex max-w-prose gap-3">
                        <span className="mt-0.5 font-mono text-[0.75rem] h-text">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <h4 className="font-medium">{h.title}</h4>
                          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{h.body}</p>
                        </div>
                      </div>
                    ))}
                    {r.flows && (
                      <div className="grid gap-8 pt-2 md:grid-cols-2">
                        {r.flows.map((f) => <FlowList key={f.title} title={f.title} steps={f.steps} />)}
                      </div>
                    )}
                    {notes.filter((n) => n.about === r.id).map((n) => (
                      <p key={n.slug} className="text-[0.9375rem]">
                        <Link href={`/notes/${n.slug}/`} className="font-medium h-text hover:underline hover:underline-offset-4">Read my note: {n.title} →</Link>
                      </p>
                    ))}
                    {project && (
                      <p className="text-[0.9375rem]">
                        <a href={`#project-${project.id}`} className="font-medium h-text hover:underline hover:underline-offset-4">See the {project.name} case study →</a>
                      </p>
                    )}
                  </div>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
