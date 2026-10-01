import { numbers } from "@/content/numbers";
import { hue } from "@/lib/hue";
import { CountUp } from "./HeroBits";
import Section from "./Section";

export default function Numbers() {
  return (
    <Section
      id="numbers"
      eyebrow="by the numbers"
      hue="sun"
      title="Small numbers, all real"
      lede="Every figure here comes from my CV, certificates or this site's own code, and links to where it's from."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {numbers.map((n, i) => (
          <li key={n.label} data-reveal style={hue(n.hue, { ["--delay" as string]: `${i * 50}ms` })}>
            <a href={n.href} data-glow className="card group flex h-full flex-col p-5">
              <span className="text-[2.25rem] font-semibold leading-none tracking-[-0.03em] h-text">
                {n.text ?? <CountUp value={n.value!} decimals={n.decimals} prefix={n.prefix} suffix={n.suffix} />}
              </span>
              <span className="mt-3 flex-1 text-[0.9375rem] leading-snug text-ink/90">{n.label}</span>
              <span className="mt-4 flex items-center justify-between font-mono text-[0.75rem] text-faint">
                <span>{n.source}</span>
                <span aria-hidden="true" className="h-text transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
