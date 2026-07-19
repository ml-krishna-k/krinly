import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { capabilities, process } from "@/data/capabilities";
import { business } from "@/data/business";
import { WorkCard } from "@/components/WorkIndex";
import { EnquiryForm } from "@/components/EnquiryForm";

/**
 * Homepage — a persuasive sequence, not a stack of independent sections.
 *
 * Order is deliberate and follows the single clearest finding from studying the
 * top tier: proof before premise. A named project is visible within one scroll.
 * The philosophy, the capability model and the founder all come after evidence,
 * because none of them are believable until the work has been seen.
 */
export default function Home() {
  return (
    <main id="main" className="flex-1">
      {/* ==================================================================
          HERO
          Asymmetric, typography-led, one primary action. No centred headline
          over a gradient, no floating device mockup, no two competing buttons.
          ================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-14 md:pb-16">
        <p className="u-label text-fg-subtle mb-10 md:mb-12">
          {business.name} — {business.location.city}, working internationally
        </p>

        {/* The hero claim. It names a condition the buyer recognises in their
            own business rather than describing what we sell. */}
        <h1 className="u-display-xl max-w-[15ch]">
          Most businesses look smaller online than they are.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 md:mt-14">
          {/* Body starts at column 7 — the grid is established, then broken
              once, on purpose. */}
          <div className="lg:col-start-7 lg:col-span-5">
            <p className="u-measure text-fg-muted text-body-lg">
              Krinly is a founder-led digital studio. Strategy, design and
              engineering — from marketing sites through to working products.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="#contact"
                className="u-label bg-ink text-on-ink px-7 py-4 hover:bg-accent transition-colors duration-[var(--duration-micro)]"
              >
                Start a project
              </Link>
              <Link
                href="#work"
                className="u-label text-fg-muted hover:text-fg transition-colors duration-[var(--duration-micro)] underline underline-offset-8 decoration-edge-strong"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          PROOF STRIP
          Named work at the first viewport. The clearest single finding from
          studying the top tier is that they put client names above the fold and
          the manifesto below it — proof, then premise. A visitor arriving from
          a cold email should see evidence before they see a claim about us.
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section)]">
        <ul className="border-t border-edge grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {featuredProjects.map((p) => (
            <li
              key={p.slug}
              className="border-b border-edge md:border-b-0 lg:border-r last:border-r-0 border-edge"
            >
              <Link
                href={`/work/${p.slug}`}
                className="group block py-5 pr-4 hover:bg-paper-2 transition-colors duration-[var(--duration-micro)]"
              >
                <span className="u-label-sm block text-fg group-hover:text-accent transition-colors duration-[var(--duration-micro)]">
                  {p.name}
                </span>
                <span className="u-label-sm block text-fg-subtle mt-1.5">
                  {p.industry}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ==================================================================
          SELECTED WORK — immediate proof
          ================================================================== */}
      <section
        id="work"
        className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)] scroll-mt-24"
      >
        <div className="flex items-baseline justify-between border-t border-edge pt-6 mb-16 md:mb-24">
          <h2 className="u-label text-fg-subtle">Selected work</h2>
          <p className="u-label-sm text-fg-subtle tabular-nums">
            {String(featuredProjects.length).padStart(2, "0")}
          </p>
        </div>

        <div className="space-y-[var(--space-section)]">
          {featuredProjects.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* ==================================================================
          POSITIONING — chapter inversion marks the shift from proof to premise
          ================================================================== */}
      <section
        id="studio"
        className="bg-ink text-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)] scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <p className="u-label text-on-ink-subtle mb-10">The studio</p>
            <h2 className="u-display-md max-w-[16ch]" data-reveal>
              A studio that can design it and also build it.
            </h2>
          </div>

          <div className="lg:col-start-8 lg:col-span-5 lg:pt-4 space-y-6">
            <p className="u-measure text-on-ink-muted" data-reveal>
              Most studios stop at the design file and hand it to someone else.
              Most developers start after the thinking is finished. Both handoffs
              lose something — usually the parts that were hardest to specify and
              mattered most.
            </p>
            <p className="u-measure text-on-ink-muted" data-reveal>
              Krinly is set up so that doesn&rsquo;t happen. The person shaping
              the strategy is the person art-directing it and the person writing
              the code, which is why the work spans marketing sites and real
              products — subscription platforms, operations tooling, clinical
              software — rather than only the first of those.
            </p>
            <p className="u-measure text-on-ink-muted" data-reveal>
              You work with {business.founder} directly. No account layer, no
              brief passed down a chain, and decisions in hours rather than
              weeks.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          CAPABILITIES — four groups, not twelve cards
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-16 md:mb-20">
          Capabilities
        </h2>

        <div className="space-y-0">
          {capabilities.map((c) => (
            <div
              key={c.index}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-edge py-10 lg:py-12 first:border-t"
            >
              <div className="lg:col-span-1">
                <span className="u-label-sm text-fg-subtle tabular-nums">
                  {c.index}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="u-display-sm !text-[clamp(1.5rem,2.4vw,2.125rem)]">
                  {c.title}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p className="text-fg-muted text-body-sm max-w-[42ch]">
                  {c.summary}
                </p>
              </div>
              <ul className="lg:col-span-3 space-y-2">
                {c.items.map((item) => (
                  <li key={item} className="u-label-sm text-fg-subtle">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================
          APPROACH
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-10">
              How the work runs
            </h2>
            <p className="u-measure-narrow text-fg-muted text-body-sm">
              Four stages, and the first one is often the most valuable — it is
              where a redesign request turns into a clear brief, or occasionally
              into the conclusion that you don&rsquo;t need one.
            </p>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <ol className="space-y-12">
              {process.map((s) => (
                <li key={s.index} data-reveal className="flex gap-6 md:gap-10">
                  <span className="u-label-sm text-accent tabular-nums pt-1.5 shrink-0">
                    {s.index}
                  </span>
                  <div>
                    <h3 className="u-display-sm !text-[clamp(1.25rem,2vw,1.75rem)] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-fg-muted text-body-sm max-w-[52ch]">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ==================================================================
          FOUNDER — concise. Humanises the studio without becoming a résumé.
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <div className="border-t border-edge pt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="u-label text-fg-subtle">Who you work with</h2>

            {/* Fills what was otherwise a dead column, and does it with
                something load-bearing: the section claims direct founder
                involvement, so it should be possible to act on that claim from
                the same eyeline rather than scrolling to the footer. */}
            <div className="mt-10 flex flex-col gap-4 border-t border-edge pt-6">
              <a
                href={`tel:${business.contact.phoneRaw}`}
                className="u-label-sm text-fg hover:text-accent transition-colors duration-[var(--duration-micro)]"
              >
                {business.contact.phone}
              </a>
              <a
                href={`mailto:${business.contact.email}`}
                className="u-label-sm text-fg hover:text-accent transition-colors duration-[var(--duration-micro)] break-all"
              >
                {business.contact.email}
              </a>
              <p className="u-label-sm text-fg-subtle">
                {business.location.city}, {business.location.country} — working
                internationally
              </p>
            </div>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <p className="u-display-sm !text-[clamp(1.5rem,3vw,2.5rem)] max-w-[20ch]">
              {business.founder} — {business.founderTitle}, {business.name}
            </p>
            <div className="mt-8 space-y-5">
              <p className="u-measure text-fg-muted">
                Design and engineering in the same person. That combination is
                the reason the work covers both a local service business that
                needs to be found and chosen, and a clinical product that needs
                architecture behind it.
              </p>
              <p className="u-measure text-fg-muted">
                The engineering side runs deeper than front-end: generative AI
                and machine learning systems, retrieval and agentic
                architectures, voice interfaces, and product engineering. Most
                projects don&rsquo;t need any of that — but it sets the ceiling
                on what Krinly can take on when one does.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          CONTACT
          ================================================================== */}
      <section
        id="contact"
        className="bg-ink text-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)] scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="u-label text-on-ink-subtle mb-10">Start a project</p>
            <h2 className="u-display-md max-w-[12ch]">
              What are you building?
            </h2>
            <p className="u-measure text-on-ink-muted mt-8 text-body-sm">
              The more context the better, but a couple of sentences is a fine
              place to start. Replies come from {business.founder}.
            </p>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
