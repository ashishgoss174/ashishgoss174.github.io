import { certifications, education, languages, leadership } from "@/content/education";
import { projects } from "@/content/projects";
import { hue } from "@/lib/hue";
import type { Hue } from "@/lib/types";
import { ChevronIcon, ExternalIcon } from "./Icons";
import CertificateGallery from "./CertificateGallery";
import Section from "./Section";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[0.8125rem] h-text hover:underline hover:underline-offset-4">
      {children} <ExternalIcon className="h-3 w-3" />
    </a>
  );
}

const certHues: Hue[] = ["accent", "grape", "rose", "sun", "mint"];

function Cert({ c, i }: { c: (typeof certifications)[number]; i: number }) {
  return (
    <li style={hue(certHues[i % certHues.length])} className="flex gap-3 rounded-xl border border-line bg-bg/50 p-3.5 transition-colors hover:border-[rgb(var(--h)/0.5)]">
      <span aria-hidden="true" className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg font-mono text-[0.8125rem] h-soft h-text">✦</span>
      <div className="min-w-0">
        <p className="text-[0.9375rem] leading-snug">{c.name}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[0.8125rem] text-faint">
          <span>{c.issuer} · {c.date}</span>
          {c.href && <Ext href={c.href}>Verify</Ext>}
        </p>
      </div>
    </li>
  );
}

export default function Education() {
  // Certificates with scans are in the gallery; the rest sit behind "View all"
  const others = certifications.filter((c) => !c.image);

  return (
    <Section id="education" eyebrow="levelling up" hue="grape" title="Academic profile">
      <div className="grid items-start gap-5 lg:grid-cols-[1.45fr_1fr]">
        <article data-reveal data-glow className="card relative overflow-hidden p-6 sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-grape/20 blur-3xl" />
          <div className="relative flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-[1.375rem] font-semibold">{education.school}</h3>
            <p className="font-mono text-[0.8125rem] text-muted">{education.period}</p>
          </div>
          <p className="relative mt-1 text-ink/90">{education.degree}</p>
          <p className="relative text-grape">{education.specialisation}</p>

          <dl className="relative mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-line bg-bg/60 p-4">
              <dt className="text-[0.8125rem] text-faint">CGPA</dt>
              <dd className="mt-1 text-[1.5rem] font-semibold text-accent">{education.cgpa}</dd>
            </div>
            <div className="rounded-xl border border-line bg-bg/60 p-4">
              <dt className="text-[0.8125rem] text-faint">Final four-semester average</dt>
              <dd className="mt-1 text-[1.5rem] font-semibold text-mint">{education.finalFour}</dd>
              <dd className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <span className="block h-full rounded-full bg-gradient-to-r from-accent to-mint" style={{ width: "90.3%" }} />
              </dd>
            </div>
          </dl>

          <h4 className="relative mt-7 text-[0.9375rem] font-medium">Relevant coursework</h4>
          <ul className="relative mt-3 flex flex-wrap gap-1.5">
            {education.coursework.map((c) => <li key={c} className="chip">{c}</li>)}
          </ul>

          <h4 className="relative mt-7 text-[0.9375rem] font-medium">Academic projects</h4>
          <ul className="relative mt-3 flex flex-wrap gap-2">
            {projects.filter((p) => /B\.Tech/.test(p.context)).map((p) => (
              <li key={p.id}>
                <a href={`#project-${p.id}`} className="chip h-chip hover:-translate-y-0.5" style={hue(p.hue)}>
                  {p.name} <span className="ml-1.5 text-faint">{p.context.replace(/^B\.Tech /, "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </article>

        <div data-reveal className="space-y-5 lg:sticky lg:top-24">
          <section className="card p-5" aria-labelledby="lang-title" style={hue("accent")}>
            <h3 id="lang-title" className="font-semibold">Languages</h3>
            <ul className="mt-3 space-y-2.5">
              {languages.map((l) => (
                <li key={l.name} className="flex flex-wrap items-baseline justify-between gap-x-3 text-[0.9375rem]">
                  <span>{l.name} <span className="text-muted">{l.level}</span></span>
                  {l.href && <Ext href={l.href}>View document</Ext>}
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5" aria-labelledby="lead-title" style={hue("rose")}>
            <h3 id="lead-title" className="font-semibold">Leadership</h3>
            <p className="mt-2 text-[0.9375rem]">{leadership.role}, {leadership.org}</p>
            <p className="text-[0.8125rem] text-faint">{leadership.period}</p>
            <p className="mt-1.5 text-[0.875rem] text-muted">{leadership.detail}</p>
            {leadership.href && <div className="mt-2"><Ext href={leadership.href}>View document</Ext></div>}
          </section>
        </div>
      </div>

      <h3 data-reveal className="mb-4 mt-12 text-[1.25rem] font-semibold tracking-[-0.01em]">Selected certifications</h3>
      <CertificateGallery />
      {others.length > 0 && (
        <details className="rounded-xl border border-line bg-surface/60 px-4">
          <summary className="flex items-center gap-2 py-3 text-[0.9375rem] font-medium text-muted hover:text-ink">
            <ChevronIcon className="chev" /> View {others.length} more certifications
          </summary>
          <ul className="grid gap-2.5 pb-4 md:grid-cols-2">
            {others.map((c, i) => <Cert key={c.name} c={c} i={i} />)}
          </ul>
        </details>
      )}
    </Section>
  );
}