import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

export interface EvidenceRef {
  id: string;
  label: string;
  kind: "project" | "role";
  href: string;
}

const index = new Map<string, EvidenceRef>();
for (const p of projects) index.set(p.id, { id: p.id, label: p.name, kind: "project", href: `#project-${p.id}` });
for (const r of experience) index.set(r.id, { id: r.id, label: r.company, kind: "role", href: `#exp-${r.id}` });

export const evidence = (id: string): EvidenceRef | undefined => index.get(id);
