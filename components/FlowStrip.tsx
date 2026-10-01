import type { FlowStep } from "@/lib/types";

/** Compact one-line architecture, used on project cards. Wraps instead of overflowing. Colour and border follow the stage kind. */
export default function FlowStrip({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-wrap items-center gap-y-1.5 font-mono text-[0.75rem] text-muted">
      {steps.map((s, i) => {
        const colored = s.kind !== "input" && s.kind !== "process";
        return (
          <li key={i} className="flex items-center" data-kind={s.kind}>
            <span
              className={`rounded border px-1.5 py-0.5 ${s.kind === "guard" ? "border-dashed" : ""} ${colored ? "h-chip" : "border-line"}`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && <span aria-hidden="true" className="px-1.5 text-faint">›</span>}
          </li>
        );
      })}
    </ol>
  );
}
