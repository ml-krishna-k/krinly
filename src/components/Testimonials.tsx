"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";

/**
 * A swipeable client-feedback carousel: pointer/touch drag, prev/next controls,
 * dots, keyboard arrows, and gentle autoplay that pauses on interaction and is
 * disabled under reduced motion. One card at a time; the track slides.
 *
 * Content comes from data/testimonials.ts, which currently holds visibly-marked
 * placeholders — no fabricated reviews.
 */
export function Testimonials() {
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  const go = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );

  // Autoplay — paused during interaction, off under reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (!paused.current) setIndex((p) => (p + 1) % count);
    }, 6500);
    return () => clearInterval(t);
  }, [count]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setDragging(true);
    paused.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  };
  const endDrag = () => {
    if (startX.current === null) return;
    const width = trackRef.current?.clientWidth ?? 320;
    const threshold = width * 0.15;
    if (drag < -threshold) go(index + 1);
    else if (drag > threshold) go(index - 1);
    startX.current = null;
    setDrag(0);
    setDragging(false);
    // Resume autoplay a moment after the user lets go.
    window.setTimeout(() => (paused.current = false), 800);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    else if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
        role="group"
        aria-roledescription="carousel"
        aria-label="Client feedback"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="flex cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${drag}px))`,
            transition: dragging
              ? "none"
              : "transform var(--duration-move) var(--ease-out-expo)",
          }}
        >
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="w-full shrink-0 px-0"
              aria-hidden={i !== index}
            >
              <blockquote className="u-display-sm !text-[clamp(1.375rem,2.8vw,2.25rem)] !leading-[1.15] max-w-[26ch] text-on-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 flex items-baseline gap-4">
                <span className="u-label text-accent-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-on-ink font-medium">
                    {t.name}
                  </span>
                  <span className="u-label-sm text-on-ink-subtle">
                    {t.role} · {t.org}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex items-center justify-between border-t border-edge-on-ink pt-6">
        <div className="flex gap-3" role="tablist" aria-label="Choose feedback">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Feedback ${i + 1} of ${count}`}
              aria-selected={i === index}
              onClick={() => go(i)}
              className={`h-1.5 transition-all duration-[var(--duration-micro-slow)] ${
                i === index
                  ? "w-8 bg-accent-bright"
                  : "w-4 bg-on-ink-subtle/50 hover:bg-on-ink-subtle"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous"
            className="u-label border border-on-ink-subtle w-11 h-11 flex items-center justify-center hover:bg-paper hover:text-ink hover:border-paper transition-colors duration-[var(--duration-micro)]"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next"
            className="u-label border border-on-ink-subtle w-11 h-11 flex items-center justify-center hover:bg-paper hover:text-ink hover:border-paper transition-colors duration-[var(--duration-micro)]"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
