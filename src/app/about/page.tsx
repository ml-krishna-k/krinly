import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 border-t border-edge pt-10">
          <h2 className="u-label text-fg-subtle lg:col-span-12">
            Who you work with
          </h2>

          {/* Founder portrait */}
          <div className="lg:col-span-4">
            <div
              data-reveal="mask"
              className="relative aspect-[2/3] bg-ink overflow-hidden max-w-[22rem] lg:max-w-none"
            >
              <Image
                src="/founder.webp"
                alt={`${business.founder}, ${business.founderTitle} of ${business.name}`}
                fill
                sizes="(max-width: 1024px) 80vw, 30vw"
                className="object-cover object-top"
              />
            </div>
            <p className="u-label-sm text-fg-subtle mt-4">
              {business.founder} · {business.founderTitle}
            </p>
          </div>

          {/* Bio — about the founder, Krishnaraj. */}
          <div className="lg:col-start-6 lg:col-span-7 lg:pt-2">
            <p className="u-display-sm !text-[clamp(1.75rem,3.4vw,2.75rem)]">
              {business.founder}
            </p>
            <p className="u-label text-accent mt-3">
              {business.founderTitle}, {business.name}
            </p>
            <div className="mt-8 space-y-5">
              <p className="u-measure text-fg-muted">
                Krishnaraj is a technologist, entrepreneur, and the CTO of
                Enervara, driven by one belief: that innovation should solve real
                problems. His journey spans full-stack engineering, automation,
                hardware development, and generative AI, working with startups
                and businesses to build impactful products.
              </p>
              <p className="u-measure text-fg-muted">
                Along the way, he has competed in and won multiple hackathons,
                turning ideas into practical solutions. That same passion led to
                the creation of Krinly, a platform dedicated to helping schools,
                colleges, and businesses embrace innovation through hands-on
                learning and future-ready technology.
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
