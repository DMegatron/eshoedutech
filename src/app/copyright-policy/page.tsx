import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Copyright Policy | Esho EDUTECH",
  description:
    "Who owns the content on the Esho EDUTECH website, how third-party certification trademarks are treated, and how to report a copyright concern.",
};

const LAST_UPDATED = "17 September 2026";

export default function CopyrightPolicyPage() {
  return (
    <LegalPage
      current="/copyright-policy"
      title="Copyright Policy"
      lastUpdated={LAST_UPDATED}
      intro="This policy explains who owns the content on this website, how you may (and may not) use it, how third-party certification trademarks are treated, and how to report a copyright concern."
    >
      <LegalSection heading="1. Ownership of website content">
        <p>
          Unless stated otherwise, all content on this website — text, page layouts, graphics, illustrations,
          photographs, the Esho EDUTECH logo and the overall design — is owned by or licensed to Esho EDUTECH and is
          protected under the Copyright Act, 1957 (India) and applicable international copyright laws. All rights not
          expressly granted in this policy are reserved.
        </p>
      </LegalSection>

      <LegalSection heading="2. Trademarks and third-party names">
        <p>
          The &ldquo;Esho EDUTECH&rdquo; name and logo are trademarks of Esho EDUTECH. You may not use them in any way
          that suggests our affiliation or endorsement without prior written permission.
        </p>
        <p>
          CompTIA&reg;, A+&reg; and Network+&reg; are registered trademarks of CompTIA, Inc. Microsoft&reg; and
          Microsoft certification titles are trademarks of the Microsoft group of companies. Cisco&reg;, CCNA&reg; and
          CCNP&reg; are trademarks of Cisco Systems, Inc. Linux&reg; is a registered trademark of Linus Torvalds. All
          such names are referenced on this website solely to describe the subjects our classroom training prepares
          students for — a nominative, descriptive use.
        </p>
        <p>
          Esho EDUTECH is an independent training centre and is not affiliated with, sponsored by, or endorsed by these
          organisations unless expressly stated. Certification exams are conducted by the respective certification
          bodies on their own terms.
        </p>
      </LegalSection>

      <LegalSection heading="3. What you may do">
        <LegalList
          items={[
            "View and temporarily cache pages of this website for personal, non-commercial use.",
            "Share links to any public page.",
            "Quote brief excerpts with clear attribution to Esho EDUTECH and a link back to this website, to the extent permitted as fair dealing under applicable law.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="4. What you may not do">
        <p>Without our prior written consent, you may not:</p>
        <LegalList
          items={[
            "Copy, reproduce, republish, upload, transmit or distribute website content in any form.",
            "Modify the content or create derivative works based on it.",
            "Use this content for any commercial purpose or to build a competing product or service.",
            "Scrape, crawl, mirror or bulk-download this site or its content, including use in datasets for machine learning or AI training.",
            "Remove or alter copyright, trademark or other proprietary notices.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. Course and study materials">
        <p>
          Study materials, lab guides, slides and any class recordings provided to enrolled students are licensed for
          that student&apos;s personal learning only. They may not be copied, shared, resold or posted on public
          platforms. Course fees pay for training services and access; they do not transfer ownership of the materials.
        </p>
      </LegalSection>

      <LegalSection heading="6. Reporting a copyright concern">
        <p>
          If you believe content on this website infringes your copyright, send a notice to{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>{" "}
          containing:
        </p>
        <LegalList
          items={[
            "Identification of the copyrighted work you claim has been infringed.",
            "The exact URL of the material you believe is infringing.",
            "Your name, address, phone number and email address.",
            "A good-faith statement that the use is not authorised by the copyright owner, its agent or the law.",
            "A statement that the information in your notice is accurate and that you are the owner, or authorised to act on the owner's behalf.",
            "Your physical or electronic signature.",
          ]}
        />
        <p>
          We review notices promptly and will remove or disable access to genuinely infringing material, notifying the
          contributing party where relevant.
        </p>
      </LegalSection>

      <LegalSection heading="7. Repeat infringement">
        <p>
          We may restrict access to our services for users who repeatedly misuse our content or who are the subject of
          repeated valid infringement notices.
        </p>
      </LegalSection>

      <LegalSection heading="8. Changes and contact">
        <p>
          We may update this policy periodically; the &ldquo;last updated&rdquo; date above shows the current version.
          For copyright questions, permissions or licensing enquiries, email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>{" "}
          or write to {site.address.join(", ")}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
