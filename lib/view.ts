/** Which audience the page is arranged for. Kept in the URL (?view=academic) so it can be shared. */
export type View = "all" | "recruiter" | "academic";
const VIEWS: View[] = ["all", "recruiter", "academic"];

export function readView(): View {
  if (typeof window === "undefined") return "all";
  const v = new URLSearchParams(window.location.search).get("view") as View | null;
  return v && VIEWS.includes(v) ? v : "all";
}

export function setView(v: View) {
  const url = new URL(window.location.href);
  if (v === "all") url.searchParams.delete("view"); else url.searchParams.set("view", v);
  history.replaceState(null, "", url);
  window.dispatchEvent(new CustomEvent<View>("viewchange", { detail: v }));
}
