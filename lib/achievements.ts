import { confetti, toast } from "./fx";

/** Explorer achievements. Stored per visitor in localStorage; nothing leaves the browser. */
export const ACHIEVEMENTS = [
  { id: "hello", icon: "👋", title: "Hello, world", how: "Reach the About section" },
  { id: "story", icon: "📖", title: "Storyteller", how: "Follow the journey to the NOW chapter" },
  { id: "reader", icon: "🔍", title: "Case closed", how: "Open a project case study" },
  { id: "operator", icon: "▶", title: "Pipeline operator", how: "Run a pipeline to the end" },
  { id: "analyst", icon: "📊", title: "Analyst", how: "Hover a chart in the data science section" },
  { id: "curious", icon: "💬", title: "Curious mind", how: "Ask the portfolio a question" },
  { id: "grep", icon: "⌕", title: "grep master", how: "Filter the skills" },
  { id: "power", icon: "⌘", title: "Power user", how: "Open the command palette" },
  { id: "speed", icon: "⏱", title: "Speedrunner", how: "Try the 30-second view" },
  { id: "secret", icon: "✦", title: "Secret finder", how: "Find a hidden command" },
] as const;

export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];
const KEY = "achievements";

export function unlocked(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { return new Set(); }
}

export function achieve(id: AchievementId) {
  if (typeof window === "undefined") return;
  const got = unlocked();
  if (got.has(id)) return;
  got.add(id);
  try { localStorage.setItem(KEY, JSON.stringify([...got])); } catch { /* storage unavailable */ }
  const a = ACHIEVEMENTS.find((x) => x.id === id)!;
  window.dispatchEvent(new CustomEvent("achievement", { detail: id }));
  if (got.size === ACHIEVEMENTS.length) {
    confetti();
    toast("🏆 100% explored. You now know me better than my CV does. Let's talk!", 6000);
  } else {
    toast(`${a.icon}  Achievement unlocked: ${a.title}  (${got.size}/${ACHIEVEMENTS.length})`);
  }
}

export function resetAchievements() {
  try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent("achievement", { detail: null }));
}
