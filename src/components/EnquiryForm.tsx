"use client";

import { useState } from "react";
import { business } from "@/data/business";

/**
 * Enquiry form, institutional register.
 *
 * The form never silently discards a submission, the worst defect a conversion
 * site can ship. Two delivery paths, chosen automatically:
 *
 *   1. If a Web3Forms key is set (business.forms.web3formsKey), the submission
 *      is POSTed to Web3Forms, which emails it to the business inbox. No server,
 *      no database — just an email. This is the recommended production path.
 *   2. Otherwise it composes the enquiry into a WhatsApp message on the business
 *      number, which delivers immediately. This is the honest fallback so the
 *      form works today even before the key is pasted in.
 */
/**
 * Web3Forms access key, read from the environment. NEXT_PUBLIC_ is correct here:
 * this key is a public, client-side submission key by design (it only lets a
 * submission be emailed to the address it is bound to). Inlined at build time.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

const INTERESTS = [
  "Schools: Innovation Lab program",
  "Colleges: industry programs & placement",
  "Technology & software",
  "Something else",
];

const field =
  "w-full bg-transparent border-b border-edge-on-ink py-3 text-on-ink placeholder:text-on-ink-subtle focus:border-accent focus:outline-none transition-colors duration-[var(--duration-micro)]";
const labelCls = "u-label-sm text-on-ink-subtle block mb-2";

export function EnquiryForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Path 1: Web3Forms (emails the submission to the business inbox).
    if (WEB3FORMS_KEY) {
      setSending(true);
      setStatus("idle");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New enquiry — ${business.name}`,
            from_name: data.name || "Website enquiry",
            ...data,
          }),
        });
        if (res.ok) {
          form.reset();
          setStatus("sent");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      } finally {
        setSending(false);
      }
      return;
    }

    // Path 2: WhatsApp fallback (delivers today, no backend).
    const message = [
      `New enquiry, ${business.name}`,
      "",
      `Name: ${data.name || "-"}`,
      `Organisation: ${data.org || "-"}`,
      `Role: ${data.role || "-"}`,
      `Email: ${data.email || "-"}`,
      `Phone: ${data.phone || "-"}`,
      `Enquiring about: ${data.interest || "-"}`,
      "",
      `${data.message || ""}`,
    ].join("\n");

    window.open(
      `https://wa.me/${business.contact.phoneRaw}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  // Success state — a submission must be acknowledged, not vanish.
  if (status === "sent") {
    return (
      <div className="border border-edge-on-ink p-8 lg:p-10">
        <p className="u-spec mb-4">Received</p>
        <p className="text-on-ink text-body-lg max-w-[42ch]">
          Thanks, your enquiry is in. {business.founder} will reply to you
          directly, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
      <div>
        <label className={labelCls} htmlFor="name">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>

      <div>
        <label className={labelCls} htmlFor="org">
          Institution / organisation
        </label>
        <input id="org" name="org" autoComplete="organization" className={field} />
      </div>

      <div>
        <label className={labelCls} htmlFor="role">
          Your role
        </label>
        <input
          id="role"
          name="role"
          placeholder="Principal, HOD, founder…"
          className={field}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>

      <div>
        <label className={labelCls} htmlFor="phone">
          Phone
        </label>
        <input id="phone" name="phone" inputMode="tel" autoComplete="tel" className={field} />
      </div>

      <div>
        <label className={labelCls} htmlFor="interest">
          Enquiring about
        </label>
        <select id="interest" name="interest" required defaultValue="" className={`${field} appearance-none`}>
          <option value="" disabled>
            Select
          </option>
          {INTERESTS.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="message">
          What would you like to achieve?
        </label>
        <textarea id="message" name="message" rows={4} className={`${field} resize-none`} />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="u-label bg-paper text-ink px-7 py-4 hover:bg-accent hover:text-on-ink transition-colors duration-[var(--duration-micro)] disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="u-label-sm text-on-ink-subtle">
          or email{" "}
          <a
            href={`mailto:${business.contact.email}`}
            className="text-on-ink-muted hover:text-on-ink underline underline-offset-4"
          >
            {business.contact.email}
          </a>
        </p>
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 u-label-sm text-accent" role="alert">
          Something went wrong sending that. Please email or WhatsApp us instead.
        </p>
      )}
    </form>
  );
}
