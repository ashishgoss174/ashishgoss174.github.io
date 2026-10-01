/**
 * Technical notes, published at /notes/<slug>/.
 * Written in your voice from your SOP and CV. Read them and edit freely before publishing,
 * and check with your employer that the level of detail is fine to share.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; label: string; text: string };

export interface Note {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readMinutes: number;
  tags: string[];
  /** id of the role or project it belongs to (see lib/evidence.ts); "" if neither */
  about: string;
  /** optional link shown at the end, for notes not tied to a role or project */
  link?: { label: string; href: string };
  /** false keeps the note out of the "Ask" search index (used by the note about evaluating that search) */
  searchable?: boolean;
  body: Block[];
}

export const notes: Note[] = [
  {
    slug: "temporal-knowledge-graph",
    title: "What a wrong answer really means",
    summary: "Notes on building a temporal knowledge graph for adaptive learning: why concepts beat chapters, why the graph needs rules, and why it has to remember what a student knew and when.",
    date: "2026-10-01",
    readMinutes: 5,
    tags: ["Knowledge graphs", "RDF", "Temporal modelling", "EdTech"],
    about: "futureverse",
    body: [
      { type: "p", text: "At FutureVerse I work on the platform behind adaptive preparation for India's UPSC exams. This note is about one part of it, the knowledge graph, and the design idea that interested me most. I've kept it at the level of ideas; internal details stay internal." },

      { type: "h2", text: "The problem with “weak in chapter 7”" },
      { type: "p", text: "The easy way to react to a wrong answer is to mark the whole chapter as weak and send the student back to reread it. But an incorrect answer doesn't necessarily mean the entire chapter was misunderstood. Often the difficulty lies in one concept, and if the system can't tell which one, it spends the student's time on everything they already know." },

      { type: "h2", text: "Represent concepts, not chapters" },
      { type: "p", text: "So the graph models individual knowledge units and the relationships between them, in RDF. Questions connect to the concepts they test, which means a wrong answer can resolve to the specific concept at fault rather than to a whole chapter. That's the whole point of the graph: structure that lets the system say what needs attention." },

      { type: "h2", text: "Give the graph rules: an ontology registry" },
      { type: "p", text: "A graph that anything can be written into drifts. An ontology registry defines which node and edge types are permitted, so content that arrives through an automated pipeline still lands in a consistent shape. PostgreSQL is the storage layer underneath." },

      { type: "h2", text: "Add time: validity periods" },
      { type: "p", text: "This is the part I found most interesting. Facts carry the period in which they held. Instead of overwriting a student's state when it changes, the graph keeps the history, so the system can reconstruct what a student knew at any past point, not only what they know now." },
      { type: "callout", label: "Illustrative example, not real data", text: "Say a student's grasp of a concept changes on 1 April. A query “as of 15 March” returns the earlier state; a query “as of today” returns the new one. Both answers are correct. They're about different moments." },
      { type: "p", text: "That matters because learning is a story over time. With history kept, you can ask whether a concept was understood and later forgotten, or trace when a misunderstanding started." },

      { type: "h2", text: "Garbage in, graph out" },
      { type: "p", text: "The graph is only as good as what goes into it. Exam PDFs go through Mistral OCR and rule-based regex parsing and come out as clean, structured JSON, which is checked against the schema before anything reaches the graph. Most of the effort in a system like this sits in that unglamorous path." },

      { type: "h2", text: "Making long pipelines trustworthy" },
      { type: "p", text: "The AI pipelines around the graph run on FV Orchestration as composable, resumable skills. I proposed content-hash version identification: an identifier derived from the content itself, so altered content can't keep an identifier it no longer matches. A long-running workflow can resume from its last valid state instead of repeating expensive model calls, and every run can be reproduced and audited." },

      { type: "h2", text: "What I don't know yet" },
      { type: "p", text: "I can define the relationships and identify the concepts associated with incorrect answers. What I haven't done is design an experiment that shows this approach improves learning outcomes compared with chapter-level feedback. That's the gap I want to close next: experimental design, statistical inference and proper evaluation. Building a system that works is one skill; showing when and why it works is another." },
      { type: "p", text: "If you're working on similar problems, I'd like to hear from you." },
    ],
  },
  {
    slug: "text-to-sql-safety",
    title: "Can you trust a Text-to-SQL model?",
    summary: "Letting a language model write database queries is easy. Deciding how much to trust what it writes is the real engineering problem. Why the safety check lives in code, not in the prompt.",
    date: "2026-10-02",
    readMinutes: 4,
    tags: ["LLM safety", "Text-to-SQL", "Databases"],
    about: "talk-to-your-database",
    body: [
      { type: "p", text: "Talk-to-Your-Database lets someone ask a question in plain English and get an answer from a PostgreSQL database. A language model, Qwen2.5-7B-Instruct called through the Hugging Face Inference API, writes the SQL. Getting a model to write SQL turned out to be the easy part. The harder question was how much to trust what it writes." },

      { type: "h2", text: "Treat model output as untrusted input" },
      { type: "p", text: "A generated query is text produced by a model that can misread the question, misremember the schema, or be steered by an unusually worded request. If that text runs against a real database, one bad generation could change or delete data. So I treated it the way you'd treat anything a user types: as input to check before acting on." },

      { type: "h2", text: "Prompt rules versus code rules" },
      { type: "p", text: "The obvious first defence is the prompt: tell the model to write only SELECT statements. That helps most of the time, but it's a request, not a guarantee. A prompt shapes what the model is likely to produce. It can't prevent anything." },
      { type: "p", text: "The guarantee has to live in code that runs after generation and before execution. In the app, an is_safe() check sits in front of every query. It permits only SELECT and blocks INSERT, UPDATE, DELETE and DROP. If the check fails, the query never reaches the database, whatever the model wrote." },
      { type: "callout", label: "The principle", text: "Use the prompt to make good output likely. Use code to make bad output impossible." },

      { type: "h2", text: "Keep a person in the loop" },
      { type: "p", text: "The app doesn't run queries silently. It shows the generated SQL, editable, next to a plain-language explanation of what it does. The person asking can read it, correct it, and only then run it. That turns the model from an oracle into a draft writer. Results can then be exported as CSV or PDF." },

      { type: "h2", text: "What a statement check doesn't cover" },
      { type: "p", text: "Blocking statement types is a strong first layer, not a complete one. It doesn't stop a valid SELECT that is simply wrong, or one that is very expensive to run. If I took the project further, I'd add defences that don't depend on reading the query at all:" },
      { type: "list", items: [
        "connect through a database role that only has read permission, so even a query that slipped past the check couldn't write;",
        "set a statement timeout, so a runaway query can't tie up the database;",
        "test the checker against a collection of deliberately tricky queries, the way you'd test any security boundary.",
      ] },

      { type: "h2", text: "The takeaway" },
      { type: "p", text: "The guarantee that the database can't be changed comes from the check that runs before execution, not from how the prompt is worded. The same idea shows up in my later work: at FutureVerse, long LLM workflows are reproducible because identifiers are derived from the content in code, not because the model is asked nicely." },
    ],
  },
  {
    slug: "rag-before-the-model",
    title: "Most of a RAG system is decided before the model runs",
    summary: "Lessons from CareCompanion, a retrieval-augmented medical assistant: why splitting, embedding and retrieval shape the answer more than the language model does, and what I couldn't measure.",
    date: "2026-10-02",
    readMinutes: 4,
    tags: ["RAG", "Retrieval", "Healthcare AI"],
    about: "carecompanion",
    body: [
      { type: "p", text: "CareCompanion was the capstone of my data science internship at Celebal Technologies: an assistant that answers medical questions from about 200 documents drawn from medical literature, and cites the documents behind each answer. It's an internship project, not a clinical tool. But building it changed where I think the important decisions in a RAG system are made." },

      { type: "h2", text: "Answering from memory versus answering from sources" },
      { type: "p", text: "Ask a general-purpose language model a medical question and it answers from whatever it absorbed in training, with no way to check where the answer came from. Retrieval-augmented generation changes the question the model is answering. Instead of “what do you know?”, it becomes “what do these passages say?”" },

      { type: "h2", text: "The pipeline" },
      { type: "p", text: "Documents are read with pypdf and split into passages small enough to search and to fit in the model's context. Each passage is embedded with all-MiniLM-L6-v2, a compact sentence-transformer, and indexed in FAISS. A question is embedded the same way, the closest passages are retrieved, and Mistral-7B-Instruct-v0.3 writes an answer from them and cites them. LangChain connects the steps; Streamlit is the interface." },

      { type: "h2", text: "Where the behaviour actually comes from" },
      { type: "p", text: "The language model is the most visible part, but it runs last. By then, three earlier choices have already decided most of what it can say:" },
      { type: "list", items: [
        "How documents are split. A passage that cuts an explanation in half can't be retrieved as a whole idea.",
        "How passages are embedded. The embedding model decides which passages count as “close” to a question. MiniLM is small and fast; whether it captures medical meaning well enough is exactly what retrieval quality reveals.",
        "What gets retrieved. If the right passage isn't among the top results, nothing downstream can cite it.",
      ] },
      { type: "callout", label: "The takeaway", text: "A stronger language model can phrase an answer from the wrong passages more fluently. It can't make it correct. Fix what goes in before upgrading what comes out." },

      { type: "h2", text: "Citations make answers checkable" },
      { type: "p", text: "Every answer cites the documents it drew on. That doesn't make an answer right, but it makes it verifiable: a reader can open the source and check. For a medical assistant, an answer you can trace is worth more than a fluent one you can't." },

      { type: "h2", text: "What I measured, and what I couldn't" },
      { type: "p", text: "I judged retrieval by reviewing whether the documents returned for a question were relevant to it. That told me whether results looked relevant. It didn't tell me whether this pipeline was better than a simpler one, such as plain keyword search. Answering that needs labelled questions, a baseline and proper metrics, which is why I later ran exactly that comparison on the search engine on this site, and why evaluation is the first thing I want to study in more depth." },
    ],
  },
  {
    slug: "evaluating-my-search-engine",
    title: "I evaluated my own search engine. The simple baseline won.",
    summary: "The “Ask about my work” search on this site uses BM25 with stemming and synonyms. I compared it against two simpler rankers on labelled questions. Here's what the numbers said, and why I didn't tune them away.",
    date: "2026-10-02",
    readMinutes: 5,
    tags: ["Evaluation", "Information retrieval", "Data science"],
    about: "retrieval-evaluation",
    link: { label: "See the live results table", href: "/#ask" },
    searchable: false,
    body: [
      { type: "p", text: "This site has a small search engine. You type a question, it ranks every passage on the site with BM25, quotes the best-matching sentence and cites where it came from. While building it I added stemming (so “databases” matches “database”) and a short synonym list (so “ML” matches “machine learning”). Both felt like obvious improvements. I hadn't checked whether they were, and that's the same gap I noticed in CareCompanion, where I could tell results looked relevant but not whether the pipeline beat a simpler one. So I checked." },

      { type: "h2", text: "The setup" },
      { type: "p", text: "I wrote 20 questions a visitor might ask and, before running anything, labelled each with the sections of the site that genuinely answer it. A retrieved passage counts as relevant if it comes from one of those sections. Then I compared three rankers:" },
      { type: "list", items: [
        "Keyword overlap: count the words a passage shares with the question. The baseline.",
        "BM25: weight shared words by how rare they are, and normalise for passage length.",
        "BM25 with stemming and synonyms: what the live search uses.",
      ] },
      { type: "p", text: "And three standard metrics: Hit@1 (is the top result relevant?), Hit@3 (is a relevant result in the top three?) and MRR, the mean of 1 / rank of the first relevant result." },

      { type: "h2", text: "The results" },
      { type: "p", text: "At the time of writing (2 October 2026):" },
      { type: "list", items: [
        "Keyword overlap: Hit@1 85%, Hit@3 100%, MRR 0.93.",
        "BM25: Hit@1 80%, Hit@3 100%, MRR 0.88.",
        "BM25 with stemming and synonyms: Hit@1 75%, Hit@3 100%, MRR 0.87.",
      ] },
      { type: "callout", label: "The honest reading", text: "The simplest method came out on top, and the one I'd added machinery to came last. But the gap is two questions out of twenty, which is far too small to call a winner." },
      { type: "p", text: "The live table on the home page recomputes these numbers from the site's content every time it's built, so they may have moved since I wrote this." },

      { type: "h2", text: "Where each one went wrong" },
      { type: "p", text: "The individual failures were more useful than the averages:" },
      { type: "list", items: [
        "“Which languages do you speak?” Stemming turned “languages” into “language”, which matched the ASL project's “Sign Language”. The full model put that first; plain BM25 found the right passage.",
        "“Experience with computer vision”: both BM25 variants ranked a long skills list above every relevant passage. Keyword overlap put the ASL project first.",
        "“How did you clean messy data?” Here BM25 helped: both variants found the data-cleaning step first, while keyword overlap was drawn to a document-pipeline passage.",
        "“Which databases have you used?” Keyword overlap put the certifications list first, because of the “SQL and Relational Databases” course. BM25's weighting for rare words fixed it.",
      ] },
      { type: "p", text: "The pattern: what's in a passage, and how long it is, mattered more than the scoring formula. Long passages that list many skills attract generic questions, and every tweak to word matching fixes some questions while breaking others." },

      { type: "h2", text: "What this evaluation can't tell you" },
      { type: "list", items: [
        "Twenty questions is far too few. A difference of one or two questions is noise, not a result.",
        "I wrote the questions, the labels and the system. Questions written by someone else would be fairer, and probably harder.",
        "There's no significance test. With more questions, a paired comparison across rankers would show whether a gap is real.",
        "It only measures retrieval. It says nothing about whether the quoted sentence actually answers the question well.",
      ] },

      { type: "h2", text: "Why I didn't tune it" },
      { type: "p", text: "It would be easy to adjust the synonym list until the full model wins on these 20 questions. That would make the table look better and the system no better: it would just fit this test set. The useful next step is a larger, harder set of questions written by other people, kept separate from any tuning." },

      { type: "h2", text: "The lesson" },
      { type: "p", text: "Measure before you believe an improvement is one. It's a small experiment, but it's exactly the skill I want to build properly next: experimental design, statistical inference and model evaluation." },
    ],
  },
  {
    slug: "preparing-medical-imaging-data",
    title: "Before the model: preparing a medical imaging dataset",
    summary: "At Nocturne I combined about 2,000 retinal images from five inconsistent sources into one dataset. Why that work is modelling work in disguise, and what it taught me about data quality.",
    date: "2026-10-02",
    readMinutes: 4,
    tags: ["Data quality", "Medical imaging", "Data science"],
    about: "nocturne",
    body: [
      { type: "p", text: "In 2024 I worked remotely with Nocturne, a health-technology startup in Berlin, on AI to identify early signs of neurological disease in retinal scans. My part was the data: about 2,000 images from five sources, reviewed and standardised into one consistent dataset that the modelling work then ran on. The details of the data and the models belong to Nocturne, so this note stays at the level of the process." },

      { type: "h2", text: "Five sources that didn't agree" },
      { type: "p", text: "The sources differed in four ways, and each one matters for a different reason:" },
      { type: "list", items: [
        "Resolution. Images captured at different resolutions carry different amounts of detail, and fine structures in a retinal scan can matter.",
        "Dimensions. A model expects inputs of one shape, so every image has to be brought to a common format.",
        "Annotation format. Until the annotations are converted into one format, they can't even be read together.",
        "Labelling. The same finding can be labelled differently by different sources, which is the hardest of the four to see.",
      ] },
      { type: "p", text: "Combining them without resolving those differences would give a model a dataset that disagrees with itself." },

      { type: "h2", text: "Standardising is a series of decisions" },
      { type: "p", text: "“Standardise the data” sounds like a mechanical step. In practice it's a sequence of judgement calls about what counts as equivalent across sources: which sizes, which formats, which labels mean the same thing. Each of those calls shapes what a model trained on the result can and can't learn. That's why I now think of dataset preparation as modelling work in disguise." },
      { type: "callout", label: "What it taught me", text: "Data disparity affects what a model can learn. Models and methods are not the whole problem." },

      { type: "h2", text: "Real patients, real responsibility" },
      { type: "p", text: "These were medical scans of real patients. Handling them within the company's data privacy rules made me think seriously about how data is collected, organised, validated and handled when it's sensitive, not just about what a model can do with it." },

      { type: "h2", text: "Look before you model" },
      { type: "p", text: "Alongside the curation, I explored the clinical data to surface trends, patterns and anomalies, and reported findings to the research team. Writing methods down clearly enough for non-technical colleagues to follow turned out to be part of the job, not an extra." },

      { type: "h2", text: "Why it still shapes my work" },
      { type: "p", text: "This was the first time I saw the relationship between data quality, information management and how reliable an AI system can be. It's the starting point of the question that runs through everything I've done since: how to build data and AI systems that work reliably in the conditions people actually use them in." },
    ],
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);
