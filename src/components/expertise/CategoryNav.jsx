import { useEffect, useRef } from "react";

// Automatic activation with roving tabindex. Scroll only this tab strip so a
// newly selected category stays visible without repositioning the document.
export default function CategoryNav({ categories, activeId, onSelect }) {
  const btnRefs = useRef([]);
  const stripRef = useRef(null);
  useEffect(() => {
    const strip = stripRef.current;
    const button = btnRefs.current[categories.findIndex((category) => category.id === activeId)];
    if (!strip || !button) return;
    const reveal = () => {
      const buttonLeft = button.offsetLeft;
      if (buttonLeft < strip.scrollLeft) strip.scrollLeft = buttonLeft;
      else if (buttonLeft + button.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = buttonLeft + button.offsetWidth - strip.clientWidth;
    };
    reveal();
    const observer = new ResizeObserver(reveal);
    observer.observe(strip);
    observer.observe(button);
    return () => observer.disconnect();
  }, [activeId, categories]);

  const onKeyDown = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % categories.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + categories.length) % categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = categories.length - 1;
    else return;
    event.preventDefault();
    onSelect(categories[next].id);
    btnRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={stripRef} className="expertise-tablist" role="tablist" aria-label="Expertise categories">
      {categories.map((category, i) => (
        <button
          type="button"
          key={category.id}
          ref={(element) => { btnRefs.current[i] = element; }}
          role="tab"
          id={`expertise-tab-${category.id}`}
          aria-selected={activeId === category.id}
          aria-controls="expertise-panel"
          tabIndex={activeId === category.id ? 0 : -1}
          onFocus={() => onSelect(category.id)}
          onClick={() => onSelect(category.id)}
          onKeyDown={(event) => onKeyDown(event, i)}
          className={`expertise-tab ${activeId === category.id ? "expertise-tab-active" : ""}`}
        >
          {category.shortLabel}
          {activeId === category.id && <span className="expertise-underline" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}
