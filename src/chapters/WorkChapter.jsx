import { useEffect, useRef, useState } from "react";
import ProjectCard from "../components/work/ProjectCard";
import CarouselNavigation from "../components/work/CarouselNavigation";
import Button from "../components/ui/Button";
import { getFeaturedProjects } from "../data/content";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function WorkChapter({ onViewAll }) {
  const projects = getFeaturedProjects();
  const railRef = useRef(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [position, setPosition] = useState({ index: 0, previous: false, next: false, overflow: false });

  useEffect(() => {
    const rail = railRef.current;
    const measure = () => {
      const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const previous = rail.scrollLeft > 2;
      const next = rail.scrollLeft < max - 2;
      const cards = [...rail.children];
      const first = cards[0]?.offsetLeft || 0;
      let index = cards.reduce((nearest, card, i) => Math.abs(card.offsetLeft - first - rail.scrollLeft) < Math.abs(cards[nearest].offsetLeft - first - rail.scrollLeft) ? i : nearest, 0);
      if (max > 2 && !next) index = Math.max(0, cards.length - 1);
      const current = { index, previous, next, overflow: max > 2 };
      setPosition((old) => Object.keys(current).every((key) => old[key] === current[key]) ? old : current);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    rail.addEventListener("scroll", measure, { passive: true });
    return () => { observer.disconnect(); rail.removeEventListener("scroll", measure); };
  }, [projects.length]);

  const scrollToIndex = (index) => {
    const rail = railRef.current;
    const card = rail.children[Math.max(0, Math.min(projects.length - 1, index))];
    if (!card) return;
    rail.scrollTo({ left: card.offsetLeft - rail.children[0].offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const move = (direction) => {
    const rail = railRef.current;
    const step = rail.children[1] ? rail.children[1].offsetLeft - rail.children[0].offsetLeft : rail.clientWidth;
    rail.scrollBy({ left: direction * step, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="chapter-inner">
      <div className="work-header-row">
        <div>
          <div className="section-label"><span className="section-label-num">02</span>Selected Work</div>
          <h2 id="work-heading" className="hero-headline text-primary" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "0.75rem" }}>Things I&rsquo;ve built</h2>
          <p className="text-muted" style={{ maxWidth: 520, fontSize: "0.98rem", lineHeight: 1.6 }}>A selection of personal explorations and client work, thoughtfully designed and built.</p>
        </div>
        <Button id="view-all-projects" as="button" variant="text" onClick={onViewAll} className="work-view-all">View All Projects</Button>
      </div>
      <div
        id="featured-projects-gallery"
        ref={railRef}
        className="work-rail"
        role="region"
        tabIndex={0}
        aria-label="Featured projects. Use the arrow keys to explore."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); return;
          }
          const targets = { Home: 0, End: projects.length - 1 };
          if (!(event.key in targets)) return;
          event.preventDefault();
          scrollToIndex(targets[event.key]);
        }}
      >
        {projects.map((project) => <ProjectCard key={project.id} project={project} className="work-rail-card" />)}
      </div>
      <CarouselNavigation count={projects.length} position={position} onMove={move} />
    </div>
  );
}
