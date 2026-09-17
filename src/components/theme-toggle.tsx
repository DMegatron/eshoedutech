"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "esho-theme";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "Device", icon: Monitor },
];

function systemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/** Mirrors the pre-paint init script in layout.tsx */
function applyResolved(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && systemDark());
  const el = document.documentElement;
  el.classList.toggle("dark", dark);
  el.style.colorScheme = dark ? "dark" : "light";
}

/** Header control: Light / Dark / Device (system) with a persisted choice. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let saved: Theme = "system";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "light" || raw === "dark" || raw === "system") saved = raw;
    } catch {
      // storage unavailable (e.g. private mode) — fall back to system
    }
    setTheme(saved);
    applyResolved(saved); // idempotent — guarantees class matches saved choice
    setMounted(true);
  }, []);

  // While in "Device" mode, follow OS theme changes live.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyResolved("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: Theme) => {
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // choice still applies for this session
    }
    applyResolved(next);
    setOpen(false);
  };

  const ActiveIcon = OPTIONS.find((o) => o.value === theme)?.icon ?? Monitor;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change color theme"
        title="Theme: Light / Dark / Device"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-navy-800 transition-colors hover:border-skyblue-400 hover:text-skyblue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-skyblue-400 dark:border-navy-600 dark:bg-navy-800 dark:text-slate-200 dark:hover:border-skyblue-400 dark:hover:text-skyblue-400"
      >
        {mounted ? <ActiveIcon size={18} aria-hidden="true" /> : <Monitor size={18} aria-hidden="true" />}
      </button>

      {open && mounted && (
        <div
          role="menu"
          aria-label="Color theme"
          className="absolute right-0 top-12 z-50 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-navy-900/10 dark:border-navy-700 dark:bg-navy-800"
        >
          {OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === o.value}
              onClick={() => choose(o.value)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                theme === o.value
                  ? "bg-skyblue-50 text-skyblue-700 dark:bg-navy-700 dark:text-skyblue-300"
                  : "text-slate-600 hover:bg-skyblue-50/60 hover:text-skyblue-700 dark:text-slate-300 dark:hover:bg-navy-700/60 dark:hover:text-skyblue-300"
              )}
            >
              <o.icon size={15} aria-hidden="true" />
              {o.label}
              {theme === o.value && <Check size={14} className="ml-auto" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
