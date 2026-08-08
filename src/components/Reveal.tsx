"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Inline bootstrap, rendered as the first child of <body> so it executes before
 * anything paints. It marks the document as script-capable, which is what
 * switches on the pre-reveal hidden state in CSS.
 *
 * Without this, the hidden state would apply even when JavaScript never runs,
 * and the page would render permanently blank in exactly the situations where
 * you can least afford it.
 */
export const revealBootstrap = `document.documentElement.classList.add("js")`;

/**
 * Scroll reveal, applied once and never re-triggered.
 *
 * Re-animating on scroll-back is the most common amateur tell, it makes a site
 * feel like a demo. The observer unobserves each element the moment it fires.
 *
 * A single document-level effect rather than a wrapper component per element:
 * revealing sixty elements costs one observer and no extra React tree depth.
 * Elements opt in with `data-reveal` and stagger with `--reveal-delay`.
 */
export function RevealProvider() {
  // This provider lives in the root layout, which does NOT remount on
  // client-side navigation. Without a route dependency the effect would run
  // only once, and every page reached by a nav link would keep its reveal
  // elements stuck at opacity 0. Re-running on pathname change re-scans and
  // re-observes the new page's elements.
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-revealed");
    const all = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)");

    if (!document.querySelector("[data-reveal]")) return;

    // Reduced-motion users get everything immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      all().forEach(reveal);
      return;
    }

    // Scroll-based reveal instead of IntersectionObserver. The observer proved
    // unreliable across fast scrolls, mask (clip-path) elements, scroll
    // restoration and client-side navigation — each of which could leave
    // content permanently invisible. A plain measurement on scroll cannot miss:
    // an element reveals the moment its top passes 90% of the viewport, and
    // anything already at or above that line (including scrolled-past elements)
    // reveals at once.
    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * 0.9;
      all().forEach((n) => {
        if (n.getBoundingClientRect().top < line) reveal(n);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check(); // reveal whatever is in view on load / route change
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Failsafe: whatever the user has not scrolled to within a few seconds is
    // revealed unconditionally, so nothing can ever remain hidden. Visibility
    // always wins over the entrance animation.
    const failsafe = window.setTimeout(() => all().forEach(reveal), 3000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
