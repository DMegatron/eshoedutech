import Image from "next/image";
import Link from "next/link";
import { legalLinks, navLinks, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-max grid grid-cols-3 gap-3 py-12 sm:py-16 lg:gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-mark.png" alt="Esho EDUTECH" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold">
                Esho <span className="text-skyblue-400">{site.nameSuffix}</span>
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/80">{site.tagline}</p>
          <p className="mt-4 text-sm text-navy-100/70">
            <a href={site.phoneHref} className="block hover:text-skyblue-300">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="mt-1 block hover:text-skyblue-300">{site.email}</a>
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-skyblue-400">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-navy-100/80 transition-colors hover:text-skyblue-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal policies">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-skyblue-400">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-navy-100/80 transition-colors hover:text-skyblue-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-2 py-4 text-[13px] text-navy-100/60 sm:flex-row">
          <p>{site.copyright}</p>
          <p>Classroom IT Training · {site.location}</p>
        </div>
      </div>
    </footer>
  );
}
