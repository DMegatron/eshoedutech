import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Esho EDUTECH",
  description:
    "How Esho EDUTECH collects, uses, stores and protects your personal information — and the rights you have over it under the DPDP Act, 2023.",
};

const LAST_UPDATED = "17 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      current="/privacy-policy"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro="This Privacy Policy explains what personal information Esho EDUTECH collects through this website and our training centre, why we collect it, how it is used and shared, and the choices and rights you have over your data. By using this website or submitting an enquiry, you agree to the practices described below."
    >
      <LegalSection heading="1. Who we are">
        <p>
          Esho EDUTECH is a classroom-based IT training centre at {site.address.join(", ")}, offering courses in
          hardware, networking, Microsoft, Cisco and Linux technologies. For the purposes of India&apos;s Digital
          Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), Esho EDUTECH acts as the data fiduciary for
          personal information collected through this website.
        </p>
        <p>
          You can reach us at <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a> or{" "}
          <a href={site.phoneHref} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.phone}</a> about
          anything in this policy.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information we collect">
        <p>We keep collection minimal. We gather only what is needed to advise you and run our training services:</p>
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">Information you give us.</strong> When you submit the enquiry form: your full name and phone number (required), and optionally your email address, the course or package you are interested in, your preferred learning mode and a free-text message. Please do not include passwords, financial details or government ID numbers in the message field.</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Information collected automatically.</strong> With your consent, Vercel Web Analytics records aggregated, anonymised usage statistics such as pages viewed, referral source, approximate country, and device/browser type. It does not identify you personally and loads only after you accept cookies.</span>,
            <span key="c"><strong className="font-semibold text-navy-800 dark:text-slate-200">Direct communications.</strong> If you call, email or message us, we keep a record of that correspondence and the details you share.</span>,
          ]}
        />
        <p>
          We do not collect payment card details through this website (there are no online payments), and the website
          has no user accounts or passwords.
        </p>
      </LegalSection>

      <LegalSection heading="3. How we use your information">
        <LegalList
          items={[
            "Respond to your enquiry and recommend a suitable course or package.",
            "Contact you by phone, SMS, WhatsApp or email about your enquiry or enrolment.",
            "Maintain records of enquiries, admissions and student progress.",
            "Understand which pages are useful and improve the website, using aggregate analytics.",
            "Meet legal, tax or regulatory obligations where they apply.",
          ]}
        />
        <p>We do not use your information for automated profiling or decisions that produce legal effects on you.</p>
      </LegalSection>

      <LegalSection heading="4. Consent to be contacted">
        <p>
          When you submit the enquiry form, you give us explicit consent to contact you about your enquiry through the
          details you provided. You can withdraw this consent at any time by emailing us — withdrawal does not affect
          the lawfulness of anything done before it.
        </p>
      </LegalSection>

      <LegalSection heading="5. When we share information">
        <p>We do not sell, rent or trade personal information. We disclose it only in these limited cases:</p>
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">Service providers (processors).</strong> Our website is hosted and analysed by Vercel, Inc., which processes data on our behalf under its own privacy commitments. Email and messaging providers similarly handle the messages we exchange with you.</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Legal requirements.</strong> Where disclosure is required by law, regulation, or a valid request from a competent authority.</span>,
          ]}
        />
        <p>This website does not use advertising networks, social-media trackers or data brokers.</p>
      </LegalSection>

      <LegalSection heading="6. Cookies and tracking">
        <p>
          Our use of cookies and similar technologies is described in our{" "}
          <a href="/cookies-policy" className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">Cookies Policy</a>. In
          short: one strictly-necessary record remembers your consent choice, and analytics runs only after you accept.
        </p>
      </LegalSection>

      <LegalSection heading="7. How long we keep data">
        <p>
          Enquiry records are kept for up to 24 months from our last contact with you, unless you enrol — in which case
          relevant details become part of your student record. Data is securely deleted or anonymised once the retention
          period ends. See our Data Policy for the full schedule.
        </p>
      </LegalSection>

      <LegalSection heading="8. Your rights">
        <p>Under the DPDP Act, 2023 you have the right to:</p>
        <LegalList
          items={[
            "Access a summary of the personal data we hold about you.",
            "Request correction or updating of inaccurate or incomplete data.",
            "Request erasure of your data when it is no longer needed.",
            "Withdraw consent at any time, including consent to be contacted.",
            "Raise a grievance and have it addressed.",
          ]}
        />
        <p>
          To exercise any of these, email us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>{" "}
          with &ldquo;Privacy request&rdquo; in the subject. We may need to verify your identity before acting, and we
          aim to respond within 15 days.
        </p>
      </LegalSection>

      <LegalSection heading="9. How we protect your information">
        <p>
          Data travels to us over encrypted HTTPS/TLS connections, access is limited to admissions staff on a
          need-to-know basis, and we apply reasonable technical and organisational safeguards. No method of transmission
          or storage is 100% secure, so we cannot guarantee absolute security — but we treat protection as an ongoing
          responsibility.
        </p>
      </LegalSection>

      <LegalSection heading="10. Children's privacy">
        <p>
          Our courses are intended for learners aged 15 and above. If you are under 18, please involve a parent or
          guardian before submitting your details. We do not knowingly collect personal data from children without
          guardian consent; contact us to have any such data removed.
        </p>
      </LegalSection>

      <LegalSection heading="11. Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top shows the current
          version, and material changes will be highlighted on this page.
        </p>
      </LegalSection>

      <LegalSection heading="12. Contact and grievances">
        <p>
          For privacy questions or complaints, contact our grievance contact at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>,{" "}
          call <a href={site.phoneHref} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.phone}</a>, or
          write to {site.address.join(", ")}. We aim to acknowledge grievances within 48 hours.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
