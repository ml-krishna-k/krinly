import Link from "next/link";
import { business } from "@/data/business";

/**
 * The footer is the last scene: it restates the one action that matters, 
 * request a meeting, and gives an institutional decision-maker the wayfinding
 * and the credibility signals to act on it.
 *
 * The MSME badge shows the registration the owner asserts. The Udyam NUMBER is
 * appended only when supplied, a government identifier is not invented to fill
 * a slot. No social row until profiles are verified.
 */

const NAV = {
  Programs: [
    { href: "/innovation-labs", label: "Innovation Labs" },
    { href: "/schools", label: "Schools" },
    { href: "/colleges", label: "Colleges" },
  ],
  Company: [
    { href: "/technology", label: "Technology" },
    { href: "/work", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(business.social).filter(([, v]) => v);
  const { credibility } = business;

  return (
    <footer className="bg-ink text-on-ink">
      <div className="u-grid-on-ink px-6 md:px-10 lg:px-16 pt-[var(--space-section)] pb-12">
        {/* Final CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-[var(--space-section)] border-b border-edge-on-ink">
          <div className="lg:col-span-7">
            <p className="u-spec mb-8">Next step</p>
            <h2 className="u-display-md max-w-[15ch]">
              Bring Krinly into your institution.
            </h2>
            <p className="u-measure text-on-ink-muted mt-8">
              A short conversation is enough to see whether an innovation program
              or a technology partnership fits. You&rsquo;ll speak with{" "}
              {business.founder} directly.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-14 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${business.contact.email}`}
                className="u-display-sm !text-[1.6rem] hover:text-accent transition-colors duration-[var(--duration-micro)] break-all"
              >
                {business.contact.email}
              </a>
              <a
                href={`tel:${business.contact.phoneRaw}`}
                className="u-display-sm !text-[1.6rem] hover:text-accent transition-colors duration-[var(--duration-micro)]"
              >
                {business.contact.phone}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="u-label bg-paper text-ink px-5 py-3.5 hover:bg-accent hover:text-on-ink transition-colors duration-[var(--duration-micro)]"
              >
                Request a meeting
              </Link>
              {business.contact.whatsapp && (
                <a
                  href={`https://wa.me/${business.contact.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-label border border-on-ink-subtle px-5 py-3.5 hover:bg-paper hover:text-ink hover:border-paper transition-colors duration-[var(--duration-micro)]"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sitemap + wordmark */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div className="col-span-2 md:col-span-2">
            <p className="text-[1.05rem] font-semibold">
              {business.shortName}
              <span className="text-accent">.</span>{" "}
              <span className="u-label-sm text-on-ink-subtle">Technologies</span>
            </p>
            <p className="u-measure-narrow text-on-ink-muted text-body-sm mt-4">
              An education and technology company. Innovation labs and industry
              programs for institutions; digital products for organisations.
            </p>
          </div>

          {Object.entries(NAV).map(([group, links]) => (
            <nav key={group} aria-label={group}>
              <p className="u-label-sm text-on-ink-subtle mb-5">{group}</p>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-body-sm text-on-ink-muted hover:text-on-ink transition-colors duration-[var(--duration-micro)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Credibility + legal */}
        <div className="pt-8 border-t border-edge-on-ink flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {credibility.msmeRegistered && (
              <span className="u-label-sm text-on-ink-muted">
                <span className="text-accent">◆</span> MSME · Government of India
                {credibility.udyamNumber ? ` · ${credibility.udyamNumber}` : ""}
              </span>
            )}
            <span className="u-label-sm text-on-ink-subtle">
              {business.location.city}, {business.location.country}
            </span>
          </div>

          {socials.length > 0 && (
            <ul className="flex gap-6">
              {socials.map(([k, v]) => (
                <li key={k}>
                  <a
                    href={v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-label-sm text-on-ink-muted hover:text-on-ink transition-colors"
                  >
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <p className="u-label-sm text-on-ink-subtle">
            &copy; {year} {business.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
