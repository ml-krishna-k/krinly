"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business } from "@/data/business";

/** Routes whose hero is a dark video background — the nav sits over dark there
 *  until it gains its solid paper background on scroll. */
const DARK_HERO_ROUTES = new Set(["/", "/schools", "/colleges"]);

/**
 * Institutional navigation. Two program tracks (Schools, Colleges) sit beside
 * the flagship Innovation Labs concept and the business-facing Technology page.
 * No "Home" item, the wordmark does that job, and "Home" in a nav is a
 * template tell the premium references (Apple, Linear, Stripe) all avoid.
 *
 * The single verb is the CTA: every path is meant to end in a meeting request.
 *
 * Behaviour: recessive at rest, direction-aware after the first screen, hides
 * on downward scroll past the fold, returns immediately on any upward scroll.
 */

const LINKS = [
  { href: "/innovation-labs", label: "Innovation Labs" },
  { href: "/schools", label: "Schools" },
  { href: "/colleges", label: "Colleges" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
];

/** The wordmark lockup, reused in the header and the mobile overlay. */
function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {/* Raster mark on light surfaces only. Its background is near-white, so on
          the dark overlay it would render as a light box — there we fall back to
          the text lockup, which flips to light. */}
      {!onDark && (
        <Image
          src="/logo-mark.webp"
          alt=""
          width={30}
          height={30}
          priority
          className="h-[26px] w-auto"
        />
      )}
      <span className="inline-flex items-baseline gap-2">
        <span
          className={`text-[0.95rem] font-semibold tracking-[-0.01em] ${
            onDark ? "text-on-ink" : "text-fg"
          }`}
        >
          {business.shortName}
          <span className="text-accent">.</span>
        </span>
        <span
          className={`u-label-sm ${onDark ? "text-on-ink-subtle" : "text-fg-subtle"}`}
        >
          Technologies
        </span>
      </span>
    </span>
  );
}

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Use light nav treatment when sitting over a dark video hero (top of a
  // dark-hero route) or when the dark mobile overlay is open. Once scrolled, the
  // nav gains its paper background and reverts to dark text everywhere.
  const light =
    menuOpen || (DARK_HERO_ROUTES.has(pathname) && !scrolled);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-70 transition-opacity duration-[var(--duration-micro)]"
          >
            <Wordmark onDark={light} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "u-label transition-colors duration-[var(--duration-micro)]",
                  light
                    ? "text-on-ink-muted hover:text-on-ink"
                    : "text-fg-muted hover:text-fg",
                ].join(" ")}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={[
                "u-label px-5 py-2.5 transition-colors duration-[var(--duration-micro)]",
                light
                  ? "bg-paper text-ink hover:bg-accent hover:text-on-ink"
                  : "bg-ink text-on-ink hover:bg-accent",
              ].join(" ")}
            >
              Request a meeting
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={[
              "lg:hidden u-label py-2 -mr-2 px-2 transition-colors duration-[var(--duration-micro)]",
              light ? "text-on-ink" : "text-fg",
            ].join(" ")}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* Overlay menu, a designed surface, not a dropdown. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-ink text-on-ink lg:hidden flex flex-col justify-between px-6 pt-24 pb-10 overflow-y-auto"
      >
        <ul className="space-y-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="u-display-sm !text-[1.75rem] block py-2"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="space-y-5 pt-8">
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="u-label block bg-paper text-ink px-5 py-4 text-center"
          >
            Request a meeting
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
