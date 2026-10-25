import { useState } from "react";
import { motion } from "framer-motion";
import ProjectEvidenceCard from "../components/expertise/ProjectEvidenceCard";
import CategoryNav from "../components/expertise/CategoryNav";
import ExpertiseDiagram from "../components/expertise/ExpertiseDiagram";
import ExpertiseGroup from "../components/expertise/ExpertiseGroup";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { EXPERTISE, getProjectEvidence } from "../data/content";

export default function ExpertiseChapter() {
  const [activeId, setActiveId] = useState(EXPERTISE[0].id);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = EXPERTISE.find((category) => category.id === activeId) ?? EXPERTISE[0];
  const evidence = getProjectEvidence(active.projectIds);

  return (
    <div className="chapter-inner">
      <div className="section-label"><span className="section-label-num">04</span>Expertise</div>
      <h2 id="expertise-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.5rem" }}>What I work with</h2>
      <CategoryNav categories={EXPERTISE} activeId={activeId} onSelect={setActiveId} />
      {/* Keep panel identity stable while its contents change: no interval with
          a missing panel or a label referring to the outgoing category. */}
      <div id="expertise-panel" role="tabpanel" aria-labelledby={`expertise-tab-${activeId}`} tabIndex={0}>
        <motion.div
          key={activeId}
          className="expertise-content-grid"
          initial={reducedMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <div className="expertise-left">
            <div className="font-label text-accent expertise-number">{active.number} / {active.label.toUpperCase()}</div>
            <p className="text-muted expertise-description">{active.description}</p>
            <ExpertiseDiagram type={active.diagram} />
          </div>
          <div className="expertise-right">
            {active.groups.map((group) => <ExpertiseGroup key={group.title} title={group.title} items={group.items} />)}
            {evidence.length > 0 && (
              <div className="expertise-evidence">
                <p className="expertise-group-title font-label text-muted">See it in practice</p>
                <ul className="expertise-evidence-list">
                  {evidence.map((project) => (
                    <li key={project.id}><ProjectEvidenceCard project={project} /></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
