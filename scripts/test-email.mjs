/**
 * Resend connectivity test — mirrors the "first email" example from the
 * Resend dashboard, but never hardcodes the API key: it reads the key from
 * .env.local (RESEND_API_KEY) just like the real /api/enquiry route does.
 *
 * Run:  node scripts/test-email.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resend } from "resend";

// Load .env.local so this script uses the same key as the website
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const line of readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_xxxxxxxxx") {
  console.error("RESEND_API_KEY is missing in .env.local");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "soujatya2003bhunia@gmail.com",
  subject: "Esho EDUTECH — Resend API test",
  html: "<p>Congrats on sending your <strong>first email</strong> from the Esho EDUTECH project!</p>",
});

if (error) {
  console.error("Send failed:", error);
  process.exit(1);
}
console.log(`Email sent ✓ — id: ${data.id} → check soujatya2003bhunia@gmail.com`);
