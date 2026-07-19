import Link from "next/link";
import { business } from "@/data/business";

/**
 * The footer is the last scene, not an afterthought. It restates the one action
 * that matters and gives three ways to take it.
 *
 * No social row: no profiles have been confidently attributed to Krinly, and a
 * row of icons linking nowhere is worse than no row at all. The moment verified
 * handles exist in business.ts, this renders them.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(business.social).filter(([, v]) => v);

  return (
    <footer className="bg-ink text-on-ink">
      <div className="px-6 md:px-10 lg:px-16 pt-[var(--space-section)] pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="u-label text-on-ink-subtle mb-8">Next step</p>
            <h2 className="u-display-md max-w-[13ch]">
              Tell me what you&rsquo;re building.
            </h2>
            <p className="u-measure text-on-ink-muted mt-8">
              A short message about the business and what isn&rsquo;t working is
              enough to start. You&rsquo;ll hear back from {business.founder},
              not an account manager.
            </p>
          </div>

          <div className="lg:col-span-5 lg:pt-14 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${business.contact.email}`}
                className="u-display-sm !text-[1.75rem] hover:text-accent transition-colors duration-[var(--duration-micro)] break-all"
              >
                {business.contact.email}
              </a>
              <a
                href={`tel:${business.contact.phoneRaw}`}
                className="u-display-sm !text-[1.75rem] hover:text-accent transition-colors duration-[var(--duration-micro)]"
              >
                {business.contact.phone}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="u-label border border-on-ink-subtle px-5 py-3.5 hover:bg-paper hover:text-ink hover:border-paper transition-colors duration-[var(--duration-micro)]"
              >
                Start a project
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

        <div className="mt-24 pt-8 border-t border-edge-on-ink flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <p className="u-label-sm text-on-ink-subtle">
            {business.location.line}
          </p>

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
