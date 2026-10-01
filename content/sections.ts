/**
 * The page's structure: four parts, each a list of section ids in display order.
 * Section numbers ("03 · …") and the alternating backgrounds are derived from this list,
 * so reordering here reorders the labels too. Keep it in sync with app/page.tsx.
 */
export const parts = [
  { id: "who", numeral: "I", title: "Who I am", sections: ["about", "numbers"] },
  { id: "story", numeral: "II", title: "The story", sections: ["journey", "experience", "words"] },
  { id: "work", numeral: "III", title: "The work", sections: ["projects", "systems", "data-science", "ask", "models-to-systems"] },
  { id: "toolkit", numeral: "IV", title: "Toolkit and what's next", sections: ["skills", "education", "interests", "notes", "contact"] },
] as const;

const order: string[] = parts.flatMap((p) => [...p.sections]);

/** 1-based position of a section on the page, e.g. "03". */
export const sectionNumber = (id: string) => {
  const i = order.indexOf(id);
  return i < 0 ? "" : String(i + 1).padStart(2, "0");
};

/** Alternate sections get a tinted background, counted within each part so every part starts plain. */
export const isTinted = (id: string) => {
  const part = parts.find((p) => (p.sections as readonly string[]).includes(id));
  return part ? (part.sections as readonly string[]).indexOf(id) % 2 === 1 : false;
};
