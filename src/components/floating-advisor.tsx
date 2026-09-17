import { Phone } from "lucide-react";
import { site } from "@/data/site";

/** Floating "Talk to an advisor" button — mobile friendly; a soft pulse ring draws the eye without shouting. */
export function FloatingAdvisor() {
  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
      <span
        aria-hidden="true"
        className="animate-pulse-ring absolute inset-0 rounded-full bg-skyblue-400/45 dark:bg-skyblue-500/30"
      />
      <a
        href={site.phoneHref}
        aria-label={`Call an Esho EDUTECH advisor at ${site.phone}`}
        className="relative inline-flex items-center gap-2 rounded-full bg-skyblue-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-skyblue-500/30 transition-all hover:-translate-y-0.5 hover:bg-skyblue-600 sm:px-5 sm:py-3 sm:text-sm"
      >
        <Phone size={15} aria-hidden="true" />
        Talk to an advisor
      </a>
    </div>
  );
}
