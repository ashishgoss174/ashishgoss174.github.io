"use client";
import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, achieve, resetAchievements, unlocked } from "@/lib/achievements";

export const openAchievements = () => window.dispatchEvent(new Event("open-achievements"));

/** Navbar trophy counter with a popover listing every achievement. Also watches for section-based ones. */
export default function Achievements() {
  const [got, setGot] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGot(unlocked());
    const onAch = () => { setGot(unlocked()); setBump(true); window.setTimeout(() => setBump(false), 600); };
    const onOpen = () => setOpen(true);
    window.addEventListener("achievement", onAch);
    window.addEventListener("open-achievements", onOpen);

    // "Hello, world" when About is reached
    const about = document.getElementById("about");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { achieve("hello"); io.disconnect(); } }, { threshold: 0.3 });
    if (about) io.observe(about);
    return () => { window.removeEventListener("achievement", onAch); window.removeEventListener("open-achievements", onOpen); io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const n = got.size, total = ACHIEVEMENTS.length;

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Achievements: ${n} of ${total} unlocked`}
        className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[0.8125rem] transition-all ${n === total ? "border-sun/60 text-sun" : "border-line text-muted hover:border-sun/50 hover:text-ink"} ${bump ? "scale-110 border-sun/70" : ""}`}
      >
        <span aria-hidden="true">🏆</span> {n}/{total}
      </button>
      {open && (
        <div className="palette absolute right-0 top-full z-50 mt-2 w-[min(21rem,calc(100vw-2rem))] rounded-2xl border border-line-strong bg-surface p-4 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
          <div className="flex items-baseline justify-between">
            <p className="font-semibold">Explorer achievements</p>
            <p className="font-mono text-[0.75rem] text-faint">{Math.round((n / total) * 100)}%</p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div className="h-full rounded-full bg-gradient-to-r from-sun via-rose to-grape transition-all" style={{ width: `${(n / total) * 100}%` }} />
          </div>
          <ul className="mt-3 max-h-[55vh] space-y-1 overflow-y-auto">
            {ACHIEVEMENTS.map((a) => {
              const has = got.has(a.id);
              return (
                <li key={a.id} className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${has ? "" : "opacity-55"}`}>
                  <span aria-hidden="true" className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[0.9375rem] ${has ? "bg-sun/15" : "bg-raised grayscale"}`}>{has ? a.icon : "🔒"}</span>
                  <span className="min-w-0">
                    <span className={`block text-[0.875rem] ${has ? "text-ink" : "text-muted"}`}>{a.title}</span>
                    <span className="block text-[0.75rem] text-faint">{a.how}</span>
                  </span>
                  <span className="sr-only">{has ? "unlocked" : "locked"}</span>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={() => { resetAchievements(); }} className="mt-3 text-[0.75rem] text-faint underline underline-offset-4 hover:text-ink">
            Reset progress
          </button>
        </div>
      )}
    </div>
  );
}
