"use client";

import { useState } from "react";
import { business } from "@/data/business";

/**
 * Enquiry form, institutional register.
 *
 * There is no form backend configured yet, and the site does not pretend
 * otherwise, a form that silently discards submissions is the worst defect a
 * conversion site can ship. Until FORM_ENDPOINT is set, submitting composes the
 * enquiry into a WhatsApp message on the real number, which actually delivers.
 * Email is offered alongside. To switch to a real backend later, set
 * FORM_ENDPOINT and nothing else changes.
 */
const FORM_ENDPOINT = "" as string; // TODO: point at a form service or route handler

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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (FORM_ENDPOINT) {
      setSending(true);
      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        form.reset();
      } finally {
        setSending(false);
      }
      return;
    }

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
    </form>
  );
}
