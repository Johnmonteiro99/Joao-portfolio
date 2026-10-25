import { useCallback, useEffect, useState } from "react";

// Active-section tracking for the normal-scrolling homepage — the page never
// pins or snaps, so the navbar's current-section state comes from watching
// which section is actually in view, not from any scroll-position math.
export function useScrollSpy(sectionIds, enabled = true) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(","), enabled]);

  const scrollToChapter = useCallback((id) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  }, []);

  return { activeId, scrollToChapter };
}
