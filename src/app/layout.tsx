import type { Metadata } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealProvider, revealBootstrap } from "@/components/Reveal";
import { business } from "@/data/business";

/**
 * One grotesque, one mono, no third face, the discipline is itself the signal.
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

const TITLE = "Krinly Technologies, Innovation & technology for institutions";
const DESC =
  "Krinly Technologies is an education and technology company. Innovation labs and industry programs for schools and colleges, and the digital products, web, AI, automation, that back them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s, Krinly Technologies",
  },
  description: DESC,
  openGraph: {
    type: "website",
    siteName: business.name,
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    locale: "en",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  alternates: { canonical: "/" },
  // TODO: remove once the domain is live and the site is ready to be indexed.
  robots: { index: false, follow: false },
};

/**
 * Organization schema. Typed as both an educational organisation and a
 * professional service, reflecting the two halves of the company. Only truthful
 * fields, no employee count, no founding date, no rating, no awards, and no
 * MSME identifier until a real Udyam number is supplied.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "ProfessionalService"],
  name: business.name,
  alternateName: business.shortName,
  description:
    "Education and technology company providing innovation labs and industry programs for schools and colleges, plus web, AI, automation and custom software for businesses.",
  url: SITE_URL,
  email: business.contact.email,
  telephone: business.contact.phone,
  founder: { "@type": "Person", name: business.founder },
  knowsAbout: [
    "Innovation labs",
    "Engineering education",
    "AI engineering",
    "Full-stack development",
    "Embedded systems",
    "Business automation",
    "Web applications",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: business.location.street,
    addressLocality: business.location.city,
    addressRegion: business.location.region,
    postalCode: business.location.postalCode,
    addressCountry: "IN",
  },
  areaServed: "IN",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The reveal bootstrap adds a `js` class to <html> before hydration
      // (progressive enhancement). That is an intentional pre-hydration change,
      // so suppress the attribute-mismatch warning on this element only — it
      // does not affect children.
      suppressHydrationWarning
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
