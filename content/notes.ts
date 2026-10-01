/**
 * Technical notes, published at /notes/<slug>/.
 * Written in your voice from your SOP and CV. Read them and edit freely before publishing,
 * and check with your employer that the level of detail is fine to share.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "callout"; label: string; text: string };

export interface Note {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readMinutes: number;
  tags: string[];
  /** id of the role or project it belongs to */
  about: string;
  body: Block[];
}

export const notes: Note[] = [
  {
    slug: "temporal-knowledge-graph",
    title: "What a wrong answer really means",
    summary: "Notes on building a temporal knowledge graph for adaptive learning: why concepts beat chapters, why the graph needs rules, and why it has to remember what a student knew and when.",
    date: "2026-10-01",
    readMinutes: 5,
    tags: ["Knowledge graphs", "RDF", "Temporal modelling", "EdTech"],
    about: "futureverse",
    body: [
      { type: "p", text: "At FutureVerse I work on the platform behind adaptive preparation for India's UPSC exams. This note is about one part of it, the knowledge graph, and the design idea that interested me most. I've kept it at the level of ideas; internal details stay internal." },

      { type: "h2", text: "The problem with “weak in chapter 7”" },
      { type: "p", text: "The easy way to react to a wrong answer is to mark the whole chapter as weak and send the student back to reread it. But an incorrect answer doesn't necessarily mean the entire chapter was misunderstood. Often the difficulty lies in one concept, and if the system can't tell which one, it spends the student's time on everything they already know." },

      { type: "h2", text: "Represent concepts, not chapters" },
      { type: "p", text: "So the graph models individual knowledge units and the relationships between them, in RDF. Questions connect to the concepts they test, which means a wrong answer can resolve to the specific concept at fault rather than to a whole chapter. That's the whole point of the graph: structure that lets the system say what needs attention." },

      { type: "h2", text: "Give the graph rules: an ontology registry" },
      { type: "p", text: "A graph that anything can be written into drifts. An ontology registry defines which node and edge types are permitted, so content that arrives through an automated pipeline still lands in a consistent shape. PostgreSQL is the storage layer underneath." },

      { type: "h2", text: "Add time: validity periods" },
      { type: "p", text: "This is the part I found most interesting. Facts carry the period in which they held. Instead of overwriting a student's state when it changes, the graph keeps the history, so the system can reconstruct what a student knew at any past point, not only what they know now." },
      { type: "callout", label: "Illustrative example, not real data", text: "Say a student's grasp of a concept changes on 1 April. A query “as of 15 March” returns the earlier state; a query “as of today” returns the new one. Both answers are correct. They're about different moments." },
      { type: "p", text: "That matters because learning is a story over time. With history kept, you can ask whether a concept was understood and later forgotten, or trace when a misunderstanding started." },

      { type: "h2", text: "Garbage in, graph out" },
      { type: "p", text: "The graph is only as good as what goes into it. Exam PDFs go through Mistral OCR and rule-based regex parsing and come out as clean, structured JSON, which is checked against the schema before anything reaches the graph. Most of the effort in a system like this sits in that unglamorous path." },

      { type: "h2", text: "Making long pipelines trustworthy" },
      { type: "p", text: "The AI pipelines around the graph run on FV Orchestration as composable, resumable skills. I proposed content-hash version identification: an identifier derived from the content itself, so altered content can't keep an identifier it no longer matches. A long-running workflow can resume from its last valid state instead of repeating expensive model calls, and every run can be reproduced and audited." },

      { type: "h2", text: "What I don't know yet" },
      { type: "p", text: "I can define the relationships and identify the concepts associated with incorrect answers. What I haven't done is design an experiment that shows this approach improves learning outcomes compared with chapter-level feedback. That's the gap I want to close next: experimental design, statistical inference and proper evaluation. Building a system that works is one skill; showing when and why it works is another." },
      { type: "p", text: "If you're working on similar problems, I'd like to hear from you." },
    ],
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);
