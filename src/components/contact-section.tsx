"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { courses } from "@/data/courses";
import { packages } from "@/data/packages";
import { site } from "@/data/site";

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-navy-900 placeholder-slate-400 transition-colors focus:border-skyblue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-skyblue-400/40 dark:border-navy-600 dark:bg-navy-800 dark:text-slate-100 dark:placeholder-slate-500";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaDark, setCaptchaDark] = useState(false);
  const captchaRef = useRef<ReCAPTCHA>(null);

  // Keep the widget theme in sync with the site's .dark toggle on <html>
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setCaptchaDark(root.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setError("Please complete the reCAPTCHA check before sending.");
      setStatus("error");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    if (captchaToken) data.captchaToken = captchaToken;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      // reCAPTCHA tokens are single-use — always reset for the next attempt
      captchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  return (
    <section id="contact" className="border-t border-skyblue-100 bg-skyblue-50/70 dark:border-navy-700 dark:bg-navy-800/40">
      <div className="container-max grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Enquire Now"
              title="Still have a question? Ask us."
              description="Send us your details and the course or package you're interested in — an advisor will help you choose the right path."
            />
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-navy-900 dark:text-white">Call us</dt>
                <dd>
                  <a href={site.phoneHref} className="text-skyblue-700 hover:underline dark:text-skyblue-400">{site.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900 dark:text-white">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-skyblue-700 hover:underline dark:text-skyblue-400">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900 dark:text-white">Visit</dt>
                <dd className="text-slate-600 dark:text-slate-300">{site.address.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form onSubmit={handleSubmit} className="card space-y-3.5 p-5 sm:p-7" noValidate>
            {status === "sent" ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center" role="status">
                <CheckCircle2 size={44} className="text-skyblue-500" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-navy-900 dark:text-white">Enquiry received</h3>
                <p className="max-w-xs text-sm text-slate-600 dark:text-slate-300">
                  Thank you! An advisor will reach out shortly to discuss courses and packages.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-2 py-2 text-xs">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold text-navy-800 dark:text-slate-200">
                      Full Name <span className="text-skyblue-600">*</span>
                    </label>
                    <input id="contact-name" name="name" required placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-1 block text-xs font-semibold text-navy-800 dark:text-slate-200">
                      Phone <span className="text-skyblue-600">*</span>
                    </label>
                    <input id="contact-phone" name="phone" type="tel" required inputMode="tel" placeholder="10-digit number" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold text-navy-800 dark:text-slate-200">
                    Email
                  </label>
                  <input id="contact-email" name="email" type="email" placeholder="you@example.com" className={inputCls} />
                </div>
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-course" className="mb-1 block text-xs font-semibold text-navy-800 dark:text-slate-200">
                      I'm interested in
                    </label>
                    <select id="contact-course" name="course" className={inputCls} defaultValue="">
                      <option value="">General enquiry</option>
                      <optgroup label="Packages">
                        {packages.map((p) => (
                          <option key={p.slug} value={p.name}>{p.name.replace(/ \+ /g, " · ")} · {p.priceLabel}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Individual Courses">
                        {courses.map((c) => (
                          <option key={c.slug} value={c.code}>{c.code} — {c.focus}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-mode" className="mb-1 block text-xs font-semibold text-navy-800 dark:text-slate-200">
                      Preferred mode
                    </label>
                    <select id="contact-mode" name="mode" className={inputCls} defaultValue="Classroom">
                      <option>Classroom</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold text-navy-800 dark:text-slate-200">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    placeholder="Tell us your goal — e.g. 'I'm new to IT, want to get into networking.'"
                    className={inputCls + " resize-none"}
                  />
                </div>
                {status === "error" && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/50 dark:text-red-300">{error}</p>
                )}
                {/* Honeypot — bots fill this hidden field; the API ignores those submissions */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-company">Company</label>
                  <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                {RECAPTCHA_SITE_KEY && (
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    theme={captchaDark ? "dark" : "light"}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      if (token) {
                        setError("");
                        setStatus("idle");
                      }
                    }}
                    onExpired={() => setCaptchaToken(null)}
                  />
                )}
                <button
                  type="submit"
                  disabled={status === "sending" || (Boolean(RECAPTCHA_SITE_KEY) && !captchaToken)}
                  className="btn-primary w-full sm:w-auto"
                >
                  {status === "sending" && <Loader2 size={15} className="animate-spin" aria-hidden="true" />}
                  {status === "sending" ? "Sending…" : "Send Enquiry"}
                </button>
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  By submitting this form you consent to being contacted about your enquiry and agree to our{" "}
                  <Link href="/privacy-policy" className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">Privacy Policy</Link>{" "}
                  and{" "}
                  <Link href="/cookies-policy" className="font-semibold text-skyblue-700 hover:underline dark:text-skyblue-400">Cookies Policy</Link>.
                </p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}