import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ConsoleNotice } from "@/components/console-notice";
import { CookieConsent } from "@/components/cookie-consent";
import { BackToTop } from "@/components/back-to-top";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** Runs pre-paint so the saved/system theme applies without a flash. Matches ThemeToggle logic. */
const themeInitScript = `(function(){try{var t=localStorage.getItem('esho-theme')||'system';var m=window.matchMedia('(prefers-color-scheme: dark)');var d=t==='dark'||(t==='system'&&m.matches);var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Esho EDUTECH | Practical IT Training — Hardware, Networking, Microsoft, Cisco & Linux in Sector V, Kolkata",
  description:
    "Classroom-based IT training at Sector V, Kolkata: A+, N+, Microsoft, CCNA, CCNP and Linux courses — with strong practical/lab learning. Six packages starting from ₹4,999.",
  keywords: [
    "IT training Kolkata",
    "A+ course Kolkata",
    "networking course Sector V",
    "CCNA training Kolkata",
    "MCSE training",
    "Linux administration course",
    "practical IT lab training",
    "Esho EDUTECH",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${grotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-slate-600 dark:bg-navy-900 dark:text-slate-300">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ConsoleNotice />
        {children}
        <CookieConsent />
        <BackToTop />
      </body>
    </html>
  );
}
