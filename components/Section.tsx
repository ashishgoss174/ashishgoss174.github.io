import type { ReactNode } from "react";
import { isTinted, sectionNumber } from "@/content/sections";
import { hue as hueStyle } from "@/lib/hue";
import type { Hue } from "@/lib/types";

/** A page section. Its number and background come from content/sections.ts. */
export default function Section({
  id, title, lede, eyebrow, hue = "accent", children, className = "",
}: { id: string; title: string; lede?: string; eyebrow?: string; hue?: Hue; children: ReactNode; className?: string }) {
  const num = sectionNumber(id);
  const tint = isTinted(id) ? "border-y border-line/60 bg-surface/30" : "";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section ${tint} ${className}`} style={hueStyle(hue)}>
      <div className="container-page">
        <header data-reveal className="mb-10 max-w-3xl sm:mb-12">
          {(num || eyebrow) && <p className="eyebrow mb-3">{[num, eyebrow].filter(Boolean).join(" · ")}</p>}
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          {lede && <p className="section-lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
