import { certifications, education, languages, leadership } from "@/content/education";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillDomains } from "@/content/skills";
import { interests, journey, nextChapter } from "@/content/story";
import { workflow } from "@/content/datascience";
import { notes } from "@/content/notes";
import type { Hue } from "./types";

/**
 * "Ask my portfolio": a small retrieval engine over this site's own content.
 * Chunk → tokenise → BM25 rank → extract the best sentences → cite sources.
 * No LLM and no network: it can only quote what is on the page, and says so when nothing matches.
 */

export interface Doc { id: number; title: string; source: string; href: string; hue: Hue; text: string }

const docs: Doc[] = [];
const add = (title: string, source: string, href: string, hue: Hue, text: string) =>
  docs.push({ id: docs.length, title, source, href, hue, text });

for (const r of experience) {
  add(`${r.role} at ${r.company}`, r.company, `#exp-${r.id}`, r.hue,
    `${r.company}, ${r.role}, ${r.period}, ${r.location} (${r.mode}). ${r.summary} Technologies: ${r.stack.join(", ")}.`);
  for (const h of r.highlights) add(h.title, r.company, `#exp-${r.id}`, r.hue, h.body);
}
for (const p of projects) {
  add(p.name, "Project", `#project-${p.id}`, p.hue,
    `${p.name} (${p.category}, ${p.context}). Problem: ${p.problem} Solution: ${p.solution} Built with ${p.stack.join(", ")}. ${p.status}`);
  add(`${p.name}: decisions`, "Project", `#project-${p.id}`, p.hue, p.decisions.join(" "));
  add(`${p.name}: what I learned`, "Project", `#project-${p.id}`, p.hue, p.learned);
}
for (const c of journey) add(`${c.date}: ${c.title}`, "Journey", "#journey", c.hue, `${c.place}. ${c.story} ${c.takeaway ?? ""}`);
add(nextChapter.title, "Journey", "#journey", "sun", `${nextChapter.story} ${nextChapter.goals.map((g) => `${g.when}: ${g.what}`).join(" ")}`);
add("Education", "Education", "#education", "grape",
  `${education.degree}, ${education.specialisation}, ${education.school}, ${education.period}. CGPA ${education.cgpa}. Final four-semester average ${education.finalFour}. Coursework: ${education.coursework.join(", ")}.`);
add("Certifications", "Education", "#education", "grape",
  certifications.map((c) => `${c.name} from ${c.issuer} (${c.date}).`).join(" "));
add("Languages", "Education", "#education", "accent", languages.map((l) => `${l.name}: ${l.level}.`).join(" "));
add("Leadership and volunteering", "Education", "#education", "rose", `${leadership.role}, ${leadership.org}, ${leadership.period}. ${leadership.detail}`);
for (const d of skillDomains) {
  const used = d.skills.filter((s) => s.evidence?.length).map((s) => s.name);
  const listed = d.skills.filter((s) => !s.evidence?.length).map((s) => s.name);
  add(`Skills: ${d.title}`, "Skills", "#skills", d.hue,
    `${d.title}: ${d.blurb} Used in real work: ${used.join(", ") || "none yet"}.${listed.length ? ` Also listed on my CV: ${listed.join(", ")}.` : ""}`);
}
for (const w of workflow) add(`Data science: ${w.step}`, "Data science", "#data-science", w.hue, w.out);
// Notes: one passage per section, linking to the note page (a path, not a #hash)
for (const n of notes) {
  let heading = n.title, buf: string[] = [];
  const flush = () => { if (buf.length) add(`${n.title}: ${heading === n.title ? "intro" : heading}`, "Note", `/notes/${n.slug}/`, "grape", buf.join(" ")); buf = []; };
  for (const b of n.body) {
    if (b.type === "h2") { flush(); heading = b.text; } else buf.push(b.text);
  }
  flush();
}
for (const f of interests.further) add(`Interest: ${f.area}`, "Interests", "#interests", "mint", `${f.question} Builds on ${f.builds}.`);

// ---------- tokenisation ----------
const STOP = new Set("a an and are as at be by did do does for from has have how i in is it its me my of on or that the this to was were what when where which who why with you your ashish he his can any ever use used using also".split(" "));
const SYN: Record<string, string[]> = {
  ml: ["machine", "learning"], dl: ["deep", "learning"], cv: ["computer", "vision"], kg: ["knowledge", "graph"],
  db: ["database"], database: ["database", "postgresql", "mysql", "mongodb", "redis", "supabase", "neo4j"], gpa: ["cgpa"], grades: ["cgpa"], llm: ["llm", "language", "model"], nlp: ["nlp", "language"],
  ai: ["ai"], ds: ["data", "science"], eda: ["exploratory", "eda"], ocr: ["ocr"], study: ["master", "study"], masters: ["master"],
  job: ["intern", "role"], work: ["intern", "role"], internship: ["intern"], sql: ["sql"], germany: ["berlin", "germany"],
};
/** A light stemmer: plurals and common verb endings, careful not to over-strip ("databases" → "database"). */
const stem = (w: string) => {
  if (w.length <= 4) return w;
  if (w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (/(ss|us|is)$/.test(w)) return w;
  if (/(ch|sh|x|z)es$/.test(w)) return w.slice(0, -2);
  if (w.endsWith("s")) return w.slice(0, -1);
  if (w.endsWith("ing") && w.length > 6) return w.slice(0, -3);
  if (w.endsWith("ed") && w.length > 5) return w.slice(0, -2);
  return w;
};
const words = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9+.#]+/g, " ").split(" ").map((w) => w.replace(/\.+$/, "")).filter((w) => w && !STOP.has(w));
export const tokenize = (s: string) => words(s).map(stem);

/** A BM25 scorer over one tokenisation of the corpus. */
function bm25Index(tok: (s: string) => string[]) {
  const toks = docs.map((d) => tok(`${d.title} ${d.title} ${d.text}`));
  const tfs = toks.map((t) => t.reduce((m, w) => m.set(w, (m.get(w) ?? 0) + 1), new Map<string, number>()));
  const avg = toks.reduce((s, t) => s + t.length, 0) / toks.length;
  const df = new Map<string, number>();
  toks.forEach((t) => new Set(t).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));
  const idf = (w: string) => Math.log(1 + (docs.length - (df.get(w) ?? 0) + 0.5) / ((df.get(w) ?? 0) + 0.5));
  // k1 = 1.2, b = 0.75
  return (terms: string[]) => tfs.map((tf, i) => {
    let score = 0;
    for (const q of terms) {
      const f = tf.get(q) ?? 0;
      if (f) score += idf(q) * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * toks[i].length / avg));
    }
    return score;
  });
}
const bm25Full = bm25Index(tokenize);
const bm25Plain = bm25Index(words);
const rawSets = docs.map((d) => new Set(words(`${d.title} ${d.text}`)));

const expand = (query: string) => [...new Set(tokenize(query).flatMap((w) => (SYN[w] ?? [w]).map((x) => stem(x.toLowerCase()))))];

export type Ranker = "keyword" | "bm25-plain" | "bm25";
/** Scores for every passage under one of three rankers, used by the evaluation. */
export function scores(query: string, ranker: Ranker): number[] {
  if (ranker === "keyword") { const q = words(query); return rawSets.map((s) => q.filter((w) => s.has(w)).length); }
  if (ranker === "bm25-plain") return bm25Plain(words(query));
  return bm25Full(expand(query));
}

export interface Hit { doc: Doc; score: number; sentence: string }
export interface Result { query: string; terms: string[]; hits: Hit[]; ms: number; corpus: number }

/** BM25 with stemming and synonyms over the chunks, then the best-matching sentence of each hit. */
export function ask(query: string, k = 3): Result {
  const t0 = performance.now();
  const terms = expand(query);
  const scored = bm25Full(terms).map((score, i) => ({ i, score }))
    .filter((x) => x.score > 1.2).sort((a, b) => b.score - a.score).slice(0, k);

  const hits = scored.map(({ i, score }) => {
    const d = docs[i];
    const sentences = d.text.replace(/([.!?])\s+/g, "$1\u0000").split("\u0000").map((s) => s.trim()).filter(Boolean);
    const best = sentences
      .map((s) => ({ s, n: tokenize(s).filter((w) => terms.includes(w)).length }))
      .sort((a, b) => b.n - a.n)[0];
    return { doc: d, score, sentence: best?.s ?? d.text };
  });
  return { query, terms, hits, ms: performance.now() - t0, corpus: docs.length };
}

export const corpusSize = docs.length;
export const allDocs = docs;
