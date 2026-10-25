import { useId, useRef, useState } from "react";

// The button reveals a technology label for touch and keyboard users too.
// It has no navigation side effect; Escape or leaving focus dismisses it.
export default function TechIcon({ icon: Icon, label }) {
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);
  const tooltipId = useId();
  return (
    <button
      ref={buttonRef}
      type="button"
      className="hero-tools-icon tech-tooltip-wrap"
      aria-label={`Technology: ${label}`}
      aria-describedby={show ? tooltipId : undefined}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => { if (document.activeElement !== buttonRef.current) setShow(false); }}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      onClick={() => setShow(true)}
      onKeyDown={(event) => { if (event.key === "Escape") setShow(false); }}
    >
      <Icon size={16} aria-hidden="true" />
      {show && <span id={tooltipId} role="tooltip" className="tech-tooltip">{label}</span>}
    </button>
  );
}
