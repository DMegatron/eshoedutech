import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

/** Static contact details — no form, no email integration */
export function ContactInfo() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white">
      <div className="container-max py-14 sm:py-20">
        <SectionHeading
          align="center"
          eyebrow="Contact Us"
          title="Visit or call our Sector V centre"
          description="Admissions are open — reach us on phone or email, or drop by the centre during working hours."
        />

        <div className="mx-auto mt-9 sm:mt-12 grid max-w-4xl grid-cols-3 gap-2 lg:gap-5">
          <a href={site.phoneHref} className="card card-hover flex flex-col items-center gap-2 p-6 text-center">
            <Phone size={20} className="text-skyblue-500" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Call Us</p>
            <p className="text-sm font-semibold text-navy-900">{site.phone}</p>
          </a>
          <a href={`mailto:${site.email}`} className="card card-hover flex flex-col items-center gap-2 p-6 text-center">
            <Mail size={20} className="text-skyblue-500" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Us</p>
            <p className="break-all text-sm font-semibold text-navy-900">{site.email}</p>
          </a>
          <div className="card flex flex-col items-center gap-2 p-6 text-center">
            <MapPin size={20} className="text-skyblue-500" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Visit Us</p>
            <p className="text-sm font-semibold text-navy-900">{site.address.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
