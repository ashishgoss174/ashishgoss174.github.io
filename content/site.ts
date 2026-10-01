/**
 * Personal details and links. Edit here; every section reads from this file.
 * To hide a link or button, set its value to an empty string "".
 */
export const site = {
  name: "Ashish Gossain",
  role: "AI Engineer & Data Scientist",
  location: "Delhi, India",
  /** The one-line thesis under the title; `highlight` gets the gradient */
  thesis: { lead: "I build AI systems where models meet", highlight: "data, retrieval and structured knowledge." },
  statement:
    "Computer Science graduate specialising in Data Science & AI, with four internships across medical imaging data, data engineering, retrieval-augmented generation and AI infrastructure. My focus: AI systems whose outputs are grounded, constrained and reproducible.",
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

/** Hero: status pill, focus areas, orbiting tech and the stat row. */
export const hero = {
  /** The two-part status pill at the top of the hero */
  status: { now: "AI Engineer @ FutureVerse", open: "Open to AI/ML & data science roles" },
  focus: ["LLMs", "Retrieval", "Knowledge representation", "AI systems", "Data science"],
  /** Tech badges that orbit the hero portrait; click one to filter the skills */
  orbit: ["Python", "pandas", "SQL", "LangChain", "FAISS", "RDF", "OpenCV", "Kafka"],
  stats: [
    { value: 4, label: "AI & data internships", sub: "India and Germany" },
    { value: 5, label: "projects", sub: "RAG, SQL, vision, speech" },
    { value: 8.37, decimals: 2, label: "CGPA", sub: "9.03 over final four semesters" },
    { value: 2000, prefix: "~", label: "images curated", sub: "medical imaging dataset" },
  ],
};
