import type { Metadata } from "next";
import Link from "next/link";
import { LabSchematic, Pipeline } from "@/components/Diagram";

export const metadata: Metadata = {
  title: "Innovation Labs",
  description:
    "Krinly Innovation Labs turn a room into a place where students design and build real engineering products, hardware and software, and demonstrate them.",
  alternates: { canonical: "/innovation-labs" },
};

const JOURNEY = [
  { k: "01 · Learn", label: "Foundations in hardware and software, taught as a build." },
  { k: "02 · Design", label: "Students scope a real product and plan it." },
  { k: "03 · Build", label: "They engineer it in the lab, with mentorship." },
  { k: "04 · Demo", label: "They present it, Demo Day, portfolio, certificate." },
];

export default function InnovationLabs() {
  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section className="u-grid u-grid-fade px-6 md:px-10 lg:px-16 pt-28 md:pt-36 pb-16 md:pb-20">
        <p className="u-spec mb-8 h-enter">The flagship program</p>
        <h1 className="u-display-lg max-w-[15ch] h-mask" style={{ ["--d" as string]: "100ms" }}>
          A place students build in, not a lab they look at.
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <p className="lg:col-start-7 lg:col-span-5 u-measure text-fg-muted text-body-lg">
            An innovation lab is only worth the name if students leave it with
            something they made. Krinly designs, equips and runs the program so
            that&rsquo;s the outcome, not the exception.
          </p>
        </div>
      </section>

      {/* Schematic (ink) */}
      <section className="bg-ink text-on-ink u-grid-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <p className="u-spec mb-8">The system</p>
            <p className="u-measure text-on-ink-muted">
              The school provides the space and the students. Krinly brings the
              curriculum, the hardware and software, and the mentorship. Together
              they produce student-built products and a Demo Day.
            </p>
          </div>
          <div className="lg:col-start-6 lg:col-span-7">
            <LabSchematic onInk />
          </div>
        </div>
      </section>

      {/* Student journey pipeline */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-14">
          A student&rsquo;s journey through the lab
        </h2>
        <Pipeline steps={JOURNEY} />
      </section>

      {/* What makes it different */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-edge border border-edge">
          {[
            {
              t: "Real products, not exercises",
              d: "The project is the syllabus. Students work toward a finished, demonstrable product across hardware and software.",
            },
            {
              t: "Teachers supported, not replaced",
              d: "The program equips and backs the school's own teachers so the capability stays after Krinly's rollout.",
            },
            {
              t: "Portfolios that outlast the year",
              d: "Every student leaves with a portfolio of work, presented on a Demo Day to parents and peers.",
            },
            {
              t: "A visible admissions differentiator",
              d: "An innovation lab is something a school can show, to parents deciding, and to students choosing.",
            },
          ].map((c) => (
            <div key={c.t} className="bg-paper p-8 lg:p-12 flex flex-col gap-4">
              <span className="u-tick inline-block w-1.5 h-1.5" />
              <h3 className="text-[1.25rem] font-semibold leading-snug">{c.t}</h3>
              <p className="text-fg-muted text-body-sm max-w-[44ch]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Route to tracks */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-10">
          Bring it to your institution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { href: "/schools", label: "For schools", line: "Innovation Lab program, K-12." },
            { href: "/colleges", label: "For colleges", line: "Industry workshops & placement readiness." },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group border border-edge p-8 lg:p-10 hover:bg-paper-2 transition-colors duration-[var(--duration-micro)] flex flex-col justify-between min-h-[10rem]"
            >
              <span className="u-label-sm text-fg-subtle group-hover:text-accent transition-colors">
                →
              </span>
              <div>
                <h3 className="u-display-sm !text-[clamp(1.5rem,2.4vw,2rem)]">
                  {l.label}
                </h3>
                <p className="text-fg-muted text-body-sm mt-2">{l.line}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
