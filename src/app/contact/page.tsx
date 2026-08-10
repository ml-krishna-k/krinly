import type { Metadata } from "next";
import { business } from "@/data/business";
import { EnquiryForm } from "@/components/EnquiryForm";
import { MapEmbed } from "@/components/MapEmbed";

export const metadata: Metadata = {
  title: "Request a meeting",
  description:
    "Talk to Krinly Technologies about an innovation lab, a college program, or a technology project. You'll speak with the founder directly.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main id="main" className="flex-1">
      <section className="u-grid u-grid-fade px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-12">
        <p className="u-spec mb-8 h-enter">Contact</p>
        <h1 className="u-display-lg max-w-[16ch] h-mask" style={{ ["--d" as string]: "100ms" }}>
          Request a meeting.
        </h1>
        <p className="u-measure text-fg-muted text-body-lg mt-8">
          Tell us about your institution or project. A short conversation is
          enough to see whether there&rsquo;s a fit, you&rsquo;ll speak with{" "}
          {business.founder} directly, not an account manager.
        </p>
      </section>

      {/* Form on ink */}
      <section className="bg-ink text-on-ink u-grid-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)] mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="u-spec mb-8">Direct</p>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${business.contact.email}`}
                className="text-[1.125rem] hover:text-accent transition-colors break-all"
              >
                {business.contact.email}
              </a>
              <a
                href={`tel:${business.contact.phoneRaw}`}
                className="text-[1.125rem] hover:text-accent transition-colors"
              >
                {business.contact.phone}
              </a>
              {business.contact.whatsapp && (
                <a
                  href={`https://wa.me/${business.contact.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-label-sm text-on-ink-muted hover:text-on-ink transition-colors underline underline-offset-4 w-fit"
                >
                  WhatsApp →
                </a>
              )}
            </div>
            <p className="u-label-sm text-on-ink-subtle mt-10 mb-2">Office</p>
            <address className="not-italic text-on-ink-muted text-body-sm max-w-[24ch]">
              {business.location.street},<br />
              {business.location.city} {business.location.postalCode}
            </address>
            {business.credibility.msmeRegistered && (
              <p className="u-label-sm text-on-ink-muted mt-6">
                <span className="text-accent">◆</span> MSME · Government of India
              </p>
            )}
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* Find us */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
          <div className="lg:col-span-6">
            <p className="u-spec mb-6">Find us</p>
            <h2 className="u-display-sm !text-[clamp(1.5rem,2.6vw,2.25rem)] max-w-[16ch]">
              {business.location.street}
            </h2>
            <p className="text-fg-muted mt-3">
              {business.location.city}, {business.location.region}{" "}
              {business.location.postalCode}
            </p>
          </div>
        </div>
        <MapEmbed className="aspect-[16/10] md:aspect-[21/9] border border-edge" />
      </section>
    </main>
  );
}
