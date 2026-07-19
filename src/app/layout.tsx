import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealProvider, revealBootstrap } from "@/components/Reveal";
import { business } from "@/data/business";

/**
 * One grotesque, one mono, no third face — the discipline is itself the signal.
 *
 * Instrument Sans is a variable neo-grotesque that is not yet template-worn.
 * Inter, Poppins and Satoshi are the three faces that most reliably mark a site
 * as generic, so all three are deliberately avoided.
 *
 * Both are self-hosted at build time by next/font: zero external requests, no
 * layout shift, and nothing for a CSP to allow.
 */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

/** TODO: replace with the live domain once it is registered. */
const SITE_URL = "https://krinly.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Krinly — Digital studio. Strategy, design and engineering.",
    template: "%s — Krinly",
  },
  description:
    "Krinly is a founder-led digital studio. Websites and digital products for businesses that have outgrown the way they look online. Based in India, working internationally.",
  openGraph: {
    type: "website",
    siteName: business.name,
    title: "Krinly — Digital studio. Strategy, design and engineering.",
    description:
      "Websites and digital products for businesses that have outgrown the way they look online.",
    url: SITE_URL,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krinly — Digital studio.",
    description:
      "Websites and digital products for businesses that have outgrown the way they look online.",
  },
  alternates: { canonical: "/" },
  // TODO: remove once the domain is live and the site is ready to be indexed.
  robots: { index: false, follow: false },
};

/**
 * Organization schema. Only truthful fields: no employee count, no founding
 * date, no aggregate rating, no awards. An unsubstantiated aggregateRating is
 * both a credibility risk and something Google actively penalises.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: business.name,
  description:
    "Founder-led digital studio providing strategy, web design, front-end engineering and digital product development.",
  url: SITE_URL,
  email: business.contact.email,
  telephone: business.contact.phone,
  founder: { "@type": "Person", name: business.founder },
  address: {
    "@type": "PostalAddress",
    addressLocality: business.location.city,
    addressRegion: business.location.region,
    addressCountry: "IN",
  },
  areaServed: "Worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {/* Must be the first thing in the body: it runs synchronously before
            any content paints, so there is no flash of visible-then-hidden. */}
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <a href="#main" className="u-skip-link">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <RevealProvider />
      </body>
    </html>
  );
}
