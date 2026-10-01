import Link from "next/link";
import { notes } from "@/content/notes";
import { hue } from "@/lib/hue";
import { noteContext } from "@/lib/noteContext";
import Section from "./Section";

export default function Notes() {
  if (notes.length === 0) return null;
  const [lead, ...rest] = notes;
  return (
    <Section id="notes" eyebrow="writing" hue="grape" title="Technical writing" lede="Longer write-ups of the ideas behind the work: what I built, why, what I measured, and what I still don't know.">
      <ul className="grid gap-5 md:grid-cols-2">
        {[lead, ...rest].map((n, i) => {
          const ctx = noteContext(n);
          const wide = i === 0 || (rest.length % 2 === 1 && i === notes.length - 1);
          return (
            <li key={n.slug} data-reveal style={hue(ctx.hue, { ["--delay" as string]: `${i * 50}ms` })} className={wide ? "md:col-span-2" : ""}>
              <Link href={`/notes/${n.slug}/`} data-glow data-tilt className="card group flex h-full flex-col p-6">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] h-text">{n.tags.slice(0, 2).join(" · ")}</p>
                <h3 className={`mt-2 font-semibold tracking-[-0.015em] group-hover:underline group-hover:underline-offset-4 ${i === 0 ? "text-[1.625rem]" : "text-[1.3125rem]"}`}>{n.title}</h3>
                <p className="mt-2 max-w-prose flex-1 text-[0.9375rem] leading-relaxed text-muted">{n.summary}</p>
                <p className="mt-4 flex items-center justify-between font-mono text-[0.75rem] text-faint">
                  <span>{n.readMinutes} min read{ctx.from ? ` · ${ctx.from.replace(/^From my (work at |project )/, "")}` : ""}</span>
                  <span className="h-text transition-transform group-hover:translate-x-1" aria-hidden="true">read →</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
