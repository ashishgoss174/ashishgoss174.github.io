import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/60">
      <div className="container-page flex flex-col gap-3 py-8 text-[0.875rem] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js, Tailwind CSS and a lot of curiosity.</p>
        <p className="font-mono text-[0.8125rem]">
          <span className="kbd">Ctrl</span> <span className="kbd">K</span> for commands · <a href="#top" className="text-muted hover:text-ink">back to top ↑</a>
        </p>
      </div>
    </footer>
  );
}
