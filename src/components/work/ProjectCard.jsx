import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// The whole card is one real <a> — a semantic link, not a JS click handler —
// so it's keyboard-reachable, works with the browser's native "open in new
// tab" affordances, and needs no click-vs-drag disambiguation logic.
export default function ProjectCard({ project, className = "", eager = false }) {
  return (
    <motion.a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`project-card ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="project-card-thumb">
        <img
          src={project.image}
          alt={project.imageAlt || `${project.name} project preview`}
          loading={eager ? "eager" : "lazy"}
          width={1400}
          height={788}
          style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
        />
      </div>

      <div className="project-card-row">
        <span className="font-label text-faint" style={{ fontSize: "0.75rem" }}>
          {project.number}
        </span>
        <ArrowUpRight size={16} className="project-card-arrow" aria-hidden="true" />
      </div>

      <div className="project-card-name text-primary font-display">{project.name}</div>
      <div className="font-label text-accent project-card-tag">{project.classification}</div>
      <p className="text-muted project-card-desc">{project.description}</p>

      <div className="project-card-tags">
        {project.technologies.map((t) => (
          <span key={t} className="pill" style={{ fontSize: "0.66rem" }}>
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
