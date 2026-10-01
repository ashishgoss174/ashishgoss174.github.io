import { experience } from "@/content/experience";
import type { Note } from "@/content/notes";
import { projects } from "@/content/projects";
import type { Hue } from "./types";

/** What a note is about: its colour, a label ("my work at X" / "my project X") and where to read more. */
export function noteContext(n: Note): { hue: Hue; from?: string; href?: string; cta?: string } {
  const role = experience.find((r) => r.id === n.about);
  if (role) return { hue: role.hue, from: `From my work at ${role.company}`, href: `/#exp-${role.id}`, cta: "See the work behind this" };
  const project = projects.find((p) => p.id === n.about);
  if (project) return { hue: project.hue, from: `From my project ${project.name}`, href: `/#project-${project.id}`, cta: "See the project" };
  return { hue: "mint", href: n.link?.href, cta: n.link?.label };
}
