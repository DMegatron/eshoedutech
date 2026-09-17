"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating back-to-top button — appears once the page is scrolled, sits above the advisor pill (bottom-right stack). */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll(); // sync on mount (e.g. restored scroll position)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed bottom-[4.5rem] right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-700 bg-navy-900 text-white shadow-lg shadow-navy-900/30 transition-all duration-300 hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-skyblue-400 sm:bottom-20 sm:right-5 dark:border-navy-500 dark:bg-navy-800 dark:hover:bg-navy-600 ${
        visible ? "translate-y-0 opacity-100 hover:-translate-y-0.5" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
