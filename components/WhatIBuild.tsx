import { buildAreas } from "@/content/build";
import { evidence } from "@/lib/evidence";
import { hue } from "@/lib/hue";
import Section from "./Section";

export default function WhatIBuild() {
  return (
    <Section id="build" eyebrow="at a glance" hue="accent" title="What I build">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {buildAreas.map((a, i) => (
          <li key={a.title} data-reveal style={hue(a.hue, { ["--delay" as string]: `${i * 60}ms` })}>
            <div data-glow className="card flex h-full flex-col p-5">
              <span aria-hidden="true" className="h-1 w-10 rounded-full h-bg" />
              <h3 className="mt-4 text-[1.125rem] font-semibold">{a.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-snug text-muted">{a.line}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {a.refs.map((id) => {
                  const r = evidence(id);
                  return r ? <li key={id}><a href={r.href} className="chip h-chip hover:-translate-y-0.5">{r.label}</a></li> : null;
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
