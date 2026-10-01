import { systemLayers } from "@/content/story";
import { evidence } from "@/lib/evidence";
import { hue } from "@/lib/hue";
import type { Hue } from "@/lib/types";
import Section from "./Section";

const layerHues: Hue[] = ["rose", "grape", "accent", "mint", "sun", "rose", "accent"];

export default function ModelsToSystems() {
  return (
    <Section
      id="models-to-systems"
      eyebrow="the big picture"
      hue="sun"
      title="From models to systems"
      lede="A model is one component. Most of my work has been on the parts around it: preparing data, retrieving the right context, representing knowledge, constraining outputs and keeping runs reproducible. Each layer links to where that work happened."
     
    >
      <ol className="relative space-y-2">
        {systemLayers.map((l, i) => (
          <li
            key={l.layer}
            data-reveal
            style={hue(layerHues[i % layerHues.length], { ["--delay" as string]: `${i * 60}ms` })}
          >
            <div data-glow className="group grid gap-3 rounded-xl border border-line bg-bg/60 p-4 transition-colors hover:border-[rgb(var(--h)/0.5)] sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-6 sm:p-5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="font-mono text-[0.75rem] text-faint">L{i + 1}</span>
                <span aria-hidden="true" className="h-2.5 rounded-full h-bg transition-all group-hover:w-10" style={{ width: `${12 + i * 3}px` }} />
                <span className="font-medium">{l.layer}</span>
              </div>
              <p className="text-[0.9375rem] leading-snug text-muted">{l.work}</p>
              <ul className="flex flex-wrap gap-1.5 sm:justify-end">
                {l.refs.map((r) => {
                  const ref = evidence(r.id);
                  return (
                    <li key={r.id}>
                      <a href={ref?.href ?? "#"} className="chip h-chip whitespace-nowrap transition-transform hover:-translate-y-0.5">{r.label}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
