import type { View } from "@/lib/view";

/**
 * The page's structure. Each view is an ordered list of section ids; "part:<id>" inserts a part divider.
 * Section numbers are drawn by CSS counters, so they follow whatever order is shown.
 * Every id here must have a matching entry in the `sections` map in app/page.tsx.
 */
export const labels: Record<string, string> = {
  about: "About", numbers: "By the numbers", thread: "The thread", journey: "Journey",
  experience: "Experience", projects: "Projects", decisions: "Decisions", systems: "Systems", "models-to-systems": "Models to systems",
  "data-science": "How I work", ask: "Ask about my work", interests: "Research directions", notes: "Writing",
  words: "Recommendations", education: "Academic profile", skills: "Tech stack", contact: "Contact",
};

export const parts: Record<string, { numeral: string; title: string }> = {
  who: { numeral: "I", title: "Who I am" },
  work: { numeral: "II", title: "The work" },
  mind: { numeral: "III", title: "How I think" },
  creds: { numeral: "IV", title: "Credentials and contact" },
};

export const views: Record<View, { label: string; blurb: string; order: string[] }> = {
  all: {
    label: "Everyone",
    blurb: "The full story",
    order: [
      "part:who", "about", "numbers", "thread", "journey",
      "part:work", "experience", "projects", "decisions", "systems", "models-to-systems",
      "part:mind", "data-science", "ask", "interests", "notes",
      "part:creds", "words", "education", "skills", "contact",
    ],
  },
  recruiter: {
    label: "Recruiter",
    blurb: "Work, projects and stack first",
    order: ["numbers", "experience", "projects", "decisions", "systems", "skills", "words", "education", "contact"],
  },
  academic: {
    label: "Academic",
    blurb: "Research direction, writing and grades first",
    order: ["education", "thread", "interests", "data-science", "ask", "notes", "journey", "projects", "words", "contact"],
  },
};

/** The section ids inside a part, for the part divider's mini table of contents. */
export const partSections = (order: string[], part: string) => {
  const i = order.indexOf(`part:${part}`);
  const out: string[] = [];
  for (let j = i + 1; j < order.length && !order[j].startsWith("part:"); j++) out.push(order[j]);
  return out;
};
