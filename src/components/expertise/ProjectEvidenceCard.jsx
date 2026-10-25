import { ArrowUpRight } from "lucide-react";
import "./project-evidence.css";

// Metadata is resolved by project ID from PROJECTS; no duplicated URLs or copy.
export default function ProjectEvidenceCard({ project }) {
  return (
    <a className="project-evidence-card" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: ${project.action} (opens in a new tab)`}>
      <span className="project-evidence-thumbnail" style={{ background: project.imageBackground }}>
        <img src={project.image} srcSet={project.imageSrcSet} sizes="(max-width: 400px) 64px, 76px" width={project.imageWidth} height={project.imageHeight} alt="" loading="lazy" decoding="async" style={{ objectFit: project.imageFit || "cover", objectPosition: project.imagePosition || "center" }} />
      </span>
      <span className="project-evidence-copy"><strong>{project.name}</strong><span>{project.description}</span></span>
      <ArrowUpRight className="project-evidence-arrow" size={17} aria-hidden="true" />
    </a>
  );
}
