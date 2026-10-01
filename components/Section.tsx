import type { ReactNode } from "react";
import { hue as hueStyle } from "@/lib/hue";
import type { Hue } from "@/lib/types";

/** A page section. Its number and alternating background come from CSS (globals.css), so they follow the view's order. */
export default function Section({
  id, title, lede, eyebrow, hue = "accent", children, className = "",
}: { id: string; title: string; lede?: string; eyebrow?: string; hue?: Hue; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`section ${className}`} style={hueStyle(hue)}>
      <div className="container-page">
        <header data-reveal className="mb-10 max-w-3xl sm:mb-12">
          <p className="eyebrow mb-3"><span className="secnum" aria-hidden="true" />{eyebrow && <> · {eyebrow}</>}</p>
          <h2 id={`${id}-title`} className="section-title">{title}</h2>
          {lede && <p className="section-lede">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
