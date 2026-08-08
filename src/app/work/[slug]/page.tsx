import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, featuredProjects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name}, ${project.kindLabel}`,
    description: project.scope,
    openGraph: {
      title: `${project.name}, Krinly`,
      description: project.scope,
      images: [{ url: project.images.desktop }],
    },
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = featuredProjects.findIndex((p) => p.slug === project.slug);
  const next = featuredProjects[(index + 1) % featuredProjects.length];

  return (
    <main id="main" className="flex-1">
      {/* ================= Title block ================= */}
      <section className="px-6 md:px-10 lg:px-16 pt-32 md:pt-44 pb-14 md:pb-20">
        <Link
          href="/work"
          className="u-label text-fg-subtle hover:text-fg transition-colors duration-[var(--duration-micro)]"
        >
          ← All work
        </Link>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <p className="u-label text-accent mb-6">{project.kindLabel}</p>
            <h1 className="u-display-lg">{project.name}</h1>
          </div>

          <div className="lg:col-start-9 lg:col-span-4 lg:pt-4">
            <p className="text-fg-muted max-w-[42ch]">{project.scope}</p>
          </div>
        </div>
      </section>

      {/* ================= Lead image =================
          Full-bleed, masked in rather than faded. No browser chrome. */}
      <div className="px-6 md:px-10 lg:px-16">
        <Image
          data-reveal="mask"
          src={project.images.desktop}
          alt={project.images.alt}
          width={2880}
          height={1800}
          priority
          sizes="100vw"
          className="w-full h-auto bg-paper-2"
        />
      </div>

      {/* ================= Facts =================
          Attribution sits high on the page, not buried at the bottom. If a
          project is a concept study, a reader learns that before they read the
          narrative, which is the only way the narrative stays credible. */}
      <section className="px-6 md:px-10 lg:px-16 pt-14 md:pt-20">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-edge pt-8">
          <div>
            <dt className="u-label-sm text-fg-subtle mb-3">Sector</dt>
            <dd className="text-body-sm text-fg">{project.industry}</dd>
          </div>
          <div>
            <dt className="u-label-sm text-fg-subtle mb-3">Type</dt>
            <dd className="text-body-sm text-fg">{project.kindLabel}</dd>
          </div>
          <div>
            <dt className="u-label-sm text-fg-subtle mb-3">Scope</dt>
            <dd className="text-body-sm text-fg">
              {project.disciplines.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="u-label-sm text-fg-subtle mb-3">Live</dt>
            <dd className="text-body-sm">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-accent underline underline-offset-4 decoration-edge-strong transition-colors duration-[var(--duration-micro)] break-all"
              >
                Visit site ↗
              </a>
            </dd>
          </div>
        </dl>

        {/* Involvement, stated plainly. */}
        <p className="mt-10 u-measure text-fg-subtle text-body-sm border-l-2 border-edge-strong pl-5">
          {project.roleNote}
        </p>
      </section>

      {/* ================= Narrative ================= */}
      <section className="px-6 md:px-10 lg:px-16 py-[var(--space-section)]">
        <div className="space-y-16 md:space-y-24">
          {project.sections.map((s, i) => (
            <div
              key={s.heading}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            >
              <div className="lg:col-span-1">
                <span className="u-label-sm text-fg-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="lg:col-span-3 u-display-sm !text-[clamp(1.375rem,2vw,1.75rem)]">
                {s.heading}
              </h2>
              <p className="lg:col-start-6 lg:col-span-7 text-fg-muted max-w-[62ch]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Mobile view =================
          Shown as an actual phone-width screenshot rather than dropped into a
          device frame. The work is responsive; this is the evidence. */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section)]">
        <div className="bg-paper-2 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center px-6 md:px-12 py-14 md:py-20">
          <div className="lg:col-span-4">
            <h2 className="u-label text-fg-subtle mb-6">On a phone</h2>
            <p className="text-fg-muted text-body-sm max-w-[38ch]">
              Most visitors in these categories arrive on mobile. The mobile
              layout is composed, not shrunk.
            </p>
          </div>
          <div className="lg:col-start-7 lg:col-span-4 flex justify-center">
            <Image
              data-reveal="mask"
              src={project.images.mobile}
              alt={`${project.name}, mobile view`}
              width={780}
              height={1688}
              sizes="(max-width: 1024px) 60vw, 24vw"
              className="w-full max-w-[300px] h-auto"
            />
          </div>
        </div>
      </section>

      {/* ================= Next ================= */}
      <section className="px-6 md:px-10 lg:px-16 pb-[var(--space-section-lg)]">
        <Link href={`/work/${next.slug}`} className="group block border-t border-edge pt-8">
          <p className="u-label text-fg-subtle mb-6">Next project</p>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="u-display-md group-hover:text-accent transition-colors duration-[var(--duration-micro)]">
              {next.name}
            </h2>
            <span className="u-label text-fg-subtle">{next.kindLabel}</span>
          </div>
        </Link>
      </section>
    </main>
  );
}
