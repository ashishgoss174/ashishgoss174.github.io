import type { FlowStep } from "@/lib/types";

export const ragFlow: FlowStep[] = [
  { label: "Clinical documents", kind: "input", detail: "About 200 clinical documents make up everything the assistant is allowed to draw on." },
  { label: "Processing and chunking", kind: "process", detail: "Documents are split into passages small enough to search and to fit in a model's context." },
  { label: "all-MiniLM-L6-v2 embeddings", kind: "model", detail: "A sentence-transformer turns each passage into a vector, so passages with similar meaning end up close together." },
  { label: "FAISS vector store", kind: "store", detail: "The vectors are indexed in FAISS for fast similarity search." },
  { label: "Retriever", kind: "retrieval", detail: "A question is embedded the same way, and the closest passages are pulled from the index." },
  { label: "Mistral-7B-Instruct-v0.3", kind: "model", detail: "The retrieved passages are passed to the language model as the context for its answer." },
  { label: "Grounded, cited answer", kind: "output", detail: "The answer is based on the retrieved passages and cites the documents it used, shown in a Streamlit interface." },
];

export const sqlFlow: FlowStep[] = [
  { label: "Plain-English question", kind: "input", detail: "The user asks a question the way they would ask a colleague who knows the database." },
  { label: "Qwen2.5-7B-Instruct", kind: "model", detail: "Called through the Hugging Face Inference API, the model writes a PostgreSQL query for the question." },
  { label: "SQL with explanation", kind: "process", detail: "The query is shown alongside a plain-language explanation of what it does." },
  { label: "Review and edit", kind: "process", detail: "The user can read the query and edit it before running it." },
  { label: "is_safe() gate", kind: "guard", detail: "In front of execution, is_safe() permits only SELECT and blocks INSERT, UPDATE, DELETE and DROP, so a generated query can never change the database." },
  { label: "Supabase PostgreSQL", kind: "store", detail: "Queries that pass the gate run against Supabase Postgres through psycopg2." },
  { label: "Results and export", kind: "output", detail: "Results appear in the app and can be exported as CSV or PDF." },
];

export const invoiceFlow: FlowStep[] = [
  { label: "Invoice image or PDF", kind: "input", detail: "JPG, PNG and WebP invoices are read directly. A local variant converts PDFs to images with pdf2image and Poppler." },
  { label: "Question", kind: "input", detail: "The user asks about the invoice. The app answers across multiple languages." },
  { label: "Gemini 1.5 Flash (multimodal)", kind: "model", detail: "Image and question go to Gemini's multimodal API together. There is no OCR preprocessing step; the model reads the image itself." },
  { label: "Answer", kind: "output", detail: "The extracted details or answer are shown in a Streamlit app, deployed on Streamlit Cloud." },
];

export const aslFlow: FlowStep[] = [
  { label: "Camera", kind: "input", detail: "Frames from a live webcam feed." },
  { label: "MediaPipe hand tracking", kind: "model", detail: "MediaPipe finds the hand in each frame and returns 21 landmark points." },
  { label: "Landmarks on a white canvas", kind: "process", detail: "OpenCV draws the connected landmarks on a plain white image, so background and lighting no longer affect what the classifier sees." },
  { label: "Keras CNN classifier", kind: "model", detail: "A convolutional neural network sorts the drawing into one of eight groups of similar-looking signs." },
  { label: "Landmark rules", kind: "process", detail: "Within a group, calculations on the landmark positions separate letters such as A, E, M, N, S and T." },
  { label: "Word assembly", kind: "process", detail: "Recognised characters are joined into words." },
  { label: "Text-to-speech", kind: "output", detail: "pyttsx3 speaks the words aloud, giving a continuous signing-to-speech loop." },
];

export const jarvisFlow: FlowStep[] = [
  { label: "Voice command", kind: "input", detail: "The user speaks to the assistant." },
  { label: "Speech recognition", kind: "model", detail: "Speech is converted to text." },
  { label: "Intent handling", kind: "process", detail: "The assistant works out what the user is asking for." },
  { label: "Desktop task", kind: "process", detail: "It carries out the requested desktop task." },
  { label: "Spoken reply", kind: "output", detail: "Text-to-speech closes the conversational loop." },
];

export const orchestrationFlow: FlowStep[] = [
  { label: "LLM pipeline", kind: "input", detail: "FV Orchestration runs FutureVerse's AI pipelines as composable, resumable skills that share a workspace." },
  { label: "Content hash", kind: "process", detail: "Each piece of content gets an identifier computed from the content itself." },
  { label: "Identity check", kind: "guard", detail: "If the content changes, so does its identifier. Altered content can't keep an identifier it no longer matches." },
  { label: "Resume from last valid state", kind: "process", detail: "A long-running workflow can restart from its last valid state instead of repeating expensive model calls." },
  { label: "Reproducible, auditable run", kind: "output", detail: "Because identifiers are tied to content, every run can be reproduced and audited." },
];

export const knowledgeGraphFlow: FlowStep[] = [
  { label: "Exam-preparation material", kind: "input", detail: "Exam PDFs go through Mistral OCR and rule-based regex parsing, and come out as clean, structured JSON ready for the graph." },
  { label: "Ontology registry", kind: "guard", detail: "Defines which node and edge types are permitted, so the graph keeps a consistent shape." },
  { label: "RDF knowledge graph", kind: "store", detail: "Concepts and their relationships are stored as RDF, with PostgreSQL as the storage layer." },
  { label: "Validity periods", kind: "process", detail: "Facts carry the period in which they held, so history is kept rather than overwritten." },
  { label: "Point-in-time query", kind: "retrieval", detail: "The engine can reconstruct what a student knew at any past point." },
  { label: "Concept-level diagnosis", kind: "output", detail: "A wrong answer resolves to the specific concept at fault rather than to a whole chapter." },
];

export const evalFlow: FlowStep[] = [
  { label: "Site content as passages", kind: "input", detail: "Every role, project, chapter, note and skill group on this site becomes a passage to search." },
  { label: "20 labelled questions", kind: "input", detail: "Questions a visitor might ask, each labelled with the sections that genuinely answer it." },
  { label: "Three rankers", kind: "retrieval", detail: "Keyword overlap (the baseline), BM25, and BM25 with stemming and synonyms (what the live search uses)." },
  { label: "Hit@1, Hit@3, MRR", kind: "process", detail: "Is the top result relevant? Is one in the top three? And the mean of 1 / rank of the first relevant result." },
  { label: "Comparison and error analysis", kind: "output", detail: "Results side by side, plus the individual questions each ranker got wrong and why." },
];

export const kindLabel: Record<FlowStep["kind"], string> = {
  input: "input",
  process: "processing",
  model: "model",
  retrieval: "retrieval",
  store: "storage",
  guard: "constraint",
  output: "output",
};
