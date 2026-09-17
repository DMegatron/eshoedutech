import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";
import { rateLimit } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ENQUIRY_TO = process.env.ENQUIRY_TO ?? site.email;
const ENQUIRY_FROM =
  process.env.ENQUIRY_FROM ??
  // Default is Resend's test sender: it only delivers to the Resend account
  // owner. After verifying a domain at resend.com/domains, set ENQUIRY_FROM
  // to e.g. "Esho EDUTECH <enquiries@eshoedutech.com>".
  "Esho EDUTECH Website <onboarding@resend.dev>";

const MAX_LEN = 2000;

function field(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );
}

/** Verify a reCAPTCHA v2 token against Google's siteverify endpoint. */
async function verifyCaptcha(
  token: string,
  ip: string,
  secret: string,
): Promise<{ ok: boolean; codes: string[] }> {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      cache: "no-store",
    });
    const json = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    return { ok: json.success === true, codes: json["error-codes"] ?? [] };
  } catch (err) {
    console.error("[enquiry] reCAPTCHA verify request failed:", err);
    return { ok: false, codes: ["siteverify-unreachable"] };
  }
}

/** Package names are stored as "A+ + N+ + MCSE"; show them in the current "A+ · N+ · MCSE" style. */
function prettyCourse(s: string): string {
  return s.replace(/ \+ /g, " · ");
}

/**
 * Enquiry intake endpoint — emails each submission to ENQUIRY_TO via Resend.
 * Note: with the default `onboarding@resend.dev` sender, Resend only delivers
 * to the Resend account owner's email until a sending domain is verified.
 */
export async function POST(req: Request) {
  // Rate limit: 2 enquiries per 10 minutes per client IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const rl = await rateLimit(`enquiry:${ip}`, 2, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: `Too many requests from this network — please wait ${Math.ceil(
          rl.retryAfterSeconds / 60,
        )} min and try again, or call us directly.`,
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } },
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = field(data.name);
  const phone = field(data.phone);
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "Name and phone are required." }, { status: 400 });
  }

  // Honeypot — humans never see this field; pretend success to bots.
  if (field(data.company)) {
    return NextResponse.json({ ok: true });
  }

  // reCAPTCHA v2 — enforced when RECAPTCHA_SECRET_KEY is configured
  const captchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (captchaSecret) {
    const token = field(data.captchaToken);
    const result = token ? await verifyCaptcha(token, ip, captchaSecret) : { ok: false, codes: ["token-missing"] };
    if (!result.ok) {
      console.error("[enquiry] reCAPTCHA rejected:", result.codes);
      return NextResponse.json(
        {
          ok: false,
          error: "reCAPTCHA verification failed — please tick the box and try again.",
          codes: result.codes,
        },
        { status: 400 },
      );
    }
  }

  const email = field(data.email);
  const course = prettyCourse(field(data.course) || "General enquiry");
  const mode = field(data.mode) || "Classroom";
  const message = field(data.message);

  if (!resend) {
    console.error("[enquiry] RESEND_API_KEY is not configured. Enquiry was not emailed:", JSON.stringify({ name, phone }));
    return NextResponse.json(
      { ok: false, error: "Email service is not configured yet — please call us instead." },
      { status: 500 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Interested in", course],
    ["Preferred mode", mode],
    ["Message", message || "—"],
  ];

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#1c3246">
  <h1 style="margin:0 0 16px;font-size:20px;color:#0f4b82">New website enquiry</h1>
  <table style="border-collapse:collapse;width:100%;max-width:520px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #dbe7f3;background:#e8f3fc;font-weight:bold;width:150px;vertical-align:top">${esc(
            k,
          )}</td><td style="padding:8px 12px;border:1px solid #dbe7f3">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="margin:16px 0 0;font-size:12px;color:#667085">
    Submitted via the eshoedutech.com enquiry form.
    ${email ? "Reply to this email to respond directly to the sender." : "No email provided — contact by phone instead."}
  </p>
</body></html>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const { error } = await resend.emails.send({
      from: ENQUIRY_FROM,
      to: [ENQUIRY_TO],
      replyTo: email || undefined,
      subject: `New enquiry — ${name} (${course})`,
      html,
      text,
    });
    if (error) {
      console.error("[enquiry] resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now — please call us instead." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now — please call us instead." },
      { status: 502 },
    );
  }
}
