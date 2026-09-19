import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Esho EDUTECH",
  description: "Classroom-based IT training in Sector V, Kolkata.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-slate-600">
        {children}
      </body>
    </html>
  );
}
