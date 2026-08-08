/**
 * KRINLY TECHNOLOGIES, institutional programs.
 *
 * These are OFFERINGS: what Krinly delivers for schools and colleges. Copy is
 * written to outcomes, not activities ("students build real engineering
 * products", not "we teach coding").
 *
 * TRUTH GUARDRAIL: Krinly has not yet run these programs in a partner school or
 * college. Nothing here claims it has. No delivery history, no student counts,
 * no placement figures, no "our schools". Being early is framed as a first-mover
 * advantage for the institution, never as inexperience and never disguised as a
 * track record. The credibility that carries the pages is real: shipped
 * products, a registered entity, and a working education-technology platform.
 */

export interface ProgramModule {
  title: string;
  detail: string;
}

export interface ProgramTrack {
  slug: "schools" | "colleges";
  audience: string;
  label: string;
  headline: string;
  intro: string;
  outcomes: string[];
  modules: ProgramModule[];
  /** The first-mover line. Frames early adoption as the institution's edge. */
  urgency: string;
  /**
   * Hero background video (WebM preferred, MP4 fallback) plus its poster.
   * `layout` picks the hero treatment: "cover" (full-bleed, for landscape
   * footage) or "split" (video panel right, text left, for portrait footage
   * that cover would over-enlarge).
   */
  media: {
    poster: string;
    mp4: string;
    webm?: string;
    layout?: "cover" | "split";
  };
}

export const programs: ProgramTrack[] = [
  {
    slug: "schools",
    audience: "Principals & school management",
    label: "Schools",
    headline: "An innovation lab your students build in, not just a computer room.",
    intro:
      "Krinly sets up a working innovation program inside the school. A space, a curriculum and a rhythm where students design and build real products across hardware and software, and leave with something they made rather than a certificate they sat for.",
    outcomes: [
      "Students build and demonstrate real engineering products",
      "A future-ready curriculum that runs alongside the academic load",
      "A visible differentiator in a competitive admissions market",
      "Teachers supported and equipped, never replaced",
    ],
    modules: [
      {
        title: "Innovation Lab Program",
        detail:
          "A structured build environment across hardware and software, set up and run inside the school.",
      },
      {
        title: "Product-based learning",
        detail:
          "Students work toward a finished product, not an exam. The project is the syllabus.",
      },
      {
        title: "Future-ready curriculum",
        detail:
          "Sequenced across terms so capability compounds instead of resetting each year.",
      },
      {
        title: "Student portfolios & Demo Days",
        detail:
          "Every student leaves with a portfolio of work, presented to parents and peers on a Demo Day.",
      },
      {
        title: "Teacher support & certification",
        detail:
          "Teachers are trained and backed through the program. Students earn a professional certificate on completion.",
      },
    ],
    urgency:
      "We partner with a small number of schools at a time. The first in a city to run a real innovation lab becomes the one others are measured against.",
    media: {
      poster: "/school-poster.webp",
      webm: "/school_student.webm",
      mp4: "/school_student.mp4",
      layout: "split", // portrait footage — keep it on the right, text on the left
    },
  },
  {
    slug: "colleges",
    audience: "Principals, HODs & placement officers",
    label: "Colleges",
    headline: "Graduates who can show industry work, not just a marksheet.",
    intro:
      "Krinly runs intensive, industry-aligned programs that take students from theory to demonstrable capability: real projects, a public GitHub portfolio, and the interview readiness placement teams actually need. Built to close the gap between the curriculum and what employers hire on.",
    outcomes: [
      "Students graduate with industry projects and a public portfolio",
      "Placement readiness that shows up in interviews, not only on paper",
      "Curriculum aligned to what industry is hiring for right now",
      "A capability uplift the department can point to",
    ],
    modules: [
      {
        title: "2-day industry workshops",
        detail:
          "Intensive, hands-on formats in AI engineering, full-stack, embedded systems and Industry 4.0.",
      },
      {
        title: "AI & full-stack engineering",
        detail:
          "The stacks industry actually ships on, applied to a real build rather than a slide deck.",
      },
      {
        title: "Industry projects & GitHub portfolio",
        detail:
          "Students finish with real projects and a public repository a recruiter can open.",
      },
      {
        title: "Placement preparation",
        detail:
          "Interview readiness and portfolio review aimed at the roles the department places into.",
      },
      {
        title: "Professional certification",
        detail:
          "A completion certificate backed by demonstrable, reviewable work.",
      },
    ],
    urgency:
      "Placement outcomes are the number colleges compete on. Partnering early means your department sets the benchmark before it becomes the baseline.",
    media: {
      poster: "/college-poster.webp",
      webm: "/college_student.webm",
      mp4: "/college_student.mp4",
    },
  },
];

export const getProgram = (slug: string) =>
  programs.find((p) => p.slug === slug);
