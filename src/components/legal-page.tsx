import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { legalLinks } from "@/data/site";

interface LegalPageProps {
  /** href of the current policy page — excluded from the "more policies" nav */
  current: string;
  title: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
}

/** Shared layout for all policy pages: consistent hero, single-column article, related-policies nav. */
export function LegalPage({ current, title, lastUpdated, intro, children }: LegalPageProps) {
  const related = legalLinks.filter((l) => l.href !== current);
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-skyblue-100 bg-skyblue-50/70 dark:border-navy-700 dark:bg-navy-800/40">
          <div className="container-max py-12 sm:py-16">
            <div className="mx-auto max-w-3xl">
              <p className="eyebrow">Legal</p>
              <h1 className="mt-3 font-display text-3xl font-bold text-navy-900 sm:text-4xl dark:text-white">{title}</h1>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                Last updated: {lastUpdated}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">{intro}</p>
            </div>
          </div>
        </header>

        <div className="container-max py-10 sm:py-14">
          <article className="mx-auto max-w-3xl space-y-9">{children}</article>

          <nav
            aria-label="More policies"
            className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-skyblue-50/60 p-5 dark:border-navy-700 dark:bg-navy-800/60"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy-800 dark:text-slate-200">More policies</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-skyblue-700 transition-colors hover:text-skyblue-800 hover:underline dark:text-skyblue-400 dark:hover:text-skyblue-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-white">{heading}</h2>
      <div className="mt-2.5 space-y-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-skyblue-500">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
