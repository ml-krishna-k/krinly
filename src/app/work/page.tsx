import type { Metadata } from "next";
import { featuredProjects } from "@/data/projects";
import { WorkCard } from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Products & work",
  description:
    "Live products and work engineered by Krinly Technologies, from a clinical triage platform and a subscription product to an education-technology platform used by colleges.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <main id="main" className="flex-1">
      <section className="u-grid u-grid-fade px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-20">
        <p className="u-spec mb-8 h-enter">Products &amp; work</p>
        <h1 className="u-display-lg max-w-[16ch] h-mask" style={{ ["--d" as string]: "100ms" }}>
          The software behind the company&rsquo;s claims.
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <p className="lg:col-start-7 lg:col-span-5 u-measure text-fg-muted text-body-lg">
            Real products in production, plus selected design and redesign work.
            Each is labelled for what it is, built product, client work, or
            concept study, because a claim you can click through to has to hold
            up.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6">
          Selected products &amp; work
        </h2>
        <div className="space-y-[var(--space-section)] pt-16 md:pt-24">
          {featuredProjects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} priority={i === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
