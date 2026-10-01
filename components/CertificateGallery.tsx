"use client";
import { useEffect, useRef, useState } from "react";
import { certifications } from "@/content/education";
import { hue } from "@/lib/hue";
import { asset } from "@/lib/paths";
import type { Hue } from "@/lib/types";
import { CloseIcon, ExternalIcon } from "./Icons";

const withImage = certifications.filter((c) => c.image);
const hues: Hue[] = ["grape", "rose", "mint"];

/** Preview cards for the certificates that have scans; click to open the full certificate. */
export default function CertificateGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // Deep link: /#cert-1 opens the first certificate
  useEffect(() => {
    const m = window.location.hash.match(/^#cert-(\d+)$/);
    const i = m ? parseInt(m[1], 10) - 1 : -1;
    if (i >= 0 && i < withImage.length) setOpen(i);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  if (withImage.length === 0) return null;
  const c = open !== null ? withImage[open] : null;
  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + withImage.length) % withImage.length));

  return (
    <div className="mb-5">
      <ul className="grid gap-5 sm:grid-cols-3">
        {withImage.map((cert, i) => (
          <li key={cert.name} data-reveal style={hue(hues[i % hues.length], { ["--delay" as string]: `${i * 70}ms` })}>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}
              data-glow
              data-tilt
              className="card group flex h-full w-full flex-col overflow-hidden text-left"
            >
              <span className="relative block overflow-hidden border-b border-line bg-white">
                <img
                  src={asset(`${cert.image}-thumb.jpg`)}
                  alt={`Certificate: ${cert.name}`}
                  width={640}
                  height={452}
                  loading="lazy"
                  className="block aspect-[1.414] w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-bg/0 opacity-0 transition-all duration-300 group-hover:bg-bg/45 group-hover:opacity-100">
                  <span className="rounded-full border border-white/40 bg-bg/80 px-3 py-1.5 font-mono text-[0.75rem] text-ink backdrop-blur">⤢ view certificate</span>
                </span>
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="text-[0.9375rem] font-medium leading-snug">{cert.name}</span>
                <span className="mt-1 text-[0.8125rem] text-faint">{cert.issuer} · <span className="h-text">{cert.date}</span></span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="project-dialog !w-[min(64rem,calc(100vw-1.5rem))]"
        aria-label={c ? `Certificate: ${c.name}` : "Certificate"}
        style={hue(open !== null ? hues[open % hues.length] : "grape")}
        onClose={() => { setOpen(null); opener.current?.focus(); }}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
      >
        {c && (
          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] h-text">{c.issuer} · {c.date}</p>
                <h3 className="mt-0.5 text-[1.25rem] font-semibold leading-snug">{c.name}</h3>
              </div>
              <button type="button" onClick={() => setOpen(null)} className="rounded-md p-2 text-muted transition-transform hover:rotate-90 hover:text-ink" aria-label="Close certificate">
                <CloseIcon />
              </button>
            </div>
            <div className="bg-white p-2 sm:p-3">
              <img key={c.image} src={asset(`${c.image}.jpg`)} alt={`Certificate: ${c.name}, issued by ${c.issuer}`} width={1600} height={1131} className="block h-auto w-full" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
              <div className="flex gap-2">
                <button type="button" className="btn btn-quiet py-1.5 text-[0.875rem]" onClick={() => step(-1)} aria-label="Previous certificate">←</button>
                <button type="button" className="btn btn-quiet py-1.5 text-[0.875rem]" onClick={() => step(1)} aria-label="Next certificate">→</button>
                <span className="self-center font-mono text-[0.75rem] text-faint">{open! + 1} / {withImage.length}</span>
              </div>
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary py-1.5 text-[0.875rem]">
                  Verify original <ExternalIcon />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
