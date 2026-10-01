export type StepKind = "input" | "process" | "model" | "retrieval" | "store" | "guard" | "output";

/** The five accent colours defined in app/globals.css. */
export type Hue = "accent" | "grape" | "rose" | "sun" | "mint";

export interface FlowStep {
  label: string;
  kind: StepKind;
  detail: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  context: string;
  featured: boolean;
  problem: string;
  solution: string;
  stack: string[];
  flow: FlowStep[];
  decisions: string[];
  status: string;
  learned: string;
  note?: string;
  links: LinkItem[];
  hue: Hue;
}

export interface Highlight {
  title: string;
  body: string;
}

export interface Role {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  mode: string;
  sector: string;
  summary: string;
  highlights: Highlight[];
  stack: string[];
  flows?: { title: string; steps: FlowStep[] }[];
  project?: string;
  hue: Hue;
}

export interface Chapter {
  id: string;
  date: string;
  title: string;
  place: string;
  story: string;
  takeaway?: string;
  unlocked: string[];
  link?: LinkItem;
  hue: Hue;
  now?: boolean;
}

export interface Skill {
  name: string;
  /** ids of projects or roles where the skill was used; empty means "listed on CV" */
  evidence?: string[];
}

export interface SkillDomain {
  title: string;
  blurb: string;
  skills: Skill[];
  hue: Hue;
}
