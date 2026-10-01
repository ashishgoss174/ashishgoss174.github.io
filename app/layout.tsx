import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const title = `${site.name} | AI Engineer & Data Scientist`;
const description =
  "Ashish Gossain is an AI engineer and data scientist from Delhi, India, with a B.Tech in Data Science & AI. He turns messy real-world data into clean datasets, models and dependable AI systems: RAG, LLM applications, knowledge graphs, OCR pipelines and computer vision.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title,
  description,
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "profile",
    title,
    description,
    siteName: site.name,
    locale: "en_IN",
    ...(siteUrl ? { url: siteUrl, images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, AI Engineer & Data Scientist` }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    ...(siteUrl ? { images: ["/og.png"] } : {}),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070911",
};

// Runs before paint: applies a saved theme and marks JS as available (for scroll reveal).
const boot = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}document.documentElement.classList.add('js');})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
