"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Cookie, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";

const STORAGE_KEY = "esho-cookie-consent";
/** Bump to re-prompt every visitor after a material policy change */
const CONSENT_VERSION = 1;
/** Consent expires after 180 days and the banner re-appears */
const CONSENT_TTL_MS = 1000 * 60 * 60 * 24 * 180;

type Choice = "accepted" | "declined";
/** null = not yet resolved on the client (renders nothing → no hydration mismatch) */
type ConsentState = Choice | "unset" | null;

/**
 * Cookie consent banner + analytics gate.
 * Vercel Analytics only mounts after an explicit "Accept" — nothing non-essential
 * runs while the visitor hasn't chosen or has declined.
 */
export function CookieConsent() {
  const [state, setState] = useState<ConsentState>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { version?: number; choice?: Choice; at?: string };
        const ageMs = saved.at ? Date.now() - new Date(saved.at).getTime() : Number.POSITIVE_INFINITY;
        if (saved.version === CONSENT_VERSION && ageMs < CONSENT_TTL_MS && (saved.choice === "accepted" || saved.choice === "declined")) {
          setState(saved.choice);
          return;
        }
      }
    } catch {
      // corrupted/unavailable storage → ask again
    }
    setState("unset");
  }, []);

  const decide = (next: Choice) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: CONSENT_VERSION, choice: next, at: new Date().toISOString() }),
      );
    } catch {
      // storage unavailable (e.g. private mode) — choice applies to this session only
    }
    setState(next);
  };

  return (
    <>
      {state === "accepted" ? <Analytics /> : null}

      {state === "unset" ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-50 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
        >
          <div className="animate-[consent-in_.4s_ease-out] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-navy-900/20 dark:border-navy-600 dark:bg-navy-800 dark:shadow-black/50">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-skyblue-100 text-skyblue-600 dark:bg-navy-700 dark:text-skyblue-300">
                <Cookie size={18} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-sm font-bold text-navy-900 dark:text-white">We value your privacy</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                  We use cookies and similar technologies to remember your choice, and — only with your consent —
                  privacy-friendly analytics to see which pages are helpful. Read our{" "}
                  <Link href="/cookies-policy" className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">
                    Cookies Policy
                  </Link>
                  .
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                  <button type="button" onClick={() => decide("accepted")} className="btn-primary">
                    <Check size={15} aria-hidden="true" /> Accept all
                  </button>
                  <button type="button" onClick={() => decide("declined")} className="btn-outline">
                    <X size={15} aria-hidden="true" /> Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
