import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Extras from "@/components/Extras";
import NoteTheme from "@/components/NoteTheme";
import { experience } from "@/content/experience";
import { noteBySlug, notes } from "@/content/notes";
import { site } from "@/content/site";
import { hue } from "@/lib/hue";
import { asset } from "@/lib/paths";

export const dynamicParams = false;
export const generateStaticParams = () => notes.map((n) => ({ slug: n.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = noteBySlug((await params).slug);
  if (!n) return {};
  return {
    title: `${n.title} | ${site.name}`,
    description: n.summary,
    alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `/notes/${n.slug}/` } : undefined,
    openGraph: { type: "article", title: n.title, description: n.summary, publishedTime: n.date, authors: [site.name] },
  };
}

const fmtDate = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const n = noteBySlug((await params).slug);
  if (!n) notFound();
  const role = experience.find((r) => r.id === n.about);
  const h = role?.hue ?? "accent";

  return (
    <div style={hue(h)}>
      <header className="sticky z-40 border-b border-line/60 bg-bg/70 backdrop-blur-xl" style={{ top: "env(safe-area-inset-top, 0px)" }}>
        <div className="mx-auto flex h-16 w-full max-w-prose items-center justify-between gap-4 px-5 sm:max-w-[46rem] sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5 font-semibold">
            <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent via-grape to-rose font-mono text-[0.8125rem] text-bg">AG</span>
            <span className="text-muted transition-colors group-hover:text-ink">← {site.name}</span>
          </Link>
          <NoteTheme />
        </div>
      </header>

      <main id="main" className="relative overflow-hidden">
        <div className="aurora opacity-60" aria-hidden="true"><span /><span /><span /></div>
        <article className="relative mx-auto w-full max-w-[46rem] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
          <p className="eyebrow">Notes · {n.tags[0]}</p>
          <h1 className="mt-4 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">{n.title}</h1>
          <p className="mt-5 text-[1.1875rem] leading-relaxed text-muted">{n.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-8 text-[0.875rem] text-faint">
            {site.photo && <img src={asset(site.photo)} alt="" width={413} height={531} className="h-9 w-9 rounded-full border border-line-strong object-cover object-top" />}
            <span className="text-ink">{site.name}</span>
            <span>{fmtDate(n.date)}</span>
            <span>{n.readMinutes} min read</span>
            {role && <span>From my work at {role.company}</span>}
          </div>

          <div className="mt-10 space-y-6 text-[1.0625rem] leading-[1.8] text-ink/90">
            {n.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="pt-6 text-[1.5rem] font-semibold leading-snug tracking-[-0.015em] text-ink">{b.text}</h2>;
              if (b.type === "callout") return (
                <aside key={i} className="rounded-xl border p-5 h-border h-soft">
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] h-text">{b.label}</p>
                  <p className="mt-2 text-[1rem] leading-relaxed">{b.text}</p>
                </aside>
              );
              return <p key={i}>{b.text}</p>;
            })}
          </div>

          <ul className="mt-12 flex flex-wrap gap-1.5">{n.tags.map((t) => <li key={t} className="chip h-chip">{t}</li>)}</ul>

          <div className="mt-10 rounded-2xl border border-line-strong/70 bg-surface/80 p-6">
            <p className="font-semibold">Thanks for reading.</p>
            <p className="mt-1 text-muted">I&apos;m {site.name}, an AI engineer and data scientist in {site.location}. This note is one chapter of a longer story.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={role ? `/#exp-${role.id}` : "/"} className="btn btn-primary">See the work behind this →</Link>
              <Link href="/#contact" className="btn btn-quiet">Get in touch</Link>
            </div>
          </div>
        </article>
      </main>
      <Extras />
    </div>
  );
}
