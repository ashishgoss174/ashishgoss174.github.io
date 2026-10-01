import type { Hue } from "@/lib/types";

/**
 * "How I work with data", shown as notebook cells. Each step names where it actually happened.
 * `code` is decorative pseudo-code; `out` is the real evidence. Links use project/role ids.
 */
export const workflow: { step: string; code: string; out: string; refs: { id: string; label: string }[]; hue: Hue; growing?: boolean }[] = [
  {
    step: "Frame the question",
    code: "problem = frame(business_context, hypotheses)",
    out: "Business understanding and hypothesis framing were the first task of the BCG X data science simulation, before any data was touched.",
    refs: [],
    hue: "grape",
  },
  {
    step: "Collect",
    code: "raw = concat([scrape(site) for site in sources])",
    out: "Scraped product data from multiple e-commerce sites at ADQVEST, and gathered retinal images from five different sources at Nocturne.",
    refs: [{ id: "adqvest", label: "ADQVEST" }, { id: "nocturne", label: "Nocturne" }],
    hue: "sun",
  },
  {
    step: "Clean and validate",
    code: "df = standardise(raw).pipe(validate, on_fail='repair_or_reject')",
    out: "Standardised ~2,000 images that differed in resolution, dimensions, annotation format and labelling; wrote a validation layer that repairs or rejects records before they reach MySQL.",
    refs: [{ id: "nocturne", label: "Nocturne" }, { id: "adqvest", label: "ADQVEST" }],
    hue: "rose",
  },
  {
    step: "Explore",
    code: "df.describe(); plot_distributions(df); find_anomalies(df)",
    out: "Exploratory analysis of clinical data at Nocturne to surface trends, patterns and anomalies; EDA again in the BCG X simulation.",
    refs: [{ id: "nocturne", label: "Nocturne" }],
    hue: "accent",
  },
  {
    step: "Model",
    code: "model = CNN(classes=8).fit(landmark_images)",
    out: "Feature engineering and modelling in the BCG X simulation; a Keras CNN over drawn hand landmarks for ASL recognition, where changing the input mattered more than changing the model.",
    refs: [{ id: "asl-to-speech", label: "ASL project" }],
    hue: "grape",
  },
  {
    step: "Evaluate",
    code: "assert retrieved_docs_are_relevant(query)  # necessary, not sufficient",
    out: "For CareCompanion I judged retrieval by reviewing whether returned documents were relevant to each question. That told me results looked right, not whether the pipeline beat a simpler one. So for the search engine on this site I ran that comparison properly, against two baselines on labelled questions. The results, including where the fancier model lost, are under Ask my portfolio below.",
    refs: [{ id: "carecompanion", label: "CareCompanion" }],
    hue: "mint",
    growing: true,
  },
  {
    step: "Communicate",
    code: "report(findings, audience='non-technical')",
    out: "Reported findings to Nocturne's research team and documented methods so non-technical colleagues could follow them; findings and recommendations closed the BCG X simulation.",
    refs: [{ id: "nocturne", label: "Nocturne" }],
    hue: "sun",
  },
];
