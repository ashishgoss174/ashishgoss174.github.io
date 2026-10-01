import Link from "next/link";
import { experience } from "@/content/experience";
import { notes } from "@/content/notes";
import { hue } from "@/lib/hue";
import Section from "./Section";

export default function Notes() {
  if (notes.length === 0) return null;
  return (
    <Section id="notes" eyebrow="writing" hue="grape" title="Notes" lede="Longer write-ups of the ideas behind the work: what I built, why, and what I still don't know.">
      <ul className="grid gap-5 md:grid-cols-2">
        {notes.map((n) => {
          const role = experience.find((r) => r.id === n.about);
          return (
            <li key={n.slug} data-reveal style={hue(role?.hue ?? "grape")} className={notes.length % 2 === 1 && n === notes[notes.length - 1] ? "md:col-span-2" : ""}>
              <Link href={`/notes/${n.slug}/`} data-glow data-tilt className="card group flex h-full flex-col p-6">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] h-text">{n.tags.slice(0, 2).join(" · ")}</p>
                <h3 className="mt-2 text-[1.375rem] font-semibold tracking-[-0.015em] group-hover:underline group-hover:underline-offset-4">{n.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{n.summary}</p>
                <p className="mt-4 flex items-center justify-between font-mono text-[0.75rem] text-faint">
                  <span>{n.readMinutes} min read{role ? ` · ${role.company}` : ""}</span>
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
