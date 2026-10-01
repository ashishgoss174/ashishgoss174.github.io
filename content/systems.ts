import { invoiceFlow, knowledgeGraphFlow, ragFlow, sqlFlow } from "./flows";

/** Architectures shown in "Systems I've built". `source` is a project or role id. */
export const systems = [
  {
    id: "rag",
    title: "RAG medical assistant",
    source: "carecompanion",
    summary: "Answers questions from a fixed set of clinical documents and cites them, instead of relying on what the model remembers.",
    steps: ragFlow,
  },
  {
    id: "sql",
    title: "LLM Text-to-SQL",
    source: "talk-to-your-database",
    summary: "Turns plain-English questions into PostgreSQL, with a check in code that stops any query from changing data.",
    steps: sqlFlow,
  },
  {
    id: "kg",
    title: "Knowledge graph learning engine",
    source: "futureverse",
    summary: "Stores what students know as a graph with history, so mistakes can be traced to a specific concept.",
    steps: knowledgeGraphFlow,
  },
  {
    id: "invoice",
    title: "Multimodal invoice intelligence",
    source: "invoice-extractor",
    summary: "Reads invoice images directly with a multimodal model and answers questions about them across languages.",
    steps: invoiceFlow,
  },
];
