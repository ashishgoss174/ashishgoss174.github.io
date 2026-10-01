import { testimonials } from "@/content/testimonials";
import { hue } from "@/lib/hue";
import Section from "./Section";

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <Section
      id="words"
      eyebrow="in their words"
      hue="rose"
      title="Selected recommendations"
      lede="Quoted as written. Each card says whether it comes from a recommendation letter or a certificate."
    >
      {/* 3 + 2 on wide screens: the first row thirds, the second row halves, so every row is full */}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {testimonials.map((t, i) => {
          const n = testimonials.length;
          const topRow = n % 3 === 2 ? n - 2 : n;
          const span = i < topRow ? "lg:col-span-2" : "lg:col-span-3";
          const lastAlone = n % 2 === 1 && i === n - 1 ? "md:col-span-2" : "";
          return (
          <li key={t.org} data-reveal className={`${span} ${lastAlone}`} style={hue(t.hue, { ["--delay" as string]: `${i * 70}ms` })}>
            <figure data-glow className="card relative flex h-full flex-col overflow-hidden p-6">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden="true" className="block h-8 font-serif text-[3.5rem] leading-none opacity-70 h-text">&ldquo;</span>
                <span className="rounded-full border px-2 py-0.5 font-mono text-[0.6875rem] text-muted h-border">{t.source}</span>
              </div>
              <blockquote className="relative mt-2 flex-1 text-[1.0625rem] leading-relaxed text-ink/90">{t.quote}</blockquote>
              <figcaption className="relative mt-5 min-h-[6.25rem] border-t border-line pt-4">
                {t.name && <p className="font-medium">{t.name}</p>}
                <p className={`text-[0.875rem] h-text ${t.name ? "" : "font-medium"}`}>{t.title}, {t.org}</p>
                <p className="mt-0.5 font-mono text-[0.75rem] text-faint">{t.context}</p>
              </figcaption>
            </figure>
          </li>
          );
        })}
      </ul>
    </Section>
  );
}
