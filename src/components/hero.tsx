"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Monitor, Network, BookOpen, ShieldCheck, Terminal, FlaskConical } from "lucide-react";
import { scrollToSection } from "@/components/site-header";
import { packages } from "@/data/packages";

/** Lowest package price — single source of truth in @/data/packages */
const MIN_PRICE = Math.min(...packages.map((p) => p.price));
const MIN_PRICE_LABEL = `₹${MIN_PRICE.toLocaleString("en-IN")}`;

const LEARN_ITEMS = [
  { icon: Monitor, label: "A+ Hardware" },
  { icon: Network, label: "N+ Networking" },
  { icon: BookOpen, label: "Microsoft" },
  { icon: ShieldCheck, label: "Cisco CCNA/CCNP" },
  { icon: Terminal, label: "Linux" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // soft ease-out, no bounce

/** Staged mount choreography — chip → headline → copy → CTAs */
const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stripContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } },
};

const stripItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-skyblue-50/60 dark:bg-navy-800/40">
      {/* Ambient glows — barely-there color drifting slowly behind the grid */}
      <div aria-hidden="true" className="animate-drift pointer-events-none absolute -left-28 -top-32 h-[26rem] w-[26rem] rounded-full bg-skyblue-300/30 blur-3xl dark:bg-skyblue-500/10" />
      <div aria-hidden="true" className="animate-drift-slow pointer-events-none absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-skyblue-400/20 blur-3xl dark:bg-skyblue-600/10" />
      <div className="bg-grid-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_90%)]" aria-hidden="true" />
      <div className="container-max relative flex min-h-[100svh-3.5rem] sm:min-h-[88vh] flex-col items-center justify-center py-16 sm:py-24 text-center">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center"
        >
          <motion.span
            variants={heroItem}
            className="chip border border-skyblue-200 bg-white text-skyblue-700 dark:border-skyblue-800 dark:bg-navy-800 dark:text-skyblue-300"
          >
            <FlaskConical size={12} aria-hidden="true" /> Classroom training · Sector V, Kolkata
          </motion.span>
          <motion.h1
            variants={heroItem}
            className="mt-5 sm:mt-7 max-w-3xl font-display text-3xl leading-[1.12] sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy-900 text-balance dark:text-white"
          >
            Learn IT Skills. Practice Them.{" "}
            <span className="animate-shimmer bg-gradient-to-r from-skyblue-600 via-skyblue-400 to-skyblue-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-skyblue-300 dark:via-skyblue-500 dark:to-skyblue-300">
              Build Your Career.
            </span>
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-lg leading-relaxed text-slate-600 text-pretty dark:text-slate-300"
          >
            Classroom-based training in Hardware, Networking, Microsoft, Cisco and Linux — with a strong
            focus on practical learning and hands-on lab experience.
          </motion.p>
          <motion.div
            variants={heroItem}
            className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <Link href="/#courses" onClick={(e) => { e.preventDefault(); scrollToSection("/#courses"); }} className="btn-primary btn-lg group">
              Explore Courses <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/#packages" onClick={(e) => { e.preventDefault(); scrollToSection("/#packages"); }} className="btn-outline btn-lg">
              View Packages
            </Link>
          </motion.div>
          <motion.p
            variants={heroItem}
            className="mt-4 sm:mt-5 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400"
          >
            {packages.length} combo packages · starting from{" "}
            <span className="font-bold text-skyblue-700 dark:text-skyblue-300">{MIN_PRICE_LABEL}</span>{" "}
            · practical/lab training included
          </motion.p>
        </motion.div>

        {/* What you can learn strip */}
        <motion.div
          variants={stripContainer}
          initial="hidden"
          animate="visible"
          className="mt-12 sm:mt-16 w-full"
        >
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
            {LEARN_ITEMS.map((item) => (
              <motion.div
                key={item.label}
                variants={stripItem}
                className="flex items-center justify-center gap-2 rounded-xl border border-skyblue-100 bg-white px-3 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-skyblue-300 hover:shadow-md dark:border-navy-700 dark:bg-navy-800 dark:hover:border-skyblue-600"
              >
                <item.icon size={15} className="shrink-0 text-skyblue-500" aria-hidden="true" />
                <span className="text-xs sm:text-[13px] font-semibold text-navy-800 dark:text-slate-200">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
