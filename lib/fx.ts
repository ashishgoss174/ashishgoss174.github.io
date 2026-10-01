/** Small browser-only effects: theme switching, toasts and a confetti burst. */

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type Theme = "dark" | "light";

export const currentTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

export function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
}

export const toggleTheme = () => setTheme(currentTheme() === "dark" ? "light" : "dark");

let toastTimer: number | undefined;
export function toast(message: string, ms = 3200) {
  document.querySelector(".toast")?.remove();
  window.clearTimeout(toastTimer);
  const el = document.createElement("div");
  el.className = "toast rounded-xl border border-line-strong bg-raised/95 px-4 py-3 text-[0.9375rem] text-ink shadow-2xl backdrop-blur";
  el.setAttribute("role", "status");
  el.textContent = message;
  document.body.appendChild(el);
  toastTimer = window.setTimeout(() => {
    el.setAttribute("data-leaving", "");
    window.setTimeout(() => el.remove(), 300);
  }, ms);
}

export async function copyText(text: string, done: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast(done);
  } catch {
    toast(text);
  }
}

/** Canvas confetti in the site's five accent colours. Skipped when motion is reduced. */
export function confetti(originX = 0.5, originY = 0.35) {
  if (reducedMotion()) return;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "90" });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = (canvas.width = window.innerWidth * dpr);
  const h = (canvas.height = window.innerHeight * dpr);

  const styles = getComputedStyle(document.documentElement);
  const colors = ["accent", "grape", "rose", "sun", "mint"].map((c) => `rgb(${styles.getPropertyValue(`--${c}`).trim().split(/\s+/).join(",")})`);
  const parts = Array.from({ length: 160 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = (6 + Math.random() * 10) * dpr;
    return {
      x: originX * w, y: originY * h,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 6 * dpr,
      r: (3 + Math.random() * 4) * dpr, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)], shape: Math.random() > 0.5,
    };
  });

  const start = performance.now();
  const tick = (t: number) => {
    const age = t - start;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.vx *= 0.985; p.vy = p.vy * 0.985 + 0.35 * dpr;
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - age / 2600);
      ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.shape) ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      else { ctx.beginPath(); ctx.arc(0, 0, p.r / 1.4, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    if (age < 2600) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
}
