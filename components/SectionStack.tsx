"use client";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { partSections, views } from "@/content/sections";
import { readView, setView, type View } from "@/lib/view";
import Part from "./Part";

/**
 * Renders the page's sections in the order of the current view (Everyone / Recruiter / Academic).
 * The server renders the "Everyone" order, so the page works without JavaScript.
 * A link to a section the current view hides switches back to "Everyone" first.
 */
export default function SectionStack({ sections }: { sections: Record<string, ReactNode> }) {
  const [view, setViewState] = useState<View>("all");
  const pendingScroll = useRef<string | null>(null);
  const first = useRef(true);

  useEffect(() => {
    setViewState(readView());
    const on = (e: Event) => setViewState((e as CustomEvent<View>).detail);
    window.addEventListener("viewchange", on);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href")?.slice(1);
      if (!id || document.getElementById(id) || !/^[\w-]+$/.test(id)) return;
      e.preventDefault();
      pendingScroll.current = id;
      setView("all");
    };
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("viewchange", on); document.removeEventListener("click", onClick); };
  }, []);

  // After a view change: show content immediately (scroll reveals were set up for the old layout) and finish any jump
  useEffect(() => {
    window.dispatchEvent(new Event("layoutchange"));
    // The very first render keeps the normal scroll reveals; any later layout shows everything at once,
    // because the reveal observer only knows about the elements that existed on load
    if (first.current) { first.current = false; if (view === "all") return; }
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    const id = pendingScroll.current;
    if (id) {
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `${window.location.search}#${id}`);
      });
    }
  }, [view]);

  const order = views[view].order;
  return (
    <>
      {order.map((key) => {
        if (key.startsWith("part:")) {
          const p = key.slice(5);
          return <Part key={key} id={p} sections={partSections(order, p)} />;
        }
        const node = sections[key];
        return node ? <Fragment key={key}>{node}</Fragment> : null;
      })}
    </>
  );
}
