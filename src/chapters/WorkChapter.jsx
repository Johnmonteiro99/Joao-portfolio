import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/work/ProjectCard";
import Button from "../components/ui/Button";
import { PROJECTS } from "../data/content";

export default function WorkChapter({ onViewAll }) {
  const railRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  // "Scroll to explore" only means anything once there's actually more to
  // scroll to — with just two projects that both fit, it stays hidden;
  // adding future projects that overflow will surface it automatically.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const check = () => setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div className="chapter-inner">
      <div className="work-header-row">
        <div>
          <div className="section-label">
            <span className="section-label-num">02</span>Selected Work
          </div>
          <h2 id="work-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "0.75rem" }}>
            Things I&rsquo;ve built
          </h2>
          <p className="text-muted" style={{ maxWidth: 520, fontSize: "0.98rem", lineHeight: 1.6 }}>
            A mix of flagship personal work and client projects — real problems, shipped.
          </p>
        </div>
        <Button as="button" variant="text" onClick={onViewAll} className="work-view-all">
          View All Projects
        </Button>
      </div>

      <div ref={railRef} className="work-rail" role="list" aria-label="Selected work, scroll horizontally for more">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} className="work-rail-card" eager={i === 0} />
        ))}
      </div>
      {hasOverflow && (
        <div className="font-label text-faint work-scroll-hint" aria-hidden="true">
          Scroll to explore &rarr;
        </div>
      )}
    </div>
  );
}
