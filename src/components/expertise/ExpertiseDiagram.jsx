import { useId, useState } from "react";
import { EXPERTISE_DIAGRAMS } from "../../data/expertise-diagrams";
import { EXPERTISE_VISUALS } from "./ExpertiseVisuals";
import "./expertise.css";

export default function ExpertiseDiagram({ type }) {
  const diagram = EXPERTISE_DIAGRAMS[type];
  const Visual = EXPERTISE_VISUALS[type];
  if (!diagram || !Visual) return null;
  return <DiagramExplorer key={type} diagram={diagram} Visual={Visual} />;
}

function DiagramExplorer({ diagram, Visual }) {
  const [activeId, setActiveId] = useState(diagram.nodes[0].id);
  const explanationId = useId();
  const titleId = useId();
  const active = diagram.nodes.find(node => node.id === activeId);
  const controlProps = (node) => ({
    type: "button",
    "aria-pressed": activeId === node.id,
    "aria-controls": explanationId,
    onClick: () => setActiveId(node.id),
    onFocus: () => setActiveId(node.id),
    onPointerEnter: (event) => { if (event.pointerType === "mouse") setActiveId(node.id); },
  });

  return (
    <figure className="expertise-diagram" aria-labelledby={titleId}>
      <figcaption id={titleId}>{diagram.title}<span>Select a concept to explore</span></figcaption>
      <Visual nodes={diagram.nodes} activeId={activeId} controlProps={controlProps} />
      <p id={explanationId} className="diagram-explanation" aria-live="polite" aria-atomic="true"><span key={activeId} className="diagram-explanation-text"><strong>{active.label}.</strong> {active.explanation}</span></p>
    </figure>
  );
}
