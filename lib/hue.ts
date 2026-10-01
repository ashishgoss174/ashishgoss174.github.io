import type { CSSProperties } from "react";
import type { Hue } from "./types";

/** Sets --h for an element, which the .h-* classes in globals.css read. */
export const hue = (h: Hue, extra?: CSSProperties): CSSProperties => ({ ["--h" as string]: `var(--${h})`, ...extra });
