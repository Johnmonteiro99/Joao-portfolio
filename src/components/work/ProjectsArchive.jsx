import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../../data/content";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Renders from the exact same PROJECTS array as the homepage rail — nothing
// here is a separate copy of project content.
export default function ProjectsArchive({ onBack }) {
  const headingRef = useRef(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      className="archive-view"
      style={{ paddingTop: "6.5rem", paddingBottom: "6rem" }}
    >
      <div className="chapter-inner">
        <button onClick={onBack} className="ui-btn-text archive-back-btn">
          <ArrowLeft size={14} strokeWidth={2.25} />
          <span className="ui-btn-label">Back to Home</span>
        </button>

        <div className="section-label" style={{ marginTop: "2.5rem" }}>
          Project Archive
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="hero-headline text-primary" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", marginBottom: "3rem" }}>
          Things I&rsquo;ve built
        </h1>

        <div className="archive-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} className="archive-card" eager={i === 0} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
