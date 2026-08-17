import { useState, Fragment } from "react";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/layout/Footer";
import FocusSection from "./components/scroll/FocusSection";
import SectionDivider from "./components/layout/SectionDivider";
import ProjectsArchive from "./components/work/ProjectsArchive";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { CHAPTERS } from "./chapters";

const CHAPTER_IDS = CHAPTERS.map((c) => c.id);

// Decorative coordinate waypoints marking the seam between chapters — not
// real location data, just Theme 1's existing tech-coord motif reused at
// each transition. Alignment is varied deliberately so the row doesn't feel
// mechanically centered at every boundary.
const DIVIDERS = [
  { coord: "40.7128° N", align: "right" }, // hero -> work
  { coord: "74.0060° W", align: "left" }, // work -> about
  { coord: "04.7128° N", align: "center" }, // about -> expertise
  { coord: "02.3522° E", align: "right" }, // expertise -> services
  { coord: "48.8566° N", align: "left" }, // services -> resume
  { coord: "37.7749° N", align: "right" }, // resume -> contact
];

// A normal, entirely native-scrolling page — nothing pins, snaps, or
// intercepts wheel/touch input. Each section gets its own subtle
// depth-of-field reveal (FocusSection) as it enters/settles/passes the
// reading area; the navbar's active link is tracked via IntersectionObserver
// (useScrollSpy), not scroll math.
//
// "View All Projects" swaps in a second top-level view (plain React state,
// no router — there wasn't one already, and this is the only place that
// needs it) rather than navigating to a real URL, so there's no risk of a
// static host 404ing on a route it was never configured to serve.
export default function HomePage() {
  const [view, setView] = useState("home"); // 'home' | 'archive'
  const { activeId, scrollToChapter } = useScrollSpy(CHAPTER_IDS);

  const goToArchive = () => {
    setView("archive");
    window.scrollTo(0, 0);
  };

  // Re-issuing scrollIntoView a moment later corrects for layout that's
  // still settling right after mount (all 7 chapters mounting at once, plus
  // images loading below the target) — a single call computes its target
  // once and can land short if anything shifts right after it starts. Only
  // ever one of these is in flight per action — each caller schedules its
  // own explicit target, rather than a generic view-change effect that
  // can't tell "Back to Home" apart from "jumped here via a nav link".
  const settleScrollTo = (id) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => requestAnimationFrame(scroll));
    setTimeout(scroll, 400);
  };

  // "Back to Home" always lands back on Selected Work.
  const goToHome = () => {
    setView("home");
    settleScrollTo("work");
  };

  // Navbar stays fully functional from the archive view too: a link click
  // returns home first, then scrolls to the requested chapter once it's
  // back in the DOM and settled.
  const navigate = (id) => {
    if (view !== "home") {
      setView("home");
      settleScrollTo(id);
    } else {
      scrollToChapter(id);
    }
  };

  return (
    <div className="bg-page" style={{ position: "relative" }}>
      <Navbar activeId={view === "home" ? activeId : null} scrollToChapter={navigate} />

      {view === "archive" ? (
        <>
          <ProjectsArchive onBack={goToHome} />
          <Footer />
        </>
      ) : (
        <>
          {CHAPTERS.map((chapter, i) => {
            const Comp = chapter.Component;
            const extraProps = chapter.id === "work" ? { onViewAll: goToArchive } : {};
            return (
              <Fragment key={chapter.id}>
                <FocusSection id={chapter.id} headingId={`${chapter.id}-heading`} className="chapter-section">
                  <Comp {...extraProps} />
                </FocusSection>
                {i < CHAPTERS.length - 1 && <SectionDivider {...DIVIDERS[i]} />}
              </Fragment>
            );
          })}
          <Footer />
        </>
      )}
    </div>
  );
}
