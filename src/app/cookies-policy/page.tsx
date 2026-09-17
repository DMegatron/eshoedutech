import type { Metadata } from "next";
import { LegalList, LegalPage, LegalSection } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cookies Policy | Esho EDUTECH",
  description:
    "What cookies and similar technologies the Esho EDUTECH website uses, what it deliberately does not use, and how to control or withdraw your consent.",
};

const LAST_UPDATED = "17 September 2026";

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      current="/cookies-policy"
      title="Cookies Policy"
      lastUpdated={LAST_UPDATED}
      intro="This policy explains what cookies and similar technologies are, which ones this website uses — and, just as importantly, which it does not — and how you control your choices at any time."
    >
      <LegalSection heading="1. What are cookies and similar technologies?">
        <p>
          Cookies are small text files a website stores in your browser. &ldquo;Similar technologies&rdquo; include
          localStorage — key-value storage kept inside your browser. We store our consent record in localStorage rather
          than in a cookie so that it never travels to our servers or any third party on subsequent visits.
        </p>
      </LegalSection>

      <LegalSection heading="2. What this website actually uses">
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">Strictly necessary — consent memory.</strong> A localStorage entry named <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] text-navy-800 dark:bg-navy-700 dark:text-slate-200">esho-cookie-consent</code> remembers whether you accepted or declined, so the banner doesn&apos;t nag you on every visit. It expires after 180 days, after which you are asked again. It is stored only in your browser.</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Analytics — only after you accept.</strong> If you choose &ldquo;Accept all&rdquo;, Vercel Web Analytics measures page popularity (pages viewed, referral source, approximate country, device type). It is a cookieless, privacy-friendly tool: it sets no tracking cookies and reports anonymised aggregates, not profiles of individual visitors.</span>,
            <span key="c"><strong className="font-semibold text-navy-800 dark:text-slate-200">Advertising and social trackers — none.</strong> This website does not serve ads and does not embed advertising networks, social-media pixels or cross-site trackers of any kind.</span>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. Your consent choices">
        <p>On your first visit, a banner offers two choices:</p>
        <LegalList
          items={[
            <span key="a"><strong className="font-semibold text-navy-800 dark:text-slate-200">Accept all</strong> — the consent record is saved and analytics begins measuring visits.</span>,
            <span key="b"><strong className="font-semibold text-navy-800 dark:text-slate-200">Decline</strong> — the choice is saved and analytics never loads. The website remains fully usable either way.</span>,
          ]}
        />
        <p>No non-essential technology runs before you make a choice; the default state is privacy-preserving.</p>
      </LegalSection>

      <LegalSection heading="4. How to change or withdraw consent">
        <p>
          Your consent choice is remembered for 180 days. To change it earlier, clear this site&apos;s data in your
          browser (for example, in Chrome or Edge: Settings → Privacy → Clear browsing data → &ldquo;Cookies and other
          site data&rdquo; for this site; the option names differ slightly in Firefox and Safari). The consent banner
          will re-appear on your next visit and you can choose again.
        </p>
      </LegalSection>

      <LegalSection heading="5. Managing cookies in your browser">
        <p>
          Every modern browser lets you view, block or delete cookies for individual sites. Blocking all cookies for
          this site will not break anything — none of its features depend on cookies. The consent record in localStorage
          is cleared the same way you clear site data.
        </p>
      </LegalSection>

      <LegalSection heading="6. Third-party services">
        <p>
          At present the only third party involved is Vercel (hosting and analytics), described above. If we ever embed
          third-party content such as videos or maps, this policy will be updated to list the cookies or storage those
          services set.
        </p>
      </LegalSection>

      <LegalSection heading="7. Changes and contact">
        <p>
          We may update this policy as our use of technology evolves; the &ldquo;last updated&rdquo; date at the top
          shows the current version. Questions about cookies or consent can be sent to{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
