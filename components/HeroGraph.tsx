"use client";
import { useState } from "react";
import type { Hue } from "@/lib/types";

/** The stages of the systems on this site, linked. Hover to trace connections, click to jump to the work. */
const nodes: { id: string; x: number; y: number; label: string; hue: Hue; href: string; big?: boolean }[] = [
  { id: "data", x: 60, y: 300, label: "data", hue: "rose", href: "#exp-nocturne" },
  { id: "val", x: 150, y: 392, label: "validation", hue: "sun", href: "#exp-adqvest" },
  { id: "ocr", x: 70, y: 150, label: "OCR", hue: "sun", href: "#exp-futureverse" },
  { id: "emb", x: 180, y: 222, label: "embeddings", hue: "grape", href: "#project-carecompanion" },
  { id: "idx", x: 300, y: 306, label: "vector index", hue: "sun", href: "#project-carecompanion" },
  { id: "ret", x: 330, y: 176, label: "retrieval", hue: "accent", href: "#project-carecompanion" },
  { id: "llm", x: 450, y: 258, label: "LLM", hue: "grape", href: "#project-talk-to-your-database", big: true },
  { id: "ont", x: 228, y: 84, label: "ontology", hue: "rose", href: "#exp-futureverse" },
  { id: "kg", x: 402, y: 62, label: "knowledge graph", hue: "accent", href: "#exp-futureverse", big: true },
  { id: "ans", x: 462, y: 394, label: "cited answer", hue: "mint", href: "#project-carecompanion" },
];
const edges: [string, string][] = [
  ["data", "val"], ["data", "emb"], ["ocr", "emb"], ["ocr", "ont"], ["val", "idx"], ["emb", "idx"], ["idx", "ret"],
  ["ret", "llm"], ["emb", "ont"], ["ont", "kg"], ["kg", "ret"], ["kg", "llm"], ["llm", "ans"],
];
const at = (id: string) => nodes.find((n) => n.id === id)!;

export default function HeroGraph() {
  const [hover, setHover] = useState<string | null>(null);
  const linked = (id: string) => !hover || id === hover || edges.some(([a, b]) => (a === hover && b === id) || (b === hover && a === id));
  const edgeOn = (a: string, b: string) => !hover || a === hover || b === hover;

  return (
    <figure className="relative">
      <svg viewBox="0 0 520 440" className="h-auto w-full overflow-visible" role="img" aria-label="Interactive diagram of linked stages: data, validation, OCR, embeddings, vector index, retrieval, ontology, knowledge graph, LLM and cited answer">
        <defs>
          <linearGradient id="edge-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(var(--grape))" />
            <stop offset="1" stopColor="rgb(var(--accent))" />
          </linearGradient>
        </defs>
        <g fill="none" strokeWidth="1.3">
          {edges.map(([a, b], i) => {
            const p = at(a), q = at(b), on = edgeOn(a, b);
            return (
              <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} pathLength={100}
                stroke={hover && on ? "url(#edge-grad)" : "rgb(var(--line-strong))"}
                strokeWidth={hover && on ? 2 : 1.3}
                opacity={on ? 1 : 0.25}
                className="graph-edge" style={{ ["--d" as string]: `${0.15 + i * 0.07}s` }} />
            );
          })}
        </g>
        {/* data packets travelling along the edges */}
        <g className="packet-dot" aria-hidden="true">
          {edges.map(([a, b], i) => {
            const p = at(a), q = at(b);
            return (
              <circle key={i} r="2.4" fill={`rgb(var(--${at(b).hue}))`} opacity={edgeOn(a, b) ? 0.95 : 0.15}>
                <animateMotion dur={`${2.6 + (i % 4) * 0.7}s`} begin={`${1.8 + i * 0.35}s`} repeatCount="indefinite" path={`M${p.x},${p.y} L${q.x},${q.y}`} />
              </circle>
            );
          })}
        </g>
        {nodes.map((n, i) => {
          const on = linked(n.id);
          const c = `rgb(var(--${n.hue}))`;
          return (
            <a key={n.id} href={n.href} aria-label={`${n.label}: jump to related work`}
              onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}
              className="cursor-pointer outline-none">
              <g className="graph-node" style={{ ["--d" as string]: `${0.1 + i * 0.07}s` }} opacity={on ? 1 : 0.3}>
                <circle cx={n.x} cy={n.y} r={n.big ? 20 : 14} fill={c} opacity="0.14" className="graph-pulse" style={{ ["--d" as string]: `${i * 0.45}s` }} />
                <circle cx={n.x} cy={n.y} r={22} fill="transparent" />
                <circle cx={n.x} cy={n.y} r={hover === n.id ? 8 : n.big ? 6.5 : 5} fill={hover === n.id || n.big ? c : "rgb(var(--bg))"} stroke={c} strokeWidth="1.8"
                  style={{ transition: "r 0.2s ease" }} />
                <text x={n.x} y={n.y + (n.y > 350 ? -18 : 26)} textAnchor="middle" className="font-mono" fontSize="12.5"
                  fill={hover === n.id ? c : n.big ? "rgb(var(--ink))" : "rgb(var(--muted))"}>
                  {n.label}
                </text>
              </g>
            </a>
          );
        })}
      </svg>
      <figcaption className="mt-1 text-center font-mono text-[0.75rem] text-faint">hover a node to trace it · click to see the work</figcaption>
    </figure>
  );
}
