import { interests } from "@/content/story";
import { hue } from "@/lib/hue";
import type { Hue } from "@/lib/types";
import Section from "./Section";

const hues: Hue[] = ["accent", "grape", "rose", "sun", "mint", "accent"];

export default function Interests() {
  return (
    <Section
      id="interests"
      eyebrow="open questions"
      hue="mint"
      title="Research & technical interests"
      lede="What my work has covered so far, and the questions I want to study in more depth."
    >
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_1.4fr]">
        <section data-reveal className="card p-6 lg:sticky lg:top-24" aria-labelledby="explored-title">
          <h3 id="explored-title" className="font-semibold">Areas I have worked in</h3>
          <ul className="mt-4 divide-y divide-line">
            {interests.explored.map((e, i) => (
              <li key={e.area} style={hue(hues[i % hues.length])} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="flex items-center gap-2 text-[0.9375rem]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full h-bg" />{e.area}</span>
                <span className="text-[0.8125rem] text-faint sm:text-right">{e.where}</span>
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal aria-labelledby="further-title">
          <h3 id="further-title" className="mb-4 font-semibold">Areas I want to study further</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {interests.further.map((f, i) => (
              <li key={f.area} style={hue(hues[i % hues.length])}>
                <div data-glow className="card h-full p-5">
                  <p className="font-mono text-[0.75rem] h-text">Q{i + 1}</p>
                  <p className="mt-1 font-medium">{f.area}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{f.question}</p>
                  <p className="mt-3 text-[0.8125rem] text-faint">Builds on: {f.builds}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Section>
  );
}
