import Link from "next/link";
import { projects } from "@/data/projects";
import { programs } from "@/data/programs";
import { solutions, process } from "@/data/solutions";
import { business } from "@/data/business";
import { WorkCard } from "@/components/WorkIndex";
import { LabSchematic } from "@/components/Diagram";
import { VideoHero } from "@/components/VideoHero";
import { Testimonials } from "@/components/Testimonials";

/**
 * Homepage, a persuasive sequence for an institutional decision-maker.
 *
 * The path is Discover → Understand → Trust → Visualise the transformation →
 * Request a meeting. Institutions come first (the audience router leads with
 * Schools and Colleges); the technology business supports the education brand
 * rather than competing with it. Proof is real engineered products, the
 * argument that Krinly can teach students to build because Krinly builds.
 */

// The three genuine products (not the web/concept work) make the "we build real
// software" argument most crisply on the homepage.
const productProof = projects.filter((p) => p.kind === "product");

const AUDIENCES = [
  {
    href: "/schools",
    k: "K-12",
    label: "Schools",
    line: "An innovation lab your students build in.",
  },
  {
    href: "/colleges",
    k: "Higher ed",
    label: "Colleges",
    line: "Graduates who can show industry work.",
  },
  {
    href: "/technology",
    k: "Business",
    label: "Technology",
    line: "Digital products that help organisations grow.",
  },
];

export default function Home() {
  return (
    <main id="main" className="flex-1">
      {/* ==================================================================
          HERO, cinematic video background (hero.mp4). Content sits on a dark
          overlay in light type; the positioning line is the claim.
          ================================================================== */}
      <VideoHero
        poster="/hero-poster.webp"
        webm="/hero.webm"
        mp4="/hero.mp4"
        mobileMp4="/hero-mobile.mp4"
        overlay="light"
        className="min-h-[86vh] flex items-center"
      >
        <p className="u-spec !text-accent-bright mb-10 md:mb-12">
          Education &amp; technology company
        </p>

        <h1 className="u-display-xl max-w-[17ch] text-on-ink">
          Transforming schools, colleges &amp; businesses through innovation.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 md:mt-14">
          <div className="lg:col-start-7 lg:col-span-5">
            <p className="u-measure text-on-ink-muted text-body-lg">
              Krinly Technologies builds innovation labs and industry programs
              that make institutions future-ready, and engineers the digital
              products that back them.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="group u-label bg-paper text-ink pl-7 pr-6 py-4 hover:bg-accent hover:text-on-ink transition-colors duration-[var(--duration-micro)] inline-flex items-center gap-3"
              >
                Request a meeting
                <span className="transition-transform duration-[var(--duration-micro)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/innovation-labs"
                className="group u-label text-on-ink-muted hover:text-on-ink transition-colors duration-[var(--duration-micro)]"
              >
                <span className="u-sweep pb-1.5">See the programs</span>
              </Link>
            </div>

            {business.credibility.msmeRegistered && (
              <p className="u-label-sm text-on-ink-subtle mt-10">
                <span className="text-accent-bright">◆</span> Government of
                India · MSME registered
                {business.credibility.udyamNumber
                  ? ` · ${business.credibility.udyamNumber}`
                  : ""}
              </p>
            )}
          </div>
        </div>
      </VideoHero>

      {/* ==================================================================
          AUDIENCE ROUTER, institutions first. The visitor self-selects and
          is moved one step closer immediately.
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section)]">
        <ul className="grid grid-cols-1 md:grid-cols-3 border-t border-edge">
          {AUDIENCES.map((a, i) => (
            <li key={a.href} className="border-b md:border-b-0 md:border-r border-edge last:border-r-0">
              <Link
                href={a.href}
                className="group relative flex flex-col justify-between h-full min-h-[10rem] md:min-h-[14rem] py-7 md:py-8 md:px-8 md:first:pl-0 overflow-hidden"
              >
                {/* Ghost index — a faint plate number, engineering-drawing style */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 right-2 md:right-6 text-[7rem] leading-none font-semibold text-fg-subtle/10 tabular-nums select-none transition-colors duration-[var(--duration-micro-slow)] group-hover:text-accent/10"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center justify-between relative">
                  <span className="u-spec">{a.k}</span>
                  <span className="u-label-sm text-fg-subtle group-hover:text-accent transition-transform duration-[var(--duration-micro-slow)] ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <div className="relative">
                  <h2 className="u-display-sm !text-[clamp(1.75rem,3vw,2.5rem)] w-fit">
                    <span className="u-sweep pb-1">{a.label}</span>
                  </h2>
                  <p className="text-fg-muted text-body-sm mt-4 max-w-[32ch]">
                    {a.line}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ==================================================================
          INNOVATION LABS, the flagship concept, with the blueprint schematic.
          ================================================================== */}
      <section className="bg-ink text-on-ink u-grid-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="u-spec mb-10">Innovation Labs</p>
            <h2 className="u-display-md max-w-[14ch]" data-reveal>
              Not a computer room. A place students build real products.
            </h2>
            <p className="u-measure text-on-ink-muted mt-8" data-reveal>
              Krinly sets up a working innovation program inside the
              institution, space, curriculum, hardware, software and
              mentorship, with a single measure of success: students leave with
              something they built and can demonstrate.
            </p>
            <Link
              href="/innovation-labs"
              data-reveal
              className="u-label inline-block mt-10 border border-on-ink-subtle px-6 py-3.5 hover:bg-paper hover:text-ink hover:border-paper transition-colors duration-[var(--duration-micro)]"
            >
              How the lab works
            </Link>
          </div>

          {/* Not reveal-gated: this is the section's primary visual, and a key
              diagram must never depend on script/observer timing to appear. */}
          <div className="lg:col-start-7 lg:col-span-6 lg:pt-6">
            <LabSchematic onInk />
          </div>
        </div>
      </section>

      {/* ==================================================================
          OUTCOME STATEMENT, cinematic video band behind the messaging pivot.
          Video is swappable: change the three sources below to any clip.
          ================================================================== */}
      <VideoHero
        poster="/college-poster.webp"
        webm="/college_student.webm"
        mp4="/college_student.mp4"
        mobileMp4="/college_student-mobile.mp4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <p className="u-spec !text-accent-bright lg:col-span-3">Why it works</p>
          <h2 className="lg:col-span-9 u-display-sm !text-[clamp(1.75rem,3.4vw,3rem)] max-w-[24ch] text-on-ink">
            We don&rsquo;t teach coding. Students build engineering products, and
            we can teach that because we ship it.
          </h2>
        </div>
      </VideoHero>

      {/* ==================================================================
          PROOF, the products Krinly has actually engineered.
          ================================================================== */}
      <section
        id="proof"
        className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)] scroll-mt-24"
      >
        <div className="flex items-baseline justify-between border-t border-edge pt-6 mb-16 md:mb-24">
          <h2 className="u-label text-fg-subtle">Our clients</h2>
          <Link
            href="/work"
            className="u-label-sm text-fg-subtle hover:text-accent transition-colors duration-[var(--duration-micro)]"
          >
            All work →
          </Link>
        </div>

        <div className="space-y-[var(--space-section)]">
          {productProof.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} priority={i === 0} />
          ))}
        </div>
      </section>

      {/* ==================================================================
          TECHNOLOGY SOLUTIONS, the business half, supporting the brand.
          ================================================================== */}
      <section
        id="technology"
        className="px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)] border-t border-edge scroll-mt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-5">
            <p className="u-spec mb-8">Technology solutions</p>
            <h2 className="u-display-sm !text-[clamp(1.75rem,3vw,2.75rem)] max-w-[16ch]">
              The same engineering, for your organisation.
            </h2>
          </div>
          <p className="lg:col-start-7 lg:col-span-5 lg:pt-4 text-fg-muted u-measure">
            Web, AI, dashboards and automation, built to production standard.
            For schools and colleges this is the capability behind the
            classroom; for businesses it&rsquo;s digital transformation delivered
            by the people who teach it.
          </p>
        </div>

        <div className="space-y-0">
          {solutions.map((s) => (
            <div
              key={s.index}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-edge py-10 lg:py-12 first:border-t"
            >
              <div className="lg:col-span-1">
                <span className="u-spec">{s.index}</span>
              </div>
              <div className="lg:col-span-4">
                <h3 className="u-display-sm !text-[clamp(1.5rem,2.4vw,2.125rem)]">
                  {s.title}
                </h3>
              </div>
              <div className="lg:col-span-4">
                <p className="text-fg-muted text-body-sm max-w-[42ch]">
                  {s.summary}
                </p>
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

      {/* ==================================================================
          HOW WE WORK
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-10">
              How an engagement runs
            </h2>
            <p className="u-measure-narrow text-fg-muted text-body-sm">
              Whether it&rsquo;s a lab, a workshop series or a product build, the
              shape is the same, designed backwards from what the institution is
              trying to move.
            </p>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <ol className="space-y-12">
              {process.map((s) => (
                <li key={s.index} data-reveal className="flex gap-6 md:gap-10">
                  <span className="u-spec pt-1.5 shrink-0">{s.index}</span>
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
          CREDIBILITY, for the institutional decision-maker.
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-12">
          Why institutions trust Krinly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-edge border border-edge">
          {[
            {
              k: "01",
              t: "Government of India · MSME",
              d: "A registered Indian entity, a real organisation to sign an agreement with, not a freelancer.",
            },
            {
              k: "02",
              t: "Project-based learning",
              d: "Students are assessed on what they build. Every program ends in demonstrable work and a portfolio.",
            },
            {
              k: "03",
              t: "Industry-aligned curriculum",
              d: "Taught on the stacks industry ships on, by people who ship on them, AI, full-stack, embedded.",
            },
            {
              k: "04",
              t: "Professional certification",
              d: "Completion is certified and backed by reviewable work, not attendance.",
            },
          ].map((c) => (
            <div
              key={c.k}
              className="group relative bg-paper p-8 lg:p-10 flex flex-col gap-4 hover:bg-paper-2 transition-colors duration-[var(--duration-micro-slow)]"
            >
              {/* Accent rule wipes across the top on hover — a precise response,
                  not a colour swap. */}
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[2px] w-0 bg-accent transition-[width] duration-[var(--duration-move)] ease-[var(--ease-out-expo)] group-hover:w-full"
              />
              <span className="u-spec">{c.k}</span>
              <h3 className="text-[1.125rem] font-semibold leading-snug">
                {c.t}
              </h3>
              <p className="text-fg-muted text-body-sm">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================
          CLIENT FEEDBACK — swipeable carousel (placeholder content until real
          quotes are supplied).
          ================================================================== */}
      <section className="bg-ink text-on-ink u-grid-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <p className="u-spec !text-accent-bright mb-12">Client feedback</p>
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-2">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ==================================================================
          FINAL CTA BAND
          ================================================================== */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <Link
          href="/contact"
          className="group block border-t border-edge pt-10 md:pt-14"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="u-display-md max-w-[16ch] group-hover:text-accent transition-colors duration-[var(--duration-micro)]">
              See what this looks like for your institution.
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
