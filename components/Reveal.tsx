"use client";
import { useEffect } from "react";

/** Adds .is-visible to [data-reveal] elements as they scroll into view. Content is visible without JS. */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    // Safety net: never leave content hidden (e.g. when jumping to a #hash far down the page)
    const t = window.setTimeout(() => els.forEach((el) => el.classList.add("is-visible")), 2500);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
  return null;
}
