import { allDocs, scores, type Ranker } from "./search";

/**
 * A small, honest evaluation of "Ask my portfolio".
 * 20 hand-written questions, each labelled with the page sections that genuinely answer it.
 * A retrieved passage counts as relevant if it links to one of those sections.
 */
export const testSet: { q: string; relevant: string[] }[] = [
  { q: "Have you built a RAG system?", relevant: ["/notes/rag-before-the-model/", "#journey", "#project-carecompanion", "#exp-celebal"] },
  { q: "What did you do at Nocturne?", relevant: ["/notes/preparing-medical-imaging-data/", "#journey", "#exp-nocturne"] },
  { q: "Which databases have you used?", relevant: ["#skills", "#project-talk-to-your-database", "#exp-adqvest", "#exp-futureverse"] },
  { q: "Do you know Kafka?", relevant: ["#exp-futureverse", "#skills"] },
  { q: "What is your CGPA?", relevant: ["#journey", "#education"] },
  { q: "What do you want to study next?", relevant: ["#journey"] },
  { q: "How do you stop generated SQL from changing the database?", relevant: ["/notes/text-to-sql-safety/", "#project-talk-to-your-database"] },
  { q: "Experience with computer vision", relevant: ["#journey", "#project-asl-to-speech", "#exp-nocturne"] },
  { q: "Tell me about the knowledge graph", relevant: ["/notes/temporal-knowledge-graph/", "#journey", "#exp-futureverse"] },
  { q: "How did you clean messy data?", relevant: ["/notes/preparing-medical-imaging-data/", "#journey", "#exp-nocturne", "#exp-adqvest", "#data-science"] },
  { q: "Which languages do you speak?", relevant: ["#education"] },
  { q: "Have you worked with OCR?", relevant: ["/notes/temporal-knowledge-graph/", "#journey", "#exp-futureverse", "#project-invoice-extractor"] },
  { q: "Web scraping experience", relevant: ["#journey", "#exp-adqvest"] },
  { q: "What certifications do you have?", relevant: ["#education"] },
  { q: "Have you worked with a team in Germany?", relevant: ["/notes/preparing-medical-imaging-data/", "#journey", "#exp-nocturne"] },
  { q: "What is JARVIS?", relevant: ["#journey", "#project-jarvis"] },
  { q: "How do long LLM workflows recover after a failure?", relevant: ["/notes/temporal-knowledge-graph/", "#exp-futureverse"] },
  { q: "Can you read invoices in different languages?", relevant: ["#project-invoice-extractor"] },
  { q: "Any leadership or volunteering?", relevant: ["#education"] },
  { q: "Sign language recognition", relevant: ["#journey", "#project-asl-to-speech"] },
];

export const rankers: { id: Ranker; label: string; detail: string }[] = [
  { id: "keyword", label: "Keyword overlap", detail: "Counts shared words. The baseline." },
  { id: "bm25-plain", label: "BM25", detail: "Term frequency × rarity, length-normalised" },
  { id: "bm25", label: "BM25 + stemming + synonyms", detail: "What the demo uses" },
];

/** `ranks[i]` is the 1-based rank of the first relevant passage for question i (0 = not found). */
export interface Metrics { hit1: number; hit3: number; mrr: number; ranks: number[]; top: string[] }

function evaluate(ranker: Ranker): Metrics {
  let hit1 = 0, hit3 = 0, rr = 0;
  const ranks: number[] = [], top: string[] = [];
  for (const t of testSet) {
    const s = scores(t.q, ranker);
    const order = s.map((v, i) => ({ v, i })).filter((x) => x.v > 0).sort((a, b) => b.v - a.v || a.i - b.i).map((x) => x.i);
    const rank = order.findIndex((i) => t.relevant.includes(allDocs[i].href));
    if (rank === 0) hit1++;
    if (rank >= 0 && rank < 3) hit3++;
    if (rank >= 0) rr += 1 / (rank + 1);
    ranks.push(rank + 1);
    top.push(order.length ? allDocs[order[0]].title : "");
  }
  const n = testSet.length;
  return { hit1: hit1 / n, hit3: hit3 / n, mrr: rr / n, ranks, top };
}

/** Computed once, deterministically, from the same content the site shows. */
export const results = rankers.map((r) => ({ ...r, ...evaluate(r.id) }));
