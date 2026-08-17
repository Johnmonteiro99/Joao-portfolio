import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Shared visual language: extremely thin warm-gray connector lines, olive
// nodes/markers, small squares, modest circles — same restrained "engineering
// diagram" vocabulary used elsewhere in Theme 1. Every diagram settles once
// drawn; nothing loops or spins.

const line = { stroke: "var(--color-border-strong)", strokeWidth: 1, fill: "none" };
const nodeBox = { fill: "var(--color-surface)", stroke: "var(--color-border-strong)", strokeWidth: 1 };

function stagger(reducedMotion, i, base = 0.05) {
  return reducedMotion ? { duration: 0.01 } : { duration: 0.35, delay: 0.08 + i * base, ease: "easeOut" };
}

function ComponentTreeDiagram({ reducedMotion }) {
  const children = [
    { x: 8, label: "Nav" },
    { x: 66, label: "Content" },
    { x: 130, label: "Interact" },
    { x: 192, label: "UI" },
  ];
  return (
    <svg viewBox="0 0 240 140" width="100%" role="img" aria-hidden="true">
      {children.map((c, i) => (
        <motion.line
          key={i}
          x1="120" y1="34" x2={c.x + 22} y2="76"
          {...line}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={stagger(reducedMotion, i)}
        />
      ))}
      <rect x="88" y="10" width="64" height="24" rx="3" {...nodeBox} stroke="var(--color-accent)" />
      <text x="120" y="26" textAnchor="middle" fontSize="8" fontFamily="var(--font-mono)" fill="var(--color-text)">
        APP
      </text>
      {children.map((c, i) => (
        <motion.g key={c.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={stagger(reducedMotion, i, 0.07)}>
          <rect x={c.x} y="76" width="44" height="22" rx="3" {...nodeBox} />
          <circle cx={c.x + 6} cy="87" r="2" fill="var(--color-accent)" />
          <text x={c.x + 22} y="90" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="var(--color-text-muted)">
            {c.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function InteractionPathDiagram({ reducedMotion }) {
  const points = [
    { x: 16, y: 100, label: "Pointer" },
    { x: 82, y: 50, label: "Interaction" },
    { x: 150, y: 90, label: "Transition" },
    { x: 216, y: 40, label: "UI State" },
  ];
  const d = `M ${points[0].x} ${points[0].y} Q 50 40 ${points[1].x} ${points[1].y} T ${points[2].x} ${points[2].y} T ${points[3].x} ${points[3].y}`;
  return (
    <svg viewBox="0 0 240 130" width="100%" role="img" aria-hidden="true">
      <motion.path
        d={d}
        stroke="var(--color-border-strong)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={reducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: "easeOut" }}
      />
      {points.map((p, i) => (
        <motion.g key={p.label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={stagger(reducedMotion, i, 0.09)}>
          <circle cx={p.x} cy={p.y} r={i === 0 || i === points.length - 1 ? 4 : 3} fill={i === points.length - 1 ? "var(--color-accent)" : "var(--color-surface)"} stroke="var(--color-accent)" strokeWidth="1.2" />
          <text x={p.x} y={p.y + 18} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="var(--color-text-muted)">
            {p.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function TokenNetworkDiagram({ reducedMotion }) {
  const satellites = [
    { x: 120, y: 14, label: "COLOR" },
    { x: 210, y: 68, label: "TYPE" },
    { x: 160, y: 130, label: "SPACE" },
    { x: 40, y: 100, label: "COMPONENT" },
  ];
  const center = { x: 120, y: 68 };
  return (
    <svg viewBox="0 0 240 150" width="100%" role="img" aria-hidden="true">
      {satellites.map((s, i) => (
        <motion.line key={i} x1={center.x} y1={center.y} x2={s.x} y2={s.y} {...line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={stagger(reducedMotion, i)} />
      ))}
      {satellites.map((s, i) => (
        <motion.g key={s.label} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={stagger(reducedMotion, i, 0.08)}>
          <rect x={s.x - 4} y={s.y - 4} width="8" height="8" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1" />
          <text x={s.x} y={s.y - 10} textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill="var(--color-text-muted)">
            {s.label}
          </text>
        </motion.g>
      ))}
      <circle cx={center.x} cy={center.y} r="16" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.4" />
      <text x={center.x} y={center.y + 3} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="var(--color-accent)">
        SYSTEM
      </text>
    </svg>
  );
}

function ArchitectureFlowDiagram({ reducedMotion }) {
  const nodes = [
    { x: 4, label: "CLIENT" },
    { x: 64, label: "API" },
    { x: 124, label: "SERVER" },
    { x: 184, label: "DATABASE" },
  ];
  return (
    <svg viewBox="0 0 240 90" width="100%" role="img" aria-hidden="true">
      {nodes.slice(0, -1).map((n, i) => (
        <motion.line key={i} x1={n.x + 52} y1="30" x2={nodes[i + 1].x} y2="30" {...line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={stagger(reducedMotion, i)} />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={stagger(reducedMotion, i, 0.08)}>
          <rect x={n.x} y="16" width="52" height="28" rx="3" {...nodeBox} stroke={i === nodes.length - 1 ? "var(--color-accent)" : "var(--color-border-strong)"} />
          <text x={n.x + 26} y="34" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-mono)" fill="var(--color-text)">
            {n.label}
          </text>
        </motion.g>
      ))}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={stagger(reducedMotion, 4, 0.08)}>
        <circle cx="90" cy="70" r="8" fill="none" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="98" cy="66" r="6" fill="none" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="82" cy="66" r="5" fill="none" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="90" y="86" textAnchor="middle" fontSize="6" fontFamily="var(--font-mono)" fill="var(--color-text-faint)">
          cloud
        </text>
      </motion.g>
    </svg>
  );
}

function DiagnosticRingsDiagram({ reducedMotion }) {
  const rings = [
    { cx: 44, label: "Performance" },
    { cx: 120, label: "Accessibility" },
    { cx: 196, label: "Testing" },
  ];
  return (
    <svg viewBox="0 0 240 110" width="100%" role="img" aria-hidden="true">
      {rings.map((r, i) => (
        <motion.g key={r.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={stagger(reducedMotion, i, 0.1)}>
          <circle cx={r.cx} cy="42" r="26" fill="none" stroke="var(--color-border)" strokeWidth="1" />
          <circle cx={r.cx} cy="42" r="26" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="60 103" strokeLinecap="round" transform={`rotate(-90 ${r.cx} 42)`} />
          <circle cx={r.cx} cy="42" r="3" fill="var(--color-accent)" />
          <text x={r.cx} y="86" textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" fill="var(--color-text-muted)">
            {r.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

const DIAGRAMS = {
  "component-tree": ComponentTreeDiagram,
  "interaction-path": InteractionPathDiagram,
  "token-network": TokenNetworkDiagram,
  "architecture-flow": ArchitectureFlowDiagram,
  "diagnostic-rings": DiagnosticRingsDiagram,
};

export default function ExpertiseDiagram({ type }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const Diagram = DIAGRAMS[type];
  if (!Diagram) return null;
  return (
    <div className="expertise-diagram" aria-hidden="true">
      <Diagram reducedMotion={reducedMotion} />
    </div>
  );
}
