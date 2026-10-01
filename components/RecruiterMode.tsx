"use client";
import { useEffect, useRef, useState } from "react";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { recruiter, site } from "@/content/site";
import { skillDomains } from "@/content/skills";
import { copyText } from "@/lib/fx";
import { hue } from "@/lib/hue";
import { asset } from "@/lib/paths";
import { CloseIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export const openRecruiter = () => window.dispatchEvent(new Event("open-recruiter"));

// The skills with the most evidence behind them
const topSkills = skillDomains.flatMap((d) => d.skills).filter((s) => s.evidence?.length)
  .sort((a, b) => b.evidence!.length - a.evidence!.length).slice(0, 14).map((s) => s.name);

/** Everything a busy recruiter needs on one screen. Open with the navbar button, the palette, or a link ending in #30s. */
export default function RecruiterMode() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-recruiter", onOpen);
    if (window.location.hash === "#30s") setOpen(true);
    return () => window.removeEventListener("open-recruiter", onOpen);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { d.showModal(); setRun((n) => n + 1); }
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      style={hue("accent")}
      aria-labelledby="tldr-title"
      onClose={() => { setOpen(false); if (window.location.hash === "#30s") history.replaceState(null, "", " "); }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      {open && (
        <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
          <div className="sticky top-0 z-10 border-b border-line bg-surface/95 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-7">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-accent">⏱ The 30-second version</p>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1.5 text-muted hover:text-ink" aria-label="Close the 30-second view">
                <CloseIcon />
              </button>
            </div>
            <div className="h-[3px] bg-line" aria-hidden="true">
              <div key={run} className="timer-bar h-full bg-gradient-to-r from-accent via-grape to-rose" />
            </div>
          </div>

          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <div className="flex items-center gap-4">
              {site.photo && (
                <img src={asset(site.photo)} alt="" width={413} height={531} className="h-20 w-16 shrink-0 rounded-xl border border-line-strong object-cover object-top" />
              )}
              <div>
                <h2 id="tldr-title" className="text-[1.625rem] font-semibold leading-tight tracking-[-0.02em]">{site.name}</h2>
                <p className="text-accent">{site.role}</p>
                <p className="text-[0.875rem] text-faint">{site.location} · open to AI/ML and data science roles, research internships and graduate study</p>
              </div>
            </div>

            <h3 className="mt-7 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">Top three</h3>
            <ol className="mt-3 space-y-2">
              {recruiter.highlights.map((h, i) => (
                <li key={h.what}>
                  <a href={h.href} onClick={() => setOpen(false)} className="flex gap-3 rounded-xl border border-line bg-bg/50 p-3.5 transition-colors hover:border-accent/50">
                    <span className="font-mono text-[0.875rem] text-accent">{i + 1}</span>
                    <span><span className="block text-[0.9375rem] text-ink">{h.what}</span><span className="text-[0.8125rem] text-faint">{h.where}</span></span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <section>
                <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">Experience</h3>
                <ul className="mt-3 space-y-2.5">
                  {experience.map((r) => (
                    <li key={r.id} style={hue(r.hue)} className="flex gap-2.5 text-[0.9375rem]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full h-bg" />
                      <span><span className="text-ink">{r.company}</span> <span className="text-muted">· {r.role}</span><span className="block font-mono text-[0.75rem] text-faint">{r.period} · {r.location}</span></span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">Education</h3>
                <p className="mt-3 text-[0.9375rem] text-ink">{education.degree}</p>
                <p className="text-[0.875rem] text-muted">{education.specialisation}, {education.school}</p>
                <p className="mt-1 font-mono text-[0.8125rem] text-mint">CGPA {education.cgpa} · last four semesters {education.finalFour.split(" (")[0]}</p>
                <h3 className="mt-5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">Proven stack</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">{topSkills.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
              </section>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
              {site.resume && <a href={asset(site.resume)} download className="btn btn-primary"><DownloadIcon /> Resume (PDF)</a>}
              {site.email && <button type="button" className="btn btn-quiet" onClick={() => copyText(site.email, `Copied ${site.email}`)}><MailIcon /> Copy email</button>}
              {site.linkedin && <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-quiet"><LinkedInIcon /> LinkedIn</a>}
              {site.github && <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-quiet"><GitHubIcon /> GitHub</a>}
              <button type="button" className="btn btn-quiet ml-auto" onClick={() => setOpen(false)}>Back to the full story →</button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
