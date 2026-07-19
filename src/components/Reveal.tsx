"use client";

import { useEffect } from "react";

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
 * Re-animating on scroll-back is the most common amateur tell — it makes a site
 * feel like a demo. The observer unobserves each element the moment it fires.
 *
 * A single document-level effect rather than a wrapper component per element:
 * revealing sixty elements costs one observer and no extra React tree depth.
 * Elements opt in with `data-reveal` and stagger with `--reveal-delay`.
 */
export function RevealProvider() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes.length) return;

    const reveal = (el: Element) => el.classList.add("is-revealed");

    // Reduced-motion users get the content immediately; CSS already forces the
    // end state, so running the observer would be pointless work.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Fire slightly before the element is fully in view so the motion reads
      // as the page arriving rather than as content catching up.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    const viewportH = window.innerHeight;

    nodes.forEach((n) => {
      const rect = n.getBoundingClientRect();

      // Anything already on screen or scrolled past at mount is revealed
      // synchronously rather than waiting on the observer. Two reasons:
      //
      //   1. Elements scrolled past will never intersect again, so the observer
      //      would never fire and they would stay hidden forever — which is
      //      what happens on hash deep links, restored scroll positions and
      //      back-navigation.
      //   2. The observer's first callback is only delivered on the next
      //      rendering opportunity. Making above-the-fold content wait on that
      //      means the most important content on the page is the last to appear.
      if (rect.top < viewportH) {
        reveal(n);
        return;
      }

      observer.observe(n);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
