import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="relative grid min-h-[100dvh] place-items-center overflow-hidden px-5">
      <div className="aurora opacity-70" aria-hidden="true"><span /><span /><span /></div>
      <div className="relative text-center">
        <p className="grad-text font-mono text-[5rem] font-semibold leading-none sm:text-[7rem]">404</p>
        <h1 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.02em]">This page doesn&apos;t exist</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">No passage scored high enough, so instead of guessing, here&apos;s the way back.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          <Link href="/" className="btn btn-primary">Back to the portfolio</Link>
          <Link href="/#contact" className="btn btn-quiet">Get in touch</Link>
        </div>
      </div>
    </main>
  );
}
