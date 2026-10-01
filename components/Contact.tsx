"use client";
import { site } from "@/content/site";
import { copyText } from "@/lib/fx";
import { asset } from "@/lib/paths";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

export default function Contact() {
  const items = [
    site.linkedin && { label: "LinkedIn", value: "ashish-gossain", href: site.linkedin, icon: <LinkedInIcon />, external: true, h: "accent" },
    site.github && { label: "GitHub", value: "ashishgoss174", href: site.github, icon: <GitHubIcon />, external: true, h: "grape" },
    site.resume && { label: "Resume", value: "Download PDF", href: asset(site.resume), icon: <DownloadIcon />, external: false, download: true, h: "mint" },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: React.ReactNode; external: boolean; download?: boolean; h: string }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-page">
        <div data-reveal className="relative overflow-hidden rounded-3xl border border-line-strong/70 bg-surface p-7 sm:p-12">
          <div className="aurora opacity-80" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow mb-4" style={{ ["--h" as string]: "var(--mint)" }}><span className="secnum" aria-hidden="true" /> · the next chapter could be yours</p>
            <h2 id="contact-title" className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem]">
              Let&apos;s build <span className="grad-text">intelligent systems</span> together.
            </h2>
            <p className="mt-5 max-w-prose text-[1.0625rem] text-muted">
              For opportunities in AI engineering, data science, machine learning, applied AI, research internships and graduate study.
              Based in {site.location}.
            </p>

            {site.email && (
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <a href={`mailto:${site.email}`} className="btn btn-primary text-[1rem]">
                  <MailIcon /> {site.email}
                </a>
                <button type="button" className="btn btn-quiet" onClick={() => copyText(site.email, "Email copied. Talk soon!")}>
                  Copy
                </button>
              </div>
            )}

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {items.map((i) => (
                <li key={i.label} style={{ ["--h" as string]: `var(--${i.h})` }}>
                  <a
                    href={i.href}
                    data-glow
                    {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(i.download ? { download: true } : {})}
                    className="flex h-full items-start gap-3 rounded-xl border border-line bg-bg/70 p-4 transition-transform hover:-translate-y-0.5"
                  >
                    <span className="mt-0.5 h-text">{i.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-[0.8125rem] text-faint">{i.label}</span>
                      <span className="block break-words text-[0.9375rem] text-ink">{i.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
