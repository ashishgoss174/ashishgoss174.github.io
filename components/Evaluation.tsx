import { results, testSet } from "@/lib/evaluation";
import { asset } from "@/lib/paths";

const pct = (v: number) => `${Math.round(v * 100)}%`;
const metrics: { key: "hit1" | "hit3" | "mrr"; label: string; help: string; fmt: (v: number) => string }[] = [
  { key: "hit1", label: "Hit@1", help: "top passage is relevant", fmt: pct },
  { key: "hit3", label: "Hit@3", help: "a relevant passage in the top 3", fmt: pct },
  { key: "mrr", label: "MRR", help: "mean reciprocal rank of the first relevant passage", fmt: (v) => v.toFixed(2) },
];

/** "Is it any good?" The retrieval demo, measured against simpler baselines on a labelled question set. */
export default function Evaluation() {
  const n = testSet.length;
  const demo = results[results.length - 1];
  const others = results.slice(0, -1);
  const rival = others.reduce((a, b) => (b.hit1 > a.hit1 ? b : a));
  const gap = Math.round(Math.abs(demo.hit1 - rival.hit1) * n);
  const qs = `${gap} question${gap === 1 ? "" : "s"} out of ${n}`;
  const verdict =
    demo.hit1 > rival.hit1 ? `The full model scored best at Hit@1, but only by ${qs}.`
    : demo.hit1 === rival.hit1 ? `The full model tied with ${rival.label.toLowerCase()} at Hit@1.`
    : `${rival.label} beat the full model at Hit@1, by ${qs}. The extra machinery didn't pay off here.`;

  return (
    <div data-reveal className="mt-10 rounded-2xl border border-line-strong/70 bg-bg/60">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-mint">Is it any good? I measured it</p>
          <h3 className="mt-1 text-[1.25rem] font-semibold tracking-[-0.01em]">Retrieval evaluation: {n} labelled questions, 3 rankers</h3>
        </div>
        <a href={asset("/notes/evaluating-my-search-engine/")} className="font-mono text-[0.8125rem] text-mint hover:underline hover:underline-offset-4">Read the write-up →</a>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-left text-[0.875rem]">
            <thead>
              <tr className="text-faint">
                <th className="pb-2 font-normal">Ranker</th>
                {metrics.map((m) => <th key={m.key} className="pb-2 font-normal" title={m.help}>{m.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-t border-line align-top">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    <span className="block text-ink">{r.label}</span>
                    <span className="block text-[0.75rem] text-faint">{r.detail}</span>
                  </th>
                  {metrics.map((m) => (
                    <td key={m.key} className="py-3 pr-4">
                      <span className="font-mono text-ink">{m.fmt(r[m.key])}</span>
                      <span className="mt-1.5 block h-1.5 w-20 overflow-hidden rounded-full bg-line" aria-hidden="true">
                        <span className="block h-full rounded-full bg-[rgb(var(--chart-1))]" style={{ width: `${r[m.key] * 100}%` }} />
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[0.75rem] text-faint">
            Hit@1: the top passage is relevant. Hit@3: a relevant passage is in the top three. MRR: the mean of 1 / rank of the first relevant passage.
          </p>
        </div>

        <div>
          <p className="font-medium">What I found</p>
          <ul className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-muted">
            <li className="border-l-2 border-sun/60 pl-3"><span className="text-ink">The fancier model didn&apos;t clearly win.</span> {verdict}</li>
            <li className="border-l-2 border-line-strong pl-3"><span className="text-ink">Twenty easy questions can&apos;t separate them.</span> Every ranker finds a relevant passage in the top three almost every time, so differences of a question or two are noise.</li>
            <li className="border-l-2 border-line-strong pl-3"><span className="text-ink">Chunking matters more than scoring.</span> BM25 is drawn to the long skills-list passages; the synonym list fixed one question and broke another; stemming made &ldquo;languages&rdquo; match &ldquo;Sign Language&rdquo;.</li>
            <li className="border-l-2 border-mint/60 pl-3"><span className="text-ink">What I&apos;d do next.</span> Harder paraphrased questions written by someone else, more of them, and a significance test before calling a winner. I haven&apos;t tuned the engine to this set, because that would just overfit it.</li>
          </ul>
        </div>
      </div>

      <details className="border-t border-line px-5 py-3 sm:px-6">
        <summary className="text-[0.875rem] text-muted hover:text-ink">See every question and where each ranker put the first relevant passage</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-[0.8125rem]">
            <thead className="text-faint">
              <tr><th className="py-1.5 font-normal">Question</th>{results.map((r) => <th key={r.id} className="py-1.5 font-normal">{r.label}</th>)}</tr>
            </thead>
            <tbody>
              {testSet.map((t, i) => (
                <tr key={t.q} className="border-t border-line/70">
                  <td className="py-1.5 pr-4 text-ink/90">{t.q}</td>
                  {results.map((r) => {
                    const k = r.ranks[i];
                    return (
                      <td key={r.id} className="py-1.5 font-mono" title={`Top passage: ${r.top[i]}`}>
                        {k === 1 ? <span className="text-mint">✓ 1</span> : k > 0 ? <span className="text-sun">{k}</span> : <span className="text-rose">✗</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
