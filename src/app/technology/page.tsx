import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { WorkCard } from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Technology solutions",
  description:
    "Web applications, AI solutions, dashboards, ERP/CRM and automation, production-grade digital products from Krinly Technologies.",
  alternates: { canonical: "/technology" },
};

const productProof = projects.filter((p) => p.kind === "product");

export default function Technology() {
  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section className="u-grid u-grid-fade px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-20">
        <p className="u-spec mb-8 h-enter">Technology solutions</p>
        <h1 className="u-display-lg max-w-[16ch] h-mask" style={{ ["--d" as string]: "100ms" }}>
          Digital products that help organisations grow.
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-start-7 lg:col-span-5">
            <p className="u-measure text-fg-muted text-body-lg">
              Websites, web applications, AI, dashboards and automation, built
              to production standard by the same engineers behind our innovation
              programs.
            </p>
            <Link
              href="/contact"
              className="u-label inline-block mt-8 bg-ink text-on-ink px-7 py-4 hover:bg-accent transition-colors duration-[var(--duration-micro)]"
            >
              Discuss a project
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section)]">
        <div className="space-y-0">
          {solutions.map((s) => (
            <div
              key={s.index}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-edge py-10 lg:py-14 first:border-t"
            >
              <div className="lg:col-span-1">
                <span className="u-spec">{s.index}</span>
              </div>
              <div className="lg:col-span-4">
                <h2 className="u-display-sm !text-[clamp(1.5rem,2.6vw,2.375rem)]">
                  {s.title}
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-fg-muted max-w-[42ch]">{s.summary}</p>
              </div>
              <ul className="lg:col-span-3 space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="u-label-sm text-fg-subtle">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <div className="flex items-baseline justify-between border-t border-edge pt-6 mb-16 md:mb-20">
          <h2 className="u-label text-fg-subtle">In production</h2>
          <Link
            href="/work"
            className="u-label-sm text-fg-subtle hover:text-accent transition-colors"
          >
            All products →
          </Link>
        </div>
        <div className="space-y-[var(--space-section)]">
          {productProof.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} priority={i === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
