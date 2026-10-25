import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CarouselNavigation({ count, position, onMove }) {
  return (
    <div className="gallery-navigation">
      <p className="gallery-position" role="status" aria-live="polite" aria-atomic="true">
        {position.overflow ? `${String(position.index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}` : `${String(count).padStart(2, "0")} ${count === 1 ? "project" : "projects"}`}
      </p>
      <div className="gallery-navigation-buttons">
        <button type="button" onClick={() => onMove(-1)} disabled={!position.previous} aria-label="Previous project" aria-controls="featured-projects-gallery"><ArrowLeft size={18} aria-hidden="true" /></button>
        <button type="button" onClick={() => onMove(1)} disabled={!position.next} aria-label="Next project" aria-controls="featured-projects-gallery"><ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
