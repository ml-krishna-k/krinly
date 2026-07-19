/**
 * KRINLY — portfolio data.
 *
 * ATTRIBUTION IS LOAD-BEARING. Every project carries an explicit `kind` and a
 * `roleNote`. These are not decorative: a prospect who clicks through to a live
 * site and finds a "Concept redesign" line in its footer — while Krinly called
 * it client work — has caught the studio overclaiming, and everything else on
 * the site becomes suspect.
 *
 * Four categories, never blurred:
 *   commercial — commissioned work for a paying client
 *   product    — deep product/engineering involvement; ownership sits elsewhere
 *                or is not being claimed
 *   concept    — self-initiated redesign study; not commissioned
 *
 * NO METRICS APPEAR ANYWHERE IN THIS FILE. No conversion lifts, no user counts,
 * no revenue, no rankings. Every factual statement below is either observable
 * on the live site or was confirmed by Krishna.
 */

export type ProjectKind = "commercial" | "product" | "concept";

export interface CaseSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Short label shown on cards and in the index. Must be truthful. */
  kindLabel: string;
  kind: ProjectKind;
  industry: string;
  /**
   * The single highest-value field on a project card. One sentence naming the
   * category and what the work actually is. Research found this outperforms
   * any tag row.
   */
  scope: string;
  url: string;
  /** Discipline tags. Kept to 2–4; a longer list claims everything and says nothing. */
  disciplines: string[];
  /**
   * Plain-language statement of Krinly's involvement. Rendered on the case
   * study. Where attribution is genuinely uncertain, this says so rather than
   * inventing an engagement narrative.
   */
  roleNote: string;
  /** Featured projects get full case studies and large presentation. */
  featured: boolean;
  /** Ordering in the work index. Strongest first — hierarchy is strategic. */
  order: number;
  images: {
    desktop: string;
    mobile: string;
    alt: string;
  };
  sections: CaseSection[];
}

export const projects: Project[] = [
  // ------------------------------------------------------------------------
  {
    slug: "enervara",
    name: "Enervara",
    kindLabel: "Product",
    kind: "product",
    industry: "Healthcare technology",
    scope:
      "A clinical triage product that takes a patient from first described symptom to the right care, with a structured brief waiting for the doctor.",
    url: "https://enervara.com/",
    disciplines: ["Product thinking", "Design", "Front-end engineering"],
    roleNote:
      "Enervara is a product of Zarivenistra Technologies Private Limited. Krinly does not own it. Krishna has worked deeply on the product across architecture, AI/clinical intelligence concepts, product UX and platform development.",
    featured: true,
    order: 1,
    images: {
      desktop: "/work/enervara/desktop.webp",
      mobile: "/work/enervara/mobile.webp",
      alt: "Enervara homepage — clinical triage product marketing site",
    },
    sections: [
      {
        heading: "Context",
        body: "Healthcare triage is a two-sided problem and most products only solve one side of it. A patient arrives with a description, not a diagnosis. A clinician arrives with eight minutes and no context. Enervara is built to sit in the gap between those two moments.",
      },
      {
        heading: "The idea",
        body: "One intake, two outputs. The patient describes what is wrong in their own words and is asked structured follow-up questions until there is enough to route them. The same intake becomes a pre-consultation brief on the clinician's side — history, key concerns, and a draft summary marked explicitly for clinician review rather than presented as a conclusion.",
      },
      {
        heading: "Designing for clinical trust",
        body: "The hardest constraint in health AI is not accuracy, it is posture. An interface that sounds certain about a diagnosis is dangerous regardless of how good the model is. Enervara's language is deliberately provisional throughout, assessment is framed as clinically informed rather than definitive, and a doctor remains in the loop by design. The warm neutral palette and single-family typography are part of that argument — this reads as a clinical instrument, not a consumer chatbot.",
      },
      {
        heading: "Engineering posture",
        body: "The platform ships a strict Content Security Policy with no inline script execution, HSTS with preload, same-origin isolation policies, and a comprehensive permissions denylist. Fonts are self-hosted rather than pulled from a third party. For a product handling health information, security posture is not a later hardening pass — it is a design constraint that shapes what the front end is allowed to do.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "bowled",
    name: "Bowled",
    kindLabel: "Product / Digital platform",
    kind: "product",
    industry: "Food subscription",
    scope:
      "A daily meal subscription platform for Chennai — customer accounts, QR delivery passes, meal scheduling, and the kitchen-side operations software behind it.",
    url: "https://bowled.store/",
    disciplines: [
      "Product design",
      "Front-end engineering",
      "Systems architecture",
    ],
    roleNote:
      "Bowled is closely connected to Krishna and is presented as product work rather than as a client engagement.",
    featured: true,
    order: 2,
    images: {
      desktop: "/work/bowled/desktop.webp",
      mobile: "/work/bowled/mobile.webp",
      alt: "Bowled — daily meal subscription platform",
    },
    sections: [
      {
        heading: "Context",
        body: "A meal subscription is not a website with a checkout. It is a recurring physical delivery with a daily operational tail: who is eating today, who paused, which kitchen is cooking it, and did it actually arrive. Most food startups buy a storefront and then discover the operations problem afterwards.",
      },
      {
        heading: "Two products, one system",
        body: "Bowled is built as a customer application and a back office that share a data model. Subscribers get a menu, a subscription, a profile, a QR meal pass, and the ability to skip meals ahead of time. Staff get a dashboard, subscriber directory, delivery tracking, kitchen management, a menu editor, and payment verification. Both surfaces are route-code-split so a customer never downloads the admin bundle.",
      },
      {
        heading: "Designing around a real constraint",
        body: "Payment is manual UPI — the customer pays, uploads a screenshot and reference number, and an admin verifies it. A payment gateway would be cleaner engineering and worse product for the market this serves. The interface is built to make the manual path fast and unambiguous on both sides rather than pretending the constraint does not exist. The QR meal pass exists for the same reason: delivery confirmation has to work in a hostel corridor, in seconds, on a bad connection.",
      },
      {
        heading: "Performance as a product decision",
        body: "The hero image is preloaded at high fetch priority. Fonts load through a non-blocking pattern with a no-JavaScript fallback. There are preconnects to the font host and the auth provider, a viewport configured for notched devices, and route-level code splitting throughout. Structured data covers the business, its service area, its opening hours and its parent organisation. The build runs on a current toolchain — Vite with the Rolldown bundler.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "codekrack",
    name: "CodeKrack",
    kindLabel: "Product / Platform",
    kind: "product",
    industry: "Education technology",
    scope:
      "A coding-progress analytics platform for colleges — pulls student activity from LeetCode, Codeforces, AtCoder and GitHub into one place for placement teams.",
    url: "https://codekrack.in/",
    disciplines: ["Product design", "Front-end engineering", "Data interfaces"],
    roleNote:
      "CodeKrack is a product within the Syasan's Career Analytics ecosystem, not a separate client. Krishna has worked on this project.",
    featured: true,
    order: 3,
    images: {
      desktop: "/work/codekrack/desktop.webp",
      mobile: "/work/codekrack/mobile.webp",
      alt: "CodeKrack — coding progress analytics platform",
    },
    sections: [
      {
        heading: "Context",
        body: "A placement officer with four hundred students has no practical way to see who is actually preparing. The signal exists — it is scattered across four competitive programming platforms and a GitHub account per student — but nobody is going to check it by hand.",
      },
      {
        heading: "Aggregation as the product",
        body: "CodeKrack consolidates that scattered activity into one view: per-student profiles, activity history, achievements, and a leaderboard, with an administrative layer above it for directory management, access control, bulk enrolment by spreadsheet, scheduled weekly email reports, and export back out to Excel. The bulk upload and export paths matter more than they look — they are what let an institution adopt this without re-keying four hundred records.",
      },
      {
        heading: "Making progress legible",
        body: "Raw problem counts do not motivate anyone. The interface turns activity into things a student recognises as status: animated progress rings, platform-specific tiers, and a generated certificate rendered to canvas that a student can actually share. This is conversion thinking applied to an internal tool — the product only works if students keep their profiles connected, so the interface has to give them a reason to.",
      },
      {
        heading: "Engineering",
        body: "React and Vite against Supabase for authentication and data, with spreadsheet import and export handled client-side. Dark mode is bootstrapped with an inline pre-hydration script so the theme is correct on first paint rather than flashing — a small detail, and a reliable tell of hands-on engineering rather than a template.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "d3-interiors",
    name: "D3 Interiors",
    kindLabel: "Commercial work",
    kind: "commercial",
    industry: "Interior design",
    scope:
      "A local-search-led site for a Chennai interior design company, spanning residential, commercial and industrial service lines across the city.",
    url: "https://d3interiors.co.in/",
    disciplines: ["Web design", "Front-end engineering", "Technical SEO"],
    roleNote:
      "Delivered in collaboration; the live site also carries attribution to another studio. Presented here for the work itself rather than as a sole-authorship claim.",
    featured: true,
    order: 4,
    images: {
      desktop: "/work/d3-interiors/desktop.webp",
      mobile: "/work/d3-interiors/mobile.webp",
      alt: "D3 Interiors — interior design company website",
    },
    sections: [
      {
        heading: "Context",
        body: "Interior design is bought locally and researched exhaustively. A homeowner in Velachery is not searching for an interior designer in general — they are searching for one near them, for their specific room, at their specific budget, and they will compare six before calling one.",
      },
      {
        heading: "Built for how the category is actually searched",
        body: "The site is structured around that behaviour rather than around a company brochure. Service lines split three ways — residential, commercial, industrial — each with its own route and its own sub-services. Neighbourhood coverage is addressed directly across the city's areas, and the site ships in Tamil and Hindi variants alongside English.",
      },
      {
        heading: "Conversion architecture",
        body: "Every path terminates in a conversation rather than a form submission that disappears. WhatsApp deep links carry context-specific pre-filled messages, so an enquiry from the kitchen page opens a different first message than one from the consultation page. Phone, a downloadable catalogue, and a booked consultation run alongside it.",
      },
      {
        heading: "Technical foundation",
        body: "Next.js with static generation and incremental revalidation behind a CDN, so pages serve pre-rendered and cached rather than rendering per request. Structured data is unusually thorough for the category — local business, services, reviews, opening hours, video, breadcrumbs and administrative service areas — which is what makes the local-search strategy legible to a crawler rather than just to a reader.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "ravis-fit",
    name: "Ravi's Fit",
    kindLabel: "Concept redesign",
    kind: "concept",
    industry: "Fitness",
    scope:
      "A self-initiated redesign study for an outdoor functional-training gym in Coimbatore, built around the segment its existing site was not speaking to.",
    url: "https://ravisfit.vercel.app/",
    disciplines: ["Brand interpretation", "Art direction", "Front-end"],
    roleNote:
      "A concept redesign, not a commissioned engagement. Ravi's Fit is a real, operating gym; this is an independent study of how its digital presence could work.",
    featured: true,
    order: 5,
    images: {
      desktop: "/work/ravis-fit/desktop.webp",
      mobile: "/work/ravis-fit/mobile.webp",
      alt: "Ravi's Fit — concept redesign for an outdoor training gym",
    },
    sections: [
      {
        heading: "Why this one",
        body: "Gym websites default to equipment photography and membership tiers, which is what every competitor in the category already looks like. The interesting question was not how to make a gym site look better — it was which member the site should be built for.",
      },
      {
        heading: "The strategic move",
        body: "The redesign builds around a segment most gyms mention in passing and none design for: women training through PCOS, thyroid conditions and postpartum recovery. That is a specific person with a specific reason to distrust a generic gym, and speaking to her directly is worth more than speaking to everyone. Alongside it sit the time-pressed professional and the remote coaching client.",
      },
      {
        heading: "Art direction",
        body: "Near-black ground with a condensed athletic display face against a workhorse grotesque for body copy. Photography is treated monochrome and returns to colour on interaction, which keeps a page of gym imagery from becoming visual noise. The copy is written against category convention rather than for it — the pitch is what the place is not, as much as what it is.",
      },
      {
        heading: "Execution",
        body: "Built as a real site, not a mockup: scroll-triggered reveals, a header that transitions on scroll, full structured data for a health club with multiple locations, and local search metadata. Conversion runs through a single unambiguous action — book a free trial class — rather than a form nobody fills in.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "dr-shaik-dental",
    name: "Dr. Shaik's Dental",
    kindLabel: "Concept redesign",
    kind: "concept",
    industry: "Healthcare — dental",
    scope:
      "A redesign study for a Chennai implant and periodontics practice, built to make a specialist read as a specialist rather than as a general clinic.",
    url: "https://dr-shaik-s-dental-clinic.vercel.app/",
    disciplines: ["Art direction", "UX", "Front-end"],
    roleNote:
      "Presented as a concept redesign. The practice is real; this study explores how a specialist dental practice could present itself online.",
    featured: true,
    order: 6,
    images: {
      desktop: "/work/dr-shaik-dental/desktop.webp",
      mobile: "/work/dr-shaik-dental/mobile.webp",
      alt: "Dr. Shaik's Dental — concept redesign for a specialist dental practice",
    },
    sections: [
      {
        heading: "Context",
        body: "A practice doing implants, periodontal work and full-mouth rehabilitation is selling something different from a practice doing checkups — higher value, more considered, and chosen on credentials. Most dental sites present both the same way, which quietly costs the specialist the case they are best placed to take.",
      },
      {
        heading: "Design direction",
        body: "The study moves deliberately away from the category's defaults — the clinical blue, the stock smile, the rounded card grid. Deep teal and ivory, an editorial serif against a modern sans. The register is closer to a private specialist practice than to a walk-in clinic, because that is what the work being sold actually is.",
      },
      {
        heading: "Credentials as the conversion mechanism",
        body: "For high-value dental work, trust is the conversion problem. Specialist qualification, council registration, procedure experience and published work are surfaced as structure rather than buried in an about page. Contact runs through WhatsApp with pre-filled context, direct call, and directions — the three things someone actually uses when deciding to book.",
      },
      {
        heading: "Build",
        body: "Semantic structure with a skip link and reveal animations that respect reduced-motion preferences, plus complete structured data for a dental practice including both practice numbers and the full address. Imagery is currently representative and captioned as such — a real engagement would replace it with the clinic's own photography.",
      },
    ],
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

/**
 * Projects deliberately excluded from the site, recorded so the decision is
 * documented rather than forgotten:
 *
 *   ematixsolutions.com — placeholder video embed, stock-avatar testimonials,
 *     non-functional form links, placeholder phone number shipped live.
 *   tedhouse.in — brand misspelled in the <title> tag; contact form has no
 *     name attributes on any input, so every submission is discarded.
 *   mojo-cleaning-solutions — placeholder phone wired into every CTA;
 *     no verifiable business footprint.
 *   anselo.in — competent, but adds no capability the featured six do not
 *     already demonstrate. Omitted to keep the set curated.
 */
