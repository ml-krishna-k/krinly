/**
 * A capability model, not a service catalogue.
 *
 * Four groups, not twelve cards. Research is unambiguous that a list of 8–10
 * undifferentiated services ("Design, Branding, SEO, Copywriting, Motion…")
 * claims total coverage and therefore claims nothing. Each group below is
 * something the portfolio can actually evidence.
 */

export interface Capability {
  index: string;
  title: string;
  /** One sentence. What this actually means in practice, not a definition. */
  summary: string;
  items: string[];
}

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Strategy",
    summary:
      "Deciding what the site needs to do before deciding what it looks like — who it speaks to, in what order, and what a visit is supposed to end in.",
    items: [
      "Positioning and messaging",
      "Information architecture",
      "Conversion architecture",
      "Competitor and category analysis",
    ],
  },
  {
    index: "02",
    title: "Design",
    summary:
      "Art direction that matches the business rather than the category default — a specialist practice should not look like a walk-in clinic.",
    items: [
      "Art direction",
      "Interface and interaction design",
      "Design systems",
      "Responsive composition",
    ],
  },
  {
    index: "03",
    title: "Engineering",
    summary:
      "Built directly rather than assembled from a template, which is what makes performance, accessibility and search foundations possible at all.",
    items: [
      "Front-end engineering",
      "React, Next.js, TypeScript",
      "Performance and Core Web Vitals",
      "Technical SEO and structured data",
    ],
  },
  {
    index: "04",
    title: "Products & applied AI",
    summary:
      "Where the work is a system rather than a site: accounts, operations tooling, and interfaces that use language models for something specific.",
    items: [
      "Digital products and platforms",
      "Admin and operations tooling",
      "LLM, RAG and agentic systems",
      "Intelligent interfaces and automation",
    ],
  },
];

/**
 * How the work runs. Deliberately four stages, not the six-card generic grid
 * ("Discover / Define / Design / Develop / Deploy / Delight") that every
 * template ships. Named for what actually happens.
 */
export interface Stage {
  index: string;
  title: string;
  body: string;
}

export const process: Stage[] = [
  {
    index: "01",
    title: "Work out what's actually wrong",
    body: "Most briefs arrive as a redesign request. The useful version of that conversation is about what the business sells, who decides, and where the current site loses them. Sometimes the answer is not a new site.",
  },
  {
    index: "02",
    title: "Decide the argument",
    body: "Structure before surface: what a visitor sees first, what has to be believed before anything else lands, and what the page is asking them to do. This is the part that determines whether the design works.",
  },
  {
    index: "03",
    title: "Design and build in one pass",
    body: "Design and engineering are the same person here, so there is no handoff, no specification drift, and no interaction that survives a mockup but not a browser. Work is reviewed in the browser, on real devices.",
  },
  {
    index: "04",
    title: "Ship it properly",
    body: "Performance, accessibility, metadata, structured data and analytics are part of the build rather than a follow-up ticket. Then it goes live, and stays maintainable afterwards.",
  },
];
