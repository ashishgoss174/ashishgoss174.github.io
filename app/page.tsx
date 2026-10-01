import About from "@/components/About";
import AskPortfolio from "@/components/AskPortfolio";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import DataScience from "@/components/DataScience";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Extras from "@/components/Extras";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Journey from "@/components/Journey";
import ModelsToSystems from "@/components/ModelsToSystems";
import Navbar from "@/components/Navbar";
import Notes from "@/components/Notes";
import Part from "@/components/Part";
import Numbers from "@/components/Numbers";
import Projects from "@/components/Projects";
import RecruiterMode from "@/components/RecruiterMode";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import Skills from "@/components/Skills";
import SystemExplorer from "@/components/SystemExplorer";
import Testimonials from "@/components/Testimonials";
import { education } from "@/content/education";
import { site } from "@/content/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "AI Engineer and Data Scientist",
  ...(siteUrl ? { url: siteUrl } : {}),
  ...(site.email ? { email: `mailto:${site.email}` } : {}),
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  worksFor: { "@type": "Organization", name: "FutureVerse" },
  sameAs: [site.linkedin, site.github].filter(Boolean),
  knowsAbout: ["Data science", "Exploratory data analysis", "Machine learning", "Retrieval-augmented generation", "Large language models", "Knowledge graphs", "Computer vision", "Document AI and OCR", "Data engineering"],
};

export default function Page() {
  return (
    <>
      <Navbar name={site.name} />
      <main id="main">
        <Hero />

        <Part id="who" />
        <About />
        <Numbers />

        <Part id="story" />
        <Journey />
        <Experience />
        <Testimonials />

        <Part id="work" />
        <Section id="projects" eyebrow="things I built" hue="accent" title="Featured projects" lede="Each case study covers the problem, the architecture, the decisions that mattered and where the project stands now.">
          <Projects />
        </Section>
        <Section id="systems" eyebrow="under the hood" hue="accent" title="Systems I've built" lede="Four architectures from my projects and internships, broken into the stages data passes through. Press run and watch the data move, or select any stage for the detail.">
          <SystemExplorer />
        </Section>
        <DataScience />
        <AskPortfolio />
        <ModelsToSystems />

        <Part id="toolkit" />
        <Section id="skills" eyebrow="the toolbox" hue="grape" title="Technical expertise" lede="Grouped by domain, not scored. Where a skill was used in a project or role on this page, it links there.">
          <Skills />
        </Section>
        <Education />
        <Interests />
        <Notes />
        <Contact />
      </main>
      <Footer />
      <Reveal />
      <Extras />
      <CommandPalette />
      <RecruiterMode />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
