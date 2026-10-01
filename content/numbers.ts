import type { Hue } from "@/lib/types";
import { rankers, testSet } from "@/lib/evaluation";
import { certifications, education } from "./education";

/**
 * "By the numbers": only figures backed by your documents or by this site's own code.
 * Don't add a number here you couldn't defend in an interview.
 * `value` counts up; `text` is shown as-is. `source` says where the figure comes from.
 */
export const numbers: { value?: number; decimals?: number; prefix?: string; suffix?: string; text?: string; label: string; source: string; href: string; hue: Hue }[] = [
  { text: "5 → 1", label: "inconsistent image sources standardised into one dataset", source: "Nocturne GmbH", href: "#exp-nocturne", hue: "rose" },
  { value: 200, prefix: "~", label: "clinical documents grounding every CareCompanion answer", source: "CareCompanion", href: "#project-carecompanion", hue: "mint" },
  { value: 21, label: "hand landmarks per frame, sorted into 8 gesture groups", source: "ASL to Text & Speech", href: "#project-asl-to-speech", hue: "rose" },
  { value: 4, label: "kinds of destructive SQL statement blocked; only SELECT runs", source: "Talk-to-Your-Database", href: "#project-talk-to-your-database", hue: "accent" },
  { text: `${testSet.length} × ${rankers.length}`, label: "labelled questions × rankers in my retrieval evaluation", source: "Ask my portfolio", href: "#ask", hue: "accent" },
  { value: parseFloat(education.finalFour), decimals: 2, label: "out of 10 across my final four semesters", source: "SRM University", href: "#education", hue: "grape" },
  { value: certifications.length, label: "certifications, including a 44-hour AI, ML & data science bootcamp", source: "Education", href: "#education", hue: "sun" },
  { value: 4, suffix: "+ yrs", label: "volunteering with an NGO, heading PR since 2024", source: "Unwind Connect and Cure", href: "#education", hue: "mint" },
];
