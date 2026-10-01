import { interests } from "@/content/story";
import { hue } from "@/lib/hue";
import type { Hue } from "@/lib/types";
import Section from "./Section";

const hues: Hue[] = ["mint", "accent", "grape", "rose", "sun", "accent"];

/** Research directions: what I did → the question it raised → what I want to study. */
export default function Interests() {
  return (
    <Section
      id="interests"
      eyebrow="open questions"
      hue="mint"
      title="Research directions"
      lede="Each direction starts from something I've built, the question it left me with, and the academic area that answers it."
    >
      <div className="mb-3 hidden grid-cols-[13rem_1fr_1fr_14rem] gap-6 px-6 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint lg:grid" aria-hidden="true">
        <span>Direction</span><span>Experience</span><span>Question</span><span>Academic direction</span>
      </div>
      <ol className="space-y-3">
        {interests.further.map((f, i) => (
          <li key={f.area} data-reveal style={hue(hues[i % hues.length], { ["--delay" as string]: `${i * 50}ms` })}>
            <div data-glow className="card grid gap-4 p-5 sm:p-6 lg:grid-cols-[13rem_1fr_1fr_14rem] lg:gap-6">
              <div>
                <p className="font-mono text-[0.75rem] h-text">Q{i + 1}</p>
                <h3 className="mt-1 font-semibold leading-snug">{f.area}</h3>
              </div>
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint lg:hidden">Experience</p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-muted lg:mt-0">{f.experience}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint lg:hidden">Question</p>
                <p className="mt-1 text-[0.9375rem] leading-snug text-ink/90 lg:mt-0">{f.question}</p>
              </div>
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint lg:hidden">Academic direction</p>
                <p className="mt-1 text-[0.875rem] font-medium leading-snug h-text lg:mt-0">{f.direction}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
