import type { Hue } from "@/lib/types";

/** Selected engineering decisions: what was decided, and why. Each comes from the case study it links to. */
export const decisions: { where: string; decision: string; why: string; href: string; hue: Hue }[] = [
  {
    where: "Talk-to-Your-Database",
    decision: "Enforce SELECT-only in code, in front of execution.",
    why: "A prompt can ask the model not to change data; only a check that runs before every query can guarantee it.",
    href: "#project-talk-to-your-database",
    hue: "accent",
  },
  {
    where: "FV Orchestration",
    decision: "Derive each version identifier from the content itself.",
    why: "Altered content can't keep an identifier it no longer matches, so workflows resume from the last valid state and runs stay reproducible.",
    href: "#exp-futureverse",
    hue: "grape",
  },
  {
    where: "Knowledge graph",
    decision: "Give facts validity periods instead of overwriting them.",
    why: "What a student knows changes over time; keeping history makes point-in-time questions answerable.",
    href: "#exp-futureverse",
    hue: "grape",
  },
  {
    where: "CareCompanion",
    decision: "Answer from retrieved clinical documents and cite them.",
    why: "An answer a reader can trace to its source can be checked; one from the model's memory can't.",
    href: "#project-carecompanion",
    hue: "mint",
  },
  {
    where: "ASL to Text & Speech",
    decision: "Classify drawn hand landmarks, not raw camera frames.",
    why: "A clean landmark drawing removes background and lighting variation more directly than a bigger model would.",
    href: "#project-asl-to-speech",
    hue: "rose",
  },
];
