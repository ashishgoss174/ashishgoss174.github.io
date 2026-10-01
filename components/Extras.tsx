"use client";
import { useEffect } from "react";
import { site } from "@/content/site";
import { achieve } from "@/lib/achievements";
import { confetti, reducedMotion, toast } from "@/lib/fx";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/**
 * Site-wide delight, all optional:
 * - [data-glow] elements get a border light that follows the cursor; [data-tilt] ones also lean toward it
 * - the Konami code throws confetti
 * - a note for anyone who opens DevTools
 */
export default function Extras() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = reducedMotion();
    let active: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-glow]") ?? null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      if (fine && !still && el.hasAttribute("data-tilt")) {
        el.style.setProperty("--rx", `${((y / r.height) - 0.5) * -5}deg`);
        el.style.setProperty("--ry", `${((x / r.width) - 0.5) * 5}deg`);
      }
    };
    const reset = (el: HTMLElement) => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
    const onLeave = () => { if (active) reset(active); active = null; };

    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq = [...seq, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (seq.join() === KONAMI.join()) {
        seq = [];
        confetti();
        toast("↑↑↓↓←→←→BA. You clearly read the details. So do I.", 4500);
        window.setTimeout(() => achieve("secret"), 1800);
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKey);

    console.log(
      "%c👋 Hey, fellow dev.%c\nYou opened the console, so you're my kind of person.\n\n" +
        "  › Press Ctrl+K (⌘K) for the command palette\n  › Try the Konami code\n  › Or type: sudo hire ashish\n\n" +
        `Source-curious? ${site.github}\nSay hi: ${site.email}`,
      "font: 600 16px system-ui; color: #22d3ee",
      "font: 13px ui-monospace, monospace; color: #a78bfa",
    );

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
