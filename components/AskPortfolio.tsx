"use client";
import { useEffect, useRef, useState } from "react";
import { achieve } from "@/lib/achievements";
import { asset } from "@/lib/paths";
import { hue } from "@/lib/hue";
import { ask, corpusSize, tokenize, type Result } from "@/lib/search";
import Evaluation from "./Evaluation";
import Section from "./Section";

const suggestions = [
  "How did Ashish build his RAG system?",
  "What did he do at FutureVerse?",
  "What experience does he have with medical AI?",
  "How does his knowledge graph work?",
  "Which databases has he used?",
  "What does he want to study?",
];

const link = (href: string) => (href.startsWith("/") ? asset(href) : href);

/** Up to two answer sentences, skipping any that repeat one already chosen. */
function answerSentences(res: Result) {
  const out: { h: Result["hits"][number]; i: number }[] = [];
  res.hits.forEach((h, i) => {
    if (out.length >= 2) return;
    const words = new Set(tokenize(h.sentence));
    const dup = out.some(({ h: o }) => {
      const other = tokenize(o.sentence);
      const shared = other.filter((w) => words.has(w)).length;
      return shared / Math.max(1, Math.min(other.length, words.size)) > 0.6;
    });
    if (!dup) out.push({ h, i });
  });
  return out;
}

/** Wraps the query's terms in <mark> so the reader can see why a passage was retrieved. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((p, i) => {
        const t = tokenize(p)[0];
        return t && terms.includes(t) ? <mark key={i} className="rounded bg-accent/20 px-0.5 text-ink">{p}</mark> : <span key={i}>{p}</span>;
      })}
    </>
  );
}

export default function AskPortfolio() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const run = (query: string) => {
    const s = query.trim();
    if (!s) { setRes(null); return; }
    setQ(s);
    setRes(ask(s));
    achieve("curious");
  };

  // Allow deep links such as /?ask=kafka#ask, and focusing from the command palette
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("ask");
    if (p) run(p);
    const onFocus = () => { document.getElementById("ask")?.scrollIntoView({ behavior: "smooth" }); window.setTimeout(() => input.current?.focus(), 400); };
    window.addEventListener("focus-ask", onFocus);
    return () => window.removeEventListener("focus-ask", onFocus);
  }, []);

  return (
    <Section
      id="ask"
      eyebrow="live demo"
      hue="accent"
      title="Ask about my work"
      lede={`Ask a question about my projects, experience or interests. A small retrieval engine, the idea behind CareCompanion, ranks the ${corpusSize} passages on this site with BM25 and quotes the best match with its source. No LLM and no server: if nothing matches, it says so instead of guessing.`}
     
    >
      <div data-reveal className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <form onSubmit={(e) => { e.preventDefault(); run(q); }} className="flex gap-2">
            <label className="flex flex-1 items-center gap-2.5 rounded-xl border border-line-strong bg-bg/70 px-4 transition-colors focus-within:border-accent/70 focus-within:shadow-[0_0_0_4px_rgb(var(--accent)/0.12)]">
              <span className="font-mono text-accent" aria-hidden="true">?</span>
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. What did he build at FutureVerse?"
                aria-label="Ask a question about Ashish's work"
                className="h-12 w-full bg-transparent text-[1rem] text-ink outline-none placeholder:text-faint"
              />
            </label>
            <button type="submit" className="btn btn-primary">Ask</button>
          </form>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Example questions">
            {suggestions.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => run(s)} className="chip transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-ink">{s}</button>
              </li>
            ))}
          </ul>

          <div aria-live="polite" className="mt-6">
            {res && res.hits.length > 0 && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-5">
                  <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-accent">Answer · extracted, with sources</p>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">
                    {answerSentences(res).map(({ h, i }) => (
                      <span key={h.doc.id}>
                        <Highlight text={h.sentence} terms={res.terms} />
                        <a href={link(h.doc.href)} className="ml-1 align-super font-mono text-[0.75rem] text-accent hover:underline">[{i + 1}]</a>{" "}
                      </span>
                    ))}
                  </p>
                </div>
                <ol className="space-y-2">
                  {res.hits.map((h, i) => (
                    <li key={h.doc.id} style={hue(h.doc.hue)}>
                      <a href={link(h.doc.href)} className="group flex gap-3 rounded-xl border border-line bg-bg/50 p-3.5 transition-colors hover:border-[rgb(var(--h)/0.5)]">
                        <span className="font-mono text-[0.75rem] h-text">[{i + 1}]</span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className="font-medium group-hover:underline group-hover:underline-offset-4">{h.doc.title}</span>
                            <span className="font-mono text-[0.6875rem] text-faint">{h.doc.source} · score {h.score.toFixed(2)}</span>
                          </span>
                          <span className="mt-1 block h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
                            <span className="block h-full rounded-full h-bg" style={{ width: `${Math.min(100, (h.score / res.hits[0].score) * 100)}%` }} />
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {res && res.hits.length === 0 && (
              <div className="rounded-2xl border border-dashed border-rose/50 bg-rose/[0.05] p-5">
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-rose">No passage scored high enough</p>
                <p className="mt-2 text-muted">
                  Nothing on this site answers &ldquo;{res.query}&rdquo;, so I won&apos;t make something up. That&apos;s the RAG lesson in one line: refuse rather than guess. Try another question, or just email me.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* the pipeline, live */}
        <aside className="card p-5" aria-label="How the answer was produced">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">Under the hood</p>
          <ol className="mt-4 space-y-3 font-mono text-[0.8125rem]">
            {[
              { k: "input", label: "query", v: res ? `"${res.query}"` : "waiting for a question…" },
              { k: "process", label: "tokens", v: res ? `[${res.terms.map((t) => `"${t}"`).join(", ")}]` : "lowercase · stop-words · stemming · synonyms" },
              { k: "retrieval", label: "BM25", v: res ? `ranked ${res.corpus} passages in ${res.ms < 0.1 ? "< 0.1" : res.ms.toFixed(2)} ms` : `k1 = 1.2, b = 0.75 over ${corpusSize} passages` },
              { k: "guard", label: "threshold", v: res ? (res.hits.length ? `${res.hits.length} passed score > 1.2` : "0 passed → refuse") : "drop weak matches instead of guessing" },
              { k: "output", label: "answer", v: res ? (res.hits.length ? "best sentence per hit + citations" : "honest “no match”") : "extractive, cited, no LLM" },
            ].map((s, i) => (
              <li key={s.label} data-kind={s.k} className={`node transition-opacity ${res || i === 0 ? "opacity-100" : "opacity-60"}`}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-ink">{s.label}</span>
                  <span className="kind-tag">{s.k}</span>
                </div>
                <p className="mt-1 break-words text-[0.75rem] leading-snug text-muted">{s.v}</p>
              </li>
            ))}
          </ol>
        </aside>
      </div>
      <Evaluation />
    </Section>
  );
}
