/** Copy for About, From Models to Systems, Interests and Journey. */
import type { Chapter } from "@/lib/types";

export const about = {
  paragraphs: [
    "I studied Computer Science with a specialisation in Data Science and AI at SRM University, Delhi-NCR, and since 2024 I have built AI systems across four internships, with teams in India and Germany.",
    "My early work was about data: standardising a retinal imaging dataset for a health-technology team in Berlin, then automating a scraping and validation pipeline for a financial services firm. From there I moved to language models, building a retrieval-augmented assistant over clinical documents. At FutureVerse I now work on the infrastructure side: versioning for long-running LLM workflows, and a temporal knowledge graph behind an adaptive learning platform.",
    "The thread running through it is what makes an AI system dependable: grounding answers in sources, constraining what a model is allowed to do, and keeping a record of what a system knew and when.",
  ],
};

/**
 * The research-oriented thread through the work. The question is from your statement of purpose.
 * Each stop names what that experience taught about reliability, and links to the evidence.
 */
export const thread = {
  question: "How can we build data and AI systems that work reliably in the conditions in which people actually use them?",
  stops: [
    { where: "Nocturne GmbH", theme: "Data quality", line: "Five inconsistent image sources had to agree before any model could learn from them.", href: "#exp-nocturne", hue: "rose" as const },
    { where: "ADQVEST Capital", theme: "Validation", line: "Records are repaired or rejected before they reach the database, not after.", href: "#exp-adqvest", hue: "sun" as const },
    { where: "CareCompanion", theme: "Grounding", line: "Answers come from retrieved clinical documents and cite them.", href: "#project-carecompanion", hue: "mint" as const },
    { where: "Talk-to-Your-Database", theme: "Constrained generation", line: "A check in code, not the prompt, stops generated SQL from changing data.", href: "#project-talk-to-your-database", hue: "accent" as const },
    { where: "FutureVerse", theme: "Structured knowledge", line: "Concepts with validity periods, and runs that can be reproduced.", href: "#exp-futureverse", hue: "grape" as const },
  ],
  next: "What's missing is the ability to show when and why these systems work. That's what I want to study next.",
};

export const progression = [
  { stage: "Data science", evidence: "Coursework in predictive analysis, data mining and big data analytics" },
  { stage: "Machine learning", evidence: "ML, deep learning and NLP; a CNN-based sign-language recogniser" },
  { stage: "Computer vision and medical AI", evidence: "Retinal imaging dataset, Nocturne GmbH, 2024" },
  { stage: "Data engineering", evidence: "Scraping, ETL and validation pipeline, ADQVEST Capital, 2025" },
  { stage: "LLMs and RAG", evidence: "CareCompanion at Celebal Technologies, 2025; Text-to-SQL and invoice apps" },
  { stage: "Knowledge graphs and AI systems", evidence: "Workflow versioning and an RDF knowledge graph, FutureVerse, 2026" },
];

export const systemLayers = [
  {
    layer: "Data",
    work: "Standardised about 2,000 retinal images from five inconsistent sources; wrote validation that repairs or rejects records before they reach MySQL; turned exam PDFs into structured JSON with Mistral OCR.",
    refs: [{ id: "nocturne", label: "Nocturne" }, { id: "adqvest", label: "ADQVEST" }, { id: "futureverse", label: "FutureVerse" }],
  },
  {
    layer: "Models",
    work: "A Keras CNN over drawn hand landmarks; open instruct models (Mistral-7B, Qwen2.5-7B); Gemini's multimodal API.",
    refs: [{ id: "asl-to-speech", label: "ASL" }, { id: "carecompanion", label: "CareCompanion" }, { id: "invoice-extractor", label: "Invoice Extractor" }],
  },
  {
    layer: "Retrieval",
    work: "MiniLM embeddings and a FAISS index over about 200 clinical documents.",
    refs: [{ id: "carecompanion", label: "CareCompanion" }],
  },
  {
    layer: "Knowledge",
    work: "An RDF knowledge graph with an ontology registry and validity periods for point-in-time queries.",
    refs: [{ id: "futureverse", label: "FutureVerse" }],
  },
  {
    layer: "Infrastructure",
    work: "Content-hash version identification so LLM workflows resume from their last valid state; a Kafka integration strategy for a microservices API gateway.",
    refs: [{ id: "futureverse", label: "FutureVerse" }],
  },
  {
    layer: "Reliability and safety",
    work: "A SELECT-only gate in front of generated SQL, source-cited answers, and runs that can be reproduced and audited.",
    refs: [{ id: "talk-to-your-database", label: "Text-to-SQL" }, { id: "carecompanion", label: "CareCompanion" }, { id: "futureverse", label: "FutureVerse" }],
  },
  {
    layer: "Applications",
    work: "Streamlit apps for RAG, Text-to-SQL and invoice Q&A; a real-time signing-to-speech loop.",
    refs: [{ id: "talk-to-your-database", label: "Text-to-SQL" }, { id: "invoice-extractor", label: "Invoice Extractor" }, { id: "asl-to-speech", label: "ASL" }],
  },
];

export const interests = {
  explored: [
    { area: "Retrieval-augmented generation", where: "CareCompanion" },
    { area: "LLM applications and Text-to-SQL", where: "Talk-to-Your-Database" },
    { area: "Knowledge graphs and temporal modelling", where: "FutureVerse" },
    { area: "Medical imaging data", where: "Nocturne GmbH" },
    { area: "Computer vision", where: "ASL to Text & Speech" },
    { area: "Multimodal document understanding", where: "Invoice Extractor" },
    { area: "Data quality and validation", where: "ADQVEST Capital, Nocturne GmbH" },
  ],
  /** Experience → question → academic direction. `builds` is what the search engine reads. */
  further: [
    {
      area: "Evaluating AI systems",
      experience: "Judged CareCompanion's retrieval by reviewing relevance by hand; then measured this site's search against two baselines.",
      question: "How do you show that retrieval and generation are actually correct, and better than a simpler system, not just fluent?",
      direction: "Experimental design, statistical inference, model evaluation",
      builds: "CareCompanion and the retrieval evaluation on this site",
    },
    {
      area: "Reliable LLM systems",
      experience: "Content-hash versioning and resumable workflows in FV Orchestration.",
      question: "How can LLM pipelines stay reproducible and testable when inputs change and intermediate steps fail?",
      direction: "AI systems, reliability, evaluation",
      builds: "Workflow versioning at FutureVerse",
    },
    {
      area: "Knowledge-enhanced AI",
      experience: "A temporal RDF knowledge graph with an ontology registry and validity periods.",
      question: "How can structured knowledge make retrieval and reasoning more precise and explainable?",
      direction: "Knowledge representation, semantic systems, graph-based learning",
      builds: "The FutureVerse knowledge graph",
    },
    {
      area: "AI for healthcare",
      experience: "Retinal imaging data at Nocturne; source-cited answers over clinical documents in CareCompanion.",
      question: "How can AI support clinical decisions without asking clinicians to trust an answer they can't trace?",
      direction: "Medical information retrieval, clinical decision support",
      builds: "Nocturne and CareCompanion",
    },
    {
      area: "Data-centric AI",
      experience: "Standardising five inconsistent image sources; validation that repairs or rejects records before storage.",
      question: "How do dataset curation and validation shape what a model can learn?",
      direction: "Data quality, dataset design, probabilistic modelling",
      builds: "Nocturne dataset curation, ADQVEST validation",
    },
    {
      area: "Multimodal AI",
      experience: "Invoice Q&A with a multimodal model and no OCR step; landmark-based sign recognition.",
      question: "How do models that read images and text together change document and vision pipelines?",
      direction: "Multimodal learning, document understanding",
      builds: "Invoice Extractor, ASL recognition",
    },
  ],
};

/**
 * The story, chapter by chapter. Drawn from the resume and statement of purpose.
 * `takeaway` lines are in your voice: read them and adjust so they say what you took away.
 */
export const journey: Chapter[] = [
  {
    id: "origin",
    date: "Grade 11",
    title: "First line of code",
    place: "School",
    story: "I chose Computer Science in Grade 11 with little prior exposure to programming. I enjoyed breaking problems down, debugging them and working out how to make an idea run as code. By the end of Grade 12 I knew I wanted to study it at university.",
    takeaway: "Debugging was the part I liked, not the part I put up with.",
    unlocked: ["Programming basics", "Debugging"],
    hue: "grape",
  },
  {
    id: "btech",
    date: "Aug 2022",
    title: "Foundations",
    place: "SRM University, Delhi-NCR",
    story: "Started a B.Tech in Computer Science & Engineering at SRM University, specialising in Data Science and AI, and began volunteering with the NGO Unwind Connect and Cure the same month.",
    unlocked: ["Python", "SQL", "Machine learning", "Data mining"],
    link: { label: "Education", href: "#education" },
    hue: "grape",
  },
  {
    id: "design",
    date: "Feb 2023",
    title: "Designing for people",
    place: "VERGE, SRM University · Piyaau Beverages",
    story: "A year as a UI/UX designer with VERGE at SRM, then the UI/UX of Piyaau's app, delivered in a month in early 2024. Working on user-facing products made me think beyond whether a system works technically, towards how information is organised and how people interact with it.",
    takeaway: "A system that works isn't finished until people can use it.",
    unlocked: ["UI/UX design", "User research", "Iterating on feedback"],
    link: { label: "What Piyaau said", href: "#words" },
    hue: "rose",
  },
  {
    id: "nocturne",
    date: "Jul 2024",
    title: "Data meets medicine",
    place: "Nocturne GmbH, Berlin (remote)",
    story: "My first internship, with a health-technology startup working on AI to spot early signs of neurological disease in retinal scans. I curated the dataset: about 2,000 images from five sources that differed in resolution, dimensions, annotation format and labelling, reviewed and standardised into one.",
    takeaway: "Data disparity decides what a model can learn. And real patient scans made me take data handling seriously.",
    unlocked: ["OpenCV", "Medical imaging", "Dataset curation", "Data privacy"],
    link: { label: "The role", href: "#exp-nocturne" },
    hue: "rose",
  },
  {
    id: "adqvest",
    date: "Jan 2025",
    title: "Building pipelines",
    place: "ADQVEST Capital, Chennai (remote)",
    story: "On Thurro, an ADQVEST product, I replaced a manual data collection process with a Python pipeline that scrapes product data from multiple e-commerce sites into MySQL, with a validation layer that repairs or rejects records before they reach the database.",
    takeaway: "Validation belongs in front of the database, not after it.",
    unlocked: ["pandas", "Web scraping", "ETL design", "MySQL"],
    link: { label: "The role", href: "#exp-adqvest" },
    hue: "sun",
  },
  {
    id: "celebal",
    date: "Jun 2025",
    title: "Enter language models",
    place: "Celebal Technologies, Noida (remote)",
    story: "In the Celebal Summer Internship's data science track I built CareCompanion, a retrieval-augmented medical assistant that answers from about 200 clinical documents and cites its sources. The same move into LLMs shows in two personal builds: Talk-to-Your-Database (Text-to-SQL) and a multilingual invoice extractor.",
    takeaway: "Most of a RAG system's behaviour is decided before the model runs. I also found I wanted better ways to prove retrieval actually helps.",
    unlocked: ["LangChain", "FAISS", "Embeddings", "Mistral-7B", "Text-to-SQL", "Gemini"],
    link: { label: "CareCompanion", href: "#project-carecompanion" },
    hue: "mint",
  },
  {
    id: "degree",
    date: "May 2026",
    title: "Degree complete",
    place: "SRM University, Delhi-NCR",
    story: "Graduated with a CGPA of 8.37, averaging 9.03 over the final four semesters. Degree projects along the way: real-time ASL-to-speech recognition (minor project) and JARVIS, a desktop voice assistant (major project).",
    unlocked: ["CNNs", "MediaPipe", "Speech recognition"],
    link: { label: "ASL project", href: "#project-asl-to-speech" },
    hue: "grape",
  },
  {
    id: "futureverse",
    date: "Jun 2026 – now",
    title: "From models to systems",
    place: "FutureVerse, New Delhi",
    story: "AI Engineer Intern on the infrastructure behind an adaptive UPSC learning platform: content-hash versioning so LLM workflows resume from their last valid state, an OCR pipeline from exam PDFs to structured JSON, and a temporal RDF knowledge graph that traces a wrong answer to the one concept at fault.",
    takeaway: "What makes an AI system dependable is everything around the model.",
    unlocked: ["RDF/OWL", "SPARQL", "Mistral OCR", "Kafka", "LLM orchestration"],
    link: { label: "The role", href: "#exp-futureverse" },
    hue: "accent",
    now: true,
  },
];

/** Where the story goes next. */
export const nextChapter = {
  title: "Next: learning to prove it works",
  story: "Building systems showed me the limits of my training. I can build a retrieval pipeline, but I want stronger methods to show it beats a simpler one. So the next step is a master's with depth in statistical inference, experimental design, probabilistic modelling and model evaluation.",
  goals: [
    { when: "Short term", what: "Applied data scientist or AI engineer, building data-driven AI for healthcare." },
    { when: "Long term", what: "Medical information retrieval and clinical decision support systems." },
  ],
  /** The questions I want a master's to help me answer */
  questions: [
    { area: "Reliable LLM systems", q: "How can retrieval, evaluation and system constraints make LLM applications more reliable?" },
    { area: "Knowledge-enhanced AI", q: "How can structured knowledge improve retrieval, reasoning and explainability?" },
    { area: "Medical AI", q: "How can heterogeneous clinical data be turned into reliable inputs for AI systems?" },
    { area: "AI evaluation", q: "How can we tell genuinely useful retrieval and reasoning apart from fluent but unsupported output?" },
  ],
};
