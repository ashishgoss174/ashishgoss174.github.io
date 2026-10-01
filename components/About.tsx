import { education, languages } from "@/content/education";
import { site } from "@/content/site";
import { about } from "@/content/story";
import Section from "./Section";

/** profile.json, syntax-highlighted. Every value comes from the content files. */
const profile: [string, string | string[]][] = [
  ["name", site.name],
  ["based_in", site.location],
  ["degree", `B.Tech CSE, ${education.specialisation}`],
  ["cgpa", `${education.cgpa.split(" ")[0]} (last 4 sem: ${education.finalFour.split(" ")[0]})`],
  ["now", "AI Engineer Intern @ FutureVerse"],
  ["focus", ["LLMs", "RAG", "knowledge graphs", "computer vision", "data engineering"]],
  ["speaks", languages.map((l) => (l.name === "Hindi" ? "Hindi" : `${l.name} (${l.level.match(/C1|A2/)?.[0] ?? l.level})`))],
  ["open_to", ["AI/ML engineering", "research internships", "graduate study"]],
];

const str = (s: string) => <span className="text-mint">&quot;{s}&quot;</span>;

export default function About() {
  return (
    <Section id="about" eyebrow="hello world" title="About" hue="accent">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_26rem]">
        <div>
          <p data-reveal className="mb-6 text-[1.5rem] font-semibold leading-snug tracking-[-0.015em] sm:text-[1.75rem]">
            Hi, I&apos;m Ashish 👋 I like data that&apos;s messy and systems that have to be <span className="grad-text">dependable</span>.
          </p>
          <div data-reveal className="max-w-prose space-y-5 text-[1.0625rem] leading-[1.75] text-ink/90">
            {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div data-reveal>
        <div data-glow data-tilt className="overflow-hidden rounded-2xl border border-line-strong/80 bg-bg/70" style={{ ["--h" as string]: "var(--grape)" }}>
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="font-mono text-[0.75rem] text-faint">~/ashish/profile.json</span>
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-rose/70" /><span className="h-2 w-2 rounded-full bg-sun/70" /><span className="h-2 w-2 rounded-full bg-mint/70" />
            </span>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap px-4 py-4 font-mono text-[0.8125rem] leading-[1.75]">
            <code>
              <span className="text-faint">{"{"}</span>{"\n"}
              {profile.map(([k, v], i) => (
                <span key={k}>
                  {"  "}<span className="text-accent">&quot;{k}&quot;</span><span className="text-faint">: </span>
                  {Array.isArray(v) ? (
                    <>
                      <span className="text-faint">[</span>
                      {v.map((x, j) => <span key={x}>{str(x)}{j < v.length - 1 && <span className="text-faint">, </span>}</span>)}
                      <span className="text-faint">]</span>
                    </>
                  ) : str(v)}
                  {i < profile.length - 1 && <span className="text-faint">,</span>}{"\n"}
                </span>
              ))}
              <span className="text-faint">{"}"}</span>
            </code>
          </pre>
        </div>
        </div>
      </div>
    </Section>
  );
}
