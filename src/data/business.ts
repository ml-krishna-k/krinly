/**
 * KRINLY TECHNOLOGIES, single source of business truth.
 *
 * Every component reads contact details, brand strings and positioning from
 * here. Nothing is duplicated into JSX. Changing a value in this file changes
 * it everywhere on the site.
 *
 * Each field is tagged with a provenance comment:
 *   VERIFIED, confirmed by the owner or by direct observation of a live site
 *   INFERRED, a reasonable reading of evidence; must not be stated as fact
 *   OFFERING, a service Krinly offers/delivers; true as a capability claim,
 *                 NOT a claim of past track record or volume
 *   PLACEHOLDER, requires the owner's input before this site goes live
 */

export const business = {
  /** VERIFIED, provided by the owner. */
  name: "Krinly Technologies",

  /** Short wordmark for the nav/logo lockup. */
  shortName: "Krinly",

  /** VERIFIED, provided in the brief. */
  founder: "Krishna",

  /**
   * PLACEHOLDER, needs the owner's confirmation.
   * "Founder" is safe. A title implying a large org (CEO of a 40-person
   * company) would imply headcount we cannot evidence.
   */
  founderTitle: "Founder",

  /**
   * The category line. This is the single most important string on the site:
   * a visitor must read it and understand Krinly is an innovation partner for
   * institutions, not a software agency or a coaching centre.
   */
  positioning:
    "Transforming schools, colleges and businesses through innovation and technology.",

  /** One-line descriptor for metadata and the founder/about voice. */
  descriptor:
    "Krinly Technologies is an education and technology company. We build innovation labs and industry programs for institutions, and engineer the digital products that prove we can.",

  contact: {
    /** VERIFIED, provided in the brief. */
    phone: "+91 9360113501",
    /** Digits only, for tel: and wa.me links. */
    phoneRaw: "919360113501",

    /**
     * PLACEHOLDER, REPLACE BEFORE LAUNCH.
     * A domain address (e.g. krishna@krinly.com) reads materially more credible
     * to an institutional decision-maker than a free-mail address. Changing
     * this one line updates every mailto, the schema, and the footer.
     */
    email: "kkrishnarajr@gmail.com",
    emailIsPlaceholder: true,

    /** INFERRED, WhatsApp is active on this number across the portfolio. */
    whatsapp: true,
  },

  /**
   * PLACEHOLDER, no verified public profiles have been attributed to Krinly.
   * Empty renders no social row, which is correct: dead/unrelated links are
   * worse than none.
   */
  social: {
    linkedin: "",
    instagram: "",
    github: "",
  },

  /**
   * INFERRED, Chennai / Tamil Nadu, from the portfolio's geography. Stated as
   * a base, not an office. No invented street address.
   */
  location: {
    city: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    line: "Chennai, India. Partnering with institutions across the country and abroad.",
  },

  /**
   * Credibility signals for institutional decision-makers. Only truthful
   * claims. Where a claim needs a verifiable identifier the owner has not yet
   * supplied (a government registration number), the slot is built but the
   * value is a PLACEHOLDER, a fabricated government ID is exactly the kind of
   * claim a principal's office checks.
   */
  credibility: {
    /**
     * PLACEHOLDER, the brief asks to feature MSME / Udyam registration
     * prominently. The registration NUMBER must come from the owner; it is a
     * real Government of India identifier and cannot be invented. Until it is
     * supplied the badge renders the label without a number, or is hidden via
     * `msmeVerified`.
     */
    msmeRegistered: true,
    msmeVerified: true, // owner-confirmed Udyam number supplied
    udyamNumber: "UDYAM-TN-02-0494977", // VERIFIED, supplied by owner

    /**
     * OFFERING, Krinly issues its own professional certificates on program
     * completion. This is a first-party claim (a company certifying its own
     * program), which is truthful; it is NOT a claim of external accreditation.
     */
    issuesCertification: true,
  },
} as const;

/**
 * Primary and secondary audiences, from the brief. Used to shape copy and the
 * two-track navigation (institutions first, business second).
 */
export const audiences = {
  primary: {
    label: "Educational institutions",
    roles: [
      "School principals & management",
      "College principals & HODs",
      "Placement officers",
      "Management teams",
    ],
  },
  secondary: {
    label: "Businesses",
    roles: [
      "Digital transformation leads",
      "Founders & operators",
      "Teams needing software, AI and automation",
    ],
  },
} as const;

/**
 * Outstanding factual questions. Kept in code so they cannot be quietly
 * forgotten, surfaced to the owner in the final "OWNER INPUT STILL NEEDED"
 * list.
 */
export const OPEN_QUESTIONS = [
  "Udyam / MSME registration NUMBER, required to display the government registration badge with a verifiable identifier. Currently a placeholder; the badge is suppressed until confirmed.",
  "Have any school Innovation Lab programs or college workshops actually been delivered yet? This determines whether any track-record/proof section can exist, or whether programs stay framed purely as offerings.",
  "Domain + domain email to replace the free-mail address and the krinly.com placeholder URL.",
  "Any real institutional references, MoUs, or partner schools/colleges that can be named (with permission).",
  "Verified testimonials (quote + attributable role/institution).",
  "A photograph of the founder, and any authentic innovation-lab / workshop photography.",
] as const;
