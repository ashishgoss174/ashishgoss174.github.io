import type { Hue } from "@/lib/types";

/** "What I build": four areas, each backed by work on this site. `refs` are project or role ids. */
export const buildAreas: { title: string; line: string; refs: string[]; hue: Hue }[] = [
  {
    title: "LLM & retrieval",
    line: "Retrieval-augmented answers with citations, Text-to-SQL with safety enforced in code, and multimodal document Q&A.",
    refs: ["carecompanion", "talk-to-your-database", "invoice-extractor"],
    hue: "grape",
  },
  {
    title: "Knowledge systems",
    line: "A temporal RDF knowledge graph with an ontology registry, validity periods and point-in-time queries.",
    refs: ["futureverse"],
    hue: "accent",
  },
  {
    title: "ML, vision & data science",
    line: "Real-time sign-language recognition, a curated medical imaging dataset, exploratory analysis and a retrieval evaluation.",
    refs: ["asl-to-speech", "nocturne", "retrieval-evaluation"],
    hue: "rose",
  },
  {
    title: "AI & data infrastructure",
    line: "Content-hash versioning for resumable LLM workflows, exam PDFs to structured JSON, and ETL with validation.",
    refs: ["futureverse", "adqvest"],
    hue: "sun",
  },
];
