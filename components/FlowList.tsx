import { kindLabel } from "@/content/flows";
import type { FlowStep } from "@/lib/types";

/** Vertical architecture diagram. Every detail is always visible, so nothing depends on hover. */
export default function FlowList({ steps, title }: { steps: FlowStep[]; title?: string }) {
  return (
    <figure>
      {title && <figcaption className="mb-3 text-[0.9375rem] font-medium">{title}</figcaption>}
      <ol className="relative">
        {steps.map((s, i) => (
          <li key={i} className="relative grid grid-cols-[1.75rem_1fr] gap-3 pb-3 last:pb-0" data-kind={s.kind}>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute left-[0.8125rem] top-7 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-line-strong to-line" />
            )}
            <span aria-hidden="true" className="mt-2 flex h-[1.625rem] w-[1.625rem] items-center justify-center rounded-full border bg-bg font-mono text-[0.6875rem] h-border h-text">
              {i + 1}
            </span>
            <div className="node" data-kind={s.kind}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-[0.9375rem] font-medium">{s.label}</span>
                <span className="kind-tag">{kindLabel[s.kind]}</span>
              </div>
              <p className="mt-1 text-[0.875rem] leading-snug text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
