import type { CSSProperties } from "react";

/**
 * Engineering diagrams, drawn, not photographed.
 *
 * These carry the "innovation lab / engineering" visual load without a single
 * stock image or fabricated lab photo. They use the accent token and invert on
 * ink surfaces. On entering the viewport the strokes draw themselves in and the
 * nodes settle, like an instrument plotting a trace, which is the difference
 * between a diagram that looks placed and one that looks built.
 *
 * The animation is CSS-only, triggered by the `is-revealed` class the reveal
 * observer adds to the [data-reveal] wrapper. Reduced-motion users get the
 * finished static drawing.
 */

const d = (ms: number): CSSProperties => ({ ["--d" as string]: `${ms}ms` });

/**
 * A left-to-right process pipeline. Nodes joined by a rule with a datum tick at
 * each node. Used to show a program or an engagement as a documented system.
 */
export function Pipeline({
  steps,
  className = "",
}: {
  steps: { k: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className} data-reveal>
      <ol className="relative flex flex-col md:flex-row md:items-stretch">
        {steps.map((s, i) => (
          <li
            key={s.k}
            className="relative flex-1 md:pt-8 pl-8 md:pl-0 pb-8 md:pb-0"
          >
            {/* Connector rule */}
            <span
              aria-hidden
              className="absolute md:top-0 md:left-0 md:h-px md:w-full top-0 left-0 h-full w-px"
              style={{ background: "var(--color-edge)" }}
            />
            {/* Datum tick */}
            <span
              aria-hidden
              className="d-pop absolute md:top-0 md:-translate-y-1/2 md:left-0 left-0 top-0 -translate-x-1/2 md:translate-x-0 w-2 h-2 border border-accent bg-paper"
              style={d(i * 130)}
            />
            <div className="d-pop md:pr-8" style={d(i * 130 + 90)}>
              <span className="u-spec block mb-3">{s.k}</span>
              <span className="text-body-sm text-fg block">{s.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * A blueprint schematic of an innovation lab: the inputs a school provides and
 * the mentorship Krinly brings, converging into student products and a demo
 * day. Deliberately abstract, a systems drawing rather than an illustration of
 * specific people or hardware we cannot evidence.
 */
export function LabSchematic({ onInk = false }: { onInk?: boolean }) {
  const line = onInk ? "rgba(154,163,178,0.55)" : "var(--color-edge-strong)";
  const text = onInk ? "#9aa3b2" : "#4c5563";
  const node = onInk ? "#161b22" : "#e7e9ee";
  const nodeStroke = onInk ? "rgba(154,163,178,0.4)" : "var(--color-edge-strong)";
  const accent = "var(--color-accent)";

  const inputs = [
    { y: 70, l: "SPACE" },
    { y: 150, l: "STUDENTS" },
    { y: 230, l: "TEACHERS" },
  ];
  const outputs = [
    { y: 110, l: "PRODUCTS" },
    { y: 190, l: "DEMO DAY" },
  ];

  return (
    <div data-reveal>
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="Schematic: the school provides space, students and teachers; Krinly provides the lab and curriculum; together they produce student-built products and a demo day."
        className="w-full h-auto"
        fontFamily="var(--font-mono)"
      >
        {/* input nodes (left) */}
        {inputs.map((n, i) => (
          <g key={n.l}>
            <rect
              className="d-pop"
              style={d(i * 70)}
              x="16"
              y={n.y - 20}
              width="150"
              height="40"
              fill={node}
              stroke={nodeStroke}
            />
            <text
              className="d-pop"
              style={d(i * 70 + 40)}
              x="91"
              y={n.y + 4}
              fill={text}
              fontSize="12"
              letterSpacing="1.5"
              textAnchor="middle"
            >
              {n.l}
            </text>
            <line
              className="d-draw"
              style={d(260 + i * 60)}
              pathLength="1"
              x1="166"
              y1={n.y}
              x2="250"
              y2="150"
              stroke={line}
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Krinly core (center) */}
        <rect
          className="d-draw"
          style={d(480)}
          pathLength="1"
          x="250"
          y="110"
          width="140"
          height="80"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
        />
        <text
          className="d-pop"
          style={d(620)}
          x="320"
          y="145"
          fill={accent}
          fontSize="12"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          KRINLY
        </text>
        <text
          className="d-pop"
          style={d(660)}
          x="320"
          y="163"
          fill={text}
          fontSize="9.5"
          letterSpacing="1"
          textAnchor="middle"
        >
          LAB + CURRICULUM
        </text>
        {/* crosshair datum on core */}
        <line x1="315" y1="110" x2="325" y2="110" stroke={accent} strokeWidth="1.5" className="d-pop" style={d(700)} />
        <line x1="320" y1="105" x2="320" y2="115" stroke={accent} strokeWidth="1.5" className="d-pop" style={d(700)} />

        {/* outputs (right) */}
        {outputs.map((n, i) => (
          <g key={n.l}>
            <line
              className="d-draw"
              style={d(720 + i * 60)}
              pathLength="1"
              x1="390"
              y1="150"
              x2="474"
              y2={n.y}
              stroke={line}
              strokeWidth="1"
            />
            <rect
              className="d-pop"
              style={d(820 + i * 70)}
              x="474"
              y={n.y - 20}
              width="150"
              height="40"
              fill={node}
              stroke={nodeStroke}
            />
            <text
              className="d-pop"
              style={d(860 + i * 70)}
              x="549"
              y={n.y + 4}
              fill={text}
              fontSize="12"
              letterSpacing="1.5"
              textAnchor="middle"
            >
              {n.l}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
