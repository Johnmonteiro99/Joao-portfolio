import { ArrowUpRight } from "lucide-react";

export default function ProjectCardOverlay({ project, open, id }) {
  const actions = [
    project.liveUrl && { label: "Live Demo", href: project.liveUrl },
    project.githubUrl && { label: project.githubLabel || "GitHub", href: project.githubUrl },
    project.detailUrl && { label: "Case Study", href: project.detailUrl },
  ].filter(Boolean);

  return (
    <div id={id} className="project-overlay" aria-hidden={!open} inert={open ? undefined : ""}>
      <div className="project-overlay-body" tabIndex={open ? 0 : -1} role="region" aria-label={`Details about ${project.name}`}>
        <p className="project-card-category">{project.classification}</p>
        <h3 className="project-card-name">{project.name}</h3>
        {project.slogan && <p className="project-card-slogan">{project.slogan}</p>}
        <p className="project-card-description">{project.description}</p>
        {project.developmentNote && <p className="project-development-note">{project.developmentNote}</p>}
        <ul className="project-card-tags" aria-label="Technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
      {actions.length > 0 && (
        <div className="project-card-actions">
          {actions.map((action) => (
            <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" aria-label={`${action.label}: ${project.name} (opens in a new tab)`}>
              {action.label}<ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
