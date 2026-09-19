"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Soft shadow under the header once the page starts scrolling */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-12px_rgba(11,32,56,0.18)]"
      )}
    >
      <div className="container-max flex h-14 sm:h-[68px] items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" onClick={closeMenu} className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label="Esho EDUTECH home">
          <Image
            src="/logo-mark.png"
            alt="Esho EDUTECH"
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            priority
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-base font-bold text-navy-900 sm:text-lg">
              Esho <span className="text-skyblue-500">{site.nameSuffix}</span>
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-skyblue-50 hover:text-skyblue-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#contact" className="btn-primary hidden py-2 text-xs sm:inline-flex sm:px-4">
            Enquire Now <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-navy-800 transition-colors hover:border-skyblue-400 hover:text-skyblue-600 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-max flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:bg-skyblue-50 hover:text-skyblue-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <a
                href={site.phoneHref}
                className="rounded-lg bg-skyblue-50 px-3 py-2.5 text-sm font-semibold text-skyblue-700 text-center"
              >
                Call: {site.phone}
              </a>
              <Link href="/#contact" onClick={closeMenu} className="btn-primary w-full py-2 text-xs">
                Enquire Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
