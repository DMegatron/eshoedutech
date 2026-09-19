import { ContactInfo } from "@/components/contact-info";
import { CourseGrid } from "@/components/course-grid";
import { Hero } from "@/components/hero";
import { PackagesGrid } from "@/components/packages-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <SiteHeader />
      <main>
        <Hero />
        <CourseGrid />
        <PackagesGrid />
        <ContactInfo />
      </main>
      <SiteFooter />
    </div>
  );
}
