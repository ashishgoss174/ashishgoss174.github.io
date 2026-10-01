import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { hero, site } from "@/content/site";
import { asset } from "@/lib/paths";
import HeroGraph from "./HeroGraph";
import { CountUp, RotatingWord, Spotlight, Terminal } from "./HeroBits";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./Icons";
import Portrait from "./Portrait";

const statHues = ["accent", "grape", "rose", "mint"] as const;

// Every technology used somewhere on the site, for the marquee
const tech = Array.from(new Set([...experience.flatMap((r) => r.stack), ...projects.flatMap((p) => p.stack)]));

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden border-b border-line/60">
      <div className="aurora" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Spotlight />

      <div className="container-page relative grid items-center gap-12 pb-12 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16">
        <div>
          {/* status pill */}
          <a href="#contact" className="group mb-7 inline-flex max-w-full flex-wrap items-center overflow-hidden rounded-full border border-line-strong/70 bg-surface/70 text-[0.8125rem] shadow-[0_8px_30px_-12px_rgb(var(--mint)/0.5)] backdrop-blur transition-colors hover:border-mint/60">
            <span className="flex items-center gap-2 bg-mint/10 px-3 py-1.5 font-mono text-[0.75rem] text-mint">
              <span className="live-dot" aria-hidden="true" /> NOW
            </span>
            <span className="px-3 py-1.5 text-ink">{hero.status.now}</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line-strong sm:block" />
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-muted transition-colors group-hover:text-ink">
              {hero.status.open}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </a>

          <h1 className="text-[2.9rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-[4.25rem] lg:text-[4.75rem]">
            {site.name}
          </h1>
          <p className="mt-3 font-mono text-[0.9375rem] text-muted sm:text-[1rem]">
            <span className="text-accent">AI Engineer</span> <span className="text-faint">&amp;</span> <span className="text-mint">Data Scientist</span>
          </p>
          <p className="mt-5 text-[1.375rem] font-medium leading-snug text-ink/90 sm:text-[1.75rem]">
            I build <RotatingWord words={hero.rotating} />
          </p>
          <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-relaxed text-muted">{site.statement}</p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a href="#journey" className="btn btn-primary">Start the journey ↓</a>
            <a href="#projects" className="btn btn-quiet">View projects</a>
            {site.resume && (
              <a href={asset(site.resume)} download className="btn btn-quiet">
                <DownloadIcon /> Resume
              </a>
            )}
            {site.github && (
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-quiet px-3" aria-label="GitHub profile (opens in new tab)">
                <GitHubIcon />
              </a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-quiet px-3" aria-label="LinkedIn profile (opens in new tab)">
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>

        <div className="order-first lg:order-none">
          <Portrait />
        </div>
      </div>

      {/* terminal + live graph */}
      <div className="container-page relative grid items-center gap-8 pb-14 lg:grid-cols-2">
        <div>
          <Terminal lines={hero.terminal} />
          <div className="mt-6">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">What I have built</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {hero.built.map((b, i) => (
                <li key={b.label}>
                  <a href={b.href} className="chip transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink"
                    style={{ ["--h" as string]: `var(--${statHues[i % 4]})` }}>
                    <span aria-hidden="true" className="mr-1.5 h-1.5 w-1.5 rounded-full h-bg" />
                    {b.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroGraph />
        </div>
      </div>

      <div className="relative border-t border-line/60 bg-surface/40 backdrop-blur-sm">
        <dl className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-7 lg:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={s.label} style={{ ["--h" as string]: `var(--${statHues[i]})` }}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="h-text block text-[2rem] font-semibold leading-none tracking-[-0.02em] sm:text-[2.5rem]">
                  <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} />
                </span>
                <span className="mt-2 block text-[0.9375rem] text-ink">{s.label}</span>
                <span className="block text-[0.8125rem] text-faint">{s.sub}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="marquee border-t border-line/60 py-3" aria-hidden="true">
          <div className="marquee-track gap-2">
            {[...tech, ...tech].map((t, i) => (
              <span key={i} className="chip mr-2 whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
