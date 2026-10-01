"use client";
import { useEffect, useRef, useState } from "react";
import { journey, nextChapter, progression } from "@/content/story";
import { achieve } from "@/lib/achievements";
import { hue } from "@/lib/hue";
import Section from "./Section";

export default function Journey() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    let raf = 0;
    const update = () => {
      const r = ol.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      const nodes = Array.from(ol.querySelectorAll<HTMLElement>(".chapter-node"));
      let idx = -1;
      nodes.forEach((n, i) => { if (n.getBoundingClientRect().top < mid) idx = i; });
      setActive(idx);
      if (idx === nodes.length - 1) achieve("story");
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <Section
      id="journey"
      eyebrow="story mode"
      hue="grape"
      title="The journey so far"
      lede="From a first line of code in school to AI infrastructure. Each chapter is a new level: what I did, what it taught me, and what I unlocked. Scroll through it."
     
    >
      {/* the skill tree, at a glance */}
      <ol data-reveal aria-label="How the work has progressed" className="mb-14 flex flex-wrap items-center gap-y-2 font-mono text-[0.8125rem]">
        {progression.map((s, i) => (
          <li key={s.stage} className="flex items-center" title={s.evidence}>
            <span className="rounded-full border px-3 py-1.5 h-chip" style={hue((["grape", "rose", "rose", "sun", "mint", "accent"] as const)[i])}>{s.stage}</span>
            {i < progression.length - 1 && <span aria-hidden="true" className="px-2 text-faint">→</span>}
          </li>
        ))}
      </ol>

      <div className="relative">
        <div aria-hidden="true" className="absolute bottom-6 left-[1.375rem] top-6 w-[2px] -translate-x-1/2 rounded-full bg-line lg:left-[12.25rem]">
          <div ref={fill} className="rail-fill h-full w-full rounded-full" style={{ transform: "scaleY(0)" }} />
        </div>

        <ol ref={list} className="relative space-y-8 sm:space-y-10">
          {journey.map((c, i) => (
            <li key={c.id} className="chapter grid grid-cols-[2.75rem_1fr] gap-x-4 lg:grid-cols-[9rem_3.5rem_1fr] lg:gap-x-6" style={hue(c.hue)} data-active={i === active ? "" : undefined}>
              <div className="hidden pt-2.5 text-right lg:block">
                <p className="font-mono text-[0.875rem] h-text">{c.date}</p>
                <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">chapter {String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="flex justify-center">
                <span className={`chapter-node relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 bg-bg font-mono text-[0.75rem] font-semibold h-border h-text ${c.now ? "ring-4 ring-accent/20" : ""}`}>
                  {c.now ? "NOW" : String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <article data-reveal className="chapter-card card p-5 sm:p-6">
                <p className="font-mono text-[0.8125rem] h-text lg:hidden">{c.date} · chapter {String(i + 1).padStart(2, "0")}</p>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[1.375rem] font-semibold tracking-[-0.015em]">
                    {c.title}
                    {c.now && <span className="ml-2.5 inline-flex translate-y-[-2px] items-center gap-1.5 rounded-full bg-mint/10 px-2 py-0.5 align-middle font-mono text-[0.6875rem] font-normal text-mint"><span className="live-dot !h-1.5 !w-1.5" aria-hidden="true" />in progress</span>}
                  </h3>
                </div>
                <p className="mt-0.5 text-[0.875rem] text-faint">{c.place}</p>
                <p className="mt-3 max-w-prose text-[0.9875rem] leading-relaxed text-ink/85">{c.story}</p>
                {c.takeaway && (
                  <p className="mt-4 max-w-prose border-l-2 pl-3.5 text-[0.9375rem] italic text-muted h-border">
                    {c.takeaway}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">unlocked</span>
                  {c.unlocked.map((u) => (
                    <span key={u} className="chip h-chip">+ {u}</span>
                  ))}
                </div>
                {c.link && (
                  <a href={c.link.href} className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium h-text hover:underline hover:underline-offset-4">
                    {c.link.label} <span aria-hidden="true">→</span>
                  </a>
                )}
              </article>
            </li>
          ))}

          <li className="grid grid-cols-[2.75rem_1fr] gap-x-4 lg:grid-cols-[9rem_3.5rem_1fr] lg:gap-x-6" style={hue("sun")}>
            <div className="hidden pt-2.5 text-right lg:block">
              <p className="font-mono text-[0.875rem] h-text">next</p>
              <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">loading…</p>
            </div>
            <div className="flex justify-center">
              <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-dashed bg-bg font-mono text-[1rem] h-border h-text" aria-hidden="true">?</span>
            </div>
            <article data-reveal className="rounded-2xl border border-dashed border-sun/40 bg-sun/[0.04] p-5 sm:p-6">
              <h3 className="text-[1.375rem] font-semibold tracking-[-0.015em]">{nextChapter.title}</h3>
              <p className="mt-3 max-w-prose text-[0.9875rem] leading-relaxed text-ink/85">{nextChapter.story}</p>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                {nextChapter.goals.map((g) => (
                  <div key={g.when} className="rounded-xl border border-line bg-bg/50 p-4">
                    <dt className="font-mono text-[0.75rem] uppercase tracking-[0.12em] h-text">{g.when}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-ink/90">{g.what}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </li>
        </ol>
      </div>
    </Section>
  );
}
