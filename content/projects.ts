import type { Project } from "@/lib/types";
import { aslFlow, invoiceFlow, jarvisFlow, ragFlow, sqlFlow } from "./flows";

/**
 * Projects, in display order. The first two (featured: true) get the large cards.
 * Links come from the resume. To add one later, append { label, href } to `links`.
 */
export const projects: Project[] = [
  {
    id: "talk-to-your-database",
    name: "Talk-to-Your-Database",
    category: "LLM application / Text-to-SQL",
    context: "Personal project",
    featured: true,
    problem: "Getting answers out of a relational database normally means writing SQL.",
    solution:
      "Ask in plain English. An LLM writes the PostgreSQL query and explains it, and a safety layer in code makes sure the query can only read data.",
    stack: ["Python", "Qwen2.5-7B-Instruct", "Hugging Face Inference API", "PostgreSQL", "Supabase", "psycopg2", "Streamlit"],
    flow: sqlFlow,
    decisions: [
      "Safety is enforced in code rather than left to the prompt. An is_safe() check in front of execution permits only SELECT and blocks INSERT, UPDATE, DELETE and DROP, so a generated query can never mutate the database.",
      "The generated query is shown, editable, with a plain-language explanation, so the person asking can check it before it runs.",
      "The model is called through the Hugging Face Inference API, and the app connects to Supabase Postgres through psycopg2.",
      "Results can be exported as CSV or as a PDF (built with fpdf2) for use outside the app.",
    ],
    status: "Working Streamlit app. Source code on GitHub.",
    learned:
      "Model output has to be treated as untrusted input. The guarantee that the database can't be changed comes from the check that runs before execution, not from how the prompt is worded.",
    links: [{ label: "GitHub", href: "https://github.com/ashishgoss174/Talk-to-Your-Database-Text-to-SQL-" }],
    hue: "accent",
  },
  {
    id: "carecompanion",
    name: "CareCompanion",
    category: "Retrieval-augmented generation / Healthcare AI",
    context: "Capstone, Celebal Technologies internship",
    featured: true,
    problem: "A general-purpose LLM answers medical questions from memory, with no way to check where an answer came from.",
    solution:
      "A retrieval-augmented assistant that answers from about 200 clinical documents and cites the sources behind each answer.",
    stack: ["Python", "LangChain", "sentence-transformers", "all-MiniLM-L6-v2", "FAISS", "Mistral-7B-Instruct-v0.3", "Hugging Face", "pypdf", "Streamlit"],
    flow: ragFlow,
    decisions: [
      "Answers are generated from retrieved passages rather than the model's own recall, and each answer cites the documents it drew on.",
      "all-MiniLM-L6-v2, a compact sentence-transformer, produces the embeddings, with FAISS handling similarity search over the document set.",
      "Generation uses an open instruct model, Mistral-7B-Instruct-v0.3.",
      "The full pipeline is built in LangChain and deployed on Streamlit.",
    ],
    status: "Delivered as the capstone of a mentor-evaluated internship and deployed on Streamlit. Source code on GitHub.",
    learned:
      "Most of a RAG system's behaviour is decided before the model runs: how documents are split, how they're embedded and what gets retrieved. Citing sources makes each answer something a reader can verify.",
    note: "An internship capstone, not a clinical tool.",
    links: [{ label: "GitHub", href: "https://github.com/ashishgoss174/A.I-Medi-Bot-CareCompanion" }],
    hue: "mint",
  },
  {
    id: "invoice-extractor",
    name: "Multilingual Invoice Extractor",
    category: "Multimodal AI / Document intelligence",
    context: "Personal project",
    featured: false,
    problem: "Invoices arrive as images in different layouts and languages, and pulling details out of them is manual work.",
    solution:
      "Gemini 1.5 Flash reads the invoice image directly and answers questions about it across multiple languages, with no separate OCR step.",
    stack: ["Python", "Gemini 1.5 Flash", "Multimodal API", "Streamlit", "pdf2image", "Poppler"],
    flow: invoiceFlow,
    decisions: [
      "No OCR preprocessing. The multimodal model reads JPG, PNG and WebP images itself.",
      "A local variant converts PDFs to images with pdf2image and Poppler.",
      "Deployed on Streamlit Cloud.",
    ],
    status: "Live on Streamlit Cloud. Source code on GitHub.",
    learned:
      "A multimodal model can replace a whole preprocessing stage, which moves the work from building an OCR pipeline to asking the right questions of the image.",
    links: [
      { label: "Live demo", href: "https://ashish-gossain-invoice-extractor-llm.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/ashishgoss174/Invoice-Extractor-LLM" },
    ],
    hue: "sun",
  },
  {
    id: "asl-to-speech",
    name: "ASL to Text & Speech",
    category: "Computer vision / Deep learning",
    context: "B.Tech minor project",
    featured: false,
    problem: "People who sign and people who don't often have no direct way to talk to each other.",
    solution:
      "Real-time recognition of American Sign Language from a camera, turning recognised characters into words and speaking them aloud.",
    stack: ["Python", "MediaPipe", "OpenCV", "TensorFlow / Keras", "CNN", "pyttsx3"],
    flow: aslFlow,
    decisions: [
      "Instead of classifying raw camera frames, the hand's 21 MediaPipe landmarks are drawn on a plain white background with OpenCV. The classifier then sees the same clean input whatever the background or lighting.",
      "Similar-looking letters are grouped into eight classes for the Keras CNN, trained on about 180 preprocessed images per letter, and then told apart with calculations on the landmark positions.",
      "Recognised characters are assembled into words and spoken with pyttsx3, so signing flows continuously into speech.",
    ],
    status: "B.Tech minor project. Source code on GitHub.",
    learned:
      "Changing what the model sees, a clean landmark drawing instead of a raw camera frame, dealt with background and lighting variation more directly than changing the model itself.",
    links: [{ label: "GitHub", href: "https://github.com/ashishgoss174/Sign-Language-To-Text-and-Speech-Conversion-master" }],
    hue: "rose",
  },
  {
    id: "jarvis",
    name: "JARVIS",
    category: "Speech / Conversational AI",
    context: "B.Tech major project (12 credits)",
    featured: false,
    problem: "Routine desktop tasks take steps that a spoken command could replace.",
    solution:
      "A desktop voice assistant that brings speech recognition, intent handling and text-to-speech together in one conversational loop.",
    stack: ["Python", "Speech recognition", "Text-to-speech"],
    flow: jarvisFlow,
    decisions: ["Speech recognition, intent handling and text-to-speech run as a single conversational loop for desktop task automation."],
    status: "B.Tech major project. No public repository yet.",
    learned: "Joining several speech components into one loop means each stage's output has to be reliable enough for the next to act on.",
    links: [],
    hue: "grape",
    compact: true,
  },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);
