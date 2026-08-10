import Link from "next/link";
import type { ProgramTrack } from "@/data/programs";
import { programs } from "@/data/programs";
import { VideoHero } from "@/components/VideoHero";

/**
 * Shared layout for the two institutional program tracks (Schools, Colleges).
 * Both are OFFERINGS, the copy describes what Krinly delivers and the outcome
 * the institution is buying. No track record, counts or percentages appear
 * here; those require evidence not yet supplied.
 */
export function ProgramTrackPage({ track }: { track: ProgramTrack }) {
  const other = programs.find((p) => p.slug !== track.slug)!;
  const isSplit = track.media.layout === "split";

  return (
    <main id="main" className="flex-1">
      {/* Hero, cinematic video background for the track (students building).
          Split layout for portrait footage keeps the video on the right and the
          text on the left; cover is used for landscape footage. */}
      <VideoHero
        poster={track.media.poster}
        webm={track.media.webm}
        mp4={track.media.mp4}
        mobileMp4={track.media.mobileMp4}
        variant={track.media.layout ?? "cover"}
        className={
          track.media.layout === "split" ? "" : "min-h-[80vh] flex items-center"
        }
      >
        <p className="u-spec !text-accent-bright mb-8">{track.audience}</p>
        {/* In split mode the headline shares the row with the video, so it is
            sized down to fit the narrower column with the intro and CTA. */}
        <h1
          className={`u-display-lg max-w-[16ch] text-on-ink ${
            isSplit ? "!text-[clamp(1.875rem,3vw,3rem)]" : ""
          }`}
        >
          {track.headline}
        </h1>
        <div className="max-w-[48ch] mt-7">
          <p className="text-on-ink-muted text-body-lg">{track.intro}</p>
          <Link
            href="/contact"
            className="u-label inline-block mt-8 bg-paper text-ink px-7 py-4 hover:bg-accent hover:text-on-ink transition-colors duration-[var(--duration-micro)]"
          >
            Request a meeting
          </Link>
        </div>
      </VideoHero>

      {/* Outcomes, what the decision-maker is buying */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-edge pt-10">
          <h2 className="u-label text-fg-subtle lg:col-span-4">What you get</h2>
          <ul className="lg:col-start-6 lg:col-span-7 space-y-0">
            {track.outcomes.map((o, i) => (
              <li
                key={o}
                data-reveal
                className="flex gap-5 md:gap-8 border-b border-edge py-7 md:py-9 first:border-t"
              >
                <span className="u-spec pt-2 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="u-display-sm !text-[clamp(1.5rem,2.8vw,2.25rem)] !leading-[1.15] font-medium">
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Modules */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <h2 className="u-label text-fg-subtle border-t border-edge pt-6 mb-14">
          The program
        </h2>
        <div className="space-y-0">
          {track.modules.map((m, i) => (
            <div
              key={m.title}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 border-b border-edge py-8 lg:py-10 first:border-t"
            >
              <span className="u-spec lg:col-span-1 tabular-nums pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="lg:col-span-4 u-display-sm !text-[clamp(1.75rem,2.8vw,2.5rem)]">
                {m.title}
              </h3>
              <p className="lg:col-start-6 lg:col-span-7 text-fg-muted text-body-lg md:!text-[1.25rem] !leading-[1.5] max-w-[52ch]">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Urgency band (ink) */}
      <section className="bg-ink text-on-ink u-grid-on-ink px-6 md:px-10 lg:px-16 py-[var(--space-section-lg)]">
        <p className="u-spec mb-10">Why now</p>
        <p className="u-display-sm !text-[clamp(1.75rem,3.2vw,2.75rem)] max-w-[22ch]">
          {track.urgency}
        </p>
        <Link
          href="/contact"
          className="u-label inline-block mt-12 bg-paper text-ink px-7 py-4 hover:bg-accent hover:text-on-ink transition-colors duration-[var(--duration-micro)]"
        >
          Request a meeting
        </Link>
      </section>

      {/* Cross-link to the other track */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section)]">
        <Link
          href={`/${other.slug}`}
          className="group block border-t border-edge pt-8"
        >
          <p className="u-spec mb-6">Also from Krinly</p>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="u-display-md group-hover:text-accent transition-colors duration-[var(--duration-micro)]">
              For {other.label.toLowerCase()}
            </h2>
            <span className="u-label text-fg-subtle">{other.audience}</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
