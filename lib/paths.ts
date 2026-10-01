const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a path in /public with the deployment base path (needed for GitHub Pages sub-paths). */
export const asset = (path: string) => `${base}${path}`;
