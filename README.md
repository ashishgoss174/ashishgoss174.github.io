# Ashish Gossain — portfolio

Personal portfolio for job applications (AI / ML engineering) and master's applications (AI, Data Science, ML, CS).
Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS. It exports to a fully static site, so it can be hosted anywhere for free.

## Run it locally

Requires Node.js 18.18 or newer (20 recommended).

```bash
npm install
npm run dev        # http://localhost:3000, with live reload
npm run build      # writes the finished static site to /out
npm start          # serves /out locally to check the production build
```

## Where the content lives

Everything you'd want to edit is plain data in `content/`. You shouldn't need to touch the components.

| File | What it controls |
|---|---|
| `content/sections.ts` | The page's four parts and the order of sections inside them. Section numbers and alternating backgrounds come from here; keep it in the same order as `app/page.tsx` |
| `content/site.ts` | Name, headline, statement, email, GitHub, LinkedIn, resume path, photo; `hero` holds the rotating "I build…" phrases, terminal lines, chips and stat counters |
| `content/datascience.ts` | The "How I work with data" notebook cells (step, pseudo-code, real evidence, links) |
| `content/notes.ts` | Technical write-ups, each published at `/notes/<slug>/` and listed in the Notes section, the palette and the Ask search |
| `lib/evaluation.ts` | The labelled questions used to evaluate Ask my portfolio. Add harder ones; the results table updates itself |
| `content/testimonials.ts` | Quotes from recommendation letters (set to `[]` to hide the section) |
| `content/experience.ts` | Internships, highlights and tech stacks |
| `content/projects.ts` | Project cards and case studies (problem, approach, decisions, status, what you learned, links) |
| `content/flows.ts` | The stage-by-stage architecture diagrams used by projects, experience and "Systems I've built" |
| `content/systems.ts` | Which four architectures appear in "Systems I've built" |
| `content/skills.ts` | Skill domains; `evidence` links each skill to the project or role where you used it |
| `content/education.ts` | Degree, grades, coursework, certifications, languages, leadership |
| `content/story.ts` | About text, progression, "From models to systems" layers, research interests, the journey chapters and the "next chapter" |

Every role, project, chapter and skill domain has a `hue` (`accent` cyan, `grape` violet, `rose` pink, `sun` amber, `mint` green) that colours it everywhere it appears.

The `documents/` folder holds the private source documents (marksheets, letters, certificates). It is in `.gitignore` and is not part of the site; never move it into `public/`.

## Replacing links

Open `content/site.ts`:

```ts
email: "ashishgossain174@gmail.com",
github: "https://github.com/ashishgoss174",
linkedin: "https://www.linkedin.com/in/ashish-gossain-6ab647245/",
```

Set any of these to `""` and its button disappears everywhere on the site. Project links (GitHub, live demo) are in the `links` array of each project in `content/projects.ts`. JARVIS has none, so its card says "Code not public yet"; add `{ label: "GitHub", href: "..." }` when there is a repository.

All links currently on the site were taken from the hyperlinks in your resume PDF.

## Replacing the resume

Put the PDF at:

```
public/resume/Ashish_Gossain_Resume.pdf
```

Your one-page resume is already there. To use a different file name, change `resume` in `content/site.ts`. The Europass CV was deliberately not published because it contains your home address and date of birth.

## Replacing the photo

The photo is `public/images/ashish-gossain.jpg`. Replace the file to change it, or set `photo: ""` in `content/site.ts` to remove it.

## SEO settings

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` once you have a domain. That turns on the canonical URL, Open Graph URL, social preview image (`public/og.png`) and the `url` field in the structured data. Until it's set, those are left out rather than pointing somewhere wrong. On Vercel or Netlify, add the same variable in the project settings.

## Using your own domain

1. Buy a domain (for example `ashishgossain.dev`) from any registrar.
2. **GitHub Pages:** in the repository go to Settings > Secrets and variables > Actions > Variables and add `SITE_URL` = `https://ashishgossain.dev` and `CUSTOM_DOMAIN` = `ashishgossain.dev`. The workflow writes the `CNAME` file for you. Then, in Settings > Pages, enter the domain, and at your registrar add the DNS records GitHub shows you (four `A` records for the apex, or a `CNAME` for `www`).
   **Vercel / Netlify:** add the domain in the project's Domains settings and set `NEXT_PUBLIC_SITE_URL` to the full URL.
3. Redeploy. Setting the site URL turns on the canonical URL, social preview image, `sitemap.xml` and the `robots.txt` sitemap line.

## Deploying

**Vercel (simplest).** Push this folder to a GitHub repository, import it at vercel.com, and deploy. No settings needed. Add `NEXT_PUBLIC_SITE_URL` afterwards.

**Netlify.** Build command `npm run build`, publish directory `out`.

**GitHub Pages.** A workflow is included at `.github/workflows/deploy-pages.yml`. In the repository go to Settings > Pages and choose "GitHub Actions" as the source. If the site will live at `https://ashishgoss174.github.io/<repo-name>/` (no custom domain), add a repository variable `BASE_PATH` = `/<repo-name>`. With a custom domain, or a repository named `ashishgoss174.github.io`, leave it unset.

**Any static host.** Upload the contents of `out/` after `npm run build`.

## Design notes

- Dark by default with a light theme toggle (the choice is remembered in the browser). Deep navy base with five neon accents.
- IBM Plex Sans and IBM Plex Mono are self-hosted from npm, so there are no third-party font requests.
- Architecture diagrams encode the kind of each stage by shape and colour: violet border for models, dashed pink for constraints and safety checks, amber underline for storage, thick cyan left edge for retrieval, green tint for outputs.
- Interactive pieces: a typing terminal and rotating headline in the hero, a live graph (packets travel along the edges; hover to trace, click to jump to the work), a journey timeline whose rail fills as you scroll, cards with a cursor-following glow and tilt, a "Run pipeline" mode in Systems, a grep-style skill filter, and count-up stats.
- **Ask my portfolio** (`lib/search.ts`): a BM25 retrieval engine over the site's own content, built in the browser. It quotes the best sentence and cites the source, and refuses when nothing scores above the threshold. Deep link: `/?ask=kafka#ask`.
- **30-second view** for recruiters: navbar button, command palette, or send a link ending in `#30s`.
- **Explorer achievements** (`lib/achievements.ts`): ten badges stored in the visitor's localStorage, with a counter in the navbar.
- **Career-as-a-dataset charts** in the data science section are computed from the content files, so they update when the content does. Chart colours are validated for colour-blind separation and contrast in both themes.
- Surprises: Ctrl/⌘ + K (or `/`) opens a command palette; typing `sudo hire ashish` in it, or the Konami code anywhere, throws confetti; there is a note for anyone who opens the browser console.
- All motion switches off when the visitor's system asks for reduced motion, and content stays visible if JavaScript is disabled. No animation libraries: everything is CSS and a few small hooks.
- No skill bars or percentages. Skills link to the work that used them instead.

## Accuracy notes

Everything on the site comes from your resume and Europass CV. A few things were checked and deliberately handled:

- **TensorFlow / Keras** is linked to the ASL project, whose repository uses a Keras CNN. **PyTorch** is listed without a linked project. The ASL architecture follows the project's own README (landmarks drawn on a white canvas, eight gesture groups, pyttsx3 for speech).
- **"Production"** wording from the Europass profile is not used; the site describes what was built without claiming scale.
- **Nocturne** is described as a Data Scientist internship that researched approaches and curated a dataset, not as a research position or a diagnostic model.
- **CareCompanion** carries a note that it was an internship capstone, not a clinical tool.
- **"What I learned"** sections in the case studies are written in your voice from the facts in your resume. Read them and adjust them so they say what you actually took away.
- **Journey chapters** also draw on the statement of purpose and the internship certificates (VERGE and Piyaau design roles, Thurro at ADQVEST, the Celebal Summer Internship). Their `takeaway` lines are in your voice; adjust them freely.
- **Testimonials** are excerpts from the Nocturne and Piyaau letters. Check that the writers are happy to be quoted publicly.
- **Phone number, address and date of birth** are not shown. They're on your CV for recruiters who need them; a public web page doesn't.
