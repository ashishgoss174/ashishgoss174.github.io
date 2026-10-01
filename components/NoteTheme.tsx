"use client";
import { useEffect, useState } from "react";
import { currentTheme, toggleTheme, type Theme } from "@/lib/fx";
import { MoonIcon, SunIcon } from "./Icons";

/** The theme toggle on its own, for pages without the main navbar. */
export default function NoteTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    setTheme(currentTheme());
    const on = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("themechange", on);
    return () => window.removeEventListener("themechange", on);
  }, []);
  return (
    <button type="button" onClick={toggleTheme} className="rounded-md p-2 text-muted hover:text-ink"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
