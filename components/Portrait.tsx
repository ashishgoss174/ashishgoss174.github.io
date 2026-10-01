"use client";
import { useEffect, useRef, useState } from "react";
import { hero, site } from "@/content/site";
import { reducedMotion, toast } from "@/lib/fx";
import { asset } from "@/lib/paths";

type Mode = "photo" | "vision" | "ascii";
const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: "photo", label: "Photo", icon: "◉" },
  { id: "vision", label: "Vision", icon: "◎" },
  { id: "ascii", label: "ASCII", icon: "▦" },
];

// Face geometry in the photo's own pixels (413 × 531), measured by hand for the vision overlay
const W = 413, H = 531;
const FACE = { x: 112, y: 58, w: 186, h: 222 };
const MARKS: [number, number][] = [
  [150, 130], [172, 126], [194, 131], [222, 131], [246, 126], [268, 130], // brows
  [175, 147], [243, 147], // eyes
  [208, 168], [208, 192], [192, 199], [224, 199], // nose
  [182, 214], [208, 210], [236, 214], [208, 224], // mouth
  [130, 200], [148, 240], [178, 264], [208, 272], [240, 264], [268, 240], [288, 200], // jaw
];
const MESH: [number, number][] = [[0, 1], [1, 2], [3, 4], [4, 5], [6, 8], [7, 8], [8, 9], [9, 10], [9, 11], [12, 13], [13, 14], [14, 15], [15, 12], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22]];
const RAMP = " .:-=+*#%@";
const COLS = 58;

/** Hero portrait: a morphing frame that leans toward the cursor, three viewing modes, and clickable tech in orbit. */
export default function Portrait() {
  const [mode, setMode] = useState<Mode>("photo");
  const [ascii, setAscii] = useState<string>("");
  const wrap = useRef<HTMLDivElement>(null);
  const pre = useRef<HTMLPreElement>(null);

  // Deep link to a view, e.g. /?portrait=ascii
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("portrait");
    if (p === "vision" || p === "ascii") setMode(p);
  }, []);

  // Parallax: the photo leans toward the cursor, the orbit drifts the other way
  useEffect(() => {
    const el = wrap.current;
    const host = el?.closest("section");
    if (!el || !host || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
        const py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };
    const onLeave = () => { el.style.setProperty("--px", "0"); el.style.setProperty("--py", "0"); };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => { host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); cancelAnimationFrame(raf); };
  }, []);

  // ASCII mode: sample the photo on a canvas and map brightness to characters
  useEffect(() => {
    if (mode !== "ascii" || ascii) return;
    const img = new Image();
    img.src = asset(site.photo);
    img.onload = () => {
      const cols = COLS, rows = Math.round(cols * (H / W) * 0.5);
      const c = document.createElement("canvas");
      c.width = cols; c.height = rows;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, cols, rows);
      const d = ctx.getImageData(0, 0, cols, rows).data;
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
          // Contrast curve: the white background drops out, mid-tone skin still gets visible characters
          const ink = Math.pow(Math.min(1, Math.max(0, (0.97 - lum) / 0.5)), 0.7);
          out += RAMP[Math.min(RAMP.length - 1, Math.round(ink * (RAMP.length - 1)))];
        }
        out += "\n";
      }
      setAscii(out);
    };
  }, [mode, ascii]);

  // Fit the ASCII art to the frame's width
  useEffect(() => {
    const p = pre.current;
    if (!p || mode !== "ascii") return;
    const fit = () => { p.style.fontSize = `${p.parentElement!.clientWidth / COLS / 0.6}px`; };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(p.parentElement!);
    return () => ro.disconnect();
  }, [mode, ascii]);

  const cycle = () => {
    const next = MODES[(MODES.findIndex((m) => m.id === mode) + 1) % MODES.length].id;
    setMode(next);
    if (next === "vision") toast("◎ Vision mode: the kind of overlay my ASL project draws, here on a still photo.");
  };

  const searchSkill = (name: string) => window.dispatchEvent(new CustomEvent("skill-search", { detail: name }));

  if (!site.photo) return null;
  const n = hero.orbit.length;

  return (
    <div ref={wrap} className="portrait relative mx-auto aspect-square w-[min(20rem,82vw)] [--r:min(10rem,41vw)] sm:w-[24rem] sm:[--r:12rem] lg:w-[28rem] lg:[--r:14rem]">
      {/* orbit rings + clickable tech badges, drifting opposite to the photo */}
      <div className="portrait-back absolute inset-0">
        <div className="orbit-ring inset-0" aria-hidden="true" />
        <div className="orbit-ring inset-[13%] opacity-50" aria-hidden="true" />
        <div className="orbit">
          {hero.orbit.map((t, i) => (
            <div key={t} className="sat" style={{ ["--a" as string]: `${(360 / n) * i}deg` }}>
              <span>
                <span>
                  <button
                    type="button"
                    onClick={() => searchSkill(t)}
                    title={`Find ${t} in my skills`}
                    className={`pointer-events-auto whitespace-nowrap rounded-full border bg-bg/85 px-2.5 py-1 font-mono text-[0.6875rem] text-ink/90 shadow-lg backdrop-blur transition-transform hover:scale-110 hover:text-ink ${["border-accent/50", "border-grape/50", "border-rose/50", "border-sun/50", "border-mint/50"][i % 5]}`}
                  >
                    {t}
                  </button>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* the photo */}
      <div className="portrait-front absolute left-1/2 top-1/2 w-[60%]">
        <span className="portrait-glow absolute -inset-6 rounded-full" aria-hidden="true" />
        <button type="button" onClick={cycle} aria-label={`Portrait of ${site.name}. Current view: ${mode}. Click to switch view.`}
          className="blob group relative block w-full bg-gradient-to-br from-accent via-grape to-rose p-[3px] shadow-[0_30px_80px_-20px_rgb(var(--grape)/0.7)]">
          <span className="blob relative block aspect-[4/5] overflow-hidden bg-bg">
            {mode !== "ascii" && (
              <img src={asset(site.photo)} alt="" width={W} height={H} fetchPriority="high"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-[filter,transform] duration-500 group-hover:scale-[1.04] ${mode === "vision" ? "brightness-[0.85] contrast-[1.1] saturate-[0.6]" : ""}`} />
            )}

            {mode === "vision" && (
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <rect x="0" y="0" width={W} height="3" fill="rgb(var(--accent))" className="scan-line" />
                <g className="vision-in" fill="none" stroke="rgb(var(--accent))" strokeWidth="3">
                  {/* corner brackets of the detection box */}
                  {[[FACE.x, FACE.y, 1, 1], [FACE.x + FACE.w, FACE.y, -1, 1], [FACE.x, FACE.y + FACE.h, 1, -1], [FACE.x + FACE.w, FACE.y + FACE.h, -1, -1]].map(([x, y, sx, sy], i) => (
                    <path key={i} d={`M${x},${y + 26 * sy} L${x},${y} L${x + 26 * sx},${y}`} />
                  ))}
                  <rect x={FACE.x} y={FACE.y} width={FACE.w} height={FACE.h} strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
                </g>
                <g className="vision-in" style={{ animationDelay: "0.25s" }}>
                  {MESH.map(([a, b], i) => <line key={i} x1={MARKS[a][0]} y1={MARKS[a][1]} x2={MARKS[b][0]} y2={MARKS[b][1]} stroke="rgb(var(--mint))" strokeWidth="1.2" opacity="0.7" />)}
                  {MARKS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill="rgb(var(--mint))" />)}
                </g>
                <g className="vision-in" style={{ animationDelay: "0.45s" }}>
                  <rect x={FACE.x + FACE.w / 2 - 102} y={FACE.y + FACE.h + 8} width="204" height="26" rx="5" fill="rgb(var(--accent))" />
                  <text x={FACE.x + FACE.w / 2} y={FACE.y + FACE.h + 26} textAnchor="middle" fontSize="13" fontFamily="IBM Plex Mono, monospace" fill="rgb(var(--accent-ink))">face · ai_engineer 0.99</text>
                  <text x="12" y={H - 20} fontSize="13" fontFamily="IBM Plex Mono, monospace" fill="#fff" opacity="0.85">{MARKS.length} landmarks · 1 face</text>
                </g>
              </svg>
            )}

            {mode === "ascii" && (
              <span className="absolute inset-0 grid place-items-start overflow-hidden bg-bg">
                <pre ref={pre} aria-hidden="true" className="grad-text m-0 w-full whitespace-pre font-mono leading-[1.02] tracking-[0]">{ascii || "rendering…"}</pre>
              </span>
            )}

            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/75 to-transparent" aria-hidden="true" />
            <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-mint/40 bg-bg/80 px-2.5 py-1 font-mono text-[0.6875rem] text-ink backdrop-blur">
              <span className="live-dot !h-1.5 !w-1.5" aria-hidden="true" /> {site.location}
            </span>
          </span>
        </button>

        {/* view switcher */}
        <div role="group" aria-label="Portrait view" className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-line-strong/70 bg-surface/85 p-1 shadow-lg backdrop-blur">
          {MODES.map((m) => (
            <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[0.6875rem] transition-colors ${mode === m.id ? "bg-gradient-to-r from-accent/25 to-grape/25 text-ink" : "text-muted hover:text-ink"}`}>
              <span aria-hidden="true">{m.icon}</span>{m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
