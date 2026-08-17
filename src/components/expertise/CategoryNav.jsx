import { useRef } from "react";
import { motion } from "framer-motion";

// Proper ARIA tabs: roving tabindex, Left/Right (and Home/End) move both
// focus and selection, matching the standard tablist keyboard pattern.
export default function CategoryNav({ categories, activeId, onSelect }) {
  const btnRefs = useRef([]);

  const onKeyDown = (e, index) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (index + keys[e.key] + categories.length) % categories.length;
      onSelect(categories[next].id);
      btnRefs.current[next]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      onSelect(categories[0].id);
      btnRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = categories.length - 1;
      onSelect(categories[last].id);
      btnRefs.current[last]?.focus();
    }
  };

  return (
    <div className="expertise-tablist" role="tablist" aria-label="Expertise categories">
      {categories.map((cat, i) => {
        const isActive = cat.id === activeId;
        return (
          <button
            key={cat.id}
            ref={(el) => (btnRefs.current[i] = el)}
            role="tab"
            id={`expertise-tab-${cat.id}`}
            aria-selected={isActive}
            aria-controls="expertise-panel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(cat.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`expertise-tab ${isActive ? "expertise-tab-active" : ""}`}
          >
            {cat.shortLabel}
            {isActive && <motion.span layoutId="expertise-underline" className="expertise-underline" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
          </button>
        );
      })}
    </div>
  );
}
