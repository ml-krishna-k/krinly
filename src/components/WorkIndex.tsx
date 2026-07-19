import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

/**
 * The work index.
 *
 * Deliberately not a three-up card grid. Each project is a full editorial row
 * whose image side alternates, so the eye crosses the page rather than scanning
 * a column — and so no two projects read as the same object type.
 *
 * Screenshots are shown as clean rectangles: no border radius, no drop shadow,
 * no browser chrome. The `radius + shadow + fake Safari toolbar` treatment is
 * the loudest cheapness signal in this category.
 */
export function WorkCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const flipped = index % 2 === 1;

  return (
    <article
      data-reveal
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
    >
      {/* Image. Order swaps on alternating rows at lg and above; on mobile it
          always leads, because the picture is the reason to keep scrolling. */}
      <Link
        href={`/work/${project.slug}`}
        aria-label={`${project.name} — case study`}
        className={[
          "group relative block overflow-hidden bg-paper-2",
          // Full-bleed on mobile: the negative margin exactly cancels the
          // section gutter, so the screenshot uses the whole screen width
          // instead of being inset and reading as a thumbnail. Mobile is
          // composed, not shrunk.
          "-mx-6 md:mx-0",
          "lg:col-span-7",
          flipped ? "lg:order-2 lg:col-start-6" : "lg:order-1",
        ].join(" ")}
      >
        <Image
          src={project.images.desktop}
          alt={project.images.alt}
          width={2880}
          height={1800}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="w-full h-auto transition-transform duration-[var(--duration-move-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
        />
        {/* Hover affordance appears over the media only — not a cursor that
            follows the whole page. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 u-label bg-ink text-on-ink px-4 py-3 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-[var(--duration-micro-slow)] ease-[var(--ease-out-expo)]"
        >
          View case study
        </span>
      </Link>

      <div
        className={[
          "lg:col-span-4",
          flipped ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-9",
        ].join(" ")}
      >
        <div className="flex items-baseline gap-4 mb-5">
          <span className="u-label-sm text-fg-subtle tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="u-label-sm text-accent">{project.kindLabel}</span>
        </div>

        <h3 className="u-display-sm !text-[clamp(1.75rem,3vw,2.75rem)]">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-accent transition-colors duration-[var(--duration-micro)]"
          >
            {project.name}
          </Link>
        </h3>

        {/* The scope sentence. Research found this single line does more work
            than any tag row on a project card. */}
        <p className="text-fg-muted text-body-sm mt-5 max-w-[46ch]">
          {project.scope}
        </p>

        <dl className="mt-8 space-y-3 border-t border-edge pt-5">
          <div className="flex gap-6">
            <dt className="u-label-sm text-fg-subtle w-24 shrink-0">Sector</dt>
            <dd className="u-label-sm text-fg-muted">{project.industry}</dd>
          </div>
          <div className="flex gap-6">
            <dt className="u-label-sm text-fg-subtle w-24 shrink-0">Scope</dt>
            <dd className="u-label-sm text-fg-muted">
              {project.disciplines.join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
