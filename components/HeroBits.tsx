"use client";
import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/fx";

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
