/**
 * Personal details and links. Edit here; every section reads from this file.
 * To hide a link or button, set its value to an empty string "".
 */
export const site = {
  name: "Ashish Gossain",
  role: "AI Engineer & Data Scientist",
  location: "Delhi, India",
  statement:
    "Computer Science graduate specialising in Data Science & Artificial Intelligence. I take messy, real-world data from collection to clean datasets, models and dependable AI systems: LLMs, RAG, knowledge graphs, computer vision and data engineering.",
  email: "ashishgossain174@gmail.com",
  github: "https://github.com/ashishgoss174",
  linkedin: "https://www.linkedin.com/in/ashish-gossain-6ab647245/",
  /** Place the PDF at public/resume/Ashish_Gossain_Resume.pdf (already there), or change this path. */
  resume: "/resume/Ashish_Gossain_Resume.pdf",
  /** Profile photo in public/images. Set to "" to remove the photo from the About section. */
  photo: "/images/ashish-gossain.jpg",
};

/** The 30-second recruiter view: three headline achievements, most recent first. */
export const recruiter = {
  highlights: [
    { what: "Temporal RDF knowledge graph and content-hash versioning for resumable LLM workflows", where: "FutureVerse · now", href: "#exp-futureverse" },
    { what: "RAG assistant over ~200 clinical documents with source-cited answers", where: "Celebal Technologies · 2025", href: "#project-carecompanion" },
    { what: "Curated ~2,000 retinal images from five inconsistent sources into one dataset", where: "Nocturne GmbH, Berlin · 2024", href: "#exp-nocturne" },
  ],
};

/** Hero: the rotating "I build ..." phrases, the terminal, the chips and the stat row. */
export const hero = {
  /** The two-part status pill at the top of the hero */
  status: { now: "AI Engineer @ FutureVerse", open: "Open to AI/ML & data science roles" },
  rotating: ["RAG systems", "clean datasets", "Text-to-SQL apps", "knowledge graphs", "ML models", "OCR pipelines", "data pipelines"],
  /** Tech badges that orbit the hero portrait */
  orbit: ["Python", "pandas", "SQL", "LangChain", "FAISS", "RDF", "OpenCV", "Kafka"],
  terminal: [
    { cmd: "whoami", out: "ashish_gossain  // AI engineer, data scientist" },
    { cmd: "cat focus.txt", out: "LLMs · RAG · knowledge graphs · computer vision · data engineering" },
    { cmd: "df.shape  # the dataset I curated", out: "(~2000 retinal images, 5 sources → 1 consistent dataset)" },
    { cmd: "ls ~/experience ~/projects", out: "4 AI/data internships · 2 design roles · 5 projects" },
    { cmd: "status", out: "▸ building AI infrastructure at FutureVerse" },
  ],
  built: [
    { label: "RAG system", href: "#project-carecompanion" },
    { label: "Text-to-SQL app", href: "#project-talk-to-your-database" },
    { label: "Temporal knowledge graph", href: "#exp-futureverse" },
    { label: "LLM workflow versioning", href: "#exp-futureverse" },
    { label: "OCR document pipeline", href: "#exp-futureverse" },
    { label: "Multimodal document AI", href: "#project-invoice-extractor" },
    { label: "Real-time computer vision", href: "#project-asl-to-speech" },
    { label: "ETL and validation pipeline", href: "#exp-adqvest" },
  ],
  stats: [
    { value: 4, label: "AI & data internships", sub: "India and Germany" },
    { value: 5, label: "projects", sub: "RAG, SQL, vision, speech" },
    { value: 8.37, decimals: 2, label: "CGPA", sub: "9.03 over final four semesters" },
    { value: 2000, prefix: "~", label: "images curated", sub: "medical imaging dataset" },
  ],
};
