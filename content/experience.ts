import type { Role } from "@/lib/types";
import { knowledgeGraphFlow, orchestrationFlow } from "./flows";

/** Roles, most recent first. */
export const experience: Role[] = [
  {
    id: "futureverse",
    company: "FutureVerse",
    role: "AI Engineer Intern",
    period: "Jun 2026 – Present",
    location: "New Delhi, India",
    mode: "Onsite",
    sector: "EdTech / Applied AI",
    summary:
      "Building the orchestration layer, the document pipeline and the knowledge graph behind an adaptive learning platform for UPSC exam preparation.",
    highlights: [
      {
        title: "Resumable, reproducible LLM workflows", verb: "Designed",
        body: "FV Orchestration runs FutureVerse's AI pipelines as composable, resumable skills in a shared workspace. I designed its content-hash version identification: an identifier is derived from the content itself, so altered content can't keep it. Long-running LLM workflows restart from the last valid state instead of re-running expensive model calls, and every run is reproducible and auditable.",
      },
      {
        title: "Temporal knowledge graph for adaptive learning", verb: "Built",
        body: "I built the RDF knowledge graph that powers the adaptive learning engine. An ontology registry constrains which node and edge types are allowed, PostgreSQL backs the storage, and validity periods let the system reconstruct what a student knew at any past point. A wrong answer resolves to the specific concept at fault rather than to a whole chapter.",
      },
      {
        title: "Exam PDFs to structured JSON", verb: "Built",
        body: "I built a PDF-to-JSON extraction pipeline that uses Mistral OCR with rule-based regex parsing to turn unstructured exam documents into clean, structured data, the graph-ready content the knowledge graph is built from.",
      },
      {
        title: "Vision-based document retrieval", verb: "Explored",
        body: "I explored ColPali for vision-based document retrieval within the platform's document-intelligence stack.",
      },
      {
        title: "Event streaming architecture", verb: "Designed",
        body: "I designed an architecture strategy for integrating Kafka into a microservices-based API gateway, coordinating data flow across MongoDB, PostgreSQL and Redis.",
      },
    ],
    hue: "accent",
    stack: ["Python", "PostgreSQL", "RDF/OWL", "SPARQL", "Ontology design", "Content hashing", "LLM orchestration", "Mistral OCR", "ColPali", "Kafka", "MongoDB", "Redis"],
    flows: [
      { title: "Workflow versioning in FV Orchestration", steps: orchestrationFlow },
      { title: "Knowledge graph learning engine", steps: knowledgeGraphFlow },
    ],
  },
  {
    id: "celebal",
    company: "Celebal Technologies",
    role: "Data Science Intern (CSI)",
    period: "Jun 2025 – Aug 2025",
    location: "Noida, India",
    mode: "Remote",
    sector: "IT services",
    summary: "Built CareCompanion, a retrieval-augmented medical assistant, as the capstone of the Celebal Summer Internship 2025 (data science track), a mentor-evaluated programme.",
    highlights: [
      {
        title: "End-to-end RAG pipeline", verb: "Built",
        body: "Engineered the full LangChain pipeline: all-MiniLM-L6-v2 embeddings, a FAISS store over about 200 clinical documents, and retrieved context passed to Mistral-7B-Instruct-v0.3 for grounded, source-cited answers. Deployed on Streamlit.",
      },
    ],
    stack: ["Python", "LangChain", "Hugging Face", "FAISS", "sentence-transformers", "Mistral-7B-Instruct", "Streamlit"],
    project: "carecompanion",
    hue: "mint",
  },
  {
    id: "adqvest",
    company: "ADQVEST Capital",
    role: "Data Analyst Intern",
    period: "Jan 2025 – Mar 2025",
    location: "Chennai, India",
    mode: "Remote",
    sector: "Financial services",
    summary: "On Thurro, an ADQVEST Capital product, replaced a manual data collection process with an automated ETL pipeline and a validation layer in front of the database.",
    highlights: [
      {
        title: "Scraping and ETL pipeline", verb: "Built",
        body: "Built a Python ETL pipeline that scrapes product data from multiple e-commerce sites into MySQL, replacing a manual collection process.",
      },
      {
        title: "Pre-ingestion validation", verb: "Built",
        body: "Wrote the validation layer that reconciles inconsistent field formats across sources, repairs records that can be recovered and rejects the rest before they reach the database.",
      },
    ],
    stack: ["Python", "pandas", "Web scraping", "MySQL", "Schema validation", "ETL design"],
    hue: "sun",
  },
  {
    id: "nocturne",
    company: "Nocturne GmbH",
    role: "Data Scientist Intern",
    period: "Jul 2024 – Sep 2024",
    location: "Berlin, Germany",
    mode: "Remote",
    sector: "Health technology",
    summary: "Worked on AI-driven clinical decision support for detecting neurological disease from retinal imaging.",
    highlights: [
      {
        title: "Literature and approach review", verb: "Researched",
        body: "Researched AI-driven clinical decision support for neurological disease detection from retinal imaging, surveying model approaches and reporting findings to the research team.",
      },
      {
        title: "Medical imaging dataset curation", verb: "Curated",
        body: "Curated and standardised roughly 2,000 patient retinal images from five sources that differed in resolution, dimensions, annotation format and labelling, producing the single consistent dataset the modelling work then ran on.",
      },
      {
        title: "Exploratory analysis and reporting", verb: "Analysed",
        body: "Ran exploratory data analysis on the clinical data to surface trends, patterns and anomalies for the decision-support work, handled sensitive patient data under the company's privacy rules, and documented methods and findings so non-technical colleagues could follow them.",
      },
    ],
    stack: ["Python", "OpenCV", "EDA", "Medical imaging formats", "Dataset curation", "Image standardisation"],
    hue: "rose",
  },
];
