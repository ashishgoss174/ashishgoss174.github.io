"use client";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/fx";

/** Cycles through phrases with a typewriter effect. Server render shows the first phrase. */
export function RotatingWord({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (reducedMotion()) return;
    let w = 0, n = words[0].length, deleting = true, t: number;
    const step = () => {
      const word = words[w];
      if (deleting) {
        n--;
        if (n <= 0) { deleting = false; w = (w + 1) % words.length; }
      } else {
        n++;
        if (n >= words[w].length) { deleting = true; setText(words[w]); t = window.setTimeout(step, 2200); return; }
      }
      setText((deleting ? word : words[w]).slice(0, Math.max(0, n)));
      t = window.setTimeout(step, deleting ? 40 : 75);
    };
    t = window.setTimeout(step, 2400);
    return () => window.clearTimeout(t);
  }, [words]);

  return (
    <span className="grad-text whitespace-nowrap">
      {text}
      <span aria-hidden="true" className="caret ml-0.5 !bg-grape" />
    </span>
  );
}

/** A little terminal that types commands and prints their output. */
export function Terminal({ lines }: { lines: { cmd: string; out: string }[] }) {
  const total = lines.reduce((s, l) => s + l.cmd.length + 1, 0);
  const [typed, setTyped] = useState(Number.POSITIVE_INFINITY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (reducedMotion()) return;
    setTyped(0);
    let n = 0, t: number;
    const tick = () => {
      n++;
      setTyped(n);
      // pause after each command so its output can "run"
      let acc = 0, pause = false;
      for (const l of lines) { acc += l.cmd.length + 1; if (n === acc) { pause = true; break; } }
      if (n < total) t = window.setTimeout(tick, pause ? 420 : 38 + Math.random() * 40);
    };
    t = window.setTimeout(tick, 700);
    return () => window.clearTimeout(t);
  }, [lines, total]);

  let budget = typed;
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong/80 bg-bg/80 shadow-[0_30px_80px_-30px_rgb(var(--accent)/0.45)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-sun/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
        <span className="ml-2 font-mono text-[0.75rem] text-faint">ashish@portfolio: ~</span>
      </div>
      <ul className="sr-only">{lines.map((l) => <li key={l.cmd}>{l.out}</li>)}</ul>
      <div className="term-body min-h-[13.5rem] space-y-1.5 px-4 py-3.5 font-mono text-[0.8125rem] leading-relaxed" data-ready={ready ? "" : undefined} aria-hidden="true">
        {lines.map((l, i) => {
          if (budget <= 0 && i > 0) return null;
          const shown = Math.min(l.cmd.length, Math.max(0, budget));
          const done = budget > l.cmd.length;
          budget -= l.cmd.length + 1;
          return (
            <div key={i}>
              <p><span className="text-mint">❯</span> <span className="text-ink">{l.cmd.slice(0, shown)}</span>{!done && <span className="caret ml-0.5" aria-hidden="true" />}</p>
              {done && <p className={i === lines.length - 1 ? "text-accent" : "text-muted"}>{l.out}</p>}
            </div>
          );
        })}
        {budget > 0 && <p><span className="text-mint">❯</span> <span className="caret" aria-hidden="true" /></p>}
      </div>
    </div>
  );
}

/** Counts up to a value when it scrolls into view. Server render shows the final value. */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion() || !ref.current) return;
    setV(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        setV(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);

  const fmt = v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref} className="tabular-nums">{prefix}{fmt}{suffix}</span>;
}

/** Tracks the cursor over its parent section for the spotlight effect. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current, host = el?.parentElement;
    if (!el || !host || reducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    host.addEventListener("pointermove", onMove);
    return () => host.removeEventListener("pointermove", onMove);
  }, []);
  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
