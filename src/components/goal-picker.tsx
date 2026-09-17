"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PackageName } from "@/components/package-name";
import { getPackageBySlug } from "@/data/packages";

/** §25 — "Which program is right for me?" — one of the strongest conversion tools */
interface GoalEntry {
  name: string;
  note: string;
  href: string;
  pkg?: string; // package slug — renders the name as course-code badges
}
interface Goal {
  label: string;
  recommended: GoalEntry;
  next?: GoalEntry;
}

const GOALS: Goal[] = [
  {
    label: "I am new to IT",
    recommended: {
      name: "Start with A+ + N+",
      note: "Hardware and networking fundamentals first — then grow in any direction.",
      href: "/#courses",
    },
    next: { name: "Then consider", note: "Microsoft / CCNA / Linux depending on your direction.", href: "/#courses" },
  },
  {
    label: "I want to enter Networking",
    recommended: {
      name: "A+ + N+ + CCNA",
      pkg: "aplus-nplus-ccna",
      note: "₹4,999 · from fundamentals into Cisco configuration.",
      href: "/packages/aplus-nplus-ccna",
    },
    next: {
      name: "Advanced: A+ + N+ + CCNA + CCNP",
      pkg: "aplus-nplus-ccna-ccnp",
      note: "₹9,999 · add enterprise-level networking.",
      href: "/packages/aplus-nplus-ccna-ccnp",
    },
  },
  {
    label: "System Administration",
    recommended: {
      name: "A+ + N+ + MCSE",
      pkg: "aplus-nplus-mcse",
      note: "₹4,999 · hardware, networking and Microsoft servers.",
      href: "/packages/aplus-nplus-mcse",
    },
    next: {
      name: "Or: A+ + N+ + MCSE + CCNA",
      pkg: "aplus-nplus-mcse-ccna",
      note: "₹6,999 · systems and networks together.",
      href: "/packages/aplus-nplus-mcse-ccna",
    },
  },
  {
    label: "I am interested in Linux",
    recommended: {
      name: "A+ + N+ + Linux",
      pkg: "aplus-nplus-linux",
      note: "₹4,999 · foundations plus Linux administration.",
      href: "/packages/aplus-nplus-linux",
    },
  },
  {
    label: "I want broad IT knowledge",
    recommended: {
      name: "Complete IT Program",
      note: "₹12,999 · all six courses: A+, N+, MCSE, CCNA, CCNP, Linux.",
      href: "/packages/aplus-nplus-mcse-ccna-ccnp-linux",
    },
  },
];

/** Package-linked goals render as course-code badges; plain names fall back to text */
function GoalTitle({ entry }: { entry: GoalEntry }) {
  const pkg = entry.pkg ? getPackageBySlug(entry.pkg) : undefined;
  return pkg ? <PackageName pkg={pkg} /> : <>{entry.name}</>;
}

export function GoalPicker() {
  const [active, setActive] = useState(1);

  return (
    <section id="pick" className="border-y border-skyblue-100 bg-skyblue-50/70 dark:border-navy-700 dark:bg-navy-800/40">
      <div className="container-max py-14 sm:py-20">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Not Sure Where to Start?"
            title="Which program is right for me?"
            description="Pick the goal closest to yours — we'll show the training path that fits."
          />
        </Reveal>

        <div className="mt-9 flex flex-wrap justify-center gap-2 sm:mt-11 sm:gap-2.5">
          {GOALS.map((goal, i) => (
            <button
              key={goal.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={
                "rounded-full border px-3.5 py-2 text-[13px] sm:text-sm font-semibold transition-all duration-200 " +
                (active === i
                  ? "border-skyblue-500 bg-skyblue-500 text-white shadow-md shadow-skyblue-500/25"
                  : "border-slate-200 bg-white text-navy-800 hover:border-skyblue-300 hover:text-skyblue-700 dark:border-navy-600 dark:bg-navy-800 dark:text-slate-200 dark:hover:border-skyblue-400 dark:hover:text-skyblue-400")
              }
            >
              {goal.label}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          <Link
            href={GOALS[active].recommended.href}
            className="card card-hover group border-skyblue-300 p-5 sm:p-6"
          >
            <span className="chip gap-1.5 bg-skyblue-500 text-white">
              <Sparkles size={11} aria-hidden="true" /> Recommended
            </span>
            <h3 className="mt-3 font-display text-base sm:text-lg font-semibold text-navy-900 dark:text-white">
              <GoalTitle entry={GOALS[active].recommended} />
            </h3>
            <p className="mt-1 text-[13px] sm:text-sm text-slate-600 dark:text-slate-300">{GOALS[active].recommended.note}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-skyblue-600 group-hover:text-skyblue-700 dark:text-skyblue-400 dark:group-hover:text-skyblue-300">
              View program <ArrowRight size={15} aria-hidden="true" />
            </span>
          </Link>

          {GOALS[active].next ? (
            <Link
              href={GOALS[active].next!.href}
              className="card card-hover group p-5 sm:p-6"
            >
              <span className="chip bg-skyblue-100 text-skyblue-800 dark:bg-skyblue-900/50 dark:text-skyblue-300">{GOALS[active].next!.name.split(":")[0]}</span>
              <h3 className="mt-3 font-display text-base sm:text-lg font-semibold text-navy-900 dark:text-white">
                {GOALS[active].next!.pkg ? (
                  <GoalTitle entry={GOALS[active].next!} />
                ) : GOALS[active].next!.name.includes(":") ? (
                  GOALS[active].next!.name.split(":").slice(1).join(":").trim()
                ) : (
                  GOALS[active].next!.name
                )}
              </h3>
              <p className="mt-1 text-[13px] sm:text-sm text-slate-600 dark:text-slate-300">{GOALS[active].next!.note}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-skyblue-600 group-hover:text-skyblue-700 dark:text-skyblue-400 dark:group-hover:text-skyblue-300">
                View program <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ) : (
            <div className="card flex flex-col justify-center p-5 text-center sm:p-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Not sure?{" "}
                <a href="/#contact" className="font-semibold text-skyblue-600 hover:underline dark:text-skyblue-400">
                  Ask an advisor
                </a>{" "}
                — we'll help you pick the right path.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
