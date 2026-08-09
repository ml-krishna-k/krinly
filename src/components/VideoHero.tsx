import type { ReactNode } from "react";
import { HeroVideo, type HeroVideoProps } from "./HeroVideo";

/**
 * VideoHero — the layered hero shell. A Server Component: only the video logic
 * inside <HeroVideo /> is client-side, so the hero content ships as static HTML
 * and is fully usable before the video is even considered.
 *
 * Two variants:
 *  - "cover" (default): full-bleed video behind the content, dark overlay for
 *    readability. Best for landscape footage.
 *  - "split": video panel on the right, content on the left over the dark grid.
 *    Best for portrait / near-square footage that "cover" would over-enlarge.
 *
 * Layer order in cover mode: video → dark overlay → grid → content.
 * `isolate` scopes the z-indexes so they never touch the rest of the page.
 *
 * Padding is owned here, so children are just the content block (no wrapper).
 */

interface VideoHeroProps extends HeroVideoProps {
  children: ReactNode;
  className?: string;
  variant?: "cover" | "split";
  /**
   * Darkness of the readability overlay (cover variant only).
   * "medium" (default) suits bright footage where text needs the contrast;
   * "light" lets dark footage show through while keeping text legible via a
   * top/bottom gradient.
   */
  overlay?: "medium" | "light";
}

const PAD = "px-6 md:px-10 lg:px-16";

export function VideoHero({
  poster,
  mp4,
  webm,
  mobileMp4,
  mobileWebm,
  position,
  variant = "cover",
  overlay = "medium",
  children,
  className = "",
}: VideoHeroProps) {
  const media = { poster, mp4, webm, mobileMp4, mobileWebm, position };
  if (variant === "split") {
    return (
      <section
        className={`relative isolate overflow-hidden bg-ink text-on-ink ${className}`}
      >
        {/* Blueprint grid across the whole shell. */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 u-grid-on-ink u-mask-fade"
        />

        <div className="relative z-10 grid md:grid-cols-2 items-stretch min-h-[80vh]">
          {/* Content — left on desktop, below the video on mobile. */}
          <div
            className={`order-2 md:order-1 flex items-center ${PAD} pt-16 pb-16 md:py-24`}
          >
            <div className="w-full">{children}</div>
          </div>

          {/* Video panel — right on desktop, a band on top for mobile. The
              portrait footage fills a tall panel without the extreme zoom that
              a full-bleed cover would cause. A seam line and a light tint keep
              it consistent with the dark shell. */}
          <div className="order-1 md:order-2 relative min-h-[46vh] md:min-h-full border-b md:border-b-0 md:border-l border-edge-on-ink">
            <HeroVideo {...media} />
            <div aria-hidden className="absolute inset-0 bg-ink/25" />
            {/* Fade the inner edge into the dark content side. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-ink/70 via-transparent to-transparent"
            />
          </div>
        </div>
      </section>
    );
  }

  // cover (default) — full-bleed video behind the content.
  return (
    <section
      className={`relative isolate overflow-hidden bg-ink text-on-ink ${className}`}
    >
      {/* 1. Video + poster */}
      <HeroVideo {...media} />

      {/* 2. Readability overlay. "light" keeps the middle mostly clear so dark
          footage shows through, and reserves the darkening for the top (nav)
          and bottom (CTA) where the smaller text sits; the large headline stays
          legible over the lighter middle on its own. "medium" is a stronger,
          more uniform wash for bright footage. */}
      {overlay === "light" ? (
        <>
          <div aria-hidden className="absolute inset-0 z-10 bg-ink/30" />
          <div
            aria-hidden
            className="absolute inset-0 z-10 bg-gradient-to-b from-ink/45 via-ink/10 to-ink/55"
          />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 z-10 bg-ink/60" />
          <div
            aria-hidden
            className="absolute inset-0 z-10 bg-gradient-to-b from-ink/55 via-transparent to-ink/35"
          />
        </>
      )}

      {/* 3. Grid overlay — blueprint texture, fading down. */}
      <div aria-hidden className="absolute inset-0 z-20 u-grid-on-ink u-mask-fade" />

      {/* 4. Hero content */}
      <div className={`relative z-30 w-full ${PAD} pt-28 pb-16 md:py-32`}>
        {children}
      </div>
    </section>
  );
}
