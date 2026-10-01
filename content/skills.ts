import type { SkillDomain } from "@/lib/types";

/**
 * Skills grouped by domain. `evidence` lists the ids of projects (content/projects.ts)
 * or roles (content/experience.ts) where the skill was used. Skills without evidence
 * are shown as "listed on CV". No proficiency percentages, on purpose.
 */
export const skillDomains: SkillDomain[] = [
  {
    title: "LLMs and generative AI",
    blurb: "Retrieval, grounding and LLM-backed applications.",
    hue: "grape",
    skills: [
      { name: "RAG pipeline design", evidence: ["carecompanion"] },
      { name: "Vector embeddings", evidence: ["carecompanion"] },
      { name: "FAISS", evidence: ["carecompanion"] },
      { name: "LangChain", evidence: ["carecompanion"] },
      { name: "Hugging Face", evidence: ["carecompanion", "talk-to-your-database"] },
      { name: "Mistral", evidence: ["carecompanion"] },
      { name: "Qwen", evidence: ["talk-to-your-database"] },
      { name: "Gemini", evidence: ["invoice-extractor"] },
      { name: "Text-to-SQL", evidence: ["talk-to-your-database"] },
      { name: "Multimodal LLMs", evidence: ["invoice-extractor"] },
      { name: "Grounding and source citation", evidence: ["carecompanion"] },
      { name: "Semantic chunking" },
      { name: "ColPali", evidence: ["futureverse"] },
    ],
  },
  {
    title: "Knowledge representation",
    blurb: "Modelling facts, their structure and how they change over time.",
    hue: "accent",
    skills: [
      { name: "RDF", evidence: ["futureverse"] },
      { name: "OWL ontologies", evidence: ["futureverse"] },
      { name: "SPARQL", evidence: ["futureverse"] },
      { name: "Ontology design", evidence: ["futureverse"] },
      { name: "Graph schema design", evidence: ["futureverse"] },
      { name: "Temporal validity modelling", evidence: ["futureverse"] },
      { name: "RDF triple stores" },
      { name: "Neo4j" },
      { name: "Cypher" },
    ],
  },
  {
    title: "AI systems",
    blurb: "The infrastructure that keeps AI workflows dependable.",
    hue: "mint",
    skills: [
      { name: "LLM orchestration", evidence: ["futureverse"] },
      { name: "Content hashing", evidence: ["futureverse"] },
      { name: "Resumable workflows", evidence: ["futureverse"] },
      { name: "Output safety checks", evidence: ["talk-to-your-database"] },
      { name: "Microservices architecture", evidence: ["futureverse"] },
      { name: "Event streaming (Kafka)", evidence: ["futureverse"] },
      { name: "REST APIs" },
    ],
  },
  {
    title: "Machine learning and vision",
    blurb: "Classical ML through deep learning and computer vision.",
    hue: "rose",
    skills: [
      { name: "Computer vision", evidence: ["asl-to-speech", "nocturne"] },
      { name: "Medical imaging", evidence: ["nocturne"] },
      { name: "CNNs", evidence: ["asl-to-speech"] },
      { name: "MediaPipe", evidence: ["asl-to-speech"] },
      { name: "OpenCV", evidence: ["nocturne", "asl-to-speech"] },
      { name: "TensorFlow / Keras", evidence: ["asl-to-speech"] },
      { name: "PyTorch" },
      { name: "Speech recognition", evidence: ["jarvis"] },
      { name: "Deep learning", evidence: ["asl-to-speech"] },
      { name: "NLP" },
    ],
  },
  {
    title: "Data science and analytics",
    blurb: "From a question and raw data to evidence someone can act on.",
    hue: "mint",
    skills: [
      { name: "Exploratory data analysis", evidence: ["nocturne"] },
      { name: "Data cleaning and preprocessing", evidence: ["nocturne", "adqvest"] },
      { name: "Dataset curation", evidence: ["nocturne"] },
      { name: "pandas", evidence: ["adqvest"] },
      { name: "Supervised learning", evidence: ["asl-to-speech"] },
      { name: "Unsupervised learning" },
      { name: "Predictive modelling" },
      { name: "Feature engineering" },
      { name: "Model evaluation" },
      { name: "Hypothesis framing" },
      { name: "Statistical analysis" },
      { name: "Data visualisation (Matplotlib, Seaborn)" },
      { name: "scikit-learn" },
      { name: "NumPy" },
      { name: "R (coursework level)" },
    ],
  },
  {
    title: "Data engineering and databases",
    blurb: "Getting data in, cleaned, trustworthy and stored.",
    hue: "sun",
    skills: [
      { name: "ETL design", evidence: ["adqvest"] },
      { name: "Web scraping", evidence: ["adqvest"] },
      { name: "Schema validation", evidence: ["adqvest", "futureverse"] },
      { name: "PostgreSQL", evidence: ["futureverse", "talk-to-your-database"] },
      { name: "MySQL", evidence: ["adqvest"] },
      { name: "Supabase", evidence: ["talk-to-your-database"] },
      { name: "MongoDB", evidence: ["futureverse"] },
      { name: "Redis", evidence: ["futureverse"] },
      { name: "Hadoop" },
      { name: "Mistral OCR", evidence: ["futureverse"] },
      { name: "Regex parsing", evidence: ["futureverse"] },
      { name: "PaddleOCR" },
      { name: "PyMuPDF" },
    ],
  },
  {
    title: "Languages and tools",
    blurb: "Day-to-day development.",
    hue: "accent",
    skills: [
      { name: "Python", evidence: ["futureverse", "celebal", "adqvest", "nocturne"] },
      { name: "SQL", evidence: ["talk-to-your-database", "adqvest"] },
      { name: "Streamlit", evidence: ["carecompanion", "talk-to-your-database", "invoice-extractor"] },
      { name: "Git" },
      { name: "Jupyter" },
      { name: "VS Code" },
      { name: "Linux" },
      { name: "C and Java (coursework level)" },
    ],
  },
];

/**
 * The compact tech stack: domains above grouped into five buckets, showing only skills used in real work.
 * `from` lists domain titles, in display order.
 */
export const stackGroups: { title: string; hue: SkillDomain["hue"]; from: string[] }[] = [
  { title: "AI & LLM", hue: "grape", from: ["LLMs and generative AI"] },
  { title: "Knowledge representation", hue: "accent", from: ["Knowledge representation"] },
  { title: "ML & vision", hue: "rose", from: ["Machine learning and vision"] },
  { title: "Data science", hue: "mint", from: ["Data science and analytics"] },
  { title: "Data & infrastructure", hue: "sun", from: ["Languages and tools", "Data engineering and databases", "AI systems"] },
];