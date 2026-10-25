import { useEffect, useId, useRef, useState } from "react";
import { Info, X } from "lucide-react";
import ProjectCardOverlay from "./ProjectCardOverlay";

// A card is a container, never a link around other interactive controls.
// Native scrolling can therefore start on the artwork without navigating.
export default function ProjectCard({ project, className = "", eager = false }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const pinnedRef = useRef(false);
  const restoringFocus = useRef(false);
  const panelId = useId();

  const close = () => {
    pinnedRef.current = false;
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open]);

  return (
    <article
      ref={rootRef}
      aria-label={project.name}
      className={`project-card ${open ? "is-open" : ""} ${className}`}
      style={{ "--project-image-background": project.imageBackground || "var(--color-surface-2)" }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setOpen(true);
      }}
      onPointerLeave={() => {
        if (!pinnedRef.current && !rootRef.current.contains(document.activeElement)) setOpen(false);
      }}
      onFocusCapture={(event) => {
        if (!restoringFocus.current && !event.currentTarget.contains(event.relatedTarget) && event.target.matches(":focus-visible")) setOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        event.preventDefault();
        event.stopPropagation();
        close();
        restoringFocus.current = true;
        toggleRef.current.focus({ preventScroll: true });
        restoringFocus.current = false;
      }}
    >
      <img
        className="project-card-image"
        src={project.image}
        srcSet={project.imageSrcSet}
        sizes="(min-width: 1280px) 390px, (min-width: 900px) 440px, (min-width: 640px) 470px, 85vw"
        alt={project.imageAlt || `${project.name} project preview`}
        width={project.imageWidth}
        height={project.imageHeight}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ objectFit: project.imageFit || "cover", objectPosition: project.imagePosition || "center" }}
      />
      <span className="project-card-number" aria-hidden="true">{project.number}</span>
      <button
        ref={toggleRef}
        type="button"
        className="project-info-toggle"
        aria-label={`${open ? "Hide" : "Show"} details for ${project.name}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          pinnedRef.current = !open;
          setOpen(!open);
        }}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Info size={18} aria-hidden="true" />}
      </button>
      <ProjectCardOverlay project={project} open={open} id={panelId} />
    </article>
  );
}
