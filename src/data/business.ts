/**
 * KRINLY — single source of business truth.
 *
 * Every component reads contact details, brand strings and social links from
 * here. Nothing is duplicated into JSX. Changing a value in this file changes
 * it everywhere on the site.
 *
 * Each field is tagged with a provenance comment:
 *   VERIFIED    — confirmed by Krishna or by direct observation of a live site
 *   INFERRED    — a reasonable reading of evidence; must not be stated as fact
 *   PLACEHOLDER — requires Krishna's input before this site goes live
 */

export const business = {
  /** VERIFIED — provided in the brief. */
  name: "Krinly",

  /** VERIFIED — provided in the brief. */
  founder: "Krishna",

  /**
   * PLACEHOLDER — needs Krishna's confirmation.
   * "Founder" is safe. Any title implying headcount (Creative Director,
   * Head of Engineering) would imply a team we have no evidence exists,
   * and inflated titles are the first thing a diligent buyer discounts.
   */
  founderTitle: "Founder",

  contact: {
    /** VERIFIED — provided in the brief. */
    phone: "+91 9360113501",
    /** Digits only, for tel: and wa.me links. */
    phoneRaw: "919360113501",

    /**
     * PLACEHOLDER — REPLACE BEFORE LAUNCH.
     *
     * Krishna supplied kkrishnarajr@gmail.com. It works, but a free-mail
     * address in the footer of a studio quoting USD 2k–10k is a measurable
     * trust cost with international buyers — it is the cheapest credibility
     * signal on the entire site to fix. Recommend krishna@<domain> on the
     * eventual Krinly domain. Changing this one line updates every mailto,
     * every schema block, and the footer.
     */
    email: "kkrishnarajr@gmail.com",
    emailIsPlaceholder: true,

    /** INFERRED — WhatsApp is the dominant conversion channel across every
     *  site in the portfolio, so it is almost certainly active on this number.
     *  Confirm before relying on it as a primary CTA. */
    whatsapp: true,
  },

  /**
   * PLACEHOLDER — no verified public profiles have been attributed to Krinly.
   * Research found zero "krinly" strings across all eleven portfolio sites,
   * and no social accounts could be confidently attributed. Leaving these
   * empty renders no icons at all, which is correct: a social row linking to
   * dead or unrelated profiles is worse than no social row.
   */
  social: {
    linkedin: "",
    instagram: "",
    github: "",
  },

  /**
   * INFERRED — Chennai / Tamil Nadu, from the geographic concentration of the
   * portfolio. Stated as a base, not as an office. Do not invent a street
   * address: fabricated premises are trivially checkable and catastrophic
   * when checked.
   */
  location: {
    city: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    /** Written form used in the footer. Deliberately says "working with",
     *  which is true, rather than "offices in", which would not be. */
    line: "Chennai, India — working with clients internationally",
  },

  /**
   * PLACEHOLDER — the positioning line is deliberately not written yet.
   *
   * It depends on facts still outstanding: whether Krinly's strongest asset is
   * a client roster or its own shipped products. Research ruled out most of
   * the obvious territory — "experiences" appears in 8 of 14 top-studio heroes
   * and is semantically dead, and "craft" as a verb now signals template tier.
   */
  positioning: "",
} as const;

/**
 * Outstanding factual questions blocking portfolio content.
 * Kept in code so they cannot be quietly forgotten at build time.
 */
export const OPEN_QUESTIONS = [
  "D3 Interiors credits 'Website designed & developed by Technoyes.com' in its footer. What is Krinly's relationship to Technoyes?",
  "Bowled carries +91 9360113501 — Krishna's own number. Is this Krinly's own venture rather than client work?",
  "Enervara is 'A product of Zarivenistra Technologies Private Limited'. Client, employer, or own company?",
  "CodeKrack is 'A product of Syasan's Career Analytics'. Did Krinly build these, or did Syasans build them in-house?",
  "Ravi's Fit and Dr. Shaik's both self-label as concept redesigns in their own footers. Was Dr. Shaik's a signed engagement pre-launch?",
  "Mojo Cleaning has a placeholder phone (+91 98765 43210), an unresolvable domain, and no verifiable business footprint. What is it?",
  "Unattributed testimonials were offered but not yet supplied. Need quote text plus the industry/role to attribute each to.",
] as const;
