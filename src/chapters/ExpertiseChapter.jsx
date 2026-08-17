import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoryNav from "../components/expertise/CategoryNav";
import ExpertiseDiagram from "../components/expertise/ExpertiseDiagram";
import ExpertiseGroup from "../components/expertise/ExpertiseGroup";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { EXPERTISE } from "../data/content";

export default function ExpertiseChapter() {
  const [activeId, setActiveId] = useState(EXPERTISE[0].id);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = EXPERTISE.find((c) => c.id === activeId) ?? EXPERTISE[0];

  const contentVariants = reducedMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: { opacity: 0, x: 8 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
      };

  return (
    <div className="chapter-inner">
      <div className="section-label">
        <span className="section-label-num">04</span>Expertise
      </div>
      <h2 id="expertise-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "2rem" }}>
        What I work with
      </h2>

      <CategoryNav categories={EXPERTISE} activeId={activeId} onSelect={setActiveId} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeId}
          id="expertise-panel"
          role="tabpanel"
          aria-labelledby={`expertise-tab-${activeId}`}
          className="expertise-content-grid"
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: "easeOut" }}
        >
          <div className="expertise-left">
            <div className="font-label text-accent expertise-number">
              {active.number} / {active.label.toUpperCase()}
            </div>
            <p className="text-muted expertise-description">{active.description}</p>
            <ExpertiseDiagram type={active.diagram} />
          </div>

          <div className="expertise-right">
            {active.groups.map((group) => (
              <ExpertiseGroup key={group.title} title={group.title} items={group.items} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
