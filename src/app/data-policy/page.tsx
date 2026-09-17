import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Data Policy | Esho EDUTECH",
  description:
    "How Esho EDUTECH handles the data behind its website and training operations: categories stored, security measures, retention schedule and breach response.",
};

const LAST_UPDATED = "17 September 2026";

export default function DataPolicyPage() {
  return (
    <LegalPage
      current="/data-policy"
      title="Data Policy"
      lastUpdated={LAST_UPDATED}
      intro="This Data Policy describes how Esho EDUTECH handles the data behind our website and day-to-day training operations: what we store, where it lives, how long we keep it and how it is protected. It complements our Privacy Policy and Cookies Policy, which you should read together with this page."
    >
      <LegalSection heading="1. Scope">
        <p>
          This policy covers data handled through this website and data maintained as part of our classroom training
          operations. It applies to website visitors, enquirers (prospective students), and current and former
          students.
        </p>
      </LegalSection>

      <LegalSection heading="2. Categories of data we handle">
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">Enquiry (lead) data.</strong> Name, phone number, optional email address, course or package of interest, preferred learning mode, your message, and the submission timestamp — captured by the website backend when the enquiry form is used.</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Student records.</strong> Enrolment details, batch and attendance records, payment receipts and certification progress. These are collected at the training centre, not through this website.</span>,
            <span key="c"><strong className="font-semibold text-navy-800 dark:text-slate-200">Website usage data.</strong> Aggregated, anonymised analytics collected only after cookie consent — see our Cookies Policy.</span>,
            <span key="d"><strong className="font-semibold text-navy-800 dark:text-slate-200">System logs.</strong> Standard hosting logs (request timestamps, IP addresses, user agents) retained by our hosting provider for security, debugging and performance.</span>,
          ]}
        />
      </LegalSection>


      <LegalSection heading="3. Where data is stored and how it moves">
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">In transit.</strong> All submissions to this website travel over encrypted HTTPS/TLS connections.</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Hosting.</strong> The website is hosted on Vercel; enquiry data submitted through the site is processed and logged on that infrastructure and relayed to the admissions team.</span>,
            <span key="c"><strong className="font-semibold text-navy-800 dark:text-slate-200">Email.</strong> Correspondence is kept in the admissions mailbox ({site.email}).</span>,
            <span key="d"><strong className="font-semibold text-navy-800 dark:text-slate-200">On-premises records.</strong> Student records are maintained at our Sector V, Kolkata centre with restricted staff access.</span>,
          ]}
        />
        <p>
          Because hosting and email providers operate distributed infrastructure, some processing may occur outside
          India; each provider is bound by its own published data-protection commitments.
        </p>
      </LegalSection>

      <LegalSection heading="4. Security measures">
        <LegalList
          items={[
            "Encryption of data in transit via HTTPS/TLS.",
            "Access to enquiry and student data restricted to admissions staff on a need-to-know basis.",
            "Password-protected, access-controlled systems supporting the website's hosting and email.",
            "Periodic review of what we store, with deletion of data we no longer need.",
          ]}
        />
        <p>
          No safeguard is perfect. If a breach occurs despite these measures, we follow the response process in section
          7.
        </p>
      </LegalSection>

      <LegalSection heading="5. Retention and deletion schedule">
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">Enquiry leads:</strong> up to 24 months from last contact, then deleted or irreversibly anonymised (unless you enrol, in which case the details become part of your student record).</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Student records:</strong> for the duration of training, plus up to 5 years afterwards for certificates, references and statutory requirements.</span>,
            <span key="c"><strong className="font-semibold text-navy-800 dark:text-slate-200">Server/hosting logs:</strong> per the hosting provider's default windows (typically 30–90 days).</span>,
            <span key="d"><strong className="font-semibold text-navy-800 dark:text-slate-200">Analytics data:</strong> aggregated and anonymised, retained per the provider's limits.</span>,
            <span key="e"><strong className="font-semibold text-navy-800 dark:text-slate-200">Cookie-consent records:</strong> stored in your browser for 180 days, then you are asked again.</span>,
          ]}
        />
        <p>You may ask for earlier deletion — see section 8.</p>
      </LegalSection>

      <LegalSection heading="6. Sharing and processors">
        <p>
          We do not sell or broker data. Data is processed only for the purposes for which it was collected. Service
          providers that handle data on our behalf — currently Vercel (hosting and analytics) and our email provider —
          act under their own privacy policies and security commitments.
        </p>
      </LegalSection>

      <LegalSection heading="7. Data breach response">
        <p>If we become aware of a personal-data breach, we will:</p>
        <LegalList
          items={[
            "Contain and assess the breach promptly.",
            "Notify affected individuals, and the authorities (including CERT-In) where Indian law requires.",
            "Document the incident and review our safeguards to prevent recurrence.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="8. Your data controls">
        <p>
          You can request access to, correction of, or deletion of the enquiry data we hold about you, and you can
          withdraw consent to be contacted, at any time by emailing{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>.
          Your full set of rights is described in our{" "}
          <a href="/privacy-policy" className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">Privacy Policy</a>.
        </p>
      </LegalSection>

      <LegalSection heading="9. Governance and contact">
        <p>
          This policy is reviewed at least annually and whenever our data practices materially change. Questions about
          data handling can be sent to{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>{" "}
          or to {site.address.join(", ")}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
