import type { Hue } from "@/lib/types";

/**
 * "What makes an AI system dependable?" Four properties, each shown through one engineering decision:
 * what was decided, why, and what it made possible. Each comes from the case study it links to.
 */
export const decisions: { property: string; where: string; decision: string; why: string; consequence: string; href: string; hue: Hue }[] = [
  {
    property: "Grounded",
    where: "CareCompanion",
    decision: "Retrieve before generating: answer from clinical documents and cite them.",
    why: "An answer from the model's memory can't be traced to anything.",
    consequence: "Every answer points to the documents it came from, so a reader can check it.",
    href: "#project-carecompanion",
    hue: "mint",
  },
  {
    property: "Constrained",
    where: "Talk-to-Your-Database",
    decision: "Enforce SELECT-only in code, in front of execution.",
    why: "A prompt can ask the model not to change data; only a check that runs first can guarantee it.",
    consequence: "A generated query can never modify the database, whatever the model writes.",
    href: "#project-talk-to-your-database",
    hue: "accent",
  },
  {
    property: "Structured",
    where: "FutureVerse knowledge graph",
    decision: "Give facts validity periods instead of overwriting them.",
    why: "What a student knows changes over time, and overwriting loses that history.",
    consequence: "The system can answer what a student knew at any past point, and trace a wrong answer to one concept.",
    href: "#exp-futureverse",
    hue: "grape",
  },
  {
    property: "Reproducible",
    where: "FV Orchestration",
    decision: "Derive each version identifier from the content itself.",
    why: "Altered content must not keep an identifier it no longer matches.",
    consequence: "Long workflows resume from the last valid state instead of re-running model calls, and every run can be audited.",
    href: "#exp-futureverse",
    hue: "rose",
  },
];
