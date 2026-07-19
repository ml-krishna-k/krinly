"use client";

import { useState } from "react";
import { business } from "@/data/business";

/**
 * Project enquiry.
 *
 * There is no form backend configured yet, and the site does not pretend
 * otherwise — a form that silently discards submissions is the single worst
 * defect found across the researched portfolio, and it would be indefensible
 * here. Until FORM_ENDPOINT is set, submitting composes the enquiry into a
 * WhatsApp message on Krishna's real number, which actually delivers. Email is
 * offered alongside it for anyone who prefers it.
 *
 * To switch to a real backend later: set FORM_ENDPOINT and nothing else in this
 * file needs to change.
 */
const FORM_ENDPOINT = "" as string; // TODO: point at a form service or route handler

const BUDGETS = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

const TIMELINES = ["As soon as possible", "1–2 months", "3+ months", "Exploring"];

const field =
  "w-full bg-transparent border-b border-edge-on-ink py-3 text-on-ink placeholder:text-on-ink-subtle focus:border-accent focus:outline-none transition-colors duration-[var(--duration-micro)]";

const labelCls = "u-label-sm text-on-ink-subtle block mb-2";

export function EnquiryForm() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

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

    // No endpoint: hand the composed enquiry to a channel that genuinely works.
    const message = [
      `New project enquiry — ${business.name}`,
      "",
      `Name: ${data.name || "—"}`,
      `Company: ${data.company || "—"}`,
      `Email: ${data.email || "—"}`,
      `Current site: ${data.website || "—"}`,
      `Needs: ${data.need || "—"}`,
      `Budget: ${data.budget || "—"}`,
      `Timeline: ${data.timeline || "—"}`,
      "",
      `${data.details || ""}`,
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
        <label className={labelCls} htmlFor="company">
          Company
        </label>
        <input id="company" name="company" autoComplete="organization" className={field} />
      </div>

      <div>
        <label className={labelCls} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="website">
          Current website
        </label>
        <input
          id="website"
          name="website"
          inputMode="url"
          placeholder="Optional"
          className={field}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="need">
          What do you need?
        </label>
        <input
          id="need"
          name="need"
          placeholder="A new site, a redesign, a product build…"
          className={field}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor="budget">
          Approximate budget
        </label>
        <select id="budget" name="budget" className={`${field} appearance-none`}>
          <option value="">Select</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b} className="text-ink">
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="timeline">
          Timeline
        </label>
        <select id="timeline" name="timeline" className={`${field} appearance-none`}>
          <option value="">Select</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t} className="text-ink">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="details">
          Anything else
        </label>
        <textarea id="details" name="details" rows={4} className={`${field} resize-none`} />
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="u-label border border-on-ink px-7 py-4 hover:bg-paper hover:text-ink hover:border-paper transition-colors duration-[var(--duration-micro)] disabled:opacity-50"
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
