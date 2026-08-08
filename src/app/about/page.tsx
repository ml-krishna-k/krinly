import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "About Krinly Technologies",
  description: business.descriptor,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section className="u-grid u-grid-fade px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-20">
        <p className="u-spec mb-8 h-enter">About</p>
        <h1 className="u-display-lg max-w-[18ch] h-mask" style={{ ["--d" as string]: "100ms" }}>
          An education company with an engineering company inside it.
        </h1>
      </section>

      {/* What Krinly is */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-edge pt-10">
          <h2 className="u-label text-fg-subtle lg:col-span-4">What we are</h2>
          <div className="lg:col-start-6 lg:col-span-7 space-y-6">
            <p className="u-measure text-fg-muted text-body-lg">
              Krinly Technologies is an education and technology company. We set
              up innovation labs and run industry programs that make schools and
              colleges future-ready, and we engineer the digital products that
              prove we can.
            </p>
            <p className="u-measure text-fg-muted">
              Those two halves are not separate businesses. The engineering is
              why the education is credible: students are taught to build real
              products by people who ship real products. The education is why the
              engineering matters: technology is only worth anything if it moves
              an institution forward.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-edge pt-10">
          <h2 className="u-label text-fg-subtle lg:col-span-4">
            Who you work with
          </h2>
          <div className="lg:col-start-6 lg:col-span-7">
            <p className="u-display-sm !text-[clamp(1.5rem,3vw,2.5rem)] max-w-[20ch]">
              {business.founder}, {business.founderTitle}, {business.name}
            </p>
            {/* TODO (owner input): a founder photograph belongs here, it is the
                highest-value single trust asset the About page can carry. */}
            <div className="mt-8 space-y-5">
              <p className="u-measure text-fg-muted">
                Krinly is founder-led, which means the person setting the
                strategy is the person designing the program and writing the
                code. For an institution that means direct involvement, one point
                of accountability, and decisions in days rather than through
                layers.
              </p>
              <p className="u-measure text-fg-muted">
                The engineering runs deep, generative AI and machine learning,
                retrieval and agentic systems, voice interfaces, full-stack and
                embedded product work. Most programs don&rsquo;t need all of it,
                but it sets the ceiling on what Krinly can build and teach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-12">
          Standing behind the work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-edge border border-edge">
          {[
            {
              t: "Registered entity",
              d: "A Government of India registered MSME, a real organisation an institution can contract with.",
            },
            {
              t: "Products in production",
              d: "Live, working software serving real users, including an education-technology product used by colleges.",
            },
            {
              t: "Modern engineering",
              d: "Built on the current stack, from front-end through AI systems, the same tools students learn on.",
            },
          ].map((c) => (
            <div key={c.t} className="bg-paper p-8 lg:p-10 flex flex-col gap-4">
              <span className="u-tick inline-block w-1.5 h-1.5" />
              <h3 className="text-[1.125rem] font-semibold leading-snug">{c.t}</h3>
              <p className="text-fg-muted text-body-sm">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <Link href="/contact" className="group block border-t border-edge pt-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="u-display-md max-w-[16ch] group-hover:text-accent transition-colors duration-[var(--duration-micro)]">
              Start a conversation with Krinly.
            </h2>
            <span className="u-label border border-fg px-6 py-4 group-hover:bg-ink group-hover:text-on-ink group-hover:border-ink transition-colors duration-[var(--duration-micro)]">
              Request a meeting →
            </span>
          </div>
        </Link>
      </section>
    </main>
  );
}
