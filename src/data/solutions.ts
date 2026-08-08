/**
 * KRINLY TECHNOLOGIES, technology solutions.
 *
 * The business-facing half of the company, and the proof behind the education
 * half: the same engineering that ships production products is what makes the
 * innovation programs credible. Copy is outcome-led.
 *
 * All OFFERINGS. No client counts, no delivery metrics.
 */

export interface Solution {
  index: string;
  title: string;
  summary: string;
  items: string[];
}

export const solutions: Solution[] = [
  {
    index: "01",
    title: "Web & applications",
    summary:
      "Websites and enterprise web applications engineered to perform: fast, accessible, and built to be maintained rather than replaced.",
    items: [
      "Websites & marketing sites",
      "Enterprise web applications",
      "Cloud applications",
      "UI/UX design",
    ],
  },
  {
    index: "02",
    title: "AI solutions",
    summary:
      "Applied AI that does a specific job: answering, qualifying, retrieving, automating. Grounded in your own data, not a demo.",
    items: [
      "AI chatbots & assistants",
      "AI business solutions",
      "RAG & agentic systems",
      "Intelligent search & automation",
    ],
  },
  {
    index: "03",
    title: "Systems & automation",
    summary:
      "The operational software a growing organisation runs on: dashboards, ERP and CRM, and the automation that removes manual work.",
    items: [
      "Dashboards & analytics",
      "ERP & CRM",
      "Business automation",
      "Custom software",
    ],
  },
];

/**
 * How an engagement runs. Four stages, named for what happens, not the generic
 * six-card discovery/deliver grid.
 */
export interface Stage {
  index: string;
  title: string;
  body: string;
}

export const process: Stage[] = [
  {
    index: "01",
    title: "Understand the institution",
    body: "We start with what the school, college or business is actually trying to move: admissions, placements, operations, growth. The program or the product is designed backwards from that, not sold forwards from a menu.",
  },
  {
    index: "02",
    title: "Design the transformation",
    body: "Structure before surface: the curriculum sequence, the system architecture, the rollout. Decisions made here are what determine whether the work lands or just looks good.",
  },
  {
    index: "03",
    title: "Build and run",
    body: "Krinly builds it and, for programs, runs it: hardware, software, teaching, teacher support. Products are reviewed in the browser on real devices; programs are designed to be delivered in the room, not from a mockup.",
  },
  {
    index: "04",
    title: "Prove and hand over",
    body: "Demo Days, portfolios, dashboards, certification: the evidence the transformation happened. Then it stays maintainable and supported, as a partnership rather than a delivery.",
  },
];
