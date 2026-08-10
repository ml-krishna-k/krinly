/**
 * Client feedback.
 *
 * IMPORTANT — these are visibly-marked PLACEHOLDERS, not real reviews. They
 * exist so the carousel can be seen working and so the layout is ready. They
 * must be replaced with genuine, attributable client feedback before launch.
 *
 * Fabricated testimonials (invented people and quotes presented as real) are
 * NOT shipped here: they mislead the institutions this site is meant to win,
 * they are unlawful as fake endorsements in the target markets, and they were
 * explicitly ruled out by the owner at the outset. When real quotes arrive,
 * drop them in and set `verified: true`.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  org: string;
  /** True only for genuine, attributable feedback. Placeholders are false. */
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "A client's words go here: what they were struggling with, what Krinly built or ran, and what changed as a result. In their voice, not ours.",
    name: "Client name",
    role: "Role / title",
    org: "Organisation",
    verified: false,
  },
  {
    quote:
      "A second short quote focused on the working relationship — responsiveness, ownership, and whether they'd recommend Krinly to a peer.",
    name: "Client name",
    role: "Role / title",
    org: "Organisation",
    verified: false,
  },
  {
    quote:
      "A third quote about the outcome — the product that shipped, the program that ran, or the result the organisation can point to.",
    name: "Client name",
    role: "Role / title",
    org: "Organisation",
    verified: false,
  },
];

/** Only genuine feedback should ever render publicly at launch. */
export const verifiedTestimonials = testimonials.filter((t) => t.verified);
