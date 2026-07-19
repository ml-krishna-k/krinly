"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/data/business";

/**
 * Four items, one of which is a verb. No "Home" — its presence in a nav is a
 * reliable marker of the template tier, and the logo already does that job.
 * No sticky "Get a quote" pill.
 *
 * Behaviour: recessive at rest, direction-aware after the first screen. It
 * hides on downward scroll past the fold and returns immediately on any upward
 * scroll, so the primary action is always one gesture away without occupying
 * the viewport while reading.
 */

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#studio", label: "Studio" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        // Threshold prevents the nav flickering on small scroll jitter.
        if (Math.abs(y - lastY) > 8) {
          setHidden(y > lastY && y > 320);
          lastY = y;
        }
        frame = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock scroll behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the overlay — expected of any modal surface.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50",
          "transition-[transform,background-color,border-color] duration-[var(--duration-micro-slow)] ease-[var(--ease-out-expo)]",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
          scrolled && !menuOpen
            ? "bg-paper/85 backdrop-blur-md border-b border-edge/60"
            : "border-b border-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20"
        >
          <Link
            href="/"
            className="u-label !text-[0.8125rem] !tracking-[0.2em] font-medium hover:text-accent transition-colors duration-[var(--duration-micro)]"
          >
            {business.name}
            <span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="u-label text-fg-muted hover:text-fg transition-colors duration-[var(--duration-micro)]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="u-label border border-fg px-4 py-2.5 hover:bg-ink hover:text-on-ink hover:border-ink transition-colors duration-[var(--duration-micro)]"
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden u-label py-2 -mr-2 px-2"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* Overlay menu — a designed surface, not a dropdown. Large type,
          immediate access to work and contact, no entrance delay that makes
          navigation feel slow. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-ink text-on-ink md:hidden flex flex-col justify-between px-6 pt-24 pb-10"
      >
        <ul className="space-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="u-display-sm block py-2"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="space-y-5">
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="u-label block border border-on-ink-subtle px-5 py-4 text-center"
          >
            Start a project
          </Link>
          <div className="flex flex-col gap-1">
            <a
              href={`tel:${business.contact.phoneRaw}`}
              className="u-label text-on-ink-muted"
            >
              {business.contact.phone}
            </a>
            <a
              href={`mailto:${business.contact.email}`}
              className="u-label text-on-ink-muted break-all"
            >
              {business.contact.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
